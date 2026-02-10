// src/pages/Start.js
import React, {useEffect, useState} from "react";
import { Container, Box, IconButton, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Start() {
    const [heroImages, setHeroImages] = useState([]);

    useEffect(() => {
        fetch("/resources/start/startImages.json")
            .then(res => res.json())
            .then(data =>
                setHeroImages(data.map(img => `/resources/start/${img}`))
            );
    }, []);

    const [currentImage, setCurrentImage] = useState(0);

    const handlePrev = () => {
        setCurrentImage((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
            {/* Hero-Slider */}
            <Box
                component={motion.div}
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    flexGrow: 1,
                    backgroundImage: `url(${heroImages[currentImage]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    color: "white",
                    textAlign: "center",
                    minHeight: "40vh",
                }}
            >
                <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 20, color: "white" }}>
                    <ArrowBackIos />
                </IconButton>

                <Box sx={{ backgroundColor: "rgba(0,0,0,0.5)", p: 3, borderRadius: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        Willkommen beim TSC Wülfrath
                    </Typography>
                    <Typography variant="h6">
                        Dein Tauchverein für Abenteuer, Ausbildung und Gemeinschaft
                    </Typography>
                </Box>

                <IconButton onClick={handleNext} sx={{ position: "absolute", right: 20, color: "white" }}>
                    <ArrowForwardIos />
                </IconButton>
            </Box>

            {/* Textbereich */}
            <Container sx={{ py: 4, flexShrink: 0, mb: 4 }}>
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
                    <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.9 }}>
                        Du möchtest einfach einmal ohne Verpflichtung in der Wülfrather Wasserwelt abtauchen und schauen,
                        ob der Tauchsport etwas für Dich ist? <br />
                        Du warst im Urlaub schon einmal kurz unter Wasser und möchtest nun Deinen Tauchschein machen?
                        <br />
                        Du bist ausgebildeter Taucher und suchst nach Gleichgesinnten, mit denen Du tauchen gehen und
                        auch sonst eine Menge Spaß haben kannst? <br />
                        Dann bist Du bei uns genau richtig! Stöbere einfach ein wenig auf unserer Seite und lerne mehr
                        über den Tauchsport in und um Wülfrath!
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
