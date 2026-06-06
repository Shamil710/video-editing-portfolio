import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/* ── Film strip sprocket hole ─────────────────────────────────────── */
function SprocketHole({ index }: { index: number }) {
  return (
    <motion.div
      className="w-[9px] h-[13px] rounded-[3px] border border-white/10 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.55, 0] }}
      transition={{
        duration: 2.2,
        delay: index * 0.09,
        repeat: Infinity,
        repeatDelay: 0.4,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Scan-line wipe that sweeps across the frame ─────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.55) 30%, rgba(255,241,191,0.9) 50%, rgba(212,175,55,0.55) 70%, transparent 100%)",
        boxShadow: "0 0 14px 3px rgba(212,175,55,0.3)",
      }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.9, 1],
      }}
    />
  );
}

/* ── Frame counter digits (rolls upward like a real timecode) ────── */
function FrameCounter({ value }: { value: number }) {
  const digits = String(value).padStart(4, "0").split("");
  return (
    <div className="flex gap-[2px]">
      {digits.map((d, i) => (
        <motion.span
          key={`${i}-${d}`}
          className="inline-block font-mono text-[11px] font-medium text-champagne/70 tabular-nums"
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          {d}
        </motion.span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export function LoaderScreen() {
  const DURATION = 1900; // ms

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(0);

  const progressMV = useMotionValue(0);
  const barWidth = useTransform(progressMV, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - pct, 2.6);
      const rounded = Math.round(eased * 100);
      setProgress(rounded);
      progressMV.set(rounded);
      // frame counter: roughly 24fps * progress * 0.5s total
      setFrameCount(Math.round(eased * 48));

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 60);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("loader:finished"));
        }, 480);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sprockets = Array.from({ length: 9 });

  return (
    <motion.section
      aria-label="Loading Robin D portfolio"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── very subtle ambient glow ──────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 44% at 50% 50%, rgba(212,175,55,0.055) 0%, transparent 100%)",
        }}
      />

      {/* ── film strip left rail ───────────────────────────────────── */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center gap-[10px] border-r border-white/[0.04]">
        {sprockets.map((_, i) => (
          <SprocketHole key={i} index={i} />
        ))}
      </div>

      {/* ── film strip right rail ──────────────────────────────────── */}
      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center gap-[10px] border-l border-white/[0.04]">
        {sprockets.map((_, i) => (
          <SprocketHole key={i} index={i + 1} />
        ))}
      </div>

      {/* ── center stage ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-7 px-12 text-center">
        {/* role label */}
        <motion.p
          className="text-[0.62rem] font-semibold tracking-[0.38em] uppercase text-white/30"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Motion Editor
        </motion.p>

        {/* ── ROBIN D wordmark ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h1
            className="text-white leading-none select-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.4rem, 10vw, 6.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            ROBIN{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #8f6a1f 0%, #f2dc8a 28%, #fff1bf 50%, #c89e3a 74%, #6f4d12 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              D
            </span>
          </h1>
          {/* tight underline rule */}
          <motion.div
            className="mt-2 mx-auto h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 30%, rgba(255,241,191,0.8) 50%, rgba(212,175,55,0.5) 70%, transparent 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.44,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        {/* ── film frame viewport ─────────────────────────────────── */}
        <motion.div
          className="relative overflow-hidden rounded-[4px] border border-white/[0.07]"
          style={{ width: "clamp(220px, 34vw, 340px)", aspectRatio: "16/9" }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* dark frame bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0c0c0c 0%, #080808 50%, #0a0a0a 100%)",
            }}
          />

          {/* subtle scanlines texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px)",
              opacity: 0.5,
            }}
          />

          {/* animated scan line */}
          <ScanLine />

          {/* corner crosshairs */}
          {[
            "top-2 left-2",
            "top-2 right-2",
            "bottom-2 left-2",
            "bottom-2 right-2",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-[10px] h-[10px]`}
              style={{
                borderTop: pos.includes("top")
                  ? "1px solid rgba(212,175,55,0.5)"
                  : "none",
                borderBottom: pos.includes("bottom")
                  ? "1px solid rgba(212,175,55,0.5)"
                  : "none",
                borderLeft: pos.includes("left")
                  ? "1px solid rgba(212,175,55,0.5)"
                  : "none",
                borderRight: pos.includes("right")
                  ? "1px solid rgba(212,175,55,0.5)"
                  : "none",
              }}
            />
          ))}

          {/* timecode bar at bottom of frame */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-[3px]"
            style={{
              background: "rgba(0,0,0,0.55)",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              fontFamily: "'DM Sans', monospace",
            }}
          >
            <span className="text-[9px] tracking-widest text-white/25 uppercase">
              REC ●
            </span>
            <FrameCounter value={frameCount} />
            <span className="text-[9px] tracking-wider text-white/25">
              24fps
            </span>
          </div>
        </motion.div>

        {/* ── progress bar ────────────────────────────────────────── */}
        <motion.div
          className="w-full"
          style={{ maxWidth: "clamp(220px, 34vw, 340px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* track */}
          <div
            className="relative w-full h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {/* fill */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: barWidth,
                background:
                  "linear-gradient(90deg, rgba(143,106,31,0.8) 0%, rgba(242,220,138,1) 50%, rgba(255,241,191,1) 100%)",
                boxShadow: "0 0 8px rgba(212,175,55,0.45)",
              }}
            />
          </div>

          {/* percentage + label row */}
          <div className="mt-2.5 flex items-center justify-between">
            <span
              className="text-[10px] tracking-[0.22em] uppercase text-white/22"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Loading
            </span>
            <span
              className="text-[11px] font-medium tabular-nums"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "rgba(212,175,55,0.9)",
              }}
            >
              {progress}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── bottom film info strip ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 flex items-center justify-between px-3 py-2 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-[9px] tracking-[0.28em] uppercase text-white/18">
          Portfolio v2
        </span>
        <span className="text-[9px] tracking-[0.28em] uppercase text-white/18">
          Content Creator
        </span>
        <span className="text-[9px] tracking-[0.28em] uppercase text-white/18">
          © Robin D
        </span>
      </motion.div>
    </motion.section>
  );
}
