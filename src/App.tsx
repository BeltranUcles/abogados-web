import CookieConsent from "react-cookie-consent";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // <--- Importación añadida aquí
import Header from "./components/Header";
import About from "./components/About";
import Specialties from "./components/Specialties";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import FirmaPage from "./pages/FirmaPage";
import SpecialtyDetailPage from "./pages/SpecialtyDetailPage";
import { useLang } from "./context/LanguageContext";
import BlogPage from "./pages/BlogPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
import AdminPage from "./pages/AdminPage";
import CookiesPage from "./pages/CookiesPage";

// Componente para forzar el scroll arriba del todo en cambios de ruta
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Vista Home
function HomePage() {
  const { t, lang } = useLang();

  // Metadatos SEO específicos para la página de inicio según el idioma activo
  const seoMeta = {
    es: {
      title: "Beltrán & Uclés Abogados | Despacho Jurídico Especializado",
      description: "Asesoramiento legal integral y defensa jurídica personalizada. Nuestro equipo de abogados expertos analiza su caso con rigurosidad y total confidencialidad."
    },
    fr: {
      title: "Beltrán & Uclés Abogados | Cabinet d'Avocats Spécialisé",
      description: "Conseil juridique global et défense personnalisée. Notre équipe d'avocats experts analyse votre affaire avec rigueur et totale confidentialité."
    }
  };

  const currentMeta = seoMeta[lang as "es" | "fr"] || seoMeta.es;

  return (
    <div className="animate-fadeIn">
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
      </Helmet>

      {/* Hero Section con Vídeo de Fondo */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center text-center px-4 py-24 sm:py-32 overflow-hidden bg-brand-dark">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-75 contrast-110 z-0"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-full backdrop-blur-md">
            {t("hero.badge")}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            {t("hero.title1")} <span className="text-brand-gold block mt-2">{t("hero.title2")}</span>
          </h1>
          <p className="text-white/80 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("hero.desc")}
          </p>
          <div className="pt-4">
            <Link 
              to="/contacto"
              className="inline-block px-6 py-3.5 bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-sans font-semibold text-sm rounded-lg transition-all duration-300 shadow-xl transform hover:-translate-y-0.5"
            >
              {t("hero.btn")}
            </Link>
          </div>
        </div>
      </section>

      <About />
      <Specialties />
      <Contact />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      {/* Etiqueta global de Google Search Console para verificación */}
      <Helmet>
        <meta name="google-site-verification" content="09ZaubC-rTjctREyY0oaJApoG8DLXxcPHLT3pNBxBWM" />
      </Helmet>

      <ScrollToTop />
      <div className="min-h-screen bg-brand-dark flex flex-col text-white font-sans selection:bg-brand-gold selection:text-brand-dark scroll-smooth relative">
        
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/firma" element={<FirmaPage />} />
            <Route path="/especialidades" element={<Specialties />} />
            <Route path="/especialidades/:slug" element={<SpecialtyDetailPage />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />        
            <Route path="/politica-de-cookies" element={<CookiesPage />} />
          </Routes>
        </main>

        <WhatsAppButton />
        <Footer />

        {/* Banner de Cookies RGPD con enlace a Política */}
        <CookieConsent
          location="bottom"
          buttonText="Aceptar todas"
          declineButtonText="Rechazar"
          enableDeclineButton
          cookieName="beltran_ucles_cookies_consent"
          style={{
            background: "#111827",
            color: "#e5e7eb",
            fontSize: "14px",
            borderTop: "1px solid rgba(212, 175, 55, 0.3)",
            alignItems: "center",
            padding: "10px 20px",
            zIndex: 9999,
          }}
          buttonStyle={{
            background: "#C5A059",
            color: "#0f172a",
            fontSize: "13px",
            fontWeight: "bold",
            borderRadius: "6px",
            padding: "8px 18px",
          }}
          declineButtonStyle={{
            background: "#374151",
            color: "#9ca3af",
            fontSize: "13px",
            borderRadius: "6px",
            padding: "8px 18px",
          }}
          expires={150}
        >
          Este sitio web utiliza cookies técnicas para garantizar su funcionamiento. Puede consultar nuestra{" "}
          <Link to="/politica-de-cookies" style={{ color: "#C5A059", textDecoration: "underline" }}>
            Política de Cookies y Aviso Legal
          </Link>.
        </CookieConsent>

      </div>
    </Router>
  );
}