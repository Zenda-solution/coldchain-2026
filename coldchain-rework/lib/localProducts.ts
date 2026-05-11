/**
 * Shared Product type used across the app.
 * Fields map to Sanity schema projections.
 */
export type Product = {
  _id?: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  pdf?: string | null;
  category?: string | null;
  /** Slug of the category, used to build /categorias/[slug] links */
  categorySlug?: string | null;
  type?: string | null;
  brand?: string | null;
  brandSlug?: string | null;
  sku?: string | null;
  presentation?: string | null;
  activeIngredient?: string | null;
  registrationNumber?: string | null;
  features?: string[];
  applications?: string[];
};