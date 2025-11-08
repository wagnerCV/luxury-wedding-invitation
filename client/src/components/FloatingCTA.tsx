import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp");
    rsvpSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="glass-dark border-t border-white/10 p-4 shadow-luxury-lg">
            <Button
              onClick={scrollToRSVP}
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury transition-luxury-fast"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirmar Presença
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
