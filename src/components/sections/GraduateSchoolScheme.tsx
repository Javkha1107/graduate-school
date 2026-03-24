"use client";

import React from "react";
import Image from "next/image";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface SchemeTexts {
  title: string;
  subtitle: string;
  centers: {
    c1: string;
    c1sub: string;
    c2line1: string;
    c2line2: string;
    c2sub: string;
    c3line1: string;
    c3line2: string;
    c3sub: string;
    c4line1: string;
    c4line2: string;
    c4sub: string;
  };
  listHeader: string;
  list1: string[];
  list2: string[];
  list3: string[];
  ldept: string[];
  rdept: string[];
  bottomBar1: string;
  bottomBar2: string;
  hintDesktop: string;
  hintMobile: string;
  ariaLabel: string;
  ariaClose: string;
}

// ─── Layout ─────────────────────────────────────────────────────────────────
const W = 1600,
  H = 720;

// Title
const TW = 500,
  TH = 68,
  TX = (W - TW) / 2,
  TY = 12,
  TCX = W / 2;
const TBOT = TY + TH;

// Rail
const RAIL_Y = TBOT + 24;

// 4 columns — space-around
const COL_CX = [180, 480, 780, 1250];
const CW = 230,
  CH = 82,
  CY = RAIL_Y + 22,
  CBOT = CY + CH;

// List boxes (cols 0-2)
const LY = CBOT + 34,
  LW = 240,
  LH = 300;

// Dept block (col 3)
const DY0 = CBOT + 26;
const DRH = 50,
  DG = 5,
  DR = 7;
const DLW = 280,
  DRW = 250,
  DMG = 14;
const DBW = DLW + DMG + DRW; // 544
const SL = COL_CX[3] - DBW / 2 - 16;
const SR = COL_CX[3] + DBW / 2 + 16;
const DLX = SL + 14;
const DRX = DLX + DLW + DMG;
const dCY = (i: number) => DY0 + i * (DRH + DG) + DRH / 2;
const DBOT = dCY(DR - 1);

// Bottom bars
const BY = H - 54,
  BH = 44;

// ─── SVG helpers ────────────────────────────────────────────────────────────
function Rect({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      fill="rgba(11,63,116,0.55)"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth={1.5}
    />
  );
}

function Txt({
  x,
  y,
  size,
  weight = 500,
  italic = false,
  opacity = 1,
  children,
}: {
  x: number;
  y: number;
  size: number;
  weight?: number;
  italic?: boolean;
  opacity?: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill={opacity < 1 ? `rgba(255,255,255,${opacity})` : "white"}
      fontSize={size}
      fontWeight={weight}
      fontStyle={italic ? "italic" : "normal"}
      fontFamily="sans-serif"
    >
      {children}
    </text>
  );
}

function DeptCard({
  x,
  y,
  w,
  text,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
}) {
  const words = text.split(" ");
  const mid = Math.ceil(words.length / 2);
  const l1 = words.slice(0, mid).join(" ");
  const l2 = words.slice(mid).join(" ");
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={DRH}
        rx={12}
        fill="rgba(11,63,116,0.45)"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth={1.2}
      />
      {l2 ? (
        <>
          <Txt x={x + w / 2} y={y + DRH / 2 - 9} size={13}>
            {l1}
          </Txt>
          <Txt x={x + w / 2} y={y + DRH / 2 + 9} size={13}>
            {l2}
          </Txt>
        </>
      ) : (
        <Txt x={x + w / 2} y={y + DRH / 2} size={13}>
          {l1}
        </Txt>
      )}
    </g>
  );
}

const ls = {
  stroke: "rgba(255,255,255,0.85)",
  strokeWidth: 1.5,
  fill: "none",
} as const;

