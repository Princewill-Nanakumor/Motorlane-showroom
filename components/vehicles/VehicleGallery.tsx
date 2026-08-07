'use client';

import Image from 'next/image';
import { useState } from 'react';

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return <div className="vehicle-gallery vehicle-gallery--empty" />;
  }

  return (
    <div className="vehicle-gallery">
      <div className="vehicle-gallery__main">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={index === activeIndex ? alt : ''}
            width={1200}
            height={720}
            className={`vehicle-gallery__image${
              index === activeIndex ? ' vehicle-gallery__image--active' : ''
            }`}
            priority={index === 0}
            sizes="(max-width: 1200px) 100vw, 1200px"
            aria-hidden={index !== activeIndex}
          />
        ))}
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
