"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_CATEGORIES, categoryHref, CTA_TEXTS, ROUTES, WHATSAPP } from "@/lib/siteConfig";

const categories = NAV_CATEGORIES.map((c) => ({
  label: c.label,
  href: categoryHref(c.param ?? c.label),
}));

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const leaveTimeout = useRef<number | null>(null);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(CTA_TEXTS.startConversationMessage)}`;

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
      }
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/hero/logo.webp"
            alt="Logo"
            width={140}
            height={40}
            priority
            style={{ width: "auto" }}
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="navbar-links">
          <Link href="/" className="nav-link">Inicio</Link>

          {/* Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => {
              if (leaveTimeout.current) {
                clearTimeout(leaveTimeout.current);
                leaveTimeout.current = null;
              }
              setDropdown(true);
            }}
            onMouseLeave={() => {
              leaveTimeout.current = window.setTimeout(() => setDropdown(false), 300);
            }}
          >
            <Link href="/productos" className="nav-dropdown-trigger">
              Productos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            {dropdownOpen && (
              <div
                className={`nav-dropdown-menu ${dropdownOpen ? "open" : ""}`}
                onMouseEnter={() => {
                  if (leaveTimeout.current) {
                    clearTimeout(leaveTimeout.current);
                    leaveTimeout.current = null;
                  }
                }}
                onMouseLeave={() => {
                  leaveTimeout.current = window.setTimeout(() => setDropdown(false), 300);
                }}
              >
                {categories.map((c) => (
                  <Link key={c.href} href={c.href} className="nav-dropdown-item">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={ROUTES.contact} className="nav-link">{CTA_TEXTS.contactLabel}</Link>
        </div>

        {/* DESKTOP CTA */}
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="navbar-cta hidden md:inline-flex">
          {CTA_TEXTS.quoteLabel}
        </a>

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
        <Link href={ROUTES.contact} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{CTA_TEXTS.contactLabel}</Link>
        <a href={waHref} className="mobile-nav-cta" onClick={() => setMenuOpen(false)} target="_blank" rel="noopener noreferrer">{CTA_TEXTS.quoteLabel}</a>
      </div>
    </nav>
  );
}