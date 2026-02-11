import React from "react";
import { Container, Box, Typography, Paper, Stack, Chip, Divider, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Gavel, Email, AccountBalance, Groups } from "@mui/icons-material";

export default function Impressum() {
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
                        Marc Nußbaum (1. Vorsitzender)<br />
                        E-Mail: <b>vorstand@tsc-wuelfrath.de</b>
                    </Typography>
                </Box>

                {/* Mitgliedschaften */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                        Mitgliedschaften
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        International Diving Association (IDA) – Nr. 0705-16<br />
                        Verband Deutscher Sporttaucher (VDST) – Nr. 080050
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
                        Kreissparkasse Düsseldorf<br />
                        IBAN: DE09 3015 0200 0003 5798 44<br />
                        BIC: WELADED1KSD<br />
                        BLZ: 301 502 00<br />
                        Konto-Nr.: 3 579 844
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
