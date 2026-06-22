"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Consent = "all" | "essential" | "none" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ilocap-cookies");
    if (saved) setConsent(saved as Consent);
  }, []);

  const handleConsent = (choice: Consent) => {
    setConsent(choice);
    localStorage.setItem("ilocap-cookies", choice || "none");
    
    if (choice === "all" && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied"
      });
    }
  };

  if (consent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#073642] border-t border-[#B89A5A]/20 px-6 py-6 md:px-16"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
          
          <div className="flex-1">
            <p className="font-[family-name:var(--font-sora)] text-sm text-[#F3F1EC] mb-2">
              🍪 Gestion des cookies
            </p>
            <p className="font-[family-name:var(--font-manrope)] text-xs text-[#F3F1EC]/60 leading-relaxed">
              Nous utilisons des cookies essentiels au fonctionnement du site et des cookies analytiques (Google Analytics) pour comprendre comment vous utilisez nos services.{" "}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-[#B89A5A] underline hover:text-[#F3F1EC]"
              >
                En savoir plus
              </button>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 border border-[#F3F1EC]/10 text-[#F3F1EC]/60 text-[10px] uppercase tracking-wider hover:border-[#B89A5A] hover:text-[#B89A5A] transition-all"
            >
              Personnaliser
            </button>
            <button
              onClick={() => handleConsent("essential")}
              className="px-4 py-2 border border-[#F3F1EC]/10 text-[#F3F1EC]/60 text-[10px] uppercase tracking-wider hover:border-[#C0392B] hover:text-[#C0392B] transition-all"
            >
              Tout refuser
            </button>
            <button
              onClick={() => handleConsent("all")}
              className="px-6 py-2 bg-[#B89A5A] text-[#0B0C0A] text-[10px] uppercase tracking-wider font-bold hover:bg-[#F3F1EC] transition-all"
            >
              Tout accepter
            </button>
          </div>
        </div>

        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-6 pt-6 border-t border-[#F3F1EC]/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-[#F3F1EC]/5">
                <div className="flex justify-between mb-2">
                  <span className="text-[#F3F1EC] text-xs font-bold">Essentiels</span>
                  <span className="text-[#B89A5A] text-xs">Obligatoire</span>
                </div>
                <p className="text-[#F3F1EC]/40 text-xs">Fonctionnement du site, préférences, panier...</p>
              </div>
              <div className="p-4 border border-[#F3F1EC]/5">
                <div className="flex justify-between mb-2">
                  <span className="text-[#F3F1EC] text-xs font-bold">Analytiques</span>
                  <span className="text-[#B89A5A] text-xs">Google Analytics</span>
                </div>
                <p className="text-[#F3F1EC]/40 text-xs">Mesure d'audience, pages vues, comportement utilisateur.</p>
              </div>
              <div className="p-4 border border-[#F3F1EC]/5">
                <div className="flex justify-between mb-2">
                  <span className="text-[#F3F1EC] text-xs font-bold">Marketing</span>
                  <span className="text-[#F3F1EC]/40 text-xs">Non utilisé</span>
                </div>
                <p className="text-[#F3F1EC]/40 text-xs">Publicité ciblée (non activé actuellement).</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}