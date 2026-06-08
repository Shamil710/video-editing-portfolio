import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";

/* ── Cloudinary reels ──────────────────────────────────────────────────────── */
const MAIN_REEL =
  "https://res.cloudinary.com/dqcnj05ch/video/upload/v1780731118/Sequence_01_10_eqlqvb.mp4";
const BG_REEL =
  "https://res.cloudinary.com/dqcnj05ch/video/upload/v1780731111/Sequence_01_11_ah1ro4.mp4";

/* ── Constants ─────────────────────────────────────────────────────────────── */
const SERVICES = [
  "Content Creator Edits",
  "YouTube Production",
  "Personal Video Montages",
  "Short-form Reels",
  "Cinematic Storytelling",
  "Color & Sound Design",
] as const;

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24h", label: "Avg. Turnaround" },
] as const;

/* ── Word split reveal ─────────────────────────────────────────────────────── */
function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.075,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Char reveal ───────────────────────────────────────────────────────────── */
function CharReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Magnetic button ───────────────────────────────────────────────────────── */
function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className={
        primary
          ? `group relative inline-flex items-center justify-center gap-2.5
             overflow-hidden rounded-full
             bg-gradient-to-r from-[#8f6a1f] via-[#f2dc8a] to-[#c89b2d]
             px-8 py-[15px] text-[0.68rem] font-semibold uppercase tracking-[0.24em]
             text-black shadow-[0_16px_44px_rgba(212,175,55,0.22)]
             transition-shadow duration-300
             hover:shadow-[0_26px_64px_rgba(212,175,55,0.36)]`
          : `group inline-flex items-center justify-center gap-2.5
             rounded-full border border-white/18
             bg-white/[0.04] px-8 py-[15px]
             text-[0.68rem] font-semibold uppercase tracking-[0.24em]
             text-white/80 backdrop-blur-xl
             transition-all duration-300
             hover:border-white/30 hover:bg-white/[0.08]
             hover:text-white`
      }
    >
      {primary && (
        <motion.span
          className="pointer-events-none absolute inset-y-0 left-[-50%] w-1/2
                     bg-gradient-to-r from-transparent via-white/45 to-transparent
                     blur-sm opacity-0 group-hover:opacity-100"
          animate={{ x: ["0%", "320%"] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 2.4,
            ease: "easeInOut",
          }}
        />
      )}
      {children}
    </motion.a>
  );
}

