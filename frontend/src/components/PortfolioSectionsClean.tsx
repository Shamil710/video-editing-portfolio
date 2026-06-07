/**
 * AboutSection — "Ember Frame" redesign
 *
 * Layout: Two primary zones at lg+
 *   LEFT  (55%) → full-bleed portrait as atmospheric background + all text on top
 *   RIGHT (45%) → vertical reel player card + editorial copy
 *
 * Image used: The wide landscape portrait (1531×1027) — toned down with
 *   filter: saturate(0.72) brightness(0.78) contrast(1.08)
 *   so the face reads naturally, not over-glowed.
 *
 * Portrait hosted on Cloudinary (replace <YOUR_CLOUDINARY_PORTRAIT_URL> below).
 * Video: existing Cloudinary reel URL.
 *
 * Fonts required in your global CSS / index.html:
 *   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
 *
 * CSS classes expected from your global stylesheet:
 *   .gold-gradient-text  — linear-gradient gold text
 *   .about-grain         — noise grain overlay
 *   .about-vignette      — radial dark vignette
 *   .scanlines           — scanline texture
 *   page-section         — full-width section wrapper
 *
 * Drop-in replacement for the <AboutSection /> in PortfolioSectionsClean.tsx
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Assets ─────────────────────────────────────────────────────────────────── */
// Replace with your actual import or Cloudinary URL string
import portrait from "../images/ChatGPT Image May 25, 2026, 11_32_07 PM.png";

const REEL_URL =
  "https://res.cloudinary.com/dqcnj05ch/video/upload/v1780766271/videoplayback_mqnfuh.mp4";

