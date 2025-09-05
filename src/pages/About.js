// src/pages/About.js
import React, {useState} from "react";
import {
    Container,
    Box,
    Paper,
    Typography,
    Tabs,
    Tab, List, ListItem
} from "@mui/material";
import {motion} from "framer-motion";

export default function About() {
    const tabs = [
        {label: "Über uns", key: "about"},
        {label: "Ansprechpartner", key: "ansprechpartner"},
        {label: "Mitgliedschaft", key: "mitgliedschaft"},
        {label: "Presse", key: "presse"},
        {label: "Förderung", key: "foerderung"},
    ];
    const [currentTab, setCurrentTab] = useState("about");

    const renderTabContent = () => {
        switch (currentTab) {
            case "about":
                return (
                    <>
                        <Typography variant="h5" sx={{fontWeight: "bold", mb: 2}}>
                            Über uns
                        </Typography>
                        <Typography variant="body1" sx={{lineHeight: 1.7}}>
                            Über 50 Jahre Tauchsport Club Wülfrath! Am 15.9.1972 trafen sich zehn begeisterte Taucher in
                            den Privaträumen von Peter Stach in Wülfrath. An diesem Abend wurde der Tauchsport Club
                            Niederberg gegründet.<br/>
                            Angeregt durch Bücher und Filme und der damals sicherlich noch vorhandenen Vorstellung, dass
                            das Tauchen ein Sport der Extreme verbunden mit einem Hauch von Abenteuer ist, haben sich
                            1972 zehn Personen entschlossen, einen Tauchsportverein zu gründen. Der Verein wurde im
                            Jahre 1973 als TSC Niederberg ins Vereinsregister eingetragen. Da aus der Kommunalreform
                            keine neue Gemeinde namens Niederberg hervorgegangen ist, hat sich der Verein entschlossen,
                            den Verein in TSC Wülfrath umzubenennen. Damit war der örtliche Bezug zur Heimatgemeinde
                            hergestellt.<br/>
                            Der Verein hat sich nie dem Leistungssport zugewandt. Im Vordergrund steht der Tauchsport in
                            seiner ureigenen Form. Es geht darum, die Vielfalt der Unterwasserwelt verbunden mit dem uns
                            Menschen ungewohnten Gefühl der Schwerelosigkeit zu erleben.<br/>
                            Die Bewegung im Medium Wasser erfordert eine sehr gründliche Ausbildung und sehr viel
                            Selbstdisziplin. Tauchschnellkurse entsprechen nicht unseren Prinzipien. Unser Verein ist
                            mit seiner Ausbildungkonzeption den richtigen Weg gegangen, es stehen mehrere Tauchlehrer zu
                            Verfügung, so dass Du in eine Vielzahl von Brevets wie zum Beispiel CMAS Bronze bis hin zu
                            CMAS Gold in unserem Verein ausgebildet werden kannst. In den letzten Jahren hat sich auch
                            eine große Jugendabteilung entwickelt, auch hier ist der Verein mit mehreren
                            Kindertauchlehrern gut aufgestellt. Kinder und Jugendlichen können so schon frühzeitig an
                            den Tauchsport herangeführt werden.
                        </Typography>
                    </>
                )
            case "ansprechpartner":
                return (
                    <>
                        <Typography variant="h5" sx={{fontWeight: "bold", mb: 2}}>
                            Ansprechpartner
                        </Typography>
                        <Typography variant="body1" sx={{lineHeight: 1.7}}>
                            Unser Team besteht ausschließlich aus qualifiziertem Personal, das zuverlässig und kompetent
                            für Dich im Einsatz ist.
                            <br/><br/>
                            <strong>1. Vorsitzender</strong><br/>
                            Marc Nußbaum<br/><br/>
                            <strong>2. Vorsitzender</strong><br/>
                            Luca Nicastro<br/><br/>
                            <strong>Kassierer</strong><br/>
                            Gunnar Brücken<br/><br/>
                            <strong>Trainer und Tauchlehrer</strong><br/>
                            Gunnar Brücken – TL***, Kinder-TL, Freediving-TL<br/>
                            Benjamin Nawrath – TL**, Kinder-TL<br/><br/>
                            <strong>Gerätewarte</strong><br/>
                            1. Gerätewart: Jonas Lobe<br/>
                            2. Gerätewart: Daniel Kus
                        </Typography>
                    </>
                );
            case "mitgliedschaft":
                return (
                    <>
                        <Typography variant="h5" sx={{fontWeight: "bold", mb: 3}}>
                            Mitgliedschaft
                        </Typography>

                        {/* Vorteile */}
                        <Typography variant="h6" sx={{fontWeight: "bold", mb: 1}}>
                            Welche Vorteile bietet die Mitgliedschaft?
                        </Typography>
                        <List sx={{mb: 3, pl: 2}}>
                            <ListItem disablePadding>• Teilnahme am regelmäßigen Training</ListItem>
                            <ListItem disablePadding>• Günstige Ausrüstungsausleihe für Anfänger &
                                Gelegenheitstaucher</ListItem>
                            <ListItem disablePadding>• Zugriff auf eine große „Buddy-Liste“ für gemeinsame
                                Tauchgänge</ListItem>
                            <ListItem disablePadding>• Organisation von Tauchtouren zu spannenden Plätzen</ListItem>
                            <ListItem disablePadding>• Kostenlose Flaschenfüllung am Vereinskompressor</ListItem>
                            <ListItem disablePadding>• Jahrestauchgenehmigung am See Gut Widdauen 2 (50 % vom Verein
                                getragen)</ListItem>
                        </List>

                        {/* Mitglied werden */}
                        <Typography variant="h6" sx={{fontWeight: "bold", mb: 1}}>
                            Wie wird man Mitglied?
                        </Typography>
                        <List sx={{mb: 3, pl: 2}}>
                            <ListItem disablePadding>1. Vorlage einer gültigen Tauchtauglichkeitsuntersuchung</ListItem>
                            <ListItem disablePadding>2. Ausfüllen des Aufnahmeantrags inkl. SEPA-Mandat und
                                Satzung</ListItem>
                            <ListItem disablePadding>3. Bei Ausbildung zum Bronzetaucher zusätzlich Ausbildungsvertrag
                                ausfüllen</ListItem>
                        </List>

                        {/* Beiträge */}
                        <Typography variant="h6" sx={{fontWeight: "bold", mb: 1}}>
                            Mitgliedsbeiträge
                        </Typography>
                        <Typography variant="body2" sx={{mb: 1}}>
                            Die Aufnahmegebühr entfällt seit Beschluss der Mitgliederversammlung am 22.03.2013.
                        </Typography>
                        <List sx={{pl: 2}}>
                            <ListItem disablePadding>• Erwachsene: 12 €/Monat</ListItem>
                            <ListItem disablePadding>• Jugendliche, Schüler, Studenten, Azubis: 7 €/Monat (Nachweis
                                erforderlich)</ListItem>
                            <ListItem disablePadding>• Passive Mitglieder: 4 €/Monat</ListItem>
                        </List>

                        <Typography variant="body2" sx={{mt: 2}}>
                            Im Beitrag enthalten: Nutzung des Schwimmbads zweimal pro Woche, Versicherungsschutz sowie
                            ein Abo der Tauchsport-Zeitschrift.
                        </Typography>
                    </>
                );
            case "presse":
                return (
                    <>
                        <Typography variant="h5" sx={{fontWeight: "bold", mb: 2}}>
                            Presse
                        </Typography>
                        <Typography variant="body1" sx={{lineHeight: 1.7}}>
                            Pressemitteilungen oder Bildmaterialien für Medien findest du hier.
                        </Typography>
                    </>
                );
            case "foerderung":
                return (
                    <>
                        <Typography variant="h5" sx={{fontWeight: "bold", mb: 2}}>
                            Förderung
                        </Typography>
                        <Typography variant="body1" sx={{lineHeight: 1.7}}>
                            Liebe Mitglieder, Unterstützer und Freunde des Vereins,<br/><br/>
                            wir freuen uns, Ihnen mitteilen zu können, dass der TSC durch die großzügige Förderung der
                            Europäischen Union im Rahmen des Programms REACT-EU und der Landesregierung
                            Nordrhein-Westfalen eine bedeutende Chance erhält, die Digitalisierung in unserem Verein
                            voranzutreiben.<br/><br/>
                            Unsere Vision ist es, unseren Verein fit für die Zukunft zu machen und unsere Mitglieder
                            sowie die Gemeinschaft noch besser zu unterstützen. In Zeiten zunehmender Digitalisierung
                            ist es essentiell, die modernen Technologien und Möglichkeiten zu nutzen, um unsere
                            Vereinsarbeit effizienter und zugänglicher zu gestalten.<br/><br/>
                            Dank der Unterstützung von REACT-EU und der Landesregierung NRW werden wir in der Lage sein,
                            innovative Maßnahmen umzusetzen:<br/><br/>
                            Verbesserte Finanzorganisation: Mit einem leistungsfähigen Laptop können wir unsere Finanzen
                            effizienter organisieren. Die Buchhaltung und Verwaltung von Einnahmen und Ausgaben wird
                            weiter digitalisiert, was zu einer transparenten und nachvollziehbaren Finanzführung
                            führt.<br/><br/>
                            Wir sind davon überzeugt, dass diese Schritte uns als Verein voranbringen und unsere
                            positive Wirkung auf die Gemeinschaft erheblich verstärken werden. Die Förderung durch die
                            Europäische Union im Rahmen des REACT-EU-Programms und die Unterstützung der Landesregierung
                            NRW zeigen uns, dass unser Engagement und unsere Ziele wahrgenommen und wertgeschätzt
                            werden.<br/><br/>
                            Gemeinsam werden wir die digitale Zukunft unseres Vereins gestalten und unsere Mission
                            weiterhin erfolgreich verfolgen. Wir bedanken uns herzlich bei der Europäischen Union und
                            der Landesregierung Nordrhein-Westfalen für diese einzigartige Möglichkeit.<br/><br/>
                            Ihr TSC-Vorstand
                        </Typography>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
            <Container sx={{py: 4, flexShrink: 0, mb: 8}}>
                <Paper
                    component={motion.div}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background:
                            "linear-gradient(to bottom right, rgba(0, 77, 115, 0.85), rgba(0, 188, 212, 0.85))",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    <Typography variant="h3" sx={{fontWeight: "bold", mb: 3}}>
                        Über uns
                    </Typography>

                    {/* Unterseiten-Navigation */}
                    <Tabs
                        value={currentTab}
                        onChange={(_, newValue) => setCurrentTab(newValue)}
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{mb: 3}}
                    >
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.key}
                                value={tab.key}
                                label={tab.label}
                                sx={{color: "white"}}
                            />
                        ))}
                    </Tabs>

                    {/* Unterseiten-Inhalt */}
                    <Box>{renderTabContent()}</Box>
                </Paper>
            </Container>
        </Box>
    );
}
