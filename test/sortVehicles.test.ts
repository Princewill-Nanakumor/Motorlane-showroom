import { describe, expect, it } from 'vitest';
import { sortVehicles } from '@/lib/utils/sortVehicles';
import { mockVehicles } from './fixtures';

describe('sortVehicles', () => {
  it('sorts by price ascending', () => {
    const result = sortVehicles(mockVehicles, 'price-asc');
    expect(result.map((v) => v.id)).toEqual([167, 168, 170]);
  });

  it('sorts by price descending', () => {
    const result = sortVehicles(mockVehicles, 'price-desc');
    expect(result.map((v) => v.id)).toEqual([170, 168, 167]);
  });

  it('sorts by rating descending', () => {
    const result = sortVehicles(mockVehicles, 'rating-desc');
    expect(result.map((v) => v.id)).toEqual([170, 167, 168]);
  });

  it('sorts by title ascending', () => {
    const result = sortVehicles(mockVehicles, 'title-asc');
    expect(result.map((v) => v.title)).toEqual([
      '300 Touring',
      'Charger SXT RWD',
      'Durango SXT RWD',
    ]);
  });

  it('keeps original order for default sort', () => {
    const result = sortVehicles(mockVehicles, 'default');
    expect(result.map((v) => v.id)).toEqual([167, 168, 170]);
  });
});
