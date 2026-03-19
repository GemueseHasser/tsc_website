import React, { useEffect, useMemo, useState } from "react";
import { Container, Box, Typography, Stack, Button, alpha } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ExternalContentNotice from "../components/ExternalContentNotice";
import { useCookieConsent } from "../context/CookieConsentContext";

function InstagramAktuelles() {
    const { hasExternalConsent } = useCookieConsent();

    useEffect(() => {
        if (!hasExternalConsent) return;

        if (!window.instgrm) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => window.instgrm?.Embeds?.process?.();
            document.body.appendChild(script);
        } else {
            window.instgrm?.Embeds?.process?.();
        }
    }, [hasExternalConsent]);

    return (
        <Box
            sx={{
                p: { xs: 1.5, sm: 2, md: 3.5 },
                borderRadius: { xs: 2.2, md: 3 },
                background: { xs: "#FFFFFF", md: alpha("#FFFFFF", 0.85) },
                border: `1px solid ${alpha("#0B1B24", 0.1)}`,
                boxShadow: {
                    xs: "none",
                    sm: "0 10px 24px rgba(11,27,36,0.08)",
                    md: "0 18px 50px rgba(11,27,36,0.10)",
                },
                backdropFilter: { xs: "none", md: "blur(12px)" },
                height: "100%",
                minWidth: 0,
                maxWidth: "100%",
                overflow: "hidden",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 1.5,
                    fontSize: { xs: "1.85rem", sm: "2rem", md: "2.125rem" },
                    lineHeight: 1.15,
                    overflowWrap: "break-word",
                }}
            >
                Instagram
            </Typography>

            {!hasExternalConsent ? (
                <ExternalContentNotice
                    title="Instagram-Inhalte erst nach Einwilligung"
                    description="Nach deiner Zustimmung wird der Instagram-Feed direkt auf der Startseite geladen."
                />
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        maxWidth: "100%",
                        display: "flex",
                        justifyContent: "center",
                        overflow: "hidden",
                        "& .instagram-media": {
                            width: "100% !important",
                            maxWidth: "100% !important",
                            minWidth: "0 !important",
                            margin: "0 !important",
                        },
                        "& iframe": {
                            maxWidth: "100% !important",
                        },
                    }}
                >
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink="https://www.instagram.com/tsc.wuelfrath/"
                        data-instgrm-version="14"
                        style={{
                            background: "#FFF",
                            border: 0,
                            width: "100%",
                            maxWidth: "100%",
                            minWidth: 0,
                            margin: 0,
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}

export default function Start({ onNavigate }) {
    const [heroImages, setHeroImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const contentRef = React.useRef(null);
    const [content, setContent] = useState(null);
    const [error, setError] = useState("");
    const { scrollY } = useScroll();
    const parallaxRaw = useTransform(scrollY, [0, 700], [0, 80]);
    const parallaxY = useSpring(parallaxRaw, { stiffness: 120, damping: 20, mass: 0.2 });

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/resources/start/startImages.json")
            .then((res) => res.json())
            .then((data) =>
                setHeroImages(data.map((img) => process.env.PUBLIC_URL + `/resources/start/${img}`))
            )
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

    useEffect(() => {
        if (!hasImages) return undefined;
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [hasImages, heroImages.length]);

    const bgImage = useMemo(
        () => (hasImages ? heroImages[currentImage] : null),
        [hasImages, heroImages, currentImage]
    );

    if (error) return <div style={{ padding: 16 }}>Fehler: {error}</div>;
    if (!content) return <div style={{ padding: 16 }}>Lade Inhalte…</div>;

    return (
        <Box sx={{ overflowX: "hidden" }}>
            <Box
                sx={{
                    position: "relative",
                    minHeight: { xs: 360, sm: 430, md: 560 },
                    display: "flex",
                    alignItems: "flex-end",
                    overflow: "hidden",
                    borderRadius: { xs: 0, md: 6 },
                    mx: { xs: 0, md: 3 },
                    boxShadow: { xs: "none", md: "0 26px 70px rgba(6,58,82,0.20)" },
                }}
            >
                <Box
                    component={motion.div}
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ y: parallaxY }}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        transform: { xs: "scale(1.02)", md: "scale(1.06)" },
                        background: bgImage
                            ? `url(${bgImage})`
                            : "linear-gradient(135deg, rgba(6,58,82,1), rgba(39,194,211,1))",
                        backgroundSize: "cover",
                        backgroundPosition: { xs: "center center", md: "center" },
                        willChange: "transform",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: {
                            xs: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.68) 100%)",
                            md: "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.72) 100%)",
                        },
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: {
                            xs: "radial-gradient(420px 240px at 20% 18%, rgba(39,194,211,0.16), transparent 60%)",
                            md: "radial-gradient(700px 400px at 20% 20%, rgba(39,194,211,0.25), transparent 55%)",
                        },
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                />

                <Container
                    maxWidth="lg"
                    sx={{
                        pb: { xs: 3.5, sm: 4.5, md: 7 },
                        pt: { xs: 8, sm: 10, md: 14 },
                        px: { xs: 2, sm: 3, md: 3 },
                        position: "relative",
                        zIndex: 3,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: { xs: 320, sm: 520, md: 820 },
                            pr: { xs: 0.5, sm: 1.5, md: 0 },
                            minWidth: 0,
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                color: "white",
                                mb: { xs: 1, sm: 1.2, md: 1.2 },
                                lineHeight: { xs: 1.08, sm: 1.07, md: 1.05 },
                                letterSpacing: { xs: "-0.015em", md: "-0.02em" },
                                fontSize: {
                                    xs: "1.85rem",
                                    sm: "2.45rem",
                                    md: "3.4rem",
                                    lg: "4rem",
                                },
                                maxWidth: "100%",
                                overflowWrap: "anywhere",
                                wordBreak: "break-word",
                                textWrap: "balance",
                            }}
                        >
                            {content.headline}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: alpha("#fff", 0.88),
                                mb: { xs: 2, sm: 2.4, md: 2.6 },
                                fontWeight: 500,
                                lineHeight: { xs: 1.4, md: 1.45 },
                                fontSize: {
                                    xs: "0.98rem",
                                    sm: "1.08rem",
                                    md: "1.25rem",
                                },
                                maxWidth: { xs: 300, sm: 460, md: 720 },
                                overflowWrap: "break-word",
                            }}
                        >
                            {content.slogan}
                        </Typography>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1, md: 1.2 }}
                            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    px: { xs: 2, sm: 2.2 },
                                    py: { xs: 1, sm: 1.1 },
                                    color: "white",
                                    borderColor: alpha("#fff", 0.28),
                                    background: alpha("#000", 0.12),
                                    width: { xs: "100%", sm: "auto" },
                                    maxWidth: { xs: 220, sm: "none" },
                                    borderRadius: 999,
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                    alignSelf: { xs: "flex-start", sm: "auto" },
                                    "&:hover": {
                                        borderColor: alpha("#fff", 0.4),
                                        background: alpha("#000", 0.22),
                                    },
                                }}
                                onClick={() => onNavigate?.("Kontakt")}
                            >
                                Kontakt aufnehmen
                            </Button>
                        </Stack>

                        {hasImages && (
                            <Stack
                                direction="row"
                                spacing={0.8}
                                sx={{
                                    mt: { xs: 2, sm: 2.5, md: 3 },
                                    flexWrap: "wrap",
                                }}
                            >
                                {heroImages.map((_, idx) => (
                                    <Box
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)}
                                        sx={{
                                            width: idx === currentImage ? 20 : 8,
                                            height: 8,
                                            borderRadius: 999,
                                            cursor: "pointer",
                                            background: idx === currentImage ? "white" : alpha("#fff", 0.38),
                                            transition: "all 180ms ease",
                                            flex: "0 0 auto",
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container
                ref={contentRef}
                maxWidth="lg"
                sx={{
                    mt: { xs: 2, sm: 2.5, md: 5 },
                    borderRadius: 3,
                    px: { xs: 1.5, sm: 2, md: 3 },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                        gap: { xs: 1.8, sm: 2.2, md: 3 },
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        sx={{
                            minWidth: 0,
                            p: { xs: 1.8, sm: 2.2, md: 3.5 },
                            borderRadius: { xs: 2.2, md: 3 },
                            background: { xs: "#FFFFFF", md: alpha("#FFFFFF", 0.85) },
                            border: `1px solid ${alpha("#0B1B24", 0.1)}`,
                            boxShadow: {
                                xs: "none",
                                sm: "0 10px 24px rgba(11,27,36,0.08)",
                                md: "0 18px 50px rgba(11,27,36,0.10)",
                            },
                            backdropFilter: { xs: "none", md: "blur(12px)" },
                            overflow: "hidden",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 1.4,
                                fontSize: { xs: "1.55rem", sm: "1.85rem", md: "2.125rem" },
                                lineHeight: 1.2,
                                overflowWrap: "break-word",
                            }}
                        >
                            Willkommen beim TSC Wülfrath
                        </Typography>

                        <Box
                            sx={{
                                color: "text.secondary",
                                lineHeight: { xs: 1.75, md: 1.9 },
                                fontSize: { xs: "0.98rem", md: "1.05rem" },
                                minWidth: 0,
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                            }}
                        >
                            {content.bodyText.map((line, index) => (
                                <Box key={index} component="p" sx={{ m: 0, mb: 1.2 }}>
                                    {line}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.06 }}
                        sx={{
                            minWidth: 0,
                            maxWidth: "100%",
                            height: "100%",
                            position: { md: "sticky" },
                            top: { md: 90 },
                            alignSelf: { md: "start" },
                            overflow: "hidden",
                        }}
                    >
                        <InstagramAktuelles />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