/* ── Tilt video card ───────────────────────────────────────────────────────── */
function TiltVideoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 26,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 26,
    mass: 0.5,
  });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [20, 80]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      const p = video.play();
      if (p) p.catch(() => undefined);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else video.pause();
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full"
      style={{ perspective: "1200px" }}
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Glow behind card */}
      <motion.div
        className="absolute -inset-6 rounded-[2.5rem] opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.25), transparent)",
          left: useTransform(glowX, [20, 80], ["-5%", "5%"]),
          top: useTransform(glowY, [20, 80], ["-5%", "5%"]),
        }}
      />

      {/* Card body */}
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10
                   bg-black shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Background video (second reel) */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <video
            src={BG_REEL}
            className="h-full w-full object-cover blur-xl scale-110"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        {/* Main video */}
        <div className="relative z-10">
          <video
            ref={videoRef}
            src={MAIN_REEL}
            className="aspect-[9/16] w-full object-cover sm:aspect-auto sm:max-h-[560px]"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top-left badge */}
        <div className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/50 px-3.5 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[#d4af37]" />
          </span>
          <span className="text-[0.4rem] font-semibold uppercase tracking-[0.3em] text-white/70">
            Featured Reel
          </span>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div>
              <p className="text-[0.4rem] font-medium uppercase tracking-[0.35em] text-white/40">
                Now Playing
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Robin D · Showcase Reel
              </p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-[#d4af37]">
              <Play size={16} fill="currentColor" />
            </span>
          </motion.div>
        </div>

        {/* Edge light */}
        <div className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  /* Magnetic cursor glow */
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col overflow-hidden bg-[#050505]"
    >
      {/* ── Custom cursor glow ─────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 68%)",
        }}
      />

      {/* ── BG atmosphere ─────────────────────────────────────────────────── */}
      <HeroBg />

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 flex-col px-[clamp(1.5rem,5vw,6rem)]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between pt-[clamp(7rem,11vw,9.5rem)]"
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />
            <CharReveal
              text="Content Creator · Video Editor"
              delay={0.55}
              className="text-[0.48rem] font-medium uppercase tracking-[0.48em] text-[#d4af37]/65"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="hidden items-center gap-2.5 rounded-full border border-[#d4af37]/16
                       bg-[#d4af37]/[0.04] px-4 py-2 backdrop-blur-xl sm:flex"
          >
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-55" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#d4af37]" />
            </span>
            <span className="text-[0.44rem] font-medium uppercase tracking-[0.4em] text-white/40">
              Available for projects
            </span>
          </motion.div>
        </motion.div>

        {/* ── MAIN GRID: Text + Video ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-center pb-6 pt-[clamp(2.5rem,5vw,4rem)]">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_400px] xl:gap-20">
            {/* LEFT — text */}
            <div>
              <h1
                className="font-display font-black leading-[0.88] tracking-[-0.04em] text-white
                           text-[clamp(3.2rem,8vw,8rem)]"
              >
                <span className="block overflow-hidden">
                  <WordReveal text="Your story," delay={0.18} />
                </span>
                <span className="block overflow-hidden">
                  <WordReveal text="edited to" delay={0.32} />
                </span>
                <span className="block overflow-hidden">
                  <span className="overflow-hidden inline-block">
                    <motion.span
                      className="inline-block gold-gradient-text"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.72,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      perfection.
                    </motion.span>
                  </span>
                </span>
              </h1>

              <motion.div
                className="mt-6 h-px bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37]/20 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ maxWidth: "32rem" }}
              />

              <motion.p
                className="mt-6 max-w-[32rem] text-[clamp(0.9rem,1.2vw,1.05rem)]
                           leading-[1.9] text-white/52"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Professional video editing for content creators, personal
                projects, and every story in between. From YouTube deep dives to
                Instagram reels — I craft retention-driven videos that
                captivate.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MagneticButton href="#works" primary>
                  View My Work
                </MagneticButton>
                <MagneticButton href="#contact">
                  Let's Talk
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </MagneticButton>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-12 flex flex-wrap items-center gap-8 border-t border-white/[0.07] pt-8 sm:gap-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                {STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 1.4 + i * 0.1 }}
                  >
                    <p
                      className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-black
                                  leading-none tracking-[-0.06em] text-white"
                    >
                      {value}
                    </p>
                    <p
                      className="mt-1.5 text-[0.44rem] font-medium uppercase
                                  tracking-[0.42em] text-white/34"
                    >
                      {label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — video card */}
            <div className="flex justify-center lg:justify-end">
              <TiltVideoCard />
            </div>
          </div>
        </div>


      </div>

      {/* ── SCROLLING TICKER ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        className="relative overflow-hidden border-t border-white/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0.003))] py-[15px]"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28
                        bg-gradient-to-r from-[#050505] to-transparent"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28
                        bg-gradient-to-l from-[#050505] to-transparent"
        />
        <div className="marquee-track flex gap-14 whitespace-nowrap">
          {[...SERVICES, ...SERVICES].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-5">
              <span className="h-[5px] w-[5px] rounded-full bg-[#d4af37]/28" />
              <span className="text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-white/50">
                {item}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BACKGROUND ATMOSPHERE
   ══════════════════════════════════════════════════════════════════════════════ */
function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Gold orbs */}
      <motion.div
        className="absolute -left-[18%] -top-[12%] h-[60rem] w-[60rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 38%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ opacity: [0.5, 0.88, 0.5], scale: [0.97, 1.04, 0.97] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[14%] -right-[10%] h-[48rem] w-[48rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 66%)",
          filter: "blur(80px)",
        }}
        animate={{ opacity: [0.28, 0.58, 0.28], scale: [0.98, 1.06, 0.98] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_40%,rgba(212,175,55,0.045),transparent_50%)]" />
      <div className="hero-grain absolute inset-0" />
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.9),inset_0_0_100px_rgba(212,175,55,0.018)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
      <HeroParticles />
    </div>
  );
}

/* ── Particles ─────────────────────────────────────────────────────────────── */
function HeroParticles() {
  const pts = [
    { left: "12%", top: "20%", size: 2.2, delay: 0 },
    { left: "24%", top: "65%", size: 1.5, delay: 0.8 },
    { left: "38%", top: "14%", size: 2.6, delay: 1.4 },
    { left: "52%", top: "74%", size: 1.8, delay: 0.3 },
    { left: "63%", top: "28%", size: 2.0, delay: 1.0 },
    { left: "75%", top: "55%", size: 1.4, delay: 0.6 },
    { left: "84%", top: "18%", size: 2.4, delay: 1.7 },
    { left: "90%", top: "72%", size: 1.6, delay: 0.4 },
  ];
  return (
    <>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "rgba(212,175,55,0.5)",
            filter: "blur(0.3px)",
          }}
          animate={{ y: [-7, 10, -7], opacity: [0.06, 0.45, 0.06] }}
          transition={{
            duration: 7,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
