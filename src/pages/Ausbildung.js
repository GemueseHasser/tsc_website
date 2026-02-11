// src/pages/Ausbildung.js
import React, { useMemo, useState } from "react";
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
    Divider,
    alpha,
    useTheme,
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

function PillTabs({ value, onChange, tabs }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                // Auf Mobile darf die Tab-Leiste nie die Seite breiter machen.
                // Deshalb: volle Breite + Inhalt innerhalb der Leiste horizontal scrollen.
                display: "flex",
                width: "100%",
                maxWidth: "100%",
                p: 0.6,
                borderRadius: 999,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
                background: alpha("#fff", 0.75),
                backdropFilter: "blur(12px)",
                boxShadow: "0 14px 40px rgba(11,27,36,0.08)",
                overflow: "hidden",
            }}
        >
            <Tabs
                value={value}
                onChange={onChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                    width: "100%",
                    minWidth: 0,
                    minHeight: 44,
                    // sorgt dafür, dass die Tabs auf Mobile innerhalb der Leiste scrollen
                    "& .MuiTabs-scroller": {
                        overflowX: "auto !important",
                        WebkitOverflowScrolling: "touch",
                    },
                    "& .MuiTabs-flexContainer": { gap: 6, flexWrap: "nowrap" },
                }}
            >
                {tabs.map((t) => (
                    <Tab
                        key={t.key}
                        value={t.key}
                        label={t.label}
                        icon={t.icon}
                        iconPosition="start"
                        sx={{
                            minHeight: 44,
                            px: 1.6,
                            borderRadius: 999,
                            fontWeight: 750,
                            color: "text.primary",
                            "&.Mui-selected": {
                                color: "white",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                boxShadow: `0 14px 34px ${alpha(theme.palette.primary.main, 0.22)}`,
                            },
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}

function GlassCard({ children, sx }) {
    const theme = useTheme();
    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            elevation={0}
            sx={{
                p: { xs: 2.2, md: 3.2 },
                borderRadius: 4,
                background: alpha("#FFFFFF", 0.86),
                border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
                boxShadow: "0 18px 55px rgba(11,27,36,0.10)",
                backdropFilter: "blur(12px)",
                ...sx,
            }}
        >
            {children}
        </Paper>
    );
}

const Bullet = ({ children }) => (
    <ListItem sx={{ px: 0, py: 0.35 }}>
        <ListItemIcon sx={{ minWidth: 34 }}>
            <CheckCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText
            primary={children}
            primaryTypographyProps={{ sx: { color: "text.secondary", lineHeight: 1.6 } }}
        />
    </ListItem>
);

export default function Ausbildung() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("ausbildung");

    const tabs = useMemo(
        () => [
            { label: "Überblick", key: "ausbildung", icon: <School /> },
            { label: "Kinderbrevets", key: "kindertauchscheine", icon: <ChildCare /> },
            { label: "CMAS* / OWD", key: "owd", icon: <Star /> },
            { label: "CMAS** / Master", key: "masterdiver", icon: <Stars /> },
            { label: "CMAS*** / Leader", key: "diveleader", icon: <WorkspacePremium /> },
            { label: "Sonderbrevets", key: "sonderbrevets", icon: <AutoAwesome /> },
        ],
        []
    );

    const SectionTitle = ({ icon, title, chips }) => (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 1 }}
        >
            <Stack direction="row" spacing={1.1} alignItems="center">
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 999,
                        display: "grid",
                        placeItems: "center",
                        background: alpha(theme.palette.primary.main, 0.08),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 950 }}>
                    {title}
                </Typography>
            </Stack>

            {chips && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {chips.map((c, idx) => (
                        <Chip key={idx} size="small" variant="outlined" label={c} />
                    ))}
                </Stack>
            )}
        </Stack>
    );

    const renderContent = () => {
        switch (currentTab) {
            case "ausbildung":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<ScubaDiving />} title="Ausbildung beim TSC" chips={["VDST / i.a.c.", "individuell", "hohe Standards"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                Wir bieten ein breites Spektrum an Ausbildungen – vom ersten Schnuppern im Kinder- und Jugendbereich bis
                                hin zu anspruchsvollen CMAS-Stufen inklusive Spezialkursen. Theorie und Praxis planen unsere
                                Tauchlehrerinnen und Tauchlehrer individuell und nach hohen Standards.
                            </Typography>
                            <Stack direction="row" spacing={1} rowGap={1} sx={{ flexWrap: "wrap", mt: 2 }}>
                                <Chip icon={<ChildCare />} label="ab 8 Jahren" />
                                <Chip icon={<ScubaDiving />} label="CMAS* bis ***" />
                                <Chip icon={<AutoAwesome />} label="Sonderbrevets" />
                            </Stack>
                        </GlassCard>

                        <GlassCard
                            sx={{
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha(
                                    theme.palette.secondary.main,
                                    0.10
                                )})`,
                            }}
                        >
                            <Typography sx={{ fontWeight: 950, mb: 0.8 }}>So läuft’s typischerweise ab</Typography>
                            <List dense sx={{ mt: 0.5 }}>
                                <Bullet>Vorgespräch & Einordnung (Ziele, Erfahrung, Zeitplan)</Bullet>
                                <Bullet>Theorie kompakt & verständlich</Bullet>
                                <Bullet>Praxis im Pool → sichere Abläufe & Tarierung</Bullet>
                                <Bullet>Freiwasser-Einheiten mit ruhiger Progression</Bullet>
                            </List>
                        </GlassCard>
                    </Stack>
                );

            case "kindertauchscheine":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<ChildCare />} title="Kindertauchscheine" chips={["I.A.C.-Richtlinien", "eigene Trainingszeit"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                Ein großer Teil unserer Mitglieder sind Kinder und Jugendliche. Für sie gibt es eine eigene Trainingszeit
                                und spezielle Kindertauch-Brevets.
                            </Typography>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<ChildCare />} title="Junior Diver" chips={["ab 8 Jahren"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 1 }}>
                                Erste Begegnung mit Gerät und Unterwasserwelt: Ausrüstungsteile kennenlernen, erster Tauchgang mit TL,
                                Verhalten unter Wasser und Grundwissen zu UW-Tieren & Pflanzen.
                            </Typography>
                            <Divider sx={{ my: 1.6 }} />
                            <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                            <List dense>
                                <Bullet>Mindestens 8 Jahre alt</Bullet>
                                <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                                <Bullet>Nachweis zum Gesundheitszustand</Bullet>
                            </List>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<ChildCare />} title="Junior Scuba Diver" chips={["ab 9 Jahren"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 1 }}>
                                Aufbaukurs: Zeichensprache, Tarierung, Orientierung unter Wasser – mehr Sicherheit und Routine.
                            </Typography>
                            <Divider sx={{ my: 1.6 }} />
                            <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                            <List dense>
                                <Bullet>Mindestens 9 Jahre alt</Bullet>
                                <Bullet>Nachweis eines Junior-Diver-Brevets</Bullet>
                                <Bullet>Nachweis über die Tauchtauglichkeit</Bullet>
                            </List>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<ChildCare />} title="Junior Open Water Diver" chips={["ab 10 Jahren"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 1 }}>
                                Für fortgeschrittene Juniors: Grundlagen der Tauchphysik, Pflege der Ausrüstung, sicheres Verhalten in der
                                Gruppe und weitere Praxis im Wasser.
                            </Typography>
                            <Divider sx={{ my: 1.6 }} />
                            <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                            <List dense>
                                <Bullet>Mindestens 10 Jahre alt</Bullet>
                                <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                                <Bullet>Nachweis über Junior Diver / Junior Scuba Diver</Bullet>
                                <Bullet>Nachweis über den Gesundheitszustand</Bullet>
                            </List>
                        </GlassCard>
                    </Stack>
                );

            case "owd":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<Star />} title="CMAS* / Open Water Diver" chips={["Einstieg", "Pool & Freiwasser"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                Dein Einstieg ins Gerätetauchen: Vom Pool in geschützten Bedingungen bis ins Freiwasser (See/Meer) lernst
                                du die Grundlagen in Theorie und Praxis – Schritt für Schritt und sicher begleitet.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                            <List dense sx={{ mt: 0.5 }}>
                                <Bullet>Nachweis über Schwimmfähigkeit</Bullet>
                                <Bullet>Erklärung zum Gesundheitszustand</Bullet>
                                <Bullet>Mindestens 14 Jahre alt</Bullet>
                            </List>
                        </GlassCard>

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 16 }}>
                            <GlassCard>
                                <SectionTitle icon={<School />} title="Theorie" />
                                <List dense>
                                    <Bullet>Ausrüstung</Bullet>
                                    <Bullet>Physik des Tauchens</Bullet>
                                    <Bullet>Tauchtabellen & Tauchcomputer</Bullet>
                                    <Bullet>Medizin & Erste Hilfe (HLW)</Bullet>
                                    <Bullet>Tauchumgebung & Umwelt</Bullet>
                                </List>
                            </GlassCard>

                            <GlassCard>
                                <SectionTitle icon={<Water />} title="Praxis" />
                                <List dense>
                                    <Bullet>Montage der Ausrüstung</Bullet>
                                    <Bullet>Ab- & Auftauchen</Bullet>
                                    <Bullet>Tarierung</Bullet>
                                    <Bullet>Druckausgleich</Bullet>
                                    <Bullet>Maske ausblasen</Bullet>
                                    <Bullet>Wiedererlangen des Atemreglers</Bullet>
                                    <Bullet>…und mehr</Bullet>
                                </List>
                            </GlassCard>
                        </Box>
                    </Stack>
                );

            case "masterdiver":
                return (
                    <GlassCard>
                        <SectionTitle icon={<Stars />} title="CMAS** / Master Diver" chips={["Sicherheit", "Verantwortung"]} />
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                            Der Master Diver rückt Sicherheit und Verantwortung in den Fokus – du vertiefst Wissen und Praxis und
                            kümmerst dich zunehmend auch um deine Mittaucher.
                        </Typography>

                        <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                        <List dense sx={{ mt: 0.5, mb: 1.8 }}>
                            <Bullet>Nachweis AOWD oder CMAS** (äquivalente Stufe)</Bullet>
                            <Bullet>Mindestens 15 Jahre alt</Bullet>
                            <Bullet>Gesundheitsnachweis</Bullet>
                            <Bullet>Mindestens 50 geloggte Tauchgänge</Bullet>
                        </List>

                        <Divider sx={{ my: 1.6 }} />
                        <Typography sx={{ fontWeight: 900 }}>Theorie & Praxis</Typography>
                        <List dense sx={{ mt: 0.5 }}>
                            <Bullet>Spezialkurs Tauchsicherheit & Rettung</Bullet>
                            <Bullet>Spezialkurs Nachttauchen</Bullet>
                            <Bullet>Ein weiterer Spezialkurs nach Wahl</Bullet>
                            <Bullet>Vertiefung der erlernten Fähigkeiten & Kenntnisse</Bullet>
                        </List>
                    </GlassCard>
                );

            case "diveleader":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<WorkspacePremium />} title="CMAS*** / Dive Leader" chips={["höchste Sporttauch-Stufe", "Führung"]} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                                Die höchste Sporttauch-Stufe – du übernimmst Verantwortung für Beginner, führst Gruppen und vertiefst
                                Theorie & Praxis umfassend. Ein Schritt Richtung Tauchlehrerin/Tauchlehrer.
                            </Typography>

                            <Typography sx={{ fontWeight: 900 }}>Voraussetzungen</Typography>
                            <List dense sx={{ mt: 0.5 }}>
                                <Bullet>Master Diver oder CMAS**</Bullet>
                                <Bullet>Mindestens 18 Jahre alt</Bullet>
                                <Bullet>Gesundheitsnachweis</Bullet>
                                <Bullet>Mindestens 65 geloggte TG, davon ≥ 10 zwischen 30–40 m</Bullet>
                                <Bullet>Tieftauchen; Tauchsicherheit & Rettung; Nachttauchen</Bullet>
                                <Bullet>Erste Hilfe / HLW-O₂-AED</Bullet>
                            </List>
                        </GlassCard>

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 16 }}>
                            <GlassCard>
                                <SectionTitle icon={<School />} title="Theorie" />
                                <List dense>
                                    <Bullet>Vertiefung CMAS** / Master Diver</Bullet>
                                    <Bullet>Tauchrelevante Gesetzgebung</Bullet>
                                    <Bullet>Tauchausrüstung, -physik und -medizin</Bullet>
                                    <Bullet>Psychologische Faktoren & Tauchführung</Bullet>
                                    <Bullet>Tauchgangsplanung & -management, Umwelt</Bullet>
                                    <Bullet>Tauchen mit unerfahrenen Tauchern</Bullet>
                                </List>
                            </GlassCard>

                            <GlassCard>
                                <SectionTitle icon={<Water />} title="Praxis" />
                                <List dense>
                                    <Bullet>60 s Zeittauchen, 45 m Streckentauchen, 10 m Tieftauchen</Bullet>
                                    <Bullet>60 min Zeitschnorcheln (≥ 1500 m Strecke)</Bullet>
                                    <Bullet>150 m Schnorcheln zu einem Gerätetaucher (7,5 m) & Transport</Bullet>
                                    <Bullet>Leinen befestigen (5 m); Boje setzen & wiederfinden</Bullet>
                                    <Bullet>Gruppenführungen; kontrollierte Aufstiege</Bullet>
                                    <Bullet>Abgabe Zweitautomat; Kompasskurs; Nachttauchgang</Bullet>
                                    <Bullet>Erste Hilfe bei Wasserunfällen</Bullet>
                                </List>
                            </GlassCard>
                        </Box>
                    </Stack>
                );

            case "sonderbrevets":
                return (
                    <GlassCard>
                        <SectionTitle icon={<AutoAwesome />} title="Sonderbrevets" chips={["flexibel", "nach Bedarf"]} />
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 1.5 }}>
                            Ergänzend zu den Standard-Brevets bieten wir regelmäßig Spezialkurse an – flexibel organisiert, je nach
                            Bedarf und Nachfrage.
                        </Typography>
                        <Divider sx={{ my: 1.6 }} />
                        <List dense>
                            <Bullet>HLW / O₂ / AED</Bullet>
                            <Bullet>Gruppenführung</Bullet>
                            <Bullet>Orientierung</Bullet>
                            <Bullet>
                                Nachttauchen <Nightlight sx={{ ml: 0.5, fontSize: 18 }} />
                            </Bullet>
                            <Bullet>Tauchsicherheit & Rettung</Bullet>
                            <Bullet>Trockentauchen</Bullet>
                            <Bullet>Tieftauchen</Bullet>
                            <Bullet>Sidemount-Tauchen</Bullet>
                            <Bullet>Nitrox</Bullet>
                        </List>
                    </GlassCard>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg">
            {/* Header */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                sx={{ mb: 3 }}
            >
                <Typography variant="h3" sx={{ mb: 1 }}>
                    Ausbildung
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.8 }}>
                    Modern, sicher und strukturiert – vom ersten Atemzug unter Wasser bis zu höheren Brevets und Spezialkursen.
                </Typography>

                <Box sx={{ mt: 2.2 }}>
                    <PillTabs value={currentTab} onChange={(_, v) => setCurrentTab(v)} tabs={tabs} />
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ pb: 2 }}>{renderContent()}</Box>
        </Container>
    );
}
