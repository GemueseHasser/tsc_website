import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Paper, Stack, IconButton, Button, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Email, Facebook, Instagram, ArrowOutward, LocationOn } from "@mui/icons-material";
import ExternalContentNotice from "../components/ExternalContentNotice";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function Kontakt({ onOpenContactDialog }) {
  const { hasExternalConsent } = useCookieConsent();
  const [links, setLinks] = useState(null);
  const [error, setError] = useState("");

  const addressLine1 = "Wülfrather Wasser Welt";
  const addressLine2 = "Goethestraße 23, 42489 Wülfrath";
  const mapsQuery = encodeURIComponent(`${addressLine1}, ${addressLine2}`);
  const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  const cardSx = {
    p: { xs: 2.2, md: 3.2 },
    borderRadius: { xs: 2, md: 3 },
    background: alpha("#FFFFFF", 0.86),
    border: `1px solid ${alpha("#0B1B24", 0.1)}`,
    boxShadow: { xs: "0 10px 24px rgba(11,27,36,0.07)", md: "0 16px 38px rgba(11,27,36,0.08)" },
    backdropFilter: "blur(12px)",
    height: "100%",
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/content/links.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setLinks)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <div style={{ padding: 16 }}>Fehler: {error}</div>;
  if (!links) return <div style={{ padding: 16 }}>Lade Links…</div>;

  return (
    <Container maxWidth="lg">
      <Box component={motion.div} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Kontakt
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: "100%", lineHeight: 1.8 }}>
          Schreib uns bei Fragen, für ein Probetraining oder für ein Schnuppertauchen. Wir freuen uns auf deine Nachricht.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" }, gap: { xs: 2, lg: 3 }, alignItems: "stretch" }}>
        <Paper component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} elevation={0} sx={cardSx}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Direkt erreichbar
          </Typography>

          <Typography sx={{ color: "text.secondary", lineHeight: 1.85, mb: 1.8 }}>
            Für Vereinsfragen, Trainingsinteresse und allgemeine Anliegen erreichst du uns am einfachsten über unser Formular
            oder per E-Mail. Alternativ erreichst du uns über Instagram oder Facebook.
          </Typography>

          <Stack direction="row" spacing={{ xs: 0.75, md: 1 }} sx={{ mb: 2 }}>
            <IconButton href={links.instagram} target="_blank" rel="noreferrer">
              <Instagram />
            </IconButton>
            <IconButton href={links.facebook} target="_blank" rel="noreferrer">
              <Facebook />
            </IconButton>
          </Stack>

          <Button
            variant="outlined"
            onClick={() => (window.location.href = "mailto:" + links.email)}
            endIcon={<ArrowOutward />}
            sx={{ borderColor: alpha("#0B1B24", 0.16), mb: 3 }}
          >
            E-Mail an den Vorstand
          </Button>

          <Box
            sx={{
              mt: 1,
              p: 2.4,
              borderRadius: { xs: 2, md: 3 },
              background: alpha("#27C2D3", 0.05),
              border: `1px solid ${alpha("#27C2D3", 0.18)}`,
            }}
          >
            <Typography sx={{ fontWeight: 900, mb: 0.8 }}>Probetraining, Schnuppertauchen oder allgemeine Anfrage?</Typography>
            <Typography sx={{ color: "text.secondary", mb: 2, lineHeight: 1.8 }}>
              Nutze unser Formular für eine schnelle und strukturierte Anfrage.
            </Typography>
            <Button
              variant="contained"
              disableElevation
              onClick={() => onOpenContactDialog?.("Probetraining")}
              sx={{
                px: 3.5,
                py: 1.2,
                borderRadius: 999,
                fontWeight: 800,
                background: "linear-gradient(135deg, #063A52, #27C2D3)",
                boxShadow: "0 8px 25px rgba(39,194,211,0.25)",
              }}
            >
              Anfrageformular öffnen
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: { xs: 2.5, md: 3.5 },
              borderRadius: { xs: 2, md: 3 },
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(11,27,36,0.10)",
              boxShadow: { xs: "0 10px 24px rgba(11,27,36,0.07)", md: "0 16px 38px rgba(11,27,36,0.08)" },
              backdropFilter: "blur(12px)",
            }}
          >
            <Typography variant="h4" sx={{ mb: 1.5 }}>
              Mitglied werden
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2, lineHeight: 1.8 }}>
              Du möchtest dem TSC Wülfrath beitreten? Unser Online-Mitgliedsantrag steht dir hier zur Verfügung.
            </Typography>
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={() => window.open("https://web.meinverein.de/profile/75580/member-request-application", "_blank", "noopener,noreferrer")}
              sx={{ px: 3, py: 1.2, background: "linear-gradient(135deg, #063A52, #27C2D3)" }}
            >
              Zum Online-Mitgliedsantrag
            </Button>
          </Box>
        </Paper>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          elevation={0}
          sx={{ ...cardSx, display: "flex", flexDirection: "column" }}
        >
          <Stack direction="row" spacing={{ xs: 0.75, md: 1 }} alignItems="center" sx={{ mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: alpha("#27C2D3", 0.1),
                border: `1px solid ${alpha("#27C2D3", 0.22)}`,
              }}
            >
              <LocationOn />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 950, lineHeight: 1.15 }}>Trainingsort</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {addressLine1}
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>{addressLine2}</Typography>

          <Button variant="text" endIcon={<ArrowOutward />} href={mapsOpenUrl} target="_blank" rel="noreferrer" sx={{ justifyContent: "flex-start", mt: 1.2, mb: 1.6 }}>
            In Google Maps öffnen
          </Button>

          <Box
            sx={{
              borderRadius: { xs: 2, md: 3 },
              overflow: "hidden",
              border: `1px solid ${alpha("#0B1B24", 0.1)}`,
              background: alpha("#0B1B24", 0.03),
              minHeight: { xs: 360, md: 480 },
              flexGrow: 1,
              display: "grid",
              placeItems: "center",
            }}
          >
            {!hasExternalConsent ? (
              <ExternalContentNotice
                title="Google Maps erst nach Einwilligung"
                description="Nach deiner Zustimmung wird die Karte direkt geladen und der Bereich vollständig ausgefüllt."
              />
            ) : (
              <iframe
                title={`Google Maps: ${addressLine1}`}
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
