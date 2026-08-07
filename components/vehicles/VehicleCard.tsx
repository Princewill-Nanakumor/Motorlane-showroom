import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, formatRating } from '@/lib/utils/format';
import type { Vehicle } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const image = vehicle.thumbnail || vehicle.images[0];

  return (
    <article className="vehicle-card">
      <Link href={`/vehicles/${vehicle.id}`} className="vehicle-card__link">
        <div className="vehicle-card__media">
          {image ? (
            <Image
              src={image}
              alt={`${vehicle.brand} ${vehicle.title}`}
              width={640}
              height={400}
              className="vehicle-card__image"
            />
          ) : (
            <div className="vehicle-card__placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="vehicle-card__body">
          <p className="vehicle-card__brand">{vehicle.brand}</p>
          <h2 className="vehicle-card__title">{vehicle.title}</h2>
          <dl className="vehicle-card__meta">
            <div>
              <dt>Price</dt>
              <dd>{formatPrice(vehicle.price)}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{formatRating(vehicle.rating)}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{vehicle.category}</dd>
            </div>
          </dl>
          <span className="vehicle-card__cta">Learn more</span>
        </div>
      </Link>
    </article>
  );
}
