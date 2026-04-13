"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { label: "Agricultura",                        href: "/productos?categoria=agricultura" },
  { label: "Climatización",                      href: "/productos?categoria=climatizacion" },
  { label: "Instrumentos y Equipos de Medición", href: "/productos?categoria=instrumentos" },
  { label: "Logística y Transporte",             href: "/productos?categoria=logistica" },
  { label: "Termohigrómetros y Termógrafos",     href: "/productos/otros" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/hero/logo.jpg"
            alt="Logo"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="navbar-links">
          <Link href="/" className="nav-link">Inicio</Link>

          {/* Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <Link href="/productos" className="nav-dropdown-trigger">
              Productos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                {categories.map((c) => (
                  <Link key={c.href} href={c.href} className="nav-dropdown-item">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contacto" className="nav-link">Contacto</Link>
        </div>

        {/* DESKTOP CTA */}
        <Link href="/contacto" className="navbar-cta hidden md:inline-flex">
          Cotizar
        </Link>

        {/* MOBILE HAMBURGER */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`navbar-mobile ${menuOpen ? "mobile-open" : ""}`}>
        <Link href="/"         className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link href="/productos" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Productos</Link>
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="mobile-nav-link"
            style={{ paddingLeft: "28px", fontSize: ".84rem", color: "var(--gray-400)" }}
            onClick={() => setMenuOpen(false)}
          >
            {c.label}
          </Link>
        ))}
        <Link href="/contacto" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contacto</Link>
        <Link href="/contacto" className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>Cotizar</Link>
      </div>
    </nav>
  );
}