import { useState, useEffect } from "react";

/**
 * Reads the current Google Translate cookie and returns
 * "ta" if Tamil is active, "en" otherwise.
 */
export function useLanguage(): "en" | "ta" {
  const [lang, setLang] = useState<"en" | "ta">("en");

  useEffect(() => {
    const detectLang = () => {
      const isTamil =
        document.cookie.includes("googtrans=/en/ta") ||
        document.cookie.includes("googtrans=auto/ta");
      setLang(isTamil ? "ta" : "en");
    };

    detectLang();

    // Re-detect on visibility change (after page reload from language switch)
    document.addEventListener("visibilitychange", detectLang);
    return () => document.removeEventListener("visibilitychange", detectLang);
  }, []);

  return lang;
}
