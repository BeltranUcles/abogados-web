import React from 'react';

interface AboutProps {
  language?: 'es' | 'fr';
}

export const About: React.FC<AboutProps> = ({ language = 'es' }) => {
  const content = {
    es: {
      tag: "LA FIRMA",
      title: "Compromiso, rigor y cercanía en cada caso",
      desc1: "En Beltrán & Uclés Abogados entendemos que detrás de cada expediente hay personas que buscan tranquilidad. Nuestro despacho nace con la clara vocación de ofrecer un asesoramiento jurídico de máxima calidad, combinando el rigor técnico con un trato humano y directo.",
      desc2: "Ubicados en Almería, prestamos servicio de forma presencial en Roquetas de Mar y El Ejido. Además, nuestra total competencia bilingüe nos permite asistir con absoluta garantía a clientes francófonos, facilitando gestiones complejas sin barreras idiomáticas.",
      stats: [
        { number: "100%", label: "Compromiso" },
        { number: "+2", label: "Sedes físicas" },
        { number: "24/7", label: "Atención Ágil" }
      ],
      bioTag: "DIRECCIÓN ACADÉMICA Y PROFESIONAL",
      name: "María Rosa Uclés Gálvez",
      role: "Abogada Fundadora • Colegiada Nº 5067 ICA Almería",
      bioText1: "Graduada en Derecho por la Universidad de Almería, especializada en Litigación Penal y Derecho de Familia. Con una sólida trayectoria en la defensa de particulares y empresas frente a los tribunales, fundó este despacho con el objetivo de priorizar la transparencia y la cercanía en el trato al cliente.",
      bioText2: "Cuenta con másteres de especialización y estancias académicas internacionales que avalan su competencia bilingüe, permitiendo ofrecer un asesoramiento jurídico riguroso y adaptado tanto en español como en francés para la comunidad extranjera de la provincia.",
      highlightsTitle: "Formación & Destacados",
      highlights: [
        "Graduada en Derecho — Universidad de Almería",
        "Máster de Acceso a la Abogacía y Práctica Jurídica",
        "Especialización en Derecho Penal y Penitenciario",
        "Certificación de Competencia Profesional Bilingüe (Español / Français)"
      ]
    },
    fr: {
      tag: "LE CABINET",
      title: "Engagement, rigueur et proximité dans chaque dossier",
      desc1: "Chez Beltrán & Uclés Avocats, nous comprenons que derrière chaque dossier se trouvent des personnes en quête de tranquillité. Notre cabinet est né avec la vocation claire d'offrir des conseils juridiques de la plus haute qualité, alliant rigueur technique et approche humaine et directe.",
      desc2: "Situés à Almería, nous fournissons des services en personne à Roquetas de Mar et El Ejido. De plus, notre pleine compétence bilingue nous permet d'assister les clients francophones avec une garantie absolue, facilitant les démarches complexes sans barrières linguistiques.",
      stats: [
        { number: "100%", label: "Engagement" },
        { number: "+2", label: "Bureaux physiques" },
        { number: "24/7", label: "Service Réactif" }
      ],
      bioTag: "DIRECTION ACADÉMIQUE ET PROFESSIONNELLE",
      name: "María Rosa Uclés Gálvez",
      role: "Avocate Fondatrice • Barreau Nº 5067 ICA Almería",
      bioText1: "Diplômée en Droit de l'Université d'Almería, spécialisée en Contentieux Pénal et Droit de la Famille. Avec un solide parcours dans la défense des particuliers et des entreprises devant les tribunaux, elle a fondé ce cabinet dans le but de privilégier la transparence et la proximité avec le client.",
      bioText2: "Elle possède des masters de spécialisation et des séjours académiques internationaux qui attestent de sa compétence bilingue, permettant d'offrir un conseil juridique rigoureux et adapté aussi bien en espagnol qu'en français pour la communauté étrangère de la province.",
      highlightsTitle: "Formation & Points Forts",
      highlights: [
        "Diplômée en Droit — Université d'Almería",
        "Master d'Accès à la Profession d'Avocat et Pratique Juridique",
        "Spécialisation en Droit Pénal et Pénitentiaire",
        "Certification de Compétence Professionnelle Bilingüe (Espagnol / Français)"
      ]
    }
  };

  const t = content[language] || content.es;

  return (
    <div className="bg-[#051329] min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* PARTE SUPERIOR: Encabezado y Estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold tracking-widest text-[#c5a46d] uppercase bg-[#c5a46d]/10 px-3 py-1 rounded border border-[#c5a46d]/20">
              {t.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.desc1}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.desc2}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {t.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-[#0a1e3f]/60 border border-slate-800 rounded-lg p-5 flex items-center justify-between"
              >
                <span className="text-3xl font-serif font-bold text-[#c5a46d]">
                  {stat.number}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PARTE INFERIOR: Perfil Profesional Único */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-slate-800/60">
          
          {/* Fotografía Profesional */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm h-[480px] rounded-xl overflow-hidden border border-slate-800 bg-[#0a1e3f]/40 shadow-xl">
              <img 
                src="/maria-rosa.jpeg" 
                alt={t.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Información y Biografía */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#c5a46d] uppercase bg-[#c5a46d]/10 px-3 py-1 rounded border border-[#c5a46d]/20">
                {t.bioTag}
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-3">
                {t.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#c5a46d] font-medium mt-1">
                {t.role}
              </p>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t.bioText1}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t.bioText2}
            </p>

            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-serif font-semibold text-white">
                {t.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {t.highlights.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-[#c5a46d]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;