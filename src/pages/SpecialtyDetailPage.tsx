import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

// Datos extendidos de las especialidades para mostrar información detallada
const specialtyDetails = {
  es: {
    "derecho-penal": {
      title: "Derecho Penal",
      subtitle: "Defensa penal técnica, rigurosa y de máxima confianza",
      badge: "Especialidad Principal",
      intro: "El área penal requiere de una intervención inmediata y de una estrategia procesal sumamente minuciosa. Nos encargamos de proteger sus derechos y su libertad desde el primer momento, asistiéndole de manera integral en cualquier tipo de procedimiento.",
      details: [
        "Asistencia al detenido 24/7 en dependencias policiales y juzgados de guardia.",
        "Defensa y acusación particular en juicios por delitos graves, menos graves y leves.",
        "Procedimientos de menores y delitos contra la seguridad vial (alcoholemias, conducción sin carné).",
        "Derecho Penitenciario: solicitud de tercer grado, permisos de salida y recursos de alzada."
      ],
    },
    "derecho-civil": {
      title: "Derecho Civil",
      subtitle: "Protección de sus relaciones contractuales y patrimoniales",
      badge: "Área Civil",
      intro: "Regulamos las relaciones de los particulares y empresas con el fin de proteger sus intereses patrimoniales y resolver conflictos cotidianos mediante el acuerdo o la vía judicial.",
      details: [
        "Redacción, revisión y resolución de contratos de compraventa, arrendamiento y de obra.",
        "Reclamaciones de cantidad, impagos y defensa frente a deudas.",
        "Procedimientos de desahucio por falta de pago o precario.",
        "Responsabilidad civil contractual y extracontractual (accidentes de tráfico, negligencias)."
      ],
    },
    "derecho-de-familia": {
      title: "Derecho de Familia",
      subtitle: "Sensibilidad, mediación y firmeza jurídica",
      badge: "Área Familiar",
      intro: "Las crisis familiares exigen un trato humano, empático y una gran profesionalidad técnica para proteger, por encima de todo, el bienestar de los menores y asegurar un reparto patrimonial equitativo.",
      details: [
        "Divorcios y separaciones tanto de mutuo acuerdo como por la vía contenciosa.",
        "Redacción de convenios reguladores, guardia, custodia y régimen de visitas.",
        "Cálculo, reclamación y modificación de pensiones de alimentos y compensatorias.",
        "Procedimientos de filiación, incapacitaciones judiciales y tutela."
      ],
    },
    "derecho-laboral": {
      title: "Derecho Laboral",
      subtitle: "Asesoramiento y defensa en las relaciones de trabajo",
      badge: "Área Laboral",
      intro: "Ofrecemos asistencia de alta calidad jurídica en el ámbito de las relaciones laborales, defendiendo tanto los derechos del trabajador frente a abusos como asesorando a la empresa en su gestión interna diaria.",
      details: [
        "Impugnación de despidos disciplinarios, objetivos y colectivos (reclamación de indemnizaciones).",
        "Reclamación de salarios impagados, horas extraordinarias y diferencias de categoría.",
        "Gestión de expedientes de regulación de empleo (ERE/ERTE) y conciliación previa.",
        "Incapacidades laborales, accidentes de trabajo y recargos de prestaciones."
      ],
    },
    "herencias-y-sucesiones": {
      title: "Herencias y Sucesiones",
      subtitle: "Planificación de su legado y resolución de disputas sucesorias",
      badge: "Planificación Sucesoria",
      intro: "Le ayudamos a planificar la sucesión de forma segura para minimizar el impacto fiscal, o bien le asesoramos en el reparto y adjudicación de la herencia en momentos de conflicto familiar.",
      details: [
        "Asesoramiento y redacción de testamentos personalizados (legados, usufructos).",
        "Declaración de herederos abintestato (cuando no existe testamento).",
        "Adjudicación y partición de herencias, liquidación del Impuesto de Sucesiones.",
        "Defensa judicial en litigios por legítimas, desheredaciones y división de patrimonios."
      ],
    },
    "extranjeria-e-inmigracion": {
      title: "Extranjería e Inmigración",
      subtitle: "Asistencia bilingüe para su regularización en España",
      badge: "Servicio Internacional",
      intro: "La legislación de extranjería es compleja y cambiante. Nuestro servicio altamente cualificado y bilingüe (español y francés) le facilitará la obtención de sus permisos y la resolución de trámites burocráticos con la administración.",
      details: [
        "Solicitud y renovación de Autorizaciones de Residencia y Trabajo (arraigo social, familiar, laboral).",
        "Tramitación de la Tarjeta de Familiar de Ciudadano de la Unión Europea y visados.",
        "Expedientes de adquisición de la Nacionalidad Española por residencia.",
        "Recursos administrativos y contenciosos contra órdenes de expulsión o denegaciones."
      ],
    }
  },
  fr: {
    "derecho-penal": {
      title: "Droit Pénal",
      subtitle: "Défense pénale technique, rigoureuse et de confiance absolue",
      badge: "Spécialité Principale",
      intro: "Le domaine pénal exige une intervention immédiate et une stratégie procédurale minutieuse. Nous veillons à protéger vos droits et votre liberté dès le premier instant, en vous assistant de manière globale.",
      details: [
        "Assistance immédiate en garde à vue, 24h/24 et 7j/7, au commissariat et devant les tribunaux.",
        "Défense et accusation dans les délits graves, délits mineurs et infractions.",
        "Procédures pour mineurs et infractions routières (conduite sous l'empire d'un état alcoolique, sans permis).",
        "Droit pénitentiaire : demandes de liberté conditionnelle, aménagements de peines et recours."
      ],
    },
    "derecho-civil": {
      title: "Droit Civil",
      subtitle: "Protection de vos relations contractuelles et patrimoniales",
      badge: "Droit Civil",
      intro: "Nous régulons les relations entre particuliers et entreprises afin de protéger leurs intérêts financiers et de résoudre les conflits quotidiens, par accord amiable ou par voie judiciaire.",
      details: [
        "Rédaction, révision et résiliation de contrats de vente, de bail et de services.",
        "Recouvrement de créances, impayés et défense contre les réclamations de dettes.",
        "Procédures d'expulsion de locataires en impayés de loyer (desahucio).",
        "Responsabilité civile contractuelle et délictuelle (accidents de la route, préjudices)."
      ],
    },
    "derecho-de-familia": {
      title: "Droit de la Famille",
      subtitle: "Sensibilité, médiation et rigueur juridique",
      badge: "Droit de la Famille",
      intro: "Les crises familiales exigent une approche humaine, empathique et un grand professionnalisme pour protéger le bien-être des enfants et assurer un partage équitable des biens.",
      details: [
        "Divorces et séparations à l'amiable ou par voie contentieuse.",
        "Rédaction de conventions réglementant la garde d'enfants, droits de visite et d'hébergement.",
        "Calcul, réclamation et révision des pensions alimentaires et prestations compensatoires.",
        "Procédures de filiation, tutelle et curatelle."
      ],
    },
    "derecho-laboral": {
      title: "Droit du Travail",
      subtitle: "Conseil et défense dans les relations professionnelles",
      badge: "Droit du Travail",
      intro: "Nous offrons une assistance juridique de haute qualité en matière de droit du travail, en défendant les droits des salariés face aux abus et en conseillant les entreprises dans leur gestion interne.",
      details: [
        "Contestation de licenciements abusifs, économiques ou disciplinaires (indemnités).",
        "Réclamation de salaires impayés, heures supplémentaires et requalification de poste.",
        "Gestion des procédures de licenciement collectif (ERE/ERTE) et conciliation préalable.",
        "Accidents du travail, maladies professionnelles et réclamations de prestations."
      ],
    },
    "herencias-y-sucesiones": {
      title: "Successions et Héritages",
      subtitle: "Planification de votre patrimoine et résolution des litiges successoraux",
      badge: "Planification Successorale",
      intro: "Nous vous aidons à planifier votre succession de manière optimale pour réduire l'impact fiscal, ou nous vous conseillons dans le partage des biens lors de conflits familiaux.",
      details: [
        "Conseil et rédaction de testaments personnalisés (legs, usufruits).",
        "Déclaration d'héritiers en l'absence de testament (ab intestat).",
        "Partage et attribution de l'héritage, liquidation des droits de succession en Espagne.",
        "Défense judiciaire en cas de litiges successoraux (part de réserve, désorganisation)."
      ],
    },
    "extranjeria-e-inmigracion": {
      title: "Immigration et Intégration",
      subtitle: "Accompagnement bilingue pour votre régularisation en Espagne",
      badge: "Service International",
      intro: "La législation espagnole sur l'immigration est complexe et en constante évolution. Notre service bilingue (français/espagnol) simplifie l'obtention de vos permis et vos démarches administratives.",
      details: [
        "Demande et renouvellement d'autorisations de séjour et de travail (arraigo social, familial, etc.).",
        "Obtention de la Carte de séjour de membre de famille de l'Union européenne et visas.",
        "Dossiers de demande de nationalité espagnole par résidence.",
        "Recours administratifs et judiciaires contre les refus de séjour ou arrêtés d'expulsion."
      ],
    }
  }
};

