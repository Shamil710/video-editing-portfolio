import { AnimatePresence, motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";

import firstReel from "../videos/First reel.mp4";
import secondReel from "../videos/Second reel.mp4";
import sequenceFiveReel from "../videos/Sequence 01_5.mp4";
import sequenceNineReel from "../videos/Sequence 01_9.mp4";
import sequenceTenReel from "../videos/Sequence 01_10.mp4";
import sequenceElevenReel from "../videos/Sequence 01_11.mp4";
import img0553Reel from "../videos/IMG_0553.MP4";
import divorceFinalReel from "../videos/divorce final.mp4";
import dhanushReel from "../videos/dhanush final.mp4";
import sequencefourteenReel from "../videos/Sequence 01_14.mp4";

export const WORKS_VISIBILITY_EVENT = "works-viewport-change";

type PlaybackMetrics = {
  progress: number;
  currentTime: string;
};

const playbackMetricsStore = (() => {
  let snapshot: PlaybackMetrics = { progress: 0, currentTime: "0:00" };
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setSnapshot: (next: PlaybackMetrics) => {
      snapshot = next;
      listeners.forEach((listener) => listener());
    },
    reset: () => {
      snapshot = { progress: 0, currentTime: "0:00" };
      listeners.forEach((listener) => listener());
    },
  };
})();

type ReelItem = {
  id: string;
  title: string;
  category: string;
  duration: string;
  client: string;
  clientType: string;
  note: string;
  tags: string[];
  src: string;
  tone: string;
  glow: string;
  index: string;
};

const reels: ReelItem[] = [
  {
    id: "launch-cut",
    title: "Luxury Launch Cut",
    category: "Brand Film",
    duration: "0:38",
    client: "Commercial Brands",
    clientType: "Product Launch",
    note: "A crisp launch film with premium pacing and refined visual rhythm.",
    tags: ["Motion", "Luxury", "Launch"],
    src: firstReel,
    tone: "#0d0b06",
    glow: "#d4af37",
    index: "01",
  },
  {
    id: "motion-story",
    title: "Motion Story Sequence",
    category: "Editorial Cut",
    duration: "0:42",
    client: "Creator Brands",
    clientType: "Social Content",
    note: "Cleaner social-first storytelling with stronger retention rhythm.",
    tags: ["Story", "Retention", "Editorial"],
    src: secondReel,
    tone: "#090b0f",
    glow: "#e2c56a",
    index: "02",
  },
  {
    id: "after-dark",
    title: "After Dark Editorial",
    category: "Studio Motion",
    duration: "0:36",
    client: "Fashion Labels",
    clientType: "Editorial Motion",
    note: "High contrast, restrained grade work, and a cinematic fashion mood.",
    tags: ["Fashion", "Mood", "Film"],
    src: sequenceFiveReel,
    tone: "#080808",
    glow: "#c89b2d",
    index: "03",
  },
  {
    id: "pulse-nine",
    title: "Pulse Nine Cut",
    category: "Commercial Reel",
    duration: "0:33",
    client: "Launch Campaigns",
    clientType: "Commercial",
    note: "Rhythm-first motion with smoother transitions and tighter framing.",
    tags: ["Studio", "Motion", "Flow"],
    src: sequenceNineReel,
    tone: "#0a0a0a",
    glow: "#f0d98a",
    index: "04",
  },
  {
    id: "rhythm-build",
    title: "Rhythm Build Cut",
    category: "Brand Film",
    duration: "0:29",
    client: "Premium Creators",
    clientType: "Brand Film",
    note: "Compact story pacing with a polished visual pulse.",
    tags: ["Product", "Story", "Commercial"],
    src: sequenceTenReel,
    tone: "#0d0d0d",
    glow: "#b88d2b",
    index: "05",
  },
  {
    id: "glow-frame",
    title: "Glow Frame Edit",
    category: "Editorial Cut",
    duration: "0:31",
    client: "Lifestyle Brands",
    clientType: "Luxury Content",
    note: "Soft light, luxury movement, and a cinematic frame rhythm.",
    tags: ["Lifestyle", "Luxury", "Frame"],
    src: sequenceElevenReel,
    tone: "#101010",
    glow: "#ddc06d",
    index: "06",
  },
  {
    id: "signature-story",
    title: "Signature Story Film",
    category: "Studio Motion",
    duration: "0:45",
    client: "Motion Studios",
    clientType: "Identity Film",
    note: "A signature cut designed like a luxury motion study.",
    tags: ["Signature", "Narrative", "Brand"],
    src: dhanushReel,
    tone: "#090909",
    glow: "#f2dc8a",
    index: "07",
  },
  {
    id: "studio-frame",
    title: "Studio Frame Reel",
    category: "Editorial Cut",
    duration: "0:28",
    client: "Cinematic Launches",
    clientType: "Launch Visuals",
    note: "Camera-led framing with clean lines and deliberate pacing.",
    tags: ["Editorial", "Studio", "Frame"],
    src: img0553Reel,
    tone: "#101010",
    glow: "#efd47f",
    index: "08",
  },
  {
    id: "breakaway",
    title: "Breakaway Film",
    category: "Commercial Reel",
    duration: "0:41",
    client: "Narrative Projects",
    clientType: "Short Film",
    note: "Moody motion with softer contrast and more dramatic beats.",
    tags: ["Atmosphere", "Story", "Film"],
    src: divorceFinalReel,
    tone: "#0c0c0c",
    glow: "#f0ce79",
    index: "09",
  },
];

