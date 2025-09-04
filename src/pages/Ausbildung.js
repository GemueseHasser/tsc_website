// src/pages/Ausbildung.js
import React from "react";
import {Container, Box, Paper, Typography} from "@mui/material";
import {motion} from "framer-motion";

export default function Ausbildung() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
            <Container sx={{py: 4, flexShrink: 0, mb: 8}}>
                <Paper
                    component={motion.div}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
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
                    <Typography variant="h3" sx={{fontWeight: "bold", mb: 2}}>
                        Ausbildung
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: "1.2rem", lineHeight: 1.9}}>
                        Unseren Mitgliedern bieten wir eine Vielzahl an Ausbildungsmöglichkeiten. Angefangen bei den
                        Kleinen ab 8 Jahre mit den Kindertauchscheinen bis hin zu CMAS Gold.<br/>
                        Im Verein stehen mehrere Tauchlehrer (VDST / i. a. c.) zur Verfügung die die theoretische und
                        praktische Ausbildung in Absprache mit den "Schülern" zeitlich organisieren und nach hohen
                        Standards ausbilden.<br/>
                        Im Bereich "ÜBER UNS" kannst du dir Bilder unserer Tauchlehrer ansehen.<br/>
                        Auf diesen Seiten wird dargestellt welche Ausbildungen bei uns im Verein möglich sind.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
