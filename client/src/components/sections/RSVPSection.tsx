import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function RSVPSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      guests_count: parseInt(formData.get("guests") as string, 10),
      message: (formData.get("message") as string) || null,
    };

    try {
      const { error } = await supabase
        .from('rsvp')
        .insert([data]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Confirmação enviada com sucesso!", {
        description: "Obrigado por confirmar a vossa presença!",
      });
      form.reset();
    } catch (error: any) {
      console.error('Error submitting RSVP:', error);
      toast.error("Erro ao enviar confirmação", {
        description: error.message || "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-amber-burnt opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 gradient-emerald-burgundy opacity-10 blur-3xl rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
              Confirmar Presença
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald via-amber to-burgundy mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              A vossa presença é o maior presente. Por favor, confirmem até{" "}
              {WEDDING_CONFIG.rsvp.deadline.toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-3xl p-8 md:p-12 shadow-luxury-lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">Obrigado!</h3>
                  <p className="text-lg text-muted-foreground">
                    A vossa confirmação foi recebida com sucesso. Mal podemos esperar para celebrar convosco!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Vosso nome"
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vosso@email.com"
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+351 912 345 678"
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-base">
                      Número de Convidados *
                    </Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      required
                      defaultValue="1"
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">
                      Mensagem (Opcional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Deixem-nos uma mensagem especial"
                      className="min-h-24 text-base resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury transition-luxury-fast"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        A enviar...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Confirmar Presença
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
