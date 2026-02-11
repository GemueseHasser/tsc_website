import React, {useEffect, useState} from "react";
import { Container, Box, Typography, Paper, Stack, Chip, Divider, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Gavel, Email, AccountBalance, Groups } from "@mui/icons-material";

export default function Impressum() {
    const [content, setContent] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/content/impressum.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} beim Laden von /content/impressum.json`);
                return res.json();
            })
            .then(setContent)
            .catch((e) => setError(String(e)));
    }, []);

    if (error) return <div style={{ padding: 16 }}>Fehler: {error}</div>;
    if (!content) return <div style={{ padding: 16 }}>Lade Inhalte…</div>;

    return (
        <Container maxWidth="lg">
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                sx={{ mb: 3 }}
            >
                <Typography variant="h3" sx={{ mb: 1 }}>
                    Impressum
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.8 }}>
                    Angaben gemäß § 5 TMG
                </Typography>
            </Box>

            <Paper
                component={motion.div}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                elevation={0}
                sx={{
                    p: { xs: 2.2, md: 3.2 },
                    borderRadius: 4,
                    background: alpha("#FFFFFF", 0.86),
                    border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                    boxShadow: "0 18px 55px rgba(11,27,36,0.10)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.1} sx={{ mb: 2 }}>
                    <Chip icon={<Groups />} label="Verein" />
                    <Chip icon={<Gavel />} label="Rechtliche Angaben" />
                    <Chip icon={<AccountBalance />} label="Bankverbindung" />
                    <Chip icon={<Email />} label="Kontakt" />
                </Stack>

                <Divider sx={{ mb: 2 }} />

                {/* Vereinsangaben */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Tauchsportclub Wülfrath e.V.
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        Vertreten durch:<br />
                        {content.verantwortlicher}<br />
                        E-Mail: <b>{content.email}</b>
                    </Typography>
                </Box>

                {/* Mitgliedschaften */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Mitgliedschaften
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        {content.mitgliedschaften.map((line, i) => (
                            <Box key={i} component="p" sx={{ m: 0, mb: 1.2 }}>
                                {line}
                            </Box>
                        ))}
                    </Typography>
                </Box>

                {/* Registereintrag */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Vereinsregister
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        Eingetragen beim Amtsgericht Mettmann<br />
                        Vereinsregisternummer: VR 10363
                    </Typography>
                </Box>

                {/* Bankverbindung */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Bankverbindung
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        {content.bankverbindung.name}<br />
                        IBAN: {content.bankverbindung.iban}<br />
                        BIC: {content.bankverbindung.bic}<br />
                        BLZ: {content.bankverbindung.blz}<br />
                        Konto-Nr.: {content.bankverbindung.kontoNr}
                    </Typography>
                </Box>

                {/* Haftungsausschluss */}
                <Divider sx={{ my: 2 }} />

                <Box>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Disclaimer / Haftungsausschluss
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        Die einzelnen Seiten dieser Internet-Domain wurden sorgfältig erstellt.
                        Der Tauch-Sport-Club Wülfrath e.V. kann für die Aktualität,
                        Richtigkeit, Vollständigkeit und Qualität dieser Website keinerlei
                        Verantwortung übernehmen.
                    </Typography>

                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mt: 1.5 }}>
                        Haftungen für Schäden, die durch das Herunterladen von Daten oder das
                        Benutzen dieser Website entstehen, werden ausgeschlossen.
                        Unsere Website enthält Links zu anderen Website-Betreibern.
                    </Typography>

                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mt: 1.5 }}>
                        Der Tauch-Sport-Club Wülfrath e.V. übernimmt keine Gewähr oder Haftung
                        für deren Funktion sowie eventuell rechtswidrige Inhalte oder sonstige
                        Rechtsverletzungen.
                    </Typography>

                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mt: 1.5 }}>
                        Inhalte wie Texte, Bilder und Grafiken unterliegen dem Schutz des
                        Urheberrechts und anderen Gesetzen zum Schutz des geistigen Eigentums.
                        Eine Vervielfältigung oder Verbreitung der Seiten oder ihrer Inhalte ist
                        nur mit schriftlicher Einwilligung und nur in Verbindung mit Quellen-
                        und Datumsangabe zulässig.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
