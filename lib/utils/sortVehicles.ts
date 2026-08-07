import type { SortOption, Vehicle } from '@/types/vehicle';

export function sortVehicles(
  vehicles: Vehicle[],
  sortBy: SortOption,
): Vehicle[] {
  const sorted = [...vehicles];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'default':
    default:
      return sorted;
  }
}
