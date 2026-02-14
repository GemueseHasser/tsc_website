import React, {useEffect, useMemo, useState, Suspense} from "react";
import {alpha, createTheme, ThemeProvider} from "@mui/material/styles";
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Skeleton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {ArrowOutward, Close as CloseIcon, Email, Facebook, Instagram, Menu as MenuIcon,} from "@mui/icons-material";
import { motion } from "framer-motion";

const Start = React.lazy(() => import("./pages/Start"));
const About = React.lazy(() => import("./pages/About"));
const Ausbildung = React.lazy(() => import("./pages/Ausbildung"));
const Training = React.lazy(() => import("./pages/Training"));
const Kontakt = React.lazy(() => import("./pages/Kontakt"));
const Datenschutz = React.lazy(() => import("./pages/Datenschutz"));
const Impressum = React.lazy(() => import("./pages/Impressum"));

function PageLoader() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
            }}
        >
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                sx={{
                    width: "90%",
                    maxWidth: 720,
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.88)",
                    border: "1px solid rgba(11,27,36,0.10)",
                    boxShadow: "0 22px 60px rgba(11,27,36,0.12)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <Skeleton
                    variant="text"
                    width="40%"
                    height={42}
                    sx={{
                        mb: 2,
                        bgcolor: "rgba(6,58,82,0.15)", // Brand dark
                        "&::after": {
                            background: "linear-gradient(90deg, transparent, rgba(39,194,211,0.4), transparent)",
                        },
                    }}
                />

                {[...Array(3)].map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="text"
                        width={`${88 - i * 4}%`}
                        sx={{
                            bgcolor: "rgba(6,58,82,0.12)",
                            "&::after": {
                                background: "linear-gradient(90deg, transparent, rgba(39,194,211,0.35), transparent)",
                            },
                        }}
                    />
                ))}

                <Skeleton
                    variant="rectangular"
                    height={180}
                    sx={{
                        mt: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(6,58,82,0.12)",
                        "&::after": {
                            background: "linear-gradient(90deg, transparent, rgba(39,194,211,0.35), transparent)",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default function App() {
    const getPageFromHash = () => {
        const hash = window.location.hash.replace("#", "");
        if (!hash) return "Startseite";

        return hash.charAt(0).toUpperCase() + hash.slice(1);
    };

    const [activePage, setActivePage] = useState(() => getPageFromHash());

    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 1200px)");

    const pages = useMemo(
        () => ["Startseite", "Über uns", "Training", "Ausbildung", "Kontakt"],
        []
    );

    const legalPages = useMemo(() => ["Impressum", "Datenschutz"], []);

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
                                // Wichtig für Mobile: verhindert horizontales "Überstehen" durch z.B. Tabs/Chips
                                overflowX: "hidden",
                            },
                            "#root": {
                                overflowX: "hidden",
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

    const handleNavClick = (item) => {
        if (item === activePage) return;

        setActivePage(item);
        setMobileOpen(false);
        window.history.pushState(null, "", `#${item.toLowerCase()}`);
    };

    const renderContent = () => {
        switch (activePage) {
            case "Über uns":
                return <About />;
            case "Training":
                return <Training />;
            case "Ausbildung":
                return <Ausbildung />;
            case "Kontakt":
                return <Kontakt />;
            case "Impressum":
                return <Impressum />;
            case "Datenschutz":
                return <Datenschutz />;
            default:
                return <Start onNavigate={handleNavClick} />;
        }
    };

    // Kleine Premium-UX: beim Seitenwechsel nach oben
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activePage]);

    const [links, setLinks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/content/links.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} beim Laden von /content/links.json`);
                return res.json();
            })
            .then(setLinks)
            .catch((e) => setError(String(e)));
    }, []);

    useEffect(() => {
        const onHashChange = () => {
            const page = getPageFromHash();
            setActivePage((prev) => (prev !== page ? page : prev));
        };

        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    if (error) return <div style={{padding: 16}}>Fehler: {error}</div>;
    if (!links) return <div style={{padding: 16}}>Lade Links…</div>;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <AppBar position="sticky" elevation={0} color="transparent">
                    <Toolbar sx={{ py: 1, justifyContent: "space-between", color: "text.primary" }}>
                        <Stack direction="row" spacing={1.2} alignItems="center">
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 999,
                                    boxShadow: "0 10px 26px rgba(6,58,82,0.18)",
                                    border: "1px solid rgba(11,27,36,0.10)",
                                    background: "white",
                                    display: "grid",
                                    placeItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="https://www.tsc-wuelfrath.de/s/misc/logo.png?t=1766401057"
                                    alt="TSC Wülfrath Logo"
                                    sx={{
                                        width: "78%",
                                        height: "78%",
                                        objectFit: "contain",
                                        display: "block",
                                    }}
                                />
                            </Box>
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

                                {/* dezente Legal-Links (Desktop) */}
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ mx: 0.8, borderColor: alpha("#0B1B24", 0.10) }}
                                />

                                <Stack direction="row" spacing={0.2} alignItems="center">
                                    {legalPages.map((item) => (
                                        <Button
                                            key={item}
                                            onClick={() => handleNavClick(item)}
                                            variant="text"
                                            size="small"
                                            sx={{
                                                px: 1,
                                                color: alpha(theme.palette.text.primary, 0.72),
                                                fontWeight: 700,
                                                "&:hover": {
                                                    background: alpha(theme.palette.primary.main, 0.06),
                                                    color: "text.primary",
                                                },
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    ))}
                                </Stack>
                            </Stack>
                        ) : (
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                sx={{ border: `1px solid ${alpha("#0B1B24", 0.12)}` }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Drawer Mobile */}
                <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                    <Box sx={{ width: 320, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
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
                                            background:
                                                item === activePage ? alpha(theme.palette.primary.main, 0.06) : "transparent",
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
                                <IconButton size="small" href={links.instagram} target="_blank">
                                    <Instagram fontSize="small" />
                                </IconButton>
                                <IconButton size="small" href={links.facebook} target="_blank">
                                    <Facebook fontSize="small" />
                                </IconButton>
                                <IconButton size="small" href={"mailto:" + links.email}>
                                    <Email fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Box>

                        {/* Spacer damit Legal-Links unten landen */}
                        <Box sx={{ flexGrow: 1 }} />

                        <Divider sx={{ my: 1.6 }} />

                        <List sx={{ p: 0 }}>
                            {legalPages.map((item) => (
                                <ListItem key={item} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleNavClick(item)}
                                        sx={{
                                            borderRadius: 2,
                                            my: 0.4,
                                            background:
                                                item === activePage ? alpha(theme.palette.primary.main, 0.06) : "transparent",
                                        }}
                                    >
                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{
                                                sx: {
                                                    fontWeight: item === activePage ? 800 : 700,
                                                    color: alpha(theme.palette.text.primary, 0.78),
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

                {/* Content */}
                <Box sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>
                    <Suspense fallback={<PageLoader />}>
                        <Box
                            component={motion.div}
                            key={activePage}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                            {renderContent()}
                        </Box>
                    </Suspense>
                </Box>

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
                                    href={"mailto:" + links.email}
                                    variant="outlined"
                                    endIcon={<ArrowOutward />}
                                    sx={{
                                        borderColor: alpha("#0B1B24", 0.16),
                                        "&:hover": {
                                            borderColor: alpha("#0B1B24", 0.26),
                                            background: alpha("#0B1B24", 0.03),
                                        },
                                    }}
                                >
                                    Anfragen
                                </Button>
                                <IconButton href={links.instagram} target="_blank">
                                    <Instagram />
                                </IconButton>
                                <IconButton href={links.facebook} target="_blank">
                                    <Facebook />
                                </IconButton>
                                <IconButton href={"mailto:" + links.email}>
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
