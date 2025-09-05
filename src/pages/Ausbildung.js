// src/pages/Ausbildung.js
import React, { useState } from "react";
import {
    Container,
    Box,
    Paper,
    Typography,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Chip,
} from "@mui/material";
import {
    School,
    ChildCare,
    ScubaDiving,
    Star,
    Stars,
    WorkspacePremium,
    AutoAwesome,
    CheckCircle,
    Nightlight,
    Water,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const tabs = [
    { label: "Ausbildung", key: "ausbildung", icon: <School /> },
    { label: "Kindertauchscheine", key: "kindertauchscheine", icon: <ChildCare /> },
    { label: "CMAS* / OWD", key: "owd", icon: <Star /> },
    { label: "CMAS** / Master Diver", key: "masterdiver", icon: <Stars /> },
    { label: "CMAS*** / Dive Leader", key: "diveleader", icon: <WorkspacePremium /> },
    { label: "Sonderbrevets", key: "sonderbrevets", icon: <AutoAwesome /> },
];

const Bullet = ({ children }) => (
    <ListItem
        sx={{
            px: 1.2,
            borderRadius: 2,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
        }}
    >
        <ListItemIcon sx={{ minWidth: 36 }}>
            <CheckCircle sx={{ opacity: 0.9 }} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ sx: { color: 'inherit' } }} primary={children} />
    </ListItem>
);

