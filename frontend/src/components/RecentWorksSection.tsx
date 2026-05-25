import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import firstReel from "../videos/First reel.mp4";
import secondReel from "../videos/Second reel.mp4";
import sequenceFiveReel from "../videos/Sequence 01_5.mp4";
import sequenceNineReel from "../videos/Sequence 01_9.mp4";
import sequenceTenReel from "../videos/Sequence 01_10.mp4";
import sequenceElevenReel from "../videos/Sequence 01_11.mp4";
import img0553Reel from "../videos/IMG_0553.MP4";
import divorceFinalReel from "../videos/divorce final.mp4";
import dhanushReel from "../videos/dhanush final.mp4";

type ReelItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  duration: string;
  video: string;
  accent: [string, string];
};

const reels: ReelItem[] = [
  {
    id: "launch-cut",
    title: "Luxury Launch Cut",
    category: "Brand promo",
    summary:
      "A crisp opening edit with elegant pacing and a polished luxury finish.",
    duration: "38 sec",
    video: firstReel,
    accent: ["#f3d88c", "#81531a"],
  },
  {
    id: "motion-story",
    title: "Motion Story Sequence",
    category: "Creator campaign",
    summary:
      "A cleaner social-first cut built for retention, rhythm, and clarity.",
    duration: "42 sec",
    video: secondReel,
    accent: ["#efd074", "#234562"],
  },
  {
    id: "after-dark",
    title: "After Dark Editorial",
    category: "Fashion mood",
    summary:
      "High contrast, soft motion, and restrained grade work for editorial impact.",
    duration: "36 sec",
    video: sequenceFiveReel,
    accent: ["#edd28a", "#5e3128"],
  },
  {
    id: "pulse-nine",
    title: "Pulse Nine Cut",
    category: "Transition reel",
    summary:
      "A rhythm-first sequence with smoother transitions and tighter movement.",
    duration: "33 sec",
    video: sequenceNineReel,
    accent: ["#f2d57b", "#1f3f5a"],
  },
  {
    id: "rhythm-build",
    title: "Rhythm Build Cut",
    category: "Product story",
    summary:
      "A compact story pass with premium timing and an elevated visual pulse.",
    duration: "29 sec",
    video: sequenceTenReel,
    accent: ["#f2da8d", "#11374d"],
  },
  {
    id: "glow-frame",
    title: "Glow Frame Edit",
    category: "Lifestyle reel",
    summary:
      "Soft light, luxury movement, and a cinematic frame rhythm throughout.",
    duration: "31 sec",
    video: sequenceElevenReel,
    accent: ["#f4d98f", "#38566f"],
  },
  {
    id: "signature-story",
    title: "Signature Story Film",
    category: "Personal brand",
    summary:
      "A signature cinematic cut built to feel like a luxury motion study.",
    duration: "45 sec",
    video: dhanushReel,
    accent: ["#f0cc78", "#3d2241"],
  },
  {
    id: "studio-frame",
    title: "Studio Frame Reel",
    category: "Editorial crop",
    summary:
      "A modern camera-led sequence with clean lines and deliberate pacing.",
    duration: "28 sec",
    video: img0553Reel,
    accent: ["#efd47f", "#384b69"],
  },
  {
    id: "breakaway",
    title: "Breakaway Film",
    category: "Story cut",
    summary:
      "A moodier reel with softer contrast and more dramatic motion beats.",
    duration: "41 sec",
    video: divorceFinalReel,
    accent: ["#f0ce79", "#4b2544"],
  },
];

export function RecentWorksSection() {
  const [activeIndex, setActiveIndex] = useState(6);
  const posters = useVideoPosters(reels);
  const activeReel = reels[activeIndex];

  const previousIndex = useMemo(
    () => (activeIndex - 1 + reels.length) % reels.length,
    [activeIndex],
  );
  const nextIndex = useMemo(
    () => (activeIndex + 1) % reels.length,
    [activeIndex],
  );

  const goPrevious = () =>
    setActiveIndex((current) => (current - 1 + reels.length) % reels.length);
  const goNext = () =>
    setActiveIndex((current) => (current + 1) % reels.length);

  return (
    <div className="space-y-6 text-white sm:space-y-8">
      <motion.div
        className="max-w-3xl space-y-3"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/[0.08] px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-champagne">
          <Sparkles size={12} />
          cinematic reel showcase
        </div>
        <h2 className="font-display max-w-xl text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
          Luxury motion storytelling with a single vertical reel at the center.
        </h2>
        <p className="max-w-2xl text-sm leading-8 text-white/66 sm:text-base">
          A minimal Awwwards-style composition built for premium editing work:
          one hero reel, two soft previews, and a compact metadata panel.
        </p>
      </motion.div>

      <div className="relative overflow-visible">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
          <div className="absolute left-1/2 top-[48%] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bullion/12 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.07),transparent_32%),radial-gradient(circle_at_50%_72%,rgba(212,175,55,0.08),transparent_28%)] opacity-70" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.55)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
        </div>

        <div className="showcase-track grid items-center gap-5 xl:grid-cols-[0.9fr_minmax(320px,360px)_0.9fr] xl:gap-7">
          <PreviewReelCard
            position="left"
            reel={reels[previousIndex]}
            poster={posters[reels[previousIndex].id]}
            onSelect={() => setActiveIndex(previousIndex)}
          />

          <FeaturedReelCard
            reel={activeReel}
            poster={posters[activeReel.id]}
            size="vertical"
          />

          <DetailPanel
            reel={activeReel}
            onPrevious={goPrevious}
            onNext={goNext}
          />
        </div>
      </div>
    </div>
  );
}

