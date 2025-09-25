<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composer autoload

header('Content-Type: application/json');

$mail = new PHPMailer(true);

// Get POST data
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$website = trim($_POST['website'] ?? ''); // honeypot field (hidden in HTML)

$recaptchaSecret = "6LfkANUrAAAAAELUEE1Ttx0U-hxxYEEn9zBeWKzB"; 
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
$captchaSuccess = json_decode($verify);

if (!$captchaSuccess->success) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'reCAPTCHA verification failed.']);
    exit;
}


// === SPAM PROTECTION ===

// 1. Honeypot check
if (!empty($website)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Spam detected.']);
    exit;
}

// 2. Validate name
if (empty($name) || !preg_match("/^[a-zA-Z\s.'-]{2,50}$/", $name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid name.']);
    exit;
}

// 3. Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

// 4. Message checks
if (strlen($message) < 10 || strlen($message) > 3000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message length invalid.']);
    exit;
}

// --- Regex Spam Filters ---

// Allow up to 3 links max
if (preg_match_all('/https?:\/\/[^\s]+/i', $message) > 3) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Too many links in message.']);
    exit;
}

// Block common spammy keywords
$spamKeywords = '/(viagra|casino|bitcoin|loan|porn|escort|wallet|credit(ed)?|graph\.org)/i';
if (preg_match($spamKeywords, $message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Spam terms detected.']);
    exit;
}

// Block email addresses inside the message
if (preg_match('/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i', $message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Do not include emails inside the message.']);
    exit;
}

// Block repeated gibberish (aaaaaa, !!!!!!!!, $$$$$$$)
if (preg_match('/(.)\1{6,}/', $message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message looks like spam.']);
    exit;
}

try {
    // Setup mail (cPanel SMTP)
    $mail->isSMTP();
    $mail->Host       = 'mail.my-proprima.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contacts@my-proprima.com'; 
    $mail->Password   = '7PgxpH8I}eLB';     
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    // Sender
    $mail->setFrom('contacts@my-proprima.com', 'Website Contact');
    $mail->addReplyTo($email, $name);
    $mail->addAddress('contacts@my-proprima.com');

    $mail->isHTML(true);
    $mail->Subject = "New message from $name";
    $mail->Body    = '
    <div style="font-family: Georgia, serif; padding: 20px; color: #333;">
        <h2 style="color: #00809D; border-bottom: 1px solid #ccc;">New Contact Form Message</h2>
        <p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>
        <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>
        <p><strong>Message:</strong><br>
        <span style="background-color:#f9f9f9; display:inline-block; padding:10px; border-left:3px solid #00809D; margin-top:5px;">' . nl2br(htmlspecialchars($message)) . '</span></p>
    </div>';

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
