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


    // Setup mail
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // or your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'jiteshmoganaraja@gmail.com'; // your Gmail
    $mail->Password = 'xagc lage ahcq kkha'; // App password, not your real password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->Priority = 1; // High priority
    $mail->AddCustomHeader("X-MSMail-Priority: High");
    $mail->AddCustomHeader("X-Priority: 1");
    $mail->AddCustomHeader("Importance: High");


    $mail->setFrom($email, $name);
    $mail->addAddress('jiteshmoganaraja@gmail.com'); // where you want to receive the email

    $mail->isHTML(true);
    $mail->Subject = "New message from $name";
    $mail->Body = '
    <div style="font-family: Georgia, serif; padding: 20px; color: #333;">
        <h2 style="color: #00809D; border-bottom: 1px solid #ccc;">📬 New Contact Form Message</h2>
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
