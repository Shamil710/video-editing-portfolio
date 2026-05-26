import { motion } from "framer-motion";
import { RecentWorksSection } from "./RecentWorksSection";
import portrait from "../images/ChatGPT Image May 25, 2026, 11_32_07 PM.png";

export function PortfolioSectionsClean() {
  const pricingPlans = [
    {
      name: "Signature Cut",
      cadence: "Per project",
      price: "$240",
      note: "For one polished reel with cinematic pacing and premium delivery.",
      deliverables: ["1 vertical reel", "Color + sound polish", "2 revisions"],
      featured: false,
    },
    {
      name: "Studio Retainer",
      cadence: "Monthly",
      price: "$920",
      note: "Ongoing editing partnership for consistent creator output.",
      deliverables: [
        "6-8 reels / month",
        "Priority turnaround",
        "Creative direction",
      ],
      featured: true,
    },
    {
      name: "Campaign Story",
      cadence: "Per campaign",
      price: "$1.4k",
      note: "Narrative-focused motion package for launches and brand films.",
      deliverables: ["3 hero edits", "Hook strategy pass", "Delivery variants"],
      featured: false,
    },
  ] as const;

  return (
    <div className="w-full py-8 sm:py-10">
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

      <section
        id="works"
        className="relative overflow-hidden bg-[#050505] px-4 py-[clamp(4.5rem,7vw,7.5rem)] sm:px-8 lg:px-12"
      >
        <SectionAtmosphere tone="warm" />
        <div className="cinematic-grain-overlay" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <RecentWorksSection />
        </div>
      </section>

      <section
        id="showcase"
        className="relative overflow-hidden bg-[#050505] px-4 pb-[clamp(4.5rem,7vw,7rem)] pt-6 sm:px-8 lg:px-12"
      >
        <SectionAtmosphere tone="neutral" />
        <div
          className="cinematic-grain-overlay opacity-[0.07]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1450px] gap-8 lg:grid-cols-[0.65fr_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <p className="text-[0.54rem] font-semibold uppercase tracking-[0.36em] text-white/46">
              POST FLOW
            </p>
            <h3 className="max-w-[12ch] font-display text-[clamp(1.8rem,3vw,3.8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              Built like a luxury
              <br />
              <span className="gold-gradient-text">editing suite</span>.
            </h3>
            <p className="max-w-[30ch] text-sm leading-8 text-white/62 sm:text-[0.96rem]">
              Every reel moves through the same refined sequence so visuals,
              pacing, and tone stay cinematic from first hook to final export.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))] px-6 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:px-8 sm:py-9"
          >
            <div className="pointer-events-none absolute -left-10 top-[-5rem] h-56 w-56 rounded-full bg-bullion/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-6rem] right-[-2rem] h-56 w-56 rounded-full bg-champagne/8 blur-3xl" />
            <div className="relative grid gap-5 sm:grid-cols-3">
              {[
                [
                  "01",
                  "Story Outline",
                  "Intent-first framing and emotional arc.",
                ],
                [
                  "02",
                  "Motion Sculpt",
                  "Shot rhythm, transitions, and timing polish.",
                ],
                [
                  "03",
                  "Luxury Finish",
                  "Color, sound texture, and final delivery.",
                ],
              ].map(([index, title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/6 bg-black/30 p-5"
                >
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.34em] text-champagne/88">
                    {index}
                  </p>
                  <h4 className="mt-3 font-display text-[1.2rem] font-semibold tracking-[-0.03em] text-white">
                    {title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative overflow-hidden bg-[#050505] px-4 py-[clamp(5rem,7vw,7rem)] sm:px-8 lg:px-12"
      >
        <SectionAtmosphere tone="focused" />
        <div
          className="cinematic-grain-overlay opacity-[0.08]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5"
          >
            <div className="inline-flex items-center border-b border-bullion/35 pb-2 text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-champagne/92">
              pricing
            </div>
            <h2 className="max-w-[11ch] font-display text-[clamp(2.2rem,4vw,5rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-white">
              Studio pricing for premium storytelling.
            </h2>
            <p className="max-w-[54ch] text-sm leading-8 text-white/64 sm:text-base">
              Built for creators and brands that want consistent cinematic
              quality, faster delivery, and a stronger editorial signature.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-7 ${
                  plan.featured
                    ? "border border-bullion/38 bg-[linear-gradient(145deg,rgba(255,250,235,0.06),rgba(5,5,5,0.5))] shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
                    : "border border-white/6 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))]"
                }`}
              >
                {plan.featured ? (
                  <>
                    <div className="pointer-events-none absolute left-1/2 top-[8%] h-44 w-44 -translate-x-1/2 rounded-full bg-bullion/25 blur-3xl" />
                    <div className="absolute right-6 top-6 rounded-full border border-bullion/32 bg-bullion/12 px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.28em] text-champagne">
                      featured
                    </div>
                  </>
                ) : null}

                <div className="relative z-10">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.32em] text-white/42">
                    {plan.cadence}
                  </p>
                  <h3 className="mt-4 font-display text-[1.8rem] font-semibold tracking-[-0.05em] text-white sm:text-[2rem]">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-[2.3rem] font-semibold leading-none tracking-[-0.04em] text-champagne sm:text-[2.8rem]">
                    {plan.price}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {plan.note}
                  </p>

                  <div className="mt-6 space-y-2 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-white/56">
                    {plan.deliverables.map((deliverable) => (
                      <p key={deliverable}>{deliverable}</p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-[#050505] px-4 pb-[clamp(6rem,10vw,9rem)] pt-[clamp(5rem,8vw,7rem)] sm:px-8 lg:px-12"
      >
        <SectionAtmosphere tone="finale" />
        <div
          className="cinematic-grain-overlay opacity-[0.09]"
          aria-hidden="true"
        />
        <div className="cinematic-vignette-soft" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/7 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))] px-6 py-8 shadow-[0_36px_95px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-10 sm:py-11"
          >
            <div className="pointer-events-none absolute left-[10%] top-[-5rem] h-52 w-52 rounded-full bg-bullion/18 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-6rem] right-[8%] h-60 w-60 rounded-full bg-champagne/10 blur-3xl" />

            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center border-b border-bullion/35 pb-2 text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-champagne/95">
                contact
              </div>

              <h2 className="max-w-[12ch] font-display text-[clamp(2.5rem,5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
                Let&apos;s craft a
                <br />
                <span className="gold-gradient-text">cinematic final cut</span>.
              </h2>

              <p className="max-w-[58ch] text-sm leading-8 text-white/66 sm:text-base">
                Available for creator retainers, campaign launches, and premium
                short-form editing collaborations.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href="mailto:hello@robind.dev"
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-bullion via-[#f2dc8a] to-champagne px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_20px_46px_rgba(212,175,55,0.22)] transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_26px_62px_rgba(212,175,55,0.32)]"
                >
                  Start a project
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center rounded-full border border-bullion/28 bg-black/30 px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne transition duration-500 hover:border-champagne/55 hover:bg-bullion/12 hover:shadow-[0_18px_48px_rgba(212,175,55,0.18)]"
                >
                  Instagram
                </a>
              </div>

              <p className="pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/44">
                hello@robind.dev • accepting june bookings
              </p>
            </div>
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
