/**
 * GET /api/preview-pdf-html
 * Returns the acta PDF template HTML with sample data so you can open it in the browser.
 */
import fs from "fs/promises";
import path from "path";
import type { PdfActaFormat } from "@/lib/acta/actaMapper";
import { toPdfActaViewModel } from "@/lib/pdf/actaPdfViewModel";
import {
  ACTA_HEADER_PLACEHOLDER,
  generateActaHtml,
} from "@/lib/pdf/generateActaHtml";
import sampleData from "@/sample-acta.json";

async function getHeaderImgTag(): Promise<string> {
  try {
    const headerPath = path.join(process.cwd(), "public", "acta-header.png");
    const buffer = await fs.readFile(headerPath);
    const base64 = buffer.toString("base64");
    return `<img src="data:image/png;base64,${base64}" class="acta-header-img" alt="" style="width:100%; display:block;" />`;
  } catch {
    return `<div class="acta-header-img" style="width:100%; height:120px; background: #eee; display:flex; align-items:center; justify-content:center; color:#666; font-size:12pt;">Cabecera (acta-header.png)</div>`;
  }
}

export async function GET() {
  const data: PdfActaFormat = { ...sampleData, idioma: "es" } as PdfActaFormat;
  const vm = toPdfActaViewModel(data);
  const html = generateActaHtml(vm);
  const headerImg = await getHeaderImgTag();
  const htmlWithHeader = html.replace(ACTA_HEADER_PLACEHOLDER, headerImg);

  return new Response(htmlWithHeader, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
