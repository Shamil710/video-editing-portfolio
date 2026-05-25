import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = ["Home", "About", "Works", "Pricing", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = links.map((link) => link.toLowerCase());
      const current = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6"
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3.5 backdrop-blur-2xl [transform:translateZ(0)] transition duration-500 sm:px-5 ${scrolled ? "border-bullion/24 bg-black/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_55px_rgba(0,0,0,0.42),0_0_24px_rgba(212,175,55,0.08)] scale-[0.985]" : "border-bullion/16 bg-black/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_42px_rgba(0,0,0,0.32),0_0_18px_rgba(212,175,55,0.04)]"}`}
      >
        <a href="#" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-bullion/35 bg-bullion/10 text-sm font-semibold text-champagne">
            RD
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.26em] text-white">
              Robin D
            </span>
            <span className="mt-1 block text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/45">
              Content Creator Editor
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-[color,background-color,transform,box-shadow] duration-300 after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-center after:transition-transform after:duration-300 hover:-translate-y-px hover:bg-white/[0.055] hover:text-champagne hover:shadow-[0_0_14px_rgba(212,175,55,0.12)] hover:after:scale-x-100 ${activeSection === link.toLowerCase() ? "text-champagne after:scale-x-100 after:bg-gradient-to-r after:from-transparent after:via-champagne/80 after:to-transparent" : "text-white/68 after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-champagne/80 after:to-transparent"}`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-bullion/25 bg-gradient-to-r from-bullion to-champagne px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_34px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(212,175,55,0.3)]"
          >
            Let's Talk
            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-bullion/20 bg-black/92 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_55px_rgba(0,0,0,0.42)] md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/72 hover:bg-white/[0.06] hover:text-champagne"
                >
                  {link}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bullion to-champagne px-5 py-3 text-sm font-semibold text-black"
            >
              Let's Talk <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
