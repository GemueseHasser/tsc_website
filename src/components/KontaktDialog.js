// src/components/KontaktDialog.js
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    MenuItem,
    Typography,
    alpha,
    Box,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";

export default function KontaktDialog({ open, onClose, onNavigate }) {
    const [form, setForm] = useState({
        name: "",
        age: "",
        email: "",
        type: "Probetraining",
        message: "",
        website: "", // 🔐 Honeypot
        consent: false, // ✅ DSGVO
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [openedAt, setOpenedAt] = useState(null);

    const isAdult = Number(form.age) >= 18;

    // Timestamp setzen wenn Dialog geöffnet wird
    useEffect(() => {
        if (open) {
            setOpenedAt(Date.now());
            setErrors({});
            setSuccess(false);
        }
    }, [open]);

    // Wenn Alter < 18 und Schnuppertauchen ausgewählt war -> automatisch zurück
    useEffect(() => {
        if (!isAdult && form.type === "Schnuppertauchen") {
            setForm((p) => ({ ...p, type: "Probetraining" }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdult]);

    const handleChange = (field) => (e) => {
        const val = field === "consent" ? e.target.checked : e.target.value;
        setForm((p) => ({ ...p, [field]: val }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Name erforderlich";
        if (!form.age) newErrors.age = "Alter erforderlich";
        if (!form.email) newErrors.email = "E-Mail erforderlich";
        if (!form.message) newErrors.message = "Bitte Nachricht eingeben";
        if (!form.consent) newErrors.consent = "Bitte bestätige die Datenschutzerklärung.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Honeypot Check
        if (form.website) {
            console.warn("Spam erkannt (Honeypot).");
            return;
        }

        // Time Check (mindestens 4 Sekunden)
        if (openedAt && Date.now() - openedAt < 4000) {
            console.warn("Spam erkannt (zu schnell abgeschickt).");
            return;
        }

        // Hier später Backend / Service anbinden
        console.log("Form valid:", form);

        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
            onClose();
            setForm({
                name: "",
                age: "",
                email: "",
                type: "Probetraining",
                message: "",
                website: "",
                consent: false,
            });
        }, 2200);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    background: alpha("#FFFFFF", 0.96),
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 35px 80px rgba(11,27,36,0.25)",
                    overflow: "hidden",
                },
            }}
        >
            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <DialogTitle sx={{ fontWeight: 900 }}>
                            Probetraining / Schnuppertauchen vereinbaren
                        </DialogTitle>

                        <DialogContent>
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />

                                <TextField
                                    label="Alter"
                                    type="number"
                                    fullWidth
                                    value={form.age}
                                    onChange={handleChange("age")}
                                    error={!!errors.age}
                                    helperText={errors.age}
                                />

                                <TextField
                                    label="E-Mail"
                                    type="email"
                                    fullWidth
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

                                <TextField
                                    select
                                    label="Art"
                                    fullWidth
                                    value={form.type}
                                    onChange={handleChange("type")}
                                >
                                    <MenuItem value="Probetraining">Probetraining</MenuItem>
                                    <MenuItem value="Schnuppertauchen" disabled={!isAdult}>
                                        Schnuppertauchen {!isAdult && "(ab 18 Jahren)"}
                                    </MenuItem>
                                </TextField>

                                <TextField
                                    label="Nachricht"
                                    multiline
                                    minRows={4}
                                    fullWidth
                                    value={form.message}
                                    onChange={handleChange("message")}
                                    error={!!errors.message}
                                    helperText={errors.message}
                                />

                                {/* DSGVO Checkbox */}
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
                                        control={
                                            <Checkbox
                                                checked={form.consent}
                                                onChange={handleChange("consent")}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                Ich habe die{" "}
                                                <Box
                                                    component="span"
                                                    onClick={() => {
                                                        onClose();
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
                                        <FormHelperText sx={{ color: "error.main", mt: -0.5 }}>
                                            {errors.consent}
                                        </FormHelperText>
                                    )}
                                </Box>

                                {!isAdult && form.age && (
                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                        Schnuppertauchen ist nur ab 18 Jahren möglich.
                                    </Typography>
                                )}

                                {/* 🔐 Honeypot Feld (unsichtbar) */}
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
                        </DialogContent>

                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={handleClose}>Abbrechen</Button>
                            <Button
                                variant="contained"
                                disableElevation
                                onClick={handleSubmit}
                                sx={{
                                    background: "linear-gradient(135deg, #063A52, #27C2D3)",
                                    px: 3,
                                }}
                            >
                                Anfrage senden
                            </Button>
                        </DialogActions>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
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
