import { Suspense } from "react";
import CatalogClient from "@/app/productos/CatalogClient";
import { client } from "@/lib/client";
import type { Metadata } from "next";
import type { Product } from "@/app/productos/page";

const BASE = "https://coldchain.com.ec";

async function getCategoryProducts(slug: string): Promise<{ category: string | null; products: Product[] }> {
  const category: { title: string } | null = await client
    .fetch(`*[_type == "category" && slug.current == $slug][0]{ title }`, { slug })
    .catch(() => null);

  const products: Product[] = await client.fetch(
    `*[_type == "product" && category->slug.current == $slug] | order(title asc) {
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

  return { category: category?.title ?? null, products };
}

export async function generateStaticParams() {
  const categories = await client
    .fetch(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`)
    .catch(() => []);
  return categories.map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategoryProducts(slug);
  const name = category ?? slug;
  const title = `${name} en Ecuador`;
  const description = `Encuentra ${name.toLowerCase()} para agricultura, laboratorio e industria en Ecuador. Cotiza equipos profesionales con Coldchain.`;
  const url = `${BASE}/categorias/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Coldchain`, description, url, type: "website" },
    twitter: { title: `${title} | Coldchain`, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { products } = await getCategoryProducts(slug);

  return (
    <Suspense fallback={<div>Cargando categoría…</div>}>
      <CatalogClient products={products} />
    </Suspense>
  );
}
