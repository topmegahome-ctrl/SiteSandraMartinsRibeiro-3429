import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-36 pb-24">
        <p className="section-num mb-2">Legal</p>
        <div className="w-10 h-px bg-[#C9A84C] mb-8" />
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-semibold text-[#0D1B2A] mb-10">
          Avisos Legais
        </h1>
        <div className="prose prose-sm max-w-none text-[#6B6B6B] leading-relaxed space-y-6">
          <p><strong className="text-[#0D1B2A]">Última atualização:</strong> Abril 2026</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">1. Identificação</h2>
          <p><strong className="text-[#0D1B2A]">Titular do Website:</strong> Sandra Martins Ribeiro, Advogada<br />
          <strong className="text-[#0D1B2A]">Sede:</strong> Vila do Conde, Portugal<br />
          <strong className="text-[#0D1B2A]">Inscrição:</strong> Ordem dos Advogados Portuguesa<br />
          <strong className="text-[#0D1B2A]">Email:</strong> <a href="mailto:sandramartinsribeiro07@gmail.com" className="text-[#C9A84C]">sandramartinsribeiro07@gmail.com</a></p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">2. Carácter Informativo do Conteúdo</h2>
          <p>As informações disponibilizadas neste website têm <strong className="text-[#0D1B2A]">carácter meramente informativo e geral</strong>, não constituindo consulta jurídica, parecer legal ou aconselhamento profissional individualizado.</p>
          <p>A utilização de qualquer informação constante neste website não estabelece uma relação cliente-advogado. Para aconselhamento jurídico concreto, deverá contactar diretamente o escritório.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">3. Propriedade Intelectual</h2>
          <p>Todos os conteúdos deste website — textos, imagens, logótipos, design — são propriedade de Sandra Martins Ribeiro ou usados com as devidas autorizações. É proibida a sua reprodução total ou parcial sem autorização prévia e escrita.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">4. Limitação de Responsabilidade</h2>
          <p>O escritório não se responsabiliza por danos resultantes da utilização do website ou da confiança depositada nas informações aqui disponibilizadas, incluindo informações que possam estar desatualizadas face a alterações legislativas posteriores à publicação.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">5. Honorários e Publicidade</h2>
          <p>Em conformidade com o Estatuto da Ordem dos Advogados e respetivo Regulamento de Publicidade, este website não divulga tabelas de honorários nem promove de forma enganosa os serviços prestados.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">6. Lei Aplicável</h2>
          <p>O presente website e os seus avisos legais regem-se pela lei portuguesa. Qualquer litígio será submetido à jurisdição dos tribunais portugueses competentes.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">7. Resolução de Litígios de Consumo</h2>
          <p>Em caso de litígio, o consumidor pode recorrer a entidades de resolução alternativa de litígios. Informação disponível em: <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C]">www.consumidor.gov.pt</a></p>

          <div className="mt-12 p-6 border border-[#C9A84C]/30 bg-white">
            <p className="text-[#0D1B2A] text-sm font-medium mb-2">Nota Deontológica</p>
            <p className="text-xs leading-relaxed">A advocacia em Portugal está sujeita ao Estatuto da Ordem dos Advogados (Lei n.º 145/2015, de 9 de setembro) e ao Código Deontológico dos Advogados Europeus. O sigilo profissional, a independência e a lealdade para com o cliente são valores inegociáveis deste escritório.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
