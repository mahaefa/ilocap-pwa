const piliers = [
  {
    icon: "◆",
    title: "SENS",
    description: "Redefinir l'intention derriere chaque action technologique pour aligner vision metier et execution technique.",
  },
  {
    icon: "◉",
    title: "DURABILITE",
    description: "Concevoir des architectures resilientes et des processus perennes qui resistent aux cycles d'obsolescence.",
  },
  {
    icon: "◊",
    title: "TRANSITION",
    description: "Accompagner le changement humain et technologique avec une rigueur methodologique sans compromis.",
  },
];

export default function Piliers() {
  return (
    <section className="py-32 bg-[#F3F1EC] relative">
      <div className="px-gutter max-w-[1440px] mx-auto">
        <div className="mb-20">
          <h2 className="font-sora text-4xl md:text-5xl uppercase mb-6 text-petrol">
            Nos Piliers Structurants
          </h2>
          <div className="h-[2px] w-32 bg-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-petrol/15">
          {piliers.map((pilier, index) => (
            <div
              key={pilier.title}
              className={`p-16 hover:bg-[#E8E4DC] transition-standard group ${
                index < 2 ? "border-b md:border-b-0 md:border-r border-petrol/15" : ""
              }`}
            >
              <div className="text-gold mb-10 text-5xl font-sora">
                {pilier.icon}
              </div>
              <h3 className="font-sora text-2xl uppercase mb-6 text-petrol">
                {pilier.title}
              </h3>
              <p className="font-manrope text-base text-muted leading-relaxed font-light mb-10">
                {pilier.description}
              </p>
              <div className="text-gold/20 group-hover:text-gold transition-standard">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 100 100">
                  <path d="M30 10H70L90 30V70L70 90H30L10 70V30L30 10Z" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}