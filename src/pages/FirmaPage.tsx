import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../context/LanguageContext";
import About from "../components/About";

export default function FirmaPage() {
  const { lang } = useLang();

  // Metadatos SEO específicos para la página de la Firma
  const seoMeta = {
    es: {
      title: "Nuestra Firma | Beltrán & Uclés Abogados",
      description: "Conozca la trayectoria, valores y el equipo de profesionales que forman Beltrán & Uclés Abogados. Compromiso, rigor y defensa jurídica de confianza."
    },
    fr: {
      title: "Notre Cabinet | Beltrán & Uclés Abogados",
      description: "Découvrez le parcours, les valeurs et l'équipe de professionnels de Beltrán & Uclés Abogados. Engagement, rigueur et défense juridique de confiance."
    }
  };

  const currentMeta = seoMeta[lang as "es" | "fr"] || seoMeta.es;

  return (
    <div className="pt-6 animate-fadeIn">
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
      </Helmet>
      
      <About language={lang} />
    </div>
  );
}