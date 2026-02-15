import type { Comunidad, Idioma } from "@/lib/models/comunidad";

let comunidades: Comunidad[] = [
  {
    id: "1",
    nombre: "LA COMA, 5",
    direccion: "C.458",
    nif: "H64927924",
    idioma: "es",
  },
];

export function getComunidad(id: string): Comunidad | undefined {
  return comunidades.find((c) => c.id === id);
}

export function updateIdioma(id: string, idioma: Idioma): void {
  const idx = comunidades.findIndex((c) => c.id === id);
  if (idx !== -1) {
    comunidades[idx] = { ...comunidades[idx], idioma };
  }
}
