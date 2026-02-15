"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function HeroOnlyLanding() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Full Height Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Image Placeholder */}
            <div className="w-full max-w-[760px] h-[180px] bg-muted/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                760 × 180 px
              </span>
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Ahora con transcripción de audio automática
              </span>
            </div>

            {/* Main headline */}
            <h1 className="max-w-[800px] heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">
              De reunión a acta profesional en minutos
            </h1>

            {/* Supporting text */}
            <p className="max-w-2xl text-body text-muted-foreground">
              Sube el audio de tu reunión o pega la transcripción. Memora usa IA
              para estructurar automáticamente toda la información en un acta
              formal lista para compartir.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                href="/generar-acta"
                className="text-lg px-8 py-6"
              >
                Generar acta gratis
              </Button>
              <Button
                variant="secondary"
                href="/faq"
                className="text-lg px-8 py-6"
              >
                Cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
