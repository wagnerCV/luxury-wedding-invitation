import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export function Footer() {
  return (
    <footer className="py-16 bg-ink-black text-off-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber to-transparent" />

      <div className="container relative z-10">
        <div className="text-center">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <Heart className="w-8 h-8 text-accent fill-accent" />
          </div>

          {/* Couple Names */}
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            {WEDDING_CONFIG.bride} & {WEDDING_CONFIG.groom}
          </h3>

          {/* Date */}
          <p className="text-lg text-sand mb-8">
            {WEDDING_CONFIG.date.toLocaleDateString("pt-PT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-sand to-transparent mx-auto mb-8" />

          {/* Message */}
          <p className="text-sand/70 text-sm md:text-base max-w-md mx-auto mb-8">
            Obrigado por fazerem parte desta jornada connosco. <br />
            Com amor e gratidão.
          </p>

          {/* Copyright */}
          <p className="text-sand/50 text-xs">
            © {new Date().getFullYear()} {WEDDING_CONFIG.bride} & {WEDDING_CONFIG.groom}. 
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
