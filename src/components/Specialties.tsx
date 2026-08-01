import React from "react";
import { useLang } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Specialties() {
  const { t } = useLang();

  // Mapeo de slugs para cada especialidad
  const specialtiesList = [
    { slug: "derecho-penal", titleKey: "specialties.esp1_title", descKey: "specialties.esp1_desc", icon: "⚖️" },
    { slug: "derecho-civil", titleKey: "specialties.esp2_title", descKey: "specialties.esp2_desc", icon: "📄" },
    { slug: "derecho-de-familia", titleKey: "specialties.esp3_title", descKey: "specialties.esp3_desc", icon: "🏠" },
    { slug: "derecho-laboral", titleKey: "specialties.esp4_title", descKey: "specialties.esp4_desc", icon: "💼" },
    { slug: "herencias-y-sucesiones", titleKey: "specialties.esp5_title", descKey: "specialties.esp5_desc", icon: "📜" },
    { slug: "extranjeria-e-inmigracion", titleKey: "specialties.esp6_title", descKey: "specialties.esp6_desc", icon: "🌍" },
  ];

  return (
    <section id="especialidades" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-darkLight/30">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
          {t("specialties.badge")}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {t("specialties.title")}
        </h2>
        <p className="text-white/60 font-light text-base sm:text-lg">
          {t("specialties.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialtiesList.map((esp, idx) => (
          <Link
            key={idx}
            to={`/especialidades/${esp.slug}`}
            className="group block p-8 rounded-2xl bg-brand-darkLight/20 border border-brand-darkLight/60 hover:border-brand-gold/40 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
              {esp.icon}
            </div>
            <h3 className="font-serif text-xl font-semibold text-white group-hover:text-brand-gold transition-colors mb-2">
              {t(esp.titleKey)}
            </h3>
            <p className="text-white/50 font-light text-sm leading-relaxed">
              {t(esp.descKey)}
            </p>
            <span className="inline-flex items-center text-xs text-brand-gold font-semibold uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-1">
              <span>{t("nav.especialidades") || "Ver más"}</span>
              <span>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}