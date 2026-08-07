import type { Vehicle } from '@/types/vehicle';

const API_BASE = 'https://dummyjson.com';

export async function getVehicle(id: string | number): Promise<Vehicle | null> {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle ${id}: ${response.status}`);
  }

  const vehicle: Vehicle = await response.json();

  if (vehicle.category !== 'vehicle') {
    return null;
  }

  return vehicle;
}