/* ── Poster helpers ──────────────────────────────────────────────────────── */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function makeFallbackPoster(reel: ReelItem) {
  const title = escapeXml(reel.title);
  const client = escapeXml(reel.client);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1600">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.32" y2="1">
        <stop offset="0%" stop-color="#040404" />
        <stop offset="52%" stop-color="${reel.tone}" />
        <stop offset="100%" stop-color="${reel.glow}" stop-opacity="0.38" />
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="28%" r="58%">
        <stop offset="0%" stop-color="${reel.glow}" stop-opacity="0.24" />
        <stop offset="100%" stop-color="${reel.glow}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="900" height="1600" fill="url(#bg)" />
    <rect width="900" height="1600" fill="url(#halo)" />
    <rect x="64" y="76" width="180" height="2" rx="1" fill="${reel.glow}" fill-opacity="0.72" />
    <rect x="64" y="1442" width="772" height="1.5" rx="1" fill="${reel.glow}" fill-opacity="0.2" />
    <text x="64" y="1474" fill="white" fill-opacity="0.94" font-family="Arial" font-size="56" font-weight="700">${title}</text>
    <text x="64" y="1528" fill="${reel.glow}" fill-opacity="0.84" font-family="Arial" font-size="22" font-weight="600" letter-spacing="7">${client}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function capturePosterFrame(src: string) {
  return new Promise<string | null>((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = src;

    const finish = (value: string | null) => {
      video.removeAttribute("src");
      video.load();
      resolve(value);
    };

    const onLoadedMetadata = () => {
      const seekTo = Math.min(0.12, Math.max(0, (video.duration || 0) * 0.05));
      const onSeeked = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 540;
          canvas.height = 960;
          const context = canvas.getContext("2d");
          if (!context) {
            finish(null);
            return;
          }
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          finish(canvas.toDataURL("image/jpeg", 0.84));
        } catch {
          finish(null);
        }
      };
      video.addEventListener("seeked", onSeeked, { once: true });
      try {
        video.currentTime = seekTo;
      } catch {
        finish(null);
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    video.addEventListener("error", () => finish(null), { once: true });
    video.load();
  });
}

function usePosterSources(reelItems: ReelItem[]) {
  const [generatedPosters, setGeneratedPosters] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const reel of reelItems) {
        const poster = await capturePosterFrame(reel.src);
        if (!poster || cancelled) continue;
        setGeneratedPosters((current) => {
          if (current[reel.id]) return current;
          return { ...current, [reel.id]: poster };
        });
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [reelItems]);

  return generatedPosters;
}

/* ── Film Strip Decoration ───────────────────────────────────────────────── */
function FilmStripDots({ count = 7, glow }: { count?: number; glow: string }) {
  return (
    <div className="flex gap-[5px] items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[7px] h-[5px] rounded-[1px]"
          style={{ background: i === 3 ? glow : "rgba(255,255,255,0.12)" }}
        />
      ))}
    </div>
  );
}

