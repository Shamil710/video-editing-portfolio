import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { HeroSection } from "./components/HeroSection";
import { LoaderScreen } from "./components/LoaderScreen";
import { Navbar } from "./components/Navbar";
import { PortfolioSectionsClean } from "./components/PortfolioSectionsClean";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-auto bg-[#050505] text-white selection:bg-bullion selection:text-black">
      <BackgroundEffects />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoaderScreen key="loader" />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar />
            <HeroSection />
            <PortfolioSectionsClean />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
