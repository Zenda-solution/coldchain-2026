import { client } from '@/lib/sanity'

export default async function ProductosPage() {
  const products = await client.fetch(`
    *[_type == "product"] {
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      "pdf": pdf.asset->url,
      category
    }
  `)

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Explora nuestras soluciones especializadas para cada sector
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div
              key={product.slug}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
            >
              {/* IMAGE */}
              {product.image && (
                <div className="w-full h-[220px] overflow-hidden rounded-xl mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition group-hover:scale-105"
                  />
                </div>
              )}

              {/* CONTENT */}
              <h2 className="text-xl font-semibold text-blue-900">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed flex-grow">
                {product.description}
              </p>

              {/* CATEGORY */}
              <span className="inline-block mt-4 text-xs font-medium bg-blue-100 text-blue-900 px-3 py-1 rounded-full w-fit">
                {product.category}
              </span>

              {/* CTA */}
              {product.pdf && (
                <a
                  href={product.pdf}
                  target="_blank"
                  className="mt-6 inline-flex items-center justify-center bg-yellow-400 text-black px-5 py-2.5 rounded-full font-semibold transition hover:scale-105 shadow-sm"
                >
                  Ver ficha técnica →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}