import { CONFIG, hasCalendly } from "../lib/config";

interface Props {
  prefill?: {
    name?: string;
    email?: string;
    area?: string;
    tipo?: "presencial" | "online";
  };
}

export default function CalendlyEmbed({ prefill }: Props) {
  // Build Calendly URL with prefill params if available
  const buildUrl = () => {
    const base = CONFIG.CALENDLY_URL;
    const params = new URLSearchParams();
    if (prefill?.name) params.set("name", prefill.name);
    if (prefill?.email) params.set("email", prefill.email);
    if (prefill?.area) params.set("a1", prefill.area); // custom question 1
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  };

  if (!hasCalendly) {
    // Placeholder shown until the URL is configured
    return (
      <div className="w-full bg-[#F7F4EE] border-2 border-dashed border-[#C9A84C]/40 flex flex-col items-center justify-center py-14 px-8 text-center gap-4">
        <div className="w-12 h-12 bg-[#C9A84C]/10 flex items-center justify-center text-xl mb-1">
          📅
        </div>
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-lg font-semibold">
          Calendário de Agendamento
        </p>
        <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
          Aqui será incorporado o seu calendário Calendly.<br />
          Quando criar a sua conta, cole o link em:
        </p>
        <code className="bg-white border border-[#E2DDD5] text-[#0D1B2A] text-xs px-3 py-1.5 select-all">
          src/web/lib/config.ts → CALENDLY_URL
        </code>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="https://calendly.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
          >
            Criar conta Calendly →
          </a>
          <a
            href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá, gostaria de agendar uma consulta.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
          >
            Agendar via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Live Calendly embed
  return (
    <div className="w-full">
      <iframe
        src={buildUrl()}
        title="Agendar consulta"
        className="w-full border-none"
        style={{ minHeight: 700, height: "70vh" }}
        loading="lazy"
        allow="camera; microphone"
      />
    </div>
  );
}
