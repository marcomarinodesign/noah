export type Idioma = "es" | "ca";

export type Comunidad = {
  id: string;
  nombre: string;
  direccion: string;
  nif: string;
  idioma: Idioma;
};
