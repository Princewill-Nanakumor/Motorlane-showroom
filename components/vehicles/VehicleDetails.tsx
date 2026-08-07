import { CommentsSection } from '@/components/comments/CommentsSection';
import { VehicleGallery } from '@/components/vehicles/VehicleGallery';
import { formatPrice, formatRating } from '@/lib/utils/format';
import type { Vehicle } from '@/types/vehicle';

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <article className="vehicle-details">
      <header className="vehicle-details__header">
        <p className="vehicle-details__brand">{vehicle.brand}</p>
        <h1 className="vehicle-details__title">{vehicle.title}</h1>
        <p className="vehicle-details__summary">
          {formatPrice(vehicle.price)} · Rating {formatRating(vehicle.rating)} ·{' '}
          {vehicle.availabilityStatus}
        </p>
      </header>

      <VehicleGallery
        images={vehicle.images}
        alt={`${vehicle.brand} ${vehicle.title}`}
      />

      <section className="vehicle-details__section" aria-labelledby="info-heading">
        <h2 id="info-heading">Vehicle information</h2>
        <p>{vehicle.description}</p>
      </section>

      <section
        className="vehicle-details__section"
        aria-labelledby="specs-heading"
      >
        <h2 id="specs-heading">Specifications</h2>
        <dl className="specs-list">
          <div>
            <dt>Brand</dt>
            <dd>{vehicle.brand}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{vehicle.category}</dd>
          </div>
          <div>
            <dt>SKU</dt>
            <dd>{vehicle.sku}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{vehicle.stock}</dd>
          </div>
          <div>
            <dt>Warranty</dt>
            <dd>{vehicle.warrantyInformation}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>{vehicle.shippingInformation}</dd>
          </div>
          <div>
            <dt>Return policy</dt>
            <dd>{vehicle.returnPolicy}</dd>
          </div>
          <div>
            <dt>Dimensions</dt>
            <dd>
              {vehicle.dimensions.width} × {vehicle.dimensions.height} ×{' '}
              {vehicle.dimensions.depth}
            </dd>
          </div>
        </dl>
        {vehicle.tags.length > 0 ? (
          <ul className="tag-list">
            {vehicle.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <CommentsSection vehicleId={vehicle.id} reviews={vehicle.reviews} />
    </article>
  );
}
