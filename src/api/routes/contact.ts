import { Hono } from "hono";

export const contactRoutes = new Hono<{ Bindings: CloudflareBindings }>();

contactRoutes.post("/", async (c) => {
  const { nome, email, telefone, assunto, mensagem, tipo, data, hora, descricao } = await c.req.json();

  if (!nome || !email) {
    return c.json({ error: "Nome e email são obrigatórios." }, 400);
  }

  const isBooking = !!tipo;
  const subject = isBooking
    ? `📅 Nova marcação: ${assunto || "Área não especificada"} — ${nome}`
    : `✉ Nova mensagem de contacto — ${nome}`;

  const html = isBooking ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0D1B2A; padding: 24px 32px;">
        <h1 style="color: #C9A84C; font-size: 20px; margin: 0;">Nova Marcação de Consulta</h1>
      </div>
      <div style="background: #F7F4EE; padding: 32px; border: 1px solid #E2DDD5;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Tipo</td><td style="padding: 8px 0; font-weight: bold; color: #0D1B2A;">${tipo === "presencial" ? "📍 Presencial" : "🎥 Online"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nome</td><td style="padding: 8px 0; color: #0D1B2A;">${nome}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
          ${telefone ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefone</td><td style="padding: 8px 0; color: #0D1B2A;">${telefone}</td></tr>` : ""}
          ${assunto ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Área</td><td style="padding: 8px 0; color: #0D1B2A;">${assunto}</td></tr>` : ""}
          ${data ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Data</td><td style="padding: 8px 0; color: #0D1B2A;">${data}</td></tr>` : ""}
          ${hora ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hora</td><td style="padding: 8px 0; color: #0D1B2A;">${hora}</td></tr>` : ""}
          ${descricao ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Descrição</td><td style="padding: 8px 0; color: #0D1B2A;">${descricao}</td></tr>` : ""}
        </table>
      </div>
      <div style="background: #0D1B2A; padding: 16px 32px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Sandra Martins Ribeiro — Advogada</p>
      </div>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0D1B2A; padding: 24px 32px;">
        <h1 style="color: #C9A84C; font-size: 20px; margin: 0;">Nova Mensagem de Contacto</h1>
      </div>
      <div style="background: #F7F4EE; padding: 32px; border: 1px solid #E2DDD5;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Nome</td><td style="padding: 8px 0; color: #0D1B2A;">${nome}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
          ${telefone ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefone</td><td style="padding: 8px 0; color: #0D1B2A;">${telefone}</td></tr>` : ""}
          ${assunto ? `<tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Área</td><td style="padding: 8px 0; color: #0D1B2A;">${assunto}</td></tr>` : ""}
        </table>
        ${mensagem ? `<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2DDD5;"><p style="color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Mensagem</p><p style="color: #0D1B2A; line-height: 1.6;">${mensagem}</p></div>` : ""}
      </div>
      <div style="background: #0D1B2A; padding: 16px 32px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Sandra Martins Ribeiro — Advogada</p>
      </div>
    </div>
  `;

  const resendKey = (c.env as any)?.RESEND_API_KEY || process.env.RESEND_API_KEY_SANDRA || process.env.RESEND_API_KEY || "";

  try {
    // Email para a Sandra
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "noreply@sandramartinsribeiroadvogada.pt",
        to: "sandramartinsribeiro07@gmail.com",
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return c.json({ error: "Falha ao enviar email." }, 500);
    }

    // Email de confirmação ao cliente (só para marcações)
    if (isBooking) {
      const confirmHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0D1B2A; padding: 24px 32px;">
            <h1 style="color: #C9A84C; font-size: 20px; margin: 0;">Pedido de Consulta Recebido</h1>
          </div>
          <div style="background: #F7F4EE; padding: 32px; border: 1px solid #E2DDD5;">
            <p style="color: #0D1B2A; font-size: 15px; margin-bottom: 16px;">Caro/a <strong>${nome}</strong>,</p>
            <p style="color: #6B6B6B; line-height: 1.7; margin-bottom: 20px;">
              O seu pedido de consulta foi recebido com sucesso. A <strong>Dra. Sandra Martins Ribeiro</strong> está a verificar a disponibilidade para a data e hora solicitadas.
            </p>
            <div style="background: #FFF8E7; border-left: 3px solid #C9A84C; padding: 16px 20px; margin-bottom: 20px;">
              <p style="color: #0D1B2A; font-size: 13px; margin: 0 0 6px 0; font-weight: bold;">⚠️ Pedido sujeito a confirmação</p>
              <p style="color: #6B6B6B; font-size: 13px; margin: 0; line-height: 1.6;">
                Receberá a confirmação da consulta e horário no prazo máximo de <strong>24 horas úteis</strong>.
              </p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${data ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Data pedida</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: bold;">${data}</td></tr>` : ""}
              ${hora ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hora pedida</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: bold;">${hora}</td></tr>` : ""}
              <tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Modalidade</td><td style="padding: 6px 0; color: #0D1B2A;">${tipo === "presencial" ? "📍 Presencial" : "🎥 Online"}</td></tr>
              ${assunto ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Área</td><td style="padding: 6px 0; color: #0D1B2A;">${assunto}</td></tr>` : ""}
            </table>
            <p style="color: #6B6B6B; font-size: 13px; line-height: 1.6;">
              Caso necessite de alterar ou cancelar, contacte-nos via 
              <a href="https://wa.me/351936339581" style="color: #C9A84C;">WhatsApp</a> ou responda a este email.
            </p>
          </div>
          <div style="background: #0D1B2A; padding: 16px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Sandra Martins Ribeiro — Advogada · Vila do Conde</p>
          </div>
        </div>
      `;
      // Enviar confirmação ao cliente (erro não bloqueia a resposta)
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "noreply@sandramartinsribeiroadvogada.pt",
          to: email,
          subject: `Pedido de consulta recebido — Sandra Martins Ribeiro`,
          html: confirmHtml,
        }),
      }).catch(() => {});
    }

    return c.json({ ok: true });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return c.json({ error: "Falha ao enviar email." }, 500);
  }
});
