# Deployment auf IONOS

## Build
```bash
npm install
npm run build
```

Danach enthält der Ordner `build/` bereits:
- die React-App
- `.htaccess` für Apache / SPA-Routing
- `api/send-email.php`
- `.env` und `.env.example`

## Upload
Lade **den Inhalt** des `build/`-Ordners per SFTP auf deinen IONOS-Webspace hoch.

## .env
Du kannst die `.env` direkt im Webspace neben `index.html` ablegen.
Der Zugriff von außen wird per `.htaccess` gesperrt.

Noch besser ist es, die `.env` **eine Ebene oberhalb** des Webroots abzulegen. Das PHP-Skript sucht automatisch an beiden Stellen:
- im Webroot
- eine Ebene darüber

## SMTP-Beispiel für IONOS
```env
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_ENCRYPTION=tls
SMTP_USERNAME=dein-postfach@deinedomain.de
SMTP_PASSWORD=dein-passwort
MAIL_FROM_ADDRESS=dein-postfach@deinedomain.de
MAIL_FROM_NAME=TSC Wülfrath Website
MAIL_TO_ADDRESS=vorstand@tsc-wuelfrath.de
MAIL_SUBJECT_PREFIX=[TSC Wülfrath]
MIN_FORM_FILL_SECONDS=4
```

## Eingebauter Schutz
- Honeypot-Feld
- Mindest-Zeitprüfung
- serverseitige Validierung
- SMTP-Versand statt `mail()`
