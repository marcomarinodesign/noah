"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MENU_ITEMS = [
  { label: "Generar acta", href: "/generar-acta" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
] as const;

interface NavMenuItemsProps {
  className?: string;
}

const NavMenuItems = ({ className }: NavMenuItemsProps) => (
  <div
    className={`flex flex-col gap-4 md:flex-row md:items-center md:gap-8 ${className ?? ""}`}
  >
    {MENU_ITEMS.map(({ label, href }) => (
      <Link
        key={label}
        href={href}
        className="text-sm font-medium text-black transition-colors hover:text-black/70"
        style={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}
      >
        {label}
      </Link>
    ))}
  </div>
);

export function LpNavbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 isolate border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex max-w-[1280px] flex-col justify-between gap-4 px-6 py-4 md:flex-row md:items-center md:gap-8 md:px-20 md:py-4">
        {/* Logo a la izquierda */}
        <div className="flex shrink-0 items-center justify-between md:justify-start md:flex-none">
          <Link
            href="/"
            aria-label="Ir a inicio"
            className="block shrink-0 max-h-10 md:max-h-12 w-auto"
          >
            <Image
              src="/images/logo.png"
              alt="NOAH ESTATE"
              width={140}
              height={48}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>
          <Button
            variant="ghost"
            type="button"
            className="flex items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Enlaces centrados, CTA a la derecha */}
        <div className="hidden flex-1 items-center gap-8 md:flex">
          <NavMenuItems className="mx-auto" />
          <Button
            href="/generar-acta"
            className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            Generar acta
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="flex w-full flex-col justify-end gap-5 pb-2.5 md:hidden">
            <NavMenuItems />
            <Button
              href="/generar-acta"
              className="w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              Generar acta
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
