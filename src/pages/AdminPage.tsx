import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const { t } = useLang();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Formulario para nuevo artículo
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Derecho Penal");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Beltrán & Uclés Abogados");
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "beltran2026") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Contraseña incorrecta");
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setSuccessMsg("");

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newPost = {
      title,
      slug,
      category,
      excerpt,
      content,
      author,
      published: true,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from("posts").insert([newPost]);

    setIsPublishing(false);

    if (error) {
      alert("Error al guardar en Supabase: " + error.message);
    } else {
      setSuccessMsg("¡Artículo publicado correctamente en la web!");
      setTitle("");
      setExcerpt("");
      setContent("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-32 px-4 max-w-md mx-auto space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <span className="text-brand-gold text-xs uppercase tracking-widest font-mono">Acceso Privado</span>
          <h1 className="font-serif text-3xl font-bold text-white">Panel de Administración</h1>
        </div>

        <form onSubmit={handleLogin} className="bg-brand-darkLight/30 border border-brand-darkLight/80 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60 font-semibold uppercase block">Contraseña de acceso</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
            />
          </div>

          {errorMsg && <p className="text-xs text-red-400 font-medium">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-bold text-xs py-3.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer"
          >
            Entrar al Gestor
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-brand-darkLight/60 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Gestor de Noticias y Blog</h1>
          <p className="text-white/60 text-xs">Publicación inmediata en el portal web.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs text-brand-gold border border-brand-gold/30 rounded-lg px-3 py-1.5 hover:bg-brand-gold/10"
        >
          Cerrar Sesión
        </button>
      </div>

      <form onSubmit={handleCreatePost} className="bg-brand-darkLight/20 border border-brand-darkLight/60 rounded-2xl p-8 space-y-6">
        <h2 className="font-serif text-xl font-semibold text-white">Redactar nuevo artículo</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60 font-semibold uppercase block">Título del Artículo</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Nuevas reformas en el código penal..."
              className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/60 font-semibold uppercase block">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
            >
              <option value="Derecho Penal">Derecho Penal</option>
              <option value="Derecho Civil">Derecho Civil</option>
              <option value="Derecho de Familia">Derecho de Familia</option>
              <option value="Derecho Laboral">Derecho Laboral</option>
              <option value="Herencias y Sucesiones">Herencias y Sucesiones</option>
              <option value="Extranjería">Extranjería</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/60 font-semibold uppercase block">Resumen breve (Aparece en la tarjeta)</label>
          <input
            type="text"
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Breve introducción de 2 líneas para captar la atención..."
            className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/60 font-semibold uppercase block">Contenido Completo del Artículo</label>
          <textarea
            rows={10}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escriba aquí todo el texto del artículo..."
            className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/60 font-semibold uppercase block">Firma / Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPublishing}
          className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-bold text-xs py-4 rounded-lg uppercase tracking-wider transition-all cursor-pointer"
        >
          {isPublishing ? "Publicando..." : "Publicar Artículo en la Web"}
        </button>

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}
      </form>
    </div>
  );
}