// src/pages/Kontakt.js
import React from "react";
import {Container, Box, Paper, Typography, IconButton, Stack} from "@mui/material";
import { motion } from "framer-motion";
import {Email, Facebook, Instagram} from "@mui/icons-material";

export default function Kontakt() {
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
                        textAlign: "center",
                        background: "linear-gradient(to bottom right, rgba(0, 77, 115, 0.85), rgba(0, 188, 212, 0.85))",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        Kontakt
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.9 }}>
                        Wende dich bitte per Insta, Mail oder Facebook an uns.
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
                            <IconButton color="inherit" href="https://instagram.com" target="_blank">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="https://facebook.com" target="_blank">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" href="mailto:info@tsc-wuelfrath.de">
                                <Email />
                            </IconButton>
                        </Stack>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
