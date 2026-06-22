"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Link from "next/link";
import { PROFILS, QUESTIONS, MATURITY_LEVELS, calculateDiagnostic } from "@/lib/questions";
import type { ProfilType, DiagnosticResult } from "@/lib/questions";
import { generateDiagnosticPDF } from "@/lib/pdf-generator";

const PILIERS = [
  {
    id: "ia-data",
    title: "Solutions IA & Data",
    subtitle: "Intelligence decisionnelle",
    description: "Transformez vos donnees en levier strategique. Anticipez, decidez, optimisez.",
    color: "#B89A5A",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.8-1.5 3.8L17 13h2a2 2 0 0 1 2 2v5H3v-5a2 2 0 0 1 2-2h2l1.5-2.2A5 5 0 0 1 12 2z"/>
        <circle cx="12" cy="7" r="2"/>
        <path d="M8 17v-2m4 2v-4m4 4v-2"/>
      </svg>
    ),
    services: [
      "Analyse predictive & tendances marche",
      "Automatisation du service client (chatbots, NLP)",
      "Centralisation donnees & vision 360° temps reel"
    ]
  },
  {
    id: "plateformes",
    title: "Plateformes Digitales",
    subtitle: "Infrastructure sur mesure",
    description: "Des outils performants, securises et adaptes a vos processus metier.",
    color: "#073642",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    services: [
      "Outils metiers personnalises (web & mobile)",
      "Extranets collaboratifs securises",
      "Sites vitrines & landing pages optimisees",
      "E-commerce & marketplace"
    ]
  },
  {
    id: "design-marketing",
    title: "Design & Marketing Digital",
    subtitle: "Visibilite & conversion",
    description: "Devenez incontournable. Attirez, convertissez, fidelisez.",
    color: "#2A5A5F",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
        <path d="M7.8 7.8l2.1 2.1M14.1 14.1l2.1 2.1M7.8 16.2l2.1-2.1M14.1 9.9l2.1-2.1"/>
      </svg>
    ),
    services: [
      "Graphisme, identite visuelle & contenus",
      "Publicite ciblee (Google, Meta, LinkedIn)",
      "Google Business Profile & SEO local",
      "Community Management & reseaux sociaux"
    ]
  },
  {
    id: "automatisation",
    title: "Automatisation & BPO",
    subtitle: "Efficience operationnelle",
    description: "Externalisez et automatisez pour vous concentrer sur l'essentiel.",
    color: "#C0392B",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    services: [
      "Processus intelligents & RPA",
      "Support client 24/7 multilingue",
      "Services informatiques dedies",
      "Back-office expert (RH, Finance, Admin)"
    ]
  },
  {
    id: "fintech",
    title: "Fintech & Paiement",
    subtitle: "Transaction securisee",
    description: "Conception et integration de solutions de paiement conformes et securisees.",
    color: "#E67E22",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h4M14 15h4"/>
      </svg>
    ),
    services: [
      "Conception de moyens de paiement",
      "Integration passerelles (Stripe, PayPal, mobile money)",
      "Conformite PCI-DSS & DSP2",
      "Tokenisation & securisation donnees bancaires"
    ]
  }
];

const PRODUITS = [
  {
    name: "PARAFEO",
    tagline: "Signature electronique conforme eIDAS",
    pilier: "Fintech & Paiement",
    cible: "Entreprises, cabinets, administrations",
    description: "Signez vos documents en toute legalite avec horodatage, tracabilite et valeur probante.",
    color: "#E67E22",
    status: "Disponible"
  },
  {
    name: "TrackFuel360",
    tagline: "Gestion de flotte et suivi carburant",
    pilier: "Plateformes Digitales",
    cible: "Transport, logistique, flottes",
    description: "Suivi temps reel des consommations, optimisation des trajets, controle des depenses.",
    color: "#073642",
    status: "Disponible"
  },
  {
    name: "Primimport",
    tagline: "Plateforme e-commerce B2B",
    pilier: "Plateformes Digitales",
    cible: "Importateurs, grossistes, distributeurs",
    description: "Gestion des catalogues, commandes, stocks et paiements pour le commerce international.",
    color: "#073642",
    status: "Disponible"
  },
  {
    name: "Lawmate",
    tagline: "Legaltech pour avocats et particuliers",
    pilier: "Plateformes Digitales",
    cible: "Avocats, cabinets, juristes, civils",
    description: "Gestion des dossiers juridiques et recherche d'assistance juridique et judiciaire pour les particuliers.",
    color: "#073642",
    status: "Disponible"
  },
  {
    name: "PharmXpress",
    tagline: "Recherche et achat de medicaments en ligne",
    pilier: "Plateformes Digitales",
    cible: "Pharmacies, patients, professionnels de sante",
    description: "Plateforme de mise en relation et de vente de medicaments avec tracabilite et conformite.",
    color: "#073642",
    status: "Disponible"
  },
  {
    name: "Medilibre",
    tagline: "Consultations medicales en ligne",
    pilier: "Plateformes Digitales",
    cible: "Medecins, patients, cliniques",
    description: "Teleconsultation, prescriptions electroniques, suivi patient et dossier medical partage.",
    color: "#073642",
    status: "Disponible"
  }
];

