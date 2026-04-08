# Dokumentation für die TSC-Wülfrath-Website

Diese Anleitung richtet sich an Personen, die die Website später **inhaltlich pflegen** möchten – auch ohne tiefe React-Kenntnisse.

Ziel dieser Anleitung ist, verständlich zu zeigen:

- **welche Inhalte wo liegen**
- **welche Dateien geändert werden müssen**
- **wie Bilder, PDFs und Ansprechpartner ergänzt werden**
- **welche Inhalte nur per Code geändert werden können**

---

# 1. Grundprinzip der Pflege

Fast alle austauschbaren Inhalte liegen in diesen Bereichen:

```text
public/content/
public/resources/
```

## Merksatz

- **Textdaten / Links / strukturierte Vereinsdaten** → `public/content/*.json`
- **Bilder / PDFs / Medienlisten** → `public/resources/**`
- **Komplett feste Seiteninhalte im Code** → `src/pages/*.js`

---

# 2. Welche Datei steuert was?

## 2.1 Überblick

| Bereich | Datei / Ordner | Wirkung auf der Website |
|---|---|---|
| Startseite Text | `public/content/start.json` | Headline, Slogan, Willkommenstext |
| Startseitenbilder | `public/resources/start/` + `startImages.json` | Bildslider oben auf der Startseite |
| Über uns / Ansprechpartner / Mitgliedschaft | `public/content/about.json` | Inhalte im Reiter „Über uns“ |
| Ansprechpartner-Bilder | `public/resources/ansprechpartner/` + `ansprechpartnerImages.json` | Bilder im Reiter „Ansprechpartner“ |
| Social Links / E-Mail | `public/content/links.json` | Footer, Kontakt, Datenschutz, mobile Schnellkontakte |
| Impressum | `public/content/impressum.json` | Seite „Impressum“ |
| Presseartikel | `public/resources/presse/` + `articles.json` | Reiter „Presse“ |
| Vereinssee-Bilder | `public/resources/vereinssee/` + `images.json` | Reiter „Vereinssee“ |
| Aktuelles-Markdown | `public/content/aktuelles.md` | aktuell ohne Funktion |

---

# 3. Startseite pflegen

## 3.1 Texte auf der Startseite ändern

Datei:

```text
public/content/start.json
```

Aktueller Aufbau:

```json
{
  "headline": "Willkommen beim TSC Wülfrath",
  "slogan": "Dein Tauchverein für Abenteuer, Ausbildung und Gemeinschaft",
  "bodyText": [
    "Absatz 1",
    "Absatz 2",
    "Absatz 3"
  ]
}
```

## Bedeutung der Felder

- `headline` → große Hauptüberschrift im Hero-Bereich
- `slogan` → Unterzeile unter der Überschrift
- `bodyText` → Absätze im Willkommenstext unterhalb des Hero-Bereichs

## Beispiel: Text ändern

```json
{
  "headline": "Willkommen beim TSC Wülfrath e.V.",
  "slogan": "Tauchsport, Ausbildung und Gemeinschaft in Wülfrath",
  "bodyText": [
    "Du möchtest den Tauchsport kennenlernen?",
    "Bei uns findest du Training, Ausbildung und Vereinsleben.",
    "Neue Mitglieder sind jederzeit willkommen."
  ]
}
```

Wichtig:

- `bodyText` muss ein **Array** bleiben, also eine Liste mit mehreren Texten in `[` `]`
- jede Zeile außer der letzten braucht ein Komma

---

## 3.2 Bilder im Startseiten-Slider austauschen oder ergänzen

Ordner:

```text
public/resources/start/
```

Steuerdatei:

```text
public/resources/start/startImages.json
```

Aktueller Aufbau:

```json
[
  "bg1.jpg",
  "bg2.jpg",
  "diver.jpg"
]
```

## So fügst du ein neues Bild hinzu

### Schritt 1

Bilddatei in diesen Ordner kopieren:

```text
public/resources/start/
```

Beispiel:

```text
public/resources/start/neues-bild.jpg
```

### Schritt 2

Dateiname in `startImages.json` eintragen:

```json
[
  "bg1.jpg",
  "bg2.jpg",
  "diver.jpg",
  "neues-bild.jpg"
]
```

## Reihenfolge

Die Reihenfolge in der JSON-Datei ist auch die Reihenfolge der Slideshow.

Das erste Bild in der Liste erscheint zuerst.

---

# 4. Über-uns-Seite pflegen

Datei:

```text
public/content/about.json
```

Diese Datei steuert:

- Ansprechpartner
- Trainer
- Gerätewarte
- Mitgliedschaftsvorteile
- Mitgliedswerdung
- Beiträge

---

## 4.1 Ansprechpartner ändern

Ausschnitt:

```json
{
  "ansprechpartner": {
    "vorsitzender1": "Marc Nußbaum",
    "vorsitzender2": "Luca Nicastro",
    "kassierer": "Gunnar Brücken",
    "geraetewart1": "Jonas Lobe",
    "geraetewart2": "Daniel Kus",
    "trainerUndTl": [
      "Gunnar Brücken – TL***, Kinder-TL, Freediving-TL",
      "Benjamin Nawrath – TL**, Kinder-TL"
    ]
  }
}
```

