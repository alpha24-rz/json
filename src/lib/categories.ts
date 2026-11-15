export interface CategoryConfig {
  id: string;
  label: string;
  slug: string;
  description?: string;
}

export const MAIN_CATEGORIES: CategoryConfig[] = [
  {
    id: "Landing Page",
    label: "Landing Page",
    slug: "landing-page",
    description: "Template landing page modern, berkonversi tinggi, dan responsive untuk startup dan bisnis.",
  },
  {
    id: "E-Commerce",
    label: "E-Commerce",
    slug: "e-commerce",
    description: "Sistem toko online, katalog produk digital, dan checkout siap pakai.",
  },
  {
    id: "Excel & Spreadsheet",
    label: "Excel & Spreadsheet",
    slug: "excel-spreadsheet",
    description: "Template spreadsheet profesional untuk pembukuan, cash flow, dan kalkulasi bisnis.",
  },
];

export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryBySlug(
  slug: string,
  availableCategories: string[] = []
): { id: string; label: string; isAll: boolean; description?: string } | null {
  const decoded = decodeURIComponent(slug).toLowerCase().trim();

  if (decoded === "all" || decoded === "browse-all") {
    return {
      id: "All",
      label: "All Products",
      isAll: true,
      description: "Jelajahi seluruh koleksi produk digital, template, dan sistem siap pakai gratis.",
    };
  }

  // 1. Check in MAIN_CATEGORIES
  const matchedMain = MAIN_CATEGORIES.find(
    (c) =>
      c.slug === decoded ||
      slugifyCategory(c.id) === decoded ||
      c.id.toLowerCase() === decoded
  );
  if (matchedMain) {
    return {
      id: matchedMain.id,
      label: matchedMain.label,
      isAll: false,
      description: matchedMain.description,
    };
  }

  // 2. Check in all database categories
  const matchedOther = availableCategories.find(
    (c) =>
      slugifyCategory(c) === decoded ||
      c.toLowerCase() === decoded
  );
  if (matchedOther) {
    return {
      id: matchedOther,
      label: matchedOther,
      isAll: false,
      description: `Koleksi produk digital gratis dalam kategori ${matchedOther}.`,
    };
  }

  return null;
}

