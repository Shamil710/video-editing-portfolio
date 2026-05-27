import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   PRICING DATA
══════════════════════════════════════════════════════════════ */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tag: "For New Creators",
    price: "3,999",
    period: "/ project",
    color: "#9999FF",
    glow: "rgba(153,153,255,0.18)",
    popular: false,
    desc: "Perfect for individuals just starting their content journey on Instagram or YouTube Shorts.",
    deliverables: [
      "Up to 3 short-form reels (60s each)",
      "Basic color correction",
      "Subtitles & captions",
      "Background music sync",
      "1 round of revisions",
      "Delivery in 3–4 days",
    ],
    cta: "Get Started",
  },
  {
    id: "creator",
    name: "Creator",
    tag: "Most Popular",
    price: "8,499",
    period: "/ project",
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.22)",
    popular: true,
    desc: "For growing creators who want professional-grade edits that stand out in the feed.",
    deliverables: [
      "Up to 6 videos (Reels + YouTube)",
      "Advanced color grading & LUTs",
      "Motion graphics & transitions",
      "Sound design & audio mix",
      "Thumbnail design (2 options)",
      "2 rounds of revisions",
      "Delivery in 5–7 days",
    ],
    cta: "Book This Plan",
  },
  {
    id: "pro",
    name: "Pro Brand",
    tag: "For Agencies & Brands",
    price: "18,999",
    period: "/ month",
    color: "#31A8FF",
    glow: "rgba(49,168,255,0.18)",
    popular: false,
    desc: "Full-stack content production for brands, agencies, and serious content businesses.",
    deliverables: [
      "Unlimited short-form edits",
      "2 long-form YouTube videos",
      "Poster & thumbnail design",
      "Script writing & hooks",
      "Social media management",
      "Priority 24hr turnaround",
      "Dedicated WhatsApp support",
    ],
    cta: "Let's Talk",
  },
];

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS DATA
══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Shamil",
    handle: "@shamil_creates",
    role: "YouTube Creator",
    avatar: "SH",
    color: "#D4AF37",
    text: "Robin completely transformed my channel. The edits are cinematic, the pacing is spot on, and my watch time went up by 40% in just one month. He doesn't just cut videos — he tells stories.",
    rating: 5,
    type: "YouTube Long-Form",
  },
  {
    name: "Rakshan",
    handle: "@rakshan.studio",
    role: "Instagram Content Creator",
    avatar: "RK",
    color: "#9999FF",
    text: "Every reel he delivers feels like a mini-film. The color grading and transitions are just on another level. My followers literally DM me asking who edits my content now.",
    rating: 5,
    type: "Instagram Reels",
  },
  {
    name: "Renish",
    handle: "@renish_official",
    role: "Personal Branding Coach",
    avatar: "RN",
    color: "#31A8FF",
    text: "I hired Robin for my personal brand videos and it was the best investment I made. He understood my vision in just one call. The thumbnails alone doubled my click-through rate.",
    rating: 5,
    type: "Brand Videos + Thumbnails",
  },
  {
    name: "Rahul",
    handle: "@rahul.vlogs",
    role: "Travel Vlogger",
    avatar: "RA",
    color: "#E8B84B",
    text: "My travel vlogs needed that cinematic feel and Robin nailed it every single time. The sound design and transitions make my videos feel like they belong on Netflix. Seriously top-tier work.",
    rating: 5,
    type: "Cinematic Vlog Edits",
  },
  {
    name: "Priya Nair",
    handle: "@priya.nair.fit",
    role: "Fitness Influencer",
    avatar: "PN",
    color: "#00C4CC",
    text: "Fast, professional and always creative. Robin delivered 6 reels in 4 days and they all performed incredibly. My engagement shot up and brands started noticing. 100% recommend!",
    rating: 5,
    type: "Short-Form Reels",
  },
  {
    name: "Karan Mehta",
    handle: "@karanmehta.media",
    role: "Digital Marketing Agency",
    avatar: "KM",
    color: "#D4AF37",
    text: "We've worked with multiple editors before but Robin is in a different league. He understands brand tone, delivers on time, and the quality is consistent. He's our go-to editor now.",
    rating: 5,
    type: "Agency Partnership",
  },
  {
    name: "Divya Krishnan",
    handle: "@divyak.life",
    role: "Lifestyle Creator",
    avatar: "DK",
    color: "#9999FF",
    text: "Robin's scripts + edits combo is magical. He wrote my hooks, edited the reels, and they've been going viral consistently. He's not just an editor, he's a full content partner.",
    rating: 5,
    type: "Script + Edit Package",
  },
  {
    name: "Ascend Media Co.",
    handle: "@ascendmedia",
    role: "Content Production House",
    avatar: "AM",
    color: "#31A8FF",
    text: "Our agency has been collaborating with Robin for 6 months now. Reliable, creative, and always ahead of trends. He's the kind of talent you don't want to share with competitors.",
    rating: 5,
    type: "Agency Retainer",
  },
];

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#D4AF37">
          <path d="M6 1l1.35 2.73L10.5 4.27l-2.25 2.19.53 3.09L6 8.1l-2.78 1.45.53-3.09L1.5 4.27l3.15-.54z" />
        </svg>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold tracking-[0.28em] uppercase mb-3"
      style={{
        color: "rgba(212,175,55,0.65)",
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   PRICING CARD
══════════════════════════════════════════════════════════════ */
function PricingCard({
  plan,
  index,
}: {
  plan: (typeof PLANS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const whatsappMsg = encodeURIComponent(
    `Hi Robin! I'm interested in the ${plan.name} plan (₹${plan.price}). Can we discuss?`,
  );
  const whatsappUrl = `https://wa.me/919384504751?text=${whatsappMsg}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500"
      style={{
        background: plan.popular
          ? `linear-gradient(160deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.03) 100%)`
          : `linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        borderColor:
          hovered || plan.popular
            ? plan.color + "66"
            : "rgba(255,255,255,0.08)",
        boxShadow: hovered || plan.popular ? `0 0 50px ${plan.glow}` : "none",
        transform:
          plan.popular && !hovered
            ? "scale(1.03)"
            : hovered
              ? "scale(1.04)"
              : "scale(1)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg,transparent,${plan.color},transparent)`,
        }}
      />

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span
            className="px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg,#D4AF37,#f2dc8a)",
              color: "#050505",
              boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
            }}
          >
            ★ Most Popular
          </span>
        </div>
      )}

      <div className="p-7 lg:p-8 flex flex-col gap-5 flex-1">
        {/* Header */}
        <div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{
              color: plan.color,
              fontFamily: "'General Sans',sans-serif",
            }}
          >
            {plan.tag}
          </span>
          <h3
            className="text-2xl font-bold mt-1"
            style={{
              fontFamily: "'General Sans',sans-serif",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {plan.name}
          </h3>
          <p
            className="text-xs mt-1.5 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {plan.desc}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1">
          <span
            className="text-[10px] font-bold mt-1"
            style={{
              color: "rgba(255,255,255,0.5)",
              alignSelf: "flex-start",
              paddingTop: "6px",
            }}
          >
            ₹
          </span>
          <span
            className="text-5xl font-bold leading-none"
            style={{
              fontFamily: "'General Sans',sans-serif",
              background: `linear-gradient(135deg,${plan.color},${plan.color}88)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {plan.price}
          </span>
          <span
            className="text-xs mb-1.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {plan.period}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* Deliverables */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {plan.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                style={{ background: plan.color + "22", color: plan.color }}
              >
                ✓
              </span>
              <span
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300"
          style={
            plan.popular
              ? {
                  background:
                    "linear-gradient(135deg,#D4AF37 0%,#f2dc8a 50%,#c89e3a 100%)",
                  color: "#050505",
                  boxShadow: "0 0 28px rgba(212,175,55,0.35)",
                  fontFamily: "'General Sans',sans-serif",
                }
              : {
                  background: "transparent",
                  color: plan.color,
                  border: `1.5px solid ${plan.color}55`,
                  fontFamily: "'General Sans',sans-serif",
                }
          }
        >
          {plan.cta} →
        </a>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIAL CARD
══════════════════════════════════════════════════════════════ */
function TestimonialCard({
  t,
  index,
}: {
  t: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-400 cursor-default"
      style={{
        background: hovered
          ? "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.01) 100%)",
        borderColor: hovered ? t.color + "44" : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 40px ${t.color}18` : "none",
      }}
    >
      {/* Quote mark */}
      <span
        className="absolute top-4 right-5 text-5xl leading-none font-bold select-none"
        style={{
          color: t.color + "18",
          fontFamily: "'General Sans',sans-serif",
        }}
      >
        "
      </span>

      {/* Type badge */}
      <span
        className="self-start text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
        style={{
          borderColor: t.color + "44",
          color: t.color + "cc",
          background: t.color + "12",
        }}
      >
        {t.type}
      </span>

      {/* Text */}
      <p
        className="text-sm leading-relaxed relative z-10"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        "{t.text}"
      </p>

      <Stars />

      {/* Author */}
      <div
        className="flex items-center gap-3 mt-auto pt-2 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg,${t.color}44,${t.color}22)`,
            color: t.color,
            border: `1.5px solid ${t.color}55`,
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          {t.avatar}
        </div>
        <div>
          <p
            className="text-xs font-bold"
            style={{
              color: "rgba(255,255,255,0.88)",
              fontFamily: "'General Sans',sans-serif",
            }}
          >
            {t.name}
          </p>
          <p
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FLOATING ORBS (decorative)
══════════════════════════════════════════════════════════════ */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        {
          x: "10%",
          y: "20%",
          size: 300,
          color: "rgba(212,175,55,0.06)",
          dur: 18,
        },
        {
          x: "80%",
          y: "60%",
          size: 400,
          color: "rgba(153,153,255,0.05)",
          dur: 24,
        },
        {
          x: "50%",
          y: "85%",
          size: 250,
          color: "rgba(49,168,255,0.04)",
          dur: 20,
        },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            background: o.color,
            filter: "blur(60px)",
            transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT ITEM
══════════════════════════════════════════════════════════════ */
function ContactItem({
  icon,
  label,
  value,
  href,
  color,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-5 p-5 rounded-2xl border group transition-all duration-300 cursor-pointer"
      style={{
        background: hovered
          ? `linear-gradient(135deg,${color}12,${color}06)`
          : "rgba(255,255,255,0.02)",
        borderColor: hovered ? color + "55" : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 36px ${color}22` : "none",
        textDecoration: "none",
      }}
    >
      <motion.div
        animate={hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color + "18", border: `1.5px solid ${color}44` }}
      >
        <span style={{ color, fontSize: "20px" }}>{icon}</span>
      </motion.div>
      <div className="flex-1">
        <p
          className="text-[10px] tracking-widest uppercase font-bold mb-0.5"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          {label}
        </p>
        <p
          className="text-sm font-semibold"
          style={{
            color: "rgba(255,255,255,0.88)",
            fontFamily: "'General Sans',sans-serif",
          }}
        >
          {value}
        </p>
      </div>
      <motion.span
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.25 }}
        style={{ color: color + "88", fontSize: "18px" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export function PricingContactFooter() {
  const waMsg = encodeURIComponent(
    "Hi Robin! I saw your portfolio and I'd love to book a call to discuss my video editing needs. When are you available?",
  );
  const emailSubject = encodeURIComponent(
    "Collaboration Inquiry — Video Editing",
  );
  const emailBody = encodeURIComponent(
    "Hi Robin,\n\nI came across your portfolio and I'm really impressed with your work.\n\nI'd love to discuss a potential collaboration for:\n[Your project details here]\n\nLooking forward to hearing from you!\n\nBest regards,",
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          PRICING SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: "#050505" }}
      >
        <FloatingOrbs />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 3px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-6">
            <SectionLabel>Investment</SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'General Sans',sans-serif" }}
            >
              <span style={{ color: "rgba(255,255,255,0.92)" }}>Simple </span>
              <span className="gold-gradient-text">Pricing</span>
            </h2>
            <p
              className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Transparent pricing. No hidden costs. Every rupee you invest comes
              back as content that converts.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {[
              "100+ Projects Delivered",
              "48hr Turnaround",
              "2 Free Revisions",
              "Secure Payment",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span style={{ color: "#D4AF37", fontSize: "10px" }}>◆</span>
                <span
                  className="text-xs"
                  style={{
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "'General Sans',sans-serif",
                  }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Custom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10 text-xs"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Need something custom?{" "}
            <a
              href={`https://wa.me/919384504751?text=${encodeURIComponent("Hi Robin! I need a custom video editing package. Can we discuss?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              Message me on WhatsApp
            </a>{" "}
            for a tailored quote.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: "#000" }}
      >
        {/* Decorative diagonal line */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(212,175,55,1) 0px,rgba(212,175,55,1) 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Client Love</SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'General Sans',sans-serif" }}
            >
              <span className="gold-gradient-text">What Clients </span>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Say</span>
            </h2>
            <p
              className="mt-4 max-w-md mx-auto text-sm"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Real words from real creators. No scripts, no filters.
            </p>
          </div>

          {/* Rating summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mb-14 flex-wrap"
          >
            <div className="text-center">
              <p
                className="text-5xl font-bold"
                style={{
                  fontFamily: "'General Sans',sans-serif",
                  background: "linear-gradient(135deg,#D4AF37,#f2dc8a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                5.0
              </p>
              <Stars />
              <p
                className="text-[10px] mt-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Average Rating
              </p>
            </div>
            <div
              className="w-px h-16 hidden sm:block"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            {[
              { num: "100+", label: "Happy Clients" },
              { num: "500+", label: "Videos Delivered" },
              { num: "3yr", label: "In The Game" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'General Sans',sans-serif",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  {s.num}
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Testimonials masonry-ish grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: "#050505" }}
      >
        <FloatingOrbs />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'General Sans',sans-serif" }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Let's </span>
              <span className="gold-gradient-text">Create Together</span>
            </h2>
            <p
              className="mt-4 max-w-md mx-auto text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Got a vision? Let's turn it into content that moves people. Drop a
              message — I respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: contact cards */}
            <div className="flex flex-col gap-4">
              <ContactItem
                index={0}
                icon="📱"
                label="WhatsApp — Book a Call"
                value="+91 93845 04751"
                href={`https://wa.me/919384504751?text=${waMsg}`}
                color="#25D366"
              />
              <ContactItem
                index={1}
                icon="✉️"
                label="Email — Direct Mail"
                value="robind3032004@gmail.com"
                href={`mailto:robind3032004@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                color="#D4AF37"
              />
              <ContactItem
                index={2}
                icon="📸"
                label="Instagram"
                value="@theascendmedia.in"
                href="https://www.instagram.com/theascendmedia.in/"
                color="#E1306C"
              />

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{
                  borderColor: "rgba(0,200,100,0.2)",
                  background: "rgba(0,200,100,0.04)",
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "#00c864" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ background: "#00c864" }}
                  />
                </span>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Currently available for new projects
                </p>
              </motion.div>
            </div>

            {/* Right: big CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border p-8 flex flex-col gap-6"
              style={{
                borderColor: "rgba(212,175,55,0.25)",
                background:
                  "linear-gradient(160deg,rgba(212,175,55,0.08) 0%,rgba(212,175,55,0.02) 100%)",
              }}
            >
              {/* Gold shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)",
                }}
              />

              <div>
                <p
                  className="text-xs tracking-widest uppercase font-bold mb-2"
                  style={{
                    color: "rgba(212,175,55,0.6)",
                    fontFamily: "'General Sans',sans-serif",
                  }}
                >
                  Ready to Start?
                </p>
                <h3
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'General Sans',sans-serif",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  Book a Free Discovery Call
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  Tell me about your project, your goals, and your timeline.
                  We'll figure out the best plan together — no commitments, no
                  pressure.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  "Share your content goals",
                  "Get a custom editing plan",
                  "Kick off in 24 hours",
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{
                        background: "rgba(212,175,55,0.15)",
                        color: "#D4AF37",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/919384504751?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg,#D4AF37 0%,#f2dc8a 50%,#c89e3a 100%)",
                  color: "#050505",
                  fontFamily: "'General Sans',sans-serif",
                  boxShadow: "0 0 32px rgba(212,175,55,0.35)",
                  textDecoration: "none",
                }}
              >
                📲 Book a Call on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute right-8 top-24 pointer-events-none hidden lg:block">
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl opacity-10 select-none"
            >
              🎬
            </motion.div>
          </div>
          <div className="absolute left-4 bottom-24 pointer-events-none hidden lg:block">
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="text-5xl opacity-10 select-none"
            >
              ✂️
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer
        className="relative overflow-hidden"
        style={{
          background: "#000",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,0.35) 30%,rgba(212,175,55,0.35) 70%,transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-16 pb-8">
          {/* Main footer grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {/* Brand col */}
            <div className="flex flex-col gap-4">
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'General Sans',sans-serif",
                    background: "linear-gradient(135deg,#D4AF37,#f2dc8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Robin D
                </p>
                <p
                  className="text-xs tracking-widest uppercase mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'General Sans',sans-serif",
                  }}
                >
                  Content Creator Editor
                </p>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Crafting cinematic content that captures attention and drives
                results. Based in India, creating for the world.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-2">
                {[
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/theascendmedia.in/",
                    icon: "📸",
                  },
                  {
                    label: "WhatsApp",
                    href: `https://wa.me/919384504751?text=${waMsg}`,
                    icon: "💬",
                  },
                  {
                    label: "Email",
                    href: `mailto:robind3032004@gmail.com?subject=${emailSubject}&body=${emailBody}`,
                    icon: "✉️",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 text-sm"
                    title={s.label}
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(212,175,55,0.5)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(212,175,55,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation col */}
            <div>
              <p
                className="text-[10px] tracking-widest uppercase font-bold mb-5"
                style={{
                  color: "rgba(212,175,55,0.55)",
                  fontFamily: "'General Sans',sans-serif",
                }}
              >
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Works", href: "#works" },
                  { label: "Tools & Skills", href: "#tools" },
                  { label: "Services", href: "#services" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs transition-colors duration-200"
                      style={{
                        color: "rgba(255,255,255,0.38)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(212,175,55,0.8)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.38)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact col */}
            <div>
              <p
                className="text-[10px] tracking-widest uppercase font-bold mb-5"
                style={{
                  color: "rgba(212,175,55,0.55)",
                  fontFamily: "'General Sans',sans-serif",
                }}
              >
                Reach Out
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "WhatsApp",
                    value: "+91 93845 04751",
                    href: `https://wa.me/919384504751?text=${waMsg}`,
                  },
                  {
                    label: "Email",
                    value: "robind3032004@gmail.com",
                    href: `mailto:robind3032004@gmail.com?subject=${emailSubject}&body=${emailBody}`,
                  },
                  {
                    label: "Instagram",
                    value: "@theascendmedia.in",
                    href: "https://www.instagram.com/theascendmedia.in/",
                  },
                ].map((c) => (
                  <div key={c.label}>
                    <p
                      className="text-[9px] tracking-widest uppercase mb-0.5"
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "'General Sans',sans-serif",
                      }}
                    >
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs transition-colors duration-200"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(212,175,55,0.85)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.55)")
                      }
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              © {new Date().getFullYear()} Robin D. All rights reserved.
            </p>
            <p
              className="text-[11px] flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Crafted with{" "}
              <span style={{ color: "#D4AF37", fontSize: "10px" }}>♥</span> by{" "}
              <a
                href="https://wa.me/919791273893?text=Hi%20Shamil!%20I%20saw%20Robin's%20portfolio%20and%20loved%20the%20design.%20I%20wanted%20to%20reach%20out!"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-200 underline underline-offset-2"
                style={{
                  color: "rgba(212,175,55,0.65)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#f2dc8a";
                  (e.currentTarget as HTMLElement).style.textShadow =
                    "0 0 12px rgba(212,175,55,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(212,175,55,0.65)";
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
              >
                Shamil
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
