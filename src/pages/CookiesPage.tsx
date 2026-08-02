import React from "react";
import { Link } from "react-router-dom";

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-gray-200">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mb-8">
        Política de Cookies y Aviso Legal
      </h1>

      <section className="space-y-6 text-sm leading-relaxed text-gray-300">
        <div className="bg-brand-dark/50 border border-brand-gold/20 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-white mb-2">Información General (LSSI-CE)</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos del titular del sitio web:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-gray-300">
            <li><strong>Titular:</strong> María Rosa Uclés Gálvez</li>
            <li><strong>Colegiada:</strong> Nº 5067 del Ilustre Colegio Provincial de Abogados de Almería (ICA Almería)</li>
            <li><strong>Sitio Web:</strong> beltranyuclesabogados.com</li>
            <li><strong>Actividad:</strong> Servicios jurídicos y de abogacía</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-brand-gold/20 pb-2">
          1. ¿Qué son las cookies?
        </h2>
        <p>
          Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-brand-gold/20 pb-2">
          2. Cookies utilizadas en este sitio web
        </h2>
        <p>
          Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>Cookies técnicas indispensables:</strong> Son aquellas que permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones o servicios que en él existen (por ejemplo, guardar sus preferencias de consentimiento de cookies).
          </li>
          <li>
            <strong>Cookies de preferencias/personalización:</strong> Permiten recordar información para que el usuario acceda al servicio con determinadas características (como el idioma seleccionado).
          </li>
        </ul>
        <p className="mt-3 italic text-gray-400">
          Este sitio web no utiliza cookies de rastreo publicitario de terceros ni cede datos de navegación a empresas publicitarias.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-brand-gold/20 pb-2">
          3. Desactivación o eliminación de cookies
        </h2>
        <p>
          En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web a través de la configuración de su navegador:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad & Seguridad &gt; Cookies.</li>
          <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies.</li>
          <li><strong>Microsoft Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios.</li>
        </ul>

        <div className="pt-8 border-t border-brand-gold/20 mt-12">
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-brand-gold text-brand-dark font-semibold text-xs uppercase tracking-wider rounded transition-all hover:bg-white"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </section>
    </div>
  );
}