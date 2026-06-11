"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";
const CLARITY_PROJECT_ID = "x5edecy2f0";

export function ClarityAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    function readConsent() {
      try {
        return localStorage.getItem(STORAGE_KEY) === "accepted";
      } catch {
        return false;
      }
    }

    setConsented(readConsent());

    function handleChange() {
      setConsented(readConsent());
    }

    window.addEventListener("cookie-consent-change", handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener("cookie-consent-change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  if (!consented) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}