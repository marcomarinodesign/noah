"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownloadPDF = async () => {
    if (!pdfUrl) return;

    // Abrir preview solo por acción del usuario
    window.open(pdfUrl, "_blank", "noopener,noreferrer");

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "acta.pdf";
    a.click();

    // Nota: no revocar inmediatamente o el preview puede fallar
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 5 * 60_000);
  };

  const handleGenerate = async () => {
    if (!file && !text.trim()) return;

    setLoading(true);
    setError(null);
    setPdfUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      if (text.trim()) {
        formData.append("text", text);
      }

      const res = await fetch("/api/generate-acta", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        let message = "No se ha podido generar el acta.";

        if (contentType.includes("application/json")) {
          try {
            const data: unknown = await res.json();
            if (
              typeof data === "object" &&
              data !== null &&
              "error" in data &&
              typeof (data as { error?: unknown }).error === "string"
            ) {
              message = (data as { error: string }).error;
            }
          } catch {
            // ignore JSON parsing errors
          }
        } else {
          try {
            const text = await res.text();
            if (text.trim()) message = text.trim();
          } catch {
            // ignore body read errors
          }
        }

        throw new Error(message);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      // Importante: NO abrimos pestaña aquí. Solo al pulsar "Descargar PDF".
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se ha podido generar el acta. Revisa la transcripción."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div
        id="generator"
        className="w-full max-w-xl bg-card rounded-xl shadow p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          Generar acta de reunión
        </h1>

        <section className="rounded-xl bg-muted p-5 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Pega la transcripción y/o añade información adicional sobre la reunión
          </p>

          <div className="space-y-2">
            <input
              id="acta-file"
              type="file"
              accept=".txt,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <label
              htmlFor="acta-file"
              className="w-full h-10 md:h-11 px-5 inline-flex items-center justify-center rounded-full border border-border bg-transparent text-sm md:text-base font-medium text-foreground hover:bg-background cursor-pointer"
            >
              {file
                ? `Archivo seleccionado: ${file.name}`
                : "Elegir archivo (.txt, .docx)"}
            </label>

            <p className="text-xs text-muted-foreground text-center">
              Si adjuntas un archivo, puedes añadir contexto aquí (opcional)
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const droppedText = e.dataTransfer.getData("text");
              if (droppedText) {
                setText(droppedText);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            placeholder="Pega la transcripción aquí…&#10;&#10;Opcional: añade detalles extra (asistentes, fecha/hora, acuerdos, votaciones, tareas, incidencias…)."
            className="w-full h-56 border border-input bg-card rounded-md p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </section>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full h-10 md:h-11 px-5 rounded-full border border-transparent bg-primary text-primary-foreground text-sm md:text-base font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {loading ? "Generando acta…" : "Generar acta"}
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={!pdfUrl || loading}
          className="w-full h-10 md:h-11 px-5 rounded-full border border-transparent bg-primary text-primary-foreground text-sm md:text-base font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Descargar PDF
        </button>
      </div>

      {/* anchor targets for nav/footer (placeholder sections) */}
      <div id="como-funciona" className="sr-only" />
      <div id="faq" className="sr-only" />
      <div id="pricing" className="sr-only" />
      <div id="contactos" className="sr-only" />
      <div id="privacidad" className="sr-only" />
      <div id="terminos" className="sr-only" />
      <div id="cookies" className="sr-only" />
    </main>
  );
}
