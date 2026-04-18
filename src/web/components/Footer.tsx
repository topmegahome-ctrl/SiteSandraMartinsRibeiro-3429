import { Link } from "wouter";
import { EditableText } from "./EditableText";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white/60">
      <div className="border-t border-[#C9A84C]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src="/logo-light.png"
              alt="Sandra Martins Ribeiro — Advogada"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-white/50">
              <EditableText id="footer-tagline" defaultValue="Inscrita na Ordem dos Advogados Portuguesa." multiline />
            </p>
            <p className="text-sm text-white/40 mt-1">
              <EditableText id="footer-nif" defaultValue="NIF do Escritório: [A definir]" />
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-5">
              <EditableText id="footer-nav-title" defaultValue="Navegação" />
            </p>
            <ul className="space-y-3 text-sm">
              {["Sobre Mim", "Áreas de Atuação", "Diferenciais", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`/#${item.toLowerCase().replace(/\s/g, "").replace("áreas", "areas").replace("deáreas", "areas")}`}
                    className="hover:text-[#C9A84C] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li><Link href="/privacidade" className="hover:text-[#C9A84C] transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/avisos-legais" className="hover:text-[#C9A84C] transition-colors">Avisos Legais</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-5">
              <EditableText id="footer-contact-title" defaultValue="Contacto" />
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#C9A84C] mt-0.5">📍</span>
                <a href="https://maps.app.goo.gl/vNK8gJQEWJ9yhKAdA" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
                  <EditableText id="footer-address" defaultValue="Av. Dr. João Canavarro 305, 1º andar, sala 17, 4480-872 Vila do Conde" />
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C9A84C]">✉</span>
                <a href="mailto:sandramartinsribeiro07@gmail.com" className="hover:text-[#C9A84C] transition-colors">
                  <EditableText id="footer-email" defaultValue="sandramartinsribeiro07@gmail.com" />
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C9A84C]">📱</span>
                <a href="https://wa.me/351936339581" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
                  <EditableText id="footer-wa-label" defaultValue="WhatsApp" />
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 hover:border-[#C9A84C] flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all text-sm"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://wa.me/351936339581"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 hover:border-[#C9A84C] flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all text-xs"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            <EditableText id="footer-copy" defaultValue={`© ${new Date().getFullYear()} Sandra Martins Ribeiro — Todos os direitos reservados.`} />
          </p>
          <p>
            <EditableText id="footer-disclaimer" defaultValue="As informações neste site têm carácter meramente informativo e não constituem consulta jurídica." multiline />
          </p>
        </div>
      </div>
    </footer>
  );
}
