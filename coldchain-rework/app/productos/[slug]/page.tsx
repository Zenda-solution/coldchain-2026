import { client } from "@/lib/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

const WHATSAPP = "593999999999"; // ← reemplaza con tu número

type Product = {
  name: string;
  slug: string;
  description: string;
  image: string;
  pdf: string;
  category: string;
  features?: string[];
  applications?: string[];
  presentation?: string;
  activeIngredient?: string;
  registrationNumber?: string;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "product"]{ "slug": slug.current }`
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

    const { slug } = await params;

  const product = await client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf":   pdf.asset->url,
      category,
      features,
      applications,
      presentation,
      activeIngredient,
      registrationNumber
    }`,
    { slug }
  
  );

  if (!product) notFound();

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hola, me gustaría cotizar el producto: *${product.name}*. ¿Podrían darme más información y precios?`
  )}`;

  const hasSpecs =
    product.activeIngredient || product.presentation || product.registrationNumber;

  return (
    <div className="detail-root">
      {/* BREADCRUMB */}
      <nav className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <Link href="/" className="bc-link">Inicio</Link>
          <span className="bc-sep">›</span>
          <Link href="/productos" className="bc-link">Catálogo</Link>
          <span className="bc-sep">›</span>
          <span className="bc-current">{product.name}</span>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="detail-container">

        {/* LEFT — IMAGE */}
        <div className="detail-media">
          <div className="detail-img-frame">
            {product.image ? (
              <img src={product.image} alt={product.name} className="detail-img" />
            ) : (
              <div className="detail-img-placeholder">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
            {product.category && (
              <span className="detail-cat-badge">{product.category}</span>
            )}
          </div>

          {product.pdf && (
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-ficha">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Descargar ficha técnica (PDF)
            </a>
          )}
        </div>

        {/* RIGHT — INFO */}
        <div className="detail-info">
          {product.category && (
            <span className="detail-tag">{product.category}</span>
          )}
          <h1 className="detail-title">{product.name}</h1>
          {product.description && (
            <p className="detail-desc">{product.description}</p>
          )}

          {/* SPECS */}
          {hasSpecs && (
            <div className="specs-card">
              <h2 className="specs-title">Información técnica</h2>
              <dl className="specs-grid">
                {product.activeIngredient && (
                  <><dt>Ingrediente activo</dt><dd>{product.activeIngredient}</dd></>
                )}
                {product.presentation && (
                  <><dt>Presentación</dt><dd>{product.presentation}</dd></>
                )}
                {product.registrationNumber && (
                  <><dt>Registro</dt><dd>{product.registrationNumber}</dd></>
                )}
              </dl>
            </div>
          )}

          {/* FEATURES */}
          {product.features && product.features.length > 0 && (
            <div className="detail-list-section">
              <h2 className="detail-list-title">Características</h2>
              <ul className="detail-feature-list">
                {product.features.map((f, i) => (
                  <li key={i}><span className="feat-dot" />{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* APPLICATIONS */}
          {product.applications && product.applications.length > 0 && (
            <div className="detail-list-section">
              <h2 className="detail-list-title">Aplicaciones</h2>
              <ul className="detail-feature-list">
                {product.applications.map((a, i) => (
                  <li key={i}><span className="feat-dot feat-dot-blue" />{a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="detail-cta-block">
            <div>
              <strong className="detail-cta-label">¿Listo para cotizar?</strong>
              <p className="detail-cta-sub">
                Contáctenos por WhatsApp y reciba atención inmediata sobre este producto.
              </p>
            </div>
            <div className="detail-cta-buttons">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa-main">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar por WhatsApp
              </a>
              <Link href="/productos" className="btn-back-catalog">
                ← Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