export default function Ausbildung() {
    const [currentTab, setCurrentTab] = useState("ausbildung");

    const SectionTitle = ({ icon, title, chips }) => (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 1 }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
                {icon}
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            </Stack>
            {chips && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {chips.map((c, idx) => (
                        <Chip key={idx} size="small" variant="outlined" color="secondary" label={c} />
                    ))}
                </Stack>
            )}
        </Stack>
    );

    const renderContent = () => {
        switch (currentTab) {
            case "ausbildung":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Wir bieten ein breites Spektrum an Ausbildungen – vom ersten Schnuppern im Kinder‑ und Jugendbereich
                            bis hin zu anspruchsvollen CMAS‑Stufen inklusive Spezialkursen. Unsere VDST / i.a.c. Tauchlehrerinnen
                            und Tauchlehrer planen Theorie und Praxis individuell und nach hohen Standards.
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                            <Chip icon={<ChildCare />} label="ab 8 Jahren" color="secondary" variant="filled" />
                            <Chip icon={<ScubaDiving />} label="CMAS* bis ***" color="secondary" variant="filled" />
                            <Chip icon={<AutoAwesome />} label="Sonderbrevets" color="secondary" variant="filled " />
                        </Stack>
                    </Box>
                );

            case "kindertauchscheine":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Ein großer Teil unserer Mitglieder sind Kinder und Jugendliche. Für sie gibt es eine eigene
                            Trainingszeit und spezielle Kindertauch‑Brevets (nach I.A.C.‑Richtlinien).
                        </Typography>

                        <SectionTitle icon={<ChildCare />} title="Junior Diver" />
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            Erste Begegnung mit Gerät und Unterwasserwelt: Ausrüstungsteile kennenlernen, erster Tauchgang
                            mit Tauchlehrerin/Tauchlehrer, Verhalten unter Wasser und Grundwissen zu UW‑Tieren & Pflanzen.
                        </Typography>
                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" chips={["mind. 8 Jahre", "Schwimmfähigkeit", "Gesundheitsnachweis"]} />
                        <List dense sx={{ mb: 3 }}>
                            <Bullet>Mindestens 8 Jahre alt</Bullet>
                            <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                            <Bullet>Nachweis zum Gesundheitszustand</Bullet>
                        </List>

                        <SectionTitle icon={<ChildCare />} title="Junior Scuba Diver" />
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            Aufbaukurs: Zeichensprache, Tarierung, Orientierung unter Wasser – mehr Sicherheit und Routine.
                        </Typography>
                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" chips={["mind. 9 Jahre", "Junior Diver", "Tauchtauglichkeit"]} />
                        <List dense sx={{ mb: 3 }}>
                            <Bullet>Mindestens 9 Jahre alt</Bullet>
                            <Bullet>Nachweis eines Junior‑Diver‑Brevets</Bullet>
                            <Bullet>Nachweis über die Tauchtauglichkeit</Bullet>
                        </List>

                        <SectionTitle icon={<ChildCare />} title="Junior Open Water Diver" />
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            Für fortgeschrittene Juniors: Grundlagen der Tauchphysik, Pflege der Ausrüstung, sicheres Verhalten
                            in der Gruppe und weitere Praxis im Wasser.
                        </Typography>
                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" chips={["mind. 10 Jahre", "Schwimmfähigkeit", "Junior‑Brevet"]} />
                        <List dense>
                            <Bullet>Mindestens 10 Jahre alt</Bullet>
                            <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                            <Bullet>Nachweis über Junior Diver / Junior Scuba Diver</Bullet>
                            <Bullet>Nachweis über den Gesundheitszustand</Bullet>
                        </List>
                    </Box>
                );

            case "owd":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <SectionTitle icon={<Star />} title="CMAS* / Open Water Diver" />
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Dein Einstieg ins Gerätetauchen: Vom Pool in geschützten Bedingungen bis ins Freiwasser (See/Meer)
                            lernst du die Grundlagen in Theorie und Praxis – Schritt für Schritt und sicher begleitet.
                        </Typography>

                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" chips={["Schwimmfähigkeit", "Gesundheitserklärung", "mind. 14 Jahre"]} />
                        <List dense sx={{ mb: 2 }}>
                            <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                            <Bullet>Erklärung zum Gesundheitszustand</Bullet>
                            <Bullet>Mindestens 14 Jahre alt</Bullet>
                        </List>

                        <SectionTitle icon={<School />} title="Theoretische Ausbildung" />
                        <List dense sx={{ mb: 2 }}>
                            <Bullet>Ausrüstung</Bullet>
                            <Bullet>Physik des Tauchens</Bullet>
                            <Bullet>Tauchtabellen & Tauchcomputer</Bullet>
                            <Bullet>Medizin & Erste Hilfe (HLW)</Bullet>
                            <Bullet>Tauchumgebung & Umwelt</Bullet>
                        </List>

                        <SectionTitle icon={<Water />} title="Praxis (Pool & Freiwasser)" />
                        <List dense>
                            <Bullet>Montage der Ausrüstung</Bullet>
                            <Bullet>Ab‑ & Auftauchen</Bullet>
                            <Bullet>Tarierung</Bullet>
                            <Bullet>Druckausgleich</Bullet>
                            <Bullet>Maske ausblasen</Bullet>
                            <Bullet>Wiedererlangen des Atemreglers</Bullet>
                            <Bullet>…und mehr</Bullet>
                        </List>
                    </Box>
                );

            case "masterdiver":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <SectionTitle icon={<Stars />} title="CMAS** / Master Diver" />
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Der Master Diver rückt Sicherheit und Verantwortung in den Fokus – du vertiefst Wissen und Praxis
                            und kümmerst dich zunehmend auch um deine Mittaucher.
                        </Typography>

                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" />
                        <List dense sx={{ mb: 2 }}>
                            <Bullet>Nachweis AOWD oder CMAS** (äquivalente Stufe)</Bullet>
                            <Bullet>Mindestens 15 Jahre alt</Bullet>
                            <Bullet>Gesundheitsnachweis</Bullet>
                            <Bullet>Mindestens 50 geloggte Tauchgänge</Bullet>
                        </List>

                        <SectionTitle icon={<School />} title="Theorie & Praxis" />
                        <List dense>
                            <Bullet>Spezialkurs Tauchsicherheit & Rettung</Bullet>
                            <Bullet>Spezialkurs Nachttauchen</Bullet>
                            <Bullet>Ein weiterer Spezialkurs nach Wahl</Bullet>
                            <Bullet>Vertiefung der erlernten Fähigkeiten & Kenntnisse</Bullet>
                        </List>
                    </Box>
                );

            case "diveleader":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <SectionTitle icon={<WorkspacePremium />} title="CMAS*** / Dive Leader" />
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Die höchste Sporttauch‑Stufe – du übernimmst Verantwortung für Beginner, führst Gruppen und
                            vertiefst Theorie & Praxis umfassend. Ein Schritt Richtung Tauchlehrerin/Tauchlehrer.
                        </Typography>

                        <SectionTitle icon={<CheckCircle />} title="Voraussetzungen" />
                        <List dense sx={{ mb: 2 }}>
                            <Bullet>Master Diver oder CMAS**</Bullet>
                            <Bullet>Mindestens 18 Jahre alt</Bullet>
                            <Bullet>Gesundheitsnachweis</Bullet>
                            <Bullet>Mindestens 65 geloggte TG, davon ≥ 10 zwischen 30–40 m</Bullet>
                            <Bullet>Tieftauchen; Tauchsicherheit & Rettung; Nachttauchen</Bullet>
                            <Bullet>Erste Hilfe / HLW‑O₂‑AED</Bullet>
                        </List>

                        <SectionTitle icon={<School />} title="Theorie" />
                        <List dense sx={{ mb: 2 }}>
                            <Bullet>Vertiefung CMAS** / Master Diver</Bullet>
                            <Bullet>Tauchrelevante Gesetzgebung</Bullet>
                            <Bullet>Tauchausrüstung, ‑physik und ‑medizin</Bullet>
                            <Bullet>Psychologische Faktoren & Tauchführung</Bullet>
                            <Bullet>Tauchgangsplanung & ‑management, Umwelt</Bullet>
                            <Bullet>Tauchen mit unerfahrenen Tauchern</Bullet>
                        </List>

                        <SectionTitle icon={<Water />} title="Praxis" />
                        <List dense>
                            <Bullet>60 s Zeittauchen, 45 m Streckentauchen, 10 m Tieftauchen</Bullet>
                            <Bullet>60 min Zeitschnorcheln (≥ 1500 m Strecke)</Bullet>
                            <Bullet>150 m Schnorcheln zu einem Gerätetaucher (7,5 m) & Transport</Bullet>
                            <Bullet>Leinen befestigen (5 m); Boje setzen & wiederfinden</Bullet>
                            <Bullet>Gruppenführungen mit Anfängern; kontrollierte Aufstiege</Bullet>
                            <Bullet>Abgabe des Zweitautomaten; Kompasskurs; Nachttauchgang</Bullet>
                            <Bullet>Erste Hilfe bei Wasserunfällen</Bullet>
                        </List>
                    </Box>
                );

            case "sonderbrevets":
                return (
                    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <SectionTitle icon={<AutoAwesome />} title="Sonderbrevets" />
                        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1.5 }}>
                            Ergänzend zu den Standard‑Brevets bieten wir regelmäßig Spezialkurse an – flexibel und unkompliziert
                            organisiert, je nach Bedarf und Nachfrage.
                        </Typography>
                        <List dense>
                            <Bullet>HLW / O₂ / AED</Bullet>
                            <Bullet>Gruppenführung</Bullet>
                            <Bullet>Orientierung</Bullet>
                            <Bullet>Nachttauchen <Nightlight sx={{ ml: 0.5, fontSize: 18 }} /></Bullet>
                            <Bullet>Tauchsicherheit & Rettung</Bullet>
                            <Bullet>Trockentauchen</Bullet>
                            <Bullet>Tieftauchen</Bullet>
                            <Bullet>Sidemount‑Tauchen</Bullet>
                        </List>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Container sx={{ py: 4, flexShrink: 0, mb: 8 }}>
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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
                    <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 3 }}>
                        <ScubaDiving />
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                            Ausbildung
                        </Typography>
                    </Stack>

                    {/* Tabs */}
                    <Tabs
                        value={currentTab}
                        onChange={(_, newVal) => setCurrentTab(newVal)}
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ mb: 3,
                            '& .MuiTab-root': { color: 'white' },
                            '& .Mui-selected': { color: 'white' },
                        }}
                    >
                        {tabs.map(({ label, key, icon }) => (
                            <Tab key={key} value={key} icon={icon} iconPosition="start" label={label} />
                        ))}
                    </Tabs>

                    {/* Content */}
                    <Box>
                        {renderContent()}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
