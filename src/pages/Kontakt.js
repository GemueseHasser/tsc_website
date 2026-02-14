// src/pages/Kontakt.js
import React, { useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Stack,
    IconButton,
    Button,
    alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import {
    Email,
    Facebook,
    Instagram,
    ArrowOutward,
    LocationOn,
} from "@mui/icons-material";
import KontaktDialog from "../components/KontaktDialog";

export default function Kontakt() {
    const [mapEnabled, setMapEnabled] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const addressLine1 = "Wülfrather Wasser Welt";
    const addressLine2 = "Goethestraße 23, 42489 Wülfrath";
    const mapsQuery = encodeURIComponent(`${addressLine1}, ${addressLine2}`);

    const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
    const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

    const cardSx = {
        p: { xs: 2.2, md: 3.2 },
        borderRadius: 4,
        background: alpha("#FFFFFF", 0.86),
        border: `1px solid ${alpha("#0B1B24", 0.10)}`,
        boxShadow: "0 18px 55px rgba(11,27,36,0.10)",
        backdropFilter: "blur(12px)",
        height: "100%",
    };

    const [links, setLinks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/content/links.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(setLinks)
            .catch((e) => setError(String(e)));
    }, []);

    if (error) return <div style={{ padding: 16 }}>Fehler: {error}</div>;
    if (!links) return <div style={{ padding: 16 }}>Lade Links…</div>;

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
                    Kontakt
                </Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 760, lineHeight: 1.8 }}>
                    Schreib uns kurz — wir melden uns schnellstmöglich zurück.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: { xs: 2, md: 3 },
                }}
            >
                {/* Kontakt Card */}
                <Paper component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} elevation={0} sx={cardSx}>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ xs: "stretch", sm: "center" }}>
                        <Button
                            variant="contained"
                            disableElevation
                            endIcon={<ArrowOutward />}
                            sx={{
                                background: "linear-gradient(135deg, #063A52, #27C2D3)",
                                py: 1.1,
                            }}
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

                    {/* E-Mail Hinweis */}
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 3,
                            background: alpha("#063A52", 0.04),
                            border: `1px solid ${alpha("#063A52", 0.10)}`,
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, mb: 0.4 }}>
                            vorstand@tsc-wuelfrath.de
                        </Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                            Alternativ erreichst du uns über Instagram oder Facebook.
                        </Typography>
                    </Box>

                    {/* 🟢 Neues schlichtes Formular-CTA */}
                    <Box
                        sx={{
                            mt: 3,
                            p: 2.4,
                            borderRadius: 3,
                            background: alpha("#27C2D3", 0.05),
                            border: `1px solid ${alpha("#27C2D3", 0.18)}`,
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, mb: 0.8 }}>
                            Probetraining oder Schnuppertauchen?
                        </Typography>

                        <Typography sx={{ color: "text.secondary", mb: 2, lineHeight: 1.8 }}>
                            Nutze unser Formular für eine schnelle und strukturierte Anfrage.
                        </Typography>

                        <Button
                            variant="contained"
                            disableElevation
                            onClick={() => setOpenDialog(true)}
                            sx={{
                                px: 3.5,
                                py: 1.2,
                                borderRadius: 999,
                                fontWeight: 800,
                                background: "linear-gradient(135deg, #063A52, #27C2D3)",
                                boxShadow: "0 8px 25px rgba(39,194,211,0.25)",
                                "&:hover": {
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 12px 35px rgba(39,194,211,0.35)",
                                },
                            }}
                        >
                            Probetraining / Schnuppertauchen vereinbaren
                        </Button>
                    </Box>
                </Paper>

                {/* Maps Card */}
                <Paper component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} elevation={0} sx={cardSx}>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <LocationOn />
                        <Typography sx={{ fontWeight: 950 }}>
                            {addressLine1}
                        </Typography>
                    </Stack>

                    <Typography sx={{ color: "text.secondary", mb: 2 }}>
                        {addressLine2}
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={() => setMapEnabled(true)}
                        sx={{
                            mb: 2,
                            borderColor: alpha("#0B1B24", 0.18),
                            background: alpha("#fff", 0.6),
                        }}
                    >
                        Karte laden
                    </Button>

                    <Box
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                            height: 320,
                        }}
                    >
                        {mapEnabled ? (
                            <iframe
                                title="Google Maps"
                                src={mapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                        ) : (
                            <Box sx={{ p: 3, textAlign: "center" }}>
                                <Typography sx={{ color: "text.secondary" }}>
                                    Google Maps wird erst nach Klick geladen.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>

            {/* Dialog */}
            <KontaktDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Container>
    );
}
