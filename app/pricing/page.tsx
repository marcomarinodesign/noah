"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background px-4 pt-[100px] pb-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-muted">
          <Lock className="size-8 text-muted-foreground" />
        </div>
        <h1 className="heading-lg text-foreground">Próximamente</h1>
        <p className="text-body text-muted-foreground">
          Estamos trabajando en nuestros planes de precios. Mientras tanto,
          puedes probar Memora de forma gratuita.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="primary" href="/generar-acta" className="px-8 py-6">
            Probar gratis
          </Button>
          <Button variant="secondary" href="/contacto" className="px-8 py-6">
            Contactar
          </Button>
        </div>
      </div>
    </main>
  );
}
