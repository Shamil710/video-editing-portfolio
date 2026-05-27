import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const TOOLS = [
  {
    name: "Premiere Pro",
    color: "#9999FF",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="48" height="48" rx="8" fill="#9999FF" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'General Sans',sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="#1a0030"
        >
          Pr
        </text>
      </svg>
    ),
    label: "Timeline Craft",
    highlight: true,
  },
  {
    name: "After Effects",
    color: "#9999FF",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="48" height="48" rx="8" fill="#00005B" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'General Sans',sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="#9999FF"
        >
          Ae
        </text>
      </svg>
    ),
    label: "Motion Magic",
    highlight: true,
  },
  {
    name: "Photoshop",
    color: "#31A8FF",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="48" height="48" rx="8" fill="#001E36" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'General Sans',sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="#31A8FF"
        >
          Ps
        </text>
      </svg>
    ),
    label: "Visual Craft",
    highlight: true,
  },
  {
    name: "DaVinci Resolve",
    color: "#E8B84B",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="48" height="48" rx="8" fill="#1a1a1a" />
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#E8B84B"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="24" cy="24" r="4" fill="#E8B84B" />
      </svg>
    ),
    label: "Color Science",
    highlight: false,
  },
  {
    name: "Canva",
    color: "#00C4CC",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="48" height="48" rx="8" fill="#7D2AE8" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="serif"
          fontWeight="700"
          fontSize="22"
          fill="white"
        >
          C
        </text>
      </svg>
    ),
    label: "Brand Design",
    highlight: false,
  },
];

const MARQUEE_SKILLS = [
  "Motion Edit",
  "Color Grade",
  "Cinematic Cut",
  "Sound Design",
  "Visual Effects",
  "Reel Cut",
  "Story Arc",
  "Transition Flow",
  "LUT Design",
  "Multi-Cam Edit",
  "Pacing & Rhythm",
  "Title Sequence",
  "Frame Craft",
  "Audio Mix",
  "Keyframe Anim",
  "Motion Track",
];

const MARQUEE_SKILLS_2 = [
  "Viral Reels",
  "Short Form",
  "Podcast Edit",
  "Event Coverage",
  "Brand Film",
  "Documentary",
  "Testimonial",
  "Color Story",
  "Matte Paint",
  "VFX Comp",
  "Thumbnail Art",
  "Trailer Cut",
  "Promo Video",
  "Wedding Film",
  "Explainer Vid",
  "Social Ads",
];

const SERVICES = [
  {
    id: "01",
    title: "Short-Form Videos",
    subtitle: "Reels · Shorts · TikToks",
    desc: "Hook-first storytelling engineered for retention. Every frame, cut, and sound cue is precision-placed to stop the scroll and drive action.",
    tags: ["Reels", "Shorts", "Viral Strategy"],
    icon: "⚡",
    accent: "#D4AF37",
  },
  {
    id: "02",
    title: "Long-Form Editing",
    subtitle: "YouTube · Docs · Films",
    desc: "Deep narrative architecture. Pacing, chapters, and cinematic transitions that hold audiences for 10+ minutes without losing momentum.",
    tags: ["YouTube", "Documentary", "Brand Film"],
    icon: "🎬",
    accent: "#9999FF",
  },
  {
    id: "03",
    title: "Poster & Thumbnail Design",
    subtitle: "Covers · Banners · Key Art",
    desc: "Scroll-stopping visuals designed with editorial hierarchy. Each composition is built to convert — from first glance to click.",
    tags: ["Thumbnails", "Posters", "Key Art"],
    icon: "🖼",
    accent: "#31A8FF",
  },
  {
    id: "04",
    title: "Script Writing",
    subtitle: "Hook · Body · CTA",
    desc: "Words built for cameras. Punchy scripts with pattern interrupts, emotional beats, and a call-to-action that lands every time.",
    tags: ["Hooks", "Voiceover", "Storytelling"],
    icon: "✍️",
    accent: "#E8B84B",
  },
  {
    id: "05",
    title: "Social Media Management",
    subtitle: "Strategy · Content · Growth",
    desc: "End-to-end content calendars, captions, hashtag strategy, and analytics review. Consistent presence that compounds over time.",
    tags: ["Instagram", "YouTube", "Analytics"],
    icon: "📡",
    accent: "#00C4CC",
  },
  {
    id: "06",
    title: "Editor's Workflow",
    subtitle: "Brief → Cut → Deliver",
    desc: "A clean 4-step process: creative brief, rough assembly, revision rounds, and final export — all within turnaround that keeps clients moving.",
    tags: ["Fast Turnaround", "Revisions", "Delivery"],
    icon: "🔄",
    accent: "#D4AF37",
    isProcess: true,
  },
];

