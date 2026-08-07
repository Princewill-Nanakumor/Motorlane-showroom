import { EmptyState } from '@/components/common/EmptyState';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import type { Vehicle } from '@/types/vehicle';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <EmptyState
        title="No vehicles found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <ul className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </li>
      ))}
    </ul>
  );
}
