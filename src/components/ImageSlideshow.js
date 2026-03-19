import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function ImageSlideshow({ images, height = 380, altPrefix = "Slideshow-Bild" }) {
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = images.length > 0;

  useEffect(() => {
    if (!hasImages) return undefined;
    const timer = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hasImages, images.length]);

  const activeImage = useMemo(() => (hasImages ? images[currentImage] : null), [hasImages, images, currentImage]);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: { xs: 2, md: 3 },
        overflow: "hidden",
        minHeight: height,
        border: `1px solid ${alpha("#0B1B24", 0.1)}`,
        background: "linear-gradient(135deg, rgba(6,58,82,0.9), rgba(39,194,211,0.7))",
      }}
    >
      {activeImage && (
        <Box
          component={motion.img}
          key={activeImage}
          src={activeImage}
          alt={`${altPrefix} ${currentImage + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{ width: "100%", height: height, objectFit: "cover", display: "block" }}
        />
      )}

      {images.length > 1 && (
        <Stack direction="row" spacing={0.8} sx={{ position: "absolute", left: 18, bottom: 18 }}>
          {images.map((_, index) => (
            <Box
              key={`${index}-${images[index]}`}
              onClick={() => setCurrentImage(index)}
              sx={{
                width: index === currentImage ? 24 : 9,
                height: 9,
                borderRadius: 999,
                background: index === currentImage ? "white" : alpha("#fff", 0.45),
                transition: "all 180ms ease",
                cursor: "pointer",
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
