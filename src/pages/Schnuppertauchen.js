// src/pages/Schnuppertauchen.js
import React from "react";
import {Container, Box, Paper, Typography} from "@mui/material";
import {motion} from "framer-motion";

export default function Schnuppertauchen() {
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
                        Schnuppertauchen
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: "1.2rem", lineHeight: 1.9}}>
                        Wer einmal in die schwerelose Unterwasserwelt eintauchen möchte, laden wir herzlich zum
                        Schnuppertauchen oder Probetraining in unserer Wülfrather Wasserwelt ein.<br/>
                        Nach Terminabsprache mit uns kann mit fachkundiger Anleitung eines Tauchlehrers im Hallenbad mit
                        einem Tauchgerät probegetaucht werden.<br/>
                        Minderjährige Schnuppertaucher benötigen die schriftliche Einverständniserklärung zumindest
                        eines Erziehungsberechtigten (entsprechende Formulare sind vor Ort erhältlich!).<br/>
                        Badebekleidung ist mitzubringen, die Tauchausrüstung wird selbstverständlich kostenlos zur
                        Verfügung gestellt! Der Eintritt in die Wülfrather Wasserwelt ist natürlich ebenfalls
                        kostenlos<br/>
                        Schnuppertauchen oder Probetraining ist zu unseren Trainingszeiten Montags 16:00 - 17:00 Uhr und
                        Donnerstags 20:30 - 21:30 Uhr möglich Bei den Trainingzeiten handelt es sich um die
                        Wasserzeiten. Deshalb sollte mann sich eine halbe Stunde vorher an der Wülfrather Wasserwelt
                        einfinden.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
