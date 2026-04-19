import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getAllProducts, getProductBySlug } from "@/lib/localProducts";

export async function generateStaticParams() {
  const slugs = getAllProducts().map((p) => p.slug);
  return slugs.map((s) => ({ slug: s }));
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getAllProducts()
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}