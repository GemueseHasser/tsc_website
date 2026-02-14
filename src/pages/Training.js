// src/pages/Training.js
import { useState, React} from "react";
import {Container, Box, Typography, Paper, Stack, Chip, alpha, Divider, Button} from "@mui/material";
import { motion } from "framer-motion";
import { Pool, AccessTime, LocationOn, ScubaDiving, CheckCircle } from "@mui/icons-material";

import KontaktDialog from "../components/KontaktDialog";

export default function Training() {
    const [openDialog, setOpenDialog] = useState(false);

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
                    Training
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 780, lineHeight: 1.8 }}>
                    Kondition, Technik und Sicherheit – wir trainieren regelmäßig in der Wülfrather Wasserwelt.
                    Neue Gesichter sind jederzeit willkommen.
                </Typography>
            </Box>

            {/* Training Card */}
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
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.2} sx={{ mb: 2 }}>
                    <Chip icon={<Pool />} label="Wülfrather Wasserwelt" />
                    <Chip icon={<LocationOn />} label="Wülfrath" />
                    <Chip icon={<AccessTime />} label="Wasserzeiten" />
                </Stack>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 16 }}>
                    <Box
                        sx={{
                            p: 2.2,
                            borderRadius: 3,
                            background: alpha("#063A52", 0.04),
                            border: `1px solid ${alpha("#063A52", 0.10)}`,
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, mb: 0.6 }}>Kinder- & Jugendtraining</Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                            Montags <b>16:00 – 17:00 Uhr</b>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 2.2,
                            borderRadius: 3,
                            background: alpha("#27C2D3", 0.08),
                            border: `1px solid ${alpha("#27C2D3", 0.22)}`,
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, mb: 0.6 }}>Erwachsenentraining</Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                            Donnerstags <b>20:30 – 21:30 Uhr</b>
                        </Typography>
                    </Box>
                </Box>

                <Typography sx={{ mt: 2.2, color: "text.secondary", lineHeight: 1.8 }}>
                    Tipp: Bitte ca. <b>30 Minuten vorher</b> da sein, damit wir entspannt starten können.
                </Typography>

                {/* Divider / Übergang zu Schnuppertauchen */}
                <Divider sx={{ my: { xs: 2.2, md: 2.6 }, borderColor: alpha("#0B1B24", 0.10) }} />

                {/* Schnuppertauchen (integriert) */}
                <Box>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        Schnuppertauchen
                    </Typography>

                    <Typography sx={{ color: "text.secondary", maxWidth: 820, lineHeight: 1.8, mb: 2 }}>
                        Ein erster, sicherer Einstieg in die Unterwasserwelt – mit Anleitung durch erfahrene Tauchlehrer.
                        Ausrüstung stellen wir kostenlos.
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1.1} sx={{ mb: 2 }}>
                        <Chip icon={<ScubaDiving />} label="Kostenlose Ausrüstung" />
                        <Chip icon={<CheckCircle />} label="Fachkundige Begleitung" />
                        <Chip icon={<AccessTime />} label="Zu Trainingszeiten möglich" />
                    </Stack>

                    <Box
                        sx={{
                            p: 2.2,
                            borderRadius: 3,
                            background: alpha("#0B1B24", 0.03),
                            border: `1px solid ${alpha("#0B1B24", 0.08)}`,
                        }}
                    >
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                            Wer einmal in die schwerelose Unterwasserwelt eintauchen möchte, ist herzlich eingeladen.
                            Nach Terminabsprache kann im Hallenbad mit Gerät probegetaucht werden.
                            Minderjährige benötigen die schriftliche Einverständniserklärung eines Erziehungsberechtigten.
                            <br /><br />
                            Bitte Badebekleidung mitbringen – Eintritt und Ausrüstung sind kostenlos.
                            <br /><br />
                            Das Schnuppertauchen ist zu unseren Trainingszeiten möglich.
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 4,
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        background: alpha("#27C2D3", 0.06),
                        border: `1px solid ${alpha("#27C2D3", 0.18)}`,
                        boxShadow: "0 18px 45px rgba(11,27,36,0.10)",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                        Lust bekommen?
                    </Typography>

                    <Typography sx={{ mb: 3, color: "text.secondary", maxWidth: 600 }}>
                        Vereinbare jetzt dein Probetraining oder Schnuppertauchen.
                        Wir freuen uns auf deine Anfrage.
                    </Typography>

                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        onClick={() => setOpenDialog(true)}
                        sx={{
                            px: 4,
                            py: 1.4,
                            fontWeight: 800,
                            borderRadius: 999,
                            background: "linear-gradient(135deg, #063A52, #27C2D3)",
                            boxShadow: "0 10px 30px rgba(39,194,211,0.35)",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 14px 40px rgba(39,194,211,0.45)",
                            },
                            transition: "all 0.25s ease",
                        }}
                    >
                        Probetraining / Schnuppertauchen vereinbaren
                    </Button>
                </Box>

                <KontaktDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                />
            </Paper>
        </Container>
    );
}
