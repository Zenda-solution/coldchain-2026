// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/NavBar";
import { Albert_Sans, Instrument_Serif } from "next/font/google";

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coldchain.com.ec"),
  title: {
    default: "Coldchain | Equipos de Medición para Agricultura en Ecuador",
    template: "%s | Coldchain",
  },
  description:
    "Coldchain ofrece equipos profesionales de medición y análisis para agricultura, laboratorio e industria en Ecuador. Más de 30 años de experiencia.",
  openGraph: {
    siteName: "Coldchain Ecuador",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Coldchain — Equipos de Medición en Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Coldchain",
  url: "https://coldchain.com.ec",
  logo: "https://coldchain.com.ec/logo.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+593-98-700-4993",
      contactType: "sales",
      areaServed: "EC",
      availableLanguage: "Spanish",
    },
    {
      "@type": "ContactPoint",
      telephone: "+593-98-558-3892",
      contactType: "customer support",
      areaServed: "EC",
      availableLanguage: "Spanish",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jorge Icaza N12F y Calle B, a 300 metros de la calle Sebastián de Benalcázar",
    addressLocality: "Quito",
    addressCountry: "EC",
  },
  email: "ventas1@coldchain.com.ec",
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${albert.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}