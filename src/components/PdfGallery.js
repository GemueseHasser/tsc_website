import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function prettifyFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PdfGallery({ files }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 2,
      }}
    >
      {files.map((file, index) => {
        const title = prettifyFilename(file.name);
        const previewUrl = `${process.env.PUBLIC_URL}/pdf-preview.html?file=${encodeURIComponent(file.url)}`;
        const viewerUrl = `${process.env.PUBLIC_URL}/pdf-viewer.html?file=${encodeURIComponent(file.url)}&title=${encodeURIComponent(title || `Zeitungsartikel ${index + 1}`)}`;

        return (
          <Box
            key={file.url}
            sx={{
              overflow: "hidden",
              borderRadius: 2,
              border: `1px solid ${alpha("#0B1B24", 0.1)}`,
              background: alpha("#fff", 0.8),
              display: "flex",
              flexDirection: "column",
              minHeight: 420,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderBottom: `1px solid ${alpha("#0B1B24", 0.08)}`,
              }}
            >
              <PictureAsPdfIcon color="error" />
              <Typography sx={{ fontWeight: 800, lineHeight: 1.35 }}>
                {title || `Zeitungsartikel ${index + 1}`}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 320, background: alpha("#0B1B24", 0.03) }}>
              <Box
                component="iframe"
                src={previewUrl}
                title={title || `Zeitungsartikel ${index + 1}`}
                loading="lazy"
                sx={{ width: "100%", height: "100%", minHeight: 320, border: 0, display: "block" }}
              />
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.75, md: 1 }} sx={{ p: 2 }}>
              <Button
                component="a"
                href={viewerUrl}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                endIcon={<VisibilityIcon />}
              >
                Artikel ansehen
              </Button>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
