// src/pages/About.js
import React from "react";
import {Container, Box, Paper, Typography} from "@mui/material";
import {motion} from "framer-motion";

export default function About() {
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
                        Über uns
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: "1.2rem", lineHeight: 1.9}}>
                        Über 50 Jahre Tauchsport Club Wülfrath! Am 15.9.1972 trafen sich zehn begeisterte Taucher in den
                        Privaträumen von Peter Stach in Wülfrath. An diesem Abend wurde der Tauchsport Club Niederberg
                        gegründet.<br/>
                        Angeregt durch Bücher und Filme und der damals sicherlich noch vorhandenen Vorstellung, dass das
                        Tauchen ein Sport der Extreme verbunden mit einem Hauch von Abenteuer ist, haben sich 1972 zehn
                        Personen entschlossen, einen Tauchsportverein zu gründen. Der Verein wurde im Jahre 1973 als TSC
                        Niederberg ins Vereinsregister eingetragen. Da aus der Kommunalreform keine neue Gemeinde namens
                        Niederberg hervorgegangen ist, hat sich der Verein entschlossen, den Verein in TSC Wülfrath
                        umzubenennen. Damit war der örtliche Bezug zur Heimatgemeinde hergestellt.<br/>
                        Der Verein hat sich nie dem Leistungssport zugewandt. Im Vordergrund steht der Tauchsport in
                        seiner ureigenen Form. Es geht darum, die Vielfalt der Unterwasserwelt verbunden mit dem uns
                        Menschen ungewohnten Gefühl der Schwerelosigkeit zu erleben.<br/>
                        Die Bewegung im Medium Wasser erfordert eine sehr gründliche Ausbildung und sehr viel
                        Selbstdisziplin. Tauchschnellkurse entsprechen nicht unseren Prinzipien. Unser Verein ist mit
                        seiner Ausbildungkonzeption den richtigen Weg gegangen, es stehen mehrere Tauchlehrer zu
                        Verfügung, so dass Du in eine Vielzahl von Brevets wie zum Beispiel CMAS Bronze bis hin zu CMAS
                        Gold in unserem Verein ausgebildet werden kannst. In den letzten Jahren hat sich auch eine große
                        Jugendabteilung entwickelt, auch hier ist der Verein mit mehreren Kindertauchlehrern gut
                        aufgestellt. Kinder und Jugendlichen können so schon frühzeitig an den Tauchsport herangeführt
                        werden.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
