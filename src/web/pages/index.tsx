import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ScrollReveal from "../components/ScrollReveal";
import { EditableText } from "../components/EditableText";
import { EditableImage } from "../components/EditableImage";
import { useEditor } from "../components/EditorContext";

const areas = [
  { icon: "⚖", slug: "direito-familia",    title: "Direito da Família",      desc: "Divórcio, regulação do poder paternal, alimentos, adoção e uniões de facto. Acompanhamento humano nas decisões mais difíceis." },
  { icon: "💼", slug: "direito-laboral",    title: "Direito Laboral",          desc: "Despedimentos, rescisões, assédio moral, acidentes de trabalho e negociação de acordos com entidades empregadoras." },
  { icon: "🏠", slug: "direito-imobiliario",title: "Direito Imobiliário",       desc: "Arrendamento, compra e venda, heranças de imóveis, contratos de obras e litígios com promotores imobiliários." },
  { icon: "🛒", slug: "direito-consumidor", title: "Direito do Consumidor",     desc: "Contratos abusivos, reclamações, garantias, serviços financeiros e defesa dos seus direitos enquanto consumidor." },
  { icon: "🔒", slug: "direito-penal",      title: "Direito Penal",             desc: "Defesa criminal, queixas-crime, injúrias, ameaças, violência doméstica e acompanhamento em todas as fases do processo." },
  { icon: "📜", slug: "direito-sucessoes",  title: "Direito das Sucessões",     desc: "Testamentos, habilitação de herdeiros, partilhas judiciais e extrajudiciais, herança jacente." },
  { icon: "🏢", slug: "direito-empresarial",title: "Direito Empresarial",       desc: "Constituição de sociedades, contratos comerciais, trespasse, insolvência e assessoria jurídica a empresas." },
  { icon: "✈",  slug: "direito-imigracao",  title: "Direito da Imigração",      desc: "Vistos, autorizações de residência, reagrupamento familiar, cidadania e apoio a cidadãos estrangeiros em Portugal." },
];

const diferenciais = [
  { num: "01", title: "Proximidade Real",    desc: "Cada cliente tem acesso direto à Dra. Sandra. Não há intermediários — a sua causa é tratada com atenção personalizada do início ao fim." },
  { num: "02", title: "Transparência Total", desc: "Honorários claros desde a primeira reunião. Sem surpresas, sem letras pequenas. Sabe exatamente o que paga e porquê." },
  { num: "03", title: "Processos Digitais",  desc: "Acesso remoto a documentos, consultas por videochamada e comunicação ágil por WhatsApp. Advocacia moderna para o mundo atual." },
  { num: "04", title: "Rigor Ético",         desc: "Inscrita na Ordem dos Advogados Portuguesa. O sigilo profissional e o código deontológico são inegociáveis." },
];

