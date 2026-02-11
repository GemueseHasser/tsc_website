import React from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Stack,
    Chip,
    Divider,
    alpha,
    Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { PrivacyTip, Storage, Lock, Email } from "@mui/icons-material";

export default function Datenschutz() {
    return (
        <Container maxWidth="lg">
            {/* Head */}
            <Box
                component={motion.div}
                initial={{opacity: 0, y: 14}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                sx={{mb: 3}}
            >
                <Typography variant="h3" sx={{mb: 1}}>
                    Datenschutzerklärung
                </Typography>
                <Typography sx={{color: "text.secondary", maxWidth: 980, lineHeight: 1.8}}>
                    Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der
                    EU-Datenschutzgrundverordnung (DSGVO),
                    ist der Vorstand des TSC – Wülfrath e.V.
                </Typography>
            </Box>

            <Paper
                component={motion.div}
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.05}}
                elevation={0}
                sx={{
                    p: {xs: 2.2, md: 3.2},
                    borderRadius: 4,
                    background: alpha("#FFFFFF", 0.86),
                    border: `1px solid ${alpha("#0B1B24", 0.10)}`,
                    boxShadow: "0 18px 55px rgba(11,27,36,0.10)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <Stack direction={{xs: "column", md: "row"}} spacing={1.1} sx={{mb: 2}}>
                    <Chip icon={<PrivacyTip/>} label="DSGVO"/>
                    <Chip icon={<Storage/>} label="Datenverarbeitung"/>
                    <Chip icon={<Lock/>} label="SSL/HTTPS"/>
                    <Chip icon={<Email/>} label="Kontakt"/>
                </Stack>

                <Divider sx={{mb: 2}}/>

                {/* Section: Betroffenenrechte */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Ihre Betroffenenrechte
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9, mb: 1.5}}>
                        Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende
                        Rechte ausüben:
                    </Typography>

                    <Box component="ul" sx={{mt: 0, mb: 1.5, pl: 2.6, color: "text.secondary", lineHeight: 1.9}}>
                        <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,</li>
                        <li>Berichtigung unrichtiger personenbezogener Daten,</li>
                        <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
                        <li>
                            Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten
                            noch nicht löschen dürfen,
                        </li>
                        <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
                        <li>
                            Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen
                            Vertrag mit uns abgeschlossen
                            haben.
                        </li>
                    </Box>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9, mb: 1.5}}>
                        Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die
                        Zukunft widerrufen.
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9}}>
                        Sie können sich jederzeit mit einer Beschwerde an die für Sie zuständige Aufsichtsbehörde
                        wenden. Ihre zuständige
                        Aufsichtsbehörde richtet sich nach dem Bundesland Ihres Wohnsitzes, Ihrer Arbeit oder der
                        mutmaßlichen Verletzung.
                        Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie
                        unter:{" "}
                        <Link
                            href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                            target="_blank"
                            rel="noreferrer"
                            underline="hover"
                            sx={{fontWeight: 700}}
                        >
                            https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
                        </Link>
                    </Typography>
                </Box>

                <Divider sx={{my: 2}}/>

                {/* Section: Zwecke / Dritte */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Zwecke der Datenverarbeitung durch die verantwortliche Stelle und Dritte
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9, mb: 1.5}}>
                        Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser Datenschutzerklärung genannten
                        Zwecken.
                        Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den genannten Zwecken findet
                        nicht statt.
                        Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
                    </Typography>

                    <Box component="ul" sx={{mt: 0, mb: 0, pl: 2.6, color: "text.secondary", lineHeight: 1.9}}>
                        <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,</li>
                        <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist,</li>
                        <li>die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist,</li>
                        <li>
                            die Verarbeitung zur Wahrung berechtigter Interessen erforderlich ist und kein Grund zur
                            Annahme besteht, dass Sie
                            ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben.
                        </li>
                    </Box>
                </Box>

                {/* Section: Löschung / Sperrung */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Löschung bzw. Sperrung der Daten
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9}}>
                        Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit. Wir speichern Ihre
                        personenbezogenen Daten
                        daher nur so lange, wie dies zur Erreichung der hier genannten Zwecke erforderlich ist oder wie
                        es die vom Gesetzgeber
                        vorgesehenen vielfältigen Speicherfristen vorsehen. Nach Fortfall des jeweiligen Zweckes bzw.
                        Ablauf dieser Fristen
                        werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften
                        gesperrt oder gelöscht.
                    </Typography>
                </Box>

                {/* Section: SSL */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        SSL-Verschlüsselung
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9}}>
                        Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand
                        der Technik
                        entsprechende Verschlüsselungsverfahren (z.&nbsp;B. SSL) über HTTPS.
                    </Typography>
                </Box>

                {/* Section: Kontaktformular */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Kontaktformular
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9}}>
                        Treten Sie bzgl. Fragen jeglicher Art per E-Mail oder Kontaktformular mit uns in Kontakt,
                        erteilen Sie uns zum Zwecke
                        der Kontaktaufnahme Ihre freiwillige Einwilligung. Hierfür ist die Angabe einer validen
                        E-Mail-Adresse erforderlich.
                        Diese dient der Zuordnung der Anfrage und der anschließenden Beantwortung derselben. Die Angabe
                        weiterer Daten ist
                        optional. Die von Ihnen gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie
                        für mögliche
                        Anschlussfragen gespeichert. Nach Erledigung der von Ihnen gestellten Anfrage werden
                        personenbezogene Daten automatisch
                        gelöscht.
                    </Typography>
                </Box>

                {/* Section: Änderungen */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Änderung unserer Datenschutzbestimmungen
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9}}>
                        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
                        rechtlichen Anforderungen
                        entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
                        z.&nbsp;B. bei der Einführung
                        neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                    </Typography>
                </Box>

                {/* Section: Fragen */}
                <Divider sx={{my: 2}}/>

                <Box>
                    <Typography variant="h5" sx={{fontWeight: 900, mb: 1}}>
                        Fragen an den Datenschutzbeauftragten
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9, mb: 1.5}}>
                        Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich
                        direkt an die für den
                        Datenschutz verantwortliche Person in unserer Organisation:
                    </Typography>

                    <Typography sx={{fontWeight: 900}}>
                        <Link href="mailto:vorstand@tsc-wuelfrath.de" underline="hover">
                            vorstand@tsc-wuelfrath.de
                        </Link>
                    </Typography>

                    <Typography sx={{color: "text.secondary", lineHeight: 1.9, mt: 1.5, fontStyle: "italic"}}>
                        Die Datenschutzerklärung wurde mit dem Datenschutzerklärungs-Generator der activeMind AG
                        erstellt.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
