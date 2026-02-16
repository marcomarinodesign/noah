import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#fafaf7" }}>
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-20 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block w-20 md:w-24">
              <Image
                src="/images/logo.png"
                alt="NOAH ESTATE"
                width={96}
                height={33}
                className="h-auto w-full"
              />
            </Link>
            <p
              className="mt-[18px] max-w-xs text-foreground"
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
            >
              Convierte reuniones en actas profesionales con IA.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3
              className="mb-3 text-foreground"
              style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}
            >
              Producto
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/generar-acta"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  Generar acta
                </Link>
              </li>
              <li>
                <Link
                  href="/acta"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  Ver ejemplo
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="mb-3 text-foreground"
              style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}
            >
              Empresa
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contacto"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/marcomarinodesign/noah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="mb-3 text-foreground"
              style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacidad"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="transition-colors hover:text-foreground/70"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}
                >
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 md:flex-row">
          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#0f172a" }}>
            © {currentYear} Noah. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors hover:text-black/70"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/marcomarinodesign/noah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors hover:text-black/70"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors hover:text-black/70"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
