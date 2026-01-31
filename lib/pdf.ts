// lib/pdf.ts
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { Acta } from "@/app/schema/acta.schema";

export async function generateActaPDF(acta: Acta) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  const drawText = (text: string, size = 11, isBold = false) => {
    page.drawText(text, {
      x: 50,
      y,
      size,
      font: isBold ? bold : font,
      color: rgb(0, 0, 0),
    });
    y -= size + 6;
  };

  // --- HEADER ---
  drawText("ACTA DE REUNIÓN", 18, true);
  y -= 10;

  drawText(`Comunidad: ${acta.metadata.comunidad ?? "-"}`, 12);
  drawText(`Fecha: ${acta.metadata.fecha_reunion ?? "-"}`, 12);
  drawText(`Tipo de reunión: ${acta.metadata.tipo_reunion ?? "-"}`, 12);

  y -= 20;

  // --- PARTICIPANTES ---
  drawText("Participantes", 14, true);

  if (acta.participantes.presidente) {
    drawText(`Presidente: ${acta.participantes.presidente}`);
  }
  if (acta.participantes.secretario) {
    drawText(`Secretario: ${acta.participantes.secretario}`);
  }

  y -= 10;

  // --- ORDEN DEL DÍA ---
  drawText("Orden del día", 14, true);
  acta.orden_del_dia.forEach((item, i) => {
    drawText(`${i + 1}. ${item.descripcion ?? "-"}`);
  });

  y -= 10;

  // --- ACUERDOS ---
  drawText("Acuerdos", 14, true);
  acta.acuerdos.forEach((a, i) => {
    drawText(`${i + 1}. ${a.acuerdo ?? "-"}`);
  });

  y -= 20;

  // --- FIRMAS ---
  drawText("Firmas", 14, true);
  drawText(`Presidente: ${acta.firmas.presidente ?? "____________________"}`);
  y -= 20;
  drawText(`Secretario: ${acta.firmas.secretario ?? "____________________"}`);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}