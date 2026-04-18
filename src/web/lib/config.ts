// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DO ESCRITÓRIO — edite aqui quando necessário
// ─────────────────────────────────────────────────────────────

export const CONFIG = {
  // Quando criar a conta Calendly, substitua o valor abaixo pelo seu link:
  // Ex: "https://calendly.com/sandra-martins-ribeiro"
  CALENDLY_URL: "", // ← COLE AQUI O SEU LINK CALENDLY

  whatsapp: "351936339581",
  email: "sandramartinsribeiro07@gmail.com",
  localidade: "Vila do Conde",
  linkedin: "https://linkedin.com/in/sandra-martins-ribeiro",
};

// Helpers
export const whatsappLink = (msg = "Olá, gostaria de agendar uma consulta.") =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

export const hasCalendly = CONFIG.CALENDLY_URL.length > 0;
