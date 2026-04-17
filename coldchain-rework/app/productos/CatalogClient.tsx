"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import type { Product } from "./page";

const WHATSAPP = "593999999999"; // ← reemplaza con tu número
const ALL = "Todos";

function waLink(name: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hola, me gustaría cotizar el producto: *${name}*. ¿Podrían darme más información?`
  )}`;
}

export default function CatalogClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch]                 = useState("");
  const [sidebarOpen, setSidebarOpen]       = useState(false);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive the selected category from the URL param when present;
  // fall back to internal `activeCategory` when no param exists.
  const param = searchParams?.get("categoria");

  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const findCategoryFromParam = (catParam?: string | null) => {
    if (!catParam) return null;
    const direct = categories.find((c) => c.toLowerCase() === catParam.toLowerCase());
    if (direct) return direct;
    const paramNorm = normalize(catParam);
    const fuzzy = categories.find((c) => {
      const cNorm = normalize(c);
      return cNorm === paramNorm || cNorm.includes(paramNorm) || paramNorm.includes(cNorm);
    });
    if (fuzzy) return fuzzy;
    if (catParam.toLowerCase() === ALL.toLowerCase()) return ALL;
    return null;
  };

  const paramCategory = findCategoryFromParam(param);
  const selectedCategory = param ? (paramCategory ?? ALL) : activeCategory;

  const filtered = products.filter((p) => {
    const matchCat  = selectedCategory === ALL || p.category === selectedCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* HERO */}
      <header className="catalog-hero">
        <div className="catalog-hero-bg" aria-hidden="true" />
        <div className="catalog-hero-inner">
          <span className="catalog-hero-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Catálogo
          </span>
          <h1 className="catalog-hero-title">
            Nuestros <strong>Productos</strong>
          </h1>
          <p className="catalog-hero-sub">
            Soluciones agrícolas especializadas para cada etapa del campo
          </p>
        </div>
      </header>

      {/* BODY */}
      <div className="catalog-body">

        {/* Mobile filter toggle */}
        <button
          className="mobile-filter-btn"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtrar por categoría
          {selectedCategory !== ALL && <span className="filter-active-dot" />}
        </button>

        {/* SIDEBAR */}
        <aside className={`catalog-sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
          <div className="sidebar-section-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Categorías
          </div>

          <ul className="cat-list">
            {[ALL, ...categories].map((cat) => (
              <li key={cat}>
                <button
                  className={`cat-btn${selectedCategory === cat ? " active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSidebarOpen(false);
                    router.push(`/productos?categoria=${encodeURIComponent(cat)}`);
                  }}
                >
                  <span className="cat-dot" />
                  {cat}
                  <span className="cat-count">
                    {cat === ALL
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="sidebar-divider" />

          <p className="sidebar-help-text">
            ¿Necesita asesoría personalizada sobre nuestros productos?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, necesito asesoría sobre sus productos agrícolas.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-wa-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar ahora
          </a>
        </aside>

        {/* MAIN */}
        <main className="catalog-main">
          {/* Search */}
          <div className="search-row">
            <div className="search-wrap">
              <svg className="search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar productos…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")} aria-label="Limpiar">×</button>
              )}
            </div>
            <span className="result-count">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </span>
          </div>

          {/* Active filter chip */}
          {selectedCategory !== ALL && (
            <div className="active-filter-chip">
              <span>{selectedCategory}</span>
              <button
                onClick={() => {
                  setActiveCategory(ALL);
                  router.push('/productos');
                }}
                aria-label="Quitar filtro"
              >×</button>
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No se encontraron productos</p>
              <button onClick={() => { setSearch(""); setActiveCategory(ALL); router.push('/productos'); }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((product, i) => (
                <article
                  key={product.slug}
                  className="product-card"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {/* Image */}
                  <div className="card-img-wrap">
                    {product.image ? (
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <div className="card-img-placeholder">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                    {product.category && (
                      <span className="card-cat-badge">{product.category}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <h2 className="card-name">{product.name}</h2>
                    {product.description && (
                      <p className="card-desc">{product.description}</p>
                    )}
                    <div className="card-actions">
                      <Link href={`/productos/${product.slug}`} className="btn-details">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        Ver más
                      </Link>
                      <a
                        href={waLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cotizar"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Cotizar
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}