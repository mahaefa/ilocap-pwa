const references = [
  { name: "EspaMada", sector: "E-commerce" },
  { name: "GreenVillage", sector: "Distribution" },
  { name: "Voxima", sector: "Agency" },
  { name: "Yunka Retreat", sector: "Tourisme" },
  { name: "Primimport", sector: "Import" },
  { name: "TrackFuel360", sector: "Logistics" },
  { name: "Karibo Services", sector: "Services" },
  { name: "CoursiNet", sector: "EdTech" },
  { name: "Ymagoo Project", sector: "Tech" },
  { name: "AndCorp", sector: "Corporate" },
  { name: "CIRT", sector: "Security" },
];

export default function References() {
  return (
    <section className="py-32 bg-ivory">
      <div className="px-gutter max-w-[1440px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-sora text-4xl md:text-5xl uppercase mb-6 text-petrol">
            Ils nous font confiance
          </h2>
          <div className="h-[2px] w-32 bg-gold mx-auto" />
          <p className="font-manrope text-lg text-muted mt-6 max-w-2xl mx-auto">
            Des PME aux ONG, des cabinets de conseil aux acteurs du tourisme, nous adaptons notre expertise a chaque secteur.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-petrol/10">
          {references.map((ref) => (
            <div 
              key={ref.name}
              className="bg-ivory p-8 flex flex-col items-center justify-center gap-4 hover:bg-white transition-standard group cursor-pointer"
            >
              <div className="w-20 h-20 bg-petrol/5 flex items-center justify-center group-hover:bg-gold/10 transition-standard">
                <span className="font-sora text-2xl text-petrol/30 group-hover:text-gold transition-standard">
                  {ref.name[0]}
                </span>
              </div>
              <div className="text-center">
                <p className="font-sora text-sm uppercase text-petrol group-hover:text-gold transition-standard">
                  {ref.name}
                </p>
                <p className="font-manrope text-[10px] uppercase text-muted tracking-wider mt-1">
                  {ref.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}