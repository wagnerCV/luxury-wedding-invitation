import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { getTimeRemaining, generateGoogleCalendarLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function WhereWhenSection() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(WEDDING_CONFIG.date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(WEDDING_CONFIG.date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calendarLink = generateGoogleCalendarLink({
    title: `Casamento ${WEDDING_CONFIG.bride} & ${WEDDING_CONFIG.groom}`,
    description: `Celebração do casamento de ${WEDDING_CONFIG.bride} e ${WEDDING_CONFIG.groom}`,
    location: WEDDING_CONFIG.venue.address,
    startDate: WEDDING_CONFIG.date,
    endDate: new Date(WEDDING_CONFIG.date.getTime() + 5 * 60 * 60 * 1000), // 5 hours later
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="where-when" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 gradient-emerald-burgundy opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 gradient-amber-burnt opacity-10 blur-3xl rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
              Onde & Quando
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald via-amber to-burgundy mx-auto rounded-full" />
          </motion.div>

          {/* Countdown */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="glass rounded-3xl p-8 md:p-12 shadow-luxury-lg max-w-4xl mx-auto">
              <p className="text-center text-lg md:text-xl mb-8 text-muted-foreground">
                Contagem Regressiva
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { value: timeRemaining.days, label: "Dias" },
                  { value: timeRemaining.hours, label: "Horas" },
                  { value: timeRemaining.minutes, label: "Minutos" },
                  { value: timeRemaining.seconds, label: "Segundos" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-primary mb-2">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Ceremony */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-3xl p-8 shadow-luxury hover:shadow-luxury-lg transition-luxury"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Cerimónia</h3>
                  <p className="text-muted-foreground">{WEDDING_CONFIG.ceremony.time}</p>
                </div>
              </div>
              <p className="text-lg">{WEDDING_CONFIG.ceremony.location}</p>
            </motion.div>

            {/* Reception */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-3xl p-8 shadow-luxury hover:shadow-luxury-lg transition-luxury"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Receção</h3>
                  <p className="text-muted-foreground">{WEDDING_CONFIG.reception.time}</p>
                </div>
              </div>
              <p className="text-lg">{WEDDING_CONFIG.reception.location}</p>
            </motion.div>
          </div>

          {/* Venue */}
          <motion.div variants={itemVariants} className="mt-8 max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 shadow-luxury-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-accent/10">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{WEDDING_CONFIG.venue.name}</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {WEDDING_CONFIG.venue.address}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-luxury-fast shadow-luxury"
                    >
                      <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                        <Calendar className="w-4 h-4 mr-2" />
                        Adicionar ao Calendário
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="transition-luxury-fast"
                    >
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${WEDDING_CONFIG.venue.coordinates.lat},${WEDDING_CONFIG.venue.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Ver no Mapa
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
