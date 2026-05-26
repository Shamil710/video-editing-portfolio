import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-start px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:items-start lg:pb-10 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:-translate-y-2 lg:grid-cols-[0.48fr_0.52fr] xl:gap-12">
        <motion.div
          className="relative max-w-[44rem] pt-1 lg:pt-0"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09, delayChildren: 0.08 }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 top-[-1.25rem] hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16)_0%,rgba(212,175,55,0.06)_24%,transparent_72%)] blur-[88px] lg:block"
            animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-[2.5rem] hidden h-24 w-24 rounded-full bg-champagne/4 blur-2xl lg:block"
            animate={{ opacity: [0.12, 0.24, 0.12], y: [0, -6, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[14rem] top-[6.5rem] hidden h-1.5 w-1.5 rounded-full bg-champagne/40 shadow-[0_0_12px_rgba(224,195,106,0.7)] lg:block"
            animate={{ opacity: [0.22, 0.78, 0.22], y: [0, -10, 0] }}
            transition={{
              duration: 6.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/[0.04] px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-champagne shadow-[0_0_18px_rgba(212,175,55,0.06)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_10px_rgba(224,195,106,0.7)]" />
            Premium Video Editor
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[13.5ch] font-display text-[clamp(3.35rem,5.3vw,6.3rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-white"
          >
            <span className="block text-white/96">Luxury motion</span>
            <span className="block text-white/92">storytelling built</span>
            <span className="block text-white/92">
              for <span className="text-champagne">retention</span>.
            </span>
            <motion.span
              className="mt-3 block h-1 w-24 rounded-full bg-[linear-gradient(90deg,transparent,rgba(224,195,106,0.82),transparent)]"
              animate={{ opacity: [0.4, 0.85, 0.4], scaleX: [0.88, 1, 0.88] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[31rem] text-[0.98rem] leading-8 text-white/72 sm:text-[1.02rem]"
          >
            Cinematic edits built for retention, visual rhythm, and premium
            short-form storytelling for creators and brands.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#works"
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-bullion via-[#f2dc8a] to-champagne px-6 py-4 text-sm font-semibold text-black shadow-[0_14px_34px_rgba(212,175,55,0.12)] transition duration-300 hover:translate-y-[-3px] hover:shadow-[0_22px_56px_rgba(212,175,55,0.24)]"
            >
              <motion.span
                className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 blur-[2px] group-hover:opacity-100"
                animate={{ x: ["0%", "260%"] }}
                transition={{
                  duration: 1.15,
                  repeat: Infinity,
                  repeatDelay: 2.6,
                  ease: "easeInOut",
                }}
              />
              <Play size={17} fill="currentColor" />
              View Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-bullion/22 bg-black/26 px-6 py-4 text-sm font-semibold text-champagne shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-champagne/48 hover:bg-bullion/[0.08] hover:shadow-[0_18px_42px_rgba(212,175,55,0.12)]"
            >
              <motion.span
                className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 bg-gradient-to-r from-transparent via-champagne/22 to-transparent opacity-0 blur-[2px] group-hover:opacity-100"
                animate={{ x: ["0%", "260%"] }}
                transition={{
                  duration: 1.25,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
              Contact Me
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
