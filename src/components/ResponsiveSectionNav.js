import React from "react";
import {
  Box,
  ButtonBase,
  Chip,
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckRounded, ExpandMoreRounded } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

export default function ResponsiveSectionNav({ value, onChange, tabs, mobileTitle = "Bereich wählen", mobileSubtitle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const activeTab = tabs.find((tab) => tab.key === value) || tabs[0];

  if (!isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "100%",
          p: 0.6,
          borderRadius: 999,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
          background: alpha("#fff", 0.75),
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 24px rgba(11,27,36,0.07)",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={value}
          onChange={(_, nextValue) => onChange(nextValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            width: "100%",
            minWidth: 0,
            minHeight: 44,
            "& .MuiTabs-scroller": {
              overflowX: "auto !important",
              WebkitOverflowScrolling: "touch",
            },
            "& .MuiTabs-flexContainer": { gap: { xs: 1, md: 2 }, flexWrap: "nowrap" },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{
                minHeight: 44,
                px: 1.6,
                borderRadius: 999,
                fontWeight: 750,
                color: "text.primary",
                "&.Mui-selected": {
                  color: "white",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 14px 34px ${alpha(theme.palette.primary.main, 0.22)}`,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  return (
    <>
      <ButtonBase
        onClick={() => setOpen(true)}
        sx={{
          width: "100%",
          borderRadius: 4,
          textAlign: "left",
          overflow: "hidden",
          display: "block",
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: 1.9,
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
            background: `linear-gradient(145deg, ${alpha("#FFFFFF", 0.96)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 48%, ${alpha(theme.palette.secondary.main, 0.16)} 100%)`,
            boxShadow: `0 18px 44px ${alpha(theme.palette.primary.main, 0.16)}`,
            backdropFilter: "blur(18px)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.22)}, transparent 36%)`,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 1,
              borderRadius: "inherit",
              border: `1px solid ${alpha("#FFFFFF", 0.55)}`,
              pointerEvents: "none",
            }}
          />
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1.4 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                color: "white",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, 0.30)}`,
                flex: "0 0 auto",
              }}
            >
              {activeTab?.icon}
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Chip
                label="Aktiver Bereich"
                size="small"
                sx={{
                  height: 24,
                  mb: 0.9,
                  borderRadius: 999,
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  color: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.10),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                }}
              />
              <Typography variant="caption" sx={{ display: "block", color: "text.secondary", letterSpacing: 0.35, mb: 0.15 }}>
                {mobileTitle}
              </Typography>
              <Typography sx={{ fontWeight: 900, lineHeight: 1.15, fontSize: "1.08rem" }}>
                {activeTab?.label}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.45, lineHeight: 1.55, pr: 0.5 }}>
                {activeTab?.mobileDescription || mobileSubtitle || "Tippe, um zwischen den Bereichen zu wechseln."}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: alpha("#fff", 0.9),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                color: theme.palette.primary.main,
                boxShadow: `0 8px 18px ${alpha(theme.palette.primary.main, 0.12)}`,
                flex: "0 0 auto",
              }}
            >
              <ExpandMoreRounded />
            </Box>
          </Box>
        </Box>
      </ButtonBase>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            m: 0,
            width: "100%",
            maxWidth: "100%",
            maxHeight: "min(82vh, 720px)",
            alignSelf: "flex-end",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            background: alpha("#FFFFFF", 0.96),
            backdropFilter: "blur(18px)",
            boxShadow: "0 -10px 45px rgba(11,27,36,0.18)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 5,
              borderRadius: 999,
              background: alpha(theme.palette.text.primary, 0.14),
              mx: "auto",
              mb: 1.8,
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
            {mobileTitle}
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.6, mb: 1.5 }}>
            {mobileSubtitle || "Wähle den Bereich, den du dir ansehen möchtest."}
          </Typography>

          <List sx={{ p: 0, display: "grid", gap: 1, pb: 1 }}>
            <AnimatePresence initial={false}>
              {tabs.map((tab, index) => {
                const selected = tab.key === value;
                return (
                  <Box
                    key={tab.key}
                    component={motion.div}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, delay: index * 0.03 }}
                  >
                    <ListItemButton
                      onClick={() => {
                        onChange(tab.key);
                        setOpen(false);
                      }}
                      sx={{
                        py: 1.35,
                        px: 1.2,
                        borderRadius: 3,
                        border: `1px solid ${selected ? alpha(theme.palette.primary.main, 0.18) : alpha(theme.palette.text.primary, 0.08)}`,
                        background: selected
                          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.14)})`
                          : alpha("#fff", 0.72),
                        boxShadow: selected ? `0 12px 30px ${alpha(theme.palette.primary.main, 0.14)}` : "none",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 46,
                          color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2.5,
                            display: "grid",
                            placeItems: "center",
                            background: selected
                              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.18)}, ${alpha(theme.palette.secondary.main, 0.18)})`
                              : alpha(theme.palette.primary.main, 0.06),
                          }}
                        >
                          {tab.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={tab.label}
                        secondary={tab.mobileDescription}
                        primaryTypographyProps={{ fontWeight: 850 }}
                        secondaryTypographyProps={{ sx: { color: "text.secondary", lineHeight: 1.45, mt: 0.2 } }}
                      />
                      {selected ? <CheckRounded color="primary" /> : null}
                    </ListItemButton>
                  </Box>
                );
              })}
            </AnimatePresence>
          </List>
        </Box>
      </Dialog>
    </>
  );
}
