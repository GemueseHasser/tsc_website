// src/pages/Training.js
import React from "react";
import {Container, Box, Paper, Typography} from "@mui/material";
import {motion} from "framer-motion";

export default function Training() {
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
                        Training
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: "1.2rem", lineHeight: 1.9}}>
                        Auch beim Tauchen ist Kondition und Fitness wichtig. Deshalb trainieren wir wöchentlich in der
                        Wülfrather Wasserwelt.<br/><br/>
                        Kinder- und Jugendtraining: Montags von 16:00 bis 17:00 Uhr<br/>
                        Erwachsenentraining: Donnerstags von 20:30 bis 21:30 Uhr
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