## Bedeutung

- `vorsitzender1` → 1. Vorsitzender
- `vorsitzender2` → 2. Vorsitzender
- `kassierer` → Kassierer
- `geraetewart1` / `geraetewart2` → Gerätewarte
- `trainerUndTl` → Liste der Trainer/Tauchlehrer

### Wichtig bei `trainerUndTl`

Das Format ist:

```text
Name – Qualifikation 1, Qualifikation 2
```

Beispiel:

```json
"trainerUndTl": [
  "Gunnar Brücken – TL***, Kinder-TL, Freediving-TL",
  "Benjamin Nawrath – TL**, Kinder-TL",
  "Max Mustermann – TL*, Nitrox"
]
```

Der Teil **vor** dem Gedankenstrich ist der Name.

Der Teil **nach** dem Gedankenstrich wird als Rollen-/Qualifikationsbeschreibung angezeigt.

---

## 4.2 Ansprechpartner-Bilder pflegen

Ordner:

```text
public/resources/ansprechpartner/
```

Zuordnungsdatei:

```text
public/resources/ansprechpartner/ansprechpartnerImages.json
```

Aktueller Aufbau:

```json
{
  "vorsitzender1": "vorsitzender1.jpg",
  "vorsitzender2": "vorsitzender2.jpg",
  "kassierer": "kassierer.jpg",
  "geraetewart1": "geraetewart1.png",
  "geraetewart2": "geraetewart2.jpg",
  "trainer_gunnar_bruecken": "gunnarTrainer.jpg",
  "trainer_benjamin_nawrath": "benniTrainer.jpg"
}
```

## So funktioniert die Zuordnung

Die Website verwendet interne Schlüssel. Diese Schlüssel müssen links in der JSON stehen.

### Feste Schlüssel

Diese Schlüssel sind fest vorgegeben:

- `vorsitzender1`
- `vorsitzender2`
- `kassierer`
- `geraetewart1`
- `geraetewart2`

### Trainer-Schlüssel

Bei Trainern wird der Schlüssel aus dem Namen gebildet.

Beispiel:

```text
Gunnar Brücken
```

wird zu:

```text
trainer_gunnar_bruecken
```

Beispiel:

```text
Benjamin Nawrath
```

wird zu:

```text
trainer_benjamin_nawrath
```

## So fügst du ein neues Trainerbild hinzu

### Schritt 1

Bild in den Ordner legen:

```text
public/resources/ansprechpartner/
```

Beispiel:

```text
public/resources/ansprechpartner/max_mustermann.jpg
```

### Schritt 2

Trainer in `about.json` ergänzen:

```json
"trainerUndTl": [
  "Gunnar Brücken – TL***, Kinder-TL, Freediving-TL",
  "Benjamin Nawrath – TL**, Kinder-TL",
  "Max Mustermann – TL*, Apnoe"
]
```

### Schritt 3

Bild-Mapping ergänzen:

```json
{
  "vorsitzender1": "vorsitzender1.jpg",
  "vorsitzender2": "vorsitzender2.jpg",
  "kassierer": "kassierer.jpg",
  "geraetewart1": "geraetewart1.png",
  "geraetewart2": "geraetewart2.jpg",
  "trainer_gunnar_bruecken": "gunnarTrainer.jpg",
  "trainer_benjamin_nawrath": "benniTrainer.jpg",
  "trainer_max_mustermann": "max_mustermann.jpg"
}
```

## Wenn kein Bild zugeordnet ist

Dann zeigt die Website automatisch einen Kreis mit Initialen an.

---

## 4.3 Mitgliedschaft pflegen

Ebenfalls in:

```text
public/content/about.json
```

Beispielstruktur:

```json
{
  "mitgliedschaft": {
    "vorteile": [
      "Teilnahme am regelmäßigen Training",
      "Günstige Ausrüstungsausleihe"
    ],
    "wieWirdManMitglied": [
      "Gültige Tauchtauglichkeitsuntersuchung",
      "Aufnahmeantrag inkl. SEPA-Mandat & Satzung"
    ],
    "beitraege": {
      "kinder": "Jugend/Schüler/Studierende/Azubis: 7 €/Monat (Nachweis)",
      "erwachsene": "Erwachsene: 12 €/Monat",
      "passiv": "Passiv: 4 €/Monat"
    }
  }
}
```

## Bedeutung

- `vorteile` → Liste im Block „Welche Vorteile bietet die Mitgliedschaft?“
- `wieWirdManMitglied` → Liste im Block „Wie wird man Mitglied?“
- `beitraege` → Chips im Block „Mitgliedsbeiträge“

## Beispiel: neuen Vorteil ergänzen

```json
"vorteile": [
  "Teilnahme am regelmäßigen Training",
  "Günstige Ausrüstungsausleihe für Anfänger & Gelegenheitstaucher",
  "Teilnahme an Vereinsfahrten"
]
```

