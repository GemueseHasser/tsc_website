import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Stack,
} from "@mui/material";
import { Instagram, Facebook, Email } from "@mui/icons-material";
import Start from "./pages/Start";
import About from "./pages/About";
import Training from "./pages/Training";
import Schnuppertauchen from "./pages/Schnuppertauchen";
import Ausbildung from "./pages/Ausbildung";
import Kontakt from "./pages/Kontakt";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#004d73",
        },
        secondary: {
            main: "#00bcd4",
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

export default function App() {
    const [activePage, setActivePage] = useState("Startseite");

    const renderContent = () => {
        switch (activePage) {
            case "Über uns":
                return <About />;
            case "Training":
                return <Training />;
            case "Schnuppertauchen":
                return <Schnuppertauchen />;
            case "Ausbildung":
                return <Ausbildung />;
            case "Kontakt":
                return <Kontakt />;
            default:
                return <Start />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                {/* Fixierte Kopfzeile */}
                <AppBar position="fixed" elevation={3}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                            TSC Wülfrath e.V.
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {["Startseite", "Über uns", "Training", "Schnuppertauchen", "Ausbildung", "Kontakt"].map((item) => (
                                <Button
                                    key={item}
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => setActivePage(item)}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Seiteninhalt */}
                <Box sx={{ flexGrow: 1, pt: 10, pb: 10 }}>{renderContent()}</Box>

                {/* Fixierter Footer */}
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        py: 2,
                        textAlign: "center",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
                        <IconButton color="inherit" href="https://instagram.com" target="_blank">
                            <Instagram />
                        </IconButton>
                        <IconButton color="inherit" href="https://facebook.com" target="_blank">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit" href="mailto:info@tsc-wuelfrath.de">
                            <Email />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} TSC Wülfrath e.V. – Alle Rechte vorbehalten.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