export default function Index() {
  const { editMode, getImage, setImage } = useEditor();
  const heroBg = getImage("hero-bg", "/hero-bg.png");

  const handleHeroBgChange = () => {
    if (!editMode) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setImage("hero-bg", ev.target?.result as string);
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        className={`relative h-screen min-h-[600px] flex items-end pb-20 lg:pb-32 overflow-hidden ${editMode ? "cursor-pointer" : ""}`}
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        onClick={editMode ? (e) => { if (e.target === e.currentTarget) handleHeroBgChange(); } : undefined}
      >
        {editMode && (
          <button
            onClick={(e) => { e.stopPropagation(); handleHeroBgChange(); }}
            className="absolute top-24 right-6 z-20 bg-[#C9A84C] text-[#0D1B2A] text-xs px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#E8C97A] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Substituir imagem de fundo
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/70 to-[#0D1B2A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <p
              className="section-num mb-6"
              style={editMode ? {} : { animation: "fadeInUp 0.6s 0.2s ease forwards", opacity: 0 }}
            >
              <EditableText id="hero-location" defaultValue="Advogada com escritório em Vila do Conde" />
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                ...(editMode ? {} : { animation: "fadeInUp 0.8s 0.4s ease forwards", opacity: 0 }),
              }}
              className="text-5xl md:text-7xl lg:text-[88px] font-semibold text-white leading-[1.05] mb-6"
            >
              <EditableText id="hero-name-1" defaultValue="Sandra Martins" />
              <br />
              <em className="not-italic text-[#C9A84C]">
                <EditableText id="hero-name-2" defaultValue="Ribeiro" />
              </em>
            </h1>
            <div
              style={editMode ? {} : { animation: "fadeInUp 0.8s 0.6s ease forwards", opacity: 0 }}
              className="w-16 h-px bg-[#C9A84C] mb-6"
            />
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                ...(editMode ? {} : { animation: "fadeInUp 0.8s 0.8s ease forwards", opacity: 0 }),
              }}
              className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-10 max-w-xl"
            >
              <EditableText id="hero-tagline" defaultValue="Advocacia de Excelência e Rigor Jurídico" />
            </p>
            <div
              style={editMode ? {} : { animation: "fadeInUp 0.8s 1s ease forwards", opacity: 0 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://wa.me/351936339581?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0D1B2A] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
              >
                <EditableText id="hero-cta-primary" defaultValue="Marcar Consulta" />
              </a>
              <button
                onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-white/40 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
              >
                <EditableText id="hero-cta-secondary" defaultValue="Conhecer Mais" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase rotate-90 translate-x-4">Scroll</span>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── SOBRE ─── */}
      <section id="sobre" className="py-28 lg:py-36 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <EditableImage
                    id="sobre-photo"
                    defaultSrc="/office-interior.png"
                    alt="Escritório Sandra Martins Ribeiro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-3/4 h-3/4 border border-[#C9A84C]/30 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 bg-[#0D1B2A] px-7 py-5">
                  <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#C9A84C] text-3xl font-semibold">
                    <EditableText id="sobre-anos-num" defaultValue="+10" />
                  </p>
                  <p className="text-white/60 text-xs tracking-widest uppercase mt-1">
                    <EditableText id="sobre-anos-label" defaultValue="Anos de Experiência" />
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal delay={200}>
              <p className="section-num mb-2">
                <EditableText id="sobre-section-num" defaultValue="Sobre Mim" />
              </p>
              <div className="w-10 h-px bg-[#C9A84C] mb-8" />
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl lg:text-5xl font-semibold text-[#0D1B2A] leading-tight mb-8"
              >
                <EditableText id="sobre-headline" defaultValue="Uma advogada ao seu lado, em cada passo." multiline />
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                <EditableText id="sobre-p1" defaultValue="Licenciada em Direito na Universidade Católica Portuguesa, Mestre em Direito Geral pela Universidade Católica Portuguesa, inscrita na Ordem dos Advogados Portuguesa, desde 2016, a Dra. Sandra Martins Ribeiro tem construído ao longo de mais de uma década uma prática jurídica assente em dois pilares: rigor técnico e relação próxima com cada cliente." multiline />
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                <EditableText id="sobre-p2" defaultValue="Com sede em Vila do Conde, o escritório serve clientes em todo o território nacional, abrangendo todas as áreas do Direito com especial enfoque nas questões que afetam o dia a dia das famílias e das empresas portuguesas." multiline />
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-10">
                <EditableText id="sobre-p3" defaultValue="Acredita que o Direito deve ser acessível, compreensível e humano — e que cada processo, por mais complexo que seja, merece atenção personalizada." multiline />
              </p>
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-block border border-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white text-[#0D1B2A] px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
              >
                <EditableText id="sobre-cta" defaultValue="Falar com a Dra. Sandra" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── AREAS ─── */}
      <section id="areas" className="py-28 lg:py-36 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="section-num mb-2">
                  <EditableText id="areas-section-num" defaultValue="Áreas de Atuação" />
                </p>
                <div className="w-10 h-px bg-[#C9A84C] mb-6" />
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-lg"
                >
                  <EditableText id="areas-headline" defaultValue="Todas as áreas do Direito, uma equipa." multiline />
                </h2>
              </div>
              <p className="text-white/50 max-w-xs text-sm leading-relaxed">
                <EditableText id="areas-subline" defaultValue="Do contencioso familiar às transações imobiliárias — apoio jurídico completo num único escritório." multiline />
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {areas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 60}>
                <Link href={`/areas/${area.slug}`} className="block h-full">
                  <div className="group bg-[#0D1B2A] hover:bg-[#162032] p-8 transition-all duration-300 border-l-2 border-transparent hover:border-[#C9A84C] h-full flex flex-col">
                    <span className="text-2xl mb-5 block">{area.icon}</span>
                    <h3
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-white font-medium text-lg mb-3 group-hover:text-[#C9A84C] transition-colors"
                    >
                      {area.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed flex-1">{area.desc}</p>
                    <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Saber mais →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-16 bg-[#C9A84C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { idN: "stat1-num", idL: "stat1-label", defN: "+10",   defL: "Anos de Experiência" },
            { idN: "stat2-num", idL: "stat2-label", defN: "+500",  defL: "Clientes Apoiados" },
            { idN: "stat3-num", idL: "stat3-label", defN: "8",     defL: "Áreas de Atuação" },
            { idN: "stat4-num", idL: "stat4-label", defN: "100%",  defL: "Sigilo Garantido" },
          ].map((stat) => (
            <div key={stat.idN} className="text-center">
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-4xl font-bold">
                <EditableText id={stat.idN} defaultValue={stat.defN} />
              </p>
              <p className="text-[#0D1B2A]/70 text-xs tracking-[0.15em] uppercase mt-1">
                <EditableText id={stat.idL} defaultValue={stat.defL} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIFERENCIAIS ─── */}
      <section id="diferenciais" className="py-28 lg:py-36 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="section-num mb-2">
              <EditableText id="dif-section-num" defaultValue="Diferenciais" />
            </p>
            <div className="w-10 h-px bg-[#C9A84C] mb-6" />
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl lg:text-5xl font-semibold text-[#0D1B2A] leading-tight mb-16 max-w-xl"
            >
              <EditableText id="dif-headline" defaultValue="Por que escolher este escritório?" multiline />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E2DDD5]">
            {diferenciais.map((d, i) => (
              <ScrollReveal key={d.num} delay={i * 100}>
                <div className="group bg-[#F7F4EE] hover:bg-white p-10 transition-all duration-300 h-full">
                  <p
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-[#C9A84C]/40 text-5xl font-bold mb-6 group-hover:text-[#C9A84C]/60 transition-colors"
                  >
                    {d.num}
                  </p>
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-[#0D1B2A] text-xl font-semibold mb-4"
                  >
                    <EditableText id={`dif${d.num}-title`} defaultValue={d.title} />
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    <EditableText id={`dif${d.num}-desc`} defaultValue={d.desc} multiline />
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>


        </div>
      </section>

      {/* ─── CHAT CTA ─── */}
      <section className="py-16 bg-[#F7F4EE] border-t border-[#E2DDD5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 relative">
              <img src="/logo-light.png" alt="Sandra Martins Ribeiro" className="w-8 h-8 object-contain" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C9A84C] animate-pulse" />
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold">
                <EditableText id="chat-cta-title" defaultValue="Tem uma dúvida jurídica?" />
              </p>
              <p className="text-[#6B6B6B] text-sm">
                <EditableText id="chat-cta-sub" defaultValue="O gabinete responde de imediato. Sem compromisso." />
              </p>
            </div>
          </div>
          <a
            href="/chat"
            className="flex-shrink-0 bg-[#0D1B2A] hover:bg-[#C9A84C] text-white hover:text-[#0D1B2A] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <EditableText id="chat-cta-btn" defaultValue="Fale Connosco Agora" />
          </a>
        </div>
      </section>

      {/* ─── CONTACTO ─── */}
      <section id="contacto" className="py-28 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info */}
            <ScrollReveal>
              <p className="section-num mb-2">
                <EditableText id="contacto-section-num" defaultValue="Contacto" />
              </p>
              <div className="w-10 h-px bg-[#C9A84C] mb-8" />
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl lg:text-5xl font-semibold text-[#0D1B2A] leading-tight mb-8"
              >
                <EditableText id="contacto-headline" defaultValue="Vamos falar sobre o seu caso." multiline />
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                <EditableText id="contacto-intro" defaultValue="A primeira conversa não tem compromisso. Descreva brevemente a sua situação e a Dra. Sandra responderá em breve para agendar uma reunião consultiva — presencial em Vila do Conde ou por videochamada." multiline />
              </p>

              <Link
                href="/consultas"
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0D1B2A] px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 mb-10"
              >
                Consultas & Agendamento
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <div className="space-y-5 mb-10">
                {[
                  { icon: "📍", idLabel: "contacto-loc-label",   idVal: "contacto-loc-val",   defLabel: "Morada",      defVal: "Av. Dr. João Canavarro 305, 1º andar, sala 17, 4480-872 Vila do Conde",  href: "https://maps.app.goo.gl/vNK8gJQEWJ9yhKAdA" },
                  { icon: "🏢", idLabel: "contacto-edif-label",  idVal: "contacto-edif-val",  defLabel: "Edifício",    defVal: "Alameda Centro Comercial",                                              href: undefined },
                  { icon: "📞", idLabel: "contacto-tel-label",   idVal: "contacto-tel-val",   defLabel: "Telefone",    defVal: "+351 936 339 581",                                                      href: "tel:+351936339581" },
                  { icon: "✉",  idLabel: "contacto-email-label", idVal: "contacto-email-val", defLabel: "Email",       defVal: "sandramartinsribeiro07@gmail.com",                                        href: "mailto:sandramartinsribeiro07@gmail.com" },
                  { icon: "📱", idLabel: "contacto-wa-label",    idVal: "contacto-wa-val",    defLabel: "WhatsApp",    defVal: "Falar via WhatsApp",                                                    href: "https://wa.me/351936339581" },
                  { icon: "in", idLabel: "contacto-li-label",    idVal: "contacto-li-val",    defLabel: "LinkedIn",    defVal: "Ver perfil profissional",                                               href: "https://linkedin.com" },
                ].map((c) => (
                  <div key={c.idLabel} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F7F4EE] flex items-center justify-center text-sm text-[#C9A84C] flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-0.5">
                        <EditableText id={c.idLabel} defaultValue={c.defLabel} />
                      </p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[#0D1B2A] hover:text-[#C9A84C] text-sm font-medium transition-colors">
                          <EditableText id={c.idVal} defaultValue={c.defVal} />
                        </a>
                      ) : (
                        <p className="text-[#0D1B2A] text-sm font-medium">
                          <EditableText id={c.idVal} defaultValue={c.defVal} />
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-52 bg-[#F7F4EE] border border-[#E2DDD5] flex items-center justify-center overflow-hidden">
                <iframe
                  title="Vila do Conde"
                  src="https://maps.google.com/maps?q=41.3518625,-8.7470236&z=17&output=embed"
                  className="w-full h-full border-none"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={200}>
              <div className="bg-[#F7F4EE] p-8 lg:p-10">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-2xl font-semibold mb-2">
                  <EditableText id="form-title" defaultValue="Explique seu problema e descubra como podemos defendê-lo" />
                </h3>
                <p className="text-[#6B6B6B] text-sm mb-8">
                  <EditableText id="form-sub" defaultValue="Resposta em até 24 horas úteis." />
                </p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── WHATSAPP FLOAT ─── */}
      <a
        href="https://wa.me/351936339581?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Sandra."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5a] text-white w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
        title="Falar via WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Footer />
    </div>
  );
}
