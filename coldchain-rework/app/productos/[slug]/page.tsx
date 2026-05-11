import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { client } from "@/lib/client";
import { getProductStaticParams } from "@/lib/staticParams";
import { Footer } from "@/components/Footer";

const BASE = "https://coldchain.com.ec";

export const dynamic = "force-static";
export const dynamicParams = false;

const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  tensiometro: "tensiometro-irrometer",
  "jeringa-irromet": "jeringa-irrometer",
};

function resolveProductSlug(slug: string): string {
  return PRODUCT_SLUG_ALIASES[slug] ?? slug;
}

function formatBrandName(brand?: string | null) {
  if (!brand) return "Coldchain";

  return brand
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

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
      "categoryId": category._ref,

      "type": productType->title,
      "typeId": productType._ref,

      "brand": marca->title,
      "brandSlug": marca->slug.current,
      "brandId": marca._ref,

      "sku": sku
    }`,
    { slug }
  );
}

async function getRelatedProducts(product: {
  slug: string;
  categoryId?: string | null;
  typeId?: string | null;
  brandId?: string | null;
}) {
  return client.fetch(
    `*[
      _type == "product" &&
      defined(slug.current) &&
      slug.current != $slug &&
      (
        ($brandId != null && marca._ref == $brandId) ||
        ($typeId != null && productType._ref == $typeId) ||
        ($categoryId != null && category._ref == $categoryId)
      )
    ] | order(
      select($brandId != null && marca._ref == $brandId => 0, 1),
      select($typeId != null && productType._ref == $typeId => 0, 1),
      title asc
    )[0...8]{
      _id,
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "categorySlug": category->slug.current,
      "type": productType->title,
      "brand": marca->title,
      "brandSlug": marca->slug.current
    }`,
    {
      slug: product.slug,
      categoryId: product.categoryId ?? null,
      typeId: product.typeId ?? null,
      brandId: product.brandId ?? null,
    }
  );
}

async function getFeaturedProducts(currentSlug: string) {
  const featuredProducts = await client.fetch(
    `*[
      _type == "product" &&
      defined(slug.current) &&
      slug.current != $currentSlug &&
      (
        title match "*Proyem*" ||
        title match "*PROYEM*" ||
        title match "*proyem*" ||

        title match "*Tensiómetro Irrometer*" ||
        title match "*Tensiometro Irrometer*" ||
        title match "*tensiómetro irrometer*" ||
        title match "*tensiometro irrometer*" ||
        title match "*TENSIOMETRO IRROMETER*" ||
        title match "*TENSIÓMETRO IRROMETER*" ||

        title match "*TempTale GEO LTE*" ||
        title match "*Temptale GEO LTE*" ||
        title match "*TEMPTALE GEO LTE*" ||
        title match "*TempTale*" ||
        title match "*Temptale*" ||
        title match "*temptale*"
      )
    ]{
      _id,
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "categorySlug": category->slug.current,
      "type": productType->title,
      "brand": marca->title,
      "brandSlug": marca->slug.current
    }`,
    { currentSlug }
  );

  const desiredOrder = ["proyem", "tensiometro irrometer", "temptale geo lte"];

  return featuredProducts
    .sort((a: { name: string }, b: { name: string }) => {
      const aName = normalizeText(a.name);
      const bName = normalizeText(b.name);

      const aIndex = desiredOrder.findIndex((term) => aName.includes(term));
      const bIndex = desiredOrder.findIndex((term) => bName.includes(term));

      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    })
    .slice(0, 3);
}

export async function generateStaticParams() {
  const canonicalParams = await getProductStaticParams();
  const aliasParams = Object.keys(PRODUCT_SLUG_ALIASES).map((slug) => ({ slug }));

  return [...canonicalParams, ...aliasParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(resolveProductSlug(slug));

  if (!product) return {};

  const title = `${product.name} en Ecuador`;
  const description = `Cotiza el ${product.name} en Ecuador. Equipo profesional para medición agrícola, laboratorio e industria. Disponible con Coldchain.`;
  const imageUrl = product.image ?? `${BASE}/og-default.png`;
  const url = `${BASE}/productos/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Coldchain`,
      description,
      url,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${product.name} en Ecuador`,
        },
      ],
    },
    twitter: {
      title: `${title} | Coldchain`,
      description,
    },
  };
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = resolveProductSlug(slug);
  const product = await getProduct(resolvedSlug);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);
  const featuredProducts = await getFeaturedProducts(product.slug);

  const url = `${BASE}/productos/${product.slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? "",
    image: product.image ? [product.image] : [],
    sku: product.sku ?? slug,
    brand: {
      "@type": "Brand",
      name: formatBrandName(product.brand),
    },
    category: product.category ?? "",
    url,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url,
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Coldchain",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: `${BASE}/productos`,
      },
      ...(product.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.category,
              item: `${BASE}/categorias/${
                product.categorySlug ??
                product.category.toLowerCase().replace(/\s+/g, "-")
              }`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product.name,
              item: url,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: url,
            },
          ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        featuredProducts={featuredProducts}
      />

      <Footer />
    </>
  );
}