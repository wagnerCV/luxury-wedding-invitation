import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP text entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-divider", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 1.5,
      });

      gsap.from(".hero-date", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 2,
      });
    }, heroRef);

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      gsap.to(parallaxRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("where-when");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: "url(/images/hero-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 container text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Pre-title */}
          <p className="hero-text text-sm md:text-base tracking-[0.3em] uppercase mb-8 text-sand">
            Convidam para o seu casamento
          </p>

          {/* Names */}
          <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-glow">
            {WEDDING_CONFIG.bride}
          </h1>
          
          <div className="hero-divider w-24 h-px bg-gradient-to-r from-transparent via-amber to-transparent mx-auto my-8" />
          
          <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold mb-12 text-glow">
            {WEDDING_CONFIG.groom}
          </h1>

          {/* Date */}
          <div className="hero-date glass-dark rounded-2xl px-8 py-6 inline-block shadow-luxury-lg">
            <p className="text-xl md:text-2xl tracking-wider">
              {WEDDING_CONFIG.date.toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-luxury-fast cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}
