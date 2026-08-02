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
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error al cargar los posts:", error.message);
          setPosts([]);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-32 text-center text-brand-gold animate-pulse text-sm font-light">
        {lang === "es" ? "Cargando publicaciones..." : "Chargement des articles..."}
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 animate-fadeIn">
      {/* Cabecera de la sección de Blog */}
      <div className="text-center space-y-4">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
          {lang === "es" ? "Nuestro Blog Jurídico" : "Notre Blog Juridique"}
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto font-light">
          {lang === "es" 
            ? "Actualidad legal, artículos de interés y novedades de nuestro despacho." 
            : "Actualité juridique, articles d'intérêt et actualité de notre cabinet."}
        </p>
      </div>

      {/* Listado de artículos o mensaje vacío */}
      {posts.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-brand-darkLight/20 rounded-2xl border border-brand-darkLight/40 max-w-lg mx-auto">
          <p className="text-white/60 text-sm">
            {lang === "es" ? "No hay publicaciones disponibles en este momento." : "Aucune publication disponible pour le moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-brand-darkLight/30 border border-brand-darkLight/60 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all flex flex-col shadow-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-brand-gold/10 text-brand-gold rounded-full border border-brand-gold/20 inline-block">
                    {post.category || "General"}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-darkLight/40 flex items-center justify-between text-[11px] text-white/40 font-mono">
                  <span>{new Date(post.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "fr-FR")}</span>
                  <span className="text-brand-gold font-sans font-bold group-hover:translate-x-1 transition-transform">
                    {lang === "es" ? "Leer más →" : "Lire la suite →"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}