// import { motion } from "framer-motion";
// import { ArrowUpRight, Play } from "lucide-react";
// import { HeroVisual } from "./HeroVisual";

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: { opacity: 1, y: 0 },
// };

// export function HeroSection() {
//   return (
//     <section
//       id="home"
//       className="relative z-10 flex min-h-screen items-start px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:items-start lg:pb-10 lg:pt-24"
//     >
//       <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:-translate-y-2 lg:grid-cols-[0.48fr_0.52fr] xl:gap-12">
//         <motion.div
//           className="relative max-w-[44rem] pt-1 lg:pt-0"
//           initial="hidden"
//           animate="visible"
//           transition={{ staggerChildren: 0.09, delayChildren: 0.08 }}
//         >
//           <motion.div
//             aria-hidden="true"
//             className="pointer-events-none absolute -left-8 top-[-1.25rem] hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16)_0%,rgba(212,175,55,0.06)_24%,transparent_72%)] blur-[88px] lg:block"
//             animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.98, 1.03, 0.98] }}
//             transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             aria-hidden="true"
//             className="pointer-events-none absolute left-2 top-[2.5rem] hidden h-24 w-24 rounded-full bg-champagne/4 blur-2xl lg:block"
//             animate={{ opacity: [0.12, 0.24, 0.12], y: [0, -6, 0] }}
//             transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             aria-hidden="true"
//             className="pointer-events-none absolute left-[14rem] top-[6.5rem] hidden h-1.5 w-1.5 rounded-full bg-champagne/40 shadow-[0_0_12px_rgba(224,195,106,0.7)] lg:block"
//             animate={{ opacity: [0.22, 0.78, 0.22], y: [0, -10, 0] }}
//             transition={{
//               duration: 6.8,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 0.7,
//             }}
//           />

//           <motion.div
//             variants={fadeUp}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="mb-5 inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/[0.04] px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-champagne shadow-[0_0_18px_rgba(212,175,55,0.06)]"
//           >
//             <span className="h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_10px_rgba(224,195,106,0.7)]" />
//             Premium Video Editor
//           </motion.div>

//           <motion.h1
//             variants={fadeUp}
//             transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
//             className="max-w-[13.5ch] font-display text-[clamp(3.35rem,5.3vw,6.3rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-white"
//           >
//             <span className="block text-white/96">Luxury motion</span>
//             <span className="block text-white/92">storytelling built</span>
//             <span className="block text-white/92">
//               for <span className="text-champagne">retention</span>.
//             </span>
//             <motion.span
//               className="mt-3 block h-1 w-24 rounded-full bg-[linear-gradient(90deg,transparent,rgba(224,195,106,0.82),transparent)]"
//               animate={{ opacity: [0.4, 0.85, 0.4], scaleX: [0.88, 1, 0.88] }}
//               transition={{
//                 duration: 4.8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.h1>

//           <motion.p
//             variants={fadeUp}
//             transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//             className="mt-6 max-w-[31rem] text-[0.98rem] leading-8 text-white/72 sm:text-[1.02rem]"
//           >
//             Cinematic edits built for retention, visual rhythm, and premium
//             short-form storytelling for creators and brands.
//           </motion.p>

