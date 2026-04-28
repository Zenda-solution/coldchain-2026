import { Suspense } from "react";
import CatalogClient from "./CatalogClient";
import { client } from "@/lib/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Productos para Medición y Análisis en Ecuador",
  description:
    "Explora el catálogo completo de Coldchain: equipos de medición para agricultura, laboratorio e industria en Ecuador. Encuentra el equipo ideal y cotiza hoy.",
  alternates: {
    canonical: "https://coldchain.com.ec/productos",
  },
  openGraph: {
    title: "Catálogo de Equipos de Medición en Ecuador | Coldchain",
    description:
      "Explora el catálogo completo de Coldchain: equipos de medición para agricultura, laboratorio e industria en Ecuador.",
    url: "https://coldchain.com.ec/productos",
    type: "website",
  },
  twitter: {
    title: "Catálogo de Equipos de Medición en Ecuador | Coldchain",
    description:
      "Explora el catálogo completo de Coldchain: equipos de medición para agricultura, laboratorio e industria en Ecuador.",
  },
};


// Product type is defined centrally in lib/localProducts
export type { Product } from "@/lib/localProducts";
import type { Product } from "@/lib/localProducts";

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