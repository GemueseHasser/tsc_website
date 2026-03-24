import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  alpha,
  Box,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  LinearProgress,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";

const initialForm = (type = "Probetraining") => ({
  name: "",
  age: "",
  email: "",
  type,
  message: "",
  website: "",
  consent: false,
});

function OptionCard({ title, description, selected, disabled, onClick }) {
  return (
      <Paper
          onClick={!disabled ? onClick : undefined}
          elevation={0}
          sx={{
            p: 1.6,
            borderRadius: 3,
            cursor: disabled ? "not-allowed" : "pointer",
            border: "1px solid",
            borderColor: selected ? "#27C2D3" : alpha("#0B1B24", 0.12),
            background: selected
                ? alpha("#27C2D3", 0.08)
                : disabled
                    ? alpha("#0B1B24", 0.03)
                    : "#fff",
            opacity: disabled ? 0.65 : 1,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: disabled ? alpha("#0B1B24", 0.12) : "#27C2D3",
              transform: disabled ? "none" : "translateY(-1px)",
              boxShadow: disabled ? "none" : "0 10px 24px rgba(11,27,36,0.08)",
            },
          }}
      >
        <Typography sx={{ fontWeight: 800, color: "#063A52" }}>{title}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.45 }}>
          {description}
        </Typography>
      </Paper>
  );
}

