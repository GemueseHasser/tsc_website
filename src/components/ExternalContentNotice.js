import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function ExternalContentNotice({ title = "Externe Inhalte", description }) {
  const { acceptExternal } = useCookieConsent();

  return (
    <Box sx={{ p: 2.4, textAlign: "center" }}>
      <Typography sx={{ fontWeight: 900, mb: 0.6 }}>{title}</Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.8 }}>
        {description}
      </Typography>
      <Button
        variant="contained"
        disableElevation
        onClick={acceptExternal}
        sx={{
          background: "linear-gradient(135deg, #063A52, #27C2D3)",
          boxShadow: `0 10px 26px ${alpha("#27C2D3", 0.24)}`,
        }}
      >
        Externe Inhalte akzeptieren
      </Button>
    </Box>
  );
}
