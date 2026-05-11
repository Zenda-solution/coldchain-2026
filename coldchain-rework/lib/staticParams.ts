import { client } from "@/lib/client";

type SlugRow = { slug?: string | null };

function toUniqueSlugs(rows: SlugRow[]): string[] {
  return [...new Set(rows.map((row) => row.slug?.trim()).filter((slug): slug is string => !!slug))];
}

async function fetchSlugsByType(type: "product" | "category"): Promise<string[]> {
  try {
    const rows = await client.fetch<SlugRow[]>(
      `*[_type == $type && defined(slug.current)]{ "slug": slug.current }`,
      { type }
    );

    return toUniqueSlugs(rows);
  } catch (error) {
    throw new Error(`No se pudieron obtener slugs estáticos para ${type}: ${String(error)}`);
  }
}

export async function getProductStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await fetchSlugsByType("product");
  return slugs.map((slug) => ({ slug }));
}

export async function getCategoryStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await fetchSlugsByType("category");
  return slugs.map((slug) => ({ slug }));
}
