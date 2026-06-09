"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ivory border-t border-[#073642]/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20 py-24 px-gutter max-w-[1440px] mx-auto">
        <div className="md:col-span-4 flex flex-col gap-8">
          <Image 
            src="/Logo_ilocap_coloured-rm.png" 
            alt="ILOCAP" 
            width={160} 
            height={60} 
            className="object-contain"
          />
          <p className="font-manrope text-base text-black max-w-xs font-light leading-relaxed">
            Architectes de la transformation digitale responsable. Nous creons des structures perennes au service du sens.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 flex items-center justify-center border border-[#073642]/15 hover:border-gold text-[#073642] hover:text-gold transition-standard">
              <span className="text-base">in</span>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center border border-[#073642]/15 hover:border-gold text-[#073642] hover:text-gold transition-standard">
              <span className="text-base">X</span>
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-manrope text-xs uppercase text-gold font-bold mb-8 tracking-widest">Expertise</h4>
          <ul className="flex flex-col gap-4">
            {["Audit", "Strategie", "Transition"].map((item) => (
              <li key={item}>
                <a href="#" className="font-manrope text-xs uppercase text-black hover:text-[#073642] transition-standard tracking-wider">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-manrope text-xs uppercase text-gold font-bold mb-8 tracking-widest">Projets</h4>
          <ul className="flex flex-col gap-4">
            {["Industrie", "Public", "E-sante"].map((item) => (
              <li key={item}>
                <a href="#" className="font-manrope text-xs uppercase text-black hover:text-[#073642] transition-standard tracking-wider">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-4">
          <h4 className="font-manrope text-xs uppercase text-gold font-bold mb-8 tracking-widest">Newsletter</h4>
          <p className="font-manrope text-xs text-black uppercase mb-6 tracking-wide">Analyses trimestrielles exclusives</p>
          <div className="flex border border-[#073642]/15 bg-white">
            <input 
              type="email" 
              placeholder="VOTRE EMAIL" 
              className="bg-transparent border-none focus:ring-0 text-[#073642] font-manrope text-sm p-5 w-full placeholder:text-black/50"
            />
            <button className="bg-[#073642] text-white px-8 transition-standard hover:bg-gold">
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#073642]/10 py-10 px-gutter max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-manrope text-xs uppercase text-black tracking-widest">
          © 2024 ILOCAP. TOUS DROITS RESERVES.
        </p>
        <div className="flex gap-12">
          <a href="#" className="font-manrope text-xs uppercase text-black hover:text-[#073642] transition-standard tracking-widest">
            Mentions Legales
          </a>
          <a href="#" className="font-manrope text-xs uppercase text-black hover:text-[#073642] transition-standard tracking-widest">
            Confidentialite
          </a>
        </div>
      </div>
    </footer>
  );
}