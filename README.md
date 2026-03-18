# TSC Wülfrath Website

## Änderungen
- Mobile Abstände in allen betroffenen responsiven Grid-Bereichen reduziert, damit gestapelte Karten auf kleinen Displays keinen übergroßen vertikalen Abstand mehr haben.
- Kontaktformular versendet jetzt echte E-Mails an ein PHP-Backend.
- Mail-Konfiguration liegt in `.env`.
- Docker-Runtime auf Apache + PHP umgestellt, damit React-Frontend und PHP-Mail-Endpunkt gemeinsam laufen.

## Mail-Konfiguration
Die Datei `.env` enthält die benötigten Werte:

```env
MAIL_TO=vorstand@example.de
MAIL_FROM_ADDRESS=website@example.de
MAIL_FROM_NAME=TSC Wülfrath Website
MAIL_SUBJECT_PREFIX=[TSC Wülfrath]
```

## Lokaler Start mit Docker
```bash
docker compose up --build
```

## Wichtiger Hinweis
Die PHP-Mailfunktion verwendet `mail()`. Auf dem Zielserver muss daher ein funktionierender Mailversand über PHP vorhanden sein.
