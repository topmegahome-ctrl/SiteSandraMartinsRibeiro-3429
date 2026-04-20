export interface AreaContent {
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  hook: string;
  intro: string[];
  servicos: { titulo: string; desc: string }[];
  diferenciais: { titulo: string; desc: string }[];
  faq: { pergunta: string; resposta: string }[];
  cta: { titulo: string; subtitulo: string };
  icon: string;
  cor: string;
}

export const areasContent: AreaContent[] = [
  {
    slug: "direito-familia",
    icon: "👨‍👩‍👧",
    cor: "#7C6A8E",
    meta: {
      title: "Advogada de Direito da Família em Vila do Conde | Sandra Martins Ribeiro",
      description: "Apoio jurídico especializado em divórcio, regulação do poder paternal, alimentos e uniões de facto em Vila do Conde. Consulta presencial ou online. Marque já.",
      keywords: ["advogada família vila do conde", "divórcio portugal", "regulação poder paternal", "pensão alimentos advogado", "separação judicial"],
    },
    h1: "Direito da Família em Vila do Conde — Proteja Quem Mais Ama com Apoio Jurídico Especializado",
    hook: "As decisões mais importantes da sua vida merecem o mais rigoroso apoio jurídico.",
    intro: [
      "O Direito da Família regula as relações jurídicas mais próximas e emocionalmente intensas da vida de qualquer pessoa — o casamento, a separação, os filhos e a partilha do que foi construído a dois.",
      "Quando uma família atravessa uma crise, os erros jurídicos têm consequências que podem durar décadas: perda do direito a alimentos, acordos de responsabilidades parentais desequilibrados ou partilhas injustas.",
      "No escritório Sandra Martins Ribeiro, em Vila do Conde, cada processo familiar é tratado com rigor técnico e profunda sensibilidade humana — porque por trás de cada processo há pessoas reais.",
    ],
    servicos: [
      {
        titulo: "Divórcio por Mútuo Acordo e Litigioso",
        desc: "Conduzimos o processo de divórcio de forma eficiente e estratégica — seja por acordo, no Conservatória do Registo Civil, ou por ação judicial quando não há consenso. Protegemos os seus interesses patrimoniais e emocionais em todas as fases.",
      },
      {
        titulo: "Regulação do Exercício das Responsabilidades Parentais",
        desc: "Estabelecemos acordos sólidos sobre a guarda, o regime de visitas e a residência dos filhos menores. Defendemos sempre o superior interesse da criança, em conformidade com os artigos 1901.º e seguintes do Código Civil.",
      },
      {
        titulo: "Pensão de Alimentos — Fixação, Alteração e Incumprimento",
        desc: "Negociamos e litigamos pensões de alimentos justas para filhos e ex-cônjuges. Agimos com rapidez nos casos de incumprimento, incluindo a instauração de processo de execução e recurso ao FGADM (Fundo de Garantia de Alimentos).",
      },
      {
        titulo: "Uniões de Facto e Casamento — Direitos e Proteção",
        desc: "Assessoramos na constituição e dissolução de uniões de facto, esclarecendo os direitos e deveres legais em matéria de habitação, herança e alimentos — áreas frequentemente desconhecidas pelos casais não casados.",
      },

    ],
    diferenciais: [
      {
        titulo: "Experiência em Processos Sensíveis",
        desc: "Com mais de uma década em Direito da Família, a Dra. Sandra Martins Ribeiro conhece os mecanismos emocionais e jurídicos que tornam estes processos únicos. Não tratamos ficheiros — tratamos pessoas.",
      },
      {
        titulo: "Disponibilidade Real, Sem Intermediários",
        desc: "Terá sempre contacto direto com a advogada responsável pelo seu caso. Sem ser atendido por estagiários ou assistentes. A sua causa é tratada com atenção personalizada.",
      },
      {
        titulo: "Acordos que Evitam o Tribunal",
        desc: "Sempre que possível, privilegiamos soluções negociadas — mais rápidas, menos custosas e emocionalmente menos desgastantes para toda a família.",
      },
    ],
    faq: [
      {
        pergunta: "Quanto tempo demora um divórcio em Portugal?",
        resposta: "Um divórcio por mútuo acordo demora em média 2 a 4 meses na Conservatória do Registo Civil. Se houver filhos menores, o processo passa pelo tribunal de família e pode demorar 3 a 8 meses. O divórcio litigioso, sem acordo entre as partes, pode prolongar-se por 1 a 3 anos.",
      },
      {
        pergunta: "Quem fica com a guarda dos filhos num divórcio em Portugal?",
        resposta: "Em Portugal, a regra geral é a guarda conjunta — ambos os progenitores exercem as responsabilidades parentais. A residência principal é definida por acordo ou pelo tribunal, sempre com base no superior interesse da criança.",
      },
      {
        pergunta: "Tenho direito a pensão de alimentos se me separar?",
        resposta: "Sim, o ex-cônjuge pode ter direito a alimentos se se encontrar em situação de necessidade e o outro cônjuge tiver capacidade para os prestar, conforme o artigo 2016.º do Código Civil. Este direito não é automático — é apreciado caso a caso.",
      },
      {
        pergunta: "A união de facto tem os mesmos direitos que o casamento em Portugal?",
        resposta: "Não totalmente. A união de facto reconhece direitos como a proteção da casa de morada de família, direito a alimentos e benefícios fiscais, mas não confere automaticamente direitos hereditários — ao contrário do casamento. É essencial conhecer as diferenças antes de tomar decisões patrimoniais.",
      },
    ],
    cta: {
      titulo: "Precisa de Apoio em Direito da Família?",
      subtitulo: "Fale com a Dra. Sandra Martins Ribeiro. Primeira análise confidencial, sem compromisso.",
    },
  },
  {
    slug: "direito-laboral",
    icon: "💼",
    cor: "#2E6DA4",
    meta: {
      title: "Advogada Laboral em Vila do Conde | Despedimento e Direitos dos Trabalhadores",
      description: "Defesa dos seus direitos laborais em Portugal. Despedimento ilícito, assédio moral, rescisão com justa causa. Advogada especialista em Vila do Conde. Consulte agora.",
      keywords: ["advogada laboral vila do conde", "despedimento ilícito portugal", "assédio moral trabalho", "rescisão contrato trabalho", "direitos trabalhador portugal"],
    },
    h1: "Direito Laboral em Portugal — Defenda os Seus Direitos como Trabalhador com Quem Conhece a Lei",
    hook: "Perder o emprego ou sofrer injustiças no trabalho é uma das experiências mais perturbadoras da vida adulta.",
    intro: [
      "O Direito do Trabalho em Portugal é um sistema complexo que protege os trabalhadores — mas essa proteção só é eficaz quando os seus direitos são conhecidos e defendidos a tempo.",
      "Despedimentos sem fundamento legal, salários em atraso, assédio moral ou discriminação são situações com enquadramento jurídico claro no Código do Trabalho — e que podem e devem ser contestadas.",
      "O escritório Sandra Martins Ribeiro acompanha trabalhadores e empresas em todas as fases das relações laborais, desde a negociação de contratos até ao contencioso pós-despedimento.",
    ],
    servicos: [
      {
        titulo: "Contestação de Despedimento Ilícito",
        desc: "Analisamos a legalidade do processo disciplinar e do fundamento invocado pela entidade empregadora. Quando o despedimento é ilícito, reclamamos a reintegração ou uma indemnização justa, incluindo os salários intercalares em dívida.",
      },
      {
        titulo: "Rescisão com Justa Causa pelo Trabalhador",
        desc: "Identificamos e documentamos os comportamentos da entidade empregadora que constituem justa causa de rescisão — falta de pagamento, alteração substancial das condições de trabalho, assédio — garantindo que exerce este direito de forma tecnicamente correcta.",
      },
      {
        titulo: "Assédio Moral e Sexual no Local de Trabalho",
        desc: "Assessoramos na recolha de prova, apresentação de queixa junto da ACT (Autoridade para as Condições do Trabalho) e instauração de acção judicial para obtenção de indemnização por danos morais e materiais.",
      },
      {
        titulo: "Acidentes de Trabalho e Doenças Profissionais",
        desc: "Defendemos os trabalhadores lesados em acidentes de trabalho, garantindo que recebem as prestações legais devidas — incapacidade temporária ou permanente, tratamento médico e pensão vitalícia, quando aplicável.",
      },
      {
        titulo: "Negociação de Acordos de Cessação e Contratos",
        desc: "Revemos e negociamos acordos de cessação do contrato de trabalho (ACT), garantindo que os termos são justos e que não abdica inadvertidamente de direitos que lhe assistem por lei.",
      },
    ],
    diferenciais: [
      {
        titulo: "Prazos Laborais São Curtos — Agimos Rapidamente",
        desc: "Em Direito do Trabalho, muitos prazos são fatais. A ação de impugnação do despedimento tem um prazo de 60 dias. Contacte-nos imediatamente após qualquer notificação para não perder os seus direitos.",
      },
      {
        titulo: "Representação em Todas as Instâncias",
        desc: "Do Tribunal do Trabalho ao Tribunal da Relação, representamos os nossos clientes em todas as fases do litígio, com estratégia processual rigorosa e conhecimento atualizado da jurisprudência.",
      },
      {
        titulo: "Apoio Judiciário Disponível",
        desc: "Se não tiver meios económicos para suportar os honorários, podemos ajudá-lo a solicitar Apoio Judiciário junto do Instituto da Segurança Social, garantindo que o acesso à justiça não é condicionado por dificuldades financeiras.",
      },
    ],
    faq: [
      {
        pergunta: "Qual o prazo para contestar um despedimento em Portugal?",
        resposta: "O trabalhador tem 60 dias após a data de cessação do contrato para intentar acção de impugnação do despedimento no tribunal do trabalho. Este prazo é absolutamente improrrogável — após este período, o direito caduca.",
      },
      {
        pergunta: "O que é assédio moral no trabalho segundo a lei portuguesa?",
        resposta: "O assédio moral (mobbing) é definido no artigo 29.º do Código do Trabalho como o comportamento indesejado, nomeadamente o baseado em fator de discriminação, praticado no acesso ao emprego ou no próprio emprego, com o objetivo ou efeito de perturbar ou constranger a pessoa, afetar a sua dignidade ou criar um ambiente intimidativo, hostil, degradante, humilhante ou desestabilizador.",
      },
      {
        pergunta: "Tenho direito a subsídio de desemprego após rescisão com justa causa?",
        resposta: "Sim. Quando o trabalhador rescinde o contrato com justa causa imputável ao empregador, tem direito a subsidio de desemprego (desde que cumpra os restantes requisitos legais) e a uma indemnização equivalente a despedimento ilícito.",
      },
      {
        pergunta: "Podem alterar as minhas funções ou horário sem o meu acordo?",
        resposta: "O empregador tem um poder de direção limitado. Alterações substanciais às funções, horário ou local de trabalho que causem prejuízo sério ao trabalhador podem constituir modificação unilateral ilícita do contrato — e ser fundamento de rescisão com justa causa.",
      },
    ],
    cta: {
      titulo: "Está a Enfrentar um Problema Laboral?",
      subtitulo: "Não perca os seus prazos. Fale hoje com a Dra. Sandra — análise inicial confidencial e sem compromisso.",
    },
  },
  {
    slug: "direito-imobiliario",
    icon: "🏠",
    cor: "#3A7D5E",
    meta: {
      title: "Advogada Direito Imobiliário Vila do Conde | Arrendamento e Compra e Venda",
      description: "Apoio jurídico em compra, venda e arrendamento de imóveis em Portugal. Contratos, litígios com senhorios, despejo e due diligence imobiliária. Consulte em Vila do Conde.",
      keywords: ["advogada imobiliário vila do conde", "contrato arrendamento portugal", "compra venda imóvel advogado", "despejo judicial portugal", "litígio imobiliário"],
    },
    h1: "Direito Imobiliário em Portugal — Proteja o Seu Investimento Imobiliário com Segurança Jurídica Total",
    hook: "Um imóvel é, para a maioria das famílias portuguesas, o maior investimento da vida — e também um dos mais expostos a riscos jurídicos.",
    intro: [
      "O mercado imobiliário em Portugal envolve contratos complexos, obrigações legais rigorosas e litígios frequentes entre proprietários, inquilinos, compradores e promotores.",
      "Um contrato de arrendamento mal redigido, uma compra sem due diligence adequada ou uma obra sem contrato vinculativo podem resultar em perdas financeiras significativas e processos judiciais morosos.",
      "O escritório Sandra Martins Ribeiro acompanha particulares e investidores em todas as fases das transações e litígios imobiliários, com conhecimento profundo da legislação vigente — incluindo a Lei do Arrendamento Urbano (NRAU) e o Código Civil.",
    ],
    servicos: [
      {
        titulo: "Contratos de Arrendamento Urbano e Rural",
        desc: "Redigimos, analisamos e negociamos contratos de arrendamento residencial e não residencial, assegurando que todas as cláusulas respeitam o NRAU e protegem os seus interesses — seja como proprietário ou inquilino.",
      },
      {
        titulo: "Compra e Venda de Imóveis — Due Diligence Completa",
        desc: "Verificamos o historial registral e matricial do imóvel, identificamos ónus, penhoras ou hipotecas ocultas, e acompanhamos todo o processo de aquisição até à escritura — garantindo uma compra segura e sem surpresas.",
      },
      {
        titulo: "Resolução de Contratos de Arrendamento e Despejo Judicial",
        desc: "Instauramos procedimentos de despejo (BALCÃO NACIONAL DO ARRENDAMENTO ou ação judicial) em casos de falta de pagamento, uso indevido do imóvel ou fim do prazo contratual, com a maior celeridade possível.",
      },
      {
        titulo: "Litígios com Promotores Imobiliários e Obras",
        desc: "Defendemos os seus direitos face a promotores e empreiteiros em casos de entrega com defeitos, atrasos na construção ou incumprimento contratual, incluindo reclamação de garantias legais e indemnizações.",
      },
      {
        titulo: "Constituição de Propriedade Horizontal e Condomínios",
        desc: "Assessoramos na constituição de propriedade horizontal, elaboração de regulamentos de condomínio e resolução de conflitos entre condóminos, incluindo a impugnação de deliberações de assembleias.",
      },
    ],
    diferenciais: [
      {
        titulo: "Conhecimento Aprofundado do Mercado Local",
        desc: "Com sede em Vila do Conde, conhecemos as especificidades do mercado imobiliário da região Norte de Portugal — um trunfo real em processos que envolvem avaliação, negociação e litígio local.",
      },
      {
        titulo: "Prevenção Antes do Litígio",
        desc: "A nossa abordagem privilegia a prevenção: uma due diligence bem feita antes da compra vale muito mais do que um processo judicial depois. Identificamos os problemas antes de se tornarem litígios.",
      },
      {
        titulo: "Honorários Transparentes",
        desc: "Apresentamos orçamento claro antes de iniciar qualquer intervenção. Sem custos surpresa, sem honorários variáveis ocultos.",
      },
    ],
    faq: [
      {
        pergunta: "O senhorio pode aumentar a renda quando quiser em Portugal?",
        resposta: "Não. As atualizações de renda em Portugal seguem regras estritas definidas pelo NRAU. O senhorio deve comunicar a atualização com antecedência mínima de 30 dias e respeitar os coeficientes de atualização publicados anualmente pelo INE. Aumentos arbitrários são ilegais.",
      },
      {
        pergunta: "Quanto tempo demora um despejo em Portugal?",
        resposta: "Através do Balcão Nacional do Arrendamento (BNA), o processo de despejo por falta de pagamento pode demorar 3 a 6 meses. A via judicial tradicional é mais morosa — entre 12 a 24 meses. A escolha da via adequada depende das circunstâncias específicas do caso.",
      },
      {
        pergunta: "O que verificar antes de comprar um imóvel em Portugal?",
        resposta: "Antes de assinar qualquer contrato, deve verificar: certidão de registo predial (ónus e encargos), caderneta predial urbana, licença de utilização, situação fiscal do imóvel, e confirmar que o vendedor tem legitimidade para vender. A due diligence jurídica é indispensável.",
      },
      {
        pergunta: "O inquilino tem de sair quando o proprietário vende a casa?",
        resposta: "Não necessariamente. O inquilino tem direito de preferência na compra do imóvel arrendado e, caso não o exerça, o contrato de arrendamento mantém-se com o novo proprietário nas mesmas condições, salvo exceções legais previstas no NRAU.",
      },
    ],
    cta: {
      titulo: "Tem uma Questão Imobiliária para Resolver?",
      subtitulo: "Proteja o seu investimento com assessoria jurídica especializada. Marque uma consulta presencial em Vila do Conde ou por videochamada.",
    },
  },
  {
    slug: "direito-consumidor",
    icon: "🛒",
    cor: "#B85C2C",
    meta: {
      title: "Advogada Direito do Consumidor Portugal | Defesa do Consumidor Vila do Conde",
      description: "Defesa dos seus direitos como consumidor em Portugal. Contratos abusivos, garantias, reclamações a bancos e seguradoras. Advogada em Vila do Conde. Consulte já.",
      keywords: ["advogada consumidor portugal", "contratos abusivos portugal", "reclamação banco portugal", "garantia produto portugal", "defesa consumidor"],
    },
    h1: "Direito do Consumidor em Portugal — Conheça os Seus Direitos e Exija o que Lhe é Devido por Lei",
    hook: "As empresas têm departamentos jurídicos especializados — os consumidores também merecem quem os defenda com o mesmo rigor.",
    intro: [
      "O Direito do Consumidor em Portugal protege-o em todas as relações comerciais: quando compra um produto com defeito, assina um contrato com cláusulas abusivas ou é vítima de práticas comerciais desleais.",
      "Mas estes direitos só têm valor real quando são exercidos correctamente — com argumentação jurídica sólida, dentro dos prazos legais e perante as entidades competentes.",
      "O escritório Sandra Martins Ribeiro representa consumidores em litígios com empresas, bancos, seguradoras e prestadores de serviços, assegurando que a assimetria de poder não determina o resultado.",
    ],
    servicos: [
      {
        titulo: "Contratos com Cláusulas Abusivas",
        desc: "Identificamos e contestamos cláusulas contratuais abusivas em contratos de adesão — telecomunicações, energia, seguros, crédito — recorrendo ao regime da Lei das Cláusulas Contratuais Gerais (DL 446/85) para obter a sua nulidade.",
      },
      {
        titulo: "Garantias de Produtos e Serviços",
        desc: "Fazemos valer os seus direitos em casos de produto defeituoso ou serviço inadequado — reparação, substituição, redução do preço ou resolução do contrato com devolução do dinheiro, ao abrigo do DL 84/2021.",
      },
      {
        titulo: "Litígios com Bancos e Instituições Financeiras",
        desc: "Contestamos comissões ilegais, créditos abusivos, seguros de crédito associados forçados e práticas de misselling — representando o consumidor perante o Banco de Portugal e nos tribunais.",
      },
      {
        titulo: "Reclamações a Seguradoras",
        desc: "Analisamos apólices e contestamos recusas de pagamento, subavaliações de sinistros e exclusões indevidas, sejam em seguros automóvel, habitação, saúde ou vida.",
      },
      {
        titulo: "Práticas Comerciais Desleais e Publicidade Enganosa",
        desc: "Agimos contra empresas que utilizam práticas agressivas, publicidade enganosa ou omitem informação relevante, junto da ASAE, Autoridade da Concorrência ou em tribunal.",
      },
    ],
    diferenciais: [
      {
        titulo: "David vs. Golias — Com Argumentos Que Funcionam",
        desc: "Empresas e instituições financeiras têm recursos jurídicos vastos. O nosso papel é nivelar esse campo, utilizando toda a legislação de proteção do consumidor disponível para defender a sua posição.",
      },
      {
        titulo: "Conhecimento das Entidades Reguladoras",
        desc: "Sabemos quando recorrer à DECO, à ASAE, ao Banco de Portugal ou ao Provedor de Justiça — e quando é mais eficaz avançar diretamente para tribunal ou recurso a meios alternativos de resolução de litígios (RAL).",
      },
      {
        titulo: "Resolução Rápida Fora de Tribunal",
        desc: "Muitos litígios de consumo resolvem-se mais rapidamente através de negociação assertiva ou centros de arbitragem, poupando tempo e custos. É sempre a nossa primeira abordagem.",
      },
    ],
    faq: [
      {
        pergunta: "Qual o prazo de garantia de um produto comprado em Portugal?",
        resposta: "Desde outubro de 2021 (DL 84/2021), o prazo de garantia de bens móveis é de 3 anos para bens novos e 2 anos para bens usados. Em caso de defeito, tem 2 meses para o comunicar ao vendedor a partir do momento em que o detetou.",
      },
      {
        pergunta: "Posso cancelar um contrato assinado em casa ou online em Portugal?",
        resposta: "Sim. Os contratos celebrados fora do estabelecimento comercial (em casa, por telefone ou online) beneficiam de um prazo de livre resolução de 14 dias úteis, sem necessidade de justificação, ao abrigo do DL 24/2014.",
      },
      {
        pergunta: "O banco pode cobrar-me comissões sem me avisar?",
        resposta: "Não. Os bancos são obrigados a comunicar previamente qualquer alteração de comissões e a publicar o seu FOLC (Folheto de Comissões). Comissões cobradas sem base contratual ou legal são ilegais e podem ser reclamadas com devolução dos valores pagos.",
      },
      {
        pergunta: "O que fazer se a seguradora recusar pagar um sinistro?",
        resposta: "Em caso de recusa injustificada, deve primeiro apresentar reclamação formal por escrito à seguradora. Se não obtiver resposta satisfatória, pode recorrer ao Centro de Informação, Mediação, Provedoria e Arbitragem de Seguros (CIMPAS) ou avançar para ação judicial.",
      },
    ],
    cta: {
      titulo: "Uma Empresa Lesou os Seus Direitos?",
      subtitulo: "Não aceite um 'não' sem questionar. Consulte a Dra. Sandra e perceba exactamente o que pode exigir.",
    },
  },
  {
    slug: "direito-penal",
    icon: "⚖",
    cor: "#6B2D2D",
    meta: {
      title: "Advogada Direito Penal Vila do Conde | Defesa Criminal e Queixa-Crime Portugal",
      description: "Defesa criminal e apresentação de queixas-crime em Portugal. Injúrias, ameaças, burla, violência doméstica. Advogada de defesa em Vila do Conde. Consulta urgente disponível.",
      keywords: ["advogada penal vila do conde", "defesa criminal portugal", "queixa crime portugal", "violência doméstica advogada", "injúria difamação portugal"],
    },
    h1: "Direito Penal em Portugal — Defesa Criminal Rigorosa e Apresentação de Queixas-Crime com Fundamentação Sólida",
    hook: "Quando está em causa a liberdade, a reputação ou a segurança de uma pessoa, não há margem para erros jurídicos.",
    intro: [
      "O processo penal em Portugal é tecnicamente exigente e emocionalmente devastador — seja como arguido, como vítima ou como assistente num processo criminal.",
      "Uma defesa mal estruturada, uma queixa mal fundamentada ou um prazo prescricional ignorado podem determinar a diferença entre justiça e impunidade.",
      "O escritório Sandra Martins Ribeiro intervém em ambos os lados do processo penal: defendendo arguidos com toda a força da lei e representando vítimas na obtenção de justiça e indemnização.",
    ],
    servicos: [
      {
        titulo: "Defesa de Arguido em Processo Penal",
        desc: "Acompanhamos o arguido em todos os actos processuais — interrogatório, debate instrutório, julgamento e recurso — garantindo o pleno exercício dos direitos de defesa previstos no Código de Processo Penal e na Constituição.",
      },
      {
        titulo: "Apresentação e Acompanhamento de Queixas-Crime",
        desc: "Elaboramos queixas-crime tecnicamente fundamentadas junto do Ministério Público ou da PSP/GNR para crimes como injúria, difamação, ameaça, coação, burla, abuso de confiança e violação de domicílio.",
      },
      {
        titulo: "Violência Doméstica — Proteção Urgente da Vítima",
        desc: "Apoiamos vítimas de violência doméstica na apresentação de queixa, no pedido de medidas de proteção urgentes (afastamento do agressor, proibição de contacto) e no acompanhamento integral do processo penal.",
      },
      {
        titulo: "Crimes Informáticos e Ameaças nas Redes Sociais",
        desc: "Agimos em casos de cyberstalking, difamação online, partilha não consentida de imagens íntimas (revenge porn) e burla informática — crimes em crescimento que requerem intervenção jurídica especializada e urgente.",
      },
      {
        titulo: "Pedido de Indemnização Cível no Processo Penal",
        desc: "Asseguramos que a vítima obtém não só justiça criminal mas também reparação patrimonial e moral, através do pedido de indemnização civil enxertado no processo penal.",
      },
    ],
    diferenciais: [
      {
        titulo: "Intervenção Imediata em Situações de Urgência",
        desc: "Situações de detenção, violência doméstica ou ameaças graves requerem resposta jurídica imediata. O escritório assegura disponibilidade para situações urgentes.",
      },
      {
        titulo: "Discrição e Sigilo Absoluto",
        desc: "O sigilo profissional do advogado em matéria penal é inviolável. Tudo o que partilhar connosco é protegido pelo segredo profissional — sem excepções.",
      },
      {
        titulo: "Estratégia Processual Fundamentada",
        desc: "Cada defesa ou acusação é construída sobre análise rigorosa dos elementos de prova, jurisprudência actualizada e conhecimento do direito processual penal português.",
      },
    ],
    faq: [
      {
        pergunta: "Qual o prazo para apresentar queixa-crime em Portugal?",
        resposta: "O prazo para apresentar queixa-crime em Portugal é, regra geral, de 6 meses a contar do conhecimento dos factos e da identidade do agente. Para crimes públicos (como violência doméstica), a queixa pode ser apresentada a qualquer momento dentro do prazo de prescrição.",
      },
      {
        pergunta: "O que acontece depois de apresentar uma queixa-crime?",
        resposta: "Após a queixa, o Ministério Público abre inquérito e investiga os factos. Pode arquivar (se não houver indícios suficientes), deduzir acusação ou suspender provisoriamente o processo. O processo pode durar meses a anos, dependendo da complexidade.",
      },
      {
        pergunta: "É obrigatório ter advogado num processo penal em Portugal?",
        resposta: "Como arguido, é obrigatório ter defensor em determinadas fases (interrogatório judicial, julgamento, debates instrutórios). Como vítima, não é obrigatório mas é altamente recomendável para garantir a melhor defesa dos seus interesses.",
      },
      {
        pergunta: "Posso ser preso por dívidas em Portugal?",
        resposta: "Não. Em Portugal não existe prisão por dívidas civis. A prisão apenas é aplicada como pena acessória em crimes específicos ou como medida de coação. A detenção por dívidas é inconstitucional.",
      },
    ],
    cta: {
      titulo: "Precisa de Defesa Criminal ou Quer Apresentar uma Queixa?",
      subtitulo: "Contacte o escritório de imediato. Em situações urgentes, asseguramos resposta prioritária.",
    },
  },
  {
    slug: "direito-sucessoes",
    icon: "📜",
    cor: "#7A6835",
    meta: {
      title: "Advogada Heranças e Sucessões Vila do Conde | Partilha e Testamento Portugal",
      description: "Apoio jurídico em heranças, testamentos, habilitação de herdeiros e partilhas em Portugal. Advogada especialista em Vila do Conde. Proteja o legado da sua família.",
      keywords: ["advogada heranças portugal", "partilha herança advogado", "testamento portugal", "habilitação herdeiros", "sucessão intestada portugal"],
    },
    h1: "Direito das Sucessões em Portugal — Proteja o Legado da sua Família com Planeamento e Rigor Jurídico",
    hook: "Uma herança mal gerida pode transformar o maior presente de uma família na sua maior fonte de conflito.",
    intro: [
      "O Direito das Sucessões regula a transmissão do património de uma pessoa após a sua morte — um momento em que as famílias já estão fragilizadas pelo luto e que, sem apoio jurídico adequado, pode tornar-se fonte de litígios prolongados.",
      "Testamentos mal redigidos, partilhas sem acordo entre herdeiros, imóveis com registo desatualizado ou dívidas não declaradas são armadilhas jurídicas frequentes que podem comprometer o valor da herança e as relações familiares.",
      "No escritório Sandra Martins Ribeiro, acompanhamos famílias em todas as fases do processo sucessório — do planeamento ainda em vida até à partilha definitiva dos bens.",
    ],
    servicos: [
      {
        titulo: "Elaboração e Revisão de Testamentos",
        desc: "Redigimos testamentos que expressam fielmente a sua vontade, respeitam a legítima dos herdeiros forçados e minimizam futuros conflitos familiares. Aconselhamos sobre as formas testamentárias disponíveis em Portugal e as suas vantagens.",
      },
      {
        titulo: "Habilitação de Herdeiros",
        desc: "Tratamos de todo o processo de habilitação de herdeiros — o reconhecimento jurídico formal de quem tem direito à herança — incluindo a obtenção da respectiva escritura notarial ou sentença judicial.",
      },
      {
        titulo: "Partilha de Herança por Acordo e Judicial",
        desc: "Facilitamos a partilha amigável do acervo hereditário entre todos os herdeiros, com inventário completo dos bens, avaliação e divisão equitativa. Quando não há acordo, representamos o nosso cliente no processo de inventário judicial.",
      },
      {
        titulo: "Doações em Vida e Planeamento Sucessório",
        desc: "Aconselhamos sobre a transmissão de bens em vida — doações, contratos de compra e venda familiares, constituição de usufruto — como estratégia de planeamento fiscal e sucessório eficiente.",
      },
      {
        titulo: "Impugnação de Testamento e Defesa da Legítima",
        desc: "Representamos herdeiros que viram a sua legítima (quota indisponível da herança) violada por testamento ou doações em vida, intentando as acções legais para reposição da sua quota hereditária.",
      },
    ],
    diferenciais: [
      {
        titulo: "Abordagem Familiar e Mediadora",
        desc: "Processos de herança envolvem emoções intensas. A Dra. Sandra atua como facilitadora entre herdeiros sempre que possível, poupando tempo, custos e relações familiares — sem abdicar de defender os seus direitos.",
      },
      {
        titulo: "Planeamento Que Poupa Impostos",
        desc: "Uma herança bem planeada em vida pode reduzir significativamente os custos com Imposto do Selo e simplificar o processo para os seus herdeiros. Aconselhamos com antecedência para maximizar o valor transmitido.",
      },
      {
        titulo: "Experiência em Heranças com Imóveis",
        desc: "Quando a herança inclui imóveis — frequentemente o caso mais complexo — garantimos que toda a documentação registral está em ordem antes da partilha, evitando bloqueios no processo.",
      },
    ],
    faq: [
      {
        pergunta: "O que acontece à herança quando não há testamento em Portugal?",
        resposta: "Quando não existe testamento, aplica-se a sucessão legítima prevista no Código Civil. Os bens são distribuídos por uma ordem de herdeiros: cônjuge e descendentes têm prioridade, seguidos dos ascendentes, irmãos e, por último, o Estado.",
      },
      {
        pergunta: "Posso deserdar os meus filhos em Portugal?",
        resposta: "Não completamente. Em Portugal, os filhos são herdeiros legitimários — têm direito à legítima, que corresponde a metade do acervo hereditário (com cônjuge sobrevivo) ou dois terços (sem cônjuge). Só é possível deserdar um filho com fundamento em causas específicas de deserdação previstas na lei.",
      },
      {
        pergunta: "Qual o prazo para aceitar ou repudiar uma herança em Portugal?",
        resposta: "O herdeiro pode aceitar ou repudiar a herança a qualquer momento, mas o repúdio deve ser feito por escritura notarial. Se existirem credores do falecido, é importante agir com prontidão para evitar a responsabilidade pelas dívidas da herança.",
      },
      {
        pergunta: "Paga-se imposto sobre herança em Portugal?",
        resposta: "Em Portugal não existe imposto sobre herança entre cônjuge, descendentes e ascendentes directos. Os herdeiros nestes graus apenas pagam uma taxa de Imposto do Selo sobre imóveis (0,8%) e valores mobiliários (10%). Para outros beneficiários (irmãos, sobrinhos, etc.), aplica-se Imposto do Selo de 10%.",
      },
    ],
    cta: {
      titulo: "Tem uma Herança para Gerir ou Quer Planear o Seu Legado?",
      subtitulo: "Fale com a Dra. Sandra. Uma conversa hoje pode poupar anos de conflito amanhã.",
    },
  },
  {
    slug: "direito-empresarial",
    icon: "🏢",
    cor: "#1A3A5C",
    meta: {
      title: "Advogada Direito Empresarial Vila do Conde | Constituição de Empresas e Contratos",
      description: "Assessoria jurídica empresarial em Portugal. Constituição de sociedades, contratos comerciais, insolvência e proteção dos sócios. Advogada em Vila do Conde. Consulte agora.",
      keywords: ["advogada empresarial vila do conde", "constituição empresa portugal", "contrato comercial advogado", "insolvência portugal", "acordo sócios portugal"],
    },
    h1: "Direito Empresarial em Portugal — Assessoria Jurídica que Protege o Seu Negócio em Todas as Fases",
    hook: "Uma empresa sem suporte jurídico sólido está permanentemente exposta a riscos que podem ser evitados.",
    intro: [
      "O Direito Empresarial abrange toda a vida de uma empresa — da sua constituição e estruturação até à resolução de conflitos entre sócios, passando pela negociação de contratos e eventual reestruturação ou insolvência.",
      "Em Portugal, o tecido empresarial é maioritariamente composto por PME e microempresas que frequentemente não dispõem de apoio jurídico preventivo — e que pagam o preço disso quando surgem problemas contratuais, laborais ou societários.",
      "O escritório Sandra Martins Ribeiro oferece assessoria jurídica empresarial próxima e prática — focada em proteger o seu negócio, os seus sócios e os seus ativos.",
    ],
    servicos: [
      {
        titulo: "Constituição e Estruturação de Sociedades",
        desc: "Assessoramos na escolha da forma jurídica mais adequada (Lda., S.A., unipessoal, etc.), redigimos os estatutos sociais e acompanhamos todo o processo de constituição no Registo Comercial — incluindo o registo de marca junto do INPI, quando aplicável.",
      },
      {
        titulo: "Contratos Comerciais e Acordos de Sócios",
        desc: "Redigimos, analisamos e negociamos contratos de fornecimento, distribuição, prestação de serviços, franchising e acordos parassociais — protegendo os seus interesses em cada cláusula.",
      },
      {
        titulo: "Resolução de Conflitos entre Sócios",
        desc: "Mediamos e litigamos conflitos societários — impugnação de deliberações, exclusão de sócio, direito de saída e liquidação de quota — com estratégia orientada para a continuidade do negócio sempre que possível.",
      },
      {
        titulo: "Trespasse, Cessão de Quotas e M&A",
        desc: "Acompanhamos processos de compra e venda de empresas, cessão de quotas, due diligence jurídica empresarial e estruturação de operações de fusão e aquisição para PME.",
      },
      {
        titulo: "Insolvência Empresarial e Recuperação",
        desc: "Assessoramos empresas em dificuldade na apresentação à insolvência, no Processo Especial de Revitalização (PER) e no PEVE — procurando sempre a solução que preserve o maior valor possível para credores e sócios.",
      },
    ],
    diferenciais: [
      {
        titulo: "Assessoria Preventiva, Não Apenas Reativa",
        desc: "Trabalhamos como parceiros jurídicos das empresas — identificando riscos antes de se tornarem problemas. Uma revisão contratual preventiva custa uma fracção do que custa um litígio.",
      },
      {
        titulo: "Linguagem de Negócios, Não Apenas Jurídica",
        desc: "Traduzimos a complexidade jurídica em informação accionável para os gestores. Entendemos que as decisões empresariais têm de ser tomadas com clareza, rapidez e segurança jurídica.",
      },
      {
        titulo: "Flexibilidade de Honorários para PME",
        desc: "Oferecemos modelos de honorários ajustados à realidade das pequenas e médias empresas — incluindo avença mensal para acompanhamento continuado a custo previsível.",
      },
    ],
    faq: [
      {
        pergunta: "Qual a diferença entre Lda. e Unipessoal por Quotas em Portugal?",
        resposta: "A Sociedade por Quotas Unipessoal (SUQ) tem um único sócio e capital social mínimo de 1€. A Lda. requer dois ou mais sócios (salvo transformação posterior) e o mesmo capital mínimo. A escolha depende de factores fiscais, de responsabilidade e de governança — a assessoria jurídica é recomendada.",
      },
      {
        pergunta: "O que é um Acordo Parassocial e para que serve?",
        resposta: "Um acordo parassocial é um contrato celebrado entre sócios, paralelamente aos estatutos da sociedade, que regula matérias como direito de preferência, drag-along, tag-along, exclusividade e gestão. É especialmente importante em sociedades com múltiplos sócios ou investidores.",
      },
      {
        pergunta: "Quando deve uma empresa pedir insolvência em Portugal?",
        resposta: "Uma empresa deve apresentar-se à insolvência quando se encontre em situação de insolvência actual (impossibilidade de cumprir obrigações) ou iminente. O atraso injustificado pode responsabilizar pessoalmente os administradores. A lei prevê um prazo de 30 dias para apresentação após o conhecimento da situação.",
      },
      {
        pergunta: "É possível resolver um conflito entre sócios sem ir a tribunal?",
        resposta: "Sim, e é frequentemente a melhor opção. A mediação empresarial e a arbitragem voluntária permitem resolver conflitos societários de forma mais rápida, confidencial e económica do que o contencioso judicial. Muitos acordos parassociais incluem cláusulas compromissórias que impõem a arbitragem.",
      },
    ],
    cta: {
      titulo: "Precisa de Assessoria Jurídica para a Sua Empresa?",
      subtitulo: "Proteja o seu negócio com acompanhamento jurídico especializado. Fale hoje com a Dra. Sandra.",
    },
  },
  {
    slug: "direito-imigracao",
    icon: "✈",
    cor: "#2A6670",
    meta: {
      title: "Advogada Imigração Portugal | Vistos, Residência e Cidadania | Vila do Conde",
      description: "Apoio jurídico a cidadãos estrangeiros em Portugal. Autorizações de residência, Visto D7, reagrupamento familiar, cidadania portuguesa. Advogada em Vila do Conde.",
      keywords: ["advogada imigração portugal", "autorização residência portugal", "visto D7 portugal", "cidadania portuguesa advogado", "reagrupamento familiar portugal"],
    },
    h1: "Direito da Imigração em Portugal — Apoio Jurídico Especializado para Viver e Trabalhar em Portugal com Segurança",
    hook: "Construir uma vida em Portugal é uma decisão corajosa — que merece o suporte jurídico certo para ser bem-sucedida.",
    intro: [
      "Portugal é hoje um dos destinos mais procurados do mundo para imigração, mas os seus processos de regularização são complexos, morosos e repletos de burocracia que pode frustrar até os candidatos mais preparados.",
      "Autorizações de residência recusadas, reagrupamentos familiares bloqueados, vistos expirados ou cidadania indeferida são situações que têm solução jurídica — desde que abordadas com rigor e conhecimento do quadro legal actual.",
      "O escritório Sandra Martins Ribeiro apoia cidadãos estrangeiros e famílias em todas as fases do processo migratório em Portugal, do pedido de visto à obtenção da cidadania.",
    ],
    servicos: [
      {
        titulo: "Autorização de Residência — Pedido e Renovação",
        desc: "Instruímos e acompanhamos pedidos de autorização de residência temporária e permanente junto do AIMA (Agência para a Integração, Migrações e Asilo), incluindo preparação documental, representação em entrevistas e recurso de decisões desfavoráveis.",
      },
      {
        titulo: "Vistos de Longa Duração — D7, D8, Nómada Digital",
        desc: "Assessoramos na obtenção de Visto D7 (rendimentos passivos), D8 (nómada digital) e outros vistos de longa duração, desde a fase de candidatura consular até à conversão em autorização de residência.",
      },
      {
        titulo: "Reagrupamento Familiar",
        desc: "Apoiamos todo o processo de reagrupamento familiar em Portugal — cônjuges, filhos menores e ascendentes a cargo — garantindo que os documentos necessários são correctamente instruídos e que os prazos são cumpridos.",
      },
      {
        titulo: "Cidadania Portuguesa",
        desc: "Analisamos a elegibilidade para cidadania por naturalização, descendência ou casamento/união de facto, preparamos o processo e acompanhamos o pedido até à decisão final — incluindo recurso em caso de indeferimento.",
      },
      {
        titulo: "Defesa em Processos de Expulsão e Recurso de Recusas",
        desc: "Representamos cidadãos estrangeiros em processos administrativos e judiciais de expulsão, recusa de entrada ou cancelamento de autorização de residência, assegurando o pleno exercício dos direitos de defesa.",
      },
    ],
    diferenciais: [
      {
        titulo: "Atendimento em Múltiplos Idiomas",
        desc: "O escritório assegura atendimento em português e inglês — e conta com rede de apoio para outros idiomas quando necessário — para que a barreira linguística não seja um obstáculo ao acesso à justiça.",
      },
      {
        titulo: "Conhecimento Actualizado do AIMA e SEF",
        desc: "O quadro legal da imigração em Portugal mudou significativamente com a criação do AIMA em 2023. Mantemos o nosso conhecimento permanentemente actualizado para dar a melhor orientação possível.",
      },
      {
        titulo: "Consultas Online para Todo o Mundo",
        desc: "Muitos dos nossos clientes de imigração ainda não estão em Portugal. Oferecemos consultas por videochamada para apoiar a preparação do processo antes da chegada a Portugal.",
      },
    ],
    faq: [
      {
        pergunta: "Quanto tempo demora uma autorização de residência em Portugal em 2025?",
        resposta: "Com o AIMA, os prazos variam significativamente — de 3 meses a mais de 1 ano, dependendo da nacionalidade, tipo de pedido e volume de processos pendentes. A preparação documental rigorosa e o acompanhamento jurídico reduzem o risco de atrasos por pedidos de documentação adicional.",
      },
      {
        pergunta: "Quem tem direito à cidadania portuguesa?",
        resposta: "Têm direito à cidadania portuguesa: filhos de portugueses nascidos no estrangeiro, netos de portugueses em determinadas condições, cidadãos casados ou em união de facto com portugueses há mais de 3 anos, e estrangeiros com residência legal em Portugal há mais de 5 anos (naturalização).",
      },
      {
        pergunta: "O que é o Visto D7 e quem pode pedir?",
        resposta: "O Visto D7 (Visto de Residência para Imigrantes com Rendimentos) destina-se a cidadãos não-UE que pretendam residir em Portugal e disponham de rendimentos estáveis suficientes (pensões, rendimentos de trabalho remoto, rendimentos de capital). O valor mínimo exigido é de aproximadamente 820€ mensais (2025).",
      },
      {
        pergunta: "Posso trazer a minha família para Portugal se tiver autorização de residência?",
        resposta: "Sim. Titulares de autorização de residência válida têm direito a reagrupar a família em Portugal — cônjuge ou unido de facto, filhos menores e, em determinadas condições, ascendentes a cargo. O processo de reagrupamento é autónomo e deve ser instruído correctamente para evitar atrasos.",
      },
    ],
    cta: {
      titulo: "Precisa de Apoio no Seu Processo de Imigração em Portugal?",
      subtitulo: "Fale com a Dra. Sandra — presencialmente em Vila do Conde ou por videochamada, de qualquer parte do mundo.",
    },
  },
  {
    slug: "direito-civil",
    icon: "📋",
    cor: "#4A4A6A",
    meta: {
      title: "Advogada Direito Civil Vila do Conde | Contratos, Responsabilidade Civil e Cobranças",
      description: "Apoio jurídico em contratos civis, responsabilidade civil, cobranças de dívidas e ações declarativas em Portugal. Advogada em Vila do Conde.",
      keywords: ["advogada direito civil portugal", "responsabilidade civil portugal", "cobrança dívidas advogado", "contrato civil portugal", "ação declarativa"],
    },
    h1: "Direito Civil em Portugal — Resolva Conflitos, Exija o Cumprimento de Contratos e Receba o que Lhe é Devido",
    hook: "Não honrar um contrato ou causar dano a outra pessoa tem consequências jurídicas — e quem foi lesado tem o direito de ser ressarcido.",
    intro: [
      "O Direito Civil regula as relações entre particulares: contratos, propriedade, responsabilidade por danos e obrigações de pagamento.",
      "Quando alguém não cumpre um contrato, causa um acidente por negligência ou se recusa a pagar uma dívida, a lei civil prevê mecanismos de reparação e cobrança — incluindo execução judicial dos bens do devedor.",
      "O escritório Sandra Martins Ribeiro representa particulares e empresas em todo o contencioso civil, desde a negociação extrajudicial até à execução de sentença.",
    ],
    servicos: [
      { titulo: "Incumprimento de Contratos Civis", desc: "Representamos clientes lesados pelo incumprimento de contratos de prestação de serviços, empreitada, compra e venda e promessa — exigindo o cumprimento forçado ou indemnização pelos danos causados." },
      { titulo: "Responsabilidade Civil por Danos", desc: "Reclamamos indemnizações por danos causados por terceiros em acidentes, erros médicos, danos a bens e outras situações de responsabilidade extracontratual, ao abrigo dos artigos 483.º e seguintes do Código Civil." },
      { titulo: "Cobranças de Dívidas e Injunções", desc: "Recorremos ao procedimento de injunção para cobrar créditos de forma célere e económica, incluindo o recurso ao processo executivo quando o devedor não paga voluntariamente." },
      { titulo: "Ações Declarativas e Executivas", desc: "Instauramos e acompanhamos ações declarativas para reconhecimento de direitos e ações executivas para cobrança forçada de créditos reconhecidos por sentença ou título executivo." },
      { titulo: "Direito de Vizinhança e Conflitos de Propriedade", desc: "Resolvemos conflitos entre proprietários e vizinhos — servidões, limites de propriedade, obras que causam danos, ruído e outros conflitos regulados pelo Código Civil." },
    ],
    diferenciais: [
      { titulo: "Resolução Extrajudicial Primeiro", desc: "Tentamos sempre uma solução negociada antes de avançar para tribunal — mais rápida, mais económica e frequentemente mais eficaz." },
      { titulo: "Execução Efectiva das Sentenças", desc: "Acompanhamos todo o processo de execução para garantir que o cliente efectivamente recebe o que lhe foi reconhecido." },
      { titulo: "Transparência nos Custos", desc: "Apresentamos estimativa de custos antes de iniciar qualquer processo. Nunca há surpresas nos honorários." },
    ],
    faq: [
      { pergunta: "O que é uma injunção e quando devo usá-la?", resposta: "A injunção é um procedimento especial para cobrar dívidas de forma mais rápida e económica do que uma ação declarativa comum. É ideal para cobranças de faturas em atraso, rendas ou prestações de contratos." },
      { pergunta: "Qual o prazo de prescrição das dívidas em Portugal?", resposta: "O prazo geral de prescrição é de 20 anos. Existem prazos especiais mais curtos: 5 anos para rendas e prestações periódicas, 2 anos para honorários de profissionais liberais. Após a prescrição, o devedor pode recusar legitimamente o pagamento." },
      { pergunta: "O que fazer se alguém não me pagar um serviço que prestei?", resposta: "Deve enviar notificação extrajudicial a interpelar o devedor. Se não pagar, pode recorrer à injunção ou instaurar ação declarativa. Guarde sempre toda a documentação que comprove a prestação do serviço e o valor acordado." },
      { pergunta: "Posso ser responsabilizado por um acidente de viação sem culpa?", resposta: "Em determinadas circunstâncias, o proprietário do veículo pode ser responsabilizado mesmo sem culpa, pela teoria do risco. O seguro obrigatório cobre estes casos. Um advogado é essencial para maximizar a indemnização." },
    ],
    cta: { titulo: "Alguém Lhe Deve Dinheiro ou Não Cumpriu um Contrato?", subtitulo: "Não deixe prescrever os seus direitos. Consulte a Dra. Sandra hoje." },
  },
  {
    slug: "direito-fiscal-dividas",
    icon: "💰",
    cor: "#2D6A4F",
    meta: {
      title: "Advogada Direito Fiscal e Dívidas Portugal | Execuções Fiscais e IRS/IRC Vila do Conde",
      description: "Apoio jurídico em processos fiscais, recursos de liquidações de IRS/IRC, execuções fiscais e coimas tributárias em Portugal. Advogada em Vila do Conde.",
      keywords: ["advogada fiscal portugal", "execução fiscal advogado", "recurso liquidação IRS", "coima fiscal portugal", "dívidas AT portugal"],
    },
    h1: "Direito Fiscal e Dívidas em Portugal — Defenda-se das Liquidações Indevidas e das Execuções Fiscais",
    hook: "A Autoridade Tributária nem sempre tem razão — e quando erra, o contribuinte tem o direito e o dever de contestar.",
    intro: [
      "O sistema fiscal português é complexo, com obrigações declarativas rigorosas e sanções severas para quem não cumpre — mesmo quando o incumprimento é involuntário.",

      "O escritório Sandra Martins Ribeiro acompanha particulares e empresas em processos de contencioso tributário — desde a reclamação graciosa até ao recurso para o Tribunal Arbitral Tributário.",
    ],
    servicos: [

      { titulo: "Oposição a Execução Fiscal", desc: "Representamos contribuintes em processos de execução fiscal, deduzindo oposição quando existam fundamentos legais — erro na liquidação, prescrição da dívida, pagamento já efectuado ou ilegitimidade do executado." },
      { titulo: "Contestação de Coimas Fiscais", desc: "Elaboramos defesas e recursos de coimas aplicadas pela AT por infracções às obrigações declarativas, contabilísticas ou de pagamento, reduzindo ou eliminando a sanção." },
      { titulo: "Dívidas ao Estado e Acordos de Pagamento", desc: "Negociamos planos de pagamento prestacional de dívidas à AT e à Segurança Social, incluindo a suspensão de execuções fiscais e a regularização da situação tributária do cliente." },
      { titulo: "Arbitragem Tributária (CAAD)", desc: "Recorremos ao Centro de Arbitragem Administrativa (CAAD) para resolução de litígios fiscais de forma mais célere e económica que os tribunais tributários tradicionais." },
    ],
    diferenciais: [
      { titulo: "Prazos Fiscais São Fatais — Actuamos com Urgência", desc: "O prazo para reclamação graciosa é de 120 dias e para impugnação judicial de 3 meses. Perder estes prazos significa perder o direito de contestar. Contacte-nos assim que receber uma notificação da AT." },
      { titulo: "Articulação com Contabilistas", desc: "Trabalhamos em estreita coordenação com contabilistas e TOC dos nossos clientes — garantindo que a estratégia jurídica e a realidade contabilística estão alinhadas." },
      { titulo: "Suspensão de Penhoras e Execuções", desc: "Em casos urgentes, requeremos a suspensão imediata de penhoras sobre contas bancárias, salários ou bens imóveis, protegendo o cliente enquanto decorre a contestação." },
    ],
    faq: [
      { pergunta: "Qual o prazo para contestar uma liquidação da Autoridade Tributária?", resposta: "Para reclamação graciosa: 120 dias a contar da notificação. Para impugnação judicial: 3 meses após indeferimento da reclamação graciosa. Para arbitragem tributária: 90 dias. Estes prazos são improrrogáveis." },
      { pergunta: "Posso suspender uma execução fiscal?", resposta: "Sim, mediante prestação de garantia idónea (hipoteca, fiança, penhora voluntária) ou dispensa de garantia por insuficiência de meios económicos. A suspensão impede penhoras enquanto o processo decorre." },
      { pergunta: "O que é o CAAD e que vantagens tem?", resposta: "O Centro de Arbitragem Administrativa é um tribunal arbitral especializado em matéria fiscal. Decisão em 6 meses, custos mais baixos e qualidade técnica elevada dos árbitros." },
      { pergunta: "Podem penhorar o meu salário por dívidas fiscais?", resposta: "Sim, mas com limites. É impenhorável o equivalente ao salário mínimo nacional, podendo ser penhorado apenas o excedente até determinados limites. Um advogado pode contestar penhoras excessivas ou ilegais." },
    ],
    cta: { titulo: "Recebeu uma Notificação da AT ou Está em Execução Fiscal?", subtitulo: "Não perca os prazos. Fale com a Dra. Sandra hoje para avaliar os seus fundamentos de defesa." },
  },
  {
    slug: "direito-comercial",
    icon: "🤝",
    cor: "#1A3A5C",
    meta: {
      title: "Advogada Direito Comercial Vila do Conde | Contratos, Sociedades e Concorrência",
      description: "Assessoria jurídica em direito comercial — contratos comerciais, sociedades, propriedade industrial e concorrência desleal em Portugal. Advogada em Vila do Conde.",
      keywords: ["advogada direito comercial portugal", "contrato comercial advogado", "sociedade comercial portugal", "concorrência desleal portugal", "marca registada portugal"],
    },
    h1: "Direito Comercial em Portugal — Assessoria Jurídica para Negócios Sólidos e Relações Comerciais Seguras",
    hook: "No mundo dos negócios, os acordos bem estruturados evitam litígios — e os litígios bem defendidos preservam o valor da empresa.",
    intro: [
      "O Direito Comercial regula as relações entre empresas, comerciantes e profissionais — contratos de fornecimento, distribuição, franchising, propriedade industrial e práticas de mercado.",
      "Em Portugal, o tecido empresarial é maioritariamente composto por PME que frequentemente não dispõem de apoio jurídico preventivo — e que pagam o preço quando surgem conflitos contratuais ou disputas com parceiros.",
      "O escritório Sandra Martins Ribeiro oferece assessoria jurídica comercial próxima e prática — focada em proteger o seu negócio, os seus contratos e os seus activos comerciais.",
    ],
    servicos: [
      { titulo: "Contratos Comerciais — Redacção e Negociação", desc: "Redigimos e negociamos contratos de fornecimento, distribuição, agência, prestação de serviços, franchising e parcerias comerciais — protegendo os seus interesses em cada cláusula." },
      { titulo: "Constituição e Estruturação de Sociedades Comerciais", desc: "Assessoramos na escolha da forma jurídica mais adequada (Lda., S.A., unipessoal), redigimos os estatutos sociais e acompanhamos o processo de constituição no Registo Comercial." },
      { titulo: "Concorrência Desleal e Protecção da Marca", desc: "Agimos contra práticas de concorrência desleal — imitação de produtos, usurpação de marca, aproveitamento da reputação alheia — incluindo providências cautelares e acções de indemnização." },
      { titulo: "Registo de Marcas e Propriedade Industrial", desc: "Assessoramos no registo de marcas junto do INPI e do EUIPO, analisamos conflitos com marcas anteriores e definimos estratégias de protecção da propriedade industrial." },
      { titulo: "Litígios Comerciais e Arbitragem", desc: "Representamos empresas em litígios comerciais nos tribunais e em tribunais arbitrais — com estratégia orientada para a resolução eficiente e para a preservação das relações comerciais." },
    ],
    diferenciais: [
      { titulo: "Assessoria Preventiva, Não Apenas Reativa", desc: "Identificamos riscos antes de se tornarem problemas. Uma revisão contratual preventiva custa uma fracção do que custa um litígio." },
      { titulo: "Linguagem de Negócios, Não Apenas Jurídica", desc: "Traduzimos a complexidade jurídica em informação accionável para os gestores. As decisões empresariais têm de ser tomadas com clareza e segurança jurídica." },
      { titulo: "Flexibilidade de Honorários para PME", desc: "Oferecemos modelos de honorários ajustados à realidade das PME — incluindo avença mensal para acompanhamento continuado a custo previsível." },
    ],
    faq: [
      { pergunta: "O que deve incluir um contrato de fornecimento sólido?", resposta: "Deve incluir: especificação clara do produto/serviço, preços e condições de pagamento, prazos de entrega e penalidades por atraso, garantias de qualidade, condições de resolução do contrato e cláusula de jurisdição." },
      { pergunta: "Como proteger a minha marca em Portugal?", resposta: "O registo junto do INPI confere exclusividade de uso em Portugal por 10 anos, renovável. Para protecção europeia, o registo de Marca da União Europeia junto do EUIPO cobre todos os 27 estados-membros." },
      { pergunta: "Posso resolver um conflito comercial fora do tribunal?", resposta: "Sim. A arbitragem comercial permite resolver litígios de forma mais rápida e confidencial. Muitos contratos incluem cláusulas compromissórias que prevêem arbitragem como meio preferencial." },
      { pergunta: "Qual a diferença entre agência e distribuição?", resposta: "O agente actua em nome da empresa representada, sem assumir o risco comercial. O distribuidor compra os produtos por sua conta e revende-os. Cada modelo tem implicações jurídicas e fiscais distintas." },
    ],
    cta: { titulo: "Precisa de Assessoria Jurídica Comercial?", subtitulo: "Proteja os seus contratos e a sua marca. Fale hoje com a Dra. Sandra." },
  },
  {
    slug: "outros-servicos",
    icon: "⚖",
    cor: "#5D4E37",
    meta: {
      title: "Advogada Insolvência, Atos Notariais, Administrativo e Seguros | Vila do Conde",
      description: "Apoio jurídico em insolvência pessoal, atos notariais, direito administrativo e seguros em Portugal. Advogada em Vila do Conde.",
      keywords: ["insolvência pessoal portugal", "atos notariais advogado", "direito administrativo portugal", "seguros reclamação advogado", "PERAP portugal"],
    },
    h1: "Outros Serviços Jurídicos — Insolvência, Atos Notariais, Administrativo e Seguros",
    hook: "Além das áreas principais, o escritório oferece apoio jurídico especializado noutras situações do quotidiano jurídico.",
    intro: [
      "A vida jurídica não se esgota nas grandes áreas do direito. Muitas situações do dia-a-dia — uma insolvência pessoal, um ato notarial urgente, uma reclamação a uma seguradora ou um recurso administrativo — exigem igualmente apoio especializado.",
      "O escritório Sandra Martins Ribeiro oferece um conjunto alargado de serviços complementares que garantem ao cliente um acompanhamento jurídico completo, sem necessidade de recorrer a múltiplos advogados.",
    ],
    servicos: [
      { titulo: "Insolvência Pessoal e Empresarial", desc: "Acompanhamos pessoas singulares e empresas em situação de insolvência — desde a apresentação ao tribunal até ao plano de pagamentos ou liquidação do activo. Para particulares com dívidas insustentáveis, o PERAP pode ser uma solução que culmina na exoneração do passivo restante após 3 anos." },
      { titulo: "Atos Notariais e Escrituras", desc: "Prestamos apoio na preparação e celebração de escrituras públicas, procurações, testamentos públicos, reconhecimentos notariais e outros atos — assegurando que toda a documentação está em ordem e que o cliente compreende plenamente o que está a assinar." },
      { titulo: "Direito Administrativo e Recursos", desc: "Contestamos decisões de entidades públicas — câmaras municipais, ministérios e autoridades reguladoras — que violem direitos dos cidadãos ou das empresas. Actuamos em recursos hierárquicos e impugnações nos tribunais administrativos, dentro dos prazos legais obrigatórios." },
      { titulo: "Seguros — Reclamações e Litígios", desc: "Analisamos apólices e contestamos recusas de pagamento, subavaliações de sinistros e exclusões indevidas em seguros de vida, saúde, habitação, automóvel e responsabilidade civil. Representamos os segurados perante a ASF e em tribunal quando necessário." },
    ],
    diferenciais: [
      { titulo: "Um Único Advogado para Múltiplas Necessidades", desc: "A relação de confiança construída com o escritório permite que o cliente seja acompanhado nas mais diversas situações jurídicas — com conhecimento acumulado do seu historial e circunstâncias." },
      { titulo: "Resposta Rápida em Situações Urgentes", desc: "Muitos destes processos têm prazos curtos — especialmente em matéria administrativa e de seguros. O escritório assegura resposta célere." },
      { titulo: "Proximidade e Disponibilidade", desc: "Atendimento presencial em Vila do Conde e por videochamada. A Dra. Sandra está directamente disponível para os seus clientes, sem intermediários." },
    ],
    faq: [
      { pergunta: "O que é a insolvência pessoal e como funciona em Portugal?", resposta: "É o processo judicial pelo qual uma pessoa singular que não consegue pagar as suas dívidas pode obter a liquidação do seu património e, eventualmente, a exoneração do passivo restante. O processo pode culminar na liberação total das dívidas após 3 anos." },
      { pergunta: "Para que serve uma procuração e preciso de advogado para a fazer?", resposta: "Uma procuração autoriza outra pessoa a agir em seu nome em actos jurídicos específicos. Para actos que exijam escritura pública, a procuração também deve ser pública. Um advogado ajuda a garantir que a procuração tem os poderes correctos e não mais do que os necessários." },
      { pergunta: "Qual o prazo para impugnar uma decisão administrativa?", resposta: "O prazo geral de impugnação contenciosa é de 3 meses a contar da notificação. Para recurso hierárquico, o prazo é geralmente de 30 dias. Estes prazos são improrrogáveis — deve agir de imediato." },
      { pergunta: "O que fazer quando a seguradora recusa pagar um sinistro?", resposta: "Deve apresentar reclamação formal por escrito à seguradora. Se não obtiver resposta satisfatória, pode recorrer ao CIMPAS ou à ASF. Em última instância, pode intentar acção judicial. Um advogado é essencial para avaliar se a recusa tem fundamento legal." },
    ],
    cta: { titulo: "Tem uma Situação Jurídica que Não Sabe Bem Como Classificar?", subtitulo: "Fale com a Dra. Sandra. Se não for a área certa, orientamos para quem pode ajudar melhor." },
  },
];
