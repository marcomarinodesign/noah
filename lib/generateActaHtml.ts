/**
 * Generates a legally traditional acta HTML document for PDF generation.
 * Pure string template - no React, no JSX.
 * Full bilingual support: Spanish (es) and Catalan (ca).
 */

function escapeHtml(text: unknown): string {
  if (text == null || text === "") return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeStr(val: unknown): string {
  return val != null && val !== "" ? String(val) : "-";
}

const ORDINALS_ES = [
  "PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO",
  "SÉPTIMO", "OCTAVO", "NOVENO", "DÉCIMO", "UNDÉCIMO", "DUODÉCIMO",
  "DECIMOTERCERO", "DECIMOCUARTO", "DECIMOQUINTO", "DECIMOSEXTO",
  "DECIMOSÉPTIMO", "DECIMOCTAVO", "DECIMONOVENO", "VIGÉSIMO",
];

const ORDINALS_CA = [
  "PRIMER", "SEGON", "TERCER", "QUART", "CINQUÈ", "SISÈ",
  "SETÈ", "VUITÈ", "NOUÈ", "DÈCIM", "ONZÈ", "DOTZÈ",
  "TRENZÈ", "CATORZÈ", "QUINZÈ", "SETZÈ", "DISSETÈ", "DIVUITÈ",
  "DINOVÈ", "VINTÈ",
];

function ordinal(n: number, lang: "es" | "ca"): string {
  const list = lang === "ca" ? ORDINALS_CA : ORDINALS_ES;
  return list[n - 1] ?? (lang === "ca" ? `NÚMERO ${n}` : `NÚMERO ${n}`);
}

function formatDate(isoDate: string, lang: "es" | "ca"): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T12:00:00");
  const monthsEs = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const monthsCa = [
    "gener", "febrer", "març", "abril", "maig", "juny",
    "juliol", "agost", "setembre", "octubre", "novembre", "desembre",
  ];
  const months = lang === "ca" ? monthsCa : monthsEs;
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function resultadoToNarrative(resultado: string, lang: "es" | "ca"): string {
  const r = String(resultado).toLowerCase().trim();
  if (lang === "es") {
    if (r.includes("unanimidad") || r === "unanimidad") return "se acuerda por unanimidad";
    if (r.includes("mayoría") || r.includes("mayoria")) return "se acuerda por mayoría";
    if (r.includes("mayoría absoluta")) return "se acuerda por mayoría absoluta";
    if (r.includes("mayoría simple")) return "se acuerda por mayoría simple";
    if (r) return `se acuerda (${resultado})`;
    return "se acuerda";
  }
  if (lang === "ca") {
    if (r.includes("unanimidad") || r === "unanimidad" || r.includes("unanimitat")) return "s'acorda per unanimitat";
    if (r.includes("mayoría") || r.includes("mayoria") || r.includes("majoria")) return "s'acorda per majoria";
    if (r.includes("mayoría absoluta") || r.includes("majoria absoluta")) return "s'acorda per majoria absoluta";
    if (r.includes("mayoría simple") || r.includes("majoria simple")) return "s'acorda per majoria simple";
    if (r) return `s'acorda (${resultado})`;
    return "s'acorda";
  }
  return lang === "ca" ? "s'acorda" : "se acuerda";
}

interface OpeningParams {
  ciudad: string;
  fecha: string;
  horaInicio: string;
  nombreComunidad: string;
  direccion: string;
  nif: string;
  presidente: string;
  secretario: string;
}

const TEXTS = {
  es: {
    title: "ACTA DE REUNIÓN",
    pageTitle: "Acta de reunión",
    opening: (p: OpeningParams) =>
      `A ${p.ciudad}, a ${p.fecha}, siendo las ${p.horaInicio} horas, se celebra debidamente convocada ` +
      `la Junta General Ordinaria de la Comunidad de Propietarios <strong>${p.nombreComunidad}</strong>, ` +
      `con domicilio en ${p.direccion} y NIF ${p.nif}, bajo la presidencia de D./Dña. ${p.presidente} ` +
      `y actuando como Secretario-Administrador ${p.secretario}, desarrollándose la sesión bajo el siguiente orden del día:`,
    asistentesIntro: "Asisten a la reunión las siguientes entidades:",
    quorum: "Se constata que concurren propietarios que representan suficiente coeficiente de participación para la válida constitución de la Junta, quedando ésta válidamente constituida.",
    closing: (horaFin: string) =>
      `Y no habiendo más asuntos que tratar, se levanta la sesión a las ${horaFin} horas, ` +
      `extendiéndose la presente acta que, leída y aprobada, es firmada por el Presidente y el Secretario en prueba de conformidad, conforme a lo previsto en el artículo 553-27 del C.C.C.`,
    ordenDelDiaTitle: "ORDEN DEL DÍA",
    asistentesTitle: "ASISTENTES",
    acuerdosTitle: "ACUERDOS",
    fondosTitle: "FONDOS",
    presidenteLabel: "El Presidente",
    secretarioLabel: "El Secretario",
    tableAsistentes: ["Departamento", "Coeficiente", "Propietario", "Representante"],
    tableFondos: ["Fondo", "Saldo anterior", "Ingresos", "Gastos", "Saldo actual"],
  },
  ca: {
    title: "ACTA DE REUNIÓ",
    pageTitle: "Acta de reunió",
    opening: (p: OpeningParams) =>
      `A ${p.ciudad}, a ${p.fecha}, essent les ${p.horaInicio} hores, es celebra degudament convocada ` +
      `la Junta General Ordinària de la Comunitat de Propietaris <strong>${p.nombreComunidad}</strong>, ` +
      `amb domicili a ${p.direccion} i NIF ${p.nif}, sota la presidència de D./Dna. ${p.presidente} ` +
      `i actuant com a Secretari-Administrador ${p.secretario}, desenvolupant-se la sessió segons el següent ordre del dia:`,
    asistentesIntro: "Assisteixen a la reunió les següents entitats:",
    quorum: "Es constata que concorren propietaris que representen suficient coeficient de participació per a la vàlida constitució de la Junta, quedant aquesta vàlidament constituïda.",
    closing: (horaFin: string) =>
      `I no havent-hi més assumptes a tractar, es lleva la sessió a les ${horaFin} hores, ` +
      `estenent-se la present acta que, llegida i aprovada, és signada pel President i el Secretari en prova de conformitat, d'acord amb el previst a l'article 553-27 del C.C.C.`,
    ordenDelDiaTitle: "ORDRE DEL DIA",
    asistentesTitle: "ASSISTENTS",
    acuerdosTitle: "ACORDS",
    fondosTitle: "FONS",
    presidenteLabel: "El President",
    secretarioLabel: "El Secretari",
    tableAsistentes: ["Departament", "Coeficient", "Propietari", "Representant"],
    tableFondos: ["Fons", "Saldo anterior", "Ingressos", "Despeses", "Saldo actual"],
  },
} as const;

export function generateActaHtml(data: Record<string, unknown>): string {
  const idioma = (data.idioma === "ca" ? "ca" : "es") as "es" | "ca";
  const t = TEXTS[idioma];

  const comunidad = (data.comunidad as Record<string, unknown>) ?? {};
  const cabecera = (data.cabecera as Record<string, unknown>) ?? {};
  const orden_dia = (data.orden_dia as Array<Record<string, unknown>>) ?? [];
  const asistentes = (data.asistentes as Array<Record<string, unknown>>) ?? [];
  const acuerdos = (data.acuerdos as Array<Record<string, unknown>>) ?? [];
  const fondos = (data.fondos as Array<Record<string, unknown>>) ?? [];
  const cargos = (data.cargos as Record<string, unknown>) ?? {};
  const cierre = (data.cierre as Record<string, unknown>) ?? {};

  const ciudad = escapeHtml(safeStr(comunidad.ciudad));
  const fecha = formatDate(safeStr(cabecera.fecha), idioma);
  const horaInicio = escapeHtml(safeStr(cabecera.hora_inicio));
  const horaFin = escapeHtml(safeStr(cierre.hora_fin));
  const nombreComunidad = escapeHtml(safeStr(comunidad.nombre));
  const direccion = escapeHtml(safeStr(comunidad.direccion));
  const nif = escapeHtml(safeStr(comunidad.nif));
  const presidente = escapeHtml(safeStr(cabecera.presidente));
  const secretario = escapeHtml(safeStr(cabecera.secretario));

  // 1. Formal opening narrative
  const aperturaHtml = `
    <p class="narrative">
      ${t.opening({ ciudad, fecha, horaInicio, nombreComunidad, direccion, nif, presidente, secretario })}
    </p>`;

  // 2. ORDRE DEL DIA / ORDEN DEL DÍA
  const ordenDiaItems = orden_dia
    .map((p) => `<li class="orden-item">${escapeHtml(safeStr(p.titulo))}</li>`)
    .join("");
  const ordenDiaHtml =
    orden_dia.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${t.ordenDelDiaTitle}</h2>
      <ol class="orden-dia-list">
        ${ordenDiaItems}
      </ol>
    </section>`
      : "";

  // 3. ASSISTENTS / ASISTENTES
  const asistentesRows = asistentes
    .map(
      (a) =>
        `<tr><td>${escapeHtml(safeStr(a.departamento))}</td><td>${escapeHtml(
          safeStr(a.coeficiente)
        )}</td><td>${escapeHtml(safeStr(a.propietario))}</td><td>${escapeHtml(
          safeStr(a.representante)
        )}</td></tr>`
    )
    .join("");
  const asistentesHeaderCells = t.tableAsistentes
    .map((h) => `<th>${h}</th>`)
    .join("");
  const asistentesHtml =
    asistentes.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${t.asistentesTitle}</h2>
      <p class="narrative">${t.asistentesIntro}</p>
      <table class="table">
        <thead><tr>${asistentesHeaderCells}</tr></thead>
        <tbody>${asistentesRows}</tbody>
      </table>
      <p class="narrative quorum">${t.quorum}</p>
    </section>`
      : "";

  // 4. ACORDS / ACUERDOS - compact legal narrative
  const acuerdosHtml = acuerdos
    .map((a) => {
      const puntoId = typeof a.punto_id === "number" ? a.punto_id : parseInt(String(a.punto_id || 1), 10) || 1;
      const ord = ordinal(puntoId, idioma);
      const resumen = String((a.resumen as string) ?? "").trim();
      const decisiones = (a.decisiones as string[]) ?? [];
      const resultado = resultadoToNarrative(safeStr(a.resultado), idioma);

      const decisionesText = decisiones
        .map((d) => {
          const s = String(d).trim();
          if (!s) return "";
          return s.endsWith(".") ? s : `${s}.`;
        })
        .filter(Boolean)
        .join(" ");

      const parts: string[] = [];
      if (resumen) parts.push(resumen);
      if (decisionesText) parts.push(decisionesText);
      parts.push(resultado + ".");

      const textoCompleto = parts.join(" ");
      const textoEscapado = escapeHtml(textoCompleto);

      return `
      <p class="acuerdo-parrafo page-break-inside-avoid">
        <strong>${ord}.-</strong> ${textoEscapado}
      </p>`;
    })
    .join("");
  const acuerdosSectionHtml =
    acuerdos.length > 0
      ? `
    <section class="section">
      <h2 class="section-title">${t.acuerdosTitle}</h2>
      ${acuerdosHtml}
    </section>`
      : "";

  // 5. FONDOS / FONS
  const fondosRows = fondos
    .map(
      (f) =>
        `<tr><td>${escapeHtml(safeStr(f.nombre))}</td><td>${escapeHtml(
          safeStr(f.saldo_anterior)
        )}</td><td>${escapeHtml(safeStr(f.ingresos))}</td><td>${escapeHtml(
          safeStr(f.gastos)
        )}</td><td>${escapeHtml(safeStr(f.saldo_actual))}</td></tr>`
    )
    .join("");
  const fondosHeaderCells = t.tableFondos.map((h) => `<th>${h}</th>`).join("");
  const fondosHtml =
    fondos.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${t.fondosTitle}</h2>
      <table class="table">
        <thead><tr>${fondosHeaderCells}</tr></thead>
        <tbody>${fondosRows}</tbody>
      </table>
    </section>`
      : "";

  // 6. Legal closing paragraph
  const cierreNarrative = `
    <p class="narrative cierre">${t.closing(horaFin)}</p>`;

  // 7. Formal signature section
  const firmaPresidente = escapeHtml(safeStr(cargos.presidente));
  const firmaSecretario = escapeHtml(safeStr(cargos.secretario_admin));

  const firmasHtml = `
    <section class="firmas-section page-break-inside-avoid">
      <div class="firmas-grid">
        <div class="firma-block">
          <div class="firma-line"></div>
          <p class="firma-label">${t.presidenteLabel}</p>
          <p class="firma-nombre">${firmaPresidente}</p>
        </div>
        <div class="firma-block">
          <div class="firma-line"></div>
          <p class="firma-label">${t.secretarioLabel}</p>
          <p class="firma-nombre">${firmaSecretario}</p>
        </div>
      </div>
    </section>`;

  return `<!DOCTYPE html>
<html lang="${idioma}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.pageTitle}</title>
  <style>
    @page { size: A4; margin: 25mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, "Liberation Serif", serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1a1a1a;
      max-width: 210mm;
      margin: 0 auto;
      padding: 25mm;
    }
    .narrative {
      text-align: justify;
      margin-bottom: 1em;
      text-indent: 1.5em;
    }
    .narrative:first-of-type { text-indent: 0; }
    .narrative.quorum { margin-top: 0.75em; font-style: italic; }
    .section { margin-bottom: 1.25em; }
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 1.25em 0 0.75em 0;
      color: #1a1a1a;
    }
    .orden-dia-list { margin: 0.5em 0 0 1.5em; padding: 0; }
    .orden-item { margin-bottom: 0.4em; }
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10pt;
      margin-top: 0.5em;
    }
    .table th, .table td {
      border: 1px solid #333;
      padding: 6px 10px;
      text-align: left;
    }
    .table th { background: #f8f8f8; font-weight: bold; }
    .acuerdo-parrafo {
      text-align: justify;
      margin-bottom: 1em;
      text-indent: 0;
    }
    .acuerdo-parrafo strong { margin-right: 0.25em; }
    .cierre { margin-top: 1.5em; }
    .firmas-section { margin-top: 2.5em; padding-top: 2em; }
    .firmas-grid {
      display: flex;
      justify-content: space-between;
      gap: 40mm;
      margin-top: 2em;
    }
    .firma-block { flex: 1; max-width: 70mm; }
    .firma-line {
      border-bottom: 1px solid #1a1a1a;
      height: 2em;
      margin-bottom: 0.5em;
    }
    .firma-label { font-size: 10pt; margin: 0; color: #444; }
    .firma-nombre { font-weight: bold; margin: 0.25em 0 0 0; }
    .titulo-principal {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.5em;
    }
    .page-break-inside-avoid { page-break-inside: avoid; }
    @media print {
      body { padding: 0; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1 class="titulo-principal">${t.title}</h1>
  ${aperturaHtml}
  ${ordenDiaHtml}
  ${asistentesHtml}
  ${acuerdosSectionHtml}
  ${fondosHtml}
  ${cierreNarrative}
  ${firmasHtml}
</body>
</html>`;
}
