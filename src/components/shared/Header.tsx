"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isDiagnostic = pathname === "/diagnostic";
  const isMethodologie = pathname === "/methodologie";
  const isServices = pathname === "/services";
  const isContact = pathname === "/contact";

  // Mode clair pour les nouvelles pages
  const isLightMode = isDiagnostic || isMethodologie || isServices || isContact;

  return (
    <nav className={`fixed top-0 w-full z-50 h-24 flex items-center transition-colors duration-300 ${
      isLightMode
        ? "bg-[#F3F1EC]/95 backdrop-blur-sm border-b border-[#E5E5E5]"
        : "bg-[#073642] h-28"
    }`}>
      <div className="flex justify-between items-center w-full px-gutter max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={isLightMode ? "/Logo_ilocap_dark-rm.png" : "/Logo_ilocap_dark-rm.png"}
            alt="ILOCAP"
            width={426}
            height={133}
            className="h-36 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Methodologie", href: "/methodologie" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-manrope text-sm uppercase tracking-[0.2em] transition-colors ${
                isLightMode
                  ? "text-[#073642]/80 hover:text-[#B89A5A]"
                  : "text-white/90 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Diagnostic - MODIFIÉ */}
        <Link
          href="/diagnostic"
          className={`px-6 py-3 font-manrope text-[10px] uppercase tracking-[0.2em] font-bold transition-standard ${
            isLightMode
              ? "border border-[#B89A5A] text-[#073642] hover:bg-[#B89A5A] hover:text-[#0B0C0A]"
              : "bg-[#B89A5A] text-[#0B0C0A] hover:bg-[#F3F1EC]"
          }`}
        >
          Faire mon diagnostic
        </Link>
      </div>
    </nav>
  );
}