---

# 5. Vereinssee-Bilder pflegen

Ordner:

```text
public/resources/vereinssee/
```

Steuerdatei:

```text
public/resources/vereinssee/images.json
```

Aktueller Aufbau:

```json
[
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg"
]
```

## Neues Bild ergänzen

### Schritt 1

Bilddatei in den Ordner kopieren:

```text
public/resources/vereinssee/neuer_see.jpg
```

### Schritt 2

Datei in `images.json` ergänzen:

```json
[
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "neuer_see.jpg"
]
```

Die Reihenfolge in der JSON-Datei ist die Anzeigereihenfolge der Slideshow.

---

# 6. Social-Media-Links und E-Mail ändern

Datei:

```text
public/content/links.json
```

Aktueller Aufbau:

```json
{
  "instagram": "https://www.instagram.com/tsc.wuelfrath/",
  "facebook": "https://www.facebook.com/tsc.wuelfrath/",
  "email": "vorstand@tsc-wuelfrath.de"
}
```

## Diese Datei beeinflusst

- Footer
- mobile Schnellkontakte
- Kontaktseite
- Datenschutzseite

## Beispiel

```json
{
  "instagram": "https://www.instagram.com/neuer_account/",
  "facebook": "https://www.facebook.com/neue_facebook_seite/",
  "email": "kontakt@tsc-wuelfrath.de"
}
```

---

# 7. Impressum ändern

Datei:

```text
public/content/impressum.json
```

Aktueller Aufbau:

```json
{
  "verantwortlicher": "Marc Nußbaum (1. Vorsitzender)",
  "email": "vorstand@tsc-wuelfrath.de",
  "mitgliedschaften": [
    "International Diving Association (IDA) – Nr. 0705-16",
    "Verband Deutscher Sporttaucher (VDST) – Nr. 080050"
  ],
  "bankverbindung": {
    "name": "Kreissparkasse Düsseldorf",
    "iban": "DE09 3015 0200 0003 5798 44",
    "bic": "WELADED1KSD",
    "blz": "301 502 00",
    "kontoNr": "3 579 844"
  }
}
```

## Beispiel: Daten anpassen

```json
{
  "verantwortlicher": "Max Mustermann (1. Vorsitzender)",
  "email": "vorstand@tsc-wuelfrath.de",
  "mitgliedschaften": [
    "International Diving Association (IDA) – Nr. 0705-16",
    "Verband Deutscher Sporttaucher (VDST) – Nr. 080050"
  ],
  "bankverbindung": {
    "name": "Musterbank",
    "iban": "DE00 0000 0000 0000 0000 00",
    "bic": "MUSTERBIC",
    "blz": "00000000",
    "kontoNr": "12345678"
  }
}
```

---

# 8. Typische Arbeitsabläufe

## 8.1 Neues Startbild hinzufügen

1. Bild nach `public/resources/start/` kopieren
2. Dateiname in `startImages.json` ergänzen
3. Seite neu bauen/veröffentlichen

## 8.2 Neuen Trainer ergänzen

1. Namen in `public/content/about.json` unter `trainerUndTl` ergänzen
2. Bild in `public/resources/ansprechpartner/` ablegen
3. Bild-Mapping in `ansprechpartnerImages.json` ergänzen
4. Seite neu bauen/veröffentlichen

## 8.3 Neuen Presseartikel veröffentlichen

1. PDF nach `public/resources/presse/` kopieren
2. Dateiname in `articles.json` ergänzen
3. Seite neu bauen/veröffentlichen

## 8.4 E-Mail-Adresse überall ändern

1. `public/content/links.json` anpassen
2. bei Bedarf zusätzlich `public/content/impressum.json` anpassen
3. Seite neu bauen/veröffentlichen

---

# 9. JSON-Fehler vermeiden

Typische Fehler in JSON-Dateien:

- fehlendes Komma
- zusätzliches Komma am Ende
- falsche Anführungszeichen
- fehlende Klammern

## Richtig

```json
{
  "email": "vorstand@tsc-wuelfrath.de",
  "instagram": "https://www.instagram.com/tsc.wuelfrath/"
}
```

## Falsch

```json
{
  "email": "vorstand@tsc-wuelfrath.de",
  "instagram": "https://www.instagram.com/tsc.wuelfrath/",
}
```

Das letzte Komma ist in JSON nicht erlaubt.

---

# 11. Bilder richtig vorbereiten

Empfehlungen:

- Dateinamen ohne Umlaute und Leerzeichen
- lieber `jpg`, `jpeg`, `png` oder `webp`
- große Bilder vorher komprimieren
- Querformat für Slider und Vereinssee meist am besten

## Gute Dateinamen

```text
vereinssee_sommer_01.jpg
trainer_max_mustermann.jpg
start_hallenbad.jpg
```

## Schlechte Dateinamen

```text
Mein Bild final NEU!!.jpg
Änderung Trainerfoto.png
```

---
