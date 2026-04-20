import Link from "next/link";
import { ROUTES, CTA_TEXTS } from "@/lib/siteConfig";

export function Products() {
  const options = [
    { image: "/images/hero/menu1.png", title: "AGRO" },
    { image: "/images/hero/menu2.png", title: "FLORICOLA" },
    { image: "/images/hero/menu3.png", title: "ALIMENTOS" },
    { image: "/images/hero/menu4.png", title: "INDUSTRIA" },
  ];

  return (
    <section className="py-20 bg-yellow-400">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
            Conoce nuestro catálogo de productos
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {options.map((opt, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition">
              
              {/* IMAGE */}
              <img
                src={opt.image}
                alt={opt.title}
                className="w-full h-full object-cover aspect-square transition-transform group-hover:scale-105"
              />

             

            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-12 text-center">
          <div className="mt-12 text-center">
            <Link href={ROUTES.products} className="inline-flex group bg-blue-900 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 text-lg md:text-xl transition transform hover:scale-105 hover:bg-blue-800 cursor-pointer">
              {CTA_TEXTS.viewCatalogLabel}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}