import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-36 pb-24">
        <p className="section-num mb-2">Legal</p>
        <div className="w-10 h-px bg-[#C9A84C] mb-8" />
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-semibold text-[#0D1B2A] mb-10">
          Política de Privacidade
        </h1>
        <div className="prose prose-sm max-w-none text-[#6B6B6B] leading-relaxed space-y-6">
          <p><strong className="text-[#0D1B2A]">Última atualização:</strong> Abril 2026</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">1. Responsável pelo Tratamento</h2>
          <p>Sandra Martins Ribeiro, Advogada, com sede em Vila do Conde, Portugal, inscrita na Ordem dos Advogados Portuguesa, é a responsável pelo tratamento dos dados pessoais recolhidos através deste website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento UE 2016/679).</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">2. Dados Recolhidos</h2>
          <p>Recolhemos apenas os dados que nos fornece voluntariamente através do formulário de contacto:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome completo</li>
            <li>Endereço de email</li>
            <li>Número de telefone (opcional)</li>
            <li>Área jurídica de interesse</li>
            <li>Conteúdo da mensagem enviada</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">3. Finalidade do Tratamento</h2>
          <p>Os dados recolhidos destinam-se exclusivamente a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responder às suas solicitações e pedidos de informação</li>
            <li>Agendar consultas jurídicas</li>
            <li>Prestar os serviços de advocacia solicitados</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">4. Base Legal</h2>
          <p>O tratamento dos seus dados baseia-se no consentimento expresso que prestou ao preencher o formulário de contacto (Art.º 6.º, n.º 1, alínea a) do RGPD) e, subsequentemente, na execução de contrato ou diligências pré-contratuais (alínea b)).</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">5. Sigilo Profissional</h2>
          <p>Toda a informação partilhada no âmbito de uma relação cliente-advogado está protegida pelo sigilo profissional, nos termos do Estatuto da Ordem dos Advogados (Lei n.º 145/2015, de 9 de setembro).</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">6. Partilha de Dados</h2>
          <p>Os seus dados não são vendidos, cedidos ou partilhados com terceiros para fins comerciais. Poderão ser partilhados apenas quando legalmente exigido ou no âmbito da prestação do serviço jurídico contratado.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">7. Conservação dos Dados</h2>
          <p>Os dados são conservados pelo período necessário à prestação do serviço e pelo período legalmente exigido para cumprimento de obrigações legais ou deontológicas.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">8. Os Seus Direitos</h2>
          <p>Nos termos do RGPD, tem direito a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acesso aos seus dados pessoais</li>
            <li>Retificação de dados inexatos</li>
            <li>Eliminação dos seus dados ("direito ao esquecimento")</li>
            <li>Portabilidade dos dados</li>
            <li>Oposição ao tratamento</li>
            <li>Apresentar reclamação à CNPD (Comissão Nacional de Proteção de Dados)</li>
          </ul>
          <p>Para exercer estes direitos, contacte: <a href="mailto:sandramartinsribeiro07@gmail.com" className="text-[#C9A84C]">sandramartinsribeiro07@gmail.com</a></p>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#0D1B2A] text-xl font-semibold mt-8 mb-3">9. Contacto</h2>
          <p>Para qualquer questão relativa à proteção dos seus dados: <a href="mailto:sandramartinsribeiro07@gmail.com" className="text-[#C9A84C]">sandramartinsribeiro07@gmail.com</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
