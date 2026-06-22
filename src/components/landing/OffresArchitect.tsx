"use client";

import { useState } from "react";

type Profil = "artisan" | "tpme" | "mature";

export default function OffresArchitect() {
  const [actif, setActif] = useState<Profil | null>(null);

  return (
    <section id="expertises" className="bg-[#0B0C0A] py-32 px-6 lg:px-16">
      {/* ... reste du composant ... */}
    </section>
  );
}
