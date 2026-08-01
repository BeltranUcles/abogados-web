import React from "react";
import { useLang } from "../context/LanguageContext";
import About from "../components/About";

export default function FirmaPage() {
  const { t } = useLang();

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Introducción General (La Firma) */}
      <About />

      {/* Sección Perfil de la Abogada Directora */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-darkLight/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Retrato Profesional */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Marco Dorado Decorativo de Fondo */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-brand-gold/40 via-transparent to-brand-gold/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Contenedor de la Imagen */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-brand-gold/30 bg-brand-darkLight/40 shadow-2xl">
                {/* Reemplazaremos este div con la etiqueta <img src="/path-to-photo.jpg" /> en cuanto tengas la foto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-brand-darkLight/50">
                  <svg className="w-16 h-16 text-brand-gold/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm text-brand-gold font-sans uppercase tracking-widest font-semibold">Fotografía Profesional</p>
                  <p className="text-xs text-white/40 mt-2">María Beltrán Uclés</p>
                </div>
                {/* Cuando tengas la foto de la abogada, simplemente quita el div de arriba y descomenta esto:
                <img 
                  src="/abogada.jpg" 
                  alt="María Beltrán Uclés - Abogada" 
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 hover:scale-105 transition-transform duration-700"
                /> 
                */}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Trayectoria Profesional */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
                {t("about.lawyer_title")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("about.lawyer_name")}
              </h2>
              <p className="text-brand-gold font-sans text-sm sm:text-base font-semibold">
                {t("about.lawyer_role")}
              </p>
            </div>

            <div className="space-y-4 text-white/70 font-light text-base leading-relaxed">
              <p>{t("about.lawyer_bio1")}</p>
              <p>{t("about.lawyer_bio2")}</p>
            </div>

            {/* Listado de Formación Destacada */}
            <div className="space-y-4 pt-4 border-t border-brand-darkLight/40">
              <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
                {t("about.education_title")}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/60">
                <li className="flex items-start space-x-2.5">
                  <span className="text-brand-gold mt-1">✓</span>
                  <span>{t("about.edu_1")}</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-brand-gold mt-1">✓</span>
                  <span>{t("about.edu_2")}</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-brand-gold mt-1">✓</span>
                  <span>{t("about.edu_3")}</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-brand-gold mt-1">✓</span>
                  <span>{t("about.edu_4")}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}