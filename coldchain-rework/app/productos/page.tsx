import { Suspense } from "react";
import { client } from "@/lib/sanity";
import CatalogClient from "./CatalogClient";

export type Product = {
  name: string;
  slug: string;
  description: string;
  image: string;
  pdf: string;
  category: string;
};

export default async function ProductosPage() {
  const products = await client.fetch<Product[]>(
    `*[_type == "product"] | order(name asc) {
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf":   pdf.asset->url,
      category
    }`
  );

  return (
    <Suspense fallback={<div>Loading catálogo…</div>}>
      <CatalogClient products={products} />
    </Suspense>
  );
}
