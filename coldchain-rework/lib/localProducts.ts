/**
 * Shared Product type used across the app.
 * Fields map to Sanity schema projections.
 */
export type Product = {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  pdf?: string;
  category?: string;
  /** Slug of the category, used to build /categorias/[slug] links */
  categorySlug?: string;
  type?: string;
  sku?: string;
  presentation?: string;
  activeIngredient?: string;
  registrationNumber?: string;
  features?: string[];
  applications?: string[];
};