export default function SpecialtyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Buscar la información de la especialidad correspondiente al slug y al idioma actual
  const specialty = specialtyDetails[lang]?.[slug || ""];

  if (!specialty) {
    return (
      <div className="py-32 text-center max-w-xl mx-auto px-4 space-y-6">
        <h2 className="font-serif text-3xl font-bold text-white">Especialidad no encontrada</h2>
        <p className="text-white/60">La categoría solicitada no existe o ha sido reestructurada.</p>
        <Link to="/especialidades" className="inline-block px-5 py-2.5 bg-brand-gold text-brand-dark rounded-lg text-sm font-semibold">
          Ver todas las especialidades
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fadeIn">
      
      {/* Botón Volver */}
      <div className="max-w-4xl mx-auto">
        <Link to="/especialidades" className="inline-flex items-center text-xs tracking-widest uppercase text-brand-gold hover:text-brand-goldLight transition-colors space-x-2">
          <span>←</span>
          <span>{lang === "es" ? "Volver a especialidades" : "Retour aux spécialités"}</span>
        </Link>
      </div>

      {/* Cabecera de la Especialidad */}
      <div className="max-w-4xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
          {specialty.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          {specialty.title}
        </h1>
        <p className="text-brand-gold/90 font-serif text-lg sm:text-xl font-light italic">
          {specialty.subtitle}
        </p>
      </div>

      {/* Contenido en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-4xl lg:max-w-7xl mx-auto items-start">
        
        {/* Columna Izquierda: Información Técnica y Lista */}
        <div className="lg:col-span-7 space-y-8">
          <p className="text-white/80 font-light text-base sm:text-lg leading-relaxed">
            {specialty.intro}
          </p>

          <div className="bg-brand-darkLight/30 border border-brand-darkLight/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-serif text-xl font-semibold text-white">
              {lang === "es" ? "Nuestros servicios detallados" : "Nos services détaillés"}
            </h3>
            
            <ul className="space-y-4">
              {specialty.details.map((item, index) => (
                <li key={index} className="flex items-start space-x-3.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs flex items-center justify-center font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Formulario de consulta rápida específico */}
        <div className="lg:col-span-5 bg-brand-darkLight/40 border border-brand-darkLight/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-white">
              {lang === "es" ? "Consulta Rápida" : "Consultation Rapide"}
            </h3>
            <p className="text-white/60 text-xs font-light">
              {lang === "es" 
                ? "Cuéntenos su problema penal o civil y nos comunicaremos de inmediato." 
                : "Décrivez votre problème et nous vous contacterons immédiatement."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo oculto o pre-relleno para la abogada */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-brand-gold/90 font-bold uppercase tracking-wider block">
                {lang === "es" ? "Especialidad Seleccionada" : "Spécialité Sélectionnée"}
              </label>
              <input 
                type="text" 
                disabled 
                value={specialty.title}
                className="w-full bg-brand-dark/60 border border-brand-darkLight/90 rounded-lg px-4 py-3 text-xs text-brand-gold font-semibold font-sans focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-white/50 font-semibold tracking-wider uppercase block">
                {t("contact.form_name")}
              </label>
              <input 
                type="text" 
                required
                placeholder="Ej. María Sánchez"
                className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-white/50 font-semibold tracking-wider uppercase block">
                {t("contact.form_phone")}
              </label>
              <input 
                type="tel" 
                required
                placeholder="600 000 000"
                className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-white/50 font-semibold tracking-wider uppercase block">
                {t("contact.form_message")}
              </label>
              <textarea 
                rows={4}
                required
                placeholder={lang === "es" ? "Escriba aquí los detalles..." : "Écrivez ici les détails..."}
                className="w-full bg-brand-dark/80 border border-brand-darkLight/90 hover:border-brand-gold/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 transition-all resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-sans font-bold text-xs py-3.5 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer"
            >
              {isSubmitting ? (
                <span>{t("contact.form_sending")}</span>
              ) : (
                <span>{lang === "es" ? "Solicitar información" : "Demander des informations"}</span>
              )}
            </button>

            {submitted && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs text-center font-medium animate-fadeIn">
                {t("contact.form_success")}
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
}