"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import { PROFILS, QUESTIONS, MATURITY_LEVELS, calculateDiagnostic } from "@/lib/questions";
import type { ProfilType, DiagnosticResult } from "@/lib/questions";
import { generateDiagnosticPDF } from "@/lib/pdf-generator";

type Step = "declencheur" | "profil" | "questions" | "resultat" | "contact" | "confirmation";

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>("declencheur");
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
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const profilData = selectedProfil ? PROFILS.find(p => p.id === selectedProfil) : null;
  const questions = selectedProfil ? QUESTIONS[selectedProfil] : [];
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

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
      setSubmitError("Veuillez remplir tous les champs obligatoires et accepter les conditions.");
      return;
    }
    
    setSubmitError(null);
    setIsSubmitting(true);
    
    console.log("Envoi du diagnostic...", {
      nom: leadForm.nom,
      email: leadForm.email,
      profil: selectedProfil,
      score: diagnostic?.score
    });

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

      console.log("Reponse API:", response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log("Succes:", data);
        setStep("confirmation");
      } else {
        const errorData = await response.json().catch(() => ({ error: "Erreur serveur" }));
        console.error("Erreur API:", errorData);
        setSubmitError(errorData.error || `Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur fetch:", error);
      setSubmitError("Impossible de contacter le serveur. Verifiez votre connexion ou reessayez.");
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
    setPdfDownloaded(true);
  };

  const handleReset = () => {
    setStep("declencheur");
    setSelectedProfil(null);
    setReponses([]);
    setCurrentQuestionIndex(0);
    setDiagnostic(null);
    setLeadForm({ nom: "", email: "", telephone: "", smsRappel: false, optIn: true });
    setPdfDownloaded(false);
    setSubmitError(null);
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  // ============================================
  // ETAPE 1: DECLENCHEUR
  // ============================================
  if (step === "declencheur") {
    const options = [
      { label: "Moins de temps a chercher des infos ou recopier des donnees", profil: "solo" as ProfilType, icon: "📋" },
      { label: "Moins de rendez-vous manques ou de relances a faire", profil: "solo" as ProfilType, icon: "📞" },
      { label: "Moins de temps a preparer des devis, rapports, propositions", profil: "croissance" as ProfilType, icon: "📄" },
      { label: "Plus de clients qui me trouvent et me contactent sans effort", profil: "solo" as ProfilType, icon: "🎯" },
      { label: "Des decisions plus rapides basees sur des chiffres fiables", profil: "mature" as ProfilType, icon: "📊" },
      { label: "Moins de reunions et plus de coordination automatique", profil: "croissance" as ProfilType, icon: "🔄" },
      { label: "Industrialiser ce que je fais deja bien pour deployer a grande echelle", profil: "mature" as ProfilType, icon: "🏭" }
    ];

    return (
      <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
        <Header />
        <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                Diagnostic en 3 minutes
              </span>
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
            </div>
            <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl uppercase leading-[1.1] mb-4 text-[#073642]">
              Qu&apos;est-ce qui vous ferait gagner{" "}
              <span className="text-[#B89A5A]">2 heures</span> aujourd&apos;hui ?
            </h1>
            <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60 max-w-lg mx-auto">
              Une seule reponse suffit. Nous adaptons les questions suivantes a votre situation.
            </p>
          </div>

          <div className="space-y-3 mb-12">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleDeclencheur(option.profil)}
                className="w-full text-left p-5 md:p-6 bg-white border border-[#E5E5E5] hover:border-[#B89A5A] hover:shadow-md transition-all duration-300 group flex items-center gap-5 rounded-sm"
              >
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
                <span className="font-[family-name:var(--font-manrope)] text-sm md:text-base text-[#073642]/80 group-hover:text-[#073642] transition-colors">
                  {option.label}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto text-[#073642]/20 group-hover:text-[#B89A5A] transition-colors flex-shrink-0">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep("profil")}
              className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40 hover:text-[#B89A5A] transition-colors"
            >
              Je prefere choisir mon profil manuellement →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ETAPE 2: CHOIX PROFIL
  // ============================================
  if (step === "profil") {
    return (
      <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
        <Header />
        <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <button
              onClick={() => setStep("declencheur")}
              className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40 hover:text-[#B89A5A] transition-colors mb-4 block"
            >
              ← Retour
            </button>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                Diagnostic personnalise
              </span>
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
            </div>
            <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl uppercase leading-[1.1] text-[#073642]">
              Ou vous situez-vous <span className="text-[#B89A5A]">aujourd&apos;hui</span> ?
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILS.map((profil) => (
              <button
                key={profil.id}
                onClick={() => handleProfilSelect(profil.id)}
                className="group relative bg-white border border-[#E5E5E5] p-8 text-left hover:border-[#B89A5A] hover:shadow-md transition-all duration-300 rounded-sm"
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: profil.color }} />
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.3em] text-[#073642]/30 block mb-2">
                    {profil.taille}
                  </span>
                  <h3 className="font-[family-name:var(--font-sora)] text-xl uppercase tracking-widest mb-3 text-[#073642] group-hover:text-[#B89A5A] transition-colors">
                    {profil.label}
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60 leading-relaxed mb-8">
                  {profil.description}
                </p>
                <div className="space-y-3 mb-8">
                  {profil.frustrations.slice(0, 2).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#B89A5A]/50 mt-2 flex-shrink-0" />
                      <span className="font-[family-name:var(--font-manrope)] text-xs text-[#073642]/40">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A]/60 group-hover:text-[#B89A5A] transition-colors">
                    Commencer
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#B89A5A]/60 group-hover:text-[#B89A5A] transition-colors">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ETAPE 3: QUESTIONS PROFILEES - SIDE BLOCK
  // ============================================
  if (step === "questions" && profilData && questions.length > 0) {
    const question = questions[currentQuestionIndex];

    return (
      <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
        <Header />
        <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GAUCHE - Info sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <button
                  onClick={handlePrevious}
                  className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40 hover:text-[#B89A5A] transition-colors mb-6 block"
                >
                  ← {currentQuestionIndex === 0 ? "Changer de profil" : "Precedent"}
                </button>
                
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.3em] text-[#B89A5A] block mb-2">
                    {profilData.label}
                  </span>
                  <h2 className="font-[family-name:var(--font-sora)] text-lg uppercase text-[#073642]">
                    Votre diagnostic
                  </h2>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40">
                      Question {currentQuestionIndex + 1} sur {questions.length}
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/40">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full h-[2px] bg-[#E5E5E5]">
                    <div
                      className="h-full bg-[#B89A5A] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DROITE - Questions */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-8"
                >
                  <div className="bg-white border border-[#E5E5E5] p-8 md:p-10 rounded-sm">
                    <p className="font-[family-name:var(--font-sora)] text-lg md:text-xl uppercase tracking-wide leading-relaxed mb-8 text-[#073642]">
                      {question.text}
                    </p>
                    <div className="space-y-3">
                      {question.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(option.score)}
                          className="w-full text-left p-4 md:p-5 border border-[#E5E5E5] hover:border-[#B89A5A] hover:bg-[#F5F3EE] transition-all duration-200 group rounded-sm"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-5 h-5 border border-[#E5E5E5] rounded-full group-hover:border-[#B89A5A] flex items-center justify-center flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-[#B89A5A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex-1">
                              <p className="font-[family-name:var(--font-sora)] text-base uppercase tracking-wide text-[#073642] group-hover:text-[#B89A5A] transition-colors mb-1">
                                {option.label}
                              </p>
                              <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/50">
                                {option.sub}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ETAPE 4: RESULTAT (Score-Action)
  // ============================================
  if (step === "resultat" && diagnostic && profilData) {
    const niveau = MATURITY_LEVELS.find(n => diagnostic.score <= n.max) || MATURITY_LEVELS[3];

    return (
      <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
        <Header />
        <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                Votre diagnostic
              </span>
              <div className="w-8 h-[1px] bg-[#B89A5A]" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white border border-[#E5E5E5] p-8 text-center rounded-sm">
              <p className="font-[family-name:var(--font-sora)] text-5xl text-[#C0392B] mb-2">
                {diagnostic.tempsPerdu}h
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40">
                Perdues /semaine
              </p>
            </div>
            <div className="bg-white border border-[#E5E5E5] p-8 text-center rounded-sm">
              <p className="font-[family-name:var(--font-sora)] text-5xl text-[#E67E22] mb-2">
                {diagnostic.opportunitesManquees}
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40">
                Opportunites /mois
              </p>
            </div>
            <div className="bg-white border border-[#E5E5E5] p-8 text-center rounded-sm">
              <p className="font-[family-name:var(--font-sora)] text-2xl text-[#B89A5A] mb-2 leading-tight">
                {diagnostic.priorite}
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40">
                Priorite immediate
              </p>
            </div>
          </motion.div>

          <div className="bg-white border p-8 mb-8 rounded-sm" style={{ borderColor: niveau.color }}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#073642]/40">
                Votre niveau
              </span>
              <span className="font-[family-name:var(--font-sora)] text-3xl" style={{ color: niveau.color }}>
                {diagnostic.niveau}
              </span>
            </div>
            <div className="w-full h-2 bg-[#E5E5E5] mb-4 rounded-full">
              <div
                className="h-full transition-all duration-1000 rounded-full"
                style={{ width: `${diagnostic.score}%`, backgroundColor: niveau.color }}
              />
            </div>
            <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/70">
              {niveau.description}
            </p>
          </div>

          <div className="bg-white border border-[#073642]/10 p-8 mb-8 rounded-sm">
            <h3 className="font-[family-name:var(--font-sora)] text-lg uppercase tracking-widest text-[#073642] mb-6">
              3 actions <span className="text-[#B89A5A]">gratuites</span> cette semaine
            </h3>
            <div className="space-y-4">
              {profilData.actionsGratuites.map((action, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-[#B89A5A] flex items-center justify-center flex-shrink-0 rounded-full">
                    <span className="text-[#B89A5A] text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/80 leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#B89A5A]/20 p-8 mb-8 rounded-sm">
            <h3 className="font-[family-name:var(--font-sora)] text-lg uppercase tracking-widest text-[#B89A5A] mb-6">
              Avec ILOCAP, passez a l&apos;action
            </h3>
            <div className="space-y-4">
              {profilData.actionsILOCAP.map((action, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 p-4 border border-[#E5E5E5] hover:border-[#B89A5A]/30 transition-all rounded-sm">
                  <div>
                    <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642] mb-1">
                      {action.label}
                    </p>
                    <p className="font-[family-name:var(--font-manrope)] text-xs text-[#B89A5A]">
                      {action.service}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-sora)] text-xs text-[#073642]/60 whitespace-nowrap">
                    {action.roi}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 bg-[#073642] text-[#F3F1EC] py-5 font-[family-name:var(--font-sora)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-opacity-90 transition-all rounded-sm"
            >
              {pdfDownloaded ? "✓ PDF telecharge" : "Telecharger ma feuille de route (PDF)"}
            </button>
            <button
              onClick={() => setStep("contact")}
              className="flex-1 bg-[#B89A5A] text-[#0B0C0A] py-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#073642] hover:text-[#F3F1EC] transition-all rounded-sm"
            >
              Prendre RDV avec un expert
            </button>
          </div>

          <div className="text-center mb-8">
            <a
              href="https://calendly.com/candriatiana/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#B89A5A] text-[#B89A5A] px-8 py-3 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] hover:bg-[#B89A5A] hover:text-[#0B0C0A] transition-all rounded-sm"
            >
              Ou reservez directement un creneau de 30 min →
            </a>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ETAPE 5: CONTACT
  // ============================================
  if (step === "contact") {
    return (
      <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
        <Header />
        <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[600px] mx-auto">
          <div className="text-center mb-12">
            <button
              onClick={() => setStep("resultat")}
              className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#073642]/40 hover:text-[#B89A5A] transition-colors mb-4 block"
            >
              ← Retour au diagnostic
            </button>
            <h1 className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl uppercase leading-[1.1] text-[#073642]">
              Recevez votre <span className="text-[#B89A5A]">feuille de route</span>
            </h1>
            <p className="mt-4 font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60">
              En 2 minutes. Et un creneau d&apos;entretien sous 24h.
            </p>
          </div>

          <div className="bg-white border border-[#E5E5E5] p-8 rounded-sm">
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="NOM *"
                value={leadForm.nom}
                onChange={(e) => setLeadForm({ ...leadForm, nom: e.target.value })}
                className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
              />
              <input
                type="email"
                placeholder="EMAIL *"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
              />
              <input
                type="tel"
                placeholder="TELEPHONE (optionnel, +30% de conversion)"
                value={leadForm.telephone}
                onChange={(e) => setLeadForm({ ...leadForm, telephone: e.target.value })}
                className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
              />
            </div>

            <div className="space-y-3 mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 border rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${leadForm.optIn ? "bg-[#B89A5A] border-[#B89A5A]" : "border-[#E5E5E5]"}`}>
                  {leadForm.optIn && (
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={leadForm.optIn}
                  onChange={(e) => setLeadForm({ ...leadForm, optIn: e.target.checked })}
                />
                <span className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/60">
                  J&apos;accepte de recevoir ma feuille de route par email (RGPD)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 border rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${leadForm.smsRappel ? "bg-[#B89A5A] border-[#B89A5A]" : "border-[#E5E5E5]"}`}>
                  {leadForm.smsRappel && (
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={leadForm.smsRappel}
                  onChange={(e) => setLeadForm({ ...leadForm, smsRappel: e.target.checked })}
                />
                <span className="font-[family-name:var(--font-manrope)] text-[10px] text-[#073642]/60">
                  Je veux aussi un SMS de rappel pour mon entretien (+15% de presence)
                </span>
              </label>
            </div>

            {submitError && (
              <div className="mb-4 p-4 border border-red-300 bg-red-50 text-red-600 font-[family-name:var(--font-manrope)] text-sm rounded-sm">
                ⚠️ {submitError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!leadForm.nom || !leadForm.email || !leadForm.optIn || isSubmitting}
              className="w-full bg-[#B89A5A] text-[#0B0C0A] py-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#073642] hover:text-[#F3F1EC] transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
            >
              {isSubmitting ? "⏳ Envoi en cours..." : "GENERER MA FEUILLE DE ROUTE →"}
            </button>

            <div className="text-center mt-6">
              <a
                href="https://calendly.com/candriatiana/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A]/60 hover:text-[#B89A5A] transition-colors"
              >
                Preferez reserver directement ? Creneau 30 min →
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ETAPE 6: CONFIRMATION
  // ============================================
  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
      <Header />
      <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[600px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 border border-[#E5E5E5] rounded-sm space-y-6"
        >
          <div className="w-20 h-20 bg-[#B89A5A]/10 flex items-center justify-center mx-auto rounded-full">
            <span className="text-[#B89A5A] text-3xl">✓</span>
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-2xl text-[#073642]">
            Votre feuille de route est en route
          </h3>
          <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60">
            Verifiez votre boite mail (et vos spams). Notre equipe vous contacte sous 24h pour un creneau.
          </p>
          {leadForm.smsRappel && (
            <p className="font-[family-name:var(--font-manrope)] text-xs text-[#B89A5A]">
              Vous recevrez aussi un SMS de confirmation.
            </p>
          )}

          <div className="pt-4 border-t border-[#E5E5E5]">
            <a
              href="https://calendly.com/candriatiana/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#B89A5A] text-[#0B0C0A] px-8 py-3 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#073642] hover:text-[#F3F1EC] transition-all rounded-sm"
            >
              Reserver maintenant un creneau 30 min →
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="border border-[#B89A5A] text-[#B89A5A] px-8 py-3 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] hover:bg-[#B89A5A] hover:text-[#0B0C0A] transition-all rounded-sm"
            >
              Refaire le diagnostic
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}