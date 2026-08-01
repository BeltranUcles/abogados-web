import React from "react";
import { useLang } from "../context/LanguageContext";
import About from "../components/About";

export default function FirmaPage() {
  const { lang } = useLang();

  return (
    <div className="pt-20 animate-fadeIn">
      <About language={lang} />
    </div>
  );
}