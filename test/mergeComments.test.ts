import { describe, expect, it } from 'vitest';
import { mergeComments } from '@/lib/utils/mergeComments';
import type { LocalComment } from '@/types/comment';
import type { Review } from '@/types/vehicle';

describe('mergeComments', () => {
  const reviews: Review[] = [
    {
      rating: 4,
      comment: 'API review',
      date: '2025-01-01T00:00:00.000Z',
      reviewerName: 'Luna',
      reviewerEmail: 'luna@example.com',
    },
  ];

  const localComments: LocalComment[] = [
    {
      id: 'local-1',
      vehicleId: 167,
      name: 'Alex',
      comment: 'Local comment',
      createdAt: '2025-06-01T00:00:00.000Z',
    },
  ];

  it('merges api reviews and local comments', () => {
    const result = mergeComments(reviews, localComments);

    expect(result).toHaveLength(2);
    expect(result.some((c) => c.source === 'api')).toBe(true);
    expect(result.some((c) => c.source === 'local')).toBe(true);
  });

  it('places newer comments first', () => {
    const result = mergeComments(reviews, localComments);
    expect(result[0].comment).toBe('Local comment');
    expect(result[1].comment).toBe('API review');
  });

  it('handles empty inputs', () => {
    expect(mergeComments([], [])).toEqual([]);
  });
});
