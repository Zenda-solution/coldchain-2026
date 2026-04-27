import { Suspense } from "react";
import CatalogClient from "./CatalogClient";
import { client } from "@/lib/client";

export type Product = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  pdf?: string;
  category?: string;
  type?: string;
};

async function getProducts(): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product"] | order(title asc) {
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "type": productType->title
    }
  `);
}

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div>Loading catálogo…</div>}>
      <CatalogClient products={products} />
    </Suspense>
  );
}