// src/pages/Kontakt.js
import React, {useEffect, useState} from "react";
import { Container, Box, Typography, Paper, Stack, IconButton, Button, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Email, Facebook, Instagram, ArrowOutward } from "@mui/icons-material";

export default function Kontakt() {
    const [links, setLinks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/content/links.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} beim Laden von /content/links.json`);
                return res.json();
            })
            .then(setLinks)
            .catch((e) => setError(String(e)));
    }, []);

    if (error) return <div style={{padding: 16}}>Fehler: {error}</div>;
    if (!links) return <div style={{padding: 16}}>Lade Links…</div>;

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
                    Kontakt
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 760, lineHeight: 1.8 }}>
                    Schreib uns kurz — wir melden uns schnellstmöglich zurück.
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ xs: "stretch", sm: "center" }}>
                    <Button
                        variant="contained"
                        disableElevation
                        endIcon={<ArrowOutward />}
                        sx={{ background: "linear-gradient(135deg, #063A52, #27C2D3)", py: 1.1 }}
                        onClick={() => (window.location.href = "mailto:" + links.email)}
                    >
                        Mail an den Vorstand
                    </Button>

                    <Stack direction="row" spacing={1}>
                        <IconButton href={links.instagram} target="_blank">
                            <Instagram />
                        </IconButton>
                        <IconButton href={links.facebook} target="_blank">
                            <Facebook />
                        </IconButton>
                        <IconButton href={"mailto:" + links.email}>
                            <Email />
                        </IconButton>
                    </Stack>
                </Stack>

                <Box sx={{ mt: 2, p: 2, borderRadius: 3, background: alpha("#063A52", 0.04), border: `1px solid ${alpha("#063A52", 0.10)}` }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.4 }}>{links.email}</Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                        Alternativ erreichst du uns über Instagram oder Facebook.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
