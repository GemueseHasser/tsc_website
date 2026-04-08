# TSC Wülfrath Website

Moderne Vereinswebseite für den **TSC Wülfrath e.V.**, umgesetzt als **React Single-Page-Application** auf Basis von **Create React App**, **Material UI** und **Framer Motion**.

Die Website ist inhaltlich so aufgebaut, dass ein großer Teil der Texte, Links, Bilderlisten und Ansprechpartner **ohne Codeänderungen** gepflegt werden kann – vor allem über Dateien im Ordner `public/content` und `public/resources`.

---

## 1. Projektüberblick

Die Anwendung besteht aus einer zentralen React-App mit diesen Hauptseiten:

- **Startseite**
- **Über uns**
- **Training**
- **Ausbildung**
- **Kontakt**
- **Impressum**
- **Datenschutz**

Die Navigation läuft **ohne React Router** über den URL-Hash (`#startseite`, `#über uns`, `#kontakt` usw.). Welche Seite angezeigt wird, steuert `src/App.js`.

Die Inhalte kommen aus zwei Quellen:

1. **fest im Code hinterlegte Inhalte** in den React-Komponenten
2. **Dateibasierte Inhalte** in JSON-, Markdown-, Bild- und PDF-Dateien im `public`-Ordner

---

## 2. Technologie-Stack

### Frontend

- **React 19**
- **Create React App / react-scripts 5**
- **Material UI 7**
- **Framer Motion**
- **react-markdown**
- **pdf.js** über CDN in den HTML-Hilfsseiten

### Deployment / Betrieb

- Webserver direkt inkl. PHP
- alternativ **Docker + PHP-Apache**

---

## 3. NPM-Skripte

In `package.json` sind folgende Skripte definiert:

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### Bedeutung

- `npm start` startet die lokale Entwicklungsumgebung.
- `npm run build` erstellt das Produktions-Build im Ordner `build/`.
- `npm test` startet die Tests.
- `npm run deploy` veröffentlicht das Build via GitHub Pages.

---

## 4. Lokale Entwicklung

### Voraussetzungen

- Node.js 20+ empfohlen
- npm

### Installation

```bash
npm install
```

### Entwicklungsserver starten

```bash
npm start
```

Danach läuft die App typischerweise unter:

```text
http://localhost:3000
```

### Produktions-Build erstellen

```bash
npm run build
```

---

## 5. Deployment (Speziell Docker)

```bash
npm run deploy
```

Das Projekt enthält eine Multi-Stage-Docker-Konfiguration:

- **Build-Stufe:** Node.js erzeugt das React-Build
- **Runtime-Stufe:** Nginx liefert die statischen Dateien aus

#### Build

```bash
docker compose build
```

#### Start

```bash
docker compose up -d
```

Die Seite ist dann über Port `3000` erreichbar.

`docker-compose.yml`:

```yaml
services:
  tsc_website:
    build: .
    container_name: 'tsc_website_frontend'
    ports:
      - "3000:80/tcp"
```

---

## 6. Projektstruktur

```text
tsc_website/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── public/
│   ├── content/
│   │   ├── about.json
│   │   ├── aktuelles.md
│   │   ├── impressum.json
│   │   ├── links.json
│   │   └── start.json
│   ├── resources/
│   │   ├── ansprechpartner/
│   │   ├── presse/
│   │   ├── start/
│   │   └── vereinssee/
│   ├── index.html
│   ├── manifest.json
│   ├── pdf-preview.html
│   ├── pdf-viewer.html
│   └── robots.txt
└── src/
    ├── App.js
    ├── index.js
    ├── components/
    ├── context/
    └── pages/
```

---

## 7. Inhaltsquellen und Pflegeprinzip

Der für Redakteure wichtigste Grundsatz:

- **Texte und strukturierte Inhalte** liegen überwiegend in `public/content/*.json`
- **Bilder, PDFs und Dateilisten** liegen in `public/resources/**`
- Alles im `public`-Ordner ist direkt über den Browser referenzierbar

Das bedeutet:

- neue Bilder → in den passenden `resources`-Ordner legen
- Dateiliste anpassen → zugehörige `.json` aktualisieren
- Ansprechpartner / Links / Vereinsdaten ändern → passende `.json` ändern

---

## 8. Wichtige Besonderheiten

### Navigation ohne Router

Die App verwendet keinen React Router. Stattdessen erfolgt die Navigation per Hash:

```text
#startseite
#über uns
#kontakt
```

Die Zuordnung geschieht in `getPageFromHash()` in `src/App.js`.

### Externe Inhalte nur mit Consent

Folgende Inhalte werden erst nach Zustimmung geladen:

- Instagram-Feed auf der Startseite
- Google Maps auf der Kontaktseite
- Google Maps auf der Vereinssee-Seite

### Ansprechpartner-Bilder über Mapping

Die Personenbilder werden nicht allein über Dateinamen geladen, sondern über `ansprechpartnerImages.json` zugeordnet. Das ist absichtlich flexibel.
