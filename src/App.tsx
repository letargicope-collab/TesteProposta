import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Contatos e identidade (apenas dados reais do projeto original)     */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "5582920004834";
const WHATSAPP_DISPLAY = "(82) 92000-4834";
const WEBSITE_DISPLAY = "www.provedorsuperconnect.com.br";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, Eduardo! Gostaria de conversar sobre a apresentação comercial da Super Connect para a Carajás Home Center."
)}`;

type Client = { name: string; logo: string };

const LOGOS = {
  superConnect: "https://i.imgur.com/hAG9YIi.png",
  carajas: "https://i.imgur.com/VOen6Fe.png",
  clients: [
    { name: "Grupo Coagro", logo: "https://i.imgur.com/W0zMSHx.png" },
    { name: "Mibasa Mineração", logo: "https://i.imgur.com/X7FFjbV.png" },
    { name: "Cimavel", logo: "https://i.imgur.com/5J4kjVk.png" },
    { name: "Unimed", logo: "https://i.imgur.com/IkWzDyD.png" },
    { name: "Lotus ICT", logo: "https://i.imgur.com/es00nMJ.png" },
    { name: "AeC Centro de Contatos", logo: "https://i.imgur.com/XRY3uzs.png" },
  ] as Client[],
};

const IMAGES = {
  bgTexture: "https://i.imgur.com/50StUE0.jpeg",
  robot: "https://i.imgur.com/WQMLI6P.png",
  datacenter: "https://i.imgur.com/DSjzprO.jpeg",
  headquarters: "https://i.imgur.com/6dUo2Ku.png",
  operationsCenter: "https://i.imgur.com/Gq3gLLP.jpeg",
  team: "https://i.imgur.com/Xvw26Lq.jpeg",
  monitoring: "https://i.imgur.com/bSRFNFI.jpeg",
  monitoringPanel: "https://i.imgur.com/Gs1IstJ.jpeg",
  apTeto: "https://i.imgur.com/T0w7gWB.png",
  routerBoard: "https://i.imgur.com/zICMU9G.png",
  eduardo: "https://i.imgur.com/bNxrgdC.png",
  qrCode: "https://i.imgur.com/HFT21j8.png",
};

const CARAJAS_OPPORTUNITIES = [
  {
    title: "Conectividade à altura da operação",
    description:
      "Em uma rede varejista de grande porte, cada unidade depende de uma infraestrutura de internet empresarial bem dimensionada. Uma conexão adequada sustenta o desempenho dos sistemas corporativos, das operações de frente de caixa e vendas, das consultas de estoque em tempo real e da comunicação interna entre as equipes.",
  },
  {
    title: "Integração entre lojas e estruturas corporativas",
    description:
      "Operações distribuídas entre lojas, administração e centro de distribuição ganham fluidez quando suas estruturas conversam como uma única rede. Com a solução LAN to LAN, podemos avaliar a interligação privada entre as unidades da Carajás para integrar sistemas e facilitar a troca de informações conforme os requisitos técnicos da empresa.",
  },
  {
    title: "Estabilidade para manter a operação em movimento",
    description:
      "Quando o atendimento, o faturamento e a gestão diária dependem de aplicações digitais, a previsibilidade da conexão faz diferença. O Link Dedicado oferece banda contratada exclusiva e parâmetros voltados ao uso corporativo, contribuindo para a estabilidade dos sistemas essenciais ao longo da rotina operacional.",
  },
  {
    title: "Redundância para pontos estratégicos",
    description:
      "Para unidades e estruturas consideradas críticas na operação, vale avaliar caminhos alternativos de conectividade. Uma estratégia de redundância planejada em conjunto ajuda a reduzir a dependência de um único link ou rota e amplia a resiliência operacional, de acordo com a viabilidade técnica de cada localidade.",
  },
  {
    title: "Uma solução construída para a Carajás",
    description:
      "Não acreditamos em pacotes prontos para operações com essa complexidade. Nossa proposta é conhecer de perto a estrutura da Carajás, compreender suas demandas reais, avaliar cada ponto de conexão e desenhar uma solução personalizada sob os aspectos técnicos, operacionais e comerciais.",
  },
];

const CORPORATE_SOLUTIONS = [
  {
    badge: "Conectividade Exclusiva",
    title: "Link Dedicado",
    summary:
      "Solução de conectividade empresarial com banda contratada exclusiva e parâmetros técnicos definidos de acordo com as necessidades da operação.",
    highlights: [
      "Banda contratada exclusiva, sem compartilhamento com outros usuários",
      "Estabilidade e baixa latência para sistemas ERP, nuvem e aplicações críticas",
      "IP Fixo para servidores, VPN, câmeras e acesso remoto seguro",
    ],
    idealFor:
      "Sistemas corporativos, aplicações empresariais em nuvem, comunicação integrada e operações críticas.",
    icon: "zap",
  },
  {
    badge: "Interligação de Unidades",
    title: "LAN to LAN",
    summary:
      "Interligação privada entre diferentes unidades e redes corporativas, permitindo comunicação direta e segura entre estruturas empresariais.",
    highlights: [
      "Comunicação privada entre lojas, escritórios, estoques e centros de distribuição",
      "Acesso integrado aos mesmos sistemas, servidores e recursos internos",
      "Tráfego corporativo estruturado com segurança e desempenho",
    ],
    idealFor:
      "Matriz, filiais, centros de distribuição e unidades administrativas que operam de forma integrada.",
    icon: "network",
  },
  {
    badge: "Continuidade Operacional",
    title: "Redundância de Conexão",
    summary:
      "Soluções alternativas de conectividade para aumentar a resiliência da operação e reduzir dependências de um único link ou rota, conforme viabilidade técnica.",
    highlights: [
      "Links redundantes para minimizar riscos de interrupção operacional",
      "Continuidade para sistemas de venda, gestão e comunicação corporativa",
      "Arquitetura avaliada conforme a criticidade e localização de cada unidade",
    ],
    idealFor:
      "Unidades estratégicas e operações que demandam continuidade e proteção contra falhas de rota única.",
    icon: "shield",
  },
  {
    badge: "Engenharia Sob Medida",
    title: "Projetos Personalizados",
    summary:
      "Capacidade técnica para avaliar as necessidades específicas de cada empresa e desenvolver projetos de conectividade compatíveis com sua estrutura.",
    highlights: [
      "Levantamento técnico alinhado à realidade física e operacional de cada ponto",
      "Dimensionamento de conectividade e gestão de rede corporativa (RB e AP de Teto)",
      "Implantação planejada em conjunto com a equipe técnica do cliente",
    ],
    idealFor:
      "Expansões, adequações de infraestrutura e demandas corporativas com requisitos técnicos específicos.",
    icon: "layers",
  },
];

const PARTNERSHIP_STEPS = [
  { step: "01", title: "Entendimento", description: "Conhecer a estrutura e as necessidades da Carajás." },
  { step: "02", title: "Diagnóstico", description: "Avaliar os requisitos de conectividade e infraestrutura." },
  { step: "03", title: "Planejamento", description: "Desenvolver uma solução personalizada." },
  { step: "04", title: "Proposta", description: "Apresentar condições técnicas e comerciais." },
  {
    step: "05",
    title: "Implantação",
    description: "Executar o projeto após aprovação e alinhamento entre as equipes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Estilos reutilizáveis (tipografia 'Space Grotesk' do original)     */
/* ------------------------------------------------------------------ */
const sectionTitle: CSSProperties = {
  margin: "0 0 14px",
  textAlign: "center",
  font: "700 clamp(32px,4.6vw,52px)/1.04 'Space Grotesk',sans-serif",
  color: "#fff",
  letterSpacing: "-.02em",
  textShadow: "0 3px 18px rgba(0,40,20,.45)",
  textWrap: "balance",
};

const sectionDivider: CSSProperties = {
  width: 78,
  height: 5,
  borderRadius: 3,
  background: "#dff900",
  margin: "0 auto 18px",
  boxShadow: "0 0 18px rgba(223,249,0,.65)",
};

const sectionLead: CSSProperties = {
  margin: "0 auto 36px",
  textAlign: "center",
  maxWidth: 700,
  font: "600 16px/1.6 'Manrope',sans-serif",
  color: "#eafce0",
  textShadow: "0 2px 12px rgba(0,40,20,.4)",
  textWrap: "pretty",
};

const cardLabel: CSSProperties = {
  font: "700 12px/1 'Space Grotesk',sans-serif",
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "#dff900",
};

const cardText: CSSProperties = {
  margin: 0,
  font: "500 14.5px/1.6 'Manrope',sans-serif",
  color: "#cfe6d8",
};

const iconBox: CSSProperties = {
  flex: "none",
  width: 46,
  height: 46,
  borderRadius: 13,
  display: "grid",
  placeItems: "center",
  background: "rgba(223,249,0,.14)",
  boxShadow: "inset 0 0 0 1px rgba(223,249,0,.35)",
};

/* ------------------------------------------------------------------ */
/*  Ícones                                                             */
/* ------------------------------------------------------------------ */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3 .79.8-2.92-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.71-6.1c-.26-.13-1.53-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.83-.82 1-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.5c-.17 0-.44.06-.67.31-.23.26-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.32 3.81.6.26 1.07.42 1.44.53.6.19 1.16.16 1.59.1.49-.07 1.53-.62 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3z" />
    </svg>
  );
}

function CheckIcon({ size = 14, color = "#dff900" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SolutionIcon({ type }: { type: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#06301c",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "zap":
      return (
        <svg {...common} fill="#06301c" strokeWidth={1.6}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <path d="M12 9v6" />
          <path d="M7 12h.01M7 18h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Linha arrastável (mouse: clicar e arrastar · touch: swipe nativo)  */
/* ------------------------------------------------------------------ */
function DragRow({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [edges, setEdges] = useState({ prev: false, next: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ prev: el.scrollLeft > 4, next: el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    let ro: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(updateEdges);
      ro.observe(el);
    }
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
      ro?.disconnect();
    };
  }, [updateEdges]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 22 : Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const stopDragging = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    const el = trackRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const fade = 64;
  const mask =
    edges.prev && edges.next
      ? `linear-gradient(to right,transparent,#000 ${fade}px,#000 calc(100% - ${fade}px),transparent)`
      : edges.next
        ? `linear-gradient(to right,#000,#000 calc(100% - ${fade}px),transparent)`
        : edges.prev
          ? `linear-gradient(to right,transparent,#000 ${fade}px,#000)`
          : "none";

  return (
    <div className="sc-row-wrap">
      <div
        ref={trackRef}
        className={`sc-row-track${isDragging ? " is-dragging" : ""}`}
        role="region"
        aria-label={label}
        tabIndex={0}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {children}
      </div>
      <button
        type="button"
        className={`sc-row-btn sc-row-btn-prev${edges.prev ? "" : " is-hidden"}`}
        aria-label="Anterior"
        aria-hidden={!edges.prev}
        tabIndex={edges.prev ? 0 : -1}
        onClick={() => scrollByStep(-1)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        className={`sc-row-btn sc-row-btn-next${edges.next ? "" : " is-hidden"}`}
        aria-label="Próximo"
        aria-hidden={!edges.next}
        tabIndex={edges.next ? 0 : -1}
        onClick={() => scrollByStep(1)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Linha com loop contínuo: puxar para qualquer lado nunca acaba      */
/* ------------------------------------------------------------------ */
function InfiniteRow({ children, label, itemGap = 22 }: { children: ReactNode; label: string; itemGap?: number }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeDot, setActiveDot] = useState<0 | 1>(0);

  /** largura de um conjunto completo + espaçamento real = período do loop */
  const period = useCallback(() => {
    const el = trackRef.current;
    const set = el?.querySelector<HTMLElement>(".sc-inf-set");
    const next = set?.nextElementSibling as HTMLElement | null;
    if (!set || !next) return itemGap;
    const gap = parseFloat(window.getComputedStyle(next).marginLeft) || 0;
    return set.getBoundingClientRect().width + gap;
  }, [itemGap]);

  /** mantém o scroll sempre dentro do ciclo e atualiza os 2 pontos de posição */
  const syncLoop = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const p = period();
    if (!p) return;
    let delta = 0;
    if (el.scrollLeft < p * 0.5) delta = p;
    else if (el.scrollLeft > p * 1.5) delta = -p;
    if (delta) {
      el.scrollLeft = el.scrollLeft + delta;
      // durante um arraste, a origem acompanha o reposicionamento
      if (drag.current.active) drag.current.startScroll += delta;
    }
    const rel = (((el.scrollLeft - p) % p) + p) % p;
    setActiveDot(rel >= p * 0.42 ? 1 : 0);
  }, [period]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const align = () => {
      const p = period();
      if (p) {
        el.scrollLeft = p;
        setActiveDot(0);
      }
    };
    align();
    el.addEventListener("scroll", syncLoop, { passive: true });
    window.addEventListener("resize", align);
    return () => {
      el.removeEventListener("scroll", syncLoop);
      window.removeEventListener("resize", align);
    };
  }, [period, syncLoop]);

  const jumpToHalf = (half: 0 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const p = period();
    if (!p) return;
    el.scrollTo({ left: half === 0 ? p : p + p * 0.48, behavior: "smooth" });
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    syncLoop();
  };

  const stopDragging = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    const el = trackRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <div>
      <div
        ref={trackRef}
        className={`sc-inf-track${isDragging ? " is-dragging" : ""}`}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="sc-inf-set">{children}</div>
        <div className="sc-inf-set" aria-hidden="true">
          {children}
        </div>
        <div className="sc-inf-set" aria-hidden="true">
          {children}
        </div>
      </div>

      <div className="sc-inf-dots" role="tablist" aria-label="Posição na lista de clientes">
        <button
          type="button"
          className={`sc-inf-dot${activeDot === 0 ? " is-active" : ""}`}
          aria-label="Início da lista de clientes"
          aria-pressed={activeDot === 0}
          onClick={() => jumpToHalf(0)}
        />
        <button
          type="button"
          className={`sc-inf-dot${activeDot === 1 ? " is-active" : ""}`}
          aria-label="Continuação da lista de clientes"
          aria-pressed={activeDot === 1}
          onClick={() => jumpToHalf(1)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div
      className="sc-root"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: `linear-gradient(rgba(35,150,15,.12),rgba(6,45,26,.28)),url('${IMAGES.bgTexture}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== HERO (como no original: logo + robô voando) ===== */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={IMAGES.robot}
          alt=""
          aria-hidden="true"
          className="sc-print-hide sc-fly"
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            width: "clamp(280px,32vw,480px)",
            height: "auto",
            zIndex: 100,
            pointerEvents: "none",
            filter:
              "drop-shadow(-28px 0 12px rgba(0,45,18,.55)) drop-shadow(-56px 0 26px rgba(0,45,18,.34)) drop-shadow(-88px 0 38px rgba(0,45,18,.16))",
            animation: "scFly 13s linear infinite",
          }}
          decoding="async"
          loading="lazy"
        />

        <div
          className="sc-wrap sc-hero"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 1180,
            margin: "0 auto",
            padding: "64px 28px 84px",
            textAlign: "center",
          }}
        >
          <header style={{ animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 16px",
                borderRadius: 999,
                background: "rgba(4,30,16,.82)",
                boxShadow: "inset 0 0 0 1px rgba(223,249,0,.35)",
                font: "600 12px/1 'Space Grotesk',sans-serif",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#dff900",
              }}
            >
              PROPOSTA DE PARCERIA CORPORATIVA
            </span>

            <div style={{ margin: "26px auto 0", maxWidth: 520 }}>
              <img
                src={LOGOS.superConnect}
                alt="Super Connect"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 14px 30px rgba(0,40,15,.35))",
                }}
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Super Connect × Carajás Home Center — Proposta de Parceria Corporativa
            </h1>

            <div
              style={{
                margin: "22px auto 0",
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 22px",
                borderRadius: 999,
                background: "#dff900",
                boxShadow: "0 12px 26px -8px rgba(223,249,0,.6)",
                font: "700 13px/1.2 'Space Grotesk',sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#06301c",
              }}
            >
              Super Connect × Carajás Home Center
            </div>

            <p
              style={{
                margin: "22px auto 0",
                maxWidth: 740,
                font: "500 19px/1.55 'Manrope',sans-serif",
                color: "#fff",
                textShadow: "0 2px 14px rgba(0,40,20,.45)",
                textWrap: "pretty",
              }}
            >
              A Super Connect apresenta uma proposta de parceria em conectividade e infraestrutura corporativa,
              desenvolvida para atender às necessidades de uma operação de grande porte.
            </p>
          </header>
        </div>
      </div>

      {/* ===== CORPO ===== */}
      <div
        className="sc-wrap"
        style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 28px 100px" }}
      >
        {/* ============================================================
            1 — CONHEÇA NOSSA EMPRESA (apresentação, com imagens reais)
           ============================================================ */}
        <section style={{ animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s" }}>
          <h2 style={sectionTitle}>Conheça nossa empresa</h2>
          <div style={{ ...sectionDivider, margin: "0 auto 40px" }} />

          <div
            className="sc-inst-grid"
            style={{ display: "grid", gridTemplateColumns: "1.14fr 0.86fr", gap: 34, alignItems: "center" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={IMAGES.headquarters}
                alt="Sede da Super Connect"
                loading="lazy"
                decoding="async"
                style={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1080 / 779",
                  borderRadius: "0 0 24px 24px",
                  filter: "drop-shadow(0 28px 44px rgba(0,40,15,.55))",
                }}
              />
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 24px",
                  font: "500 16px/1.7 'Manrope',sans-serif",
                  color: "#eafce0",
                  textShadow: "0 1px 10px rgba(0,40,20,.35)",
                  textWrap: "pretty",
                }}
              >
                Somos um provedor regional movido por tecnologia e pessoas. Investimos em infraestrutura própria
                e em uma equipe dedicada para levar internet de verdade — estável, rápida e com atendimento
                humano — para a sua casa e para a sua empresa.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  {
                    title: "Atendimento humanizado e ágil",
                    text: "Gente de verdade pronta para resolver, com rapidez e sem robôs no meio do caminho.",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dff900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                  },
                  {
                    title: "Tecnologia de ponta",
                    text: "Fibra óptica de alta performance, CPD próprio e links redundantes monitorados 24/7.",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dff900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="8" rx="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" />
                        <path d="M6 6h.01M6 18h.01" />
                      </svg>
                    ),
                  },
                  {
                    title: "Compromisso local",
                    text: "Estabilidade e investimento contínuo no desenvolvimento da nossa região.",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dff900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={iconBox}>{item.icon}</span>
                    <div>
                      <div style={{ font: "700 16px/1.25 'Space Grotesk',sans-serif", color: "#fff", marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ font: "500 13.5px/1.55 'Manrope',sans-serif", color: "#c8e6cf" }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Galeria real da operação */}
          <div
            className="sc-gal"
            style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}
          >
            {[
              [IMAGES.operationsCenter, "Central de operações Super Connect"],
              [IMAGES.team, "Equipe Super Connect"],
              [IMAGES.monitoring, "Monitoramento de rede em tempo real"],
              [IMAGES.monitoringPanel, "Painel de monitoramento da rede"],
            ].map(([src, alt]) => (
              <div
                key={src}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 20px 44px -26px rgba(0,40,20,.7), inset 0 0 0 1px rgba(223,249,0,.14)",
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", aspectRatio: "4/3" }}
                />
              </div>
            ))}
          </div>

          {/* Equipamentos corporativos documentados */}
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                img: IMAGES.routerBoard,
                label: "RouterBoard",
                title: "RB — Gestão de Rede",
                text: "Gestão e roteamento de rede corporativa de alta performance.",
              },
              {
                img: IMAGES.apTeto,
                label: "Conectividade Interna",
                title: "AP de Teto Corporativo",
                text: "Cobertura wireless corporativa planejada para ambientes empresariais.",
              },
            ].map((eq) => (
              <div
                key={eq.title}
                className="sc-card-green"
                style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 22px" }}
              >
                <div
                  style={{
                    flex: "none",
                    width: 84,
                    height: 84,
                    borderRadius: 16,
                    background: "#fff",
                    boxShadow: "inset 0 0 0 2px #dff900",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                  }}
                >
                  <img
                    src={eq.img}
                    alt={eq.title}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div style={{ ...cardLabel, font: "700 11.5px/1 'Space Grotesk',sans-serif" }}>{eq.label}</div>
                  <h3 style={{ margin: "5px 0", font: "700 18px/1.2 'Space Grotesk',sans-serif", color: "#fff" }}>
                    {eq.title}
                  </h3>
                  <p style={{ margin: 0, font: "500 13.5px/1.45 'Manrope',sans-serif", color: "#c8e6cf" }}>{eq.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            2 — EMPRESAS QUE JÁ CONFIAM NA NOSSA CONECTIVIDADE
           ============================================================ */}
        <section
          className="sc-sec"
          style={{ marginTop: 112, animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s" }}
        >
          <h2 style={sectionTitle}>Empresas que já confiam na nossa conectividade.</h2>
          <div style={{ ...sectionDivider, margin: "0 auto 18px" }} />
          <InfiniteRow label="Clientes da Super Connect — arraste para o lado, a sequência se repete">
            {LOGOS.clients.map((client) => (
              <div key={client.name} className="sc-logo-slot" title={client.name}>
                <img
                  src={client.logo}
                  alt={client.name}
                  draggable={false}
                  decoding="async"
                  loading={client.name === "Grupo Coagro" ? "eager" : "lazy"}
                />
              </div>
            ))}
          </InfiniteRow>
        </section>

        {/* ============================================================
            3 — UMA PARCERIA ALINHADA ÀS NECESSIDADES DA CARAJÁS
           ============================================================ */}
        <section
          className="sc-sec"
          style={{
            marginTop: 112,
            position: "relative",
            borderRadius: 30,
            overflow: "hidden",
            background: "linear-gradient(150deg,#063a22 0%,#052d1a 60%,#04231a 100%)",
            boxShadow: "0 40px 90px -40px rgba(0,40,20,.75), inset 0 0 0 1px rgba(223,249,0,.22)",
            animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -90,
              right: -70,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(223,249,0,.2),transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", padding: "52px clamp(24px,4vw,56px) 56px" }}>
            <h2 style={{ ...sectionTitle, margin: "0 auto 14px", maxWidth: 820, textShadow: "none" }}>
              Uma parceria alinhada às necessidades da Carajás.
            </h2>
            <div style={{ ...sectionDivider, margin: "0 auto 26px" }} />

            {/* Logo oficial da Carajás, em destaque (sem caixa) */}
            <div className="sc-carajas-logo">
              <img src={LOGOS.carajas} alt="Carajás Home Center" decoding="async" loading="lazy" />
            </div>

            {/* Benefícios / oportunidades a avaliar em conjunto */}
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 16 }}>
              {CARAJAS_OPPORTUNITIES.map((item, idx) => (
                <div
                  key={item.title}
                  className="sc-card-dark"
                  style={{ display: "flex", alignItems: "flex-start", gap: 18, padding: "22px 26px" }}
                >
                  <span
                    style={{
                      ...iconBox,
                      boxShadow: "inset 0 0 0 1px rgba(223,249,0,.38)",
                      font: "800 16px/1 'Space Grotesk',sans-serif",
                      color: "#dff900",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        font: "700 clamp(17px, 2vw, 20px)/1.25 'Space Grotesk',sans-serif",
                        color: "#ffffff",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, font: "500 14.5px/1.6 'Manrope',sans-serif", color: "#c8e6cf" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Texto de encerramento — pessoal, próximo e institucional */}
            <div style={{ marginTop: 44, textAlign: "center" }}>
              <div style={{ ...sectionDivider, width: 48, height: 4, margin: "0 auto 22px" }} />
              <p
                style={{
                  margin: "0 auto 16px",
                  maxWidth: 840,
                  font: "500 clamp(17px,2vw,20px)/1.75 'Manrope',sans-serif",
                  color: "#eafce0",
                  textWrap: "pretty",
                }}
              >
                A Super Connect reconhece a dimensão e a importância de uma operação como a da Carajás Home Center,
                e gostaria de ter a oportunidade de participar da sua estrutura de conectividade.
              </p>
              <p
                style={{
                  margin: "0 auto",
                  maxWidth: 840,
                  font: "500 clamp(16.5px,1.9vw,19px)/1.75 'Manrope',sans-serif",
                  color: "#c8e6cf",
                  textWrap: "pretty",
                }}
              >
                Mais do que apresentar serviços, queremos conhecer de perto as necessidades de cada unidade,
                entender seus desafios operacionais e construir uma parceria duradoura, baseada em confiança,
                qualidade técnica e compromisso com resultados.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            4 — SOLUÇÕES CORPORATIVAS
           ============================================================ */}
        <section
          className="sc-sec"
          style={{ marginTop: 112, animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s" }}
        >
          <h2 style={sectionTitle}>Soluções Corporativas</h2>
          <div style={sectionDivider} />
          <p style={{ ...sectionLead, maxWidth: 660, marginBottom: 20 }}>
            Arquitetura de telecomunicações estruturada para operações empresariais, com dimensionamento técnico
            alinhado à realidade de cada unidade da Carajás.
          </p>

          <DragRow label="Soluções corporativas da Super Connect">
            {CORPORATE_SOLUTIONS.map((sol) => (
              <div
                key={sol.title}
                className="sc-card-green sc-sol-card"
                style={{
                  padding: "30px 26px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <span style={{ ...cardLabel, font: "700 11.5px/1.2 'Space Grotesk',sans-serif" }}>{sol.badge}</span>
                    <span
                      style={{
                        flex: "none",
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "grid",
                        placeItems: "center",
                        background: "#dff900",
                        boxShadow: "0 10px 22px -8px rgba(223,249,0,.6)",
                      }}
                    >
                      <SolutionIcon type={sol.icon} />
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: "0 0 12px",
                      font: "700 clamp(22px, 2.4vw, 26px)/1.15 'Space Grotesk',sans-serif",
                      color: "#ffffff",
                      letterSpacing: "-.01em",
                    }}
                  >
                    {sol.title}
                  </h3>

                  <p style={{ ...cardText, marginBottom: 18 }}>{sol.summary}</p>

                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {sol.highlights.map((point) => (
                      <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span
                          style={{
                            flex: "none",
                            width: 24,
                            height: 24,
                            marginTop: 1,
                            borderRadius: 7,
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(223,249,0,.14)",
                            boxShadow: "inset 0 0 0 1px rgba(223,249,0,.35)",
                          }}
                        >
                          <CheckIcon />
                        </span>
                        <span style={{ font: "500 13.5px/1.45 'Manrope',sans-serif", color: "#eafce0" }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(223,249,0,.18)",
                    font: "600 12.5px/1.45 'Manrope',sans-serif",
                    color: "#a9c9b3",
                  }}
                >
                  <strong style={{ color: "#fff" }}>Aplicação:</strong> {sol.idealFor}
                </div>
              </div>
            ))}
          </DragRow>

          {/* Comparativo: Conexão compartilhada × Link Dedicado */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 22,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                borderRadius: 24,
                padding: "28px 26px",
                background: "linear-gradient(150deg,#0a2a1c,#072317)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span
                  style={{
                    flex: "none",
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,.06)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9fb0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 8 12 12 9 14" />
                  </svg>
                </span>
                <div>
                  <div style={{ font: "700 20px/1.1 'Space Grotesk',sans-serif", color: "#c6d3cc" }}>Banda Larga Comum</div>
                  <div style={{ font: "600 12px/1 'Manrope',sans-serif", color: "#8fa398", marginTop: 3 }}>
                    Conexão compartilhada
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
                {[
                  "Tráfego compartilhado com outros usuários da rede",
                  "Maior suscetibilidade a oscilações nos horários de pico",
                  "Sem arquitetura dedicada para interligação entre unidades",
                  "Parâmetros gerais voltados ao uso convencional",
                ].map((line) => (
                  <li
                    key={line}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "11px 0",
                      borderTop: "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <span style={{ flex: "none" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9fb0a6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" x2="12" y1="9" y2="13" />
                        <line x1="12" x2="12.01" y1="17" y2="17" />
                      </svg>
                    </span>
                    <span style={{ font: "600 14px/1.35 'Manrope',sans-serif", color: "#b9c7bf" }}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: 24,
                padding: "28px 26px",
                background: "linear-gradient(150deg,#0b4429,#063a22)",
                boxShadow: "inset 0 0 0 2px #dff900, 0 0 34px -6px rgba(223,249,0,.4)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -13,
                  left: 26,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "#dff900",
                  color: "#06301c",
                  font: "800 10.5px/1 'Space Grotesk',sans-serif",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 20px rgba(223,249,0,.5)",
                }}
              >
                Padrão Corporativo
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span
                  style={{
                    flex: "none",
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(223,249,0,.16)",
                    boxShadow: "inset 0 0 0 1px rgba(223,249,0,.4)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#dff900" stroke="#dff900" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <div>
                  <div style={{ font: "700 20px/1.1 'Space Grotesk',sans-serif", color: "#fff" }}>Link Dedicado Corporativo</div>
                  <div style={{ font: "600 12px/1 'Manrope',sans-serif", color: "#dff900", marginTop: 3 }}>
                    Conexão exclusiva para sua empresa
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
                {[
                  "Banda contratada exclusiva (download e upload)",
                  "Tráfego dedicado exclusivamente à operação da empresa",
                  "Estabilidade e baixa latência mesmo em horários de pico",
                  "Parâmetros técnicos e atendimento corporativo dedicado",
                ].map((line) => (
                  <li
                    key={line}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "11px 0",
                      borderTop: "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#dff900",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <CheckIcon size={13} color="#06301c" />
                    </span>
                    <span style={{ font: "600 14px/1.35 'Manrope',sans-serif", color: "#eafce0" }}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Acordeões técnicos */}
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <details
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(4,30,16,.72)",
                boxShadow: "inset 0 0 0 1px rgba(223,249,0,.22)",
              }}
            >
              <summary style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer", padding: "20px 24px", listStyle: "none" }}>
                <span style={{ ...iconBox, width: 40, height: 40, borderRadius: 11 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#dff900" stroke="#dff900" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <span style={{ flex: 1, font: "700 clamp(16px,2.2vw,19px)/1.25 'Space Grotesk',sans-serif", color: "#fff" }}>
                  Como funciona o Link Dedicado na prática?
                </span>
                <span
                  className="acc-plus"
                  style={{
                    flex: "none",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(223,249,0,.14)",
                    color: "#dff900",
                    font: "700 20px/1 'Space Grotesk',sans-serif",
                  }}
                >
                  +
                </span>
              </summary>
              <div style={{ padding: "2px 24px 24px" }}>
                <p style={{ margin: 0, font: "500 14.5px/1.65 'Manrope',sans-serif", color: "#cfe6d8" }}>
                  O <strong style={{ color: "#dff900" }}>Link Dedicado</strong> entrega uma conexão exclusiva para a
                  empresa, com banda contratada e parâmetros técnicos definidos de acordo com os requisitos da
                  operação — ideal para sustentar sistemas ERP em nuvem, videoconferências, telefonia IP, VPNs e
                  servidores com previsibilidade.
                </p>
              </div>
            </details>

            <details
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(4,30,16,.72)",
                boxShadow: "inset 0 0 0 1px rgba(223,249,0,.22)",
              }}
            >
              <summary style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer", padding: "20px 24px", listStyle: "none" }}>
                <span style={{ ...iconBox, width: 40, height: 40, borderRadius: 11 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dff900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="6" rx="2" />
                    <rect x="2" y="15" width="20" height="6" rx="2" />
                    <path d="M12 9v6" />
                    <path d="M7 12h.01M7 18h.01" />
                  </svg>
                </span>
                <span style={{ flex: 1, font: "700 clamp(16px,2.2vw,19px)/1.25 'Space Grotesk',sans-serif", color: "#fff" }}>
                  Integração entre Link Dedicado e LAN to LAN em operações multi-unidades
                </span>
                <span
                  className="acc-plus"
                  style={{
                    flex: "none",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(223,249,0,.14)",
                    color: "#dff900",
                    font: "700 20px/1 'Space Grotesk',sans-serif",
                  }}
                >
                  +
                </span>
              </summary>
              <div style={{ padding: "2px 24px 24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(223,249,0,.08)", boxShadow: "inset 0 0 0 1px rgba(223,249,0,.25)" }}>
                    <div style={{ font: "700 14px/1.2 'Space Grotesk',sans-serif", color: "#dff900", marginBottom: 6 }}>Link Dedicado</div>
                    <div style={{ font: "500 13.5px/1.5 'Manrope',sans-serif", color: "#cfe6d8" }}>
                      Garante conectividade exclusiva e estável para acesso a sistemas em nuvem e comunicação
                      externa de cada unidade.
                    </div>
                  </div>
                  <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(223,249,0,.08)", boxShadow: "inset 0 0 0 1px rgba(223,249,0,.25)" }}>
                    <div style={{ font: "700 14px/1.2 'Space Grotesk',sans-serif", color: "#dff900", marginBottom: 6 }}>LAN to LAN</div>
                    <div style={{ font: "500 13.5px/1.5 'Manrope',sans-serif", color: "#cfe6d8" }}>
                      Conecta redes privadas entre matriz, lojas, estoques e centros de distribuição formando uma
                      rede corporativa integrada.
                    </div>
                  </div>
                </div>
                <p style={{ margin: 0, font: "500 14px/1.6 'Manrope',sans-serif", color: "#cfe6d8" }}>
                  Em operações com múltiplas unidades, as duas soluções podem atuar em conjunto para unir
                  conectividade dedicada externa e comunicação interna segura entre pontos estratégicos.
                </p>
              </div>
            </details>
          </div>
          {/* ---- O PODER DA NOSSA CONEXÃO (CPD) — como no original ---- */}
          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 26,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(28px,3vw,44px)",
                borderRadius: 24,
                background: "linear-gradient(150deg,#063a22,#052d1a)",
                boxShadow: "0 30px 70px -34px rgba(0,40,20,.7), inset 0 0 0 1px rgba(223,249,0,.14)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 14px",
                  font: "700 clamp(30px,4.2vw,48px)/1.04 'Space Grotesk',sans-serif",
                  color: "#fff",
                  letterSpacing: "-.02em",
                  textWrap: "pretty",
                }}
              >
                O Poder da Nossa Conexão
              </h2>
              <div style={{ ...sectionDivider, margin: "0 0 18px" }} />
              <p style={{ margin: "0 0 18px", font: "500 16px/1.65 'Manrope',sans-serif", color: "#cfe6d8", textWrap: "pretty" }}>
                Contamos com um{" "}
                <strong style={{ color: "#dff900" }}>CPD (Centro de Processamento de Dados) próprio</strong>, links
                redundantes e monitoramento 24/7. Nossa infraestrutura de fibra óptica é dimensionada para entregar
                estabilidade real, baixa latência e velocidade que não cai nos horários de pico.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[
                  ["24/7", "Monitoramento ativo"],
                  ["Links", "Redundantes"],
                  ["Baixa", "Latência"],
                ].map(([big, small]) => (
                  <div
                    key={big}
                    style={{
                      flex: 1,
                      minWidth: 120,
                      padding: "14px 16px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,.05)",
                      boxShadow: "inset 0 0 0 1px rgba(223,249,0,.2)",
                    }}
                  >
                    <div style={{ font: "700 26px/1 'Space Grotesk',sans-serif", color: "#dff900" }}>{big}</div>
                    <div style={{ marginTop: 4, font: "500 12.5px/1.3 'Manrope',sans-serif", color: "#a9c9b3" }}>
                      {small}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                minHeight: 320,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "inset 0 0 0 2px rgba(223,249,0,.4), 0 30px 70px -34px rgba(0,40,20,.7)",
              }}
            >
              <img
                src={IMAGES.datacenter}
                alt="Data Center Super Connect"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                decoding="async"
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg,rgba(4,28,15,0) 45%,rgba(4,28,15,.88))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 22,
                  bottom: 20,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 16px",
                  borderRadius: 999,
                  background: "rgba(4,28,15,.7)",
                  boxShadow: "inset 0 0 0 1px rgba(223,249,0,.4)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dff900", boxShadow: "0 0 10px #dff900" }} />
                <span style={{ font: "700 13px/1 'Space Grotesk',sans-serif", letterSpacing: ".04em", color: "#fff" }}>
                  Nosso CPD · Data Center
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* ============================================================
            5 — CONSTRUINDO UMA PARCERIA
           ============================================================ */}
        <section
          className="sc-sec"
          style={{ marginTop: 112, animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s" }}
        >
          <h2 style={sectionTitle}>Uma parceria começa com o entendimento das necessidades.</h2>
          <div style={sectionDivider} />
          <p style={{ ...sectionLead, maxWidth: 660, marginBottom: 42 }}>
            Estruturamos cada projeto corporativo em etapas claras, garantindo alinhamento técnico e comercial com
            a equipe da Carajás.
          </p>

          <div
            className="sc-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 18,
              alignItems: "stretch",
            }}
          >
            {PARTNERSHIP_STEPS.map((item) => (
              <div
                key={item.step}
                className="sc-card-green"
                style={{ padding: "26px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: "#dff900",
                      color: "#06301c",
                      font: "800 17px/1 'Space Grotesk',sans-serif",
                      marginBottom: 16,
                      boxShadow: "0 10px 22px -8px rgba(223,249,0,.6)",
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ margin: "0 0 8px", font: "700 20px/1.2 'Space Grotesk',sans-serif", color: "#fff" }}>{item.title}</h3>
                  <p style={{ margin: 0, font: "500 14px/1.55 'Manrope',sans-serif", color: "#cfe6d8" }}>{item.description}</p>
                </div>
                <div style={{ marginTop: 18, height: 4, width: 36, borderRadius: 2, background: "#dff900", boxShadow: "0 0 12px rgba(223,249,0,.6)" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            6 — ENCERRAMENTO E CONVITE COMERCIAL
           ============================================================ */}
        <section
          className="sc-sec"
          style={{ marginTop: 104, animation: "scFadeUp .8s cubic-bezier(.16,1,.3,1) both .08s" }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 30,
              background: "linear-gradient(135deg,#063a22 0%,#052d1a 60%,#04231a 100%)",
              boxShadow: "0 40px 90px -40px rgba(0,40,20,.75), inset 0 0 0 1px rgba(223,249,0,.22)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -90,
                left: -40,
                width: 360,
                height: 360,
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(223,249,0,.16),transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "stretch",
                gap: "clamp(20px,3vw,44px)",
                padding: "clamp(28px,3.4vw,48px)",
              }}
            >
              {/* Consultor Eduardo */}
              <div
                style={{
                  flex: "0 1 280px",
                  minWidth: 220,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(270px,86%)",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "radial-gradient(circle,rgba(223,249,0,.32),rgba(223,249,0,0) 66%)",
                    pointerEvents: "none",
                  }}
                />
                <img
                  src={IMAGES.eduardo}
                  alt="Eduardo — Consultor Comercial Super Connect"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "block",
                    width: "auto",
                    maxWidth: "100%",
                    height: "clamp(250px,29vw,330px)",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    filter: "drop-shadow(0 24px 30px rgba(0,0,0,.45))",
                  }}
                  decoding="async"
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%) rotate(-2deg)",
                    padding: "11px 24px",
                    borderRadius: 12,
                    background: "linear-gradient(120deg,#0a4d2b,#063a22)",
                    boxShadow: "0 14px 30px -10px rgba(0,0,0,.55)",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ font: "600 11px/1 'Space Grotesk',sans-serif", letterSpacing: ".08em", textTransform: "uppercase", color: "#dff900" }}>
                    Consultor Comercial
                  </div>
                  <div style={{ marginTop: 3, font: "700 26px/1 'Space Grotesk',sans-serif", color: "#fff" }}>Eduardo</div>
                </div>
              </div>

              {/* Convite comercial */}
              <div style={{ flex: 1, minWidth: 270, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
                <h2
                  style={{
                    margin: 0,
                    font: "700 clamp(28px,3.6vw,42px)/1.06 'Space Grotesk',sans-serif",
                    color: "#fff",
                    letterSpacing: "-.015em",
                    textWrap: "balance",
                  }}
                >
                  Vamos construir essa parceria?
                </h2>
                <p style={{ margin: 0, font: "500 15.5px/1.6 'Manrope',sans-serif", color: "#cfe6d8", textWrap: "pretty" }}>
                  A Super Connect está pronta para conhecer as necessidades da Carajás e apresentar soluções que
                  contribuam para uma operação cada vez mais conectada.
                </p>
                <p style={{ margin: 0, font: "600 15.5px/1.6 'Manrope',sans-serif", color: "#eafce0", textWrap: "pretty" }}>
                  Queremos construir uma parceria baseada em confiança, qualidade e compromisso com resultados.
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-cta-btn"
                  style={{
                    marginTop: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    padding: "13px 24px 13px 13px",
                    borderRadius: 999,
                    background: "#dff900",
                    boxShadow: "0 16px 34px -10px rgba(223,249,0,.7)",
                    alignSelf: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "#06301c",
                      color: "#dff900",
                    }}
                  >
                    <WhatsAppIcon size={23} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                    <span
                      style={{
                        font: "800 clamp(14px, 1.7vw, 16px)/1.15 'Space Grotesk',sans-serif",
                        letterSpacing: ".03em",
                        color: "#06301c",
                        textTransform: "uppercase",
                      }}
                    >
                      Falar com nossa equipe comercial
                    </span>
                    <span style={{ marginTop: 3, font: "700 13.5px/1.2 'Manrope',sans-serif", color: "#06301c", opacity: 0.85 }}>
                      WhatsApp Comercial · {WHATSAPP_DISPLAY}
                    </span>
                  </span>
                </a>

                <p style={{ margin: "4px 0 0", font: "500 13px/1.4 'Manrope',sans-serif", color: "#a9c9b3" }}>{WEBSITE_DISPLAY}</p>
              </div>

              {/* QR Code */}
              <div
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  minWidth: 180,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: 14,
                    borderRadius: 20,
                    background: "#fff",
                    boxShadow: "inset 0 0 0 3px #dff900, 0 16px 34px -12px rgba(0,0,0,.5)",
                  }}
                >
                  <img
                    src={IMAGES.qrCode}
                    alt="QR Code Contato Comercial Super Connect"
                    style={{ display: "block", width: "clamp(145px,14vw,175px)", height: "auto", borderRadius: 10 }}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div style={{ textAlign: "center", font: "700 14px/1.25 'Space Grotesk',sans-serif", color: "#fff" }}>
                  Super Connect × <span style={{ color: "#dff900" }}>Carajás</span>
                </div>
              </div>
            </div>
          </div>

          <p
            style={{
              margin: "28px 0 0",
              textAlign: "center",
              font: "600 13px/1.5 'Manrope',sans-serif",
              color: "#eafce0",
              textShadow: "0 2px 10px rgba(0,40,20,.4)",
            }}
          >
            Super Connect × Carajás Home Center · Proposta comercial sujeita a análise de viabilidade técnica.
          </p>
        </section>
      </div>
    </div>
  );
}
