import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const COOKIE_NAME = "tsc_cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 180;

const defaultConsent = {
  necessary: true,
  externalMedia: false,
};

const CookieConsentContext = createContext({
  consent: defaultConsent,
  bannerOpen: false,
  acceptExternal: () => {},
  saveNecessaryOnly: () => {},
  openPreferences: () => {},
});

function readConsentCookie() {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`));

  if (!raw) return null;

  try {
    return {
      ...defaultConsent,
      ...JSON.parse(decodeURIComponent(raw.split("=")[1] || "")),
    };
  } catch {
    return null;
  }
}

function writeConsentCookie(value) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(defaultConsent);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (stored) {
      setConsent(stored);
      setBannerOpen(false);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const persist = (nextConsent) => {
    const normalized = { ...defaultConsent, ...nextConsent, necessary: true };
    setConsent(normalized);
    writeConsentCookie(normalized);
    setBannerOpen(false);
  };

  const value = useMemo(
    () => ({
      consent,
      bannerOpen,
      acceptExternal: () => persist({ externalMedia: true }),
      saveNecessaryOnly: () => persist({ externalMedia: false }),
      openPreferences: () => setBannerOpen(true),
      hasExternalConsent: Boolean(consent.externalMedia),
    }),
    [consent, bannerOpen]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}