type WidgetStep = "closed" | "declencheur" | "profil" | "questions" | "resultat" | "contact" | "confirmation";

function DiagnosticWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<WidgetStep>("closed");
  const [selectedProfil, setSelectedProfil] = useState<ProfilType | null>(null);
  const [reponses, setReponses] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [leadForm, setLeadForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    smsRappel: false,
    optIn: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const profilData = selectedProfil ? PROFILS.find(p => p.id === selectedProfil) : null;
  const questions = selectedProfil ? QUESTIONS[selectedProfil] : [];
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  const openWidget = () => {
    setIsOpen(true);
    setStep("declencheur");
  };

  const closeWidget = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("closed");
      setSelectedProfil(null);
      setReponses([]);
      setCurrentQuestionIndex(0);
      setDiagnostic(null);
      setLeadForm({ nom: "", email: "", telephone: "", smsRappel: false, optIn: true });
      setSubmitError(null);
    }, 300);
  };

  const handleDeclencheur = (profil: ProfilType) => {
    setSelectedProfil(profil);
    setReponses([]);
    setCurrentQuestionIndex(0);
    setStep("questions");
  };

  const handleProfilSelect = (profil: ProfilType) => {
    setSelectedProfil(profil);
    setReponses([]);
    setCurrentQuestionIndex(0);
    setStep("questions");
  };

  const handleAnswer = useCallback((score: number) => {
    setReponses(prev => [...prev, score]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const result = calculateDiagnostic(selectedProfil!, [...reponses, score]);
      setDiagnostic(result);
      setStep("resultat");
    }
  }, [currentQuestionIndex, questions.length, selectedProfil, reponses]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setReponses(prev => prev.slice(0, -1));
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep("profil");
    }
  }, [currentQuestionIndex]);

  const handleSubmit = async () => {
    if (!leadForm.nom || !leadForm.email || !leadForm.optIn) {
      setSubmitError("Veuillez remplir tous les champs.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          profil: selectedProfil,
          score_diagnostic: diagnostic?.score,
          niveau: diagnostic?.niveau,
          temps_perdu: diagnostic?.tempsPerdu,
          opportunites_manquees: diagnostic?.opportunitesManquees,
          priorite: diagnostic?.priorite,
          reponses: reponses
        }),
      });

      if (response.ok) {
        setStep("confirmation");
      } else {
        const errorData = await response.json().catch(() => ({ error: "Erreur serveur" }));
        setSubmitError(errorData.error || `Erreur ${response.status}`);
      }
    } catch (error) {
      setSubmitError("Impossible de contacter le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!diagnostic) return;
    const pdf = generateDiagnosticPDF({
      nom: leadForm.nom || "Prospect",
      email: leadForm.email || "",
      diagnostic,
      date: new Date().toLocaleDateString("fr-FR"),
    });
    const url = URL.createObjectURL(pdf);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feuille-de-route-ilocap-${leadForm.nom || "prospect"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-6 top-32 z-50"
      >
        <button
          onClick={openWidget}
          className="bg-white border border-[#B89A5A] widget-elegant hover:widget-elegant-hover transition-all duration-300 p-4 w-[180px] group"
        >
          <div className="text-center">
            {/* Icône diagnostic */}
            <svg className="w-7 h-7 mx-auto mb-2 text-[#B89A5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M7 13l3-4 3 4 3-6"/>
            </svg>
            <p className="font-[family-name:var(--font-sora)] text-xs uppercase tracking-wider text-[#073642] mb-1">
              Diagnostic
            </p>
            <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/60 mb-3">
              3 min · Score-Action
            </p>
            <div className="bg-[#B89A5A] text-[#0B0C0A] px-4 py-2 widget-button font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-wider font-bold group-hover:bg-[#073642] group-hover:text-white transition-all">
              Commencer
            </div>
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#073642]/20 backdrop-blur-sm z-40"
        onClick={closeWidget}
      />
      
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        className="fixed right-0 top-0 h-full w-[380px] bg-white widget-panel z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-[family-name:var(--font-sora)] text-sm uppercase tracking-wider text-[#073642]">
                Diagnostic ILOCAP
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/50">
                {step === "declencheur" && "Etape 1/3 · Choix du profil"}
                {step === "questions" && `Etape 2/3 · Question ${currentQuestionIndex + 1}/5`}
                {step === "resultat" && "Etape 3/3 · Vos resultats"}
                {step === "contact" && "Finalisation"}
                {step === "confirmation" && "Termine"}
              </p>
            </div>
            <button
              onClick={closeWidget}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#B89A5A] text-[#073642]/40 hover:text-[#B89A5A] transition-all widget-badge"
            >
              ✕
            </button>
          </div>

          {(step === "questions" || step === "resultat" || step === "contact") && (
            <div className="mb-6">
              <div className="w-full h-1 bg-[#E5E5E5] widget-progress">
                <div
                  className="h-full bg-[#B89A5A] widget-progress transition-all duration-500"
                  style={{ width: `${step === "questions" ? progress : step === "resultat" ? 80 : 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            {step === "declencheur" && (
              <div className="space-y-3">
                <p className="font-[family-name:var(--font-sora)] text-xs uppercase text-[#073642] mb-4">
                  Qu'est-ce qui vous ferait gagner 2 heures aujourd'hui ?
                </p>
                {[
                  { label: "Moins de temps a chercher des infos", profil: "solo" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h0a2 2 0 012 2M9 5h4M7 10h6M7 13h4"/>
                    </svg>
                  )},
                  { label: "Moins de rendez-vous manques", profil: "solo" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="14" height="13" rx="2"/><path d="M7 2v3M13 2v3M3 9h14"/>
                    </svg>
                  )},
                  { label: "Moins de temps a preparer des devis", profil: "croissance" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h12v2H4zM4 9h8M4 13h6M14 11l2 2 4-4"/>
                    </svg>
                  )},
                  { label: "Plus de clients qui me trouvent", profil: "solo" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/>
                    </svg>
                  )},
                  { label: "Des decisions plus rapides", profil: "mature" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="12" width="3" height="5" rx="0.5" fill="currentColor" stroke="none"/>
                      <rect x="8.5" y="8" width="3" height="9" rx="0.5" fill="currentColor" stroke="none"/>
                      <rect x="14" y="4" width="3" height="13" rx="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  )},
                  { label: "Moins de reunions", profil: "croissance" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 10a6 6 0 0112 0"/><path d="M10 4v2M10 14v2M4.93 6.93l1.41 1.41M13.66 13.66l1.41 1.41"/>
                    </svg>
                  )},
                  { label: "Industrialiser ce que je fais", profil: "mature" as ProfilType, icon: (
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B89A5A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 16V9l4-4v4l4-4v4l4-4v11H2z"/><path d="M2 16h16"/>
                    </svg>
                  )}
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDeclencheur(option.profil)}
                    className="w-full text-left p-3 border border-[#E5E5E5] hover:border-[#B89A5A] hover:bg-[#F5F3EE] transition-all widget-option flex items-center gap-3 group"
                  >
                    <span className="text-[#B89A5A]">{option.icon}</span>
                    <span className="font-[family-name:var(--font-manrope)] text-xs text-[#073642]/70 group-hover:text-[#073642]">
                      {option.label}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => setStep("profil")}
                  className="w-full text-center font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40 hover:text-[#B89A5A] transition-colors mt-4"
                >
                  Choisir manuellement →
                </button>
              </div>
            )}

            {step === "profil" && (
              <div className="space-y-3">
                <button
                  onClick={() => setStep("declencheur")}
                  className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40 hover:text-[#B89A5A] mb-4 block"
                >
                  ← Retour
                </button>
                {PROFILS.map((profil) => (
                  <button
                    key={profil.id}
                    onClick={() => handleProfilSelect(profil.id)}
                    className="w-full text-left p-4 border border-[#E5E5E5] hover:border-[#B89A5A] transition-all widget-option group"
                  >
                    <div className="w-full h-1 mb-3 widget-badge" style={{ backgroundColor: profil.color }} />
                    <p className="font-[family-name:var(--font-sora)] text-xs uppercase text-[#073642] group-hover:text-[#B89A5A]">
                      {profil.label}
                    </p>
                    <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/50">
                      {profil.taille}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === "questions" && profilData && questions.length > 0 && (
              <div className="space-y-4">
                <button
                  onClick={handlePrevious}
                  className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40 hover:text-[#B89A5A] mb-2 block"
                >
                  ← {currentQuestionIndex === 0 ? "Changer" : "Precedent"}
                </button>
                
                <p className="font-[family-name:var(--font-sora)] text-sm uppercase text-[#073642] leading-relaxed">
                  {questions[currentQuestionIndex].text}
                </p>
                
                <div className="space-y-2">
                  {questions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-3 border border-[#E5E5E5] hover:border-[#B89A5A] hover:bg-[#F5F3EE] transition-all widget-option group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-[#E5E5E5] widget-avatar group-hover:border-[#B89A5A] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-[#B89A5A] widget-avatar opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <p className="font-[family-name:var(--font-manrope)] text-xs text-[#073642] group-hover:text-[#B89A5A]">
                            {option.label}
                          </p>
                          <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/50">
                            {option.sub}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "resultat" && diagnostic && profilData && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#F5F3EE] p-3 widget-badge text-center">
                    <p className="font-[family-name:var(--font-sora)] text-xl text-[#C0392B]">{diagnostic.tempsPerdu}h</p>
                    <p className="font-[family-name:var(--font-manrope)] text-[8px] text-[#073642]/40 uppercase">Perdues</p>
                  </div>
                  <div className="bg-[#F5F3EE] p-3 widget-badge text-center">
                    <p className="font-[family-name:var(--font-sora)] text-xl text-[#E67E22]">{diagnostic.opportunitesManquees}</p>
                    <p className="font-[family-name:var(--font-manrope)] text-[8px] text-[#073642]/40 uppercase">Opport.</p>
                  </div>
                  <div className="bg-[#F5F3EE] p-3 widget-badge text-center">
                    <p className="font-[family-name:var(--font-sora)] text-sm text-[#B89A5A] leading-tight">{diagnostic.niveau}</p>
                    <p className="font-[family-name:var(--font-manrope)] text-[8px] text-[#073642]/40 uppercase">{diagnostic.score}/100</p>
                  </div>
                </div>

                <div className="bg-[#F5F3EE] p-4 widget-badge">
                  <p className="font-[family-name:var(--font-sora)] text-xs uppercase text-[#073642] mb-2">
                    3 actions gratuites
                  </p>
                  {profilData.actionsGratuites.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 mb-2">
                      <span className="text-[#B89A5A] text-xs font-bold">{idx + 1}</span>
                      <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/70">{action}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full bg-[#073642] text-white py-3 widget-button font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-wider font-bold hover:bg-[#B89A5A] transition-all"
                  >
                    Telecharger PDF
                  </button>
                  <button
                    onClick={() => setStep("contact")}
                    className="w-full bg-[#B89A5A] text-[#0B0C0A] py-3 widget-button font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-wider font-bold hover:bg-[#073642] hover:text-white transition-all"
                  >
                    Prendre RDV
                  </button>
                </div>
              </div>
            )}

            {step === "contact" && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep("resultat")}
                  className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40 hover:text-[#B89A5A] mb-2 block"
                >
                  ← Retour
                </button>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={leadForm.nom}
                    onChange={(e) => setLeadForm({...leadForm, nom: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-3 widget-input text-sm focus:border-[#B89A5A] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-3 widget-input text-sm focus:border-[#B89A5A] outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Telephone"
                    value={leadForm.telephone}
                    onChange={(e) => setLeadForm({...leadForm, telephone: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-3 widget-input text-sm focus:border-[#B89A5A] outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-4 h-4 border widget-avatar flex items-center justify-center ${leadForm.optIn ? "bg-[#B89A5A] border-[#B89A5A]" : "border-[#E5E5E5]"}`}>
                    {leadForm.optIn && <div className="w-1.5 h-1.5 bg-white widget-avatar" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={leadForm.optIn} onChange={(e) => setLeadForm({...leadForm, optIn: e.target.checked})} />
                  <span className="font-[family-name:var(--font-manrope)] text-[9px] text-[#073642]/60">J'accepte les conditions RGPD</span>
                </label>

                {submitError && (
                  <p className="text-red-500 text-xs">{submitError}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!leadForm.nom || !leadForm.email || !leadForm.optIn || isSubmitting}
                  className="w-full bg-[#B89A5A] text-[#0B0C0A] py-3 widget-button font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-wider font-bold disabled:opacity-30"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer →"}
                </button>
              </div>
            )}

            {step === "confirmation" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#B89A5A]/10 widget-avatar flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-[#B89A5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-[family-name:var(--font-sora)] text-sm uppercase text-[#073642]">
                  Feuille de route envoyee
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-xs text-[#073642]/60">
                  Verifiez votre boite mail. Reponse sous 24h.
                </p>
                <a
                  href="https://calendly.com/candriatiana/30min"
                  target="_blank"
                  className="block w-full bg-[#B89A5A] text-[#0B0C0A] py-3 widget-button font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-wider font-bold"
                >
                  Reserver 30 min →
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
      <Header />
      <DiagnosticWidget />

      <section className="pt-32 pb-24 px-6 lg:px-16 pr-[240px]">
        <div className="max-w-[800px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B89A5A]" />
            <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
              Nos expertises
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-5xl uppercase leading-[1.1] mb-6">
            5 piliers de solutions <span className="text-[#B89A5A]">digitales</span>
          </h1>
          <p className="font-[family-name:var(--font-manrope)] text-sm md:text-base text-[#073642]/60 max-w-xl">
            De l'intelligence artificielle à la transaction securisee, 
            6 produits prets a deployer pour transformer votre activite.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-16 pr-[240px]">
        <div className="max-w-[1000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILIERS.map((pilier, idx) => (
              <motion.div
                key={pilier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#E5E5E5] p-8 hover:border-[#B89A5A] hover:shadow-md transition-all duration-300 rounded-sm"
              >
                <div className="text-[#B89A5A] mb-4">{pilier.icon}</div>
                <h3 className="font-[family-name:var(--font-sora)] text-lg uppercase tracking-widest mb-2 text-[#073642]">
                  {pilier.title}
                </h3>
                <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A]/60 mb-4">
                  {pilier.subtitle}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60 leading-relaxed mb-6">
                  {pilier.description}
                </p>
                <ul className="space-y-2">
                  {pilier.services.map((service, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#B89A5A]/50 mt-1.5 flex-shrink-0" />
                      <span className="font-[family-name:var(--font-manrope)] text-xs text-[#073642]/50">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-16 pr-[240px] bg-white">
        <div className="max-w-[1000px] py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                Produits disponibles
              </span>
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
            </div>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl uppercase">
              Deployez <span className="text-[#B89A5A]">immediatement</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUITS.map((produit, idx) => (
              <motion.div
                key={produit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#F5F3EE] border border-[#E5E5E5] p-6 hover:border-[#B89A5A] transition-all duration-300 rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded"
                    style={{ backgroundColor: `${produit.color}20`, color: produit.color }}
                  >
                    {produit.pilier}
                  </span>
                  <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.2em] text-[#B89A5A]">
                    {produit.status}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-lg uppercase tracking-widest mb-2 text-[#073642]">
                  {produit.name}
                </h3>
                <p className="font-[family-name:var(--font-manrope)] text-xs text-[#B89A5A]/60 mb-3 uppercase tracking-wider">
                  {produit.tagline}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60 leading-relaxed mb-4">
                  {produit.description}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40 uppercase tracking-wider">
                  Cible : {produit.cible}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-16 pr-[240px]">
        <div className="max-w-[1000px]">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                Ils nous font confiance
              </span>
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {["EspaMada", "greenvillage.fr", "Voxima", "Yunka Retreat", "Primimport", "TrackFuel360", "Karibo Services", "CoursiNet"].map((ref) => (
              <div key={ref} className="text-center font-[family-name:var(--font-sora)] text-sm uppercase text-[#073642]/40">
                {ref}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-16 pr-[240px] text-center">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl uppercase mb-8 text-[#073642]">
          Discutons de votre <span className="text-[#B89A5A]">projet</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://calendly.com/candriatiana/30min"
            target="_blank"
            className="bg-[#073642] text-[#F3F1EC] px-12 py-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#B89A5A] transition-all rounded-sm"
          >
            Prendre RDV →
          </Link>
          <button
            onClick={() => {
              const widget = document.querySelector('[class*="fixed right-6"]');
              if (widget) widget.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-[#B89A5A] text-[#B89A5A] px-12 py-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#B89A5A] hover:text-[#0B0C0A] transition-all rounded-sm"
          >
            Faire le diagnostic
          </button>
        </div>
      </section>
    </main>
  );
}