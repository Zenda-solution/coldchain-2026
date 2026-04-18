import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

type Product = {
  name: string;
  slug: string;
  description: string;
  image: string;
  pdf: string;
  category: string;
  type?: string;
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
      "pdf": pdf.asset->url,
      category,
      type,
      features,
      applications,
      presentation,
      activeIngredient,
      registrationNumber
    }`,
    { slug }
  );

  if (!product) notFound();

  const relatedProducts = await client.fetch<Product[]>(
    `*[
      _type == "product" &&
      slug.current != $slug &&
      category == $category
    ][0...3]{
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": pdf.asset->url,
      category,
      type,
      features,
      applications,
      presentation,
      activeIngredient,
      registrationNumber
    }`,
    {
      slug,
      category: product.category,
    }
  );

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}