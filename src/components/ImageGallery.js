import React from "react";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function ImageGallery({ images, altPrefix = "Galeriebild" }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      {images.map((src, index) => (
        <Box
          key={src}
          sx={{
            overflow: "hidden",
            borderRadius: 3,
            border: `1px solid ${alpha("#0B1B24", 0.1)}`,
            background: alpha("#fff", 0.72),
            minHeight: 240,
          }}
        >
          <Box
            component="img"
            src={src}
            alt={`${altPrefix} ${index + 1}`}
            loading="lazy"
            sx={{ width: "100%", height: "100%", minHeight: 240, objectFit: "cover", display: "block" }}
          />
        </Box>
      ))}
    </Box>
  );
}
