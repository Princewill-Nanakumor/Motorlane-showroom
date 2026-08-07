'use client';

import { useEffect, useMemo, useState } from 'react';
import { getVehicles } from '@/lib/api/getVehicles';
import { filterVehicles, getUniqueBrands } from '@/lib/utils/filterVehicles';
import { sortVehicles } from '@/lib/utils/sortVehicles';
import type { SortOption, Vehicle, VehicleFilters } from '@/types/vehicle';

const DEFAULT_FILTERS: VehicleFilters = {
  search: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  brand: '',
  sortBy: 'default',
};

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await getVehicles();
        if (!cancelled) {
          setVehicles(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load vehicles',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    const filtered = filterVehicles(vehicles, filters);
    return sortVehicles(filtered, filters.sortBy);
  }, [vehicles, filters]);

  const brands = useMemo(() => getUniqueBrands(vehicles), [vehicles]);

  function updateFilter<K extends keyof VehicleFilters>(
    key: K,
    value: VehicleFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function setSortBy(sortBy: SortOption) {
    updateFilter('sortBy', sortBy);
  }

  return {
    vehicles: filteredVehicles,
    allVehicles: vehicles,
    brands,
    filters,
    loading,
    error,
    updateFilter,
    resetFilters,
    setSortBy,
  };
}
