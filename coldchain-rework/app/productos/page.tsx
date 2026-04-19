import { Suspense } from "react";
import CatalogClient from "./CatalogClient";
import { getAllProducts, Product as LocalProduct } from "@/lib/localProducts";

export type Product = LocalProduct;

export default async function ProductosPage() {
  const products = getAllProducts();

  return (
    <Suspense fallback={<div>Loading catálogo…</div>}>
      <CatalogClient products={products} />
    </Suspense>
  );
}
