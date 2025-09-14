<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composer autoload

header('Content-Type: application/json');

$mail = new PHPMailer(true);

// Get POST data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// ✅ Validate email before sending
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

try {
    // Setup mail (cPanel SMTP)
    $mail->isSMTP();
    $mail->Host = 'mail.my-proprima.com'; // cPanel mail server
    $mail->SMTPAuth = true;
    $mail->Username = 'contacts@my-proprima.com'; // full email address
    $mail->Password = '7PgxpH8I}eLB';     // replace with your mailbox password
    $mail->SMTPSecure = 'ssl'; // or 'ssl' if TLS fails
    $mail->Port = 465; // 587 for TLS, 465 for SSL
    $mail->Priority = 1;

    // Sender must match authenticated account on cPanel
    $mail->setFrom($email, 'Website Contact');
    $mail->addAddress('contacts@my-proprima.com'); // receive on same mailbox
    // 👉 if you want to forward to Gmail as well, add another line:
    // $mail->addAddress('yourpersonal@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "New message from $name";
    $mail->Body = '
    <div style="font-family: Georgia, serif; padding: 20px; color: #333;">
        <h2 style="color: #00809D; border-bottom: 1px solid #ccc;">New Contact Form Message</h2>
        <p><strong style="color:#555;">Name:</strong> ' . htmlspecialchars($name) . '</p>
        <p><strong style="color:#555;">Email:</strong> ' . htmlspecialchars($email) . '</p>
        <p><strong style="color:#555;">Message:</strong><br>
        <span style="background-color:#f9f9f9; display:inline-block; padding:10px; border-left:3px solid #00809D; margin-top:5px;">' . nl2br(htmlspecialchars($message)) . '</span></p>
        <hr style="margin-top:30px;">
        <p style="font-size:12px; color:#999;">This message was sent from your website contact form.</p>
    </div>';

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
