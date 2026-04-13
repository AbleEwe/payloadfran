"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const imageUrl = [
    {
        url: '/Images/FotosCarrusel/Familiar-01.jpg',
        caption: 'Foto 1'
    },
    {
        url: '/Images/FotosCarrusel/Maternidad-01.jpg',
        caption: 'Foto 2'
    },
    {
        url: '/Images/FotosCarrusel/Startrails.jpg',
        caption: 'Foto 3'
    }
];

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === imageUrl.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);
  return (
    <main className="relative w-full h-[60vh] md:h-screen">
      <div className="w-full h-full">
        {imageUrl.map((elem, idx) => (
          <div
            key={idx}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === activeImage
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <Image
              src={elem.url}
              alt={elem.caption}
              fill
              className="object-cover"
              priority={idx === activeImage}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Slider;