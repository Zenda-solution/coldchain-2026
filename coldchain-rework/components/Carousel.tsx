"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/hero/hero1.png",
  "/images/hero/hero2.png",
  "/images/hero/hero3.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md">

      {/*
        Mobile:  aspect-[4/3]  → taller, fills the screen width nicely
        sm+:     aspect-[16/7] → medium ratio
        lg+:     aspect-[29/11] → original wide ratio
      */}
      <div className="relative aspect-[16/7] sm:aspect-[16/7] lg:aspect-[29/11] w-full">

        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              index === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.02]"
            }`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* arrows — bigger tap target on mobile */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10
                     bg-white/20 backdrop-blur text-white
                     w-9 h-9 sm:w-12 sm:h-12
                     rounded-full hover:bg-white/40 transition
                     flex items-center justify-center text-lg"
        >
          ←
        </button>

        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10
                     bg-white/20 backdrop-blur text-white
                     w-9 h-9 sm:w-12 sm:h-12
                     rounded-full hover:bg-white/40 transition
                     flex items-center justify-center text-lg"
        >
          →
        </button>

        {/* dots */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Ir a slide ${index + 1}`}
              className={`transition-all rounded-full ${
                current === index
                  ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-yellow-400"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}