"use client";

import { WHATSAPP } from "../lib/siteConfig";

export function FloatingWhatsApp() {
  const phone = WHATSAPP; // from site config

  const message = encodeURIComponent(
    "Hola, me gustaría obtener más información sobre sus productos."
  );

  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6
        z-[999]
        w-14 h-14
        rounded-full
        bg-[#25D366]
        flex items-center justify-center
        shadow-[0_10px_30px_rgba(37,211,102,0.4)]
        hover:scale-110
        transition-all duration-300
      "
    >
      {/* simple icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white"
      >
        <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.89.756 5.605 2.078 7.97L0 32l7.86-2.057a15.93 15.93 0 0 0 8.14 2.217c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.09c-2.5 0-4.847-.67-6.88-1.84l-.49-.29-4.66 1.22 1.24-4.54-.32-.52A13.92 13.92 0 0 1 2.1 16.4c0-7.66 6.24-13.9 13.9-13.9s13.9 6.24 13.9 13.9-6.24 13.9-13.9 13.9zm7.66-10.46c-.42-.21-2.49-1.23-2.88-1.37-.39-.14-.67-.21-.95.21-.28.42-1.09 1.37-1.34 1.65-.25.28-.5.31-.92.1-.42-.21-1.78-.66-3.39-2.1-1.25-1.12-2.1-2.5-2.35-2.92-.25-.42-.03-.65.18-.86.19-.19.42-.5.63-.75.21-.25.28-.42.42-.7.14-.28.07-.52-.03-.73-.1-.21-.95-2.29-1.3-3.13-.34-.82-.68-.7-.95-.71h-.81c-.28 0-.73.1-1.12.52-.39.42-1.47 1.44-1.47 3.5s1.51 4.05 1.72 4.33c.21.28 2.97 4.54 7.2 6.36 1.01.44 1.8.7 2.42.9 1.02.32 1.95.28 2.68.17.82-.12 2.49-1.02 2.84-2.01.35-.98.35-1.82.24-2.01-.1-.19-.39-.31-.81-.52z" />
      </svg>
    </a>
  );
}