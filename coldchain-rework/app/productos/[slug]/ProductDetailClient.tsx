"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Download,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import type { Product as LocalProduct } from "@/lib/localProducts";
import { WHATSAPP_COTIZAR, MESSAGES } from "@/lib/siteConfig";

type Product = LocalProduct & {
  marca?: string | null;
};

function getProductImageUrl(image?: string | null) {
  if (!image) return "/images/placeholder.webp";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;
  return `/images/${image}`;
}

function formatBrandName(brand?: string | null) {
  if (!brand) return "";

  return brand
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
  featuredProducts = [],
}: {
  product: Product;
  relatedProducts?: Product[];
  featuredProducts?: Product[];
}) {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [waHover, setWaHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [relatedPage, setRelatedPage] = useState(0);
  const [featuredTransitioning, setFeaturedTransitioning] = useState(false);
  const [relatedTransitioning, setRelatedTransitioning] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 760) setScreen("mobile");
      else if (width <= 1100) setScreen("tablet");
      else setScreen("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
  if (featuredProducts.length <= 1) return;

  const interval = window.setInterval(() => {
    const nextIndex =
      featuredIndex === featuredProducts.length - 1 ? 0 : featuredIndex + 1;

    changeFeaturedSlide(nextIndex);
  }, 4000);

  return () => window.clearInterval(interval);
}, [featuredIndex, featuredProducts.length]);


  const waLink = useMemo(() => {
    const message = `Hola, me gustaría recibir información, precios y disponibilidad del producto: *${product.name}*.`;
    return `https://wa.me/${WHATSAPP_COTIZAR}?text=${encodeURIComponent(message)}`;
  }, [product.name]);

  const productBrand = product.brand ?? product.marca ?? null;
  const formattedProductBrand = formatBrandName(productBrand);

  const specs = [
    { label: "Categoría", value: product.category },
    { label: "Tipo", value: product.type },
    { label: "Marca", value: formattedProductBrand || undefined },
    { label: "Presentación", value: product.presentation },
    { label: "Ingrediente activo", value: product.activeIngredient },
    { label: "Registro", value: product.registrationNumber },
  ].filter((item) => item.value);

  const hasFeatures = !!product.features?.length;
  const hasApplications = !!product.applications?.length;
  const hasSpecs = specs.length > 0;
  const hasRelated = relatedProducts.length > 0;
  const hasFeatured = featuredProducts.length > 0;

  const activeFeatured = featuredProducts[featuredIndex];

  const relatedItemsPerPage =
    screen === "desktop" ? 4 : screen === "tablet" ? 2 : 1;

  const relatedPages = Math.ceil(relatedProducts.length / relatedItemsPerPage);

  const visibleRelatedProducts = relatedProducts.slice(
    relatedPage * relatedItemsPerPage,
    relatedPage * relatedItemsPerPage + relatedItemsPerPage
  );

 useEffect(() => {
  setRelatedPage(0);
  setRelatedTransitioning(false);
}, [screen, relatedProducts.length]);

  const goToPreviousFeatured = () => {
  const nextIndex =
    featuredIndex === 0 ? featuredProducts.length - 1 : featuredIndex - 1;

  changeFeaturedSlide(nextIndex);
};

const goToNextFeatured = () => {
  const nextIndex =
    featuredIndex === featuredProducts.length - 1 ? 0 : featuredIndex + 1;

  changeFeaturedSlide(nextIndex);
};

const changeRelatedPage = (nextPage: number) => {
  if (nextPage === relatedPage || relatedPages <= 1) return;

  setRelatedTransitioning(true);

  window.setTimeout(() => {
    setRelatedPage(nextPage);
    setRelatedTransitioning(false);
  }, 180);
};

const goToPreviousRelated = () => {
  const nextPage = relatedPage === 0 ? relatedPages - 1 : relatedPage - 1;
  changeRelatedPage(nextPage);
};

const goToNextRelated = () => {
  const nextPage = relatedPage === relatedPages - 1 ? 0 : relatedPage + 1;
  changeRelatedPage(nextPage);
};
  

