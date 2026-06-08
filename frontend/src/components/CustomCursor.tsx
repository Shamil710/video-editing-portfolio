import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const PALETTE = ["#d4af37", "#f4d03f", "#ffe08a"];

function StarSVG({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8L10 0Z"
        fill={color}
      />
    </svg>
  );
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  born: number;
  lifetime: number;
  vx: number;
  vy: number;
}

export function CustomCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const idRef = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });
  const lastTime = useRef(0);
  const spawnTimer = useRef(0);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const springX = useSpring(dotX, { stiffness: 400, damping: 30, mass: 0.3 });
  const springY = useSpring(dotY, { stiffness: 400, damping: 30, mass: 0.3 });

  useEffect(() => {
    window.addEventListener("touchstart", () => setIsTouch(true), { once: true });
  }, []);

  const spawn = useCallback((mx: number, my: number, speed: number) => {
    const now = performance.now();
    const interval = Math.max(30, 250 - speed * 1.8);
    if (now - spawnTimer.current < interval) return;
    spawnTimer.current = now;

    setParticles((prev) => {
      if (prev.length >= 10) return prev;

      const isAccent = Math.random() < 0.2;
      const size = isAccent ? 16 + Math.random() * 4 : 6 + Math.random() * 8;

      const particle: Particle = {
        id: idRef.current++,
        x: mx + (Math.random() - 0.5) * 20,
        y: my + (Math.random() - 0.5) * 20,
        size,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        rotation: Math.random() * 360,
        born: now,
        lifetime: 800 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.4 - Math.random() * 0.6,
      };

      return [...prev.slice(-9), particle];
    });
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      const now = performance.now();

      dotX.set(mx);
      dotY.set(my);

      const dx = mx - lastPos.current.x;
      const dy = my - lastPos.current.y;
      const dt = now - lastTime.current;
      const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 16);

      lastPos.current = { x: mx, y: my };
      lastTime.current = now;

      if (speed > 0.05) spawn(mx, my, speed);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isTouch, dotX, dotY, spawn]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        const now = performance.now();
        return prev.filter((p) => now - p.born < p.lifetime);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Particles */}
      {particles.map((p) => {
        const age = performance.now() - p.born;
        const progress = age / p.lifetime;
        const fade = 1 - Math.pow(progress, 1.4);
        const scale = 1 - progress * 0.5;
        const driftX = p.vx * age;
        const driftY = p.vy * age;

        return (
          <motion.div
            key={p.id}
            className="pointer-events-none fixed z-[99]"
            style={{
              left: p.x + driftX,
              top: p.y + driftY,
              width: p.size,
              height: p.size,
              rotate: p.rotation + progress * 40,
              opacity: fade,
              scale,
              filter: "drop-shadow(0 0 4px rgba(212,175,55,0.5))",
              transform: "translate(-50%, -50%)",
            }}
          >
            <StarSVG color={p.color} />
          </motion.div>
        );
      })}

      {/* Glow halo behind cursor */}
      <motion.div
        className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      >
        <div
          className="rounded-full"
          style={{
            width: 60,
            height: 60,
            background:
              "radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(244,208,63,0.1) 30%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Core cursor */}
      <motion.div
        className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      >
        <div
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "#f4d03f",
            boxShadow:
              "0 0 12px rgba(212,175,55,0.8), 0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.15)",
          }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        html, body, a, button, [role="button"], input, textarea, select, video {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
