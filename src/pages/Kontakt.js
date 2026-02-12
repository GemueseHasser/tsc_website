// src/pages/Kontakt.js
import React from "react";
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

export default function Kontakt() {
    const [mapEnabled, setMapEnabled] = React.useState(false);

    // Adresse (laut Stadt Wülfrath)
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
                <Typography
                    sx={{ color: "text.secondary", maxWidth: 760, lineHeight: 1.8 }}
                >
                    Schreib uns kurz — wir melden uns schnellstmöglich zurück.
                </Typography>
            </Box>

            {/* 2 Spalten: Kontakt + Karte */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: { xs: 2, md: 3 },
                    alignItems: "stretch",
                }}
            >
                {/* Kontakt-Card */}
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    elevation={0}
                    sx={cardSx}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.2}
                        alignItems={{ xs: "stretch", sm: "center" }}
                    >
                        <Button
                            variant="contained"
                            disableElevation
                            endIcon={<ArrowOutward />}
                            sx={{
                                background: "linear-gradient(135deg, #063A52, #27C2D3)",
                                py: 1.1,
                            }}
                            onClick={() =>
                                (window.location.href = "mailto:" + links.email)
                            }
                        >
                            Mail an den Vorstand
                        </Button>

                        <Stack direction="row" spacing={1}>
                            <IconButton
                                href={links.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                href={links.facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                href={"mailto:" + links.email}
                                aria-label="E-Mail"
                            >
                                <Email />
                            </IconButton>
                        </Stack>
                    </Stack>

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
                </Paper>

                {/* Maps-Card */}
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    elevation={0}
                    sx={cardSx}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 999,
                                display: "grid",
                                placeItems: "center",
                                background: alpha("#27C2D3", 0.10),
                                border: `1px solid ${alpha("#27C2D3", 0.22)}`,
                            }}
                        >
                            <LocationOn />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1.15 }}>
                                Trainingsort
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {addressLine1}
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                        {addressLine2}
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.1}
                        sx={{ mt: 1.6 }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setMapEnabled(true)}
                            sx={{
                                borderColor: alpha("#0B1B24", 0.18),
                                background: alpha("#fff", 0.6),
                                "&:hover": {
                                    borderColor: alpha("#0B1B24", 0.30),
                                    background: alpha("#fff", 0.8),
                                },
                            }}
                        >
                            Karte laden
                        </Button>

                        <Button
                            variant="text"
                            endIcon={<ArrowOutward />}
                            href={mapsOpenUrl}
                            target="_blank"
                            rel="noreferrer"
                            sx={{ justifyContent: "flex-start" }}
                        >
                            In Google Maps öffnen
                        </Button>
                    </Stack>

                    <Box
                        sx={{
                            mt: 1.8,
                            borderRadius: 3,
                            overflow: "hidden",
                            border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                            background: alpha("#0B1B24", 0.03),
                            height: 320,
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        {!mapEnabled ? (
                            <Box sx={{ p: 2, textAlign: "center" }}>
                                <Typography sx={{ fontWeight: 900, mb: 0.6 }}>
                                    Google Maps wird erst nach Klick geladen
                                </Typography>
                                <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                                    So werden beim Seitenaufruf keine externen Inhalte nachgeladen.
                                </Typography>
                            </Box>
                        ) : (
                            <iframe
                                title={`Google Maps: ${addressLine1}`}
                                src={mapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: "block" }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        )}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