const PROCESS_STEPS = [
  { step: "01", label: "Brief", desc: "Creative intake & vision alignment" },
  { step: "02", label: "Assembly", desc: "Raw cut & structure locked" },
  { step: "03", label: "Refine", desc: "Color, sound, motion polish" },
  { step: "04", label: "Deliver", desc: "Export & platform-ready files" },
];

/* ══════════════════════════════════════════════════════════════
   MARQUEE STRIP
══════════════════════════════════════════════════════════════ */
function MarqueeStrip({
  items,
  speed = 40,
  reverse = false,
  gold = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  gold?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const doubled = [...items, ...items, ...items];

  useAnimationFrame((_, delta) => {
    if (!trackRef.current) return;
    const dir = reverse ? 1 : -1;
    x.current += dir * (speed / 1000) * delta;
    const totalW = trackRef.current.scrollWidth / 3;
    if (!reverse && x.current <= -totalW) x.current += totalW;
    if (reverse && x.current >= 0) x.current -= totalW;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="overflow-hidden relative w-full">
      <div
        ref={trackRef}
        className="flex items-center gap-0 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 py-0 select-none"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{
                color: gold
                  ? i % 5 === 0
                    ? "#fff1bf"
                    : "rgba(212,175,55,0.55)"
                  : i % 5 === 0
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.28)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: gold ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.14)",
                fontSize: "8px",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TOOL CARD
══════════════════════════════════════════════════════════════ */
function ToolCard({ tool, index }: { tool: (typeof TOOLS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 cursor-default"
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 42px 10px ${tool.color}44`,
          borderRadius: "20px",
        }}
      />

      {/* Icon box */}
      <motion.div
        animate={hovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{
          width: tool.highlight ? 80 : 64,
          height: tool.highlight ? 80 : 64,
        }}
      >
        {tool.icon}
        {tool.highlight && (
          <span
            className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg,#D4AF37,#f2dc8a)",
              color: "#050505",
            }}
          >
            PRO
          </span>
        )}
      </motion.div>

      <div className="text-center">
        <p
          className="text-xs font-semibold tracking-wider uppercase"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          {tool.name}
        </p>
        <p
          className="text-[10px] tracking-widest mt-0.5"
          style={{ color: tool.color + "bb" }}
        >
          {tool.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════════════════════ */
function ServiceCard({
  svc,
  index,
}: {
  svc: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group overflow-hidden rounded-2xl border transition-colors duration-300"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: hovered ? svc.accent + "55" : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Accent corner bar */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 w-0 rounded-full"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `linear-gradient(90deg,${svc.accent},transparent)`,
        }}
      />

      {/* Background glow */}
      <motion.div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: svc.accent, filter: "blur(40px)" }}
      />

      <div className="relative z-10 p-6 lg:p-7 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{
                color: svc.accent,
                fontFamily: "'General Sans',sans-serif",
              }}
            >
              {svc.id}
            </span>
            <h3
              className="text-lg font-bold mt-1 leading-tight"
              style={{
                fontFamily: "'General Sans',sans-serif",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {svc.title}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {svc.subtitle}
            </p>
          </div>
          <motion.span
            className="text-2xl flex-shrink-0 mt-1"
            animate={
              hovered ? { scale: 1.15, rotate: 6 } : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            {svc.icon}
          </motion.span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.52)" }}
        >
          {svc.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {svc.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
              style={{
                borderColor: svc.accent + "44",
                color: svc.accent + "cc",
                background: svc.accent + "12",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROCESS FLOW
══════════════════════════════════════════════════════════════ */
function ProcessFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 mb-2"
    >
      <div className="text-center mb-10">
        <span
          className="text-xs font-bold tracking-[0.25em] uppercase"
          style={{
            color: "rgba(212,175,55,0.6)",
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          The Editor's Flow
        </span>
        <h3
          className="text-2xl lg:text-3xl font-bold mt-2"
          style={{
            fontFamily: "'General Sans',sans-serif",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          From Brief to Masterpiece
        </h3>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0">
        {/* Connecting line (desktop) */}
        <div
          className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,0.25) 20%,rgba(212,175,55,0.25) 80%,transparent)",
          }}
        />

        {PROCESS_STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex-1 flex flex-col items-center text-center gap-3 px-4 py-6"
          >
            {/* Step bubble */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 text-sm font-bold"
              style={{
                borderColor: "rgba(212,175,55,0.5)",
                background: "rgba(212,175,55,0.08)",
                color: "#D4AF37",
                fontFamily: "'General Sans',sans-serif",
                boxShadow: "0 0 24px rgba(212,175,55,0.18)",
              }}
            >
              {s.step}
            </div>
            <div>
              <p
                className="font-bold text-sm tracking-wider"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "'General Sans',sans-serif",
                }}
              >
                {s.label}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {s.desc}
              </p>
            </div>

            {/* Arrow (mobile) */}
            {i < PROCESS_STEPS.length - 1 && (
              <div
                className="lg:hidden text-xl"
                style={{ color: "rgba(212,175,55,0.35)" }}
              >
                ↓
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION HEADING
══════════════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold tracking-[0.28em] uppercase mb-3"
      style={{
        color: "rgba(212,175,55,0.65)",
        fontFamily: "'General Sans',sans-serif",
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export function ToolsAndServices() {
  return (
    <>
      {/* ── SECTION 1: TOOLS & SKILLS ─────────────────────────────── */}
      <section
        id="tools"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: "#050505" }}
      >
        {/* BG decorative elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(153,153,255,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Scan-line texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.5) 2px,rgba(255,255,255,0.5) 3px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-16">
            <SectionLabel>Arsenal</SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'General Sans',sans-serif" }}
            >
              <span className="gold-gradient-text">Tools</span>{" "}
              <span style={{ color: "rgba(255,255,255,0.9)" }}>& Skills</span>
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Industry-standard software meets obsessive craft. Every project is
              built inside the same tools the world's best editors trust.
            </p>
          </div>

          {/* Tool icons grid */}
          <div className="flex flex-wrap justify-center gap-10 lg:gap-16 mb-20">
            {TOOLS.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-20">
            {[
              { num: "5+", label: "Pro Tools" },
              { num: "1yr", label: "Experience" },
              { num: "50+", label: "Projects Done" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-2xl lg:text-3xl font-bold"
                  style={{
                    fontFamily: "'General Sans',sans-serif",
                    background: "linear-gradient(135deg,#D4AF37,#f2dc8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.num}
                </p>
                <p
                  className="text-[10px] tracking-widest uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Marquee row 1 — white skills */}
          <div className="border-t border-b border-white/[0.07] py-4">
            <MarqueeStrip items={MARQUEE_SKILLS} speed={38} />
          </div>

          {/* Marquee row 2 — gold skills, reverse */}
          <div className="border-b border-white/[0.07] py-4">
            <MarqueeStrip items={MARQUEE_SKILLS_2} speed={30} reverse gold />
          </div>

          {/* Proficiency bars */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                skill: "Video Editing & Assembly",
                level: 96,
                color: "#9999FF",
              },
              { skill: "Color Grading & LUTs", level: 90, color: "#E8B84B" },
              { skill: "Motion Graphics", level: 84, color: "#9999FF" },
              {
                skill: "Thumbnail & Poster Design",
                level: 88,
                color: "#31A8FF",
              },
              {
                skill: "Audio Mixing & Sound Design",
                level: 80,
                color: "#D4AF37",
              },
              {
                skill: "Social Media Content Strategy",
                level: 86,
                color: "#00C4CC",
              },
            ].map((b, i) => (
              <ProficiencyBar key={b.skill} {...b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SERVICES ───────────────────────────────────── */}
      <section
        id="services"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: "#000" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-16">
            <SectionLabel>What I Do</SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'General Sans',sans-serif" }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>My </span>
              <span className="gold-gradient-text">Services</span>
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              From a raw recording to a polished final cut — every service is
              designed to make your content work harder.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>

          {/* Process flow */}
          <ProcessFlow />
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROFICIENCY BAR
══════════════════════════════════════════════════════════════ */
function ProficiencyBar({
  skill,
  level,
  color,
  index,
}: {
  skill: string;
  level: number;
  color: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span
          className="text-xs font-medium"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          {skill}
        </span>
        <span className="text-xs font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1.1,
            delay: 0.1 + index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background: `linear-gradient(90deg,${color}88,${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
