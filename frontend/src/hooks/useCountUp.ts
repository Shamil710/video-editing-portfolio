import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: string,
  { duration = 1800, startOnView = true }: { duration?: number; startOnView?: boolean } = {},
) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Parse numeric value and suffix from strings like "50+", "100%", "24h" */
  const num = parseInt(end.replace(/[^0-9.]/g, ""), 10);
  const suffix = end.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    if (isNaN(num)) {
      setDisplay(end);
      return;
    }

    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * num);

      setDisplay(`${value}${suffix}`);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, num, suffix, duration, end]);

  return { display, ref, started };
}
