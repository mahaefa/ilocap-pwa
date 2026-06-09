"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isDiagnostic = pathname === "/diagnostic";

  return (
    <nav className={`fixed top-0 w-full z-50 h-24 flex items-center transition-colors duration-300 ${
      isDiagnostic ? "bg-ink/95 backdrop-blur-sm border-b border-white/5" : "bg-[#073642] h-28"
    }`}>
      <div className="flex justify-between items-center w-full px-gutter max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/Logo_ilocap_dark-rm.png" 
            alt="ILOCAP" 
            width={426} 
            height={133} 
            className="h-36 w-auto object-contain"
            priority
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Methodologie", href: "/#methodologie" },
            { label: "Outils", href: "/diagnostic" },
            { label: "Ressources", href: "/#expertises" },
            { label: "Contact", href: "/#contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-manrope text-sm uppercase tracking-[0.2em] transition-colors ${
                isDiagnostic 
                  ? "text-ivory-muted hover:text-gold" 
                  : "text-white/90 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <Link
          href="/diagnostic"
          className="bg-[#3A4A5C] text-white px-8 py-3 font-manrope text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#2D3748] transition-standard"
        >
          Commencer
        </Link>
      </div>
    </nav>
  );
}