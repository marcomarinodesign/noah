"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-acta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: text }),
      });

      if (!res.ok) {
        throw new Error("Error generando el acta");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // descarga automática
      const a = document.createElement("a");
      a.href = url;
      a.download = "acta.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } catch {
      setError("No se ha podido generar el acta. Revisa la transcripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Generar acta de reunión
        </h1>

        <p className="text-sm text-gray-500 text-center">
          Pega o arrastra la transcripción de la reunión
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onDrop={(e) => {
            e.preventDefault();
            const droppedText = e.dataTransfer.getData("text");
            if (droppedText) {
              setText(droppedText);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          placeholder="Pega aquí la transcripción…"
          className="w-full h-48 border rounded-md p-3 text-sm focus:outline-none focus:ring"
        />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Generando acta…" : "Generar acta (PDF)"}
        </button>
      </div>
    </main>
  );
}
