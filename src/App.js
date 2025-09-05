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
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import { Instagram, Facebook, Email, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

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
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const pages = ["Startseite", "Über uns", "Training", "Schnuppertauchen", "Ausbildung", "Kontakt"];

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

    const handleNavClick = (item) => {
        setActivePage(item);
        setMobileOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                {/* Fixierte Kopfzeile */}
                <AppBar position="fixed" elevation={3}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            TSC Wülfrath e.V.
                        </Typography>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box>
                                {pages.map((item) => (
                                    <Button
                                        key={item}
                                        color="inherit"
                                        sx={{ mx: 1 }}
                                        onClick={() => handleNavClick(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {/* Mobile Navigation */}
                        {isMobile && (
                            <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Drawer für Mobilgeräte */}
                <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                    <Box sx={{ width: 240, p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton onClick={() => setMobileOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <List>
                            {pages.map((item) => (
                                <ListItem key={item} disablePadding>
                                    <ListItemButton onClick={() => handleNavClick(item)}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

                {/* Seiteninhalt */}
                <Box sx={{ flexGrow: 1, pt: 10, pb: 10 }}>{renderContent()}</Box>

                {/* Fixierter Footer */}
                {/* Fixierter Footer */}
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        py: { xs: 1, md: 1.5 }, // Weniger vertikaler Platz
                        textAlign: "center",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 0.5 }}>
                        <IconButton
                            color="inherit"
                            href="https://www.instagram.com/tsc.wuelfrath/"
                            target="_blank"
                            size="small"
                            sx={{ p: 0.5 }}
                        >
                            <Instagram fontSize="small" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            href="https://www.facebook.com/tsc.wuelfrath/"
                            target="_blank"
                            size="small"
                            sx={{ p: 0.5 }}
                        >
                            <Facebook fontSize="small" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            href="mailto:vorstand@tsc-wuelfrath.de"
                            size="small"
                            sx={{ p: 0.5 }}
                        >
                            <Email fontSize="small" />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="caption"
                        sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                    >
                        © {new Date().getFullYear()} TSC Wülfrath e.V. – Alle Rechte vorbehalten.
                    </Typography>
                </Box>

            </Box>
        </ThemeProvider>
    );
}
