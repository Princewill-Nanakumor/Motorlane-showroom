import type { Vehicle, VehiclesResponse } from '@/types/vehicle';

const API_BASE = 'https://dummyjson.com';

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_BASE}/products/category/vehicle`);

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicles: ${response.status}`);
  }

  const data: VehiclesResponse = await response.json();
  return data.products;
}
