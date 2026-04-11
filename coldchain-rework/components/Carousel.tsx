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

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md">

      {/* 🔥 PROPORCIÓN REAL */}
      <div className="relative aspect-[29/11] w-full">

        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              index === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.02]"
            }`}
          />
        ))}

        {/* overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        {/* arrows */}
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur text-white w-12 h-12 rounded-full hover:bg-white/40 transition"
        >
          ←
        </button>

        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur text-white w-12 h-12 rounded-full hover:bg-white/40 transition"
        >
          →
        </button>

        {/* dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer transition-all ${
                current === index
                  ? "w-10 h-2.5 bg-yellow-400 rounded-full"
                  : "w-2.5 h-2.5 bg-white/60 rounded-full"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}