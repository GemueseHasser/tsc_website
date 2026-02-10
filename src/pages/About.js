// src/pages/About.js
import React, { useMemo, useState } from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    alpha,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
    HistoryEdu,
    Groups,
    Badge,
    Savings,
    Newspaper,
    Handshake,
    CheckCircle,
    Person,
    School,
    Build,
} from "@mui/icons-material";

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

function BulletList({ items }) {
    return (
        <List dense sx={{ mt: 0.5 }}>
            {items.map((it, idx) => (
                <ListItem key={idx} sx={{ px: 0, py: 0.35 }}>
                    <ListItemIcon sx={{ minWidth: 34 }}>
                        <CheckCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={it}
                        primaryTypographyProps={{ sx: { color: "text.secondary", lineHeight: 1.6 } }}
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default function About() {
    const theme = useTheme();

    const tabs = useMemo(
        () => [
            { label: "Über uns", key: "about", icon: <HistoryEdu /> },
            { label: "Ansprechpartner", key: "ansprechpartner", icon: <Badge /> },
            { label: "Mitgliedschaft", key: "mitgliedschaft", icon: <Savings /> },
            { label: "Presse", key: "presse", icon: <Newspaper /> },
            { label: "Förderung", key: "foerderung", icon: <Handshake /> },
        ],
        []
    );

    const [currentTab, setCurrentTab] = useState("about");

    const SectionTitle = ({ icon, title, subtitle }) => (
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
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
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.15 }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Stack>
    );

    const renderTabContent = () => {
        switch (currentTab) {
            case "about":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle
                                icon={<Groups />}
                                title="Tauchsport mit Haltung"
                                subtitle="Gemeinschaft, Sicherheit und die Faszination Unterwasser"
                            />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                Über 50 Jahre Tauchsport Club Wülfrath: Am 15.09.1972 trafen sich zehn begeisterte Taucher in den
                                Privaträumen von Peter Stach in Wülfrath – der Startschuss für einen Verein, der bis heute für
                                fundierte Ausbildung, Spaß am Sport und respektvollen Umgang mit der Natur steht.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 16 }}>
                                <Box
                                    sx={{
                                        p: 2.2,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.primary.main, 0.04),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.10)}`,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>Unser Fokus</Typography>
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                        Kein Leistungssport – wir tauchen, um die Vielfalt der Unterwasserwelt und die Schwerelosigkeit zu
                                        erleben. Sicherheit und saubere Technik sind dabei die Basis.
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        p: 2.2,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.secondary.main, 0.08),
                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.22)}`,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>Ausbildung</Typography>
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                        Wir setzen auf gründliche Ausbildung statt Schnellkurs: vom Einstieg bis zu höheren Brevets – mit
                                        mehreren Tauchlehrern und starkem Jugendbereich.
                                    </Typography>
                                </Box>
                            </Box>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<HistoryEdu />} title="Kurzchronik" subtitle="Ein paar Meilensteine" />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 16 }}>
                                {[
                                    { year: "1972", text: "Gründung durch zehn Taucher in Wülfrath." },
                                    { year: "1973", text: "Eintragung als TSC Niederberg ins Vereinsregister." },
                                    { year: "…", text: "Umbenennung zu TSC Wülfrath – klarer Bezug zur Heimatgemeinde." },
                                ].map((t) => (
                                    <Box
                                        key={t.year}
                                        sx={{
                                            p: 2.2,
                                            borderRadius: 3,
                                            border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
                                            background: alpha("#fff", 0.6),
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 950, fontSize: 18 }}>{t.year}</Typography>
                                        <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mt: 0.6 }}>{t.text}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </GlassCard>
                    </Stack>
                );

            case "ansprechpartner":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<Badge />} title="Vorstand" subtitle="Deine Ansprechpartner im Verein" />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 16 }}>
                                {[
                                    { title: "1. Vorsitzender", name: "Marc Nußbaum", icon: <Person /> },
                                    { title: "2. Vorsitzender", name: "Luca Nicastro", icon: <Person /> },
                                    { title: "Kassierer", name: "Gunnar Brücken", icon: <Person /> },
                                ].map((p) => (
                                    <Box
                                        key={p.title}
                                        sx={{
                                            p: 2.2,
                                            borderRadius: 3,
                                            border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
                                            background: alpha("#fff", 0.65),
                                        }}
                                    >
                                        <Stack direction="row" spacing={1.1} alignItems="center" sx={{ mb: 0.8 }}>
                                            <Box
                                                sx={{
                                                    width: 38,
                                                    height: 38,
                                                    borderRadius: 999,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    background: alpha(theme.palette.primary.main, 0.08),
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                                                }}
                                            >
                                                {p.icon}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 900, lineHeight: 1.15 }}>{p.name}</Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    {p.title}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                ))}
                            </Box>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<School />} title="Trainer & Tauchlehrer" />
                            <BulletList
                                items={[
                                    "Gunnar Brücken – TL***, Kinder-TL, Freediving-TL",
                                    "Benjamin Nawrath – TL**, Kinder-TL",
                                ]}
                            />
                            <Divider sx={{ my: 2 }} />
                            <SectionTitle icon={<Build />} title="Gerätewarte" />
                            <BulletList items={["1. Gerätewart: Jonas Lobe", "2. Gerätewart: Daniel Kus"]} />
                        </GlassCard>
                    </Stack>
                );

            case "mitgliedschaft":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<Savings />} title="Mitgliedschaft" subtitle="Training, Community & Vorteile" />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: 16 }}>
                                <Box
                                    sx={{
                                        p: 2.2,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.secondary.main, 0.08),
                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.22)}`,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 950, mb: 0.6 }}>Welche Vorteile bietet die Mitgliedschaft?</Typography>
                                    <BulletList
                                        items={[
                                            "Teilnahme am regelmäßigen Training",
                                            "Günstige Ausrüstungsausleihe für Anfänger & Gelegenheitstaucher",
                                            "Zugriff auf eine große Buddy-Liste für gemeinsame Tauchgänge",
                                            "Organisation von Tauchtouren zu spannenden Plätzen",
                                            "Kostenlose Flaschenfüllung am Vereinskompressor",
                                            "Jahrestauchgenehmigung am See Gut Widdauen 2 (50% vom Verein getragen)",
                                        ]}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: 2.2,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.primary.main, 0.04),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.10)}`,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 950, mb: 0.8 }}>Wie wird man Mitglied?</Typography>
                                    <BulletList
                                        items={[
                                            "Gültige Tauchtauglichkeitsuntersuchung",
                                            "Aufnahmeantrag inkl. SEPA-Mandat & Satzung",
                                            "Bei Ausbildung zum Bronzetaucher zusätzlich Ausbildungsvertrag",
                                        ]}
                                    />
                                </Box>
                            </Box>
                        </GlassCard>

                        <GlassCard>
                            <SectionTitle icon={<Savings />} title="Mitgliedsbeiträge" />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                Die Aufnahmegebühr entfällt seit Beschluss der Mitgliederversammlung am 22.03.2013.
                            </Typography>

                            <Stack direction="row" rowGap={1} spacing={1} sx={{ flexWrap: "wrap", mt: 1.5 }}>
                                <Chip label="Erwachsene: 12 €/Monat" />
                                <Chip label="Jugend/Schüler/Studierende/Azubis: 7 €/Monat (Nachweis)" />
                                <Chip label="Passiv: 4 €/Monat" />
                            </Stack>

                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 3,
                                    border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
                                    background: alpha("#fff", 0.65),
                                }}
                            >
                                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                    Im Beitrag enthalten: Nutzung des Schwimmbads zweimal pro Woche, Versicherungsschutz sowie ein Abo der
                                    Tauchsport-Zeitschrift.
                                </Typography>
                            </Box>
                        </GlassCard>
                    </Stack>
                );

            case "presse":
                return (
                    <GlassCard>
                        <SectionTitle icon={<Newspaper />} title="Presse" subtitle="Material & Infos für Medien" />
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                            Pressemitteilungen oder Bildmaterialien für Medien findest du hier. (Wenn du Inhalte hast, können wir das
                            als Download-Bereich mit sauberen Cards & Dateilisten aufbauen.)
                        </Typography>
                    </GlassCard>
                );

            case "foerderung":
                return (
                    <Stack spacing={2}>
                        <GlassCard>
                            <SectionTitle icon={<Handshake />} title="Förderung" subtitle="REACT-EU & Digitalisierung" />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.95 }}>
                                Liebe Mitglieder, Unterstützer und Freunde des Vereins,
                                <br />
                                <br />
                                wir freuen uns, Ihnen mitteilen zu können, dass der TSC durch die großzügige Förderung der Europäischen
                                Union im Rahmen des Programms REACT-EU und der Landesregierung Nordrhein-Westfalen eine bedeutende
                                Chance erhält, die Digitalisierung in unserem Verein voranzutreiben.
                                <br />
                                <br />
                                Unsere Vision ist es, unseren Verein fit für die Zukunft zu machen und unsere Mitglieder sowie die
                                Gemeinschaft noch besser zu unterstützen. In Zeiten zunehmender Digitalisierung ist es essentiell, die
                                modernen Technologien und Möglichkeiten zu nutzen, um unsere Vereinsarbeit effizienter und zugänglicher
                                zu gestalten.
                            </Typography>
                        </GlassCard>

                        <GlassCard
                            sx={{
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha(
                                    theme.palette.secondary.main,
                                    0.10
                                )})`,
                            }}
                        >
                            <Typography sx={{ fontWeight: 950, mb: 0.8 }}>Was wird konkret verbessert?</Typography>
                            <BulletList
                                items={[
                                    "Verbesserte Finanzorganisation durch digitale Prozesse",
                                    "Transparente, nachvollziehbare Buchhaltung und Verwaltung",
                                    "Bessere Unterstützung der Vereinsarbeit durch moderne Ausstattung",
                                ]}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                Wir bedanken uns herzlich bei der Europäischen Union und der Landesregierung NRW für diese Möglichkeit.
                                <br />
                                <br />
                                Ihr TSC-Vorstand
                            </Typography>
                        </GlassCard>
                    </Stack>
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
                    Über uns
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 860, lineHeight: 1.8 }}>
                    Ein Verein mit Tradition – und mit modernem Anspruch an Ausbildung, Sicherheit und Gemeinschaft.
                </Typography>

                <Box sx={{ mt: 2.2 }}>
                    <PillTabs
                        value={currentTab}
                        onChange={(_, v) => setCurrentTab(v)}
                        tabs={tabs}
                    />
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ pb: 2 }}>{renderTabContent()}</Box>
        </Container>
    );
}
