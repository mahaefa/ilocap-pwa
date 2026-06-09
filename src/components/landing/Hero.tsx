"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-36 pb-20 overflow-hidden">
      {/* === FOND SOLIDE IVOIRE — masque la transparence === */}
      <div className="absolute inset-0 bg-[#F5F3EE] pointer-events-none" />
      
      {/* === FOND_OR.PNG — fond avec fusion douce === */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/fond_or.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Overlay léger pour harmoniser */}
      <div className="absolute inset-0 bg-[#F5F3EE]/20 pointer-events-none" />
      
      {/* Dégradé gauche pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EE]/90 via-[#F5F3EE]/50 to-transparent pointer-events-none" />
      
      {/* Dégradé haut pour adoucir */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3EE]/70 via-transparent to-transparent pointer-events-none" />
      
      <div className="px-gutter max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start gap-10">
            <div className="inline-block border-l-4 border-[#B89A5A] pl-4">
              <span className="font-manrope text-[15px] uppercase text-[#073642] tracking-[0.2em] font-bold">
                Conseil en Strategie et Transformation
              </span>
            </div>
            
            <h1 className="font-sora text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.05] text-[#073642]">
              Le sens au centre de votre <span className="text-[#B89A5A]">transformation</span>
            </h1>
            
            <p className="font-manrope text-2xl md:text-3xl max-w-2xl text-black font-light">
              Construire ce qui dure. Transformer ce qui compte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto">
              <Link 
                href="/diagnostic"
                className="bg-[#073642] text-white px-14 py-7 font-manrope text-sm uppercase font-bold tracking-[0.2em] hover:bg-[#B89A5A] transition-standard flex items-center justify-center gap-3"
              >
                Faire mon diagnostic
                <span>→</span>
              </Link>
              <Link 
                href="/diagnostic"
                className="border border-[#B89A5A] text-[#073642] bg-white/40 backdrop-blur-sm px-14 py-7 font-manrope text-sm uppercase font-bold tracking-[0.2em] hover:bg-[#B89A5A] hover:text-white transition-standard flex items-center justify-center gap-3"
              >
                Simulateur ROI
                <span>↗</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end items-center relative">
            <div className="relative w-full max-w-[400px] flex items-center justify-center">
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