export default function KontaktDialog({
                                        open,
                                        onClose,
                                        onNavigate,
                                        initialType = "Probetraining",
                                      }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState(() => initialForm(initialType));
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openedAt, setOpenedAt] = useState(null);
  const [step, setStep] = useState(0);

  const isAdult = Number(form.age) >= 18;
  const isGeneralRequest = form.type === "Allgemein";

  useEffect(() => {
    if (open) {
      setOpenedAt(Date.now());
      setErrors({});
      setSuccess(false);
      setSubmitError("");
      setIsSubmitting(false);
      setStep(0);
      setForm(initialForm(initialType));
    }
  }, [open, initialType]);

  useEffect(() => {
    if (!isAdult && form.type === "Schnuppertauchen") {
      setForm((prev) => ({ ...prev, type: "Probetraining" }));
    }
  }, [isAdult, form.type]);

  const handleChange = (field) => (event) => {
    const value = field === "consent" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (value) => {
    setForm((prev) => ({ ...prev, type: value }));
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: undefined }));
    }
  };

  const dialogTitle = useMemo(() => {
    if (success) return "Erfolgreich";
    return step === 0 ? "Was möchtest du anfragen?" : "Deine Kontaktdaten";
  }, [step, success]);

  const validateStepOne = () => {
    const newErrors = {};
    if (!form.age) newErrors.age = "Alter erforderlich";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name erforderlich";
    if (!form.age) newErrors.age = "Alter erforderlich";
    if (!form.email.trim()) newErrors.email = "E-Mail erforderlich";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }
    if (!form.message.trim()) newErrors.message = "Bitte Nachricht eingeben";
    if (!form.consent) newErrors.consent = "Bitte bestätige die Datenschutzerklärung.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetAndClose = () => {
    setSuccess(false);
    setSubmitError("");
    setIsSubmitting(false);
    setStep(0);
    setForm(initialForm(initialType));
    onClose?.();
  };

  const handleNext = () => {
    if (!validateStepOne()) return;
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;
    if (form.website) return;
    if (openedAt && Date.now() - openedAt < 4000) {
      setSubmitError("Bitte warte einen Moment und versuche es dann erneut.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${window.location.origin}/api/send-email.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          age: String(form.age).trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          startedAt: openedAt,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload?.errors && typeof payload.errors === "object") {
          setErrors(payload.errors);
        }
        throw new Error(payload?.message || "Die Anfrage konnte nicht versendet werden.");
      }

      setSuccess(true);
      window.setTimeout(() => {
        resetAndClose();
      }, 2200);
    } catch (error) {
      setSubmitError(error.message || "Die Anfrage konnte nicht versendet werden.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messagePlaceholder = isGeneralRequest
      ? "Worum geht es? Je genauer du dein Anliegen beschreibst, desto besser können wir dir helfen."
      : form.type === "Schnuppertauchen"
          ? "Gib uns gern ein paar Infos zu deiner Taucherfahrung, deinen Fragen oder deinem Wunschtermin."
          : "Schreib uns gern kurz, wann du Zeit hast oder was du dir vom Probetraining wünschst.";

  return (
      <Dialog
          open={open}
          onClose={resetAndClose}
          fullWidth
          maxWidth="sm"
          fullScreen={fullScreen}
          scroll="paper"
          PaperProps={{
            sx: {
              borderRadius: { xs: 0, sm: 3 },
              background: alpha("#FFFFFF", 0.97),
              backdropFilter: "blur(16px)",
              boxShadow: { xs: "none", sm: "0 24px 60px rgba(11,27,36,0.18)" },
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            },
          }}
      >
        {!success && (
            <Box sx={{ px: 3, pt: 2.2 }}>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                Schritt {step + 1} von 2
              </Typography>
              <LinearProgress
                  variant="determinate"
                  value={step === 0 ? 50 : 100}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: alpha("#063A52", 0.08),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                      background: "linear-gradient(135deg, #063A52, #27C2D3)",
                    },
                  }}
              />
            </Box>
        )}

        <AnimatePresence mode="wait">
          {!success ? (
              <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
              >
                <DialogTitle sx={{ fontWeight: 900, pt: 2.2 }}>{dialogTitle}</DialogTitle>

                <DialogContent dividers sx={{ overflowY: "auto" }}>
                  {step === 0 ? (
                      <Stack spacing={2.2} sx={{ mt: 1 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 800, mb: 1 }}>Dein Alter</Typography>
                          <TextField
                              label="Alter"
                              type="number"
                              fullWidth
                              value={form.age}
                              onChange={handleChange("age")}
                              error={!!errors.age}
                              helperText={errors.age || "Für die passende Anfrageoption"}
                              inputProps={{ min: 1 }}
                          />
                        </Box>

                        <Box>
                          <Typography sx={{ fontWeight: 800, mb: 1 }}>
                            Worum geht es?
                          </Typography>

                          <Stack spacing={1.2}>
                            <OptionCard
                                title="Allgemeine Anfrage"
                                description="Für Fragen zu Kursen, Mitgliedschaft, Abläufen oder Sonstigem."
                                selected={form.type === "Allgemein"}
                                onClick={() => handleTypeChange("Allgemein")}
                            />

                            <OptionCard
                                title="Probetraining"
                                description="Ideal zum Kennenlernen – besonders für Einsteiger oder Minderjährige."
                                selected={form.type === "Probetraining"}
                                onClick={() => handleTypeChange("Probetraining")}
                            />

                            <OptionCard
                                title="Schnuppertauchen"
                                description={
                                  isAdult
                                      ? "Ein erster direkter Einblick ins Tauchen."
                                      : "Nur ab 18 Jahren möglich. Minderjährige werden zunächst zu einem Probetraining eingeladen."
                                }
                                selected={form.type === "Schnuppertauchen"}
                                disabled={!isAdult}
                                onClick={() => handleTypeChange("Schnuppertauchen")}
                            />
                          </Stack>

                          {!isAdult && form.age && (
                              <Typography variant="caption" sx={{ mt: 1.2, display: "block", color: "text.secondary" }}>
                                Direktes Schnuppertauchen ohne vorheriges Probetraining ist nur ab 18 Jahren möglich.
                              </Typography>
                          )}
                        </Box>
                      </Stack>
                  ) : (
                      <Stack spacing={2} sx={{ mt: 1 }}>
                        <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 3,
                              background: alpha("#27C2D3", 0.08),
                              border: `1px solid ${alpha("#27C2D3", 0.18)}`,
                            }}
                        >
                          <Typography sx={{ fontWeight: 800, color: "#063A52" }}>
                            Gewählt: {form.type}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
                            Jetzt nur noch deine Kontaktdaten und eine kurze Nachricht.
                          </Typography>
                        </Box>

                        <TextField
                            label="Name"
                            fullWidth
                            value={form.name}
                            onChange={handleChange("name")}
                            error={!!errors.name}
                            helperText={errors.name}
                        />

                        <TextField
                            label="E-Mail"
                            type="email"
                            fullWidth
                            value={form.email}
                            onChange={handleChange("email")}
                            error={!!errors.email}
                            helperText={errors.email || "An diese Adresse melden wir uns zurück."}
                        />

                        <TextField
                            label="Nachricht"
                            multiline
                            minRows={4}
                            fullWidth
                            value={form.message}
                            onChange={handleChange("message")}
                            error={!!errors.message}
                            helperText={errors.message || "Ein paar Stichpunkte reichen völlig aus."}
                            placeholder={messagePlaceholder}
                        />

                        <Box
                            sx={{
                              mt: 0.5,
                              p: 1.4,
                              borderRadius: 3,
                              background: alpha("#0B1B24", 0.03),
                              border: `1px solid ${alpha("#0B1B24", 0.08)}`,
                            }}
                        >
                          <FormControlLabel
                              sx={{ alignItems: "flex-start", m: 0 }}
                              control={
                                <Checkbox
                                    checked={form.consent}
                                    onChange={handleChange("consent")}
                                    sx={{ mt: 0.15 }}
                                />
                              }
                              label={
                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                                  Ich habe die{" "}
                                  <Box
                                      component="span"
                                      onClick={() => {
                                        onClose?.();
                                        onNavigate?.("Datenschutz");
                                      }}
                                      sx={{
                                        color: "#063A52",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        "&:hover": { textDecoration: "underline" },
                                      }}
                                  >
                                    Datenschutzerklärung
                                  </Box>{" "}
                                  gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
                                </Typography>
                              }
                          />
                          {errors.consent && (
                              <FormHelperText sx={{ color: "error.main", mt: 0.5 }}>
                                {errors.consent}
                              </FormHelperText>
                          )}
                        </Box>

                        {submitError && (
                            <Typography variant="body2" sx={{ color: "error.main" }}>
                              {submitError}
                            </Typography>
                        )}

                        <TextField
                            name="website"
                            value={form.website}
                            onChange={handleChange("website")}
                            sx={{
                              position: "absolute",
                              left: "-9999px",
                              opacity: 0,
                              pointerEvents: "none",
                            }}
                            autoComplete="off"
                            tabIndex={-1}
                        />
                      </Stack>
                  )}
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2, pt: 1.5 }}>
                  {step === 0 ? (
                      <>
                        <Button onClick={resetAndClose}>Abbrechen</Button>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleNext}
                            sx={{
                              background: "linear-gradient(135deg, #063A52, #27C2D3)",
                              px: 3,
                            }}
                        >
                          Weiter
                        </Button>
                      </>
                  ) : (
                      <>
                        <Button onClick={() => setStep(0)}>Zurück</Button>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            sx={{
                              background: "linear-gradient(135deg, #063A52, #27C2D3)",
                              px: 3,
                            }}
                        >
                          {isSubmitting ? "Wird gesendet…" : "Anfrage senden"}
                        </Button>
                      </>
                  )}
                </DialogActions>
              </motion.div>
          ) : (
              <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
              >
                <Box
                    sx={{
                      p: 6,
                      textAlign: "center",
                      background:
                          "radial-gradient(500px 300px at center, rgba(39,194,211,0.18), transparent 70%)",
                    }}
                >
                  <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 160 }}
                  >
                    <CheckCircle sx={{ fontSize: 70, color: "#27C2D3" }} />
                  </motion.div>

                  <Typography variant="h5" sx={{ mt: 2, fontWeight: 900 }}>
                    Anfrage erfolgreich gesendet
                  </Typography>

                  <Typography sx={{ mt: 1, color: "text.secondary" }}>
                    Wir melden uns zeitnah per E-Mail bei dir.
                  </Typography>
                </Box>
              </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
  );
}