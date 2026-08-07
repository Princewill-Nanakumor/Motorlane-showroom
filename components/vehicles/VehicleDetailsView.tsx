'use client';

import Link from 'next/link';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { VehicleDetails } from '@/components/vehicles/VehicleDetails';
import { VehicleDetailsSkeleton } from '@/components/vehicles/VehicleDetailsSkeleton';
import { useVehicle } from '@/hooks/useVehicle';

interface VehicleDetailsViewProps {
  id: string;
}

export function VehicleDetailsView({ id }: VehicleDetailsViewProps) {
  const { vehicle, loading, error, notFound: missing } = useVehicle(id);

  if (loading) {
    return <VehicleDetailsSkeleton />;
  }

  if (missing) {
    return (
      <div className="not-found">
        <h1>Vehicle not found</h1>
        <p>This model is not available in the showroom.</p>
        <Link href="/" className="btn btn--primary">
          Back to showroom
        </Link>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <ErrorMessage
        title="Unable to load vehicle"
        message={error ?? 'Unknown error'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="vehicle-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Showroom</Link>
        <span aria-hidden="true">/</span>
        <span>{vehicle.title}</span>
      </nav>
      <VehicleDetails vehicle={vehicle} />
    </div>
  );
}
