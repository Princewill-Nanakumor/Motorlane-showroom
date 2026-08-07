'use client';

import { EmptyState } from '@/components/common/EmptyState';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { VehicleFilters } from '@/components/vehicles/VehicleFilters';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { VehicleGridSkeleton } from '@/components/vehicles/VehicleGridSkeleton';
import { VehicleSearch } from '@/components/vehicles/VehicleSearch';
import { useVehicles } from '@/hooks/useVehicles';
import type { Vehicle } from '@/types/vehicle';

interface VehicleShowroomProps {
  initialVehicles?: Vehicle[];
}

export function VehicleShowroom({ initialVehicles }: VehicleShowroomProps) {
  const {
    vehicles,
    brands,
    filters,
    loading,
    error,
    updateFilter,
    resetFilters,
  } = useVehicles(initialVehicles);

  if (loading) {
    return <VehicleGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Unable to load vehicles"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="showroom">
      <header className="showroom__intro">
        <p className="showroom__eyebrow">Virtual showroom</p>
        <h1 className="showroom__title">Motorlane</h1>
        <p className="showroom__subtitle">
          Explore available vehicles. Filter by price, brand, or rating — then
          open a model for details and comments.
        </p>
      </header>

      <VehicleSearch
        value={filters.search}
        onChange={(value) => updateFilter('search', value)}
      />

      <VehicleFilters
        filters={filters}
        brands={brands}
        onChange={updateFilter}
        onReset={resetFilters}
      />

      <p className="showroom__count" aria-live="polite">
        {vehicles.length} vehicle{vehicles.length === 1 ? '' : 's'}
      </p>

      {vehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <VehicleGrid vehicles={vehicles} />
      )}
    </div>
  );
}
