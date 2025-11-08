import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export function SpotifySection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 gradient-emerald-burgundy opacity-10 blur-3xl rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Music className="w-8 h-8 text-secondary" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Nossa Playlist
              </h2>
              <Music className="w-8 h-8 text-secondary" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald via-amber to-burgundy mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              As músicas que embalam a nossa história de amor
            </p>
          </div>

          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass rounded-3xl p-6 md:p-8 shadow-luxury-lg">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${WEDDING_CONFIG.spotifyPlaylistId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
                title="Wedding Playlist"
              />
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground italic">
              Ouçam e sintam-se à vontade para dançar connosco!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
