import React from "react";
import { useLang } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#020a17] border-t border-brand-darkLight/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LOGO */}
        <div className="flex flex-col text-center md:text-left">
          <span className="font-serif text-lg font-bold tracking-widest text-brand-gold">
            BELTRÁN & UCLÉS
          </span>
          <span className="text-[8px] tracking-[0.25em] text-white/40 font-sans font-medium uppercase mt-0.5">
            ABOGADOS • AVOCATS
          </span>
        </div>

        {/* ENLACES RÁPIDOS */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium tracking-wider text-white/60">
          <Link to="/firma" className="hover:text-brand-gold transition-colors">{t("nav.firma")}</Link>
          <Link to="/especialidades" className="hover:text-brand-gold transition-colors">{t("nav.especialidades")}</Link>
          <Link to="/blog" className="hover:text-brand-gold transition-colors">{t("nav.blog")}</Link>
          <Link to="/contacto" className="hover:text-brand-gold transition-colors">{t("nav.contacto")}</Link>
        </nav>

        {/* POLÍTICAS LEGALES */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] text-white/40 font-sans">
          <span>&copy; {new Date().getFullYear()} Beltrán & Uclés. {t("footer.rights")}</span>
          <span className="hidden sm:inline">|</span>
          <Link to="/politica-de-cookies" className="hover:text-brand-gold transition-colors">
            Aviso Legal y Cookies
          </Link>
        </div>

      </div>
    </footer>
  );
}