/* ── Easing ──────────────────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="about"
      ref={ref}
      className="page-section relative w-screen overflow-hidden bg-[#050505]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Ambient atmosphere ──────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* warm ember orb — bottom-left */}
        <motion.div
          className="absolute -left-[10%] bottom-[5%] h-[80vh] w-[80vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,140,30,0.09) 0%, transparent 62%)",
            filter: "blur(110px)",
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* cool shadow — top-right */}
        <motion.div
          className="absolute -right-[8%] top-[8%] h-[55vh] w-[55vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.98, 1.07, 0.98] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        {/* grain + vignette */}
        <div className="about-grain" aria-hidden="true" />
        <div className="about-vignette" aria-hidden="true" />
      </div>

      {/* ── Section label ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1700px] px-[clamp(1.25rem,4.5vw,5rem)]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_SOFT }}
          className="flex items-center justify-between pt-[clamp(5rem,8vw,8.5rem)]"
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] tracking-[0.5em] text-[#d4af37]/40 uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              02
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-[#d4af37]/45 to-transparent" />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#d4af37]/60"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              About
            </span>
          </div>
          <span
            className="hidden text-[10px] font-medium uppercase tracking-[0.4em] text-white/18 sm:block"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Robin D · Editor & Content Creator
          </span>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          MAIN GRID
          Desktop: [PORTRAIT+TEXT 55%] [VIDEO+COPY 45%]
          Mobile:  stacked
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1700px]">
        <div className="mt-[clamp(2rem,3.5vw,4rem)] grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-[72vh]">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT ZONE — Portrait + Text overlay
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col justify-end overflow-hidden min-h-[60vh] lg:min-h-[72vh]">
            {/* Portrait background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <img
                src={portrait}
                alt="Robin D — Video Editor"
                className="absolute inset-0 h-full w-full object-cover select-none"
                draggable={false}
                style={{
                  objectPosition: "center 18%",
                  filter: "saturate(0.7) brightness(0.72) contrast(1.1)",
                }}
              />
            </motion.div>

            {/* Gradient overlays — blend portrait into section */}
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to bottom, #050505 0%, transparent 22%, transparent 48%, rgba(5,5,5,0.55) 70%, #050505 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, #050505 100%)",
              }}
            />
            {/* scanlines for cinematic depth */}
            <div className="scanlines pointer-events-none absolute inset-0 z-[2] opacity-15" />

            {/* ── Text content sits above the portrait ── */}
            <div className="relative z-10 px-[clamp(1.5rem,5vw,5.5rem)] pb-[clamp(3rem,5vw,5rem)]">
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(3rem, 6.5vw, 7.5rem)",
                }}
                className="text-white"
              >
                Stories
                <br />
                <em
                  className="gold-gradient-text"
                  style={{ fontStyle: "italic", fontWeight: 700 }}
                >
                  designed
                </em>
                <br />
                to hold
                <br />
                attention.
              </motion.h2>

              {/* Gold rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: EASE_SOFT }}
                style={{ originX: 0 }}
                className="mt-[clamp(1.2rem,2vw,2rem)] h-[1px] max-w-[20rem]
                           bg-gradient-to-r from-[#d4af37]/70 via-[#d4af37]/28 to-transparent"
              />

              {/* Bio paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.4, ease: EASE_SOFT }}
                className="mt-[clamp(1rem,1.8vw,1.8rem)] space-y-3 max-w-[30rem]"
              >
                <p className="text-[clamp(0.88rem,1.1vw,1rem)] leading-[1.85] text-white/52">
                  Retention-focused editing, cinematic pacing, and visual
                  storytelling built for creators growing across YouTube and
                  Instagram. Every cut is intentional. Every frame earns its
                  place.
                </p>
                <p className="text-[clamp(0.82rem,1vw,0.92rem)] leading-[1.85] text-white/34">
                  Specialising in short-form content that hooks fast — blending
                  motion design, sound, and narrative into edits people can't
                  stop watching.
                </p>
              </motion.div>

              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.5, ease: EASE_SOFT }}
                className="relative mt-[clamp(1rem,1.8vw,1.8rem)] max-w-[26rem]
                           border-l-[2px] border-[#d4af37]/55 pl-4 py-0.5"
              >
                <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4af37] via-[#d4af37]/45 to-transparent" />
                <p
                  className="text-[clamp(0.9rem,1.1vw,1rem)] leading-7 text-white/65"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                  }}
                >
                  "Building visuals people instantly recognise — and can't stop
                  watching."
                </p>
              </motion.div>

              {/* Signature + location */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.58, ease: EASE_SOFT }}
                className="mt-[clamp(1.2rem,2vw,2rem)] flex items-center gap-6"
              >
                {/* SVG signature — handwritten look */}
                <div>
                  <SignatureSVG />
                  <p
                    className="mt-2 text-[10px] font-semibold uppercase tracking-[0.44em] text-white/28"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Editor · Content Creator
                  </p>
                </div>
                <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
                <div>
                  <p
                    className="text-[9px] font-medium uppercase tracking-[0.38em] text-white/22"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Based in
                  </p>
                  <p
                    className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    India
                  </p>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-[clamp(1.5rem,2.5vw,2.5rem)] flex flex-wrap items-end
                           gap-x-7 gap-y-4 border-t border-white/[0.07] pt-5"
              >
                {(
                  [
                    { v: "50+", l: "Projects" },
                    { v: "100%", l: "Satisfaction" },
                    { v: "24h", l: "Turnaround" },
                    { v: "2+", l: "Years" },
                  ] as { v: string; l: string }[]
                ).map(({ v, l }, i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.7 + i * 0.07 }}
                  >
                    <p
                      className="font-black leading-none tracking-[-0.05em] text-white"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(1.6rem,2.4vw,2.6rem)",
                      }}
                    >
                      {v}
                    </p>
                    <p
                      className="mt-1 text-[9px] font-medium uppercase tracking-[0.38em] text-white/28"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {l}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT ZONE — Video player + editorial copy
              ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.22, ease: EASE }}
            className="flex flex-col justify-center gap-[clamp(1.5rem,2.5vw,2.5rem)]
                       px-[clamp(1.5rem,4vw,5rem)] py-[clamp(3rem,5vw,5rem)]
                       lg:border-l lg:border-white/[0.045]"
          >
            {/* Showreel label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-gradient-to-r from-[#d4af37]/55 to-transparent" />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.46em] text-white/32"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Showreel
              </span>
            </div>

            {/* Video player */}
            <ReelPlayerCard />

            {/* Skill tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "Short-form Reels",
                "Cinematic Cuts",
                "Color Grading",
                "Sound Design",
                "Hook Strategy",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#d4af37]/18 bg-[#d4af37]/[0.04]
                             px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em]
                             text-white/36 transition-colors duration-200
                             hover:border-[#d4af37]/38 hover:text-[#d4af37]/68 cursor-default"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.82, ease: EASE_SOFT }}
              className="space-y-3 border-t border-white/[0.055] pt-5"
            >
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.44em] text-white/26"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Editorial
              </div>
              <h3
                className="leading-[1.1] tracking-[-0.035em] text-white"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.35rem,2.1vw,2.2rem)",
                }}
              >
                Crafting <span className="gold-gradient-text">motion</span> and{" "}
                <span className="gold-gradient-text">storytelling</span> that
                keeps viewers watching.
              </h3>
              <p className="text-[clamp(0.8rem,0.95vw,0.9rem)] leading-7 text-white/38 max-w-[28rem]">
                Every project is part of a growing creative direction centred on
                cleaner storytelling, cinematic visuals, and memorable creator
                branding.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Workflow strip ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1700px] px-[clamp(1.25rem,4.5vw,5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.9, ease: EASE_SOFT }}
          className="mt-[clamp(2.5rem,4vw,4.5rem)] border-t border-white/[0.05]
                     pb-[clamp(3.5rem,6vw,6.5rem)] pt-[clamp(2rem,3.5vw,3.5rem)]"
        >
          <WorkflowStrip />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SIGNATURE SVG — inline handwritten path
   ═══════════════════════════════════════════════════════════════════════════════ */
function SignatureSVG() {
  return (
    <svg
      viewBox="0 0 160 48"
      width="140"
      height="42"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Robin D signature"
    >
      <defs>
        <linearGradient id="sigGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f0c84a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b8962e" stopOpacity="0.85" />
        </linearGradient>
        <filter id="sigGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* "Robin" — calligraphic strokes */}
      <path
        d="M8,36 C9,20 12,10 16,10 C18,10 19,14 17,20 C15,26 14,30 16,32 C18,34 22,28 26,22"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sigGlow)"
      />
      <path
        d="M26,22 C28,18 30,16 30,20 C30,24 28,30 30,32"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        filter="url(#sigGlow)"
      />
      <path
        d="M30,32 C32,26 36,16 40,16 C42,16 42,22 40,28 C38,34 38,36 40,36"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        filter="url(#sigGlow)"
      />
      <path
        d="M44,14 C46,20 46,28 44,36"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        filter="url(#sigGlow)"
      />
      <path
        d="M44,14 L46,14"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* dot on i */}
      <circle cx="45" cy="11" r="1.4" fill="#d4af37" opacity="0.85" />
      <path
        d="M48,28 C50,22 54,16 58,18 C62,20 60,28 56,32 C54,34 52,36 54,36 C56,36 60,32 64,28"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        filter="url(#sigGlow)"
      />

      {/* space then "D" — bolder, wider */}
      <path
        d="M74,10 L74,36"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        filter="url(#sigGlow)"
      />
      <path
        d="M74,10 C88,10 96,16 96,23 C96,30 88,36 74,36"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sigGlow)"
      />

      {/* underline flourish */}
      <path
        d="M6,42 C30,40 70,40 100,42 C104,42.5 106,41 108,40"
        fill="none"
        stroke="url(#sigGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   REEL PLAYER CARD — vertical phone-frame style
   ═══════════════════════════════════════════════════════════════════════════════ */
function ReelPlayerCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.muted = muted;
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onLoaded = () => setLoaded(true);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    v.addEventListener("loadeddata", onLoaded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07]
                 bg-[#080806]"
      style={{
        boxShadow:
          "0 48px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.04), 0 0 60px rgba(212,140,20,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ambient top glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.07),transparent_48%)]" />

      {/* ── Header chrome ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-[5px]">
            {(["#ff5f57", "#febc2e", "#28c840"] as string[]).map((c) => (
              <span
                key={c}
                className="h-[8px] w-[8px] rounded-full"
                style={{ background: c, opacity: 0.78 }}
              />
            ))}
          </div>
          <div className="mx-1.5 h-3 w-px bg-white/10" />
          <span
            className="text-[10px] font-medium uppercase tracking-[0.36em] text-white/30"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Robin D — Reel 2025
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-[5px] w-[5px] rounded-full bg-[#d4af37]"
            animate={
              playing
                ? { opacity: [1, 0.3, 1], scale: [1, 0.75, 1] }
                : { opacity: 0.3 }
            }
            transition={{ duration: 0.9, repeat: Infinity }}
            style={{
              boxShadow: playing ? "0 0 7px rgba(212,175,55,0.9)" : "none",
            }}
          />
          <span
            className="font-mono text-[10px] text-[#d4af37]/60"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {playing ? "● LIVE" : "◌ PAUSED"}
          </span>
        </div>
      </div>

      {/* ── Video ─────────────────────────────────────────────────────────── */}
      <div
        className="relative cursor-pointer overflow-hidden"
        style={{ aspectRatio: "16/9" }}
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src={REEL_URL}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* loader */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d0b07] to-[#060505]">
            <motion.div
              className="h-7 w-7 rounded-full border-2 border-[#d4af37]/22 border-t-[#d4af37]/78"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* dark overlay when paused */}
        <div
          className="absolute inset-0 bg-black/35 transition-opacity duration-300"
          style={{ opacity: playing ? 0 : 1 }}
        />

        {/* scanlines */}
        <div className="scanlines pointer-events-none absolute inset-0 opacity-22" />

        {/* play / pause button */}
        <AnimatePresence>
          {(!playing || hovered) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.78 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="relative flex h-14 w-14 items-center justify-center rounded-full
                           border border-[#d4af37]/42 bg-black/52 backdrop-blur-sm"
                style={{ boxShadow: "0 0 36px rgba(212,175,55,0.2)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                {!playing && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#d4af37]/22"
                    animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                {playing ? (
                  <div className="flex gap-[3px]">
                    <div className="h-[18px] w-[3px] rounded-full bg-[#d4af37]" />
                    <div className="h-[18px] w-[3px] rounded-full bg-[#d4af37]" />
                  </div>
                ) : (
                  <div
                    className="ml-[2px]"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "9px solid transparent",
                      borderBottom: "9px solid transparent",
                      borderLeft: "16px solid #d4af37",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* corner badge */}
        <div className="absolute right-3 top-3 rounded-full border border-[#d4af37]/18 bg-black/52 px-2.5 py-1 backdrop-blur-xl">
          <span
            className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-[#d4af37]/70"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Showreel · 2025
          </span>
        </div>

        {!playing && loaded && (
          <div className="absolute bottom-3 left-4">
            <p
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/34"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Click to watch
            </p>
          </div>
        )}
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-3 space-y-2.5">
        {/* progress bar */}
        <div
          className="relative h-[3px] w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
          onClick={seek}
        >
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0c84a]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* bottom chrome row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]/60
                         hover:text-[#d4af37] transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {playing ? "PAUSE" : "PLAY"}
            </button>
            <button
              onClick={toggleMute}
              className="text-[10px] uppercase tracking-[0.28em] text-white/25
                         hover:text-white/55 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {muted ? "UNMUTE" : "MUTE"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-[9px] uppercase tracking-[0.28em] text-white/22"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              CUT
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.28em] text-[#d4af37]/45"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              COLOR
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.28em] text-white/22"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              FX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   WORKFLOW STRIP
   ═══════════════════════════════════════════════════════════════════════════════ */
function WorkflowStrip() {
  const steps = [
    { n: "01", title: "Hook", desc: "Grabbing attention in the first second." },
    {
      n: "02",
      title: "Pacing",
      desc: "Keeping the energy smooth and engaging.",
    },
    { n: "03", title: "Motion", desc: "Adding movement with purpose." },
    {
      n: "04",
      title: "Sound",
      desc: "Elevating the edit with the right vibe.",
    },
    { n: "05", title: "Export", desc: "Polished content, ready to perform." },
  ];

  return (
    <div>
      <p
        className="mb-5 text-[10px] font-semibold uppercase tracking-[0.46em] text-white/22"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Workflow
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        {steps.map(({ n, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="group"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full
                           border border-[#d4af37]/22 bg-[#d4af37]/[0.04] text-[9px]
                           text-[#d4af37]/55 transition-colors duration-200
                           group-hover:border-[#d4af37]/45 group-hover:bg-[#d4af37]/[0.08]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {n}
              </div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45
                           group-hover:text-white/65 transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {title}
              </p>
            </div>
            <p className="text-[12px] leading-[1.6] text-white/28 group-hover:text-white/42 transition-colors duration-200">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION ATMOSPHERE HELPER (re-exported for use in PortfolioSectionsClean)
   ═══════════════════════════════════════════════════════════════════════════════ */
export function SectionAtmosphere({ tone }: { tone?: "warm" | "neutral" }) {
  const color =
    tone === "warm"
      ? "radial-gradient(ellipse at 30% 60%, rgba(212,140,20,0.07) 0%, transparent 58%)"
      : "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 58%)";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}
