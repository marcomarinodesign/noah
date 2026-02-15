"use client";

import data from "@/sample-acta.json";
import ActaTemplate, { type ActaData } from "@/app/acta/ActaTemplate";
import { getComunidad } from "@/lib/store/comunidadStore";

export default function ActaPage() {
  const comunidad = getComunidad("1");
  const idioma = comunidad?.idioma ?? "es";

  const handleDownload = async () => {
    const payload = { ...data, idioma };
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "acta.pdf";
    a.click();
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-end">
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
        >
          Descargar PDF
        </button>
      </div>
      <div className="border rounded-lg bg-white shadow-sm">
        <ActaTemplate data={data as ActaData} />
      </div>
    </div>
  );
}