//           <motion.div
//             variants={fadeUp}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
//           >
//             <motion.a
//               href="#works"
//               whileHover={{ y: -2, scale: 1.015 }}
//               whileTap={{ scale: 0.985 }}
//               className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-bullion via-[#f2dc8a] to-champagne px-6 py-4 text-sm font-semibold text-black shadow-[0_14px_34px_rgba(212,175,55,0.12)] transition duration-300 hover:translate-y-[-3px] hover:shadow-[0_22px_56px_rgba(212,175,55,0.24)]"
//             >
//               <motion.span
//                 className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 blur-[2px] group-hover:opacity-100"
//                 animate={{ x: ["0%", "260%"] }}
//                 transition={{
//                   duration: 1.15,
//                   repeat: Infinity,
//                   repeatDelay: 2.6,
//                   ease: "easeInOut",
//                 }}
//               />
//               <Play size={17} fill="currentColor" />
//               View Portfolio
//             </motion.a>
//             <motion.a
//               href="#contact"
//               whileHover={{ y: -2, scale: 1.01 }}
//               whileTap={{ scale: 0.985 }}
//               className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-bullion/22 bg-black/26 px-6 py-4 text-sm font-semibold text-champagne shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-champagne/48 hover:bg-bullion/[0.08] hover:shadow-[0_18px_42px_rgba(212,175,55,0.12)]"
//             >
//               <motion.span
//                 className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 bg-gradient-to-r from-transparent via-champagne/22 to-transparent opacity-0 blur-[2px] group-hover:opacity-100"
//                 animate={{ x: ["0%", "260%"] }}
//                 transition={{
//                   duration: 1.25,
//                   repeat: Infinity,
//                   repeatDelay: 3,
//                   ease: "easeInOut",
//                 }}
//               />
//               Contact Me
//               <ArrowUpRight
//                 size={16}
//                 className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//               />
//             </motion.a>
//           </motion.div>
//         </motion.div>

//         <HeroVisual />
//       </div>
//     </section>
//   );
// }

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Scissors } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  "Short-form Reels",
  "YouTube Edits",
  "Instagram Content",
  "Brand Films",
  "Cinematic Cuts",
  "Hook Strategy",
  "Color Grading",
  "Sound Design",
  "Retention Editing",
  "Creator Branding",
];

