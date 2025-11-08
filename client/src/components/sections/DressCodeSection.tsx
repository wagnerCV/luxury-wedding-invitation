import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export function DressCodeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-emerald-burgundy opacity-5" />
      
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Dress Code
              </h2>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald via-amber to-burgundy mx-auto rounded-full" />
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {WEDDING_CONFIG.dressCode.title}
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {WEDDING_CONFIG.dressCode.description}
            </p>
          </motion.div>

          {/* Color Palette */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 shadow-luxury-lg">
              <h4 className="text-2xl font-bold text-center mb-8">
                Paleta de Cores Sugerida
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {WEDDING_CONFIG.dressCode.colors.map((color, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-full aspect-square rounded-2xl mb-4 shadow-luxury transition-luxury group-hover:shadow-luxury-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="font-semibold text-lg mb-1">{color.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {color.hex}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Additional Note */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <p className="text-muted-foreground italic">
              A vossa presença é o que mais importa. Vistam-se com conforto e elegância.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
