// src/components/landing/HeroAnimation.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none" opacity="0.15">
          <path
            d="M100 20 L140 40 L160 80 L160 120 L140 160 L100 180 L60 160 L40 120 L40 80 L60 40 Z"
            stroke="#B89A5A"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M100 40 L125 55 L140 80 L140 120 L125 145 L100 160 L75 145 L60 120 L60 80 L75 55 Z"
            stroke="#073642"
            strokeWidth="0.3"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}