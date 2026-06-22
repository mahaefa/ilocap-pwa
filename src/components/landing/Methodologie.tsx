const steps = [
  {
    number: "01",
    title: "Audit et Strategie",
    description: "Une immersion totale dans vos enjeux pour une feuille de route sans faille. Nous cartographions vos processus, identifions les fuites et priorisons les quick wins.",
  },
  {
    number: "02",
    title: "Technologie Juste",
    description: "Le meilleur de l'innovation (IA, Data) sans surdimensionnement. Nous selectionnons les outils adaptes a votre maturite et a votre budget.",
  },
  {
    number: "03",
    title: "Vision Strategique",
    description: "Des interfaces pensees pour engager vos utilisateurs et marquer les esprits. Design et experience au service de vos objectifs business.",
  },
  {
    number: "04",
    title: "Accompagnement Continu",
    description: "Une equipe reactive a vos cotes, de la conception au deploiement. Formation, support et optimisation continue pour garantir le ROI.",
  },
];

export default function Methodologie() {
  return (
    <section id="methodologie" className="py-32 bg-[#F3F1EC]">
      <div className="px-gutter max-w-[1440px] mx-auto">
        <div className="mb-20">
          <h2 className="font-sora text-4xl md:text-5xl uppercase mb-6 text-petrol">
            Notre Approche
          </h2>
          <div className="h-[2px] w-32 bg-gold" />
          <p className="font-manrope text-lg text-muted mt-6 max-w-2xl">
            Une methodologie eprouvee, de l'idee au resultat mesurable.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-gold/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-[#F3F1EC] border border-gold mb-8 relative z-10">
                  <span className="font-sora text-lg text-gold">{step.number}</span>
                </div>

                <div className="lg:hidden flex items-center justify-center w-12 h-12 bg-[#F3F1EC] border border-gold mb-6">
                  <span className="font-sora text-lg text-gold">{step.number}</span>
                </div>

                <h3 className="font-sora text-xl uppercase text-petrol mb-4">
                  {step.title}
                </h3>
                <p className="font-manrope text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}