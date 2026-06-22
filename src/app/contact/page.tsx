"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#073642]">
      <Header />
      
      <section className="pt-32 pb-24 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#B89A5A]" />
                <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#B89A5A]">
                  Contact
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl uppercase leading-[1.1] mb-6">
                Discutons de votre <span className="text-[#B89A5A]">projet</span>
              </h1>
              <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60 leading-relaxed mb-10">
                Reponse garantie sous 24h. Un expert ILOCAP vous accompagne de la premiere prise de contact au deploiement.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] mb-2">Email</p>
                  <p className="font-[family-name:var(--font-manrope)] text-sm">management@ilocap.com</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] mb-2">Telephone / WhatsApp</p>
                  <p className="font-[family-name:var(--font-manrope)] text-sm">+261 34 38 07 857</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] mb-2">Site web</p>
                  <p className="font-[family-name:var(--font-manrope)] text-sm">www.ilocap.com</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] mb-2">Adresse</p>
                  <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60">Antananarivo, Madagascar</p>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E5E5E5] p-10 text-center rounded-sm"
                >
                  <div className="w-16 h-16 bg-[#B89A5A]/10 flex items-center justify-center mx-auto mb-6 rounded-full">
                    <svg className="w-8 h-8 text-[#B89A5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] text-xl uppercase mb-4 text-[#073642]">
                    Message envoye
                  </h3>
                  <p className="font-[family-name:var(--font-manrope)] text-sm text-[#073642]/60">
                    Nous vous repondrons sous 24h.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] p-8 rounded-sm space-y-4">
                  <input
                    type="text"
                    placeholder="NOM"
                    required
                    value={form.nom}
                    onChange={(e) => setForm({...form, nom: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL"
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
                  />
                  <input
                    type="text"
                    placeholder="SUJET"
                    value={form.sujet}
                    onChange={(e) => setForm({...form, sujet: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 rounded-sm"
                  />
                  <textarea
                    placeholder="VOTRE MESSAGE"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-[#F5F3EE] border border-[#E5E5E5] p-4 text-[#073642] font-[family-name:var(--font-manrope)] text-sm focus:border-[#B89A5A] outline-none placeholder:text-[#073642]/30 resize-none rounded-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#B89A5A] text-[#0B0C0A] py-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#073642] hover:text-[#F3F1EC] transition-all rounded-sm"
                  >
                    Envoyer →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}