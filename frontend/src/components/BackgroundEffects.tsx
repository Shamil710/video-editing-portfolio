import { motion } from "framer-motion";

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 19) % 84)}%`,
  top: `${12 + ((index * 23) % 72)}%`,
  delay: (index % 6) * 0.45,
  size: 2 + (index % 3),
}));

export function BackgroundEffects() {
  return (
    <div className="background-effects-root pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(212,175,55,0.08),transparent_24%),radial-gradient(circle_at_74%_28%,rgba(212,175,55,0.09),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(224,195,106,0.05),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.028),transparent_25%),radial-gradient(circle_at_50%_65%,rgba(212,175,55,0.02),transparent_34%)]" />
      <motion.div
        className="absolute left-[14%] top-[18%] h-[20rem] w-[2px] bg-gradient-to-b from-transparent via-bullion/18 to-transparent blur-[1px]"
        animate={{ opacity: [0.1, 0.28, 0.1], y: [0, 8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-14%] top-[12%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14)_0%,rgba(212,175,55,0.04)_34%,transparent_70%)] blur-3xl"
        animate={{ opacity: [0.26, 0.5, 0.26], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 10.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[-6%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(212,175,55,0.02)_34%,transparent_72%)] blur-3xl"
        animate={{ opacity: [0.14, 0.3, 0.14], x: [0, -14, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.22),transparent_22%,transparent_64%,rgba(5,5,5,0.96))]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:140px_140px]" />
      <div className="absolute inset-0 opacity-[0.045] mix-blend-soft-light [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22256%22_height=%22256%22_filter=%22url(%23n%22%29_opacity=%220.55%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.94),inset_0_0_160px_rgba(212,175,55,0.035)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-champagne/45"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            transform: "translateZ(0)",
          }}
          animate={{ y: [-8, 10, -8], opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: 5.8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
