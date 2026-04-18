import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CONFIG } from "../lib/config";

function MessageContent({ parts }: { parts: UIMessage["parts"] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text") {
          return (
            <span key={i} className="whitespace-pre-wrap leading-relaxed">
              {part.text}
            </span>
          );
        }
        return null;
      })}
    </>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

const SUGGESTED = [
  "Fui despedido sem aviso. O que posso fazer?",
  "Quero fazer o divórcio. Como funciona?",
  "Tenho um problema com o meu senhorio.",
  "O meu pai faleceu sem testamento.",
  "Quero agendar uma consulta.",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent/messages" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Olá! Bem-vindo/a ao Escritório Sandra Martins Ribeiro.\n\nEm que posso ajudá-lo/a hoje?",
          },
        ],
        createdAt: new Date(),
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    setStarted(true);
    sendMessage({ text: input });
    setInput("");
    inputRef.current?.focus();
  };

  const handleSuggestion = (text: string) => {
    setStarted(true);
    sendMessage({ text });
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Page Header */}
      <div className="bg-[#0D1B2A] pt-28 pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-num mb-2">Gabinete · Atendimento</p>
          <div className="w-10 h-px bg-[#C9A84C] mb-5" />
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl lg:text-5xl font-semibold text-white leading-tight mb-3"
          >
            Fale connosco
          </h1>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Coloque a sua dúvida jurídica. Respondemos com base na legislação portuguesa e orientamos para os próximos passos.
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 lg:px-6 pb-6">

        {/* Messages */}
        <div className="flex-1 py-8 space-y-6 min-h-[400px]">

          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}
              >
                {/* Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 bg-[#0D1B2A] flex-shrink-0 flex items-center justify-center mb-0.5">
                    <span
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-[#C9A84C] text-xs font-semibold"
                    >
                      SMR
                    </span>
                  </div>
                )}
                {isUser && (
                  <div className="w-9 h-9 bg-[#E2DDD5] flex-shrink-0 flex items-center justify-center mb-0.5">
                    <svg className="w-4 h-4 text-[#6B6B6B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[80%] lg:max-w-[70%] px-5 py-3.5 text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#0D1B2A] text-white"
                      : "bg-white text-[#2C2C2C] border border-[#E2DDD5]"
                  }`}
                >
                  <MessageContent parts={msg.parts} />
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3 items-end">
              <div className="w-9 h-9 bg-[#0D1B2A] flex-shrink-0 flex items-center justify-center">
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#C9A84C] text-xs font-semibold">
                  SMR
                </span>
              </div>
              <div className="bg-white border border-[#E2DDD5]">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions — shown before first user message */}
        {!started && (
          <div className="mb-4">
            <p className="text-[#6B6B6B] text-[10px] tracking-[0.2em] uppercase mb-3">Questões frequentes</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-xs border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#6B6B6B] hover:text-[#0D1B2A] px-3 py-2 transition-all duration-200 text-left cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="bg-white border border-[#E2DDD5] focus-within:border-[#C9A84C] transition-colors duration-200">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva a sua dúvida jurídica..."
            disabled={isLoading}
            rows={3}
            className="w-full px-5 pt-4 pb-2 text-sm text-[#2C2C2C] placeholder-[#B0A99A] focus:outline-none resize-none bg-transparent disabled:opacity-50"
          />
          <div className="flex items-center justify-between px-5 pb-4 pt-1">
            <p className="text-[10px] text-[#B0A99A]">
              Enter para enviar · Shift+Enter para nova linha
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá, gostaria de falar com a Dra. Sandra.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#6B6B6B] hover:text-[#C9A84C] tracking-wide transition-colors flex items-center gap-1"
              >
                <span className="text-[#25D366]">●</span> WhatsApp
              </a>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#0D1B2A] hover:bg-[#C9A84C] text-white hover:text-[#0D1B2A] px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-[#B0A99A] mt-4 leading-relaxed">
          🔒 As informações prestadas têm carácter informativo e não constituem consulta jurídica formal. · Dados tratados com sigilo profissional (RGPD).
        </p>
      </div>

      {/* Side info strip */}
      <div className="bg-[#0D1B2A] py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-lg font-medium mb-1">
              Prefere falar diretamente?
            </p>
            <p className="text-white/50 text-sm">Disponível via WhatsApp ou formulário de contacto.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a
              href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá, gostaria de falar com a Dra. Sandra.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebe5a] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="/#contacto"
              className="border border-white/30 hover:border-[#C9A84C] text-white/70 hover:text-[#C9A84C] px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
            >
              Formulário de Contacto
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
