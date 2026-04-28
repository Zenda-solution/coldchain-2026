import type { MetadataRoute } from "next";
import { client } from "@/lib/client";

const BASE = "https://coldchain.com.ec";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- Fetch dynamic slugs from Sanity ---
  const products: { slug: string; _updatedAt?: string }[] = await client.fetch(`
    *[_type == "product" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  const categories: { slug: string; _updatedAt?: string }[] = await client.fetch(`
    *[_type == "category" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `).catch(() => []);

  const types: { slug: string; _updatedAt?: string }[] = await client.fetch(`
    *[_type == "productType" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `).catch(() => []);

  // --- Static pages ---
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/productos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // --- Dynamic product pages ---
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/productos/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Dynamic category pages ---
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/categorias/${c.slug}`,
    lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Dynamic type pages ---
  const typePages: MetadataRoute.Sitemap = types.map((t) => ({
    url: `${BASE}/tipos/${t.slug}`,
    lastModified: t._updatedAt ? new Date(t._updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...typePages];
}
