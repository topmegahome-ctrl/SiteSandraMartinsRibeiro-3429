import { useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { EditableText } from "../components/EditableText";
import { CONFIG } from "../lib/config";

type ConsultaType = "presencial" | "online" | null;

// Feriados portugueses fixos (MM-DD) + móveis calculados
function getFeriadosPortugal(year: number): Set<string> {
  const fixed = [
    `${year}-01-01`, // Ano Novo
    `${year}-04-25`, // Liberdade
    `${year}-05-01`, // Trabalhador
    `${year}-06-10`, // Portugal
    `${year}-08-15`, // Assunção
    `${year}-10-05`, // República
    `${year}-11-01`, // Todos os Santos
    `${year}-12-01`, // Restauração
    `${year}-12-08`, // Imaculada Conceição
    `${year}-12-25`, // Natal
  ];
  // Páscoa (algoritmo de Meeus/Jones/Butcher)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(year, month - 1, day);

  const sexta = new Date(easter); sexta.setDate(easter.getDate() - 2);
  const carnaval = new Date(easter); carnaval.setDate(easter.getDate() - 47);
  const corpusChristi = new Date(easter); corpusChristi.setDate(easter.getDate() + 60);

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  return new Set([...fixed, fmt(sexta), fmt(carnaval), fmt(corpusChristi)]);
}

const HORAS = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_SEMANA = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

const tiposConsulta = [
  { id: "familia",    slug: "direito-familia",    icon: "👨‍👩‍👧", title: "Direito da Família",     desc: "Divórcio, separação, regulação do exercício das responsabilidades parentais, alimentos, adoção e uniões de facto.", items: ["Divórcio por mútuo acordo","Divórcio litigioso","Regulação do poder paternal","Pensão de alimentos","Adoção","União de facto"], duration: "60 min" },
  { id: "laboral",    slug: "direito-laboral",    icon: "💼", title: "Direito Laboral",          desc: "Acompanhamento em processos de despedimento, rescisão, assédio moral ou sexual e acidentes de trabalho.", items: ["Despedimento ilícito","Rescisão com justa causa","Assédio moral / sexual","Acidentes de trabalho","Negociação de acordos","Contratos de trabalho"], duration: "60 min" },
  { id: "imobiliario",slug: "direito-imobiliario",icon: "🏠", title: "Direito Imobiliário",      desc: "Compra, venda e arrendamento de imóveis, contratos, litígios com senhorios ou promotores.", items: ["Contratos de arrendamento","Compra e venda de imóveis","Despejo judicial","Litígios de obras","Due diligence imobiliária","Divisão de imóveis em herança"], duration: "60 min" },
  { id: "consumidor", slug: "direito-consumidor", icon: "🛒", title: "Direito do Consumidor",    desc: "Defesa dos seus direitos perante empresas, bancos, seguradoras ou prestadores de serviços.", items: ["Contratos abusivos","Reclamações a empresas","Litígios bancários","Seguros e indemnizações","Garantias de produtos","Serviços de telecomunicações"], duration: "45 min" },
  { id: "penal",      slug: "direito-penal",      icon: "⚖", title: "Direito Penal",            desc: "Defesa criminal, apresentação de queixas-crime e acompanhamento em todas as fases do processo penal.", items: ["Defesa criminal","Queixa-crime","Injúrias e difamação","Ameaças e coação","Violência doméstica","Burla e fraude"], duration: "60 min" },
  { id: "sucessoes",  slug: "direito-sucessoes",  icon: "📜", title: "Direito das Sucessões",    desc: "Testamentos, habilitação de herdeiros, partilhas judiciais e extrajudiciais de bens.", items: ["Elaboração de testamento","Habilitação de herdeiros","Partilha de herança","Impugnação de testamento","Herança jacente","Doações em vida"], duration: "60 min" },
  { id: "empresarial",slug: "direito-empresarial",icon: "🏢", title: "Direito Empresarial",      desc: "Constituição e gestão de sociedades, contratos comerciais, insolvência e assessoria jurídica contínua.", items: ["Constituição de sociedades","Contratos comerciais","Trespasse e cessão","Insolvência empresarial","Acordos de sócios","Assessoria jurídica mensal"], duration: "90 min" },
  { id: "imigracao",  slug: "direito-imigracao",  icon: "✈", title: "Direito da Imigração",     desc: "Apoio a cidadãos estrangeiros em Portugal: vistos, autorizações de residência e reagrupamento familiar.", items: ["Autorização de residência","Reagrupamento familiar","Visto D7 / NHR","Golden Visa","Cidadania portuguesa","Renovação de documentos"], duration: "60 min" },
];

interface BookingFormProps {
  tipo: ConsultaType;
  onClose: () => void;
  preSelectedArea?: string;
}

function CalendarPicker({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 28); // 4 semanas

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const feriados2025 = getFeriadosPortugal(2025);
  const feriados2026 = getFeriadosPortugal(2026);
  const feriados2027 = getFeriadosPortugal(2027);
  const allFeriados = new Set([...feriados2025, ...feriados2026, ...feriados2027]);

  const isDisabled = (date: Date) => {
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return true; // fim de semana
    if (date < today) return true;           // passado
    if (date > maxDate) return true;         // > 4 semanas
    const pad = (n: number) => String(n).padStart(2, "0");
    const key = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
    if (allFeriados.has(key)) return true;   // feriado
    return false;
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="bg-[#F7F4EE] p-4 border border-[#E2DDD5]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-[#E2DDD5] transition-colors text-[#0D1B2A]">‹</button>
        <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] font-semibold text-sm">
          {MESES[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-[#E2DDD5] transition-colors text-[#0D1B2A]">›</button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DIAS_SEMANA.map(d => (
          <div key={d} className={`text-center text-[9px] tracking-widest uppercase pb-1 ${d === "Dom" || d === "Sáb" ? "text-[#ccc]" : "text-[#6B6B6B]"}`}>{d}</div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(viewYear, viewMonth, day);
          const disabled = isDisabled(date);
          const pad = (n: number) => String(n).padStart(2,"0");
          const key = `${viewYear}-${pad(viewMonth+1)}-${pad(day)}`;
          const selected = value === key;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(key)}
              className={`
                h-8 text-xs font-medium transition-all duration-150
                ${disabled ? "text-[#ccc] cursor-not-allowed" : "cursor-pointer hover:bg-[#C9A84C]/20 text-[#0D1B2A]"}
                ${selected ? "!bg-[#C9A84C] !text-[#0D1B2A] font-bold" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookingModal({ tipo, onClose, preSelectedArea = "" }: BookingFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: preSelectedArea,
    data: "",
    hora: "",
    descricao: "",
  });
  const [rgpd, setRgpd] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rgpd) return alert("Por favor, aceite a Política de Privacidade.");
    if (!form.data || !form.hora) return alert("Por favor, selecione data e hora.");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tipo }),
      });
      setStatus(res.ok ? "success" : "idle");
      if (!res.ok) alert("Erro ao enviar. Por favor tente novamente.");
    } catch {
      setStatus("idle");
      alert("Erro ao enviar. Por favor tente novamente.");
    }
  };

  // Formatar data para exibição
  const dataFormatada = form.data
    ? new Date(form.data + "T12:00:00").toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1B2A]/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`p-6 ${tipo === "presencial" ? "bg-[#0D1B2A]" : "bg-[#162032]"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase mb-1">
                {tipo === "presencial" ? "📍 Consulta Presencial" : "🎥 Consulta Online"}
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-xl font-semibold">
                {tipo === "presencial" ? "Agendar no Escritório" : "Agendar Videoconferência"}
              </h3>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none cursor-pointer">×</button>
          </div>
          {/* Steps */}
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex items-center gap-1.5 text-[10px] tracking-widest uppercase ${step === 1 ? "text-[#C9A84C]" : "text-white/40"}`}>
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${step === 1 ? "bg-[#C9A84C] text-[#0D1B2A]" : "bg-white/20 text-white"}`}>1</span>
              Data & Hora
            </div>
            <div className="flex-1 h-px bg-white/20" />
            <div className={`flex items-center gap-1.5 text-[10px] tracking-widest uppercase ${step === 2 ? "text-[#C9A84C]" : "text-white/40"}`}>
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${step === 2 ? "bg-[#C9A84C] text-[#0D1B2A]" : "bg-white/20 text-white"}`}>2</span>
              Seus Dados
            </div>
          </div>
        </div>

        {/* SUCCESS */}
        {status === "success" ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
            <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-2xl font-semibold mb-3">Pedido registado!</h4>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-2">
              Receberá brevemente um email de confirmação.
            </p>
            <div className="bg-[#F7F4EE] border border-[#E2DDD5] p-4 my-6 text-left">
              <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-2">Resumo do pedido</p>
              <p className="text-sm text-[#0D1B2A] font-medium">{dataFormatada} às {form.hora}</p>
              <p className="text-sm text-[#6B6B6B]">{form.assunto || "Área não especificada"}</p>
            </div>
            <p className="text-[#6B6B6B] text-xs leading-relaxed mb-6 bg-[#FFF8E7] border border-[#C9A84C]/30 p-3">
              ⚠️ <strong>Pedido sujeito a confirmação.</strong> A Dra. Sandra Martins Ribeiro irá verificar a disponibilidade e confirmar a consulta por email no prazo máximo de 24 horas úteis.
            </p>
            <button onClick={onClose} className="border border-[#0D1B2A] text-[#0D1B2A] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#0D1B2A] hover:text-white transition-all cursor-pointer">Fechar</button>
          </div>
        ) : step === 1 ? (
          /* STEP 1 — Calendário */
          <div className="p-6">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-4">Escolha a data</h4>
            <CalendarPicker value={form.data} onChange={(d) => setForm({ ...form, data: d, hora: "" })} />

            {form.data && (
              <div className="mt-5">
                <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
                  Escolha a hora — <span className="text-[#C9A84C] normal-case font-medium">{dataFormatada}</span>
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {HORAS.map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setForm({ ...form, hora: h })}
                      className={`
                        py-2.5 text-sm font-medium border transition-all duration-150 cursor-pointer
                        ${form.hora === h
                          ? "bg-[#C9A84C] border-[#C9A84C] text-[#0D1B2A] font-bold"
                          : "border-[#E2DDD5] text-[#0D1B2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10"}
                      `}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <p className="text-[10px] text-[#6B6B6B]">Dias úteis · Feriados excluídos · Máx. 4 semanas</p>
              <button
                type="button"
                disabled={!form.data || !form.hora}
                onClick={() => setStep(2)}
                className="bg-[#0D1B2A] disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-all duration-300 cursor-pointer"
              >
                Continuar →
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2 — Dados pessoais */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Resumo escolha */}
            <div className="bg-[#F7F4EE] border border-[#E2DDD5] px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B]">Data selecionada</p>
                <p className="text-sm font-semibold text-[#0D1B2A]">{dataFormatada} às {form.hora}</p>
              </div>
              <button type="button" onClick={() => setStep(1)} className="text-[10px] text-[#C9A84C] underline cursor-pointer">Alterar</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5">Nome Completo *</label>
                <input required type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full border border-[#E2DDD5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[#E2DDD5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5">Telefone / WhatsApp</label>
                <input type="tel" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="w-full border border-[#E2DDD5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5">Área Jurídica *</label>
                <select required value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })} className="w-full border border-[#E2DDD5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] bg-white">
                  <option value="">Selecione...</option>
                  {tiposConsulta.map((t) => <option key={t.id}>{t.title}</option>)}
                  <option>Outra</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5">Descrição Breve</label>
                <textarea rows={3} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva a sua situação brevemente (sem partilhar dados sensíveis nesta fase)..." className="w-full border border-[#E2DDD5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] resize-none" />
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#F7F4EE] p-3">
              <input id="rgpd-modal" type="checkbox" checked={rgpd} onChange={(e) => setRgpd(e.target.checked)} className="mt-0.5 accent-[#C9A84C]" />
              <label htmlFor="rgpd-modal" className="text-[11px] text-[#6B6B6B] leading-relaxed">
                Aceito a <a href="/privacidade" className="text-[#C9A84C] underline">Política de Privacidade</a>. Os meus dados são tratados com total confidencialidade e segurança (RGPD).
              </label>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="border border-[#E2DDD5] text-[#6B6B6B] px-5 py-3 text-xs tracking-widest uppercase hover:border-[#0D1B2A] hover:text-[#0D1B2A] transition-all cursor-pointer">
                ← Voltar
              </button>
              <button type="submit" disabled={status === "sending"} className="flex-1 bg-[#0D1B2A] hover:bg-[#C9A84C] text-white hover:text-[#0D1B2A] py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer">
                {status === "sending" ? "A registar..." : tipo === "presencial" ? "Confirmar Consulta Presencial" : "Confirmar Videoconferência"}
              </button>
            </div>
            <p className="text-center text-[10px] text-[#6B6B6B]">
              Ou contacte diretamente via <a href="https://wa.me/351936339581" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C]">WhatsApp</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Consultas() {
  const [modalTipo, setModalTipo] = useState<ConsultaType>(null);
  const [preArea, setPreArea] = useState("");

  const openModal = (tipo: ConsultaType, area = "") => {
    setPreArea(area);
    setModalTipo(tipo);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ─── PAGE HERO ─── */}
      <section className="bg-[#0D1B2A] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="section-num mb-3">
              <EditableText id="serv-hero-label" defaultValue="Serviços" />
            </p>
            <div className="w-10 h-px bg-[#C9A84C] mb-7" />
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl lg:text-7xl font-semibold text-white leading-tight mb-6 max-w-3xl">
              <EditableText id="serv-hero-title-1" defaultValue="Consultas &" />
              <br /><em className="text-[#C9A84C]"><EditableText id="serv-hero-title-2" defaultValue="Agendamento" /></em>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              <EditableText id="serv-hero-sub" defaultValue="Escolha o tipo de consulta que melhor se adapta à sua situação. Atendimento presencial em Vila do Conde ou por videoconferência — disponível para todo o país e estrangeiro." multiline />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BOOKING CARDS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-center text-[#6B6B6B] text-[10px] tracking-[0.3em] uppercase mb-3">
              <EditableText id="serv-cards-label" defaultValue="Como prefere ser atendido?" />
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl lg:text-4xl font-semibold text-[#0D1B2A] text-center mb-14">
              <EditableText id="serv-cards-title" defaultValue="Escolha o seu tipo de consulta" />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card Presencial */}
            <ScrollReveal delay={0}>
              <div className="group border-2 border-[#E2DDD5] hover:border-[#C9A84C] bg-[#F7F4EE] hover:bg-white p-10 transition-all duration-400 cursor-default flex flex-col h-full">
                <div className="w-14 h-14 bg-[#0D1B2A] flex items-center justify-center mb-7 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-2xl font-semibold mb-4">
                  <EditableText id="serv-presencial-title" defaultValue="Consulta Presencial" />
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-3 flex-1">
                  <EditableText id="serv-presencial-desc" defaultValue="Atendimento personalizado no escritório em Vila do Conde. O ambiente confidencial e reservado é ideal para partilhar os detalhes do seu caso com toda a tranquilidade." multiline />
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    { id: "serv-presencial-item1", def: "Análise de documentos em tempo real" },
                    { id: "serv-presencial-item2", def: "Ambiente 100% confidencial" },
                    { id: "serv-presencial-item3", def: "Duração: 60 minutos" },
                    { id: "serv-presencial-item4", def: "Morada enviada por confirmação" },
                  ].map((item) => (
                    <li key={item.id} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <span className="text-[#C9A84C] text-xs">—</span>
                      <EditableText id={item.id} defaultValue={item.def} />
                    </li>
                  ))}
                </ul>
                <button onClick={() => openModal("presencial")} className="w-full bg-[#0D1B2A] group-hover:bg-[#C9A84C] text-white group-hover:text-[#0D1B2A] py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer">
                  <EditableText id="serv-presencial-btn" defaultValue="Agendar no Escritório" />
                </button>
              </div>
            </ScrollReveal>

            {/* Card Online */}
            <ScrollReveal delay={120}>
              <div className="group border-2 border-[#E2DDD5] hover:border-[#C9A84C] bg-[#F7F4EE] hover:bg-white p-10 transition-all duration-400 cursor-default flex flex-col h-full relative">
                <div className="absolute -top-3 right-8 bg-[#C9A84C] text-[#0D1B2A] text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                  <EditableText id="serv-online-badge" defaultValue="Todo o País" />
                </div>
                <div className="w-14 h-14 bg-[#0D1B2A] flex items-center justify-center mb-7 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-2xl font-semibold mb-4">
                  <EditableText id="serv-online-title" defaultValue="Consulta Online" />
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-3 flex-1">
                  <EditableText id="serv-online-desc" defaultValue="Videochamada segura via Zoom ou Teams, disponível para todo o país e estrangeiro. Sem deslocações, com a mesma validade jurídica." multiline />
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    { id: "serv-online-item1", def: "Zoom ou Microsoft Teams" },
                    { id: "serv-online-item2", def: "Disponível para Portugal e estrangeiro" },
                    { id: "serv-online-item3", def: "Sem deslocações necessárias" },
                    { id: "serv-online-item4", def: "Mesma qualidade e validade jurídica" },
                  ].map((item) => (
                    <li key={item.id} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <span className="text-[#C9A84C] text-xs">—</span>
                      <EditableText id={item.id} defaultValue={item.def} />
                    </li>
                  ))}
                </ul>
                <button onClick={() => openModal("online")} className="w-full bg-[#0D1B2A] group-hover:bg-[#C9A84C] text-white group-hover:text-[#0D1B2A] py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer">
                  <EditableText id="serv-online-btn" defaultValue="Agendar Videoconferência" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-4 h-px bg-[#C9A84C]" />
              <p className="text-[#6B6B6B] text-[11px] text-center">
                <EditableText id="serv-rgpd-note" defaultValue="🔒 Os seus dados são tratados com total confidencialidade e segurança (RGPD) · Sigilo profissional garantido" />
              </p>
              <div className="w-4 h-px bg-[#C9A84C]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TIPOS DE CONSULTA ─── */}
      <section className="py-24 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="section-num mb-2">
              <EditableText id="serv-tipos-label" defaultValue="Áreas" />
            </p>
            <div className="w-10 h-px bg-[#C9A84C] mb-7" />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-4">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold text-[#0D1B2A] leading-tight max-w-lg">
                <EditableText id="serv-tipos-title" defaultValue="Tipos de consulta disponíveis" multiline />
              </h2>
              <p className="text-[#6B6B6B] max-w-xs text-sm leading-relaxed">
                <EditableText id="serv-tipos-sub" defaultValue="Clique numa área para agendar uma consulta diretamente associada ao seu tema jurídico." multiline />
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-[#E2DDD5]">
            {tiposConsulta.map((tipo, i) => (
              <ScrollReveal key={tipo.id} delay={i * 50}>
                <div className="group bg-[#F7F4EE] hover:bg-white p-8 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{tipo.icon}</span>
                      <Link href={`/areas/${tipo.slug}`}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold hover:text-[#C9A84C] transition-colors cursor-pointer">
                          {tipo.title}
                        </h3>
                      </Link>
                    </div>
                    <span className="text-[10px] text-[#C9A84C] tracking-widest uppercase bg-[#C9A84C]/10 px-2 py-1 flex-shrink-0">
                      {tipo.duration}
                    </span>
                  </div>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5 flex-1">{tipo.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tipo.items.map((item) => (
                      <span key={item} className="text-[10px] tracking-wide text-[#6B6B6B] border border-[#E2DDD5] px-2 py-0.5">{item}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => openModal("presencial", tipo.title)} className="flex-1 border border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer">
                      Presencial
                    </button>
                    <button onClick={() => openModal("online", tipo.title)} className="flex-1 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer">
                      Online
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl lg:text-4xl font-semibold text-white text-center mb-14">
              <EditableText id="serv-how-title" defaultValue="Como funciona o processo?" />
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: "01", icon: "📋", idT: "serv-step1-title", idD: "serv-step1-desc", defT: "Pedido",      defD: "Escolhe data e hora no calendário e preenche os seus dados." },
              { n: "02", icon: "📅", idT: "serv-step2-title", idD: "serv-step2-desc", defT: "Confirmação", defD: "A Dra. Sandra verifica disponibilidade e confirma em até 24h úteis." },
              { n: "03", icon: "⚖",  idT: "serv-step3-title", idD: "serv-step3-desc", defT: "Consulta",    defD: "Reunião presencial no escritório ou videoconferência segura via Zoom/Teams." },
              { n: "04", icon: "📄", idT: "serv-step4-title", idD: "serv-step4-desc", defT: "Estratégia",  defD: "Definição do caminho jurídico mais adequado ao seu caso concreto." },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div className="text-center">
                  <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#C9A84C]/30 text-5xl font-bold mb-4">{step.n}</p>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold mb-2">
                    <EditableText id={step.idT} defaultValue={step.defT} />
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    <EditableText id={step.idD} defaultValue={step.defD} multiline />
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#C9A84C]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl lg:text-4xl font-semibold text-[#0D1B2A] mb-4">
              <EditableText id="serv-cta-title" defaultValue="Não sabe por onde começar?" />
            </h2>
            <p className="text-[#0D1B2A]/70 mb-8 leading-relaxed">
              <EditableText id="serv-cta-sub" defaultValue="Contacte diretamente via WhatsApp. A Dr. Sandra irá orientá-lo/a para o tipo de consulta mais adequado ao seu caso." multiline />
            </p>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá, gostaria de saber que tipo de consulta é mais adequada para a minha situação.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0D1B2A] text-white hover:bg-[#162032] px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <EditableText id="serv-cta-btn" defaultValue="Falar diretamente com a Dra. Sandra" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {modalTipo && (
        <BookingModal tipo={modalTipo} onClose={() => setModalTipo(null)} preSelectedArea={preArea} />
      )}

      <a href="https://wa.me/351936339581" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1ebe5a] text-white w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
