// src/pages/Start.js
import React, { useEffect, useMemo, useState } from "react";
import { Container, Box, Typography, Stack, Button, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowOutward } from "@mui/icons-material";

export default function Start() {
    const [heroImages, setHeroImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);

    const [content, setContent] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/resources/start/startImages.json")
            .then((res) => res.json())
            .then((data) => setHeroImages(data.map((img) => process.env.PUBLIC_URL + `/resources/start/${img}`)))
            .catch(() => setHeroImages([]));
    }, []);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/content/start.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} beim Laden von /content/start.json`);
                return res.json();
            })
            .then(setContent)
            .catch((e) => setError(String(e)));
    }, []);

    const hasImages = heroImages.length > 0;

    // Auto-Advance (dezent)
    useEffect(() => {
        if (!hasImages) return;
        const t = setInterval(() => setCurrentImage((p) => (p + 1) % heroImages.length), 6500);
        return () => clearInterval(t);
    }, [hasImages, heroImages.length]);

    const bgImage = useMemo(() => (hasImages ? heroImages[currentImage] : null), [hasImages, heroImages, currentImage]);

    if (error) return <div style={{ padding: 16 }}>Fehler: {error}</div>;
    if (!content) return <div style={{ padding: 16 }}>Lade Inhalte…</div>;

    return (
        <Box>
            {/* Hero */}
            <Box
                component={motion.div}
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    position: "relative",
                    minHeight: { xs: 480, md: 560 },
                    display: "flex",
                    alignItems: "flex-end",
                    overflow: "hidden",
                    borderRadius: { xs: 0, md: 6 },
                    mx: { xs: 0, md: 3 },
                    boxShadow: { xs: "none", md: "0 26px 70px rgba(6,58,82,0.20)" },
                    background: bgImage
                        ? `linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.72) 100%), url(${bgImage})`
                        : `linear-gradient(135deg, rgba(6,58,82,1), rgba(39,194,211,1))`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Soft highlight */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(700px 400px at 20% 20%, rgba(39,194,211,0.25), transparent 55%)",
                        pointerEvents: "none",
                    }}
                />

                <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 7 }, position: "relative", zIndex: 2 }}>
                    <Box sx={{ maxWidth: 820 }}>
                        <Typography variant="h2" sx={{ color: "white", mb: 1.2, lineHeight: 1.05 }}>
                            {content.headline}
                        </Typography>
                        <Typography variant="h6" sx={{ color: alpha("#fff", 0.86), mb: 2.6, fontWeight: 500 }}>
                            {content.slogan}
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<ArrowOutward />}
                                sx={{
                                    px: 2.2,
                                    py: 1.1,
                                    background: "linear-gradient(135deg, #063A52, #27C2D3)",
                                }}
                                onClick={() => window.scrollTo({ top: 620, behavior: "smooth" })}
                            >
                                Mehr erfahren
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    px: 2.2,
                                    py: 1.1,
                                    color: "white",
                                    borderColor: alpha("#fff", 0.28),
                                    background: alpha("#000", 0.12),
                                    "&:hover": { borderColor: alpha("#fff", 0.40), background: alpha("#000", 0.22) },
                                }}
                                onClick={() => window.location.href = "mailto:vorstand@tsc-wuelfrath.de"}
                            >
                                Kontakt aufnehmen
                            </Button>
                        </Stack>

                        {/* Dots */}
                        {hasImages && (
                            <Stack direction="row" spacing={0.8} sx={{ mt: 3 }}>
                                {heroImages.map((_, idx) => (
                                    <Box
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)}
                                        sx={{
                                            width: idx === currentImage ? 22 : 9,
                                            height: 9,
                                            borderRadius: 999,
                                            cursor: "pointer",
                                            background: idx === currentImage ? "white" : alpha("#fff", 0.38),
                                            transition: "all 180ms ease",
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ mt: { xs: 3, md: 5 } }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{
                        p: { xs: 2.2, md: 3.5 },
                        borderRadius: 4,
                        background: alpha("#FFFFFF", 0.85),
                        border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                        boxShadow: "0 18px 50px rgba(11,27,36,0.10)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 1.5 }}>
                        Willkommen beim TSC Wülfrath
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: { xs: "1rem", md: "1.05rem" } }}>
                        {content.bodyText.map((line, i) => (
                            <Box key={i} component="p" sx={{ m: 0, mb: 1.2 }}>
                                {line}
                            </Box>
                        ))}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
