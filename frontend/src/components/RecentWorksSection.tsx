import { AnimatePresence, motion } from "framer-motion";
import { MicOff, Volume2 } from "lucide-react";
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

export const WORKS_VISIBILITY_EVENT = "works-viewport-change";

type ReelItem = {
  id: string;
  title: string;
  category: string;
  duration: string;
  client: string;
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
    client: "Commercial storytelling",
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
    client: "Creator brand film",
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
    client: "Editorial motion systems",
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
    client: "Launch visuals",
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
    client: "Premium creators",
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
    client: "Creator brand film",
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
    client: "Motion identity design",
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
    client: "Cinematic launch visuals",
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
    client: "Commercial storytelling",
    note: "Moody motion with softer contrast and more dramatic beats.",
    tags: ["Atmosphere", "Story", "Film"],
    src: divorceFinalReel,
    tone: "#0c0c0c",
    glow: "#f0ce79",
    index: "09",
  },
];

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
        if (!poster || cancelled) {
          continue;
        }

        setGeneratedPosters((current) => {
          if (current[reel.id]) {
            return current;
          }

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

export function RecentWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
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

  const prev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  const onSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    setIsMuted(true);
    setProgress(0);
    setCurrentTime("0:00");
  }, [activeReel.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent(WORKS_VISIBILITY_EVENT, {
            detail: { inView: entry.isIntersecting },
          }),
        );
      },
      { threshold: 0.18, rootMargin: "-8% 0px -22% 0px" },
    );

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
      window.dispatchEvent(
        new CustomEvent(WORKS_VISIBILITY_EVENT, { detail: { inView: false } }),
      );
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1720px] select-none text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 lg:mb-12"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-12">
          <div className="relative space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-bullion to-transparent" />
              <span className="text-[0.56rem] font-semibold uppercase tracking-[0.42em] text-champagne/78">
                cinematic works
              </span>
            </div>
            <h2 className="max-w-[13ch] font-display text-[clamp(3rem,5vw,6.4rem)] font-semibold leading-[0.84] tracking-[-0.11em] text-white">
              Retention-focused{" "}
              <span className="gold-gradient-text">motion</span>
              <br />
              crafted for modern{" "}
              <span className="gold-gradient-text">brands</span>.
            </h2>
            <div className="relative max-w-[34rem]">
              <div className="pointer-events-none absolute left-[-1rem] top-[-1rem] h-20 w-20 rounded-full bg-bullion/12 blur-3xl" />
              <p className="max-w-[31rem] text-[0.95rem] leading-8 text-white/64 sm:text-[1rem]">
                Commercial storytelling, retention-focused edits, editorial
                motion systems, and premium short-form storytelling shaped for
                launch visuals, creator brands, and cinematic narratives.
              </p>
            </div>
          </div>

          <div className="grid gap-3 text-left lg:justify-self-end lg:text-right">
            <p className="text-[0.54rem] font-semibold uppercase tracking-[0.38em] text-white/34">
              editorial motion studio
            </p>
            <p className="max-w-[24rem] text-[0.92rem] leading-8 text-white/56 lg:ml-auto">
              A premium showcase of client work, creator brand films, and
              cinematic launch visuals, arranged to feel restrained, immersive,
              and refined.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(220px,0.8fr)_minmax(320px,0.9fr)_minmax(240px,0.78fr)] lg:items-start xl:gap-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-start lg:gap-4">
          <ThumbRail
            reels={reels}
            activeIndex={activeIndex}
            posterFor={posterFor}
            align="end"
            onSelect={onSelect}
          />
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:max-w-[372px]">
          <MainReelPlayer
            reel={activeReel}
            poster={posterFor(activeReel)}
            onPrev={prev}
            onNext={next}
            isMuted={isMuted}
            progress={progress}
            currentTime={currentTime}
            onProgress={setProgress}
            onTimeUpdate={setCurrentTime}
            onToggleMute={() => setIsMuted((value) => !value)}
          />

          <div className="mt-6 lg:hidden">
            <ThumbRail
              reels={reels}
              activeIndex={activeIndex}
              posterFor={posterFor}
              align="start"
              mobile
              onSelect={onSelect}
            />
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-end lg:gap-6">
          <ActiveInfo
            reel={activeReel}
            isMuted={isMuted}
            progress={progress}
            currentTime={currentTime}
            onToggleMute={() => setIsMuted((value) => !value)}
          />
          <div className="rounded-[1.8rem] border border-white/[0.05] bg-white/[0.015] p-4">
            <ThumbRail
              reels={reels}
              activeIndex={activeIndex}
              posterFor={posterFor}
              align="start"
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 lg:hidden">
        <ActiveInfo
          reel={activeReel}
          isMuted={isMuted}
          progress={progress}
          currentTime={currentTime}
          onToggleMute={() => setIsMuted((value) => !value)}
        />
      </div>

      <TimelineStrip
        reels={reels}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />
    </section>
  );
}

