"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Download, ArrowRight } from "lucide-react";
import type { Product as LocalProduct } from "@/lib/localProducts";

const WHATSAPP = "593999999999"; // reemplaza con tu número

type Product = LocalProduct;

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: {
  product: Product;
  relatedProducts?: Product[];
}) {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">("desktop");

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

  const waLink = useMemo(() => {
    const message = `Hola, me gustaría recibir información, precios y disponibilidad del producto: *${product.name}*.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  }, [product.name]);

  const specs = [
    { label: "Categoría", value: product.category },
    { label: "Tipo", value: product.type },
    { label: "Presentación", value: product.presentation },
    { label: "Ingrediente activo", value: product.activeIngredient },
    { label: "Registro", value: product.registrationNumber },
  ].filter((item) => item.value);

  const hasFeatures = !!product.features?.length;
  const hasApplications = !!product.applications?.length;
  const hasSpecs = specs.length > 0;
  const hasRelated = relatedProducts.length > 0;

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
        {/* ambient accent */}
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

        {/* breadcrumb */}
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

        {/* top accent line */}
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

        {/* main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: outerColumns,
            gap: screen === "desktop" ? 24 : 22,
            alignItems: "start",
          }}
        >
          {/* MAIN PRODUCT BLOCK */}
          <section style={{ minWidth: 0 }}>
            <div
              style={{
                ...softCard,
                padding: screen === "mobile" ? 18 : 22,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* vertical accent line */}
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
                {/* top content: image + heading */}
               <div
  style={{
    display: "grid",
    gridTemplateColumns: heroColumns,
    gap: screen === "mobile" ? 18 : 28,
    alignItems: "center", // 🔥 clave para centrar vertical
  }}
>
  {/* LEFT — TITLE CENTERED */}
  <div
    style={{
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // 🔥 vertical center
      alignItems: screen === "mobile" ? "flex-start" : "center", // center desktop
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

        {/* RIGHT — IMAGE */}
        <div style={{ minWidth: 0 }}>
            <div
            style={{

            
            maxWidth: 260, // 👈 ADD THIS
            margin: "0 auto", // 👈 center it inside column
            

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
            {product.image ? (
                <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                style={{
                    width: "100%",
                    height: "80%",
                    objectFit: "contain",
                    display: "block",
                    padding: 18,
                }}
                />
            ) : (
                <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--gray-400)",
                    fontSize: "0.95rem",
                }}
                >
                Sin imagen
                </div>
            )}
            </div>
        </div>
        </div>
                {/* description */}
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

                {/* PDF + specs */}
                {(product.pdf || hasSpecs) && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: infoColumns,
                      gap: 20,
                    }}
                  >
                    {product.pdf && (
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

                {/* applications / features */}
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
                            <li
                              key={`${item}-${index}`}
                              style={{
                                lineHeight: 1.6,
                              }}
                            >
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
                            <li
                              key={`${item}-${index}`}
                              style={{
                                lineHeight: 1.6,
                              }}
                            >
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

          {/* CTA BLOCK */}
          <aside style={{ minWidth: 0 }}>
            <div
              style={{
                position: screen === "desktop" ? "sticky" : "static",
                top: screen === "desktop" ? 110 : undefined,
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        ...sectionTitle,
                        color: "#159c4c",
                      }}
                    >
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
                      background: "#25d366",
                      color: "white",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      boxShadow: "0 14px 26px rgba(37, 211, 102, 0.18)",
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
            </div>
          </aside>
        </div>

        {/* related */}
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

            <div style={{ marginBottom: 20 }}>
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
                Explore más productos similares dentro del catálogo.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  screen === "mobile"
                    ? "1fr"
                    : screen === "tablet"
                    ? "repeat(2, minmax(0, 1fr))"
                    : "repeat(3, minmax(0, 1fr))",
                gap: 20,
              }}
            >
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/productos/${item.slug}`}
                  style={{
                    ...softCard,
                    overflow: "hidden",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4 / 3",
                      background:
                        "linear-gradient(180deg, #f8fbff 0%, #f5f8fb 100%)",
                      overflow: "hidden",
                      borderBottom: "1px solid rgba(14, 51, 107, 0.08)",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "grid",
                          placeItems: "center",
                          color: "var(--gray-400)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Sin imagen
                      </div>
                    )}
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
          </section>
        )}
      </div>
    </div>
  );
}