function PreviewReelCard({
  reel,
  position,
  poster,
  onSelect,
}: {
  reel: ReelItem;
  position: "left" | "right";
  poster?: string;
  onSelect: () => void;
}) {
  const isLeft = position === "left";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`side-preview group relative mx-auto w-full max-w-[220px] text-left outline-none ${isLeft ? "xl:justify-self-end" : "xl:justify-self-start"}`}
      initial={{ opacity: 0, x: isLeft ? -22 : 22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 0.96, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        opacity: 0.55,
        scale: 0.9,
        filter: "blur(1px)",
        translateY: 6,
      }}
    >
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/60 shadow-[0_16px_44px_rgba(0,0,0,0.34)] transition duration-500">
        <ReelVisual
          reel={reel}
          poster={poster}
          active={false}
          showVideo={false}
          size="preview"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.48))]" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/48">
            {reel.category}
          </p>
          <h3 className="mt-2 text-sm font-semibold tracking-[-0.03em] text-white/90">
            {reel.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}

function FeaturedReelCard({
  reel,
  poster,
  size,
}: {
  reel: ReelItem;
  poster?: string;
  size?: "vertical" | "featured";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      className="featured-reel relative mx-auto w-full flex justify-center outline-none"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[30px] bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.22),transparent_42%)] blur-3xl" />
      <div className="relative overflow-visible rounded-[30px]">
        <div className="mx-auto relative overflow-hidden rounded-[26px] border border-bullion/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${reel.accent[0]}16, transparent 36%)`,
            }}
          />

          <ReelVisual
            reel={reel}
            poster={poster}
            active
            showVideo={!!inView}
            size={size === "vertical" ? "vertical" : "featured"}
          />

          <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.28))]" />

          <div className="absolute left-3 top-3 z-[6] inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-black/40 px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-champagne backdrop-blur-xl">
            Featured
          </div>

          <div className="absolute bottom-3 left-3 z-[6] rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/76 backdrop-blur-xl">
            {reel.duration}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailPanel({
  reel,
  onPrevious,
  onNext,
}: {
  reel: ReelItem;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <motion.aside
      className="detail-panel mx-auto w-full max-w-[290px] rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      key={reel.id}
      layout
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.52rem] font-semibold uppercase tracking-[0.28em] text-white/40">
          Detail
        </p>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onPrevious}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition duration-300 hover:border-bullion/25 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={15} />
          </motion.button>
          <motion.button
            type="button"
            onClick={onNext}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition duration-300 hover:border-bullion/25 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={15} />
          </motion.button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[0.54rem] font-semibold uppercase tracking-[0.26em] text-white/40">
            {reel.category}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.7rem,2.5vw,2.75rem)] font-semibold tracking-[-0.05em] text-white">
            {reel.title}
          </h3>
        </div>

        <p className="max-w-sm text-sm leading-7 text-white/64">
          {reel.summary}
        </p>

        <div className="space-y-2 pt-1 text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/42">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            {reel.duration}
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div>Luxury captions</div>
          <div>Social-first pacing</div>
          <div>Editorial transitions</div>
        </div>

        <button className="mt-2 inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/10 px-4 py-2 text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-champagne transition duration-300 hover:bg-bullion/14">
          <Play size={11} fill="currentColor" />
          View reel
        </button>
      </div>
    </motion.aside>
  );
}

