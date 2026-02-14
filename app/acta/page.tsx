"use client";

import ActaTemplate from "./ActaTemplate";
import data from "@/sample-acta.json";
import { useRef } from "react";

export default function ActaPage() {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const html = ref.current?.innerHTML;

    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html })
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "acta.pdf";
    a.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>Descargar PDF</button>
      <div ref={ref}>
        <ActaTemplate data={data} />
      </div>
    </div>
  );
}