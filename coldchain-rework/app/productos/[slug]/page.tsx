import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { client } from "@/lib/client";

const BASE = "https://coldchain.com.ec";

async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "categorySlug": category->slug.current,
      "type": productType->title,
      "sku": sku
    }`,
    { slug }
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`
    *[_type == "product" && defined(slug.current)]{ "slug": slug.current }
  `);
  return slugs.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const title = `${product.name} en Ecuador`;
  const description = `Cotiza el ${product.name} en Ecuador. Equipo profesional para medición agrícola, laboratorio e industria. Disponible con Coldchain.`;
  const imageUrl = product.image ?? `${BASE}/og-default.png`;
  const url = `${BASE}/productos/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Coldchain`,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, width: 800, height: 600, alt: `${product.name} en Ecuador` }],
    },
    twitter: { title: `${title} | Coldchain`, description },
  };
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedNames = ["Proyem", "Irrometer", "Termógrafos"];

const relatedProducts = await client.fetch(
  `*[
    _type == "product" &&
    slug.current != $slug &&
    (
      title match "*Proyem*" ||
      title match "*Irrometer*" ||
      title match "*termógrafo*" ||
      title match "*termografo*" ||
      title match "*Termógrafos*" ||
      title match "*Termografos*"
    )
  ][0...3]{
    _id,
    "name": title,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    "pdf": technicalFile.asset->url,
    "category": category->title,
    "type": productType->title
  }`,
  { slug }
);

  const url = `${BASE}/productos/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? "",
    image: product.image ? [product.image] : [],
    sku: product.sku ?? slug,
    brand: { "@type": "Brand", name: "Coldchain" },
    category: product.category ?? "",
    url,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url,
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "Coldchain" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${BASE}/productos` },
      ...(product.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.category,
              item: `${BASE}/categorias/${product.categorySlug ?? product.category.toLowerCase().replace(/\s+/g, "-")}`,
            },
            { "@type": "ListItem", position: 4, name: product.name, item: url },
          ]
        : [{ "@type": "ListItem", position: 3, name: product.name, item: url }]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