const STATS = [
  { value: "9+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
  { value: "48h", label: "Turnaround" },
] as const;

/* ── Word split helper ─────────────────────────────────────────────────────── */
function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
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

/* ── Char reveal helper ────────────────────────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  /* Magnetic cursor */
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
      className="hero-section relative z-10 flex min-h-screen flex-col overflow-hidden bg-[#050505]"
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
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-[1560px] items-center justify-between
                     px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(7rem,11vw,9.5rem)]"
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

          {/* Pulsing availability */}
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

        {/* ── HEADLINE + RIGHT COLUMN ───────────────────────────────────────── */}
        <div
          className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col justify-center
                     px-[clamp(1.5rem,5vw,6rem)] pb-6 pt-[clamp(2.5rem,5vw,4rem)]"
        >
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_360px] xl:gap-24">
            {/* LEFT — text stack */}
            <div>
              {/* Giant heading — 2 lines */}
              <h1
                className="font-display font-black leading-[0.84] tracking-[-0.04em] text-white
                           text-[clamp(3.8rem,9vw,10.5rem)]"
              >
                <span className="block overflow-hidden">
                  <WordReveal text="Edits that" delay={0.18} />
                </span>
                <span className="block overflow-hidden">
                  <WordReveal text="demand" delay={0.32} />{" "}
                  <span className="overflow-hidden inline-block">
                    <motion.span
                      className="inline-block gold-gradient-text italic"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.72,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      attention.
                    </motion.span>
                  </span>
                </span>
              </h1>

              {/* Animated rule */}
              <motion.div
                className="mt-7 h-px bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37]/20 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ maxWidth: "38rem" }}
              />

              {/* Sub paragraph */}
              <motion.p
                className="mt-6 max-w-[34rem] text-[clamp(0.95rem,1.3vw,1.1rem)]
                           leading-[1.9] text-white/52"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Retention-focused editing, cinematic pacing, and visual
                storytelling built for creators and brands growing across
                YouTube and Instagram.
              </motion.p>

              {/* CTA buttons */}
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
                  <Scissors size={13} strokeWidth={2.2} />
                  View Client Work
                </MagneticButton>

                <MagneticButton href="#contact">
                  Start a Project
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </MagneticButton>
              </motion.div>

              {/* Stats + signature */}
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
                      className="font-display text-[clamp(2rem,3.2vw,3.2rem)] font-black
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

                {/* Signature */}
                <motion.div
                  className="ml-auto hidden items-center gap-4 lg:flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                >
                  <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  <div>
                    <p
                      className="font-signature text-[1.8rem] leading-none
                                  text-[#d4af37]/90
                                  drop-shadow-[0_0_22px_rgba(212,175,55,0.35)]"
                    >
                      Robin D
                    </p>
                    <p
                      className="mt-1.5 text-[0.42rem] font-medium uppercase
                                  tracking-[0.44em] text-white/28"
                    >
                      Content Creator
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT — live edit timeline card */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <LiveEditCard />
            </motion.div>
          </div>
        </div>

        {/* ── SCROLLING TICKER ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="relative overflow-hidden border-t border-white/[0.055] py-[14px]"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20
                          bg-gradient-to-r from-[#050505] to-transparent"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20
                          bg-gradient-to-l from-[#050505] to-transparent"
          />
          <div className="marquee-track flex gap-10 whitespace-nowrap">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="flex items-center gap-4">
                <span className="h-[5px] w-[5px] rounded-full bg-[#d4af37]/45" />
                <span className="text-[0.48rem] font-medium uppercase tracking-[0.4em] text-white/26">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
   ══════════════════════════════════════════════════════════════════════════════ */
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
             rounded-full border border-[#d4af37]/22
             bg-white/[0.03] px-8 py-[15px]
             text-[0.68rem] font-semibold uppercase tracking-[0.24em]
             text-[#d4af37] backdrop-blur-xl
             transition-all duration-300
             hover:border-[#d4af37]/48 hover:bg-[#d4af37]/[0.07]
             hover:shadow-[0_16px_48px_rgba(212,175,55,0.12)]`
      }
    >
      {primary && (
        /* shimmer sweep */
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
      {!primary && (
        <ArrowUpRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   LIVE EDIT CARD  — right column, looks like a real NLE timeline
   ══════════════════════════════════════════════════════════════════════════════ */
function LiveEditCard() {
  const [playhead, setPlayhead] = useState(0);

  /* Animate playhead 0→100% on loop */
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 5200; // ms per loop
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = ((ts - start) % duration) / duration;
      setPlayhead(pct * 100);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tracks = [
    {
      label: "VIDEO A",
      color: "#d4af37",
      clips: [
        { from: 4, to: 38 },
        { from: 44, to: 72 },
        { from: 76, to: 96 },
      ],
    },
    {
      label: "VIDEO B",
      color: "#e2c56a",
      clips: [
        { from: 8, to: 28 },
        { from: 52, to: 88 },
      ],
    },
    {
      label: "AUDIO",
      color: "#c89b2d",
      clips: [
        { from: 0, to: 60 },
        { from: 62, to: 98 },
      ],
    },
    {
      label: "FX",
      color: "#f0d98a",
      clips: [
        { from: 10, to: 20 },
        { from: 34, to: 50 },
        { from: 68, to: 84 },
      ],
    },
    {
      label: "TITLE",
      color: "#b88d2b",
      clips: [
        { from: 2, to: 16 },
        { from: 80, to: 94 },
      ],
    },
  ];

  const timecodes = [
    "00:00",
    "00:10",
    "00:20",
    "00:30",
    "00:40",
    "00:50",
    "01:00",
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]
                    bg-[#070707] shadow-[0_48px_120px_rgba(0,0,0,0.88)]"
    >
      {/* Card ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.07),transparent_55%)]" />

      {/* Header chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[0.42rem] font-medium uppercase tracking-[0.4em] text-white/40">
            Live Edit Session
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="h-[6px] w-[6px] rounded-full bg-[#d4af37]
                           shadow-[0_0_8px_rgba(212,175,55,0.9)]"
          />
          <span className="font-mono text-[0.4rem] text-[#d4af37]/80">
            {String(Math.floor((playhead / 100) * 60)).padStart(2, "0")}:
            {String(Math.floor(((playhead / 100) * 60 * 10) % 60)).padStart(
              2,
              "0",
            )}
          </span>
        </div>
      </div>

      {/* Preview thumbnail area */}
      <div
        className="relative mx-4 mt-4 overflow-hidden rounded-[1.3rem] bg-[#0a0a0a]"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Fake preview gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_38%,rgba(212,175,55,0.14),transparent_55%),linear-gradient(160deg,#0c0b08,#080808,#050505)]" />
        {/* Scanlines */}
        <div className="scanlines absolute inset-0" />
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <motion.div
            className="font-display text-[0.6rem] font-bold uppercase tracking-[0.5em] text-[#d4af37]/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Robin D · Reel {Math.floor(playhead / 34) + 1}
          </motion.div>
          <div className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        </div>
        {/* Corner badge */}
        <div
          className="absolute right-3 top-3 rounded-full border border-[#d4af37]/20
                        bg-black/60 px-2.5 py-1 backdrop-blur-xl"
        >
          <span className="font-mono text-[0.38rem] text-[#d4af37]/75">
            4K · HEVC
          </span>
        </div>
      </div>

      {/* Timeline ruler */}
      <div className="mt-4 px-4">
        <div className="relative flex justify-between px-0 mb-1.5">
          {timecodes.map((tc) => (
            <span key={tc} className="font-mono text-[0.35rem] text-white/22">
              {tc}
            </span>
          ))}
        </div>

        {/* Tick marks */}
        <div className="relative mb-2 flex gap-[1px]">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                height: i % 10 === 0 ? 6 : i % 5 === 0 ? 4 : 2,
                background:
                  i % 10 === 0
                    ? "rgba(212,175,55,0.4)"
                    : "rgba(255,255,255,0.1)",
                borderRadius: 1,
              }}
            />
          ))}
          {/* Playhead line */}
          <div
            className="absolute top-0 bottom-0 z-20 w-[1.5px]
                       bg-gradient-to-b from-[#d4af37] to-[#d4af37]/20"
            style={{
              left: `${playhead}%`,
              boxShadow: "0 0 8px rgba(212,175,55,0.8)",
              transition: "left 0.08s linear",
            }}
          >
            <div
              className="-translate-x-[3px] -top-[4px] absolute h-2 w-2
                            rotate-45 bg-[#d4af37]"
            />
          </div>
        </div>

        {/* Track rows */}
        <div className="space-y-[5px] pb-4">
          {tracks.map((track) => (
            <div key={track.label} className="flex items-center gap-2">
              <span
                className="w-10 shrink-0 text-right text-[0.34rem] font-medium
                               uppercase tracking-[0.28em] text-white/28"
              >
                {track.label}
              </span>
              <div className="relative flex-1 h-[14px] overflow-hidden rounded-md bg-white/[0.03]">
                {track.clips.map((clip, ci) => (
                  <motion.div
                    key={ci}
                    className="absolute top-0 bottom-0 rounded-[3px]"
                    style={{
                      left: `${clip.from}%`,
                      width: `${clip.to - clip.from}%`,
                      background: `linear-gradient(90deg, ${track.color}44, ${track.color}88)`,
                      borderTop: `1px solid ${track.color}70`,
                    }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2.5 + ci * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ci * 0.3,
                    }}
                  />
                ))}
                {/* Playhead overlay on clip */}
                <div
                  className="absolute top-0 bottom-0 z-10 w-[1px]"
                  style={{
                    left: `${playhead}%`,
                    background: "rgba(212,175,55,0.6)",
                    transition: "left 0.08s linear",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer tools row */}
      <div
        className="flex items-center justify-between border-t border-white/[0.055]
                      px-5 py-3"
      >
        <div className="flex items-center gap-3">
          {["CUT", "COLOR", "SOUND", "FX"].map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1
                         text-[0.38rem] font-medium uppercase tracking-[0.3em] text-white/35
                         transition-colors duration-200 hover:border-[#d4af37]/30
                         hover:text-[#d4af37]/70 cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
        <span className="text-[0.38rem] font-medium uppercase tracking-[0.32em] text-white/22">
          Exporting…
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BACKGROUND
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
      {/* Center bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_40%,rgba(212,175,55,0.045),transparent_50%)]" />
      {/* Grain */}
      <div className="hero-grain absolute inset-0" />
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.9),inset_0_0_100px_rgba(212,175,55,0.018)]" />
      {/* Top + bottom fades */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
      {/* Floating particles */}
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
