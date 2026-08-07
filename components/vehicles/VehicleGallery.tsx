'use client';

import Image from 'next/image';
import { useState } from 'react';

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return <div className="vehicle-gallery vehicle-gallery--empty" />;
  }

  return (
    <div className="vehicle-gallery">
      <div className="vehicle-gallery__main">
        <Image
          src={activeImage}
          alt={alt}
          width={1200}
          height={720}
          className="vehicle-gallery__image"
          priority
        />
      </div>
      {images.length > 1 ? (
        <ul className="vehicle-gallery__thumbs">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                className={`vehicle-gallery__thumb${
                  index === activeIndex
                    ? ' vehicle-gallery__thumb--active'
                    : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={index === activeIndex}
              >
                <Image
                  src={image}
                  alt=""
                  width={160}
                  height={100}
                  className="vehicle-gallery__thumb-image"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
