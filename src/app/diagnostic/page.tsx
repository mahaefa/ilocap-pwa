"use client";

import { useState, useMemo } from "react";
import Header from "@/components/shared/Header";
import { QUESTIONS } from "@/lib/questions";

export default function DiagnosticPage() {
  const [answers, setAnswers] = useState<<Record<number, boolean>>({});
  const [revenue, setRevenue] = useState(500000);
  const [showResults, setShowResults] = useState(false);
  const [leadForm, setLeadForm] = useState({ nom: "", email: "", entreprise: "", optIn: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const toggle = (id: number) => setAnswers((p) => ({ ...p, [id]: !p[id] }));

  const scores = useMemo(() => {
    const cat: Record<string, { mastered: number; total: number }> = {
      automatisation: { mastered: 0, total: 0 },
      marketing: { mastered: 0, total: 0 },
      plateformes: { mastered: 0, total: 0 },
      "ia-data": { mastered: 0, total: 0 },
    };

    QUESTIONS.forEach((q) => {
      cat[q.category].total += 1;
      if (answers[q.id]) cat[q.category].mastered += 1;
    });

    const totalMastered = Object.values(cat).reduce((s, c) => s + c.mastered, 0);
    const masteredPct = Math.round((totalMastered / totalQuestions) * 100);
    const recoverablePct = 100 - masteredPct;
    const lossAmount = Math.round((revenue * recoverablePct) / 100);
    const gainAmount = Math.round(lossAmount * 0.6);

    return { cat, masteredPct, recoverablePct, lossAmount, gainAmount };
  }, [answers, revenue]);

  const handleSubmit = async () => {
    if (!leadForm.nom || !leadForm.email) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          score_diagnostic: scores.masteredPct,
          roi_estime: scores.gainAmount,
        }),
      });
      
      if (response.ok) {
        setShowResults(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setLeadForm({ nom: "", email: "", entreprise: "", optIn: false });
  };

  return (
    <main className="min-h-screen bg-ink text-ivory">
      <Header />
      
      <div className="pt-32 pb-24 px-gutter max-w-[1440px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-gold" />
            <span className="font-manrope text-[10px] uppercase tracking-[0.3em] text-gold">
              Architecture de Performance
            </span>
          </div>
          <h1 className="font-sora text-4xl md:text-5xl uppercase leading-[1.1]">
            DIAGNOSTIC et <span className="text-gold">SIMULATEUR ROI</span>
          </h1>
          <p className="mt-4 font-manrope text-sm text-ivory-muted max-w-lg leading-relaxed">
            Identifiez vos fuites operationnelles et visualisez l'impact d'une restructuration strategique sur votre rentabilite annuelle.
          </p>
        </div>

        <div className="w-full h-[1px] relative bg-white/10 mb-4">
          <div
            className="h-[1px] absolute top-0 left-0 transition-all duration-500"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%`, backgroundColor: "#B89A5A" }}
          />
        </div>
        <div className="flex justify-between mb-12">
          <span className="font-manrope text-[10px] uppercase tracking-[0.15em] text-ivory-muted">
            {answeredCount} sur {totalQuestions} repondues
          </span>
          <span className="font-manrope text-[10px] uppercase tracking-[0.15em] text-ivory-muted">
            {Math.round((answeredCount / totalQuestions) * 100)}%
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-manrope text-[9px] uppercase tracking-[0.3em] text-gold opacity-60 block mb-2">Phase 01</span>
                <h2 className="font-sora text-2xl uppercase tracking-widest">Audit de Maturite</h2>
              </div>
              <div className="text-right">
                <span className="font-sora text-4xl text-gold">{scores.masteredPct}%</span>
                <p className="font-manrope text-[8px] uppercase tracking-[0.2em] opacity-40 mt-1">Maturite</p>
              </div>
            </div>

            <div className="space-y-0 border-t border-white/5">
              {QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => toggle(q.id)}
                  className="w-full text-left px-4 py-4 flex items-start gap-4 transition-all duration-200 border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <div className={`w-4 h-4 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    answers[q.id] ? "bg-gold border-gold" : "border-gold/40 bg-transparent"
                  }`}>
                    {answers[q.id] && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#0B0C0A" strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-manrope text-[10px] uppercase tracking-[0.1em] text-ivory-muted mb-1">
                      {q.categoryShort}
                    </p>
                    <p className={`font-manrope text-sm leading-relaxed ${
                      answers[q.id] ? "text-ivory" : "text-ivory-muted"
                    }`}>
                      {q.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
              <div className="p-6 bg-surface-dark">
                <p className="font-manrope text-[9px] uppercase tracking-widest opacity-40 mb-2">Maitrise</p>
                <p className="font-sora text-2xl text-gold">{scores.masteredPct}%</p>
              </div>
              <div className="p-6 bg-surface-dark">
                <p className="font-manrope text-[9px] uppercase tracking-widest opacity-40 mb-2">A Recuperer</p>
                <p className="font-sora text-2xl text-alert">{scores.recoverablePct}%</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="font-manrope text-[9px] uppercase tracking-[0.3em] text-gold opacity-60 block mb-2">Phase 02</span>
              <h2 className="font-sora text-2xl uppercase tracking-widest">Modelisation Financiere</h2>
            </div>

            <div className="p-8 border border-white/5 bg-surface-dark space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <label className="font-sora text-[10px] uppercase tracking-widest text-ivory-muted">
                  Chiffre d'Affaires Annuel (HT)
                </label>
                <span className="font-sora text-3xl text-gold">
                  {revenue >= 1000000 
                    ? (revenue / 1000000).toFixed(1) + "M €" 
                    : (revenue / 1000).toFixed(0) + "k €"}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="10000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-gold opacity-50 hover:opacity-100 transition-opacity"
              />
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}
                className="w-full bg-transparent border border-white/10 p-4 text-ivory font-manrope text-sm focus:border-gold outline-none"
                placeholder="Entrez votre CA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-white/5">
              <div className="space-y-4">
                <h3 className="font-sora text-[10px] uppercase tracking-widest text-ivory-muted">
                  Potentiel de Recuperation
                </h3>
                <p className="font-sora text-4xl text-gold">
                  {scores.gainAmount.toLocaleString("fr-FR")} €
                </p>
                <p className="font-manrope text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                  Optimisation annuelle potentielle
                </p>
              </div>
              <div className="space-y-4 md:text-right">
                <h3 className="font-sora text-[10px] uppercase tracking-widest text-ivory-muted">
                  Manque a Gagner
                </h3>
                <p className="font-sora text-4xl text-alert">
                  {scores.lossAmount.toLocaleString("fr-FR")} €
                </p>
                <p className="font-manrope text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                  Perte d'opportunite identifiee
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <p className="font-sora text-[10px] uppercase tracking-[0.2em] text-ivory-muted">
                Repartition des fuites par axe
              </p>
              {Object.entries(scores.cat).map(([key, val]) => {
                const pct = Math.round(((val.total - val.mastered) / val.total) * 100);
                const labels: Record<string, string> = {
                  automatisation: "Automatisation",
                  marketing: "Visibilite",
                  plateformes: "Plateformes",
                  "ia-data": "IA et Data",
                };
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-ivory-muted">{labels[key]}</span>
                      <span className={pct > 50 ? "text-alert" : "text-ivory-muted"}>{pct}% de fuite</span>
                    </div>
                    <div className="w-full h-[2px] relative bg-white/5">
                      <div className="h-[2px] absolute top-0 left-0 transition-all duration-700" 
                        style={{ width: `${pct}%`, backgroundColor: pct > 50 ? "#C0392B" : "#B89A5A" }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {!showResults ? (
              <div className="p-8 border border-gold/20 bg-surface-dark space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-gold" />
                  <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-gold">
                    Recevoir mon rapport
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="NOM"
                    value={leadForm.nom}
                    onChange={(e) => setLeadForm({ ...leadForm, nom: e.target.value })}
                    className="bg-transparent border border-white/10 p-4 text-ivory font-manrope text-sm focus:border-gold outline-none placeholder:text-ivory-muted/50"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="bg-transparent border border-white/10 p-4 text-ivory font-manrope text-sm focus:border-gold outline-none placeholder:text-ivory-muted/50"
                  />
                  <input
                    type="text"
                    placeholder="ENTREPRISE (optionnel)"
                    value={leadForm.entreprise}
                    onChange={(e) => setLeadForm({ ...leadForm, entreprise: e.target.value })}
                    className="bg-transparent border border-white/10 p-4 text-ivory font-manrope text-sm focus:border-gold outline-none placeholder:text-ivory-muted/50 md:col-span-2"
                  />
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-4 h-4 border flex-shrink-0 ${leadForm.optIn ? "bg-gold border-gold" : "border-gold/40"}`}>
                    {leadForm.optIn && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4 7L8 3" stroke="#0B0C0A" strokeWidth="1.5"/></svg>}
                  </div>
                  <input type="checkbox" className="hidden" checked={leadForm.optIn} onChange={(e) => setLeadForm({ ...leadForm, optIn: e.target.checked })} />
                  <span className="font-manrope text-[10px] text-ivory-muted">J'accepte de recevoir les analyses et offres ILOCAP</span>
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={!leadForm.nom || !leadForm.email || isSubmitting}
                  className="w-full bg-gold text-ink py-4 font-manrope text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Envoi en cours..." : "Generer le rapport complet"}
                </button>
              </div>
            ) : (
              <div className="p-8 border border-gold/20 bg-surface-dark space-y-6 text-center">
                <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mx-auto">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <h3 className="font-sora text-xl text-ivory">Rapport genere avec succes</h3>
                <p className="font-manrope text-sm text-ivory-muted">
                  Vous recevrez votre diagnostic personnalise par email sous 24h.
                </p>
                <button
                  onClick={handleReset}
                  className="border border-gold text-gold px-8 py-3 font-manrope text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-all"
                >
                  Refaire le diagnostic
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="bg-petrol text-ivory py-6 font-sora text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-opacity-90 transition-all border border-petrol">
                Telecharger le PDF
              </button>
              <button className="bg-transparent border border-white/10 text-ivory-muted py-6 font-sora text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                Reserver un audit expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}