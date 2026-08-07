import type { Vehicle, VehicleFilters } from '@/types/vehicle';

export function filterVehicles(
  vehicles: Vehicle[],
  filters: Pick<
    VehicleFilters,
    'search' | 'minPrice' | 'maxPrice' | 'minRating' | 'brand'
  >,
): Vehicle[] {
  const search = filters.search.trim().toLowerCase();
  const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
  const minRating = filters.minRating ? Number(filters.minRating) : null;
  const brand = filters.brand.trim().toLowerCase();

  return vehicles.filter((vehicle) => {
    if (search) {
      const haystack = [
        vehicle.brand,
        vehicle.title,
        vehicle.description,
      ]
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(search)) {
        return false;
      }
    }

    if (brand && vehicle.brand.toLowerCase() !== brand) {
      return false;
    }

    if (minPrice !== null && !Number.isNaN(minPrice) && vehicle.price < minPrice) {
      return false;
    }

    if (maxPrice !== null && !Number.isNaN(maxPrice) && vehicle.price > maxPrice) {
      return false;
    }

    if (
      minRating !== null &&
      !Number.isNaN(minRating) &&
      vehicle.rating < minRating
    ) {
      return false;
    }

    return true;
  });
}

export function getUniqueBrands(vehicles: Vehicle[]): string[] {
  return Array.from(new Set(vehicles.map((v) => v.brand))).sort((a, b) =>
    a.localeCompare(b),
  );
}
