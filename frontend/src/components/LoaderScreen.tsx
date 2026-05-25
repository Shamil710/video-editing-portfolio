import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoaderScreen() {
  const DURATION = 1800; // ms, within 1.5-2.5s requirement
  const EXIT_DELAY = 360; // ms for fade-out
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(1, elapsed / DURATION);
      // smooth ease-out
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        // trigger exit animation then dispatch completion
        setTimeout(() => setVisible(false), 40);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("loader:finished"));
        }, EXIT_DELAY + 60);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.section
      aria-label="Loading Robin D portfolio"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0, translateY: visible ? 0 : -6 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* soft ambient gold glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(212,175,55,0.06)_24%,transparent_72%)] opacity-80" />
        {/* subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.36)_70%)]" />
        {/* very subtle grain using tiny SVG pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='1' height='1' fill='rgba(255,255,255,0.02)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex w-full items-center justify-center px-6">
        <div className="max-w-[56rem] w-full text-center">
          <motion.p
            className="text-champagne/80 mb-4 text-[0.64rem] font-semibold uppercase tracking-[0.36em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
            transition={{ duration: 0.52, delay: 0.12 }}
          >
            ROBIN D — MOTION EDITOR
          </motion.p>

          <motion.h1
            className="font-display mx-auto max-w-[52ch] text-white text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-tight"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crafting motion that holds attention.
          </motion.h1>

          <motion.div
            className="mx-auto mt-8 flex w-full max-w-[18rem] flex-col items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
            transition={{ duration: 0.6, delay: 0.44 }}
          >
            {/* vertical reel frame */}
            <div className="relative w-[6.6rem] sm:w-[8.4rem] md:w-[9.6rem]">
              <motion.div
                className="mx-auto overflow-hidden rounded-[1.1rem] border border-bullion/18 bg-[#050505] shadow-[0_28px_80px_rgba(0,0,0,0.6)]"
                initial={{ opacity: 0, scale: 0.992 }}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 0.996,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="aspect-[9/16] w-full bg-gradient-to-b from-[#080808] via-[#0b0b0b] to-[#050505]">
                  {/* subtle poster vignette */}
                  <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_36%)]" />
                </div>
                {/* soft top caption */}
                <div className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-1 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-champagne/86 backdrop-blur-sm">
                  Premium reel
                </div>
              </motion.div>
            </div>

            {/* subtle progress stroke */}
            <div className="relative mt-2 w-full px-6">
              <div className="h-[2px] w-full rounded-full bg-white/6" />
              <motion.div
                className="absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-champagne to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ transformOrigin: "left" }}
                transition={{
                  duration: DURATION / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-6 text-sm text-white/50"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            <span className="text-champagne">{progress}%</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
