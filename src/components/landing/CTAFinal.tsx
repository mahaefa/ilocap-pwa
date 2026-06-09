"use client";

import Link from "next/link";

export default function CTAFinal() {
  return (
    <section id="contact" className="bg-petrol py-32 border-y border-white/5">
      <div className="px-gutter max-w-[1440px] mx-auto text-center">
        <h2 className="font-sora text-4xl md:text-5xl uppercase mb-12 text-white max-w-4xl mx-auto">
          Pret a donner du sens a votre technologie ?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Link 
            href="/diagnostic"
            className="bg-gold text-white px-16 py-6 font-manrope text-[10px] uppercase font-extrabold tracking-[0.3em] hover:bg-white hover:text-petrol transition-standard min-w-[280px]"
          >
            Prendre rendez-vous
          </Link>
          <button className="border border-gold text-gold px-16 py-6 font-manrope text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-standard min-w-[280px]">
            Nos etudes de cas
          </button>
        </div>
      </div>
    </section>
  );
}