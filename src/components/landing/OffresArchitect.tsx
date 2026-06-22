"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Profil = "artisan" | "tpme" | "mature";

interface ProfilData {
  id: Profil;
  label: string;
  taille: string;
  avant: string;
  apres: string;
  chiffres: { valeur: string; label: string; couleur: string }[];
  piliers: { titre: string; desc: string }[];
  cta: string;
}

const PROFILS: ProfilData[] = [
  {
    id: "artisan",
    label: "L'Artisan Indépendant",
    taille: "1-3 personnes",
    avant: "Je suis submergé",
    apres: "Je délègue le soir",
    chiffres: [
      { valeur: "15h", label: "perdues/semaine", couleur: "#C0392B" },
      { valeur: "5", label: "opportunités manquées/mois", couleur: "#E67E22" },
      { valeur: "0", label: "visibilité en ligne", couleur: "#B89A5A" },
    ],
    piliers: [
      { titre: "Automatisation", desc: "Devis, factures, relances sans effort" },
      { titre: "Visibilité locale", desc: "Google My Business, avis, référencement" },
      { titre: "Secrétariat externalisé", desc: "Un assistant sans le recruter" },
    ],
    cta: "Je veux respirer",
  },
  {
    id: "tpme",
    label: "La TPME en Croissance",
    taille: "3-15 personnes",
    avant: "On grandit mais ça coince",
    apres: "On scale sans briser",
    chiffres: [
      { valeur: "25h", label: "perdues/semaine", couleur: "#C0392B" },
      { valeur: "8", label: "opportunités manquées/mois", couleur: "#E67E22" },
      { valeur: "40%", label: "de leads non qualifiés", couleur: "#B89A5A" },
    ],
    piliers: [
      { titre: "Outils collaboratifs", desc: "Slack, Notion, CRM intégrés" },
      { titre: "Tunnel de conversion", desc: "Inbound marketing, landing pages" },
      { titre: "BPO agile", desc: "Support client externalisé, scalable" },
    ],
    cta: "On veut débloquer",
  },
  {
    id: "mature",
    label: "L'Entreprise Structurée",
    taille: "+15 personnes",
    avant: "On a des processus mais on perd du temps",
    apres: "On domine le marché",
    chiffres: [
      { valeur: "40h", label: "perdues/semaine", couleur: "#C0392B" },
      { valeur: "12", label: "rapports jours/an", couleur: "#E67E22" },
      { valeur: "30%", label: "d'erreurs de saisie", couleur: "#B89A5A" },
    ],
    piliers: [
      { titre: "Architecture SI", desc: "Intégration API, ESB, data warehouse" },
      { titre: "IA générative", desc: "Rapports automatiques, veille intelligente" },
      { titre: "BPO industriel", desc: "Externalisation managée par KPIs" },
    ],
    cta: "On veut accélérer",
  },
];

export default function OffresArchitect() {
  const [actif, setActif] = useState<<Profil | null>(null);

  return (
    <section id="expertises" className="bg-[#0B0C0A] py-32 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B89A5A]" />
            <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
              Nos architectures
            </span>
            <div className="w-8 h-[1px] bg-[#B89A5A]" />
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-5xl uppercase text-[#F3F1EC] mb-4">
            3 profils, <span className="text-[#B89A5A]">3 transformations</span>
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-sm text-[#F3F1EC]/60 max-w-xl mx-auto">
            Choisissez votre situation. Nous vous montrons le chemin — avec des chiffres concrets.
          </p>
        </div>

        {/* Grille 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILS.map((profil) => (
            <motion.div
              key={profil.id}
              onMouseEnter={() => setActif(profil.id)}
              onMouseLeave={() => setActif(null)}
              className="relative border border-[#F3F1EC]/10 bg-[#F3F1EC]/[0.02] 
                         cursor-pointer overflow-hidden group"
              layout
            >
              {/* État fermé : AVANT */}
              <div className="p-8 h-full flex flex-col">
                <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.3em] text-[#F3F1EC]/30 mb-4">
                  {profil.taille}
                </span>
                
                <h3 className="font-[family-name:var(--font-sora)] text-xl uppercase tracking-widest text-[#F3F1EC] mb-2">
                  {profil.label}
                </h3>
                
                <div className="mt-auto">
                  <p className="font-[family-name:var(--font-manrope)] text-lg text-[#F3F1EC]/80 italic mb-1">
                    "{profil.avant}"
                  </p>
                  <div className="w-12 h-[1px] bg-[#B89A5A] my-4" />
                  <p className="font-[family-name:var(--font-manrope)] text-sm text-[#B89A5A]">
                    → {profil.apres}
                  </p>
                </div>
              </div>

              {/* État ouvert : APRÈS (déploiement au hover) */}
              <AnimatePresence>
                {actif === profil.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-x-0 bottom-0 bg-[#073642] border-t border-[#B89A5A]/30"
                  >
                    <div className="p-8">
                      {/* 3 chiffres */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {profil.chiffres.map((c, i) => (
                          <div key={i} className="text-center">
                            <p className="font-[family-name:var(--font-sora)] text-2xl" style={{ color: c.couleur }}>
                              {c.valeur}
                            </p>
                            <p className="font-[family-name:var(--font-manrope)] text-[8px] uppercase tracking-wider text-[#F3F1EC]/40">
                              {c.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* 3 piliers */}
                      <div className="space-y-3 mb-6">
                        {profil.piliers.map((pilier, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 border border-[#B89A5A] flex items-center justify-center flex-shrink-0">
                              <span className="text-[#B89A5A] text-xs font-bold">{i + 1}</span>
                            </div>
                            <div>
                              <p className="font-[family-name:var(--font-sora)] text-xs uppercase tracking-wider text-[#F3F1EC]">
                                {pilier.titre}
                              </p>
                              <p className="font-[family-name:var(--font-manrope)] text-xs text-[#F3F1EC]/60">
                                {pilier.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA vers diagnostic */}
                      <a
                        href="/diagnostic"
                        className="block w-full bg-[#B89A5A] text-[#0B0C0A] py-3 text-center
                                   font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold
                                   hover:bg-[#F3F1EC] transition-all"
                      >
                        {profil.cta} →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Lien vers comparaison complète */}
        <div className="text-center mt-12">
          <p className="font-[family-name:var(--font-manrope)] text-xs text-[#F3F1EC]/40">
            Pas sûr de votre profil ?{" "}
            <a href="/diagnostic" className="text-[#B89A5A] hover:text-[#F3F1EC] underline">
              Faire le diagnostic en 2 minutes
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}