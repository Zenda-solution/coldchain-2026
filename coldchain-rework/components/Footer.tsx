import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-primary text-white py-24">

      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LOGO */}
        <div className="flex flex-col items-start gap-6">
          <Image
            src="/images/hero/logo-blanco.webp"
            alt="Coldchain"
            className="w-80"
            width={320}
            height={80}
          />
          <p className="text-white text-base leading-relaxed max-w-sm">
            Soluciones confiables para sectores estratégicos del Ecuador.
          </p>
        </div>

        {/* GRID CONTACTO 2x2 */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">

          {/* FACTURACIÓN Y VENTAS */}
          <div>
            <h4 className="font-semibold text-xl mb-4 text-yellow-400">
              Facturación y Ventas
            </h4>
            <p className="text-white text-base leading-loose">
              (593) 02 3210659 – 3112231 ext.104 <br />
              (593) 098 700 4993 <br />
              ventas3@coldchain.com.ec
            </p>
          </div>

          {/* VENTAS */}
          <div>
            <h4 className="font-semibold text-xl mb-4 text-yellow-400">
              Ventas
            </h4>
            <p className="text-white text-base leading-loose">
              (593) 0999230340 <br />
              ventas1@coldchain.com.ec <br />
              (593) 0958871713 <br />
              ventas2@coldchain.com.ec
            </p>
          </div>

          {/* SOPORTE */}
          <div>
            <h4 className="font-semibold text-xl mb-4 text-yellow-400">
              Soporte Técnico
            </h4>
            <p className="text-white text-base leading-loose">
              (593) 98 558 3892 <br />
              tecnico@coldchain.com.ec
            </p>
          </div>

          {/* ATENCIÓN */}
          <div>
            <h4 className="font-semibold text-xl mb-4 text-yellow-400">
              Atención al Cliente
            </h4>
            <p className="text-white text-base leading-loose">
              (593) 02 3210659 – Ext.102 <br />
              (593) 096 355 9394 <br />
              atencionalcliente@coldchain.com.ec
            </p>
          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-20 border-t border-white/20 pt-6 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} COLDCHAIN. Todos los derechos reservados.
      </div>

    </footer>
  );
}