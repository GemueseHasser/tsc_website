import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
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
    Container,
    Divider,
    useMediaQuery,
} from "@mui/material";
import {
    Instagram,
    Facebook,
    Email,
    Menu as MenuIcon,
    Close as CloseIcon,
    ArrowOutward,
} from "@mui/icons-material";

import Start from "./pages/Start";
import About from "./pages/About";
import Training from "./pages/Training";
import Schnuppertauchen from "./pages/Schnuppertauchen";
import Ausbildung from "./pages/Ausbildung";
import Kontakt from "./pages/Kontakt";

export default function App() {
    const [activePage, setActivePage] = useState("Startseite");
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)");

    const pages = useMemo(
        () => ["Startseite", "Über uns", "Training", "Schnuppertauchen", "Ausbildung", "Kontakt"],
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "light",
                    primary: { main: "#063A52" }, // Deep Ocean
                    secondary: { main: "#27C2D3" }, // Aqua Accent
                    background: {
                        default: "#F6FAFC",
                        paper: "#FFFFFF",
                    },
                    text: {
                        primary: "#0B1B24",
                        secondary: alpha("#0B1B24", 0.72),
                    },
                },
                shape: { borderRadius: 18 },
                typography: {
                    fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif`,
                    h1: { fontFamily: `"Playfair Display", "Inter", serif`, fontWeight: 700, letterSpacing: -0.6 },
                    h2: { fontFamily: `"Playfair Display", "Inter", serif`, fontWeight: 700, letterSpacing: -0.4 },
                    h3: { fontFamily: `"Playfair Display", "Inter", serif`, fontWeight: 700, letterSpacing: -0.3 },
                    h4: { fontFamily: `"Playfair Display", "Inter", serif`, fontWeight: 700, letterSpacing: -0.2 },
                    button: { textTransform: "none", fontWeight: 650, letterSpacing: 0.1 },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            ":root": {
                                colorScheme: "light",
                            },
                            body: {
                                backgroundImage: `
                  radial-gradient(900px 500px at 10% 10%, rgba(39,194,211,0.14), transparent 55%),
                  radial-gradient(900px 500px at 90% 0%, rgba(6,58,82,0.12), transparent 60%),
                  radial-gradient(900px 500px at 50% 110%, rgba(39,194,211,0.10), transparent 55%)
                `,
                                backgroundAttachment: "fixed",
                            },
                            a: { color: "inherit" },
                        },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                background: alpha("#FFFFFF", 0.72),
                                backdropFilter: "blur(14px)",
                                borderBottom: `1px solid ${alpha("#0B1B24", 0.08)}`,
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 999,
                            },
                        },
                    },
                },
            }),
        []
    );

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

    // Kleine Premium-UX: beim Seitenwechsel nach oben
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activePage]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <AppBar position="sticky" elevation={0}>
                    <Toolbar sx={{ py: 1, justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1.2} alignItems="center">
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 999,
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 1)}, ${alpha(
                                        theme.palette.secondary.main,
                                        1
                                    )})`,
                                    boxShadow: `0 10px 26px ${alpha(theme.palette.primary.main, 0.22)}`,
                                }}
                            />
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                                    TSC Wülfrath e.V.
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    Tauchsport · Ausbildung · Gemeinschaft
                                </Typography>
                            </Box>
                        </Stack>

                        {!isMobile ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                                {pages.map((item) => {
                                    const active = item === activePage;
                                    return (
                                        <Button
                                            key={item}
                                            onClick={() => handleNavClick(item)}
                                            variant={active ? "contained" : "text"}
                                            disableElevation
                                            sx={{
                                                px: 1.6,
                                                color: active ? "white" : "text.primary",
                                                background: active
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                                    : "transparent",
                                                "&:hover": {
                                                    background: active
                                                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                                        : alpha(theme.palette.primary.main, 0.06),
                                                },
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    );
                                })}
                            </Stack>
                        ) : (
                            <IconButton onClick={() => setMobileOpen(true)} sx={{ border: `1px solid ${alpha("#0B1B24", 0.12)}` }}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Drawer Mobile */}
                <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                    <Box sx={{ width: 320, p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography sx={{ fontWeight: 800 }}>Navigation</Typography>
                            <IconButton onClick={() => setMobileOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                        <List sx={{ p: 0 }}>
                            {pages.map((item) => (
                                <ListItem key={item} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleNavClick(item)}
                                        sx={{
                                            borderRadius: 2,
                                            my: 0.5,
                                            background: item === activePage ? alpha(theme.palette.primary.main, 0.06) : "transparent",
                                        }}
                                    >
                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{
                                                sx: { fontWeight: item === activePage ? 800 : 650 },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                borderRadius: 3,
                                border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                                background: alpha("#FFFFFF", 0.8),
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                                Schnellkontakt
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton size="small" href="https://www.instagram.com/tsc.wuelfrath/" target="_blank">
                                    <Instagram fontSize="small" />
                                </IconButton>
                                <IconButton size="small" href="https://www.facebook.com/tsc.wuelfrath/" target="_blank">
                                    <Facebook fontSize="small" />
                                </IconButton>
                                <IconButton size="small" href="mailto:vorstand@tsc-wuelfrath.de">
                                    <Email fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Box>
                </Drawer>

                {/* Content */}
                <Box sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>{renderContent()}</Box>

                {/* Footer (nicht fixed, wirkt deutlich hochwertiger) */}
                <Box sx={{ borderTop: `1px solid ${alpha("#0B1B24", 0.08)}`, py: 4 }}>
                    <Container maxWidth="lg">
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            alignItems={{ xs: "flex-start", md: "center" }}
                            justifyContent="space-between"
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 900 }}>TSC Wülfrath e.V.</Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Training in der Wülfrather Wasserwelt · Ausbildung nach VDST / i.a.c.
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    © {new Date().getFullYear()} · Alle Rechte vorbehalten
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button
                                    component="a"
                                    href="mailto:vorstand@tsc-wuelfrath.de"
                                    variant="outlined"
                                    endIcon={<ArrowOutward />}
                                    sx={{
                                        borderColor: alpha("#0B1B24", 0.16),
                                        "&:hover": { borderColor: alpha("#0B1B24", 0.26), background: alpha("#0B1B24", 0.03) },
                                    }}
                                >
                                    Anfragen
                                </Button>
                                <IconButton href="https://www.instagram.com/tsc.wuelfrath/" target="_blank">
                                    <Instagram />
                                </IconButton>
                                <IconButton href="https://www.facebook.com/tsc.wuelfrath/" target="_blank">
                                    <Facebook />
                                </IconButton>
                                <IconButton href="mailto:vorstand@tsc-wuelfrath.de">
                                    <Email />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
