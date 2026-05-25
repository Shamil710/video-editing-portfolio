import { motion } from "framer-motion";
import { RecentWorksSection } from "./RecentWorksSection";
import portrait from "../images/ChatGPT Image May 25, 2026, 11_32_07 PM.png";

export function PortfolioSectionsClean() {
  return (
    <div className="w-full space-y-16 py-10 sm:space-y-20 sm:py-12">
      <section
        id="about"
        className="about-cinematic-section relative w-screen overflow-hidden bg-[#050505]"
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

          <div className="about-content-container about-content-layer relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between gap-10 px-[clamp(2rem,5vw,6rem)] py-[clamp(2rem,4.5vw,4rem)] lg:py-[clamp(2.5rem,5vw,4.5rem)]">
            <div className="relative grid flex-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-[25rem] self-start lg:pt-[clamp(1rem,2vw,2rem)]"
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
                    CONTENT CREATOR • EDITOR
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-[27rem] self-start justify-self-end pt-[clamp(1.5rem,4vw,4rem)] lg:pt-[clamp(2rem,5vw,5rem)]"
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

            <div className="relative border-t border-white/8 pt-5 lg:pt-6">
              <WorkflowStrip />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="works">
        <div className="relative z-20 rounded-2xl bg-white/[0.02] p-6 sm:p-10">
          <RecentWorksSection />
        </div>
      </section>

      <section id="pricing">
        <div className="relative z-20 rounded-2xl bg-white/[0.02] p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/[0.06] px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-champagne">
              pricing
            </div>
            <h2 className="font-display text-3xl font-semibold">Pricing</h2>
            <p className="text-white/70">
              Project-based and retainer options available.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="contact">
        <div className="relative z-20 rounded-2xl bg-white/[0.02] p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-bullion/22 bg-bullion/[0.06] px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-champagne">
              contact
            </div>
            <h2 className="font-display text-3xl font-semibold">Contact</h2>
            <p className="text-white/70">
              Email: hello@robind.dev — Available for new projects.
            </p>
          </motion.div>
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
            <div className="absolute left-[-18%] top-[18px] h-px w-[18%] bg-gradient-to-r from-transparent via-bullion/70 to-bullion/0" />
          ) : null}
          <motion.div
            className="absolute left-0 top-[15px] h-2 w-2 rounded-full bg-bullion shadow-[0_0_12px_rgba(212,175,55,0.9)]"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: itemIndex * 0.18,
            }}
          />
          <div className="pl-5">
            <div className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-bullion/90">
              {index}
            </div>
            <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/84">
              {title}
            </div>
            <p className="mt-2 max-w-[16ch] text-[0.76rem] leading-6 text-white/48">
              {copy}
            </p>
          </div>
        </div>
      ))}
    </div>
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
