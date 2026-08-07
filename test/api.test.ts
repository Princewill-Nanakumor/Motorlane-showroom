import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVehicle } from '@/lib/api/getVehicle';
import { getVehicles } from '@/lib/api/getVehicles';
import { mockVehicles } from './fixtures';

describe('API helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('getVehicles returns products from DummyJSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          products: mockVehicles,
          total: mockVehicles.length,
          skip: 0,
          limit: mockVehicles.length,
        }),
      }),
    );

    const vehicles = await getVehicles();
    expect(vehicles).toHaveLength(3);
    expect(vehicles[0].title).toBe('300 Touring');
  });

  it('getVehicles throws on failed response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(getVehicles()).rejects.toThrow('Failed to fetch vehicles: 500');
  });

  it('getVehicle returns a vehicle product', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockVehicles[0],
      }),
    );

    const vehicle = await getVehicle(167);
    expect(vehicle?.id).toBe(167);
  });

  it('getVehicle returns null for 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    await expect(getVehicle(999)).resolves.toBeNull();
  });

  it('getVehicle returns null for non-vehicle category', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ...mockVehicles[0], category: 'beauty' }),
      }),
    );

    await expect(getVehicle(1)).resolves.toBeNull();
  });
});
