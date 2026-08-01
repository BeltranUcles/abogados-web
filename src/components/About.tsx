import React from "react";
import { useLang } from "../context/LanguageContext";

export default function About() {
  const { t } = useLang();

  return (
    <section id="firma" className="py-20 bg-brand-darkLight/40 border-t border-b border-brand-darkLight/30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* TEXTO: Izquierda (Toma 7 de 12 columnas en pantallas grandes) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
            {t("about.badge")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            {t("about.title")}
          </h2>
          <div className="space-y-4 text-white/70 font-light text-base sm:text-lg leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </div>

        {/* TARJETAS DE ESTADÍSTICAS: Derecha (Toma 5 de 12 columnas) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
          
          {/* Tarjeta 1 */}
          <div className="bg-brand-dark/60 border border-brand-gold/15 rounded-xl p-6 flex items-center space-x-4 shadow-sm hover:border-brand-gold/30 transition-all duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">
              {t("about.stat1_num")}
            </span>
            <div className="h-8 w-px bg-brand-gold/20"></div>
            <span className="text-white/80 font-sans text-sm font-medium tracking-wide">
              {t("about.stat1_txt")}
            </span>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-brand-dark/60 border border-brand-gold/15 rounded-xl p-6 flex items-center space-x-4 shadow-sm hover:border-brand-gold/30 transition-all duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">
              {t("about.stat2_num")}
            </span>
            <div className="h-8 w-px bg-brand-gold/20"></div>
            <span className="text-white/80 font-sans text-sm font-medium tracking-wide">
              {t("about.stat2_txt")}
            </span>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-brand-dark/60 border border-brand-gold/15 rounded-xl p-6 flex items-center space-x-4 shadow-sm hover:border-brand-gold/30 transition-all duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">
              {t("about.stat3_num")}
            </span>
            <div className="h-8 w-px bg-brand-gold/20"></div>
            <span className="text-white/80 font-sans text-sm font-medium tracking-wide">
              {t("about.stat3_txt")}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}