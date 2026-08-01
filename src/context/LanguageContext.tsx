import React, { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  es: {
    nav: {
      firma: "La Firma",
      especialidades: "Especialidades",
      blog: "Blog",
      contacto: "Contacto",
    },
    hero: {
      badge: "Despacho de Abogados • Almería",
      title1: "Defensa Integral y Cercana:",
      title2: "Tu Solución Legal en un Solo Despacho",
      desc: "Un equipo comprometido con tus derechos y tu tranquilidad. Te ofrecemos nuestros servicios en Roquetas de Mar y El Ejido. Servicios disponibles en Español y Francés.",
      btn: "Presupuesto sin compromiso • Consulta Gratuita",
    },
    about: {
      badge: "La Firma",
      title: "Compromiso, rigor y cercanía en cada caso",
      p1: "En Beltrán & Uclés Abogados entendemos que detrás de cada expediente hay personas que buscan tranquilidad. Nuestro despacho nace con la clara vocación de ofrecer un asesoramiento jurídico de máxima calidad, combinando el rigor técnico con un trato humano y directo.",
      p2: "Ubicados en Almería, prestamos servicio de forma presencial en Roquetas de Mar y El Ejido. Además, nuestra total competencia bilingüe nos permite asistir con absoluta garantía a clientes francófonos, facilitando gestiones complejas sin barreras idiomáticas.",
      stat1_num: "100%",
      stat1_txt: "Compromiso",
      stat2_num: "+2",
      stat2_txt: "Sedes físicas",
      stat3_num: "24/7",
      stat3_txt: "Atención ágil",
      
      // Trayectoria de la Abogada
      lawyer_title: "Dirección Académica y Profesional",
      lawyer_name: "María Beltrán Uclés",
      lawyer_role: "Abogada Fundadora • Colegiada Nº XXXX ICA Almería",
      lawyer_bio1: "Graduada en Derecho por la Universidad de Almería, especializada en Litigación Penal y Derecho de Familia. Con una sólida trayectoria en la defensa de particulares y empresas frente a los tribunales, fundó este despacho con el objetivo de priorizar la transparencia y la cercanía en el trato al cliente.",
      lawyer_bio2: "Cuenta con másteres de especialización y estancias académicas internacionales que avalan su competencia bilingüe, permitiendo ofrecer un asesoramiento jurídico riguroso y adaptado tanto en español como en francés para la comunidad extranjera de la provincia.",
      education_title: "Formación & Destacados",
      edu_1: "Graduada en Derecho — Universidad de Almería",
      edu_2: "Máster de Acceso a la Abogacía y Práctica Jurídica",
      edu_3: "Especialización en Derecho Penal y Penitenciario",
      edu_4: "Certificación de Competencia Profesional Bilingüe (Español / Francés)",
    },
    specialties: {
      badge: "Especialidades",
      title: "Especialidades",
      desc: "Asesoramiento y defensa integral en las principales ramas del Derecho.",
      esp1_title: "Derecho Penal",
      esp1_desc: "Especialidad principal. Defensa y acusación particular, asistencia inmediata al detenido y derecho penitenciario.",
      esp2_title: "Derecho Civil",
      esp2_desc: "Contratos, responsabilidad civil, desahucios y reclamaciones patrimoniales.",
      esp3_title: "Derecho de Familia",
      esp3_desc: "Divorcios, separaciones, custodias, régimen de visitas y pensiones.",
      esp4_title: "Derecho Laboral",
      esp4_desc: "Despidos, reclamaciones salariales y conflictos para trabajadores y empleadores.",
      esp5_title: "Herencias y Sucesiones",
      esp5_desc: "Planificación sucesoria, testamentos y conflictos entre herederos.",
      esp6_title: "Extranjería e Inmigración",
      esp6_desc: "Permisos de residencia, trabajo, nacionalidad y reagrupación familiar.",
    },
    contact: {
      badge: "Contacto",
      title: "Hablemos de tu caso",
      desc: "Ponte en contacto con nosotros para agendar una consulta o solicitar un presupuesto sin compromiso.",
      info_title: "Información de contacto",
      info_desc: "Visítanos en nuestras oficinas o contáctanos por teléfono o email de forma directa.",
      office_almeria: "Sede Almería (Cita previa)",
      office_roquetas: "Sede Roquetas de Mar",
      office_ejido: "Sede El Ejido",
      form_name: "Nombre completo",
      form_email: "Correo electrónico",
      form_phone: "Teléfono",
      form_specialty: "Área de interés",
      form_specialty_placeholder: "Selecciona una especialidad",
      form_message: "Cuéntanos brevemente tu caso",
      form_submit: "Enviar consulta",
      form_sending: "Enviando...",
      form_success: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      legal: "Aviso Legal",
      privacy: "Política de Privacidad",
      cookies: "Política de Cookies",
    }
  },
  fr: {
    nav: {
      firma: "Le Cabinet",
      especialidades: "Spécialités",
      blog: "Blog",
      contacto: "Contact",
    },
    hero: {
      badge: "Cabinet d'Avocats • Almería",
      title1: "Défense Globale et Proche :",
      title2: "Votre Solution Légale en un Seul Cabinet",
      desc: "Une équipe engagée pour vos droits et votre tranquillité. Nous vous proposons nos services à Roquetas de Mar et El Ejido. Services disponibles en Espagnol et Français.",
      btn: "Devis sans engagement • Consultation Gratuite",
    },
    about: {
      badge: "Le Cabinet",
      title: "Engagement, rigueur et proximité dans chaque dossier",
      p1: "Chez Beltrán & Uclés Avocats, nous comprenons que derrière chaque dossier se trouvent des personnes en quête de tranquillité. Notre cabinet est né avec la claire vocation d'offrir un conseil juridique de la plus haute qualité, alliant rigueur technique et approche humaine et directe.",
      p2: "Basés à Almería, nous offrons un service de proximité à Roquetas de Mar et El Ejido. De plus, notre compétence bilingue totale nous permet d'accompagner les clients francophones avec une garantie absolue, facilitant les démarches complexes sans barrière linguistique.",
      stat1_num: "100%",
      stat1_txt: "Engagement",
      stat2_num: "+2",
      stat2_txt: "Bureaux physiques",
      stat3_num: "24/7",
      stat3_txt: "Réactivité",
      
      // Trayectoria de la Abogada en Francés
      lawyer_title: "Direction Académique et Professionnelle",
      lawyer_name: "María Beltrán Uclés",
      lawyer_role: "Avocate Fondatrice • Membre du Barreau d'Almería Nº XXXX",
      lawyer_bio1: "Diplômée en droit de l'Université d'Almería, spécialisée en contentieux pénal et droit de la famille. Forte d'une solide expérience dans la défense des particuliers et des entreprises devant les tribunaux, elle a fondé ce cabinet dans le but de privilégier la transparence et la proximité dans la relation client.",
      lawyer_bio2: "Elle est titulaire de masters de spécialisation et a effectué des séjours académiques internationaux qui attestent de sa compétence bilingue totale, lui permettant d'offrir un conseil juridique rigoureux et adapté en espagnol et en français pour la communauté francophone de la province.",
      education_title: "Formation & Distinctions",
      edu_1: "Diplôme en Droit — Université d'Almería",
      edu_2: "Master d'Accès à la Profession d'Avocat et Pratique Juridique",
      edu_3: "Spécialisation en Droit Pénal et Pénitentiaire",
      edu_4: "Certification de Compétence Professionnelle Bilingue (Espagnol / Français)",
    },
    specialties: {
      badge: "Spécialités",
      title: "Spécialités",
      desc: "Conseil et défense globale dans les principales branches du droit.",
      esp1_title: "Droit Pénal",
      esp1_desc: "Spécialité principale. Défense et accusation pénale, assistance immédiate en garde à vue et droit pénitentiaire.",
      esp2_title: "Droit Civil",
      esp2_desc: "Contrats, responsabilité civile, procédures d'expulsion et litiges financiers.",
      esp3_title: "Droit de la Famille",
      esp3_desc: "Divorces, séparations, garde d'enfants, droits de visite et pensions alimentaires.",
      esp4_title: "Droit du Travail",
      esp4_desc: "Licenciements, rappels de salaires et conflits pour les salariés et employeurs.",
      esp5_title: "Héritages et Successions",
      esp5_desc: "Planification successorale, testaments et litiges entre héritiers.",
      esp6_title: "Immigration et Intégration",
      esp6_desc: "Titres de séjour, permis de travail, nationalité espagnole et regroupement familial.",
    },
    contact: {
      badge: "Contact",
      title: "Parlons de votre dossier",
      desc: "Contactez-nous pour planifier un rendez-vous ou demander un devis sans engagement.",
      info_title: "Coordonnées de contact",
      info_desc: "Rendez-nous visite dans nos bureaux ou contactez-nous directement par téléphone ou par e-mail.",
      office_almeria: "Bureau Almería (Sur rendez-vous)",
      office_roquetas: "Bureau Roquetas de Mar",
      office_ejido: "Bureau El Ejido",
      form_name: "Nom complet",
      form_email: "Adresse e-mail",
      form_phone: "Téléphone",
      form_specialty: "Domaine d'intérêt",
      form_specialty_placeholder: "Sélectionnez une spécialité",
      form_message: "Décrivez brièvement votre situation",
      form_submit: "Envoyer la demande",
      form_sending: "Envoi en cours...",
      form_success: "Message envoyé avec succès ! Nous vous recontacterons dans los plus brefs délais.",
    },
    footer: {
      rights: "Tous droits réservés.",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      cookies: "Politique de Cookies",
    }
  },
};

type Language = "es" | "fr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es");

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[lang];
    
    for (const k of keys) {
      if (current[k] === undefined) return key;
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang debe usarse dentro de un LanguageProvider");
  }
  return context;
}