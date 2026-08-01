import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Claves para las especialidades del desplegable
  const dropdownItems = [
    { path: "/especialidades/derecho-penal", key: "specialties.esp1_title" },
    { path: "/especialidades/derecho-civil", key: "specialties.esp2_title" },
    { path: "/especialidades/derecho-de-familia", key: "specialties.esp3_title" },
    { path: "/especialidades/derecho-laboral", key: "specialties.esp4_title" },
    { path: "/especialidades/herencias-y-sucesiones", key: "specialties.esp5_title" },
    { path: "/especialidades/extranjeria-e-inmigracion", key: "specialties.esp6_title" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#020d1e]/95 backdrop-blur-md border-b border-brand-darkLight/40 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGOTIPO CON FORMATO REDONDO */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <img 
              src="/logo.png" 
              alt="Beltrán & Uclés Escudo" 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-brand-gold group-hover:text-brand-goldLight transition-colors">
              BELTRÁN & UCLÉS
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-white/60 font-sans font-medium uppercase mt-0.5">
              ABOGADOS • AVOCATS
            </span>
          </div>
        </Link>

        {/* MENÚ DE NAVEGACIÓN */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <Link to="/firma" className="text-white/80 hover:text-brand-gold transition-colors">
            {t("nav.firma")}
          </Link>
          
          {/* DESPLEGABLE DE ESPECIALIDADES */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link 
              to="/especialidades" 
              className="text-white/80 hover:text-brand-gold transition-colors inline-flex items-center space-x-1 py-2"
            >
              <span>{t("nav.especialidades")}</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {dropdownOpen && (
              <div className="absolute left-0 mt-0 w-64 bg-[#051329] border border-brand-darkLight rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                {dropdownItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="block px-5 py-3 text-xs text-white/80 hover:text-brand-gold hover:bg-brand-darkLight/30 transition-all font-sans"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className="text-white/80 hover:text-brand-gold transition-colors">
            {t("nav.blog")}
          </Link>

          <Link to="/contacto" className="text-white/80 hover:text-brand-gold transition-colors">
            {t("nav.contacto")}
          </Link>
        </nav>

        {/* SELECTOR DE IDIOMA */}
        <div className="flex items-center space-x-1.5 bg-brand-darkLight/50 p-1 rounded-lg border border-brand-darkLight">
          <button
            onClick={() => setLang("es")}
            className={`px-2.5 py-1 text-xs rounded-md font-bold tracking-wider transition-all duration-300 ${
              lang === "es"
                ? "bg-brand-gold text-brand-dark shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang("fr")}
            className={`px-2.5 py-1 text-xs rounded-md font-bold tracking-wider transition-all duration-300 ${
              lang === "fr"
                ? "bg-brand-gold text-brand-dark shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            FR
          </button>
        </div>

      </div>
    </header>
  );
}