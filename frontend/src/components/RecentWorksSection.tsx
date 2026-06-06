import { AnimatePresence, motion } from "framer-motion";
import { Film, Play, ArrowUpRight, Sparkles } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const WORKS_VISIBILITY_EVENT = "works-viewport-change";

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */
type ReelItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  clientType: string;
  note: string;
  tags: string[];
  videoUrl: string;
  glow: string;
  index: string;
  shortUrl: string;
};

const reels: ReelItem[] = [
  {
    id: "launch-cut",
    title: "Luxury Launch Cut",
    category: "Brand Film",
    client: "Commercial Brands",
    clientType: "Product Launch",
    note: "A crisp launch film with premium pacing and refined visual rhythm.",
    tags: ["Motion", "Luxury", "Launch"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730810/dhanush_final_y1amca.mp4",
    glow: "#d4af37",
    index: "01",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730810/dhanush_final_y1amca.mp4",
  },
  {
    id: "motion-story",
    title: "Motion Story Sequence",
    category: "Editorial Cut",
    client: "Creator Brands",
    clientType: "Social Content",
    note: "Cleaner social-first storytelling with stronger retention rhythm.",
    tags: ["Story", "Retention", "Editorial"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730829/First_reel_efh1bi.mp4",
    glow: "#e2c56a",
    index: "02",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730829/First_reel_efh1bi.mp4",
  },
  {
    id: "after-dark",
    title: "After Dark Editorial",
    category: "Studio Motion",
    client: "Fashion Labels",
    clientType: "Editorial Motion",
    note: "High contrast, restrained grade work, and a cinematic fashion mood.",
    tags: ["Fashion", "Mood", "Film"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730877/IMG_0553_i5jowa.mp4",
    glow: "#c89b2d",
    index: "03",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730877/IMG_0553_i5jowa.mp4",
  },
  {
    id: "pulse-nine",
    title: "Pulse Nine Cut",
    category: "Commercial Reel",
    client: "Launch Campaigns",
    clientType: "Commercial",
    note: "Rhythm-first motion with smoother transitions and tighter framing.",
    tags: ["Studio", "Motion", "Flow"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730940/Sequence_01_4_aulsiz.mp4",
    glow: "#f0d98a",
    index: "04",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730940/Sequence_01_4_aulsiz.mp4",
  },
  {
    id: "rhythm-build",
    title: "Rhythm Build Cut",
    category: "Brand Film",
    client: "Premium Creators",
    clientType: "Brand Film",
    note: "Compact story pacing with a polished visual pulse.",
    tags: ["Product", "Story", "Commercial"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730949/Second_reel_pxl3er.mp4",
    glow: "#b88d2b",
    index: "05",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780730949/Second_reel_pxl3er.mp4",
  },
  {
    id: "glow-frame",
    title: "Glow Frame Edit",
    category: "Editorial Cut",
    client: "Lifestyle Brands",
    clientType: "Luxury Content",
    note: "Soft light, luxury movement, and a cinematic frame rhythm.",
    tags: ["Lifestyle", "Luxury", "Frame"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731100/Sequence_01_14_uapgjl.mp4",
    glow: "#ddc06d",
    index: "06",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731100/Sequence_01_14_uapgjl.mp4",
  },
  {
    id: "signature-story",
    title: "Signature Story Film",
    category: "Studio Motion",
    client: "Motion Studios",
    clientType: "Identity Film",
    note: "A signature cut designed like a luxury motion study.",
    tags: ["Signature", "Narrative", "Brand"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731118/Sequence_01_10_eqlqvb.mp4",
    glow: "#f2dc8a",
    index: "07",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731118/Sequence_01_10_eqlqvb.mp4",
  },
  {
    id: "studio-frame",
    title: "Studio Frame Reel",
    category: "Editorial Cut",
    client: "Cinematic Launches",
    clientType: "Launch Visuals",
    note: "Camera-led framing with clean lines and deliberate pacing.",
    tags: ["Editorial", "Studio", "Frame"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731111/Sequence_01_11_ah1ro4.mp4",
    glow: "#efd47f",
    index: "08",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731111/Sequence_01_11_ah1ro4.mp4",
  },
  {
    id: "breakaway",
    title: "Breakaway Film",
    category: "Commercial Reel",
    client: "Narrative Projects",
    clientType: "Short Film",
    note: "Moody motion with softer contrast and more dramatic beats.",
    tags: ["Atmosphere", "Story", "Film"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731122/Sequence_01_9_aa7tgt.mp4",
    glow: "#f0ce79",
    index: "09",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731122/Sequence_01_9_aa7tgt.mp4",
  },
  {
    id: "golden-hour",
    title: "Golden Hour Sequence",
    category: "Brand Film",
    client: "Luxury Brands",
    clientType: "Brand Storytelling",
    note: "A warm, golden cut with a focus on mood and cinematic rhythm.",
    tags: ["Mood", "Cinematic", "Luxury"],
    videoUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731131/Sequence_01_5_jjqhc1.mp4",
    glow: "#e2c56a",
    index: "10",
    shortUrl:
      "https://res.cloudinary.com/dqcnj05ch/video/upload/f_auto,q_auto/v1780731131/Sequence_01_5_jjqhc1.mp4",
  },
];

const getPosterUrl = (videoUrl: string) => videoUrl.replace(/\.mp4$/, ".jpg");

const reelLayoutVariants: Array<"tall" | "wide" | "square"> = [
  "tall",
  "square",
  "wide",
  "square",
  "tall",
  "square",
  "wide",
  "tall",
  "square",
  "square",
];

/* ══════════════════════════════════════════════════════════════════
   CLOUDINARY HTML5 PLAYER
   — Shows static thumbnail until user taps. 
   - Only one video mounts at a time (the active reel).
   - On selection change, previous playback is paused, the source loads,
     and the new reel autoplays inline.
   ══════════════════════════════════════════════════════════════════ */
const CloudinaryVideoPlayer = memo(function CloudinaryVideoPlayer({
  reel,
}: {
  reel: ReelItem;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const posterUrl = useMemo(() => getPosterUrl(reel.videoUrl), [reel.videoUrl]);
  const activated = true;
  const setActivated = useCallback((_active: boolean) => undefined, []);
  const thumbHq = posterUrl;
  const thumbMax = posterUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsReady(false);
    video.load();

    const frame = window.requestAnimationFrame(() => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Muted inline playback is allowed in modern browsers; ignore rare policy races.
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      video.pause();
    };
  }, [reel.videoUrl]);

  return (
    <div
      className="relative w-full h-full bg-black"
      style={{ borderRadius: "inherit" }}
    >
      {/* ── Thumbnail layer (always rendered for instant visual) ── */}
      <AnimatePresence>
        {!activated && (
          <motion.div
            key="thumb"
            className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
            style={{ borderRadius: "inherit" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActivated(true)}
          >
            {/* thumbnail image */}
            <img
              src={thumbMax}
              alt={reel.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = thumbHq;
              }}
            />

            {/* scrim */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: 64, height: 64 }}
              >
                {/* outer pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${reel.glow}60` }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* button body */}
                <div
                  className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${reel.glow}30, ${reel.glow}10)`,
                    border: `1.5px solid ${reel.glow}80`,
                    boxShadow: `0 0 28px ${reel.glow}40, 0 8px 32px rgba(0,0,0,0.6)`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Play
                    size={20}
                    fill={reel.glow}
                    style={{ color: reel.glow, marginLeft: 3 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* bottom badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <p
                className="text-[9px] font-bold uppercase tracking-[0.3em] mb-1"
                style={{ color: `${reel.glow}cc` }}
              >
                {reel.clientType}
              </p>
              <p
                className="text-white text-[13px] font-semibold leading-tight tracking-tight"
                style={{ fontFamily: "'General Sans', sans-serif" }}
              >
                {reel.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloudinary video - only the active reel mounts */}
      {activated && (
        <motion.div
          key="cloudinary-video"
          className="absolute inset-0 z-20"
          style={{ borderRadius: "inherit" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={posterUrl}
            className="w-full h-full object-cover"
            style={{
              borderRadius: "inherit",
              opacity: isReady ? 1 : 0.22,
              transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            autoPlay
            muted
            playsInline
            preload="metadata"
            loop
            aria-label={reel.title}
            onCanPlay={() => setIsReady(true)}
            onLoadedData={() => setIsReady(true)}
          />
        </motion.div>
      )}
    </div>
  );
});

/* ══════════════════════════════════════════════════════════════════
   GRID THUMBNAIL CARD  (left grid wall)
   ══════════════════════════════════════════════════════════════════ */
const GridCard = memo(function GridCard({
  reel,
  reelIndex,
  isActive,
  onClick,
  layoutVariant,
}: {
  reel: ReelItem;
  reelIndex: number;
  isActive: boolean;
  onClick: (index: number) => void;
  layoutVariant: "tall" | "wide" | "square";
}) {
  const thumbUrl = useMemo(() => getPosterUrl(reel.videoUrl), [reel.videoUrl]);
  const handleClick = useCallback(
    () => onClick(reelIndex),
    [onClick, reelIndex],
  );

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="relative group overflow-hidden cursor-pointer text-left w-full h-full"
      style={{
        borderRadius: 12,
        border: isActive
          ? `1.5px solid ${reel.glow}80`
          : "1.5px solid rgba(255,255,255,0.07)",
        outline: "none",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* thumbnail */}
      <img
        src={thumbUrl}
        alt={reel.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* base overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isActive
            ? `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)`
            : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* active gold shimmer border */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: 11 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: 11,
              boxShadow: `inset 0 0 20px ${reel.glow}25`,
              background: `linear-gradient(135deg, ${reel.glow}12, transparent 60%)`,
            }}
          />
        </motion.div>
      )}

      {/* index badge */}
      <div
        className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-[0.2em]"
        style={{ color: isActive ? reel.glow : "rgba(255,255,255,0.35)" }}
      >
        {reel.index}
      </div>

      {/* play icon — shown on hover */}
      <div
        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: "rgba(0,0,0,0.5)",
          border: `1px solid ${reel.glow}50`,
        }}
      >
        <Play
          size={8}
          fill={reel.glow}
          style={{ color: reel.glow, marginLeft: 1 }}
        />
      </div>

      {/* bottom info — only on tall/square */}
      {layoutVariant !== "wide" && (
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p
            className="text-[8px] font-bold uppercase tracking-[0.25em] truncate mb-0.5"
            style={{ color: `${reel.glow}bb` }}
          >
            {reel.clientType}
          </p>
          <p
            className="text-white text-[10px] font-semibold leading-tight tracking-tight truncate"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {reel.title}
          </p>
        </div>
      )}

      {/* active indicator dot */}
      {isActive && (
        <motion.div
          className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
          style={{ background: reel.glow, boxShadow: `0 0 8px ${reel.glow}` }}
          layoutId="active-dot"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
});

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════════════════════ */
export default function RecentWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeReel = reels[activeIndex];

  const handleSelect = useCallback((i: number) => {
    setActiveIndex((current) => (current === i ? current : i));
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + reels.length) % reels.length);
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % reels.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Grid layout variants cycle for visual variety
  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#050505", padding: "80px 0 100px" }}
    >
      {/* ── ambient background ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 65% 50%, ${activeReel.glow}09, transparent 65%)`,
        }}
      />
      <div className="cinematic-grain-overlay" />

      <div
        className="relative z-10 mx-auto w-full"
        style={{ maxWidth: 1320, padding: "0 20px" }}
      >
        {/* ════════════════════════════════════════════
            HEADER ROW
            ════════════════════════════════════════════ */}
        <div className="flex flex-col gap-6 mb-10" style={{}}>
          {/* label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.42em]"
              style={{ color: activeReel.glow }}
            >
              <Film size={11} />
              Selected Client Work
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(90deg, ${activeReel.glow}50, transparent)`,
                maxWidth: 120,
              }}
            />
          </motion.div>

          {/* title + stats row */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.07 }}
              className="text-white font-bold leading-[0.92] tracking-[-0.05em]"
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              }}
            >
              Work that <span className="gold-gradient-text">moves</span>
              <br />
              people forward.
            </motion.h2>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="flex items-center gap-8 shrink-0 pb-1"
            >
              {[
                { v: "50+", l: "Projects" },
                { v: "4", l: "Categories" },
                { v: "100%", l: "Client Trust" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p
                    className="text-white font-bold leading-none tracking-[-0.06em]"
                    style={{
                      fontFamily: "'General Sans', sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="mt-1 font-semibold uppercase tracking-[0.3em]"
                    style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MAIN GRID  (desktop: left grid + right hero)
                       (mobile:  hero first, grid below)
            ════════════════════════════════════════════ */}
        <div className="flex flex-col-reverse gap-5 lg:flex-row lg:gap-5 lg:items-start">
          {/* ── LEFT: thumbnail grid ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="w-full lg:w-[340px] xl:w-[380px] shrink-0"
          >
            {/*
              Custom CSS grid — 2-col, auto rows.
              Cards span different rows to create staggered height effect.
            */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "80px",
                gap: 8,
              }}
            >
              {reels.map((reel, i) => {
                const v = reelLayoutVariants[i];
                // row spans: tall=3, square=2, wide=2
                const rowSpan = v === "tall" ? 3 : 2;
                return (
                  <div key={reel.id} style={{ gridRow: `span ${rowSpan}` }}>
                    <GridCard
                      reel={reel}
                      reelIndex={i}
                      isActive={i === activeIndex}
                      onClick={handleSelect}
                      layoutVariant={v}
                    />
                  </div>
                );
              })}
            </div>

            {/* mobile scroll hint */}
            <p
              className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] lg:hidden"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Tap a card to preview
            </p>
          </motion.div>

          {/* ── RIGHT: hero player + info ────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* ── PLAYER ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex w-full justify-center"
            >
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden"
                style={{
                  width: "min(100%, 520px, calc(72vh * 9 / 16))",
                  aspectRatio: "9/16",
                  borderRadius: 24,
                  padding: 10,
                  background: `linear-gradient(145deg, rgba(255,255,255,0.11), ${activeReel.glow}20 28%, rgba(255,255,255,0.035) 54%, rgba(0,0,0,0.9))`,
                  border: `1px solid ${activeReel.glow}42`,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.035), 0 34px 90px rgba(0,0,0,0.78), 0 0 76px ${activeReel.glow}20`,
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden bg-black"
                  style={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.085)",
                    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.7), inset 0 0 32px ${activeReel.glow}10`,
                  }}
                >
                  <CloudinaryVideoPlayer reel={activeReel} />

                  {/* corner badge */}
                  <div
                    className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.28em]"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      border: `1px solid ${activeReel.glow}35`,
                      color: activeReel.glow,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Sparkles size={8} />
                    {activeReel.category}
                  </div>

                  {/* index ghost */}
                  <div
                    className="absolute bottom-5 right-5 z-5 font-bold leading-none tracking-[-0.1em] pointer-events-none select-none"
                    style={{
                      fontFamily: "'General Sans', sans-serif",
                      fontSize: "clamp(3.5rem, 8vw, 6rem)",
                      color: `${activeReel.glow}14`,
                    }}
                  >
                    {activeReel.index}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── INFO PANEL ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReel.id + "-info"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* top row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.4em] mb-1"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {activeReel.index} /{" "}
                      {reels.length < 10 ? "0" + reels.length : reels.length}
                    </p>
                    <h3
                      className="text-white font-bold leading-tight tracking-[-0.04em]"
                      style={{
                        fontFamily: "'General Sans', sans-serif",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
                      }}
                    >
                      {activeReel.title}
                    </h3>
                    <p
                      className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
                      style={{ color: activeReel.glow }}
                    >
                      {activeReel.clientType} · {activeReel.client}
                    </p>
                  </div>

                  {/* YT link */}
                  <motion.a
                    href={activeReel.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-200"
                    style={{
                      background: `${activeReel.glow}16`,
                      border: `1px solid ${activeReel.glow}40`,
                      color: activeReel.glow,
                    }}
                    whileHover={{
                      background: `${activeReel.glow}28`,
                      boxShadow: `0 0 20px ${activeReel.glow}25`,
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <ArrowUpRight size={11} />
                    View Reel
                  </motion.a>
                </div>

                {/* note */}
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}
                >
                  {activeReel.note}
                </p>

                {/* tags + nav row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeReel.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-[0.22em]"
                        style={{
                          background: `${activeReel.glow}0e`,
                          border: `1px solid ${activeReel.glow}28`,
                          color: `${activeReel.glow}cc`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* prev / next */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          (i) => (i - 1 + reels.length) % reels.length,
                        )
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 transition-all duration-200 hover:text-white"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      aria-label="Previous"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M7.5 2L3.5 6L7.5 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* dot indicators */}
                    <div className="flex items-center gap-1">
                      {reels.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === activeIndex ? 16 : 4,
                            height: 4,
                            background:
                              i === activeIndex
                                ? activeReel.glow
                                : "rgba(255,255,255,0.18)",
                          }}
                          aria-label={`Reel ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((i) => (i + 1) % reels.length)
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 transition-all duration-200 hover:text-white"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      aria-label="Next"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M4.5 2L8.5 6L4.5 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MOBILE: horizontal scroll strip (xs only)
            Hidden on lg+
            ════════════════════════════════════════════ */}
        <div className="mt-6 lg:hidden">
          <div
            className="flex gap-2.5 overflow-x-auto pb-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {reels.map((reel, i) => (
              <motion.button
                key={reel.id}
                type="button"
                onClick={() => handleSelect(i)}
                className="shrink-0 flex flex-col items-center gap-1.5"
                style={{ scrollSnapAlign: "start", outline: "none" }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 56,
                    height: 80,
                    borderRadius: 8,
                    border:
                      i === activeIndex
                        ? `1.5px solid ${reel.glow}80`
                        : "1.5px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src={getPosterUrl(reel.videoUrl)}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {i === activeIndex && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${reel.glow}22, transparent)`,
                      }}
                    />
                  )}
                </div>
                <span
                  className="text-[8px] font-bold tracking-[0.18em]"
                  style={{
                    color:
                      i === activeIndex ? reel.glow : "rgba(255,255,255,0.3)",
                  }}
                >
                  {reel.index}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
