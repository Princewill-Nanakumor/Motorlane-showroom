import { describe, expect, it } from 'vitest';
import {
  filterVehicles,
  getUniqueBrands,
} from '@/lib/utils/filterVehicles';
import { mockVehicles } from './fixtures';

describe('filterVehicles', () => {
  it('filters by search across brand, title, and description', () => {
    const result = filterVehicles(mockVehicles, {
      search: 'suv',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      brand: '',
    });

    expect(result.map((v) => v.id)).toEqual([170]);
  });

  it('filters by brand', () => {
    const result = filterVehicles(mockVehicles, {
      search: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      brand: 'Dodge',
    });

    expect(result).toHaveLength(2);
    expect(result.every((v) => v.brand === 'Dodge')).toBe(true);
  });

  it('filters by minimum price', () => {
    const result = filterVehicles(mockVehicles, {
      search: '',
      minPrice: '33000',
      maxPrice: '',
      minRating: '',
      brand: '',
    });

    expect(result.map((v) => v.id)).toEqual([170]);
  });

  it('filters by maximum price', () => {
    const result = filterVehicles(mockVehicles, {
      search: '',
      minPrice: '',
      maxPrice: '30000',
      minRating: '',
      brand: '',
    });

    expect(result.map((v) => v.id)).toEqual([167]);
  });

  it('filters by minimum rating', () => {
    const result = filterVehicles(mockVehicles, {
      search: '',
      minPrice: '',
      maxPrice: '',
      minRating: '4',
      brand: '',
    });

    expect(result.map((v) => v.id).sort()).toEqual([167, 170]);
  });

  it('returns unique sorted brands', () => {
    expect(getUniqueBrands(mockVehicles)).toEqual(['Chrysler', 'Dodge']);
  });
});
