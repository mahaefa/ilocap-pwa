"use client";

import { useState } from "react";

export default function Expertises() {
  const [activeTab, setActiveTab] = useState(0);

  const expertises = [
    {
      title: "Solutions IA et Data",
      subtitle: "L'intelligence business",
      description: "Passez de l'intuition a la decision pilotee par la donnee.",
      items: [
        { title: "Anticiper", desc: "Analyse predictive pour detecter les tendances avant vos concurrents." },
        { title: "Automatiser", desc: "Assistants virtuels intelligents pour un service client 24/7." },
        { title: "Maitriser", desc: "Vision 360° de votre business via la centralisation des donnees." },
      ],
    },
    {
      title: "Plateformes Digitales",
      subtitle: "L'infrastructure",
      description: "Des outils sur-mesure pour des besoins specifiques.",
      items: [
        { title: "Outils metiers et Extranets", desc: "Fluidifier la collaboration et securiser vos echanges." },
        { title: "Ecosystemes de Vente", desc: "E-commerce et Marketplaces haute performance." },
        { title: "Vitrines Strategiques", desc: "Landing pages optimisees pour la conversion." },
      ],
    },
    {
      title: "Design et Marketing",
      subtitle: "La visibilite",
      description: "Devenez incontournable sur votre marche.",
      items: [
        { title: "Branding et contenus", desc: "Captiver par un graphisme percutant qui raconte votre histoire." },
        { title: "Acquisition ciblee", desc: "Campagnes publicitaires optimisees pour atteindre vos clients." },
        { title: "Google Business et CM", desc: "Gestion de communaute authentique pour creer un lien durable." },
      ],
    },
    {
      title: "Automatisation et BPO",
      subtitle: "L'optimisation",
      description: "Optimisez vos operations, liberez vos equipes.",
      items: [
        { title: "Processus intelligents", desc: "Eliminez les taches chronophages et repetitives." },
        { title: "Services informatiques", desc: "Infrastructure IT geree par des experts dedies et proactifs." },
        { title: "Support client", desc: "Disponibilite continue et reactivite qui depasse les attentes." },
      ],
    },
  ];

  return (
    <section id="expertises" className="py-32 bg-ivory">
      <div className="px-gutter max-w-[1440px] mx-auto">
        <div className="mb-20">
          <h2 className="font-sora text-4xl md:text-5xl uppercase mb-6 text-petrol">
            Nos Expertises
          </h2>
          <div className="h-[2px] w-32 bg-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2">
            {expertises.map((exp, index) => (
              <button
                key={exp.title}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-6 border transition-all duration-300 ${
                  activeTab === index
                    ? "border-gold bg-white"
                    : "border-petrol/10 hover:border-petrol/30"
                }`}
              >
                <span className={`font-manrope text-[10px] uppercase tracking-[0.2em] ${
                  activeTab === index ? "text-gold" : "text-muted"
                }`}>
                  {exp.subtitle}
                </span>
                <h3 className={`font-sora text-xl uppercase mt-2 ${
                  activeTab === index ? "text-petrol" : "text-muted"
                }`}>
                  {exp.title}
                </h3>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="border border-petrol/15 bg-white p-12 h-full">
              <p className="font-manrope text-lg text-muted mb-10 leading-relaxed">
                {expertises[activeTab].description}
              </p>
              <div className="space-y-8">
                {expertises[activeTab].items.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-8 h-8 bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold font-sora text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-sora text-lg uppercase text-petrol mb-2">
                        {item.title}
                      </h4>
                      <p className="font-manrope text-sm text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}