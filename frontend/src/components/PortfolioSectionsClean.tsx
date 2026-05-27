import { motion } from "framer-motion";
import { RecentWorksSection } from "./RecentWorksSection";
import portrait from "../images/ChatGPT Image May 25, 2026, 11_32_07 PM.png";

export function PortfolioSectionsClean() {
  return (
    <div className="w-full py-0">
      <section
        id="about"
        className="page-section about-cinematic-section relative w-screen overflow-hidden bg-[#050505]"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-screen"
        >
          <img
            src={portrait}
            alt="Robin D portrait"
            className="about-portrait-bg"
            draggable={false}
          />
          <div className="about-portrait-glow" aria-hidden="true" />
          <div className="about-overlay" aria-hidden="true" />
          <div className="about-grain" aria-hidden="true" />
          <div className="about-vignette" aria-hidden="true" />

          <motion.div
            aria-hidden="true"
            className="about-focus-bg"
            animate={{ opacity: [0.022, 0.034, 0.022] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            FOCUS
          </motion.div>

          <div className="about-particles" aria-hidden="true">
            <ParticleCluster />
          </div>

          <div className="about-content-container about-content-layer relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between gap-8 px-[clamp(1.5rem,4vw,5rem)] py-[clamp(1.5rem,3.5vw,3.25rem)] lg:py-[clamp(2rem,4vw,4rem)]">
            <div className="relative grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-[25rem] self-start lg:pt-[clamp(0.75rem,1.5vw,1.5rem)]"
              >
                <div className="inline-flex items-center border-b border-white/12 pb-2 text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-champagne/90">
                  ABOUT
                </div>

                <h2 className="mt-5 max-w-[6.8ch] font-display text-[clamp(3.1rem,4.8vw,6.6rem)] font-semibold leading-[0.8] tracking-[-0.1em] text-white">
                  Stories
                  <br />
                  designed
                  <br />
                  to hold
                  <br />
                  <span className="gold-gradient-text">attention.</span>
                </h2>

                <p className="mt-6 max-w-[23rem] text-[0.96rem] leading-8 text-white/66 sm:text-[1rem]">
                  Retention-focused editing, cinematic pacing, and visual
                  storytelling built for creators growing across YouTube and
                  Instagram.
                </p>

                <div className="mt-8">
                  <p className="font-signature text-[2.1rem] leading-none tracking-[0.01em] text-bullion/95 drop-shadow-[0_0_16px_rgba(212,175,55,0.24)]">
                    Robin D
                  </p>
                  <div className="mt-4 h-px w-[15rem] bg-gradient-to-r from-bullion/0 via-bullion/80 to-bullion/0" />
                  <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.44em] text-white/48">
                    EDITOR • CONTENT CREATOR
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-[27rem] self-start justify-self-end pt-[clamp(1rem,2.5vw,3rem)] lg:pt-[clamp(1.5rem,3vw,4rem)]"
              >
                <div className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-white/44">
                  EDITORIAL
                </div>

                <h3 className="mt-5 max-w-[13ch] font-display text-[clamp(2rem,3.5vw,4.3rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
                  Crafting <span className="gold-gradient-text">motion</span>
                  <br />
                  and <span className="gold-gradient-text">storytelling</span>
                  <br />
                  that keeps
                  <br />
                  viewers watching.
                </h3>

                <div className="mt-6 space-y-4 text-[0.92rem] leading-7 text-white/64 sm:text-[0.96rem]">
                  <p>
                    I focus on short-form editing built around pacing, emotional
                    timing, and stronger audience retention across YouTube and
                    Instagram.
                  </p>
                  <p>
                    Every project is part of a growing creative direction
                    centered on cleaner storytelling, cinematic visuals, and
                    memorable creator branding.
                  </p>
                </div>

                <div className="mt-7 border-l border-bullion/50 pl-4 text-[0.98rem] italic leading-8 text-white/78">
                  “Building visuals people instantly recognize.”
                </div>
              </motion.div>
            </div>

            <div className="relative border-t border-white/8 pt-8 lg:pt-10">
              <WorkflowStrip />
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="works"
        className="page-section relative w-screen overflow-hidden bg-[#050505] px-0 py-[clamp(0em,0vw,7rem)]"
      >
        <SectionAtmosphere tone="warm" />
        <div className="cinematic-grain-overlay" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full works-fullbleed-shell px-2 sm:px-4 lg:px-9 xl:px-0">
          <RecentWorksSection />
        </div>
      </section>
    </div>
  );
}

export default PortfolioSectionsClean;

function WorkflowStrip() {
  const steps = [
    ["01", "Hook", "Grabbing attention in the first second."],
    ["02", "Pacing", "Keeping the energy smooth and engaging."],
    ["03", "Motion", "Adding movement with purpose."],
    ["04", "Sound", "Elevating the edit with the right vibe."],
    ["05", "Export", "Delivering polished content ready to perform."],
  ] as const;

  return (
    <div className="relative h-[130px] w-full">
      {steps.map(([index, title, copy], itemIndex) => (
        <div
          key={title}
          className="absolute top-0 w-[18%]"
          style={{ left: `${itemIndex * 20}%` }}
        >
          {itemIndex > 0 ? (
            <div className="absolute left-[-18%] top-[18px] h-px w-[18%] bg-gradient-to-r from-transparent via-bullion/55 to-bullion/0" />
          ) : null}
          <motion.div
            className="absolute left-0 top-[15px] h-2 w-2 rounded-full bg-bullion/90 shadow-[0_0_8px_rgba(212,175,55,0.65)]"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: itemIndex * 0.18,
            }}
          />
          <div className="pl-5">
            <div className="text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-bullion/78">
              {index}
            </div>
            <div className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/76">
              {title}
            </div>
            <p className="mt-2 max-w-[16ch] text-[0.75rem] leading-6 text-white/42">
              {copy}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionAtmosphere({
  tone,
}: {
  tone: "warm" | "neutral" | "focused" | "finale";
}) {
  const toneClass =
    tone === "warm"
      ? "bg-[radial-gradient(circle_at_20%_14%,rgba(212,175,55,0.13),transparent_34%),radial-gradient(circle_at_80%_56%,rgba(212,175,55,0.08),transparent_36%)]"
      : tone === "focused"
        ? "bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_14%_84%,rgba(212,175,55,0.06),transparent_34%)]"
        : tone === "finale"
          ? "bg-[radial-gradient(circle_at_48%_20%,rgba(224,195,106,0.14),transparent_38%),radial-gradient(circle_at_86%_76%,rgba(212,175,55,0.08),transparent_34%)]"
          : "bg-[radial-gradient(circle_at_28%_28%,rgba(212,175,55,0.08),transparent_34%),radial-gradient(circle_at_74%_70%,rgba(224,195,106,0.06),transparent_36%)]";

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#060606_46%,#050505_100%)]" />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${toneClass} gold-ambient-drift`}
        animate={{ opacity: [0.78, 1, 0.78] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06),transparent_25%,transparent_68%,rgba(0,0,0,0.78))]" />
    </>
  );
}

function ParticleCluster() {
  const particles = [
    { left: "22%", top: "28%", size: 2.5, delay: 0 },
    { left: "30%", top: "40%", size: 1.8, delay: 0.7 },
    { left: "41%", top: "25%", size: 2.2, delay: 1.2 },
    { left: "57%", top: "33%", size: 1.6, delay: 1.8 },
    { left: "63%", top: "47%", size: 2.4, delay: 0.4 },
    { left: "71%", top: "30%", size: 1.9, delay: 1.1 },
    { left: "52%", top: "58%", size: 2.6, delay: 0.8 },
  ];

  return (
    <>
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-champagne/50"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            filter: "blur(0.2px)",
          }}
          animate={{ y: [-5, 8, -5], opacity: [0.1, 0.55, 0.1] }}
          transition={{
            duration: 6.5,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