/* ── Animated film-reel corner ornament ─────────────────────────────────── */
function ReelOrnament({ glow }: { glow: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 relative"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke={glow}
          strokeOpacity="0.28"
          strokeWidth="1"
        />
        <circle
          cx="20"
          cy="20"
          r="11"
          stroke={glow}
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle cx="20" cy="20" r="3" fill={glow} fillOpacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 20 + 14.5 * Math.cos(rad);
          const y = 20 + 14.5 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2.2"
              fill={glow}
              fillOpacity="0.42"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

/* ── Scan-line overlay ───────────────────────────────────────────────────── */
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════════════════ */
export function RecentWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const total = reels.length;
  const activeReel = reels[activeIndex];
  const posterMap = usePosterSources(reels);

  const fallbackPosters = useMemo(
    () =>
      Object.fromEntries(
        reels.map((reel) => [reel.id, makeFallbackPoster(reel)]),
      ),
    [],
  );

  const posterFor = useCallback(
    (reel: ReelItem) => posterMap[reel.id] ?? fallbackPosters[reel.id],
    [fallbackPosters, posterMap],
  );

  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total],
  );
  const onSelect = useCallback((index: number) => setActiveIndex(index), []);

  useEffect(() => {
    setIsMuted(true);
  }, [activeReel.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        window.dispatchEvent(
          new CustomEvent(WORKS_VISIBILITY_EVENT, {
            detail: { inView: entry.isIntersecting },
          }),
        );
      },
      { threshold: 0.18, rootMargin: "-8% 0px -22% 0px" },
    );
    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
      window.dispatchEvent(
        new CustomEvent(WORKS_VISIBILITY_EVENT, { detail: { inView: false } }),
      );
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full select-none overflow-hidden bg-[#050505] text-white"
      style={{
        padding: "clamp(1.75rem,4.5vw,5rem) clamp(0.85rem,4vw,3rem)",
        contain: "layout paint style",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* ── Background atmosphere ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeReel.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 works-ambient-layer"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 40%, ${activeReel.glow}0d 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Grain ── */}
      <div className="cinematic-grain-overlay works-grain-layer" />

      <div
        className="relative z-10 mx-auto w-full max-w-[1680px] works-render-scope"
        style={{ contain: "layout paint style", transform: "translateZ(0)" }}
      >
        {/* ══ HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 lg:mb-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              {/* eyebrow */}
              <div className="flex items-center gap-3">
                <Film size={11} className="text-[#d4af37]/60" />
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.48em] text-[#d4af37]/60">
                  Selected Client Work
                </span>
              </div>

              <h2
                className="font-display leading-[0.86] tracking-[-0.07em] text-white"
                style={{
                  fontSize: "clamp(2.6rem,5.5vw,6rem)",
                  fontFamily: "'General Sans', sans-serif",
                  fontWeight: 700,
                }}
              >
                Work that <span className="gold-gradient-text">moves</span>
                <br />
                people forward.
              </h2>
            </div>

            {/* stats row */}
            <div className="flex gap-8 sm:gap-10 shrink-0 pb-1">
              {[
                { value: "9+", label: "Projects" },
                { value: "4", label: "Categories" },
                { value: "100%", label: "Client Trust" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold tracking-[-0.06em] text-white"
                    style={{ fontFamily: "'General Sans', sans-serif" }}
                  >
                    {value}
                  </p>
                  <p className="mt-0.5 text-[0.48rem] font-semibold uppercase tracking-[0.36em] text-white/36">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* divider with film strip holes */}
          <div className="mt-8 flex items-center gap-4">
            <FilmStripDots count={9} glow={activeReel.glow} />
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </motion.div>

        {/* ══ MAIN LAYOUT: [client list] [video player] [info panel] ══ */}
        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1.32fr)_250px] lg:gap-4 xl:grid-cols-[240px_minmax(0,1.5fr)_270px] xl:gap-6 2xl:grid-cols-[260px_minmax(0,1.62fr)_290px]">
          {/* ── LEFT: Client list (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="hidden lg:flex lg:flex-col lg:gap-1"
          >
            <p className="mb-4 text-[0.46rem] font-semibold uppercase tracking-[0.42em] text-white/28">
              Client Projects
            </p>
            {reels.map((reel, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="group relative flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200"
                  style={{
                    background: active ? `${reel.glow}0f` : "transparent",
                    border: active
                      ? `1px solid ${reel.glow}28`
                      : "1px solid transparent",
                  }}
                >
                  {/* index number */}
                  <span
                    className="shrink-0 w-7 text-center text-[0.45rem] font-semibold tabular-nums transition-colors duration-200"
                    style={{
                      color: active ? reel.glow : "rgba(255,255,255,0.22)",
                    }}
                  >
                    {reel.index}
                  </span>

                  {/* thumbnail */}
                  <div
                    className="shrink-0 overflow-hidden rounded-md"
                    style={{
                      width: 32,
                      height: 44,
                      border: active
                        ? `1px solid ${reel.glow}40`
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img
                      src={posterFor(reel)}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[0.72rem] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200"
                      style={{
                        color: active ? "#fff" : "rgba(255,255,255,0.52)",
                      }}
                    >
                      {reel.client}
                    </p>
                    <p
                      className="mt-0.5 text-[0.42rem] font-medium uppercase tracking-[0.28em] transition-colors duration-200"
                      style={{
                        color: active ? reel.glow : "rgba(255,255,255,0.24)",
                      }}
                    >
                      {reel.clientType}
                    </p>
                  </div>

                  {/* active indicator bar */}
                  {active && (
                    <motion.div
                      layoutId="client-active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
                      style={{ height: "60%", background: activeReel.glow }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ── CENTER: Video Player ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="flex flex-col items-center"
          >
            <VideoPlayer
              reel={activeReel}
              poster={posterFor(activeReel)}
              onPrev={prev}
              onNext={next}
              isMuted={isMuted}
              isSectionVisible={isSectionVisible}
              onToggleMute={() => setIsMuted((v) => !v)}
            />

            {/* ── Mobile: horizontal client strip ── */}
            <div className="mt-6 w-full lg:hidden">
              <p className="mb-3 text-[0.46rem] font-semibold uppercase tracking-[0.42em] text-white/28">
                Client Projects
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {reels.map((reel, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => onSelect(index)}
                      className="group shrink-0 flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all duration-200"
                      style={{
                        background: active
                          ? `${reel.glow}12`
                          : "rgba(255,255,255,0.03)",
                        border: active
                          ? `1px solid ${reel.glow}30`
                          : "1px solid rgba(255,255,255,0.06)",
                        minWidth: 72,
                      }}
                    >
                      <div
                        className="overflow-hidden rounded-md"
                        style={{ width: 44, height: 60 }}
                      >
                        <img
                          src={posterFor(reel)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span
                        className="text-center text-[0.42rem] font-semibold uppercase tracking-[0.2em] leading-tight"
                        style={{
                          color: active ? reel.glow : "rgba(255,255,255,0.36)",
                        }}
                      >
                        {reel.index}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="flex flex-col gap-6 lg:pt-2 works-render-scope"
            style={{
              contain: "layout paint style",
              transform: "translateZ(0)",
            }}
          >
            <WorksInfoPanel reel={activeReel} />
          </motion.div>
        </div>

        {/* ══ BOTTOM NAVIGATION STRIP ══ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 lg:mt-10 works-render-scope"
          style={{ contain: "layout paint style", transform: "translateZ(0)" }}
        >
          <div
            className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <FilmStripDots count={5} glow={activeReel.glow} />

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 justify-center px-2">
              {reels.map((reel, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => onSelect(index)}
                    className="shrink-0 rounded-full transition-all duration-200"
                    style={{
                      padding: "6px 14px",
                      background: active ? `${reel.glow}18` : "transparent",
                      border: active
                        ? `1px solid ${reel.glow}38`
                        : "1px solid transparent",
                    }}
                  >
                    <span
                      className="block text-[0.43rem] font-semibold uppercase tracking-[0.3em] whitespace-nowrap"
                      style={{
                        color: active ? reel.glow : "rgba(255,255,255,0.36)",
                      }}
                    >
                      {reel.index} — {reel.category}
                    </span>
                  </button>
                );
              })}
            </div>

            <FilmStripDots count={5} glow={activeReel.glow} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   VIDEO PLAYER
══════════════════════════════════════════════════════════════════════════ */
function VideoPlayer({
  reel,
  poster,
  onPrev,
  onNext,
  isMuted,
  isSectionVisible,
  onToggleMute,
}: {
  reel: ReelItem;
  poster: string;
  onPrev: () => void;
  onNext: () => void;
  isMuted: boolean;
  isSectionVisible: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const currentTimeRef = useRef<HTMLSpanElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    playbackMetricsStore.reset();
    setIsReady(false);
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = "translate3d(0, 0, 0) scaleX(0)";
    }
    if (currentTimeRef.current) {
      currentTimeRef.current.textContent = "0:00";
    }
    video.pause();
    video.muted = true;
  }, [reel.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (!isSectionVisible) {
      video.pause();
      return;
    }

    if (isReady) {
      video.play().catch(() => undefined);
    }
  }, [isMuted, isReady, isSectionVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isSectionVisible) {
      video.pause();
      return;
    }

    if (isReady) {
      video.play().catch(() => undefined);
    }
  }, [isReady, isSectionVisible]);

  const handleTimeUpdate = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!video.duration) return;
      const nextProgress = Math.min(
        100,
        (video.currentTime / video.duration) * 100,
      );
      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime % 60)
        .toString()
        .padStart(2, "0");
      const nextCurrentTime = `${minutes}:${seconds}`;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `translate3d(0, 0, 0) scaleX(${nextProgress / 100})`;
      }
      if (currentTimeRef.current) {
        currentTimeRef.current.textContent = nextCurrentTime;
      }
      playbackMetricsStore.setSnapshot({
        progress: nextProgress,
        currentTime: nextCurrentTime,
      });
    },
    [],
  );

  const handleLoadedData = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      setIsReady(true);
      if (isSectionVisible) {
        e.currentTarget.play().catch(() => undefined);
      }
    },
    [isSectionVisible],
  );

  return (
    <div className="w-full" style={{ maxWidth: "clamp(460px, 30vw, 620px)" }}>
      {/* Glow halo behind player */}
      <AnimatePresence mode="wait">
        <motion.div
          key={reel.id + "-halo"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="works-halo-layer pointer-events-none absolute"
          style={{
            width: "110%",
            height: "110%",
            top: "-5%",
            left: "-5%",
            background: `radial-gradient(circle at 50% 48%, ${reel.glow}1a 0%, transparent 65%)`,
            filter: "blur(40px)",
          }}
        />
      </AnimatePresence>

      {/* ── The phone-style frame ── */}
      <div
        className="works-video-shell relative mx-auto overflow-hidden"
        style={{
          borderRadius: "2rem",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#050505",
          boxShadow: `0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px ${reel.glow}14`,
        }}
      >
        {/* top chrome bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background: reel.glow,
                boxShadow: `0 0 10px ${reel.glow}88`,
              }}
            />
            <span className="text-[0.44rem] font-semibold uppercase tracking-[0.38em] text-white/40">
              {reel.category}
            </span>
          </div>
          <span className="font-mono text-[0.42rem] text-white/24">
            reel {reel.index} / {reels.length.toString().padStart(2, "0")}
          </span>
        </div>

        {/* ── Video area — strictly 9:16 ── */}
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ aspectRatio: "9 / 16" }}
        >
          <ScanlineOverlay />

          {/* Poster */}
          <img
            src={poster}
            alt={reel.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />

          {/* Video */}
          <video
            key={reel.id}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
            style={{ opacity: isReady ? 1 : 0 }}
            src={reel.src}
            muted
            loop={isSectionVisible}
            playsInline
            preload="metadata"
            poster={poster}
            onLoadedData={handleLoadedData}
            onTimeUpdate={handleTimeUpdate}
          />

          {/* Loading spinner */}
          {!isReady && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-black/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="h-9 w-9 rounded-full border-2 border-transparent"
                style={{ borderTopColor: reel.glow }}
              />
            </div>
          )}

          {/* top-left badge */}
          <div
            className="absolute left-4 top-4 z-20 rounded-full px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.54)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {reel.client}
          </div>

          {/* top-right badge */}
          <div
            className="absolute right-4 top-4 z-20 rounded-full px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.32em] backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.54)",
              border: `1px solid ${reel.glow}30`,
              color: reel.glow,
            }}
          >
            9:16
          </div>

          {/* bottom gradient info */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-5 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <p
                  className="text-[0.42rem] font-semibold uppercase tracking-[0.36em]"
                  style={{ color: `${reel.glow}cc` }}
                >
                  {reel.clientType}
                </p>
                <h3
                  className="mt-1 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.05em] text-white"
                  style={{ fontFamily: "'General Sans', sans-serif" }}
                >
                  {reel.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ← → nav buttons */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous reel"
            className="absolute left-3 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full transition-all duration-200"
            style={{
              background: "rgba(0,0,0,0.52)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <ChevronLeft size={16} className="text-white/70" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next reel"
            className="absolute right-3 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full transition-all duration-200"
            style={{
              background: "rgba(0,0,0,0.52)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <ChevronRight size={16} className="text-white/70" />
          </button>
        </div>

        {/* ── Bottom controls bar ── */}
        <div
          className="px-4 py-4 space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* progress bar */}
          <div className="space-y-1.5">
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressBarRef}
                className="works-progress-fill h-full w-full rounded-full transition-transform duration-200"
                style={{
                  background: `linear-gradient(90deg, ${reel.glow}80, ${reel.glow})`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[0.42rem] font-semibold uppercase tracking-[0.3em] text-white/28">
              <span ref={currentTimeRef}>0:00</span>
              <span>{reel.duration}</span>
            </div>
          </div>

          {/* mute + play hint */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Play size={10} className="text-white/24" />
              <span className="text-[0.42rem] font-medium text-white/28">
                Auto-playing
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute reel" : "Mute reel"}
              className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.44rem] font-semibold uppercase tracking-[0.28em] transition-all duration-200"
              style={{
                background: isMuted
                  ? "rgba(255,255,255,0.04)"
                  : `${reel.glow}18`,
                border: isMuted
                  ? "1px solid rgba(255,255,255,0.1)"
                  : `1px solid ${reel.glow}40`,
                color: isMuted ? "rgba(255,255,255,0.5)" : reel.glow,
              }}
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorksInfoPanel({ reel }: { reel: ReelItem }) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const currentTimeRef = useRef<HTMLSpanElement | null>(null);
  const snapshot = playbackMetricsStore.getSnapshot();

  useEffect(() => {
    const sync = () => {
      const { progress, currentTime } = playbackMetricsStore.getSnapshot();
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `translate3d(0, 0, 0) scaleX(${progress / 100})`;
      }
      if (currentTimeRef.current) {
        currentTimeRef.current.textContent = currentTime;
      }
    };

    sync();
    return playbackMetricsStore.subscribe(sync);
  }, [reel.id]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={reel.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        {/* client badge + reel ornament */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.44rem] font-semibold uppercase tracking-[0.44em] text-white/30">
              Client
            </p>
            <h3
              className="mt-1 font-display text-[1.7rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {reel.client}
            </h3>
            <p
              className="mt-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.38em]"
              style={{ color: reel.glow }}
            >
              {reel.clientType}
            </p>
          </div>
          <ReelOrnament glow={reel.glow} />
        </div>

        {/* title */}
        <div>
          <p className="text-[0.44rem] font-semibold uppercase tracking-[0.42em] text-white/30">
            Project
          </p>
          <p className="mt-1 text-[1rem] font-semibold leading-snug tracking-[-0.03em] text-white/90">
            {reel.title}
          </p>
        </div>

        {/* note */}
        <p className="text-[0.85rem] leading-7 text-white/50">{reel.note}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {reel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-[0.4rem] font-semibold uppercase tracking-[0.28em]"
              style={{
                borderColor: `${reel.glow}28`,
                background: `${reel.glow}0c`,
                color: `${reel.glow}cc`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* progress + meta */}
        <div
          className="space-y-3 rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between text-[0.44rem] font-semibold uppercase tracking-[0.32em] text-white/32">
            <span ref={currentTimeRef}>{snapshot.currentTime}</span>
            <span>
              {reel.category} · {reel.duration}
            </span>
          </div>
          {/* progress bar */}
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              ref={progressBarRef}
              className="works-progress-fill h-full rounded-full"
              style={{
                width: "100%",
                background: `linear-gradient(90deg, ${reel.glow}88, ${reel.glow})`,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
          {/* film strip dots for decoration */}
          <FilmStripDots count={9} glow={reel.glow} />
        </div>

        {/* reel index */}
        <p
          className="font-display text-[4.5rem] font-semibold leading-none tracking-[-0.1em]"
          style={{
            color: `${reel.glow}18`,
            fontFamily: "'General Sans', sans-serif",
          }}
        >
          {reel.index}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default RecentWorksSection;
