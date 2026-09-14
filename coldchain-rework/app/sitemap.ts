export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { client } from "@/lib/client";

const BASE = "https://www.coldchain.com.ec";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products: { slug: string; _updatedAt?: string }[] =
    await client.fetch(`
      *[_type == "product" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/productos/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/contacto/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/productos/${p.slug}/`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}