import { stepCountIs, type SystemModelMessage, ToolLoopAgent, jsonSchema } from "ai";
import { env } from "cloudflare:workers";
import { createOpenAI } from "@ai-sdk/openai";
import { tool } from "ai";

const openai = createOpenAI({
  baseURL: env.AI_GATEWAY_BASE_URL,
  apiKey: env.AI_GATEWAY_API_KEY,
});

const VILA_DO_CONDE = { lat: 41.3564, lng: -8.7482 };
const SITE_URL = "https://4eu7fhvzk8l481aab3mtjzq4cyh4nljs.runable.site";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const calcularDistancia = tool({
  description:
    "Calcula a distância em km entre uma localização do utilizador e Vila do Conde. " +
    "Usa SEMPRE este tool quando o utilizador mencionar a sua cidade, localização ou país.",
  parameters: jsonSchema<{ localizacao: string }>({
    type: "object",
    properties: {
      localizacao: {
        type: "string",
        description: "Cidade, localidade ou país mencionado pelo utilizador. Ex: Porto, Braga, Lisboa, Brasil, França",
      },
    },
    required: ["localizacao"],
  }),
  execute: async ({ localizacao }) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localizacao + " Portugal")}&format=json&limit=1`;
      const urlFallback = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localizacao)}&format=json&limit=1`;

      let data: Array<{ lat: string; lon: string; display_name: string }> = [];

      const r1 = await fetch(url, { headers: { "User-Agent": "SandraMartinsRibeiro/1.0" } });
      data = await r1.json() as typeof data;

      if (!data || data.length === 0) {
        const r2 = await fetch(urlFallback, { headers: { "User-Agent": "SandraMartinsRibeiro/1.0" } });
        data = await r2.json() as typeof data;
      }

      if (!data || data.length === 0) {
        return { erro: "Localização não encontrada. Pergunta ao utilizador se está em Portugal ou no estrangeiro." };
      }

      const distancia = Math.round(
        haversineKm(parseFloat(data[0].lat), parseFloat(data[0].lon), VILA_DO_CONDE.lat, VILA_DO_CONDE.lng)
      );

      if (distancia <= 20) {
        return {
          distancia_km: distancia,
          recomendacao: "PRESENCIAL",
          link_presencial: `${SITE_URL}/consultas`,
        };
      } else if (distancia <= 50) {
        return {
          distancia_km: distancia,
          recomendacao: "PRESENCIAL_OU_ONLINE",
          link_presencial: `${SITE_URL}/consultas`,
          link_online: `${SITE_URL}/consultas`,
        };
      } else {
        return {
          distancia_km: distancia,
          recomendacao: "ONLINE",
          link_online: `${SITE_URL}/consultas`,
        };
      }
    } catch {
      return { erro: "Erro ao calcular distância. Pergunta ao utilizador se está em Portugal ou no estrangeiro." };
    }
  },
});

const INSTRUCTIONS: SystemModelMessage[] = [
  {
    role: "system",
    content: `És o Assistente Virtual do Escritório de Advocacia Sandra Martins Ribeiro, com sede em Vila do Conde, Portugal.

Comunicas sempre em Português de Portugal, com tratamento formal. Usa "marcação" (não "agendamento"), "contacto" (não "contato"). Quando usas termos técnicos, explica-os em linguagem simples.

━━━━━━━━━━━━━━━━━━
OBJETIVO
━━━━━━━━━━━━━━━━━━
Esclarecer dúvidas jurídicas com base exclusiva na legislação portuguesa, conduzindo sempre para marcação de consulta com a Dra. Sandra Martins Ribeiro. Nunca cites legislação estrangeira.

━━━━━━━━━━━━━━━━━━
ÁREAS DE ATUAÇÃO
━━━━━━━━━━━━━━━━━━
Direito da Família · Laboral · Imobiliário · Consumidor · Penal · Sucessões · Empresarial · Imigração

━━━━━━━━━━━━━━━━━━
REGRAS
━━━━━━━━━━━━━━━━━━
1. Não pedes nome nem dados pessoais no início — só quando o utilizador quiser marcar consulta.
2. Respostas jurídicas: conceitos gerais da lei portuguesa, NUNCA parecer definitivo. Usa linguagem condicional.
3. Após cada resposta jurídica, conduz sempre para marcação de consulta.
4. Urgências: empatia + WhatsApp https://wa.me/351936339581
5. Respostas curtas — máx. 3 a 5 parágrafos.

━━━━━━━━━━━━━━━━━━
TRIAGEM POR DISTÂNCIA — OBRIGATÓRIO
━━━━━━━━━━━━━━━━━━
Sempre que o utilizador mencionar a sua localização (cidade, região, país), USA OBRIGATORIAMENTE o tool "calcularDistancia" e depois responde com base no resultado:

• recomendacao = "PRESENCIAL" (≤ 20 km) → Recomenda consulta presencial:
"Dado que se encontra próximo/a de Vila do Conde, recomendamos uma consulta presencial. Pode marcar diretamente aqui: [Marcar Consulta Presencial](link_presencial)"

• recomendacao = "PRESENCIAL_OU_ONLINE" (20–50 km) → Oferece ambas:
"Dado que se encontra a cerca de X km de Vila do Conde, pode optar por consulta presencial no escritório ou, se preferir, por videoconferência:
— [Marcar Consulta Presencial](link_presencial)
— [Marcar Consulta Online](link_online)"

• recomendacao = "ONLINE" (> 50 km ou estrangeiro) → Recomenda online:
"Dado que se encontra a X km de Vila do Conde, recomendamos uma consulta por videoconferência, mais prática para a sua situação. Pode marcar aqui: [Marcar Consulta Online](link_online)"

Se a localização não for mencionada e houver intenção de marcar, pergunta:
"De onde nos contacta? Assim indico-lhe a modalidade mais adequada — presencial em Vila do Conde ou por videoconferência."

━━━━━━━━━━━━━━━━━━
APRESENTAÇÃO INICIAL
━━━━━━━━━━━━━━━━━━
"Olá! Bem-vindo/a ao Escritório Sandra Martins Ribeiro. Em que posso ajudá-lo/a hoje?"

━━━━━━━━━━━━━━━━━━
NOTA
━━━━━━━━━━━━━━━━━━
As informações têm carácter informativo e não constituem consulta jurídica formal.`,
  },
];

export const agent = new ToolLoopAgent({
  model: openai.chat("anthropic/claude-haiku-4.5"),
  instructions: INSTRUCTIONS,
  tools: { calcularDistancia },
  stopWhen: [stepCountIs(20)],
});
