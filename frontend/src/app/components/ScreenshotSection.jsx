'use client';

import { useState } from 'react';
import Image from 'next/image';

const details = '/detail.png';
const properties = '/portfolio.png';
const add  = '/add.png';
const finances = '/finance.png';

const images = [
  {
    src: properties,
    alt: 'Portfolio',
  },
  {
    src: add,
    alt: 'Ingatlan hozzáadása',
  },
  {
    src: details,
    alt: 'Ingatlan részletek',
  },
  {
    src: finances,
    alt: 'Pénzügyi nézet',
  },
];

export default function ScreenshotSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="demo" className="bg-[#f5f5f5] text-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Eddigi funkciók / Demó alkalmazás
        </h2>
        

        {/* Main selected image with arrows */}
        <div className="relative w-full h-[400px] sm:h-[500px] mb-8 flex items-center justify-center">
          <button
            onClick={goPrev}
            aria-label="Előző"
            className="cursor-pointer absolute left-2 sm:left-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition z-10"
          >
            ◀
          </button>

          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            className="object-contain rounded shadow"
          />

          <button
            onClick={goNext}
            aria-label="Következő"
            className="cursor-pointer absolute right-2 sm:right-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition z-10"
          >
            ▶
          </button>
        </div>

        {/* Thumbnail gallery */}
        <div className="flex justify-center gap-4 flex-wrap">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-28 h-20 border-2 rounded overflow-hidden ${
                selectedIndex === index ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={112}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}

          

        </div>
        <div className="flex justify-center mt-4">
        <a
                    href="#proba"
                    className="bg-gray-900 text-white px-6 py-3 rounded-md text-l font-medium hover:bg-gray-800 transition"
                >
                    Kipróbálom!
                </a>
        </div>
      </div>
    </section>
  );
}
