// src/pages/Training.js
import React from "react";
import { Container, Box, Typography, Paper, Stack, Chip, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Pool, AccessTime, LocationOn } from "@mui/icons-material";

export default function Training() {
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
                    Training
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 780, lineHeight: 1.8 }}>
                    Kondition, Technik und Sicherheit – wir trainieren regelmäßig in der Wülfrather Wasserwelt.
                    Neue Gesichter sind jederzeit willkommen.
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
            </Paper>
        </Container>
    );
}
