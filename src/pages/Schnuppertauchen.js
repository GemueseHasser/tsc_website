// src/pages/Schnuppertauchen.js
import React from "react";
import { Container, Box, Typography, Paper, Stack, Chip, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { ScubaDiving, CheckCircle, AccessTime } from "@mui/icons-material";

export default function Schnuppertauchen() {
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
                    Schnuppertauchen
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 820, lineHeight: 1.8 }}>
                    Ein erster, sicherer Einstieg in die Unterwasserwelt – mit Anleitung durch erfahrene Tauchlehrer.
                    Ausrüstung stellen wir kostenlos.
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
                    <Chip icon={<ScubaDiving />} label="Kostenlose Ausrüstung" />
                    <Chip icon={<CheckCircle />} label="Fachkundige Begleitung" />
                    <Chip icon={<AccessTime />} label="Zu Trainingszeiten möglich" />
                </Stack>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                    Wer einmal in die schwerelose Unterwasserwelt eintauchen möchte, ist herzlich eingeladen.
                    Nach Terminabsprache kann im Hallenbad mit Gerät probegetaucht werden.
                    Minderjährige benötigen die schriftliche Einverständniserklärung eines Erziehungsberechtigten.
                    <br /><br />
                    Bitte Badebekleidung mitbringen – Eintritt und Ausrüstung sind kostenlos.
                    <br /><br />
                    Möglich zu unseren Trainingszeiten:
                    <br />
                    <b>Montags 16:00 – 17:00 Uhr</b> (Kinder/Jugend) <br />
                    <b>Donnerstags 20:30 – 21:30 Uhr</b> (Erwachsene) <br />
                    (Wasserzeiten – bitte etwa <b>30 Minuten vorher</b> da sein.)
                </Typography>
            </Paper>
        </Container>
    );
}