const changeFeaturedSlide = (nextIndex: number) => {
  if (nextIndex === featuredIndex || featuredProducts.length <= 1) return;

  setFeaturedTransitioning(true);

  window.setTimeout(() => {
    setFeaturedIndex(nextIndex);
    setFeaturedTransitioning(false);
  }, 180);
};


  const shellWidth =
    screen === "desktop"
      ? "min(1240px, calc(100% - 44px))"
      : "min(100% - 28px, 1240px)";

  const outerColumns =
    screen === "desktop"
      ? "minmax(0, 1fr) 300px"
      : "1fr";

  const heroColumns =
    screen === "mobile"
      ? "1fr"
      : "320px minmax(0, 1fr)";

  const infoColumns =
    screen === "mobile"
      ? "1fr"
      : "repeat(2, minmax(0, 1fr))";

  const sectionTitle: React.CSSProperties = {
    margin: 0,
    color: "var(--navy)",
    fontSize: "0.82rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  };

  const tagBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 12px",
    height: 30,
    borderRadius: 999,
    fontSize: "0.7rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
  };

  const softCard: React.CSSProperties = {
    borderRadius: 24,
    border: "1px solid rgba(14, 51, 107, 0.10)",
    background: "rgba(255,255,255,0.94)",
    boxShadow: "0 14px 38px rgba(14, 51, 107, 0.07)",
    backdropFilter: "blur(8px)",
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f7fbff 42%, #ffffff 100%)",
        color: "var(--gray-800)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          width: shellWidth,
          margin: "0 auto",
          padding: screen === "mobile" ? "18px 0 48px" : "26px 0 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 126,
            right: screen === "mobile" ? 8 : 12,
            width: screen === "mobile" ? 80 : 170,
            height: 3,
            borderRadius: 999,
            background: "linear-gradient(90deg, transparent, var(--blue))",
            opacity: 0.65,
            pointerEvents: "none",
          }}
        />

        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: screen === "mobile" ? 6 : 8,
            flexWrap: "wrap",
            marginBottom: screen === "mobile" ? 18 : 26,
            color: "var(--gray-400)",
            fontSize: screen === "mobile" ? "0.66rem" : "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <Link href="/" style={{ color: "var(--gray-600)", textDecoration: "none" }}>
            Inicio
          </Link>
          <ChevronRight size={14} color="currentColor" />
          <Link
            href="/productos"
            style={{ color: "var(--gray-600)", textDecoration: "none" }}
          >
            Catálogo
          </Link>
          <ChevronRight size={14} color="currentColor" />
          <span style={{ color: "var(--navy)", fontWeight: 800 }}>{product.name}</span>
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 46,
              height: 6,
              borderRadius: 999,
              background: "var(--yellow)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: "100%",
              height: 1,
              background:
                "linear-gradient(90deg, rgba(14, 51, 107, 0.20), rgba(14, 51, 107, 0.03))",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: outerColumns,
            gap: screen === "desktop" ? 24 : 22,
            alignItems: "start",
          }}
        >
          <section style={{ minWidth: 0 }}>
            <div
              style={{
                ...softCard,
                padding: screen === "mobile" ? 18 : 22,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 8,
                  height: "100%",
                  background:
                    "linear-gradient(180deg, var(--blue) 0%, #7ab2ff 60%, var(--yellow) 100%)",
                }}
              />

              <div
                style={{
                  paddingLeft: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: heroColumns,
                    gap: screen === "mobile" ? 18 : 28,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: screen === "mobile" ? "flex-start" : "center",
                      textAlign: screen === "mobile" ? "left" : "center",
                      gap: 16,
                      height: "100%",
                    }}
                  >
                    <h1
                      style={{
                        margin: 0,
                        color: "var(--navy)",
                        fontSize:
                          screen === "mobile"
                            ? "clamp(1.9rem, 8vw, 2.6rem)"
                            : "clamp(2.4rem, 3.2vw, 3.2rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.04em",
                        fontWeight: 800,
                      }}
                    >
                      {product.name}
                    </h1>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        justifyContent: screen === "mobile" ? "flex-start" : "center",
                      }}
                    >
                      {product.category && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(40, 123, 255, 0.10)",
                            color: "var(--blue)",
                            border: "1px solid rgba(40, 123, 255, 0.18)",
                          }}
                        >
                          {product.category}
                        </span>
                      )}

                      {product.type && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(234, 179, 8, 0.14)",
                            color: "var(--navy)",
                            border: "1px solid rgba(234, 179, 8, 0.22)",
                          }}
                        >
                          {product.type}
                        </span>
                      )}

                      {formattedProductBrand && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(15, 23, 42, 0.05)",
                            color: "var(--navy)",
                            border: "1px solid rgba(15, 23, 42, 0.10)",
                          }}
                        >
                          {formattedProductBrand}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        width: 80,
                        height: 4,
                        borderRadius: 999,
                        background:
                          "linear-gradient(90deg, var(--blue), var(--yellow))",
                      }}
                    />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        maxWidth: 260,
                        margin: "0 auto",
                        width: "100%",
                        aspectRatio: "4 / 5",
                        borderRadius: 22,
                        overflow: "hidden",
                        background: "linear-gradient(180deg, #ffffff 0%, #f7fafc 100%)",
                        border: "1px solid rgba(14, 51, 107, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={getProductImageUrl(product.image)}
                        alt={product.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "80%",
                          objectFit: "contain",
                          display: "block",
                          padding: 18,
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <h2 style={sectionTitle}>Descripción</h2>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--gray-600)",
                      fontSize: screen === "mobile" ? "0.95rem" : "0.98rem",
                      lineHeight: 1.72,
                      maxWidth: "74ch",
                    }}
                  >
                    {product.description}
                  </p>
                </div>

                {(product.pdf || hasSpecs) && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: infoColumns,
                      gap: 20,
                    }}
                  >
                    {product.pdf ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        <h2 style={sectionTitle}>Ficha técnica</h2>

                        <a
                          href={product.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            padding: 14,
                            borderRadius: 16,
                            background:
                              "linear-gradient(180deg, #f8fbff 0%, #f2f7ff 100%)",
                            border: "1px solid rgba(40, 123, 255, 0.16)",
                            textDecoration: "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 12,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--yellow)",
                                color: "var(--navy)",
                                fontSize: "0.68rem",
                                fontWeight: 900,
                                letterSpacing: "0.1em",
                                flexShrink: 0,
                              }}
                            >
                              PDF
                            </span>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                minWidth: 0,
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--navy)",
                                  fontSize: "0.92rem",
                                  fontWeight: 800,
                                  lineHeight: 1.2,
                                }}
                              >
                                Descargar documento
                              </span>
                              <span
                                style={{
                                  marginTop: 2,
                                  color: "var(--gray-500)",
                                  fontSize: "0.78rem",
                                  lineHeight: 1.35,
                                }}
                              >
                                Información técnica del producto
                              </span>
                            </div>
                          </div>

                          <Download size={18} color="var(--navy)" />
                        </a>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        <h2 style={sectionTitle}>Ficha técnica</h2>

                        <div
                          role="status"
                          aria-live="polite"
                          style={{
                            padding: 14,
                            borderRadius: 16,
                            background:
                              "linear-gradient(180deg, #f8fbff 0%, #f2f7ff 100%)",
                            border: "1px solid rgba(40, 123, 255, 0.08)",
                            color: "var(--gray-500)",
                            fontSize: "0.95rem",
                          }}
                        >
                          {MESSAGES.pdfNotAvailable}
                        </div>
                      </div>
                    )}

                    {hasSpecs && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        <h2 style={sectionTitle}>Especificaciones</h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                          }}
                        >
                          {specs.map((spec, index) => (
                            <div
                              key={spec.label}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                paddingBottom: index === specs.length - 1 ? 0 : 12,
                                borderBottom:
                                  index === specs.length - 1
                                    ? "none"
                                    : "1px solid rgba(14, 51, 107, 0.09)",
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--gray-400)",
                                  fontSize: "0.68rem",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                }}
                              >
                                {spec.label}
                              </span>

                              <span
                                style={{
                                  color: "var(--navy)",
                                  fontSize: "0.94rem",
                                  fontWeight: 700,
                                  lineHeight: 1.45,
                                }}
                              >
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(hasApplications || hasFeatures) && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: infoColumns,
                      gap: 20,
                    }}
                  >
                    {hasApplications && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        <h2 style={sectionTitle}>Aplicaciones</h2>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "var(--gray-600)",
                            display: "grid",
                            gap: 8,
                          }}
                        >
                          {product.applications!.map((item, index) => (
                            <li key={`${item}-${index}`} style={{ lineHeight: 1.6 }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hasFeatures && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        <h2 style={sectionTitle}>Características</h2>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "var(--gray-600)",
                            display: "grid",
                            gap: 8,
                          }}
                        >
                          {product.features!.map((item, index) => (
                            <li key={`${item}-${index}`} style={{ lineHeight: 1.6 }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside style={{ minWidth: 0 }}>
            <div
              style={{
                position: screen === "desktop" ? "sticky" : "static",
                top: screen === "desktop" ? 110 : undefined,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid rgba(37, 211, 102, 0.18)",
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #f3fff8 100%)",
                  boxShadow: "0 16px 40px rgba(37, 211, 102, 0.10)",
                  padding: screen === "mobile" ? 18 : 22,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    background:
                      "linear-gradient(90deg, #25d366 0%, #18b85a 100%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: -28,
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: "rgba(37, 211, 102, 0.08)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: -26,
                    left: -20,
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "rgba(234, 179, 8, 0.09)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ ...sectionTitle, color: "#159c4c" }}>
                      Cotización
                    </span>

                    <h3
                      style={{
                        margin: 0,
                        color: "var(--navy)",
                        fontSize: screen === "mobile" ? "1.2rem" : "1.35rem",
                        lineHeight: 1.05,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Solicite este producto por WhatsApp
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "var(--gray-600)",
                        fontSize: "0.93rem",
                        lineHeight: 1.65,
                      }}
                    >
                      Contacte a nuestro equipo para consultar disponibilidad,
                      precios y detalles comerciales de manera rápida.
                    </p>
                  </div>

                  <div
                    style={{
                      width: 64,
                      height: 4,
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #25d366, var(--yellow))",
                    }}
                  />

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setWaHover(true)}
                    onMouseLeave={() => setWaHover(false)}
                    style={{
                      width: "100%",
                      minHeight: 50,
                      padding: "0 18px",
                      borderRadius: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      textDecoration: "none",
                      background: waHover ? "#1db954" : "#25d366",
                      color: "white",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      boxShadow: waHover
                        ? "0 18px 34px rgba(37, 211, 102, 0.32)"
                        : "0 14px 26px rgba(37, 211, 102, 0.18)",
                      transform: waHover
                        ? "translateY(-2px) scale(1.015)"
                        : "translateY(0) scale(1)",
                      transition:
                        "background 180ms ease, box-shadow 180ms ease, transform 180ms ease",
                      cursor: "pointer",
                    }}
                  >
                    <span>Solicitar cotización</span>
                    <ArrowRight size={16} />
                  </a>

                  <div
                    style={{
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.72)",
                      border: "1px solid rgba(37, 211, 102, 0.10)",
                      padding: "14px 14px 13px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "var(--gray-500)",
                        fontSize: "0.8rem",
                        lineHeight: 1.55,
                      }}
                    >
                      Respuesta rápida para consultas de producto, precio y disponibilidad.
                    </p>
                  </div>
                </div>
              </div>

              {hasFeatured && activeFeatured && (
                <div
                  style={{
                    borderRadius: 24,
                    border: "1px solid rgba(14, 51, 107, 0.12)",
                    background:
                      "radial-gradient(circle at top right, rgba(234, 179, 8, 0.22), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                    boxShadow: "0 16px 40px rgba(14, 51, 107, 0.08)",
                    padding: 18,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          ...sectionTitle,
                          color: "var(--blue)",
                          fontSize: "0.68rem",
                        }}
                      >
                        Destacados
                      </span>
                      <h3
                        style={{
                          margin: "6px 0 0",
                          color: "var(--navy)",
                          fontSize: "1rem",
                          fontWeight: 850,
                          lineHeight: 1.1,
                        }}
                      >
                        Productos recomendados
                      </h3>
                    </div>

                    {featuredProducts.length > 1 && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          type="button"
                          onClick={goToPreviousFeatured}
                          aria-label="Producto destacado anterior"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: "1px solid rgba(14, 51, 107, 0.12)",
                            background: "#fff",
                            color: "var(--navy)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={goToNextFeatured}
                          aria-label="Siguiente producto destacado"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: "1px solid rgba(14, 51, 107, 0.12)",
                            background: "#fff",
                            color: "var(--navy)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/productos/${activeFeatured.slug}`}
                    style={{
                      display: "grid",
                      gap: 12,
                      textDecoration: "none",
                      color: "inherit",
                      opacity: featuredTransitioning ? 0 : 1,
                      transform: featuredTransitioning
                        ? "translateX(10px) scale(0.985)"
                        : "translateX(0) scale(1)",
                      transition: "opacity 220ms ease, transform 220ms ease",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4 / 3",
                        borderRadius: 18,
                        background: "#fff",
                        border: "1px solid rgba(14, 51, 107, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 14,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={getProductImageUrl(activeFeatured.image)}
                        alt={activeFeatured.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gap: 8 }}>
                      {activeFeatured.brand && (
                        <span
                          style={{
                            ...tagBase,
                            width: "fit-content",
                            background: "rgba(15, 23, 42, 0.05)",
                            color: "var(--navy)",
                            border: "1px solid rgba(15, 23, 42, 0.10)",
                          }}
                        >
                          {formatBrandName(activeFeatured.brand)}
                        </span>
                      )}

                      <h4
                        style={{
                          margin: 0,
                          color: "var(--navy)",
                          fontSize: "1rem",
                          fontWeight: 850,
                          lineHeight: 1.25,
                        }}
                      >
                        {activeFeatured.name}
                      </h4>

                      <span
                        style={{
                          color: "var(--blue)",
                          fontSize: "0.86rem",
                          fontWeight: 800,
                        }}
                      >
                        Ver producto →
                      </span>
                    </div>
                  </Link>

                  {featuredProducts.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 14,
                      }}
                    >
                      {featuredProducts.map((item, index) => (
                        <button
                          key={item.slug}
                          type="button"
                          onClick={() => changeFeaturedSlide(index)}
                          aria-label={`Ver producto destacado ${index + 1}`}
                          style={{
                            height: 6,
                            flex: 1,
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            background:
                              index === featuredIndex
                                ? "var(--blue)"
                                : "rgba(14, 51, 107, 0.14)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        {hasRelated && (
          <section
            style={{
              marginTop: 58,
              paddingTop: 30,
              borderTop: "1px solid rgba(14, 51, 107, 0.10)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--blue)",
                }}
              />
              <div
                style={{
                  width: 26,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--yellow)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 18,
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 6px",
                    color: "var(--navy)",
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Productos relacionados
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "var(--gray-500)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  Explore productos similares por marca, tipo o categoría.
                </p>
              </div>

              {relatedPages > 1 && (
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={goToPreviousRelated}
                    aria-label="Ver productos relacionados anteriores"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      border: "1px solid rgba(14, 51, 107, 0.14)",
                      background: "#ffffff",
                      color: "var(--navy)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(14, 51, 107, 0.08)",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextRelated}
                    aria-label="Ver más productos relacionados"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      border: "1px solid rgba(14, 51, 107, 0.14)",
                      background: "var(--blue)",
                      color: "#ffffff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(40, 123, 255, 0.18)",
                    }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    screen === "desktop"
                      ? "repeat(4, minmax(0, 1fr))"
                      : screen === "tablet"
                        ? "repeat(2, minmax(0, 1fr))"
                        : "1fr",
                  gap: 20,
                  opacity: relatedTransitioning ? 0 : 1,
                  transform: relatedTransitioning
                    ? "translateX(12px) scale(0.99)"
                    : "translateX(0) scale(1)",
                  transition: "opacity 220ms ease, transform 220ms ease",
                }}
              >
              {visibleRelatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/productos/${item.slug}`}
                  onMouseEnter={() => setHoveredCard(item.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...softCard,
                    overflow: "hidden",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    transform:
                      hoveredCard === item.slug ? "translateY(-6px)" : "translateY(0)",
                    boxShadow:
                      hoveredCard === item.slug
                        ? "0 22px 48px rgba(14, 51, 107, 0.14)"
                        : softCard.boxShadow,
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4 / 3",
                      background:
                        "linear-gradient(180deg, #f8fbff 0%, #f5f8fb 100%)",
                      overflow: "hidden",
                      borderBottom: "1px solid rgba(14, 51, 107, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 14,
                    }}
                  >
                    <img
                      src={getProductImageUrl(item.image)}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {item.category && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(40, 123, 255, 0.10)",
                            color: "var(--blue)",
                            border: "1px solid rgba(40, 123, 255, 0.18)",
                          }}
                        >
                          {item.category}
                        </span>
                      )}

                      {item.type && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(234, 179, 8, 0.14)",
                            color: "var(--navy)",
                            border: "1px solid rgba(234, 179, 8, 0.22)",
                          }}
                        >
                          {item.type}
                        </span>
                      )}

                      {item.brand && (
                        <span
                          style={{
                            ...tagBase,
                            background: "rgba(15, 23, 42, 0.05)",
                            color: "var(--navy)",
                            border: "1px solid rgba(15, 23, 42, 0.10)",
                          }}
                        >
                          {formatBrandName(item.brand)}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        color: "var(--navy)",
                        fontSize: "1rem",
                        fontWeight: 800,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.name}
                    </h3>

                    <span
                      style={{
                        color: "var(--blue)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                      }}
                    >
                      Ver producto
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {relatedPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 7,
                  marginTop: 18,
                }}
              >
                {Array.from({ length: relatedPages }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => changeRelatedPage(index)}
                    aria-label={`Ver grupo de productos relacionados ${index + 1}`}
                    style={{
                      width: index === relatedPage ? 28 : 8,
                      height: 8,
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      background:
                        index === relatedPage
                          ? "var(--blue)"
                          : "rgba(14, 51, 107, 0.16)",
                      transition: "width 180ms ease, background 180ms ease",
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}