function ReelVisual({
  reel,
  poster,
  active,
  showVideo,
  size,
  onHoverChange,
}: {
  reel: ReelItem;
  poster?: string;
  active: boolean;
  showVideo: boolean;
  size: "preview" | "featured" | "vertical";
  onHoverChange?: (value: boolean) => void;
}) {
  const videoRef = useMemo(
    () => ({ current: null as HTMLVideoElement | null }),
    [],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (showVideo) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [showVideo, videoRef]);

  const frameClass =
    size === "vertical"
      ? "w-[320px] sm:w-[340px] md:w-[360px] aspect-[9/16] mx-auto"
      : size === "featured"
        ? "aspect-[16/9] h-full w-full"
        : "aspect-[16/9] h-full w-full";

  return (
    <div
      className={`group relative ${frameClass} overflow-hidden bg-[#050505]`}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        animate={active ? { opacity: [0.72, 0.92, 0.72] } : { opacity: 0.7 }}
        transition={
          active
            ? { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        style={{
          background: `radial-gradient(circle at 50% 16%, ${reel.accent[0]}1f, transparent 34%), radial-gradient(circle at 50% 92%, ${reel.accent[1]}18, transparent 30%)`,
        }}
      />

      <img
        src={poster ?? createFallbackPoster(reel)}
        alt={`${reel.title} poster`}
        className={`absolute inset-0 z-[2] h-full w-full transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] ${
          size === "vertical"
            ? "object-contain p-2 bg-[#040405]"
            : "object-cover object-center"
        }`}
        loading="lazy"
      />

      <AnimatePresence>
        {showVideo ? (
          <motion.video
            key={reel.id}
            ref={(element) => {
              videoRef.current = element;
            }}
            src={reel.video}
            className={`absolute inset-0 z-[3] block h-full w-full ${
              size === "vertical"
                ? "object-contain"
                : "object-cover object-center"
            }`}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={poster ?? createFallbackPoster(reel)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4]"
        animate={active ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.34)), radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06), transparent 32%)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        animate={active ? { opacity: 1 } : { opacity: 0.85 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${reel.accent[0]}12, transparent 38%, ${reel.accent[1]}10)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[6] bg-[linear-gradient(180deg,transparent_0%,transparent_60%,rgba(0,0,0,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[7] opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.7px,transparent_0.7px)] [background-size:12px_12px]" />
    </div>
  );
}

function useVideoPosters(reelItems: ReelItem[]) {
  const [posters, setPosters] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    const captureAll = async () => {
      for (const reel of reelItems) {
        try {
          const poster = await capturePosterFromVideo(reel.video);
          if (cancelled) {
            return;
          }

          setPosters((current) => ({
            ...current,
            [reel.id]: poster,
          }));
        } catch {
          if (cancelled) {
            return;
          }

          setPosters((current) => ({
            ...current,
            [reel.id]: createFallbackPoster(reel),
          }));
        }
      }
    };

    void captureAll();

    return () => {
      cancelled = true;
    };
  }, [reelItems]);

  return posters;
}

function capturePosterFromVideo(source: string) {
  return new Promise<string>((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = source;

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
    };

    const finalize = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const context = canvas.getContext("2d");

        if (!context) {
          cleanup();
          reject(new Error("Unable to create poster canvas."));
          return;
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const poster = canvas.toDataURL("image/jpeg", 0.84);
        cleanup();
        resolve(poster);
      } catch (error) {
        cleanup();
        reject(
          error instanceof Error ? error : new Error("Poster capture failed."),
        );
      }
    };

    const seekToFrame = () => {
      const targetTime = Math.min(
        0.18,
        Math.max(0.04, (video.duration || 1) * 0.06),
      );
      try {
        video.currentTime = targetTime;
      } catch {
        finalize();
      }
    };

    video.addEventListener(
      "loadeddata",
      () => {
        if (video.readyState >= 2) {
          seekToFrame();
        }
      },
      { once: true },
    );

    video.addEventListener("seeked", finalize, { once: true });
    video.addEventListener(
      "error",
      () => {
        cleanup();
        reject(new Error("Unable to load video frame."));
      },
      { once: true },
    );

    video.load();
  });
}

function createFallbackPoster(reel: ReelItem) {
  const safeTitle = escapeXml(reel.title);
  const safeCategory = escapeXml(reel.category);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050505" />
          <stop offset="50%" stop-color="${reel.accent[0]}" stop-opacity="0.34" />
          <stop offset="100%" stop-color="${reel.accent[1]}" stop-opacity="0.82" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="20%" r="72%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <rect x="40" y="40" width="1520" height="820" rx="42" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2" />
      <rect x="76" y="76" width="1448" height="748" rx="34" fill="url(#glow)" />
      <path d="M124 646 C374 472, 620 378, 956 248 C1158 170, 1330 126, 1478 92" fill="none" stroke="#ffffff" stroke-opacity="0.34" stroke-width="16" stroke-linecap="round" />
      <path d="M124 704 C376 540, 648 442, 990 312 C1170 228, 1320 178, 1490 148" fill="none" stroke="${reel.accent[0]}" stroke-opacity="0.54" stroke-width="11" stroke-linecap="round" />
      <text x="96" y="760" fill="#ffffff" fill-opacity="0.94" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" letter-spacing="2">${safeTitle}</text>
      <text x="96" y="818" fill="#ffffff" fill-opacity="0.58" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" letter-spacing="8">${safeCategory}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .split("&")
    .join("&amp;")
    .split("<")
    .join("&lt;")
    .split(">")
    .join("&gt;")
    .split('"')
    .join("&quot;")
    .split("'")
    .join("&apos;");
}
