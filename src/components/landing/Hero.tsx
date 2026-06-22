"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F3F1EC]">
      
      {/* === FORME GÉOMÉTRIQUE FANTÔME === */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03]">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
          <path d="M100 20L160 40L180 100L160 160L100 180L40 160L20 100L40 40Z" stroke="#073642" strokeWidth="0.5"/>
          <path d="M100 40L140 55L155 100L140 145L100 160L60 145L45 100L60 55Z" stroke="#073642" strokeWidth="0.3"/>
        </svg>
      </div>

      {/* === SÉPARATION SUBTILE HEADER/HERO === */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#073642]/10 to-transparent" />
      
      <div className="px-gutter max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Colonne gauche */}
          <div className="flex flex-col items-start gap-6">
            
            {/* Label avec ligne de connexion */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#B89A5A]" />
              <span className="font-manrope text-[13px] uppercase text-[#073642] tracking-[0.2em] font-bold">
                CONSEIL EN STRATÉGIE & DIGITAL
              </span>
            </div>
            
            {/* Titre avec accent visuel */}
            <div className="relative">
              <h1 className="font-sora text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.05] text-[#073642]">
                Le sens au centre de votre <span className="text-[#B89A5A]">transformation</span>
              </h1>
              {/* Ligne décorative sous le titre */}
              <div className="mt-4 w-24 h-[2px] bg-[#B89A5A]" />
            </div>
            
            <p className="font-manrope text-base md:text-lg max-w-xl text-black/70 font-light">
              Construire ce qui dure. Transformer ce qui compte.
            </p>
            
            {/* CTAs avec ombre */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Link 
                href="https://calendly.com/candriatiana/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#073642] text-white px-6 py-3 font-manrope text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#B89A5A] hover:shadow-lg hover:shadow-[#B89A5A]/20 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
              >
                Prendre RDV (30 min)
              </Link>
              
              <Link 
                href="#expertises"
                className="border border-[#B89A5A] text-[#073642] bg-white/40 backdrop-blur-sm px-6 py-3 font-manrope text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#B89A5A] hover:text-white hover:shadow-lg hover:shadow-[#B89A5A]/20 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
              >
                Explorer nos solutions
              </Link>
            </div>
          </div>
          
          {/* Colonne droite : logo avec halo */}
          <div className="hidden lg:flex justify-center items-center relative pl-8">
            <div className="relative w-full max-w-[400px] flex items-center justify-center">
              {/* Halo subtil derrière le logo */}
              <div className="absolute inset-0 bg-[#B89A5A]/5 rounded-full blur-3xl scale-150" />
              <img 
                src="/Logo_ilocap_icon_rm.png" 
                alt="ILOCAP Icon" 
                className="w-full h-auto max-w-[400px] object-contain relative z-10"
                style={{ 
                  animation: "spin-slow 30s linear infinite",
                  transformOrigin: "center center"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}