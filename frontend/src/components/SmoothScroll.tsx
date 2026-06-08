import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => instance.destroy();
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement,
      options?: { offset?: number; immediate?: boolean },
    ) => {
      if (!lenis) return;
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      lenis.scrollTo(el as HTMLElement, {
        offset: options?.offset ?? 0,
        immediate: options?.immediate ?? false,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    },
    [lenis],
  );

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
