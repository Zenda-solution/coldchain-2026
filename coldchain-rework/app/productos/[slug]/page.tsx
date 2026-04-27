import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { client } from "@/lib/client";

export async function generateStaticParams() {
  const slugs = await client.fetch(`
    *[_type == "product" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  return slugs.map((p: { slug: string }) => ({
    slug: p.slug,
  }));
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "type": productType->title
    }
  `,
    { slug }
  );

  if (!product) notFound();

  const relatedProducts = await client.fetch(
    `
    *[
      _type == "product" &&
      slug.current != $slug &&
      category->title == $category
    ][0...3]{
      _id,
      "name": title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": technicalFile.asset->url,
      "category": category->title,
      "type": productType->title
    }
  `,
    {
      slug,
      category: product.category,
    }
  );

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}