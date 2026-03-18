<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Methode nicht erlaubt.']);
    exit;
}

function json_response(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_env_file(string $path): array {
    if (!is_file($path)) {
        return [];
    }

    $vars = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }
        $key = trim($parts[0]);
        $value = trim($parts[1]);
        $value = trim($value, "\"'");
        $vars[$key] = $value;
    }
    return $vars;
}

function env_value(string $key, ?string $default = null): ?string {
    static $vars = null;
    if ($vars === null) {
        $baseDir = dirname(__DIR__);
        $vars = [];

        $customEnvFile = getenv('ENV_FILE');
        if ($customEnvFile && is_file($customEnvFile)) {
            $vars = array_merge($vars, load_env_file($customEnvFile));
        }

        $candidateFiles = [
            $baseDir . DIRECTORY_SEPARATOR . '.env',
            dirname($baseDir) . DIRECTORY_SEPARATOR . '.env',
        ];

        foreach ($candidateFiles as $file) {
            if (is_file($file)) {
                $vars = array_merge($vars, load_env_file($file));
            }
        }
    }

    $value = getenv($key);
    if ($value !== false) {
        return $value;
    }
    return $vars[$key] ?? $default;
}

function normalize_line_breaks(string $value): string {
    return preg_replace("/\r\n|\r|\n/", "\n", $value) ?? $value;
}

function sanitize_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function smtp_expect($socket, array $expectedCodes): string {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^([0-9]{3})\s/', $line, $matches)) {
            $code = (int)$matches[1];
            if (in_array($code, $expectedCodes, true)) {
                return $response;
            }
            throw new RuntimeException('SMTP-Fehler: ' . trim($response));
        }
    }
    throw new RuntimeException('Keine gültige SMTP-Antwort erhalten.');
}

function smtp_command($socket, string $command, array $expectedCodes): string {
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $expectedCodes);
}

