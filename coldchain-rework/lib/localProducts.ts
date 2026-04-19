import productsJson from "@/data/products.json";

export type Product = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  pdf?: string;
  category?: string;
  type?: string;
  features?: string[];
  applications?: string[];
  presentation?: string;
  activeIngredient?: string;
  registrationNumber?: string;
};

type RawProduct = {
  nombre?: string;
  descripcion?: string;
  description?: string;
  imagen?: string;
  image?: string;
  pdf?: string;
  type?: string;
  features?: string[];
  applications?: string[];
  presentation?: string;
  activeIngredient?: string;
  registrationNumber?: string;
};

type Tipo = {
  nombre_tipo?: string;
  productos?: RawProduct[];
};

type Categoria = {
  nombre_categoria?: string;
  tipos?: Tipo[];
};

type ProductsFile = {
  categorias?: Categoria[];
};

const slugify = (s?: string) => {
  if (!s) return "";
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export function getAllProducts(): Product[] {
  const products: Product[] = [];
  const raw = productsJson as ProductsFile;
  const seenSlugs = new Set<string>();

  raw?.categorias?.forEach((cat: Categoria) => {
    const catName = (cat.nombre_categoria || "").trim();
    cat?.tipos?.forEach((tipo: Tipo) => {
      const tipoName = (tipo.nombre_tipo || "").trim();
      tipo?.productos?.forEach((p: RawProduct) => {
        const name = (p.nombre || "").trim();
        const description = p.descripcion || p.description || "";
        const image = (p.imagen || p.image || "").trim();
        const pdf = (p.pdf || "").trim();
        const category = catName || tipoName || "";
        const baseSlug = slugify(name) || Math.random().toString(36).slice(2, 8);
        let slug = baseSlug;
        let suffix = 1;
        while (seenSlugs.has(slug)) {
          slug = `${baseSlug}-${suffix++}`;
        }
        seenSlugs.add(slug);

        const prod: Product = {
          name,
          slug,
          description,
          image,
          pdf,
          category,
        };

        // prefer the `tipo` name as product type, fall back to product-level `type` if present
        if (tipoName) prod.type = tipoName;
        else if (p.type) prod.type = p.type;
        if (p.features) prod.features = p.features;
        if (p.applications) prod.applications = p.applications;
        if (p.presentation) prod.presentation = p.presentation;
        if (p.activeIngredient) prod.activeIngredient = p.activeIngredient;
        if (p.registrationNumber) prod.registrationNumber = p.registrationNumber;

        products.push(prod);
      });
    });
  });

  products.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
  return products;
}

export function getProductBySlug(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) ?? null;
}

export function getSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}
