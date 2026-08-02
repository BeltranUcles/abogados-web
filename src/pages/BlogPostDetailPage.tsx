import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useLang } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";
import type { BlogPost } from "../lib/supabase";

export default function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          console.warn("Aviso al cargar el artículo:", error.message);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-brand-gold animate-pulse text-sm font-light">
        {lang === "es" ? "Cargando publicación..." : "Chargement de l'article..."}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
        <p className="text-white/70 font-light text-base">
          {lang === "es" ? "El artículo solicitado no existe o ha sido despublicado." : "Cet article n'existe pas ou a été retiré."}
        </p>
        <Link
          to="/blog"
          className="inline-block px-5 py-2.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-wider rounded-xl font-bold hover:bg-brand-gold hover:text-brand-dark transition-all"
        >
          ← {lang === "es" ? "Volver al blog" : "Retour au blog"}
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Botón Volver */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-goldLight transition-colors"
        >
          <span>←</span>
          <span>{lang === "es" ? "Volver a todas las publicaciones" : "Retour aux articles"}</span>
        </Link>
      </div>

      {/* Encabezado del Post */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-semibold uppercase tracking-widest rounded-full">
            {post.category || "General"}
          </span>
          <span className="text-white/40 font-mono">
            {new Date(post.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "fr-FR")}
          </span>
          {post.read_time && (
            <span className="text-white/40 font-mono">• {post.read_time}</span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2 border-t border-brand-darkLight/40 text-xs text-white/50">
          <span>
            {lang === "es" ? "Redactado por: " : "Rédigé par : "}
            <strong className="text-white/80 font-medium">{post.author || "Beltrán & Uclés Abogados"}</strong>
          </span>
        </div>
      </div>

      {/* Imagen de Cabecera Principal */}
      <div className="relative rounded-2xl overflow-hidden border border-brand-darkLight/70 shadow-2xl max-h-[480px]">
        <img
          src={post.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Resumen / Entradilla */}
      {post.excerpt && (
        <div className="p-6 bg-brand-darkLight/30 border-l-4 border-brand-gold rounded-r-2xl text-white/90 text-base sm:text-lg italic leading-relaxed font-serif">
          {post.excerpt}
        </div>
      )}

      {/* Contenido Completo (Markdown) */}
      <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-6 text-base font-light pt-4">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold underline hover:text-brand-goldLight transition-colors font-medium"
              />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="font-serif text-2xl font-bold text-white pt-6 pb-2 border-b border-brand-darkLight/60" />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="font-serif text-xl font-bold text-white pt-4" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc list-inside space-y-2 pl-2 text-white/80" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal list-inside space-y-2 pl-2 text-white/80" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="leading-relaxed" />
            )
          }}
        >
          {post.content || ""}
        </ReactMarkdown>
      </div>

      {/* CTA Final */}
      <div className="pt-10 border-t border-brand-darkLight/60 flex flex-col sm:flex-row items-center justify-between gap-6 bg-brand-darkLight/20 p-6 sm:p-8 rounded-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold text-white">
            {lang === "es" ? "¿Necesita asesoramiento legal personalizado?" : "Besoin d'un conseil juridique personnalisé ?"}
          </h4>
          <p className="text-xs text-white/60 font-light">
            {lang === "es"
              ? "Nuestro equipo de abogados analizará su caso de forma confidencial."
              : "Notre équipe d'avocats analysera votre cas de manière confidentielle."}
          </p>
        </div>
        <Link
          to="/contacto"
          className="px-6 py-3 bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-goldLight transition-all shadow-md shrink-0"
        >
          {lang === "es" ? "Contactar despacho" : "Contacter le cabinet"}
        </Link>
      </div>
    </article>
  );
}