function smtp_send_mail(array $config, string $fromEmail, string $toEmail, string $rawMessage): void {
    $host = $config['host'];
    $port = (int)$config['port'];
    $encryption = strtolower($config['encryption'] ?? 'tls');
    $username = $config['username'] ?? '';
    $password = $config['password'] ?? '';
    $timeout = 20;

    $remoteHost = ($encryption === 'ssl' ? 'ssl://' : '') . $host;
    $socket = @stream_socket_client($remoteHost . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        throw new RuntimeException('SMTP-Verbindung fehlgeschlagen: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, $timeout);

    try {
        smtp_expect($socket, [220]);
        $hostname = gethostname() ?: 'localhost';
        smtp_command($socket, 'EHLO ' . $hostname, [250]);

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('TLS konnte nicht aktiviert werden.');
            }
            smtp_command($socket, 'EHLO ' . $hostname, [250]);
        }

        if ($username !== '') {
            smtp_command($socket, 'AUTH LOGIN', [334]);
            smtp_command($socket, base64_encode($username), [334]);
            smtp_command($socket, base64_encode($password), [235]);
        }

        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $messageData = preg_replace("/(?<!\r)\n/", "\r\n", $rawMessage) ?? $rawMessage;
        $messageData = str_replace("\r\n.", "\r\n..", $messageData);
        fwrite($socket, $messageData . "\r\n.\r\n");
        smtp_expect($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!is_array($data)) {
    json_response(400, ['ok' => false, 'message' => 'Ungültige Anfrage.']);
}

$name = trim((string)($data['name'] ?? ''));
$age = trim((string)($data['age'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$type = trim((string)($data['type'] ?? 'Allgemein'));
$message = trim((string)($data['message'] ?? ''));
$honeypot = trim((string)($data['website'] ?? ''));
$consent = (bool)($data['consent'] ?? false);
$startedAt = (int)($data['startedAt'] ?? 0);

if ($honeypot !== '') {
    json_response(400, ['ok' => false, 'message' => 'Anfrage konnte nicht verarbeitet werden.']);
}

$minSeconds = max(2, (int)(env_value('MIN_FORM_FILL_SECONDS', '4') ?? '4'));
$nowMillis = (int)round(microtime(true) * 1000);
if ($startedAt <= 0 || (($nowMillis - $startedAt) / 1000) < $minSeconds) {
    json_response(429, ['ok' => false, 'message' => 'Das Formular wurde zu schnell abgesendet. Bitte versuche es erneut.']);
}

$errors = [];
if ($name === '' || mb_strlen($name) > 120) {
    $errors['name'] = 'Bitte einen gültigen Namen eingeben.';
}
if ($age === '' || !ctype_digit($age) || (int)$age < 8 || (int)$age > 120) {
    $errors['age'] = 'Bitte ein gültiges Alter eingeben.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 190) {
    $errors['email'] = 'Bitte eine gültige E-Mail-Adresse eingeben.';
}
$allowedTypes = ['Allgemein', 'Probetraining', 'Schnuppertauchen'];
if (!in_array($type, $allowedTypes, true)) {
    $errors['type'] = 'Ungültige Anfrageart.';
}
if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    $errors['message'] = 'Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.';
}
if (!$consent) {
    $errors['consent'] = 'Die Datenschutzerklärung muss bestätigt werden.';
}

if ($errors !== []) {
    json_response(422, ['ok' => false, 'message' => 'Bitte Eingaben prüfen.', 'errors' => $errors]);
}

$config = [
    'host' => env_value('SMTP_HOST', ''),
    'port' => env_value('SMTP_PORT', '587'),
    'encryption' => env_value('SMTP_ENCRYPTION', 'tls'),
    'username' => env_value('SMTP_USERNAME', ''),
    'password' => env_value('SMTP_PASSWORD', ''),
    'from_address' => env_value('MAIL_FROM_ADDRESS', ''),
    'from_name' => env_value('MAIL_FROM_NAME', 'Website Kontaktformular'),
    'to_address' => env_value('MAIL_TO_ADDRESS', ''),
    'subject_prefix' => env_value('MAIL_SUBJECT_PREFIX', '[Kontaktformular]'),
];

foreach (['host', 'port', 'from_address', 'to_address'] as $requiredKey) {
    if (($config[$requiredKey] ?? '') === '') {
        json_response(500, ['ok' => false, 'message' => 'E-Mail-Konfiguration ist unvollständig.']);
    }
}

if (($config['username'] ?? '') !== '' && ($config['password'] ?? '') === '') {
    json_response(500, ['ok' => false, 'message' => 'SMTP-Passwort fehlt in der Konfiguration.']);
}

$fromAddress = sanitize_header_value($config['from_address']);
$toAddress = sanitize_header_value($config['to_address']);
$fromName = sanitize_header_value($config['from_name']);
$subject = sanitize_header_value(trim($config['subject_prefix'] . ' ' . $type . ' von ' . $name));
$replyTo = sanitize_header_value($email);

$bodyLines = [
    'Neue Anfrage über das Kontaktformular der Website',
    '',
    'Name: ' . $name,
    'Alter: ' . $age,
    'E-Mail: ' . $email,
    'Art der Anfrage: ' . $type,
    '',
    'Nachricht:',
    normalize_line_breaks($message),
];

$textBody = implode("\n", $bodyLines);

$headers = [
    'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . $fromAddress . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'Date: ' . date(DATE_RFC2822),
];

$rawMessage = 'Subject: ' . mb_encode_mimeheader($subject, 'UTF-8') . "\r\n"
    . 'To: <' . $toAddress . ">\r\n"
    . implode("\r\n", $headers)
    . "\r\n\r\n"
    . $textBody;

try {
    smtp_send_mail($config, $fromAddress, $toAddress, $rawMessage);
    json_response(200, ['ok' => true, 'message' => 'Anfrage erfolgreich versendet.']);
} catch (Throwable $e) {
    error_log('Kontaktformular Mailfehler: ' . $e->getMessage());
    json_response(500, ['ok' => false, 'message' => 'Die E-Mail konnte momentan nicht versendet werden.']);
}