function MainReelPlayer({
  reel,
  poster,
  onPrev,
  onNext,
  isMuted,
  progress,
  currentTime,
  onProgress,
  onTimeUpdate,
  onToggleMute,
}: {
  reel: ReelItem;
  poster: string;
  onPrev: () => void;
  onNext: () => void;
  isMuted: boolean;
  progress: number;
  currentTime: string;
  onProgress: (value: number) => void;
  onTimeUpdate: (value: string) => void;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsReady(false);
    video.pause();
    video.muted = true;
  }, [reel.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (!isMuted) {
      video.play().catch(() => undefined);
    }
  }, [isMuted]);

  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (!video.duration) return;
      onProgress(Math.min(100, (video.currentTime / video.duration) * 100));
      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime % 60)
        .toString()
        .padStart(2, "0");
      onTimeUpdate(`${minutes}:${seconds}`);
    },
    [onProgress, onTimeUpdate],
  );

  const handleLoadedData = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      setIsReady(true);
      video.play().catch(() => undefined);
    },
    [],
  );

  return (
    <div className="relative mx-auto w-full max-w-[392px]">
      <div
        className="pointer-events-none absolute inset-[-1.3rem] rounded-[2.2rem]"
        style={{
          background: `radial-gradient(circle at 50% 44%, ${reel.glow}16, transparent 62%)`,
        }}
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#050505] shadow-[0_30px_84px_rgba(0,0,0,0.82)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: reel.glow,
                boxShadow: `0 0 14px ${reel.glow}88`,
              }}
            />
            <span className="text-[0.46rem] font-semibold uppercase tracking-[0.36em] text-white/46">
              {reel.category}
            </span>
          </div>
          <span className="font-mono text-[0.45rem] text-white/28">
            reel {reel.index}
          </span>
        </div>

        {/* <div
          className="relative overflow-hidden bg-black px-2.5 py-2.5 sm:px-3 sm:py-3"
          style={{ aspectRatio: "9 / 16", maxHeight: "62vh" }}
        >
          <div
            className="absolute inset-1.5 rounded-[1.3rem] border border-white/[0.06]"
            style={{
              boxShadow: `inset 0 0 0 1px ${reel.glow}14, inset 0 0 34px ${reel.glow}08`,
            }}
          />
          <img
            src={poster}
            alt={`${reel.title} poster`}
            className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-[1.15rem] object-cover object-center opacity-92"
            style={{ objectPosition: "50% 36%", transform: "scale(1.01)" }}
            draggable={false}
          />
          <div className="absolute inset-1.5 rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.025),rgba(0,0,0,0.012)_28%,rgba(0,0,0,0.32)_100%)]" />
          <div className="absolute inset-1.5 rounded-[1.15rem] bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.09),transparent_34%)]" />

          <video
            key={reel.id}
            ref={videoRef}
            className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-[1.15rem] object-cover object-center transition-opacity duration-500"
            style={{
              opacity: isReady ? 1 : 0,
              objectPosition: "50% 36%",
              transform: "scale(1.01)",
            }}
            src={reel.src}
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onLoadedData={handleLoadedData}
            onTimeUpdate={handleTimeUpdate}
          />

          {!isReady && (
            <div className="absolute inset-0 grid place-items-center bg-black/12">
              <div className="h-10 w-10 rounded-full border border-white/10 border-t-bullion/60 animate-spin" />
            </div>
          )}

          <div className="absolute left-3.5 top-3.5 rounded-full border border-white/10 bg-black/48 px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-white/68">
            {reel.client}
          </div>

          <div className="absolute right-3.5 top-3.5 rounded-full border border-bullion/22 bg-black/48 px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-champagne/88">
            9:16 reel
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/92 via-black/48 to-transparent px-3.5 pb-3.5 pt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-bullion/78">
                  active reel
                </p>
                <h3 className="mt-1 font-display text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
                  {reel.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous reel"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/46 text-white/72 transition-colors duration-200 hover:border-bullion/36 hover:text-champagne"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next reel"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/46 text-white/72 transition-colors duration-200 hover:border-bullion/36 hover:text-champagne"
          >
            ›
          </button>
        </div> */}

        <div
          className="relative overflow-hidden bg-black p-3"
          style={{
            aspectRatio: "9 / 16",
            maxHeight: "68vh",
          }}
        >
          {/* Luxury frame */}
          <div
            className="absolute inset-0 rounded-[1.8rem] border border-white/[0.06]"
            style={{
              boxShadow: `
        inset 0 0 0 1px ${reel.glow}10,
        inset 0 0 30px ${reel.glow}08
      `,
            }}
          />

          {/* SAFE AREA */}
          <div className="absolute inset-[14px] overflow-hidden rounded-[1.45rem] bg-black">
            {/* Poster */}
            <img
              src={poster}
              alt={`${reel.title} poster`}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
              draggable={false}
            />

            {/* Video */}
            <video
              key={reel.id}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
              style={{
                opacity: isReady ? 1 : 0,
              }}
              src={reel.src}
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              onLoadedData={handleLoadedData}
              onTimeUpdate={handleTimeUpdate}
            />

            {!isReady && (
              <div className="absolute inset-0 grid place-items-center bg-black/20">
                <div className="h-10 w-10 rounded-full border border-white/10 border-t-bullion/60 animate-spin" />
              </div>
            )}

            {/* TOP BADGES */}
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-white/68 backdrop-blur-md">
              {reel.client}
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-bullion/22 bg-black/50 px-3 py-1.5 text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-champagne/88 backdrop-blur-md">
              9:16 reel
            </div>

            {/* BOTTOM OVERLAY */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 pb-4 pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-bullion/78">
                    active reel
                  </p>

                  <h3 className="mt-1 font-display text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
                    {reel.title}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* NAV BUTTONS */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous reel"
            className="absolute left-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/46 text-white/72 transition-colors duration-200 hover:border-bullion/36 hover:text-champagne"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next reel"
            className="absolute right-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/46 text-white/72 transition-colors duration-200 hover:border-bullion/36 hover:text-champagne"
          >
            ›
          </button>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div className="space-y-2">
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-200"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${reel.glow}88, ${reel.glow})`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[0.44rem] font-semibold uppercase tracking-[0.32em] text-white/34">
              <span>{currentTime}</span>
              <span>
                {reel.category} · {reel.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {reel.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-bullion/16 bg-bullion/6 px-2.5 py-1 text-[0.38rem] font-semibold uppercase tracking-[0.24em] text-champagne/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute reel" : "Mute reel"}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-200 ${
                isMuted
                  ? "border-white/10 bg-white/[0.03] text-white/54 hover:border-bullion/34 hover:text-bullion"
                  : "border-bullion/42 bg-bullion/12 text-bullion shadow-[0_0_20px_rgba(212,175,55,0.16)]"
              }`}
            >
              {isMuted ? <MicOff size={13} /> : <Volume2 size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThumbRail({
  reels,
  activeIndex,
  posterFor,
  align,
  onSelect,
  mobile = false,
}: {
  reels: ReelItem[];
  activeIndex: number;
  posterFor: (reel: ReelItem) => string;
  align: "start" | "end";
  onSelect: (index: number) => void;
  mobile?: boolean;
}) {
  const total = reels.length;
  const indices = mobile
    ? Array.from({ length: total }, (_, index) => index)
    : align === "end"
      ? [
          (activeIndex - 3 + total) % total,
          (activeIndex - 2 + total) % total,
          (activeIndex - 1 + total) % total,
        ]
      : [
          (activeIndex + 1) % total,
          (activeIndex + 2) % total,
          (activeIndex + 3) % total,
        ];

  return (
    <div
      className={
        mobile
          ? "flex gap-3 overflow-x-auto pb-2"
          : `flex flex-col gap-4 ${align === "end" ? "items-end" : "items-start"}`
      }
    >
      {indices.map((reelIndex, position) => {
        const reel = reels[reelIndex];
        const active = reelIndex === activeIndex;
        return (
          <ThumbnailCard
            key={reel.id}
            reel={reel}
            active={active}
            compact={!mobile && position !== 1}
            poster={posterFor(reel)}
            onClick={() => onSelect(reelIndex)}
          />
        );
      })}
    </div>
  );
}

function ThumbnailCard({
  reel,
  active,
  compact,
  poster,
  onClick,
}: {
  reel: ReelItem;
  active: boolean;
  compact: boolean;
  poster: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative shrink-0 overflow-hidden rounded-[1.2rem] border bg-[#050505] text-left transition-all duration-300 ${
        active
          ? "border-bullion/42 shadow-[0_0_0_1px_rgba(212,175,55,0.16),0_14px_36px_rgba(0,0,0,0.34)]"
          : "border-white/[0.08] opacity-80 hover:border-bullion/32 hover:opacity-100"
      } ${compact ? "w-[120px] sm:w-[132px]" : "w-[138px] sm:w-[152px]"}`}
      style={{ aspectRatio: "9 / 16" }}
    >
      <img
        src={poster}
        alt={`${reel.title} poster`}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        draggable={false}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.14)_30%,rgba(0,0,0,0.72)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${reel.glow}66` }}
      />

      <div className="absolute left-3 top-3 text-[0.4rem] font-semibold uppercase tracking-[0.34em] text-white/50">
        {reel.index}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10">
        <p className="text-[0.42rem] font-semibold uppercase tracking-[0.32em] text-bullion/72">
          {reel.client}
        </p>
        <h4 className="mt-1 text-[0.82rem] font-semibold leading-tight tracking-[-0.03em] text-white">
          {reel.title}
        </h4>
      </div>

      {active && (
        <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] border border-bullion/38" />
      )}
    </motion.button>
  );
}

function ActiveInfo({
  reel,
  isMuted,
  progress,
  currentTime,
  onToggleMute,
}: {
  reel: ReelItem;
  isMuted: boolean;
  progress: number;
  currentTime: string;
  onToggleMute: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[28rem] space-y-5 lg:ml-auto lg:text-right"
    >
      <div className="inline-flex items-center gap-3 lg:ml-auto">
        <span className="h-px w-8 bg-gradient-to-r from-transparent via-bullion to-transparent" />
        <span className="text-[0.56rem] font-semibold uppercase tracking-[0.4em] text-white/34">
          selected reel
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={reel.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-display text-[clamp(2rem,3vw,3.4rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-white">
            {reel.title}
          </h3>
          <p className="mt-4 max-w-[24rem] text-[0.92rem] leading-8 text-white/62 lg:ml-auto">
            {reel.client} · {reel.category} · {reel.duration}
          </p>
          <p className="mt-4 max-w-[23rem] text-[0.86rem] leading-7 text-white/48 lg:ml-auto">
            {reel.note}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-4 rounded-[1.45rem] border border-white/[0.08] bg-white/[0.015] p-4 lg:ml-auto">
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {reel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bullion/16 bg-bullion/6 px-2.5 py-1 text-[0.38rem] font-semibold uppercase tracking-[0.24em] text-champagne/72"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 lg:text-right">
          <p className="text-[0.48rem] font-semibold uppercase tracking-[0.34em] text-white/34">
            playback status
          </p>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-[width] duration-200"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${reel.glow}88, ${reel.glow})`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[0.44rem] font-semibold uppercase tracking-[0.3em] text-white/32 lg:justify-end lg:gap-4">
            <span>{currentTime}</span>
            <span>{reel.duration}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[0.48rem] font-semibold uppercase tracking-[0.3em] transition-colors duration-200 lg:ml-auto ${
            isMuted
              ? "border-white/10 bg-white/[0.03] text-white/60 hover:border-bullion/34 hover:text-bullion"
              : "border-bullion/42 bg-bullion/12 text-bullion"
          }`}
        >
          {isMuted ? <MicOff size={12} /> : <Volume2 size={12} />}
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </motion.div>
  );
}

function TimelineStrip({
  reels,
  activeIndex,
  onSelect,
}: {
  reels: ReelItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 border-t border-white/[0.06] pt-5"
    >
      <div className="flex items-center justify-between gap-4 text-[0.46rem] font-semibold uppercase tracking-[0.34em] text-white/26">
        <span>timeline</span>
        <span>tap a reel to shift focus</span>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {reels.map((reel, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={reel.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-left transition-all duration-200 ${
                active
                  ? "border-bullion/38 bg-bullion/10 text-champagne shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                  : "border-white/8 bg-white/[0.02] text-white/48 hover:border-bullion/22 hover:text-white/78"
              }`}
            >
              <span className="block text-[0.46rem] font-semibold uppercase tracking-[0.32em]">
                {reel.category}
              </span>
              <span className="mt-1 block text-[0.76rem] font-semibold tracking-[-0.02em] text-white">
                {reel.index} — {reel.title}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default RecentWorksSection;
