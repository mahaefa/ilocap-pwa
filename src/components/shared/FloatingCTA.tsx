"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/diagnostic"
        className="flex flex-col items-center justify-center bg-[#B89A5A] text-[#073642] px-5 py-4 rounded-sm font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-[#B89A5A]/30 hover:bg-[#F3F1EC] hover:scale-105 transition-all duration-300"
      >
        {/* Icône graphique : histogramme */}
        <svg className="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="10" width="3" height="8" rx="0.5" fill="currentColor" stroke="none"/>
          <rect x="8" y="6" width="3" height="12" rx="0.5" fill="currentColor" stroke="none"/>
          <rect x="14" y="2" width="3" height="16" rx="0.5" fill="currentColor" stroke="none"/>
        </svg>
        <span className="leading-tight">Faire mon</span>
        <span className="leading-tight">diagnostic</span>
      </Link>
    </motion.div>
  );
}