// ─── Component ──────────────────────────────────────────────────────────────
function SchemeContent({ t }: { t: SchemeTexts }) {
  const centers = [
    { t1: t.centers.c1, sub: t.centers.c1sub },
    { t1: t.centers.c2line1, t2: t.centers.c2line2, sub: t.centers.c2sub },
    { t1: t.centers.c3line1, t2: t.centers.c3line2, sub: t.centers.c3sub },
    { t1: t.centers.c4line1, t2: t.centers.c4line2, sub: t.centers.c4sub },
  ];
  const lists = [t.list1, t.list2, t.list3];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-full">
      {/* ── Lines ── */}
      <line x1={TCX} y1={TBOT} x2={TCX} y2={RAIL_Y} style={ls} />
      <line x1={COL_CX[0]} y1={RAIL_Y} x2={COL_CX[3]} y2={RAIL_Y} style={ls} />
      {COL_CX.map((cx, i) => (
        <line key={i} x1={cx} y1={RAIL_Y} x2={cx} y2={CY} style={ls} />
      ))}
      {[0, 1, 2].map((i) => (
        <line
          key={`cl${i}`}
          x1={COL_CX[i]}
          y1={CBOT}
          x2={COL_CX[i]}
          y2={LY}
          style={ls}
        />
      ))}
      <line x1={COL_CX[3]} y1={CBOT} x2={COL_CX[3]} y2={DY0 - 12} style={ls} />
      <line x1={SL} y1={DY0 - 12} x2={SR} y2={DY0 - 12} style={ls} />
      <line x1={SL} y1={DY0 - 12} x2={SL} y2={DBOT} style={ls} />
      <line x1={SR} y1={DY0 - 12} x2={SR} y2={DBOT} style={ls} />
      {Array.from({ length: DR }).map((_, i) => {
        const cy = dCY(i);
        return (
          <React.Fragment key={i}>
            <line x1={SL} y1={cy} x2={DLX} y2={cy} style={ls} />
            <line x1={SR} y1={cy} x2={DRX + DRW} y2={cy} style={ls} />
          </React.Fragment>
        );
      })}

      {/* ── Title ── */}
      <Rect x={TX} y={TY} w={TW} h={TH} />
      <Txt x={TCX} y={TY + 24} size={18} weight={700}>
        {t.title}
      </Txt>
      <Txt x={TCX} y={TY + 48} size={15} italic opacity={0.92}>
        {t.subtitle}
      </Txt>

      {/* ── 4 Centers ── */}
      {COL_CX.map((cx, i) => {
        const c = centers[i],
          bx = cx - CW / 2;
        return (
          <g key={i}>
            <Rect x={bx} y={CY} w={CW} h={CH} />
            {c.t2 ? (
              <>
                <Txt x={cx} y={CY + 18} size={16} weight={600}>
                  {c.t1}
                </Txt>
                <Txt x={cx} y={CY + 36} size={16} weight={600}>
                  {c.t2}
                </Txt>
                <Txt x={cx} y={CY + 58} size={13} italic opacity={0.92}>
                  {c.sub}
                </Txt>
              </>
            ) : (
              <>
                <Txt x={cx} y={CY + 28} size={16} weight={600}>
                  {c.t1}
                </Txt>
                <Txt x={cx} y={CY + 54} size={13} italic opacity={0.92}>
                  {c.sub}
                </Txt>
              </>
            )}
          </g>
        );
      })}

      {/* ── 3 List boxes ── */}
      {[0, 1, 2].map((i) => {
        const cx = COL_CX[i],
          bx = cx - LW / 2;
        return (
          <g key={i}>
            <Rect x={bx} y={LY} w={LW} h={LH} />
            <Txt x={cx} y={LY + 22} size={15} weight={700}>
              {t.listHeader}
            </Txt>
            {lists[i].map((item, j) => (
              <text
                key={j}
                x={bx + 16}
                y={LY + 50 + j * 34}
                fill="white"
                fontSize={14}
                fontFamily="sans-serif"
                dominantBaseline="central"
              >
                • {item}
              </text>
            ))}
          </g>
        );
      })}

      {/* ── Dept cards ── */}
      {t.ldept.map((text, i) => (
        <DeptCard
          key={`l${i}`}
          x={DLX}
          y={DY0 + i * (DRH + DG)}
          w={DLW}
          text={text}
        />
      ))}
      {t.rdept.map((text, i) => (
        <DeptCard
          key={`r${i}`}
          x={DRX}
          y={DY0 + i * (DRH + DG)}
          w={DRW}
          text={text}
        />
      ))}

      {/* ── Bottom bars ── */}
      <Rect x={20} y={BY} w={700} h={BH} />
      <Txt x={370} y={BY + BH / 2} size={15} weight={600}>
        {t.bottomBar1}
      </Txt>
      <Rect x={740} y={BY} w={840} h={BH} />
      <Txt x={1160} y={BY + BH / 2} size={15} weight={600}>
        {t.bottomBar2}
      </Txt>
    </svg>
  );
}

export default function GraduateSchoolScheme({
  texts,
}: {
  texts: SchemeTexts;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Inline scheme */}
      <div
        className="relative w-full cursor-pointer rounded-xl overflow-hidden bg-[#0a3360] group"
        style={{ aspectRatio: `${W}/${H}` }}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        aria-label={texts.ariaLabel}
      >
        <Image
          src="/hero.png"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#0a3360]/40" />
        <div className="absolute inset-0 z-10">
          <SchemeContent t={texts} />
        </div>
        {/* Hover/tap hint */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <span className="text-white text-lg font-medium bg-black/60 px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity sm:text-base">
            {texts.hintDesktop}
          </span>
        </div>
        {/* Mobile always-visible hint */}
        <div className="absolute bottom-3 right-3 z-20 sm:hidden">
          <span className="text-white text-xs bg-black/50 px-3 py-1.5 rounded-full">
            {texts.hintMobile}
          </span>
        </div>
      </div>

      {/* Fullscreen modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-auto"
          onClick={() => setOpen(false)}
        >
          {/* Inner wrapper with min-width for mobile horizontal scroll */}
          <div className="min-w-[900px] min-h-full flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-[1600px] rounded-xl bg-[#0a3360]"
              style={{ aspectRatio: `${W}/${H}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/hero.png"
                alt=""
                fill
                className="object-cover opacity-25 rounded-xl"
              />
              <div className="absolute inset-0 bg-[#0a3360]/40 rounded-xl" />
              <div className="absolute inset-0 z-10">
                <SchemeContent t={texts} />
              </div>
              {/* Close button — inside scheme, top-right corner */}
              <button
                className="absolute top-3 right-3 z-20 text-white bg-black/40 hover:bg-black/60 rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
                onClick={() => setOpen(false)}
                aria-label={texts.ariaClose}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
