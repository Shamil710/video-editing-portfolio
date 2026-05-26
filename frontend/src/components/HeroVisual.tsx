import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import sequenceTen from "../videos/Sequence 01_10.mp4";
import sequenceEleven from "../videos/Sequence 01_11.mp4";

export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(stageRef, { amount: 0.45, once: false });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });
  const mainX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const mainY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const backgroundX = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const backgroundY = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) {
      return;
    }

    if (inView) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [inView]);

  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (!video) {
      return;
    }

    const freezeFrame = () => {
      try {
        video.currentTime = 0.14;
      } catch {
        // ignore seek failures on some browsers during early load
      }
      video.pause();
    };

    video.addEventListener("loadeddata", freezeFrame, { once: true });
    return () => video.removeEventListener("loadeddata", freezeFrame);
  }, []);

  return (
    <motion.div
      ref={stageRef}
      className="relative mx-auto h-auto w-full max-w-[760px] lg:mr-0 lg:translate-y-2"
      initial={{ opacity: 0, x: 34 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="absolute right-[4%] top-[10%] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(212,175,55,0.04)_36%,transparent_72%)] blur-3xl sm:block" />

      <div className="relative flex flex-col items-end gap-4 sm:gap-5">
        <motion.div
          className="absolute left-[8%] top-[11%] z-10 hidden w-[240px] sm:block"
          style={{ x: backgroundX, y: backgroundY, transformOrigin: "center" }}
          animate={{ y: [0, -8, 0], rotate: -12, opacity: [0.22, 0.34, 0.22] }}
          transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative overflow-hidden rounded-[1.9rem] border border-bullion/12 bg-black/70 shadow-[0_22px_68px_rgba(0,0,0,0.34)]">
            <video
              ref={backgroundVideoRef}
              src={sequenceEleven}
              className="h-[430px] w-full object-contain object-center opacity-80 blur-[1.8px]"
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.62))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.1),transparent_38%)]" />
            <div className="absolute left-4 top-4 rounded-full border border-bullion/16 bg-black/48 px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl">
              Background reel
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 ml-auto w-[min(100%,390px)] sm:w-[340px] md:w-[360px] lg:w-[380px]"
          style={{ x: mainX, y: mainY }}
          whileHover={{ y: -8, rotate: 1.2, scale: 1.02 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 9.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-4 rounded-[2.3rem] bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.18),transparent_44%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-bullion/28 bg-black shadow-[0_30px_110px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.12)]">
            <video
              ref={mainVideoRef}
              src={sequenceTen}
              className="aspect-[9/16] h-full w-full object-contain object-center"
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_62%,rgba(0,0,0,0.38))]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,transparent_18%,transparent_78%,rgba(212,175,55,0.09)_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.36)_0.8px,transparent_0.8px)] [background-size:12px_12px]" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-black/44 px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-champagne backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_10px_rgba(224,195,106,0.8)]" />
              Premium reel
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-full border border-bullion/16 bg-black/50 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.26em] text-white/42">
                    Now playing
                  </p>
                  <p className="mt-1 text-sm font-semibold tracking-[-0.03em] text-white">
                    Retention-focused edit system
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-bullion/16 bg-white/[0.04] text-champagne shadow-[0_0_22px_rgba(212,175,55,0.14)]">
                  <Play size={16} fill="currentColor" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 mt-5 w-[min(100%,560px)] pr-1 sm:mt-6 sm:pr-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CinematicTimeline />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CinematicTimeline() {
  const nodes = ["IDEA", "CUT", "SOUND", "MOTION", "FINAL"];

  return (
    <div className="relative w-full overflow-hidden py-2">
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-bullion/24 to-transparent"
        animate={{ opacity: [0.35, 0.85, 0.35], scaleX: [0.96, 1, 0.96] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto flex max-w-[560px] items-center justify-between gap-2 px-1">
        {nodes.map((node, index) => (
          <div
            key={node}
            className="relative flex flex-1 flex-col items-center"
          >
            <motion.span
              className="relative z-10 grid h-5 w-5 place-items-center rounded-full border border-bullion/18 bg-[#050505] text-[0.44rem] font-semibold text-champagne shadow-[0_0_16px_rgba(212,175,55,0.16)]"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(212,175,55,0)",
                  "0 0 16px rgba(212,175,55,0.28)",
                  "0 0 0 rgba(212,175,55,0)",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.16,
              }}
            />
            <span className="mt-2 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              {node}
            </span>
          </div>
        ))}

        <motion.div
          className="absolute left-[7%] top-1/2 h-px w-[86%] -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute inset-y-0 w-24 rounded-full bg-gradient-to-r from-transparent via-champagne/80 to-transparent blur-[1px]"
            animate={{ x: ["-30%", "120%"] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-[calc(50%-0.125rem)] h-1 w-1 rounded-full bg-champagne shadow-[0_0_18px_rgba(224,195,106,0.5)]"
          animate={{ x: ["-40%", "40%", "-40%"], opacity: [0, 1, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="mt-4 flex items-end gap-1.5 px-2 opacity-80"
        animate={{ opacity: [0.48, 0.8, 0.48] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.span
            key={index}
            className="w-full rounded-full bg-champagne/50"
            animate={{
              height: [4, 9 + ((index * 5) % 14), 4],
              opacity: [0.24, 0.72, 0.24],
            }}
            transition={{
              duration: 1.8,
              delay: index * 0.05,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="mt-3 flex items-center justify-between text-[0.46rem] font-semibold uppercase tracking-[0.28em] text-white/32"
        animate={{ opacity: [0.48, 0.84, 0.48] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>IDEA - CUT - SOUND - MOTION - FINAL</span>
        <span className="text-champagne/68">Cinematic timeline</span>
      </motion.div>
    </div>
  );
}
