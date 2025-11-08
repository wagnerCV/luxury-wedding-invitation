import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export function LoveQuoteSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 gradient-amber-burnt opacity-10 blur-3xl rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 gradient-emerald-burgundy opacity-10 blur-3xl rounded-full -translate-y-1/2" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Heart Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-4 rounded-full bg-accent/10">
              <Heart className="w-12 h-12 text-accent fill-accent" />
            </div>
          </motion.div>

          {/* Quote */}
          <div className="glass rounded-3xl p-12 md:p-16 shadow-luxury-lg text-center">
            <blockquote className="relative">
              <svg
                className="absolute -top-4 -left-4 w-12 h-12 text-accent/20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
              
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic leading-relaxed mb-8 text-foreground">
                {WEDDING_CONFIG.quote.text}
              </p>
              
              <svg
                className="absolute -bottom-4 -right-4 w-12 h-12 text-accent/20 rotate-180"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
            </blockquote>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto my-6" />

            <cite className="not-italic text-lg md:text-xl text-muted-foreground">
              — {WEDDING_CONFIG.quote.author}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
