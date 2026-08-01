import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";
import type { BlogPost } from "../lib/supabase";

export default function BlogPage() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Aviso al cargar posts de Supabase:", error.message);
      } else if (data) {
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Cabecera del Blog */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-sans text-xs uppercase tracking-widest rounded-md">
          {lang === "es" ? "Actualidad Jurídica" : "Actualité Juridique"}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Blog & Novedades Legal
        </h1>
        <p className="text-white/60 font-light text-base sm:text-lg">
          {lang === "es"
            ? "Artículos, análisis procesales y consejos legales redactados por nuestros abogados."
            : "Articles, analyses juridiques et conseils d'experts préparés par nos avocats."}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/50 animate-pulse">
          {lang === "es" ? "Cargando publicaciones..." : "Chargement des articles..."}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-brand-darkLight/20 border border-brand-darkLight/60 rounded-2xl max-w-xl mx-auto space-y-4">
          <p className="text-white/70 font-light">
            {lang === "es"
              ? "Aún no hay publicaciones disponibles en el blog."
              : "Aucun article disponible pour le moment."}
          </p>
        </div>
      ) : (
        /* Rejilla de artículos */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-brand-darkLight/20 border border-brand-darkLight/60 rounded-2xl overflow-hidden hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-brand-gold font-mono">
                  <span>{post.category}</span>
                  <span className="text-white/40">
                    {new Date(post.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "fr-FR")}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-white/60 font-light text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-brand-darkLight/40 mt-4 flex items-center justify-between">
                <span className="text-xs text-white/40">{post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs text-brand-gold font-bold uppercase tracking-wider flex items-center space-x-1 hover:text-brand-goldLight"
                >
                  <span>{lang === "es" ? "Leer artículo" : "Lire l'article"}</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}