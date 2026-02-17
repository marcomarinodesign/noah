"use client";

import Link from "next/link";

export function FigmaHomepage() {
  return (
    <main
      className="h-full min-h-[800px]"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* Hero Section */}
      <section
        className="mx-auto flex max-w-[1024px] flex-col items-center justify-center px-6 py-0 text-center md:py-0"
      >
        {/* Illustration (responsive variants) */}
        <div
          className="w-full max-w-[760px]"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero-illustration-390w.png"
            />
            <source
              media="(max-width: 1440px)"
              srcSet="/images/hero-illustration-768w.png"
            />
            <img
              src="/images/hero-illustration-1440w.png"
              alt="Dos personas en reunión, conversación colaborativa"
              className="h-auto w-full"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Main Headline */}
        <h1
          className="mx-auto max-w-[800px] text-center"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--weight-bold)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-6)",
          }}
        >
          De reunión a acta profesional en minutos
        </h1>

        {/* Description */}
        <p
          className="mx-auto max-w-[672px] text-center"
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-normal)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-8)",
          }}
        >
          Sube el audio de tu reunión o pega la transcripción. Noah usa IA
          para estructurar automáticamente toda la información en un acta formal
          lista para compartir.
        </p>

        {/* CTAs — design system: btn + variants + size */}
        <div
          className="flex flex-col sm:flex-row"
          style={{ gap: "var(--space-4)" }}
        >
          <Link
            href="/generar-acta"
            className="btn btn-primary btn-lg"
          >
            Generar acta gratis
          </Link>
          <Link
            href="/faq"
            className="btn btn-outline btn-lg"
          >
            Cómo funciona
          </Link>
        </div>
      </section>
    </main>
  );
}
