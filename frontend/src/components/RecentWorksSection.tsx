import { AnimatePresence, motion } from "framer-motion";
import {
  Film,
  Play,
  ArrowUpRight,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export const WORKS_VISIBILITY_EVENT = "works-viewport-change";

/* ════════════════════════════════════════════════════════════════════════════
   CLOUDINARY URL BUILDERS
   
   Portrait poster  : ar_9:16, c_fill, g_face — crops to true 9:16, 
                      face-aware, tiny 320px wide, 60% quality JPEG.
   Optimised video  : q_auto — Cloudinary picks best bitrate for the viewer.
                      We do NOT re-encode aspect ratio on the video itself;
                      the <video> element uses object-fit:contain so the 
                      original frame is shown letterboxed inside a 9:16 shell.
   Grid poster      : ar_9:16, c_fill, g_face, w_200 — same crop, tinier file.
   ════════════════════════════════════════════════════════════════════════════ */
const CLD = "https://res.cloudinary.com/dqcnj05ch/video/upload";

function posterUrl(publicId: string, width = 320): string {
  // so_2 = grab frame at 2 seconds (avoids black first frame)
  return `${CLD}/f_jpg,so_2,q_60,ar_9:16,c_fill,g_face,w_${width}/${publicId}.jpg`;
}

function videoUrl(publicId: string): string {
  // q_auto = adaptive quality; vc_auto = best codec (H.264/WebM per browser)
  return `${CLD}/q_auto,vc_auto/${publicId}.mp4`;
}

/* ════════════════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════════════════ */
type Reel = {
  id: string;
  publicId: string; // cloudinary public_id (no extension)
  title: string;
  category: string;
  client: string;
  clientType: string;
  note: string;
  tags: string[];
  glow: string;
  index: string;
};

const REELS: Reel[] = [
  {
    id: "r01",
    publicId: "v1780730810/dhanush_final_y1amca",
    title: "Dhanush Tribute Cut",
    category: "Brand Film",
    client: "Commercial Brands",
    clientType: "Product Launch",
    note: "A crisp launch film with premium pacing and refined visual rhythm.",
    tags: ["Motion", "Luxury", "Launch"],
    glow: "#d4af37",
    index: "01",
  },
  {
    id: "r02",
    publicId: "v1780730829/First_reel_efh1bi",
    title: "First Reel Cut",
    category: "Editorial Cut",
    client: "Creator Brands",
    clientType: "Social Content",
    note: "Cleaner social-first storytelling with stronger retention rhythm.",
    tags: ["Story", "Retention", "Editorial"],
    glow: "#e2c56a",
    index: "02",
  },
  {
    id: "r03",
    publicId: "v1780730877/IMG_0553_i5jowa",
    title: "After Dark Editorial",
    category: "Studio Motion",
    client: "Fashion Labels",
    clientType: "Editorial Motion",
    note: "High contrast, restrained grade work, and a cinematic fashion mood.",
    tags: ["Fashion", "Mood", "Film"],
    glow: "#c89b2d",
    index: "03",
  },
  {
    id: "r04",
    publicId: "v1780730940/Sequence_01_4_aulsiz",
    title: "Pulse Nine Cut",
    category: "Commercial Reel",
    client: "Launch Campaigns",
    clientType: "Commercial",
    note: "Rhythm-first motion with smoother transitions and tighter framing.",
    tags: ["Studio", "Motion", "Flow"],
    glow: "#f0d98a",
    index: "04",
  },
  {
    id: "r05",
    publicId: "v1780730949/Second_reel_pxl3er",
    title: "Second Reel Edit",
    category: "Brand Film",
    client: "Premium Creators",
    clientType: "Brand Film",
    note: "Compact story pacing with a polished visual pulse.",
    tags: ["Product", "Story", "Commercial"],
    glow: "#b88d2b",
    index: "05",
  },
  {
    id: "r06",
    publicId: "v1780731100/Sequence_01_14_uapgjl",
    title: "Glow Frame Edit",
    category: "Editorial Cut",
    client: "Lifestyle Brands",
    clientType: "Luxury Content",
    note: "Soft light, luxury movement, and a cinematic frame rhythm.",
    tags: ["Lifestyle", "Luxury", "Frame"],
    glow: "#ddc06d",
    index: "06",
  },
  {
    id: "r07",
    publicId: "v1780731118/Sequence_01_10_eqlqvb",
    title: "Signature Story Film",
    category: "Studio Motion",
    client: "Motion Studios",
    clientType: "Identity Film",
    note: "A signature cut designed like a luxury motion study.",
    tags: ["Signature", "Narrative", "Brand"],
    glow: "#f2dc8a",
    index: "07",
  },
  {
    id: "r08",
    publicId: "v1780731111/Sequence_01_11_ah1ro4",
    title: "Studio Frame Reel",
    category: "Editorial Cut",
    client: "Cinematic Launches",
    clientType: "Launch Visuals",
    note: "Camera-led framing with clean lines and deliberate pacing.",
    tags: ["Editorial", "Studio", "Frame"],
    glow: "#efd47f",
    index: "08",
  },
  {
    id: "r09",
    publicId: "v1780731122/Sequence_01_9_aa7tgt",
    title: "Breakaway Film",
    category: "Commercial Reel",
    client: "Narrative Projects",
    clientType: "Short Film",
    note: "Moody motion with softer contrast and more dramatic beats.",
    tags: ["Atmosphere", "Story", "Film"],
    glow: "#f0ce79",
    index: "09",
  },
  {
    id: "r10",
    publicId: "v1780731131/Sequence_01_5_jjqhc1",
    title: "Golden Hour Sequence",
    category: "Brand Film",
    client: "Luxury Brands",
    clientType: "Brand Storytelling",
    note: "A warm, golden cut with a focus on mood and cinematic rhythm.",
    tags: ["Mood", "Cinematic", "Luxury"],
    glow: "#e2c56a",
    index: "10",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   HERO VIDEO PLAYER
   
   Performance strategy:
   • preload="metadata" — browser fetches only the first ~few KB to get
     duration + dimensions. No video data transferred until play().
   • poster= uses Cloudinary 9:16 crop so the placeholder is portrait.
   • The <video> sits inside a strict 9:16 aspect-ratio container.
     object-fit:contain keeps the video frame fully visible (no cropping),
     with black bars if the source isn't exactly 9:16.
   • On reel switch: pause + reset src via key change (React unmounts/remounts
     the video element) → previous video instantly deallocates from memory.
   ════════════════════════════════════════════════════════════════════════════ */
function HeroPlayer({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // When reel changes the key on the wrapper causes full remount —
  // React destroys the old <video> (freeing memory/network) and mounts fresh.
  // We just need to reset local state here.
  useEffect(() => {
    setPlaying(false);
    setMuted(true);
    setReady(false);
  }, [reel.id]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#0a0a0a]"
      style={{ borderRadius: "inherit" }}
      onClick={togglePlay}
    >
      <video
        key={reel.id} /* key change = full remount = clean memory */
        ref={videoRef}
        src={videoUrl(reel.publicId)}
        poster={posterUrl(reel.publicId, 480)}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover" /* fills the 9:16 shell edge-to-edge */,
          objectPosition: "center top" /* keep face/subject at top of frame */,
        }}
        muted
        playsInline
        loop
        preload="metadata"
        onCanPlay={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* ── Paused overlay ── */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            key="paused-overlay"
            className="absolute inset-0 flex items-end justify-center cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg,rgba(0,0,0,0.0)0%,rgba(0,0,0,0.0)45%,rgba(0,0,0,0.65)100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* centred play btn */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative flex items-center justify-center"
                style={{ width: 72, height: 72 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                {/* ripple */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${reel.glow}50` }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className="relative z-10 flex items-center justify-center rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg,${reel.glow}30,${reel.glow}12)`,
                    border: `1.5px solid ${reel.glow}80`,
                    boxShadow: `0 0 36px ${reel.glow}50,0 8px 28px rgba(0,0,0,0.7)`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Play
                    size={24}
                    fill={reel.glow}
                    style={{ color: reel.glow, marginLeft: 4 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* bottom title strip */}
            <div className="relative z-10 w-full px-5 pb-5">
              <p
                className="text-[9px] font-bold uppercase tracking-[0.32em] mb-1"
                style={{ color: `${reel.glow}cc` }}
              >
                {reel.clientType}
              </p>
              <p
                className="text-white font-semibold leading-tight"
                style={{
                  fontFamily: "'General Sans',sans-serif",
                  fontSize: 15,
                }}
              >
                {reel.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Playing controls ── */}
      <AnimatePresence>
        {playing && (
          <motion.div
            key="playing-controls"
            className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <span
              className="text-[8.5px] font-semibold uppercase tracking-[0.26em] px-2.5 py-1 rounded-full pointer-events-none select-none"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(6px)",
              }}
            >
              Tap to pause
            </span>
            <motion.button
              type="button"
              onClick={toggleMute}
              className="flex items-center justify-center rounded-full pointer-events-auto"
              style={{
                width: 36,
                height: 36,
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${muted ? "rgba(255,255,255,0.12)" : reel.glow + "55"}`,
                color: muted ? "rgba(255,255,255,0.45)" : reel.glow,
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top category badge ── */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-[0.28em]"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: `1px solid ${reel.glow}38`,
            color: reel.glow,
            backdropFilter: "blur(10px)",
          }}
        >
          ✦ {reel.category}
        </span>
      </div>

      {/* loading shimmer while metadata is fetching */}
      {!ready && (
        <motion.div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.015)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   GRID THUMBNAIL CARD
   Portrait poster via Cloudinary ar_9:16 crop.
   ════════════════════════════════════════════════════════════════════════════ */
function GridCard({
  reel,
  isActive,
  onClick,
  rowSpan,
}: {
  reel: Reel;
  isActive: boolean;
  onClick: () => void;
  rowSpan: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative group w-full h-full overflow-hidden text-left"
      style={{
        borderRadius: 10,
        border: isActive
          ? `1.5px solid ${reel.glow}70`
          : "1.5px solid rgba(255,255,255,0.07)",
        outline: "none",
        background: "#111",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.16 }}
    >
      {/* portrait thumbnail — Cloudinary crops to 9:16 */}
      <img
        src={posterUrl(reel.publicId, 200)}
        alt={reel.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(180deg,rgba(0,0,0,0.05)0%,rgba(0,0,0,0.68)100%)"
            : "linear-gradient(180deg,rgba(0,0,0,0.15)0%,rgba(0,0,0,0.78)100%)",
        }}
      />

      {/* active inner glow */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 9,
            boxShadow: `inset 0 0 20px ${reel.glow}30`,
            background: `linear-gradient(135deg,${reel.glow}16,transparent 55%)`,
          }}
        />
      )}

      {/* index badge */}
      <span
        className="absolute top-2 left-2.5 text-[8.5px] font-bold tracking-[0.22em]"
        style={{ color: isActive ? reel.glow : "rgba(255,255,255,0.3)" }}
      >
        {reel.index}
      </span>

      {/* active live dot */}
      {isActive ? (
        <motion.div
          layoutId="active-dot"
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ background: reel.glow, boxShadow: `0 0 7px ${reel.glow}` }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      ) : (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full items-center justify-center hidden group-hover:flex transition-all"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: `1px solid ${reel.glow}45`,
          }}
        >
          <Play
            size={7}
            fill={reel.glow}
            style={{ color: reel.glow, marginLeft: 1 }}
          />
        </div>
      )}

      {/* label on taller cards */}
      {rowSpan >= 3 && (
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p
            className="text-[7px] font-bold uppercase tracking-[0.22em] truncate mb-0.5"
            style={{ color: `${reel.glow}bb` }}
          >
            {reel.clientType}
          </p>
          <p
            className="text-white text-[9.5px] font-semibold leading-tight truncate"
            style={{ fontFamily: "'General Sans',sans-serif" }}
          >
            {reel.title}
          </p>
        </div>
      )}
    </motion.button>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN SECTION
   Layout:  [grid 2-col staggered] | [9:16 hero + info panel]
   Mobile:  hero full-width → info → horizontal thumb strip
   ════════════════════════════════════════════════════════════════════════════ */
const ROW_SPANS = [3, 2, 3, 2, 2, 3, 2, 3, 2, 2] as const;

export default function RecentWorksSection() {
  const [idx, setIdx] = useState(0);
  const active = REELS[idx];

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + REELS.length) % REELS.length),
    [],
  );
  const next = useCallback(() => setIdx((i) => (i + 1) % REELS.length), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  return (
    <section
      id="works"
      className="relative overflow-hidden"
      style={{ background: "#050505", padding: "80px 0 100px" }}
    >
      {/* ambient glow that tracks active reel colour */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-[1200ms]"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 70% 50%,${active.glow}0b,transparent 68%)`,
        }}
      />
      <div className="cinematic-grain-overlay" />

      <div
        className="relative z-10 mx-auto w-full px-5 lg:px-8"
        style={{ maxWidth: 1320 }}
      >
        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <div className="mb-10 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.44em]"
              style={{ color: active.glow, transition: "color 0.6s" }}
            >
              <Film size={11} />
              Selected Client Work
            </span>
            <div
              className="h-px"
              style={{
                width: 90,
                background: `linear-gradient(90deg,${active.glow}55,transparent)`,
                transition: "background 0.6s",
              }}
            />
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="font-bold leading-[0.92] tracking-[-0.05em] text-white"
              style={{
                fontFamily: "'General Sans',sans-serif",
                fontSize: "clamp(2rem,5vw,3.8rem)",
              }}
            >
              Work that <span className="gold-gradient-text">moves</span>
              <br />
              people forward.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-7 shrink-0 pb-1"
            >
              {[
                ["50+", "Projects"],
                ["4", "Categories"],
                ["100%", "Client Trust"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p
                    className="font-bold leading-none tracking-[-0.06em] text-white"
                    style={{
                      fontFamily: "'General Sans',sans-serif",
                      fontSize: "clamp(1.35rem,2.8vw,2rem)",
                    }}
                  >
                    {v}
                  </p>
                  <p
                    className="mt-1 font-semibold uppercase tracking-[0.3em]"
                    style={{ fontSize: 7.5, color: "rgba(255,255,255,0.28)" }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══ BODY ════════════════════════════════════════════════════════════
            Desktop: [staggered grid 300px] [hero player] [info panel 280px]
            Tablet:  [hero player] [info panel]  (grid hidden)
            Mobile:  [hero] → [info] → [thumb strip]
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-4">
          {/* ── GRID (desktop only) ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block shrink-0"
            style={{ width: 290 }}
          >
            <p
              className="mb-3 text-[8px] font-bold uppercase tracking-[0.42em] px-0.5"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Client Projects
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: 72,
                gap: 6,
              }}
            >
              {REELS.map((r, i) => (
                <div key={r.id} style={{ gridRow: `span ${ROW_SPANS[i]}` }}>
                  <GridCard
                    reel={r}
                    isActive={i === idx}
                    onClick={() => setIdx(i)}
                    rowSpan={ROW_SPANS[i]}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── HERO PLAYER ──────────────────────────────────────────────── */}
          {/*
            KEY FIX: The hero must NEVER flex-grow. We give it an explicit
            width derived from the desired portrait height so the aspect
            ratio is always exactly 9:16, on every screen size.

            Formula: if max height = 74vh, then width = 74vh × (9/16) = 41.625vw
            We use CSS calc() so it responds to the actual viewport height.

            On mobile it goes full-width (max ~380px) with the ratio preserved
            via aspect-ratio: 9/16 alone (height is auto / uncapped).
          */}
          {/*
            Portrait hero: width is always derived from height.
            We inject a one-line <style> so the media query fires at lg breakpoint.
            calc(74vh * 9/16) = the width a 74vh-tall 9:16 box needs.
            Capped at 360px so it never gets absurd on 4K screens.
          */}
          <style>{`
            .works-hero-wrap { width: min(100%, 340px); }
            @media (min-width: 1024px) {
              .works-hero-wrap { width: clamp(240px, calc(72vh * 9 / 16), 360px); }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.08 }}
            className="works-hero-wrap shrink-0 mx-auto lg:mx-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-hero"}
                initial={{ opacity: 0, scale: 0.987 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden w-full"
                style={{
                  borderRadius: 18,
                  aspectRatio: "9 / 16",
                  border: `1px solid ${active.glow}35`,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.04),0 32px 70px rgba(0,0,0,0.72),0 0 55px ${active.glow}1a`,
                }}
              >
                <HeroPlayer reel={active} />

                {/* ghost index number */}
                <div
                  className="absolute bottom-5 right-4 z-0 font-bold leading-none tracking-[-0.1em] pointer-events-none select-none"
                  style={{
                    fontFamily: "'General Sans',sans-serif",
                    fontSize: "clamp(3rem,8vw,5.5rem)",
                    color: `${active.glow}14`,
                  }}
                >
                  {active.index}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── INFO PANEL ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="w-full lg:flex-1 lg:min-w-0 flex flex-col gap-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-info"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
                className="flex flex-col gap-4 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.024)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(14px)",
                }}
              >
                {/* index + title */}
                <div>
                  <p
                    className="text-[8px] font-bold uppercase tracking-[0.42em] mb-1.5"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {active.index} / 10
                  </p>
                  <h3
                    className="text-white font-bold leading-tight tracking-[-0.04em]"
                    style={{
                      fontFamily: "'General Sans',sans-serif",
                      fontSize: "clamp(1rem,2.2vw,1.4rem)",
                    }}
                  >
                    {active.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: active.glow, transition: "color 0.4s" }}
                  >
                    {active.clientType} · {active.client}
                  </p>
                </div>

                {/* note */}
                <p
                  style={{
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75,
                  }}
                >
                  {active.note}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[7.5px] font-bold uppercase tracking-[0.2em]"
                      style={{
                        background: `${active.glow}0e`,
                        border: `1px solid ${active.glow}2a`,
                        color: `${active.glow}cc`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* nav row */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-white/10"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {/* dot indicators */}
                  <div className="flex items-center gap-1">
                    {REELS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-label={`Reel ${i + 1}`}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === idx ? 14 : 4,
                          height: 4,
                          background:
                            i === idx ? active.glow : "rgba(255,255,255,0.16)",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-white/10"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* view button */}
                <motion.a
                  href={`${CLD}/${active.publicId}.mp4`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[8.5px] font-bold uppercase tracking-[0.26em] transition-all duration-200"
                  style={{
                    background: `${active.glow}14`,
                    border: `1px solid ${active.glow}38`,
                    color: active.glow,
                  }}
                  whileHover={{
                    background: `${active.glow}26`,
                    boxShadow: `0 0 18px ${active.glow}22`,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowUpRight size={12} />
                  View Full Reel
                </motion.a>
              </motion.div>
            </AnimatePresence>

            {/* ── Desktop: show all reel titles as compact list ── */}
            <div
              className="hidden lg:flex flex-col gap-0.5 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {REELS.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  className="flex items-center gap-3 px-3.5 py-2 text-left transition-all duration-150 relative"
                  style={{
                    background: i === idx ? `${r.glow}10` : "transparent",
                    borderLeft:
                      i === idx
                        ? `2px solid ${r.glow}`
                        : "2px solid transparent",
                  }}
                >
                  <span
                    className="text-[7.5px] font-bold tracking-[0.2em] shrink-0"
                    style={{
                      color: i === idx ? r.glow : "rgba(255,255,255,0.22)",
                    }}
                  >
                    {r.index}
                  </span>
                  <span
                    className="text-[9.5px] font-semibold truncate"
                    style={{
                      color:
                        i === idx
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {r.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ MOBILE THUMB STRIP (hidden on lg+) ══════════════════════════════ */}
        <div className="mt-5 lg:hidden">
          <div
            className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {REELS.map((r, i) => (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => setIdx(i)}
                className="shrink-0 flex flex-col items-center gap-1.5"
                style={{ scrollSnapAlign: "start", outline: "none" }}
                whileTap={{ scale: 0.93 }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    /* 9:16 portrait thumbnails in strip */
                    width: 48,
                    height: 85 /* 48 × 16/9 ≈ 85 */,
                    borderRadius: 8,
                    border:
                      i === idx
                        ? `2px solid ${r.glow}80`
                        : "1.5px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <img
                    src={posterUrl(r.publicId, 96)}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {i === idx && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg,${r.glow}25,transparent)`,
                      }}
                    />
                  )}
                  {i === idx && (
                    <div
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: r.glow,
                        boxShadow: `0 0 5px ${r.glow}`,
                      }}
                    />
                  )}
                </div>
                <span
                  className="text-[7.5px] font-bold tracking-[0.18em]"
                  style={{
                    color: i === idx ? r.glow : "rgba(255,255,255,0.25)",
                  }}
                >
                  {r.index}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
