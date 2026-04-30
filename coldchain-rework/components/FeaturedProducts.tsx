"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Product } from "@/lib/localProducts";

interface Props {
  products: Product[];
}

export function FeaturedProductsSlider({ products }: Props) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (next: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 380);
  };

  const prev = () => go((active - 1 + products.length) % products.length, "left");
  const next = () => go((active + 1) % products.length, "right");

  useEffect(() => {
    timeoutRef.current = setTimeout(() => go((active + 1) % products.length, "right"), 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [active, animating]);

  const p = products[active];

  return (
    <section className="fp-section">
      <div className="fp-header">
        <span className="fp-eyebrow">✦ Productos de temporada</span>
        <h2 className="fp-title">Equipos destacados del catálogo</h2>
      </div>

      <div className="fp-stage">
        {/* Floating card */}
        <div className={`fp-card fp-card--${direction} ${animating ? "fp-card--exit" : "fp-card--enter"}`}>
          {/* Left: image */}
          <div className="fp-card-img">
            {p.image
              ? <img src={p.image} alt={p.name} />
              : (
                <div className="fp-card-img-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="var(--gray-400)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              )
            }
          </div>

          {/* Right: info */}
          <div className="fp-card-info">
            <div className="fp-card-tags">
              {p.category && (
                <span className="fp-tag fp-tag--cat">{p.category}</span>
              )}
              {p.type && (
                <span className="fp-tag fp-tag--type">{p.type}</span>
              )}
            </div>

            <h3 className="fp-card-name">{p.name}</h3>

            <div className="fp-card-actions">
              <Link href={`/productos/${p.slug}`} className="fp-btn-details">
                Ver detalles
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={`/productos/${p.slug}#cotizar`} className="fp-btn-cotizar">
                Cotizar
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="fp-controls">
          <button className="fp-arrow" onClick={prev} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="fp-dots">
            {products.map((_, i) => (
              <button
                key={i}
                className={`fp-dot ${i === active ? "fp-dot--active" : ""}`}
                onClick={() => go(i, i > active ? "right" : "left")}
                aria-label={`Producto ${i + 1}`}
              />
            ))}
          </div>

          <button className="fp-arrow" onClick={next} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}