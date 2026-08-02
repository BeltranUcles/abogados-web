import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLang } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";
import type { BlogPost } from "../lib/supabase";

export default function AdminPage() {
  const { t } = useLang();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Estado para saber si estamos editando
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Modo del editor: 'write' (redactar) o 'preview' (vista previa)
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

  // Formulario para artículo
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Derecho Penal");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Beltrán & Uclés Abogados");
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Lista de artículos existentes
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const MARKDOWN_TEMPLATE = `## Introducción al caso

Escriba aquí una breve explicación inicial del tema legal o la novedad legislativa.

## Puntos clave a tener en cuenta

* **Primer punto importante:** Explicación detallada de la norma o caso.
* **Segundo punto importante:** Requisitos o aspectos legales relevantes.
* **Tercer punto:** Consecuencias directas para el cliente.

### Recomendaciones legales

1. Primer paso o recomendación previa.
2. Documentación que debe aportar la persona interesada.

> "Añada aquí una cita o frase destacada si lo considera oportuno."

Si necesita ayuda sobre este tema, puede [contactar con nuestro despacho](/contacto) para una consulta personalizada.`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "beltran2026") {
      setIsAuthenticated(true);
      setErrorMsg("");
      fetchPosts();
    } else {
      setErrorMsg("Contraseña incorrecta");
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
    } catch (error: any) {
      alert("Error al subir la imagen: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleStartEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setImageUrl(post.image_url || "");
    setExcerpt(post.excerpt);
    setContent(post.content);
    setAuthor(post.author || "Beltrán & Uclés Abogados");
    setSuccessMsg("");
    setEditorTab("write");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setTitle("");
    setImageUrl("");
    setExcerpt("");
    setContent("");
    setSuccessMsg("");
    setEditorTab("write");
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setSuccessMsg("");

    const slug = title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const postData = {
      title,
      slug,
      category,
      image_url: imageUrl || null,
      excerpt,
      content,
      author,
      published: true,
    };

    let error = null;

    if (editingPostId) {
      const res = await supabase.from("posts").update(postData).eq("id", editingPostId);
      error = res.error;
    } else {
      const res = await supabase.from("posts").insert([{ ...postData, created_at: new Date().toISOString() }]);
      error = res.error;
    }

    setIsPublishing(false);

    if (error) {
      alert("Error en Supabase: " + error.message);
    } else {
      setSuccessMsg(editingPostId ? "¡Artículo actualizado correctamente!" : "¡Artículo publicado correctamente!");
      handleCancelEdit();
      fetchPosts();
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta publicación?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) {
      if (editingPostId === id) handleCancelEdit();
      fetchPosts();
    } else {
      alert("Error al eliminar: " + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-32 px-4 max-w-md mx-auto space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <span className="text-brand-gold text-xs uppercase tracking-widest font-mono">
            Acceso Privado
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Panel de Administración</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-brand-darkLight/30 border border-brand-darkLight/80 rounded-2xl p-6 space-y-4 shadow-xl"
        >
          <div className="space-y-1.5">
            <label className="text-xs text-white/60 font-semibold uppercase block">
              Contraseña de acceso
            </label>
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
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-darkLight/60 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Gestor de Noticias y Blog</h1>
          <p className="text-white/60 text-xs">Publicación y edición inmediata en la web.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs text-brand-gold border border-brand-gold/30 rounded-lg px-3 py-1.5 hover:bg-brand-gold/10 transition-colors cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSavePost}
        className="bg-brand-darkLight/20 border border-brand-darkLight/60 rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-white">
            {editingPostId ? "✏️ Modificar Artículo Existente" : "✍️ Redactar nuevo artículo"}
          </h2>
          {editingPostId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-white/60 hover:text-white underline cursor-pointer"
            >
              Cancelar Edición
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60 font-semibold uppercase block">
              Título del Artículo
            </label>
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

        {/* Carga e Inserción de Imagen */}
        <div className="space-y-2 border border-brand-darkLight/60 p-4 rounded-xl bg-brand-dark/40">
          <label className="text-xs text-white/80 font-semibold uppercase block">
            Imagen de Portada
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-[11px] text-white/50 mb-1">
                A) Subir imagen local desde el equipo:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="block w-full text-xs text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/20 file:text-brand-gold hover:file:bg-brand-gold/30 cursor-pointer"
              />
              {uploadingImage && <p className="text-[10px] text-brand-gold animate-pulse mt-1">Subiendo imagen...</p>}
            </div>

            <div>
              <label className="block text-[11px] text-white/50 mb-1">
                B) O pegar enlace de internet (URL):
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-3 py-2 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>
          {imageUrl && (
            <div className="mt-2 flex items-center gap-3 pt-2 border-t border-brand-darkLight/40">
              <img src={imageUrl} alt="Vista previa" className="h-12 w-20 object-cover rounded-lg border border-brand-gold/40" />
              <span className="text-[11px] text-emerald-400 font-mono">✓ Imagen seleccionada</span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/60 font-semibold uppercase block">
            Resumen breve (Aparece en la tarjeta)
          </label>
          <input
            type="text"
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Breve introducción de 2 líneas para captar la atención..."
            className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
          />
        </div>

        {/* Editor de Texto con Vista Previa */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            {/* Pestañas para alternar entre Redacción y Previsualización */}
            <div className="flex items-center gap-1 bg-brand-dark p-1 rounded-lg border border-brand-darkLight/80">
              <button
                type="button"
                onClick={() => setEditorTab("write")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  editorTab === "write"
                    ? "bg-brand-gold text-brand-dark"
                    : "text-white/60 hover:text-white"
                }`}
              >
                ✏️ Redactar
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("preview")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  editorTab === "preview"
                    ? "bg-brand-gold text-brand-dark"
                    : "text-white/60 hover:text-white"
                }`}
              >
                👁️ Vista Previa en Vivo
              </button>
            </div>

            {editorTab === "write" && (
              <button
                type="button"
                onClick={() => {
                  if (content && !window.confirm("¿Reemplazar el contenido actual con la plantilla sugerida?")) return;
                  setContent(MARKDOWN_TEMPLATE);
                }}
                className="text-[11px] bg-brand-gold/15 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark px-3 py-1 rounded-lg transition-all font-semibold cursor-pointer"
              >
                📋 Cargar Plantilla
              </button>
            )}
          </div>

          {/* Área de Entrada vs Vista Previa */}
          {editorTab === "write" ? (
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escriba aquí todo el texto..."
              className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg p-4 text-sm text-white focus:border-brand-gold focus:outline-none resize-y font-mono"
            />
          ) : (
            <div className="bg-brand-dark border border-brand-gold/30 rounded-lg p-6 min-h-[300px] space-y-4">
              <div className="border-b border-brand-darkLight/60 pb-3 mb-4">
                <span className="text-[10px] text-brand-gold font-mono uppercase tracking-widest block">
                  Así se verá tu noticia:
                </span>
                <h2 className="font-serif text-2xl font-bold text-white mt-1">
                  {title || "Sin título provisional"}
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  {category} • {new Date().toLocaleDateString("es-ES")} • Por {author}
                </p>
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Portada"
                  className="w-full max-h-64 object-cover rounded-xl border border-brand-darkLight/80 mb-4"
                />
              )}

              {content ? (
                <div className="prose prose-invert max-w-none text-white/80 text-sm leading-relaxed space-y-3">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-xs text-white/40 italic">
                  Escribe algo en la pestaña "Redactar" para ver cómo queda formateado.
                </p>
              )}
            </div>
          )}

          {/* Guía Rápida Visual de Markdown */}
          {editorTab === "write" && (
            <div className="p-4 bg-brand-dark/60 border border-brand-darkLight/60 rounded-xl text-xs space-y-2">
              <p className="font-bold text-brand-gold uppercase tracking-wider text-[11px]">
                💡 Guía Rápida de Formato (Markdown)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-white/70 text-[11px]">
                <div><code className="text-brand-gold">## Subtítulo</code> = Encabezado</div>
                <div><code className="text-brand-gold">**texto**</code> = **Negrita**</div>
                <div><code className="text-brand-gold">* Elemento</code> = Lista con viñetas</div>
                <div><code className="text-brand-gold">[Texto](URL)</code> = Enlace web</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/60 font-semibold uppercase block">
            Firma / Autor
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-brand-dark border border-brand-darkLight/90 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPublishing || uploadingImage}
          className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-bold text-xs py-4 rounded-lg uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
        >
          {isPublishing
            ? "Guardando..."
            : editingPostId
            ? "Guardar Cambios en la Web"
            : "Publicar Artículo en la Web"}
        </button>

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}
      </form>

      {/* Gestión de Artículos Publicados */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-white">
          Artículos publicados ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <p className="text-xs text-white/40 italic">Aún no hay artículos publicados en la base de datos.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-brand-darkLight/20 border border-brand-darkLight/60 rounded-xl flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                  <p className="text-xs text-white/40">
                    {post.category} • {new Date(post.created_at).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(post)}
                    className="px-3 py-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold hover:text-brand-dark rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}