import React from "react";
import { alpha } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function CookieBanner() {
  const { bannerOpen, acceptExternal, saveNecessaryOnly } = useCookieConsent();

  if (!bannerOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 12, md: 24 },
        right: { xs: 12, md: 24 },
        bottom: { xs: 12, md: 24 },
        zIndex: 1600,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 980,
          p: { xs: 2, md: 2.4 },
          borderRadius: 4,
          background: alpha("#FFFFFF", 0.96),
          border: `1px solid ${alpha("#0B1B24", 0.1)}`,
          boxShadow: "0 28px 60px rgba(11,27,36,0.18)",
          backdropFilter: "blur(18px)",
        }}
      >
        <Stack spacing={1.4}>
          <Box>
            <Typography sx={{ fontWeight: 900, mb: 0.4 }}>Datenschutz & externe Inhalte</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
              Für Instagram-Feeds und eingebettete Google-Maps-Karten werden Inhalte von Drittanbietern geladen.
              Dabei können Cookies gesetzt und personenbezogene Daten an diese Anbieter übertragen werden.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1}>
            <Button variant="outlined" onClick={saveNecessaryOnly} sx={{ borderColor: alpha("#0B1B24", 0.18) }}>
              Nur notwendige Cookies
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={acceptExternal}
              sx={{ background: "linear-gradient(135deg, #063A52, #27C2D3)" }}
            >
              Externe Inhalte akzeptieren
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
