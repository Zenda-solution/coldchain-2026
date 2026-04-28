export type NavCategory = { label: string; param?: string };

export const WHATSAPP = "593958871713";

export const NAV_CATEGORIES: NavCategory[] = [
  { label: "Agricultura", param: "Agricultura" },
  { label: "Climatización", param: "Climatización" },
  { label: "Instrumentos y Equipos de Medición", param: "Instrumentos y Equipos de Medición" },
  { label: "Logística y Transporte", param: "Logística y Transporte" },
  { label: "Termohigrómetros y Termógrafos", param: "Termohigrómetros y Termógrafos" },
];

export const categoryHref = (paramOrLabel: string) =>
  `/productos?categoria=${encodeURIComponent(paramOrLabel)}`;

export const ALL = "Todos";

export const ROUTES = {
  products: "/productos",
  contact: "/contacto",
  product: (slug: string) => `/productos/${slug}`,
};

export const CTA_TEXTS = {
  startConversationLabel: "Comenzar Conversación",
  startConversationMessage: "Hola, me gustaría conversar sobre soluciones para optimizar mi operación.",
  viewCatalogLabel: "Ver Catálogo",
  contactLabel: "Contactar",
  quoteLabel: "Cotizar",
  downloadPdfLabel: "Descargar documento",
  searchPlaceholder: "Buscar productos…",
};

export const MESSAGES = {
  pdfNotAvailable: "Ficha técnica no disponible",
  noProductsFound: "No se encontraron productos",
};
