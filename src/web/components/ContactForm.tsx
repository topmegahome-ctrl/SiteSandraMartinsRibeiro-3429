import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [rgpd, setRgpd] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rgpd) return alert("Por favor, aceite a Política de Privacidade para continuar.");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <span className="gold-rule mx-auto" />
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#0D1B2A] mb-4">
          Mensagem recebida.
        </p>
        <p className="text-[#6B6B6B]">A Dra. Sandra irá contactá-lo/a brevemente.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-16">
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl text-red-500 mb-4">
          Ocorreu um erro ao enviar.
        </p>
        <p className="text-[#6B6B6B] mb-6">Por favor tente novamente ou contacte diretamente via WhatsApp.</p>
        <button onClick={() => setStatus("idle")} className="border border-[#0D1B2A] text-[#0D1B2A] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#0D1B2A] hover:text-white transition-all cursor-pointer">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">Nome Completo *</label>
          <input required type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full border border-[#E2DDD5] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] transition-colors" />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-[#E2DDD5] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] transition-colors" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">Telefone / WhatsApp</label>
          <input type="tel" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            className="w-full border border-[#E2DDD5] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] transition-colors" />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">Área Jurídica</label>
          <select value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })}
            className="w-full border border-[#E2DDD5] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] transition-colors">
            <option value="">Selecione uma área...</option>
            <option>Direito da Família</option>
            <option>Direito Laboral</option>
            <option>Direito Imobiliário</option>
            <option>Direito do Consumidor</option>
            <option>Direito Penal</option>
            <option>Direito das Sucessões</option>
            <option>Direito Empresarial</option>
            <option>Direito da Imigração</option>
            <option>Outra</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">Mensagem *</label>
        <textarea required rows={5} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          placeholder="Descreva brevemente a sua situação (sem partilhar dados pessoais sensíveis nesta fase)..."
          className="w-full border border-[#E2DDD5] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none" />
      </div>
      <div className="flex items-start gap-3">
        <input id="rgpd" type="checkbox" checked={rgpd} onChange={(e) => setRgpd(e.target.checked)} className="mt-1 accent-[#C9A84C]" />
        <label htmlFor="rgpd" className="text-xs text-[#6B6B6B] leading-relaxed">
          Declaro que li e aceito a{" "}
          <a href="/privacidade" className="text-[#C9A84C] underline hover:text-[#E8C97A]">Política de Privacidade</a>.
          {" "}Os meus dados serão tratados ao abrigo do RGPD e do sigilo profissional do escritório.
        </label>
      </div>
      <button type="submit" disabled={status === "sending"}
        className="bg-[#0D1B2A] hover:bg-[#C9A84C] text-white hover:text-[#0D1B2A] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer">
        {status === "sending" ? "A enviar..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
