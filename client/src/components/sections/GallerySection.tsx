import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export function GallerySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/10 to-background" />

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
              <Camera className="w-8 h-8 text-primary" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Nossa História
              </h2>
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald via-amber to-burgundy mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              Momentos que capturaram a essência do nosso amor
            </p>
          </motion.div>

          {/* Masonry Gallery */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {WEDDING_CONFIG.gallery.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="break-inside-avoid group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-luxury">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-luxury group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-luxury flex items-end p-6">
                    <p className="text-white text-sm md:text-base">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
