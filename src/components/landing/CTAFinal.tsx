"use client";

import Link from "next/link";

export default function CTAFinal() {
  return (
    <section id="contact" className="bg-petrol py-32 border-y border-white/5">
      <div className="px-gutter max-w-[1440px] mx-auto text-center">
        <h2 className="font-sora text-3xl md:text-4xl uppercase mb-10 text-white max-w-4xl mx-auto">
          Pret a donner du sens a votre technologie ?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/diagnostic"
            className="bg-gold text-white px-8 py-4 font-manrope text-[10px] uppercase font-extrabold tracking-[0.3em] hover:bg-white hover:text-petrol transition-standard w-full sm:w-auto sm:min-w-[200px] text-center"
          >
            Prendre rendez-vous
          </Link>
          <button className="border border-gold text-gold px-8 py-4 font-manrope text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-standard w-full sm:w-auto sm:min-w-[200px]">
            Nos etudes de cas
          </button>
        </div>
      </div>
    </section>
  );
}