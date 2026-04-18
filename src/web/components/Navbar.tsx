import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo-light.png"
            alt="Sandra Martins Ribeiro — Advogada"
            className="h-14 w-auto object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            style={{ maxWidth: 220 }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Sobre", id: "sobre" },
            { label: "Áreas", id: "areas" },
            { label: "Diferenciais", id: "diferenciais" },
            { label: "Contacto", id: "contacto" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <Link href="/consultas" className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase transition-colors duration-200">
            Consultas
          </Link>
          <Link href="/chat" className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase transition-colors duration-200">
            Fale Connosco
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/chat"
            className="text-[#C9A84C]/80 hover:text-[#C9A84C] px-3 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse inline-block" />
            Online
          </Link>
          <a
            href="https://wa.me/351936339581?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] px-5 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
          >
            Marcar Consulta
          </a>
        </div>

        {/* Burger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1B2A] border-t border-white/10 px-6 py-8 flex flex-col gap-6">
          {[
            { label: "Sobre", id: "sobre" },
            { label: "Áreas de Atuação", id: "areas" },
            { label: "Diferenciais", id: "diferenciais" },
            { label: "Contacto", id: "contacto" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase text-left transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link href="/consultas" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase text-left transition-colors">
            Consultas e Agendamento
          </Link>
          <Link href="/chat" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase text-left transition-colors flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Fale Connosco
          </Link>
          <a
            href="https://wa.me/351936339581?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#C9A84C] text-[#C9A84C] px-5 py-3 text-xs tracking-[0.15em] uppercase text-center"
          >
            Marcar Consulta
          </a>
        </div>
      )}
    </nav>
  );
}
