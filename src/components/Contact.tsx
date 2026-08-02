import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-darkLight/30">
      
      {/* Cabecera de la Sección */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
          {t("contact.badge")}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {t("contact.title")}
        </h2>
        <p className="text-white/60 font-light text-base sm:text-lg">
          {t("contact.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* COLUMNA IZQUIERDA: Información de contacto */}
        <div className="lg:col-span-5 space-y-8 bg-brand-darkLight/40 border border-brand-darkLight/80 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-semibold text-white">
                {t("contact.info_title")}
              </h3>
              <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                {t("contact.info_desc")}
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Teléfono */}
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-brand-dark/50 border border-brand-darkLight hover:border-brand-gold/30 transition-all">
                <div className="flex-shrink-0 p-3 bg-brand-darkLight rounded-lg text-brand-gold border border-brand-gold/10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Teléfono</p>
                  <a href="tel:+34640310771" className="text-white hover:text-brand-gold transition-colors font-semibold text-base">
                    +34 640 31 07 71
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-brand-dark/50 border border-brand-darkLight hover:border-brand-gold/30 transition-all">
                <div className="flex-shrink-0 p-3 bg-brand-darkLight rounded-lg text-brand-gold border border-brand-gold/10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Email</p>
                  <a href="mailto:beltranyucles@tuabogadoalmeria.com" className="text-white hover:text-brand-gold transition-colors font-semibold text-sm sm:text-base break-all">
                    beltranyucles@tuabogadoalmeria.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* OFICINAS / SEDES */}
          <div className="space-y-4 pt-6 border-t border-brand-darkLight">
            <p className="text-xs text-brand-gold uppercase tracking-widest font-bold font-sans">Nuestras Oficinas</p>
            
            <div className="space-y-3">
              {/* Almería */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-white text-sm font-semibold">{t("contact.office_almeria")}</h4>
                  <p className="text-white/50 text-xs font-light">Paseo de Almería, Almería</p>
                </div>
              </div>

              {/* Roquetas */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-white text-sm font-semibold">{t("contact.office_roquetas")}</h4>
                  <p className="text-white/50 text-xs font-light">Av. de Roquetas, Roquetas de Mar</p>
                </div>
              </div>

              {/* El Ejido */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-white text-sm font-semibold">{t("contact.office_ejido")}</h4>
                  <p className="text-white/50 text-xs font-light">Bulevar de El Ejido, El Ejido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de contacto */}
        <div className="lg:col-span-7 bg-brand-darkLight/40 border border-brand-darkLight/80 p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
          <form 
            name="contacto" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Campo oculto obligatorio para Netlify */}
            <input type="hidden" name="form-name" value="contacto" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-xs text-brand-gold/90 font-semibold tracking-wider block">{t("contact.form_name")}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-2">
                <label className="text-xs text-brand-gold/90 font-semibold tracking-wider block">{t("contact.form_email")}</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-xs text-brand-gold/90 font-semibold tracking-wider block">{t("contact.form_phone")}</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all"
                  placeholder="600 000 000"
                />
              </div>

              {/* Área de Interés */}
              <div className="space-y-2">
                <label className="text-xs text-brand-gold/90 font-semibold tracking-wider block">{t("contact.form_specialty")}</label>
                <div className="relative">
                  <select 
                    name="specialty"
                    required
                    className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3.5 text-sm text-white/90 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-brand-dark text-white/30">{t("contact.form_specialty_placeholder")}</option>
                    <option value="penal" className="bg-brand-dark text-white">{t("specialties.esp1_title")}</option>
                    <option value="civil" className="bg-brand-dark text-white">{t("specialties.esp2_title")}</option>
                    <option value="familia" className="bg-brand-dark text-white">{t("specialties.esp3_title")}</option>
                    <option value="laboral" className="bg-brand-dark text-white">{t("specialties.esp4_title")}</option>
                    <option value="herencias" className="bg-brand-dark text-white">{t("specialties.esp5_title")}</option>
                    <option value="extranjeria" className="bg-brand-dark text-white">{t("specialties.esp6_title")}</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-brand-gold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <label className="text-xs text-brand-gold/90 font-semibold tracking-wider block">{t("contact.form_message")}</label>
              <textarea 
                name="message"
                rows={5}
                required
                className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all resize-none"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            {/* Botón de Enviar */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-goldLight disabled:bg-brand-gold/50 text-brand-dark font-sans font-bold text-sm py-4 rounded-lg transition-all duration-300 shadow-md transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t("contact.form_sending")}</span>
                  </>
                ) : (
                  <span>{t("contact.form_submit")}</span>
                )}
              </button>
            </div>

            {/* Alerta de éxito */}
            {submitted && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm text-center font-medium animate-fadeIn">
                {t("contact.form_success")}
              </div>
            )}

          </form>
        </div>

      </div>

    </section>
  );
}