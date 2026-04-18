import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { areasContent } from "../lib/areas-content";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

export default function AreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = areasContent.find((a) => a.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!area) return;
    // Title & meta description
    document.title = area.meta.title;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", area.meta.description);

    // Keywords
    let metaKw = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement("meta");
      metaKw.setAttribute("name", "keywords");
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute("content", area.meta.keywords.join(", "));

    // OG tags
    const og = (prop: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    og("og:title", area.meta.title);
    og("og:description", area.meta.description);
    og("og:type", "website");

    // JSON-LD: FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: area.faq.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    };

    // JSON-LD: BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://sandramartinsribeiro.pt/" },
        { "@type": "ListItem", position: 2, name: area.h1.split(" — ")[0], item: `https://sandramartinsribeiro.pt/areas/${area.slug}` },
      ],
    };

    // Remove old schemas
    document.querySelectorAll('script[data-area-schema]').forEach((el) => el.remove());

    const faqEl = document.createElement("script");
    faqEl.setAttribute("type", "application/ld+json");
    faqEl.setAttribute("data-area-schema", "faq");
    faqEl.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqEl);

    const bcEl = document.createElement("script");
    bcEl.setAttribute("type", "application/ld+json");
    bcEl.setAttribute("data-area-schema", "breadcrumb");
    bcEl.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(bcEl);

    return () => {
      document.querySelectorAll('script[data-area-schema]').forEach((el) => el.remove());
    };
  }, [area]);

  if (!area) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-6">
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-2xl">
            Área não encontrada.
          </p>
          <Link href="/" className="text-[#C9A84C] underline text-sm">Voltar ao início</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const waMsg = encodeURIComponent(`Olá, gostaria de agendar uma consulta sobre ${area.h1.split(" — ")[0]}.`);

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="bg-[#0D1B2A] pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/30">
              <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Início</Link></li>
              <li className="text-white/20">›</li>
              <li className="text-[#C9A84C]">{area.h1.split(" — ")[0].replace("Direito", "").trim()}</li>
            </ol>
          </nav>

          <ScrollReveal>
            <span className="text-4xl mb-6 block">{area.icon}</span>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-white text-3xl lg:text-5xl font-semibold leading-tight mb-6 max-w-3xl"
            >
              {area.h1}
            </h1>
            <p className="text-[#C9A84C] text-lg lg:text-xl italic max-w-2xl leading-relaxed">
              {area.hook}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl">
              {area.intro.map((para, i) => (
                <p key={i} className="text-[#3A3A3A] text-base lg:text-lg leading-relaxed mb-5 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SERVIÇOS ─── */}
      <section className="py-16 lg:py-24 bg-[#F7F4EE]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">O que fazemos</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[#0D1B2A] text-2xl lg:text-3xl font-semibold mb-12"
            >
              Serviços Incluídos
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {area.servicos.map((s, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-white border-l-2 border-[#C9A84C] p-6 h-full hover:shadow-md transition-shadow duration-300">
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-[#0D1B2A] text-base font-semibold mb-3"
                  >
                    {s.titulo}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFERENCIAIS ─── */}
      <section className="py-16 lg:py-24 bg-[#0D1B2A]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Porquê escolher-nos</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-white text-2xl lg:text-3xl font-semibold mb-12"
            >
              A Nossa Diferença
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {area.diferenciais.map((d, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="border-t border-white/10 pt-6">
                  <div className="w-8 h-px bg-[#C9A84C] mb-5" />
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-white text-base font-semibold mb-3"
                  >
                    {d.titulo}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Perguntas Frequentes</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[#0D1B2A] text-2xl lg:text-3xl font-semibold mb-10"
            >
              Respostas Claras às Suas Dúvidas
            </h2>
          </ScrollReveal>
          <div className="divide-y divide-[#E2DDD5]">
            {area.faq.map((item, i) => (
              <ScrollReveal key={i} delay={i * 40}>
                <div>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left py-5 flex items-start justify-between gap-4 group cursor-pointer"
                    aria-expanded={openFaq === i}
                  >
                    <span
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-[#0D1B2A] text-sm lg:text-base font-medium group-hover:text-[#C9A84C] transition-colors"
                    >
                      {item.pergunta}
                    </span>
                    <span className={`text-[#C9A84C] text-lg flex-shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-5" : "max-h-0"}`}
                  >
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.resposta}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28 bg-[#C9A84C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[#0D1B2A] text-3xl lg:text-4xl font-semibold mb-4"
            >
              {area.cta.titulo}
            </h2>
            <p className="text-[#0D1B2A]/70 text-base mb-10 max-w-xl mx-auto">
              {area.cta.subtitulo}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultas"
                className="inline-block bg-[#0D1B2A] text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#162032] transition-colors duration-300"
              >
                Agendar Consulta
              </Link>
              <a
                href={`https://wa.me/351000000000?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#0D1B2A] text-[#0D1B2A] px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#0D1B2A] hover:text-white transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── OTHER AREAS ─── */}
      <section className="py-16 bg-[#F7F4EE]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Outras áreas</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[#0D1B2A] text-xl font-semibold mb-8"
            >
              Mais Áreas de Prática
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areasContent.filter((a) => a.slug !== slug).map((a, i) => (
              <ScrollReveal key={a.slug} delay={i * 40}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="group bg-white border border-[#E2DDD5] p-5 block hover:border-[#C9A84C] transition-colors duration-300 h-full"
                >
                  <span className="text-2xl mb-3 block">{a.icon}</span>
                  <span
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-[#0D1B2A] text-sm font-medium group-hover:text-[#C9A84C] transition-colors leading-snug block"
                  >
                    {a.h1.split(" — ")[0].replace(/^Advogad[ao] de /, "").replace(/ em Vila do Conde$/, "")}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
