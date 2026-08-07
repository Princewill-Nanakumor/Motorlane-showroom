import { describe, expect, it } from 'vitest';
import { commentSchema } from '@/lib/validation/commentSchema';

describe('commentSchema', () => {
  it('accepts valid name and comment', () => {
    const result = commentSchema.safeParse({
      name: 'Alex',
      comment: 'Great car!',
    });

    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = commentSchema.safeParse({
      name: '   ',
      comment: 'Nice ride',
    });

    expect(result.success).toBe(false);
  });

  it('rejects name longer than 40 characters', () => {
    const result = commentSchema.safeParse({
      name: 'a'.repeat(41),
      comment: 'Nice ride',
    });

    expect(result.success).toBe(false);
  });

  it('rejects empty comment', () => {
    const result = commentSchema.safeParse({
      name: 'Alex',
      comment: '',
    });

    expect(result.success).toBe(false);
  });

  it('rejects comment longer than 500 characters', () => {
    const result = commentSchema.safeParse({
      name: 'Alex',
      comment: 'x'.repeat(501),
    });

    expect(result.success).toBe(false);
  });

  it('trims whitespace from valid values', () => {
    const result = commentSchema.safeParse({
      name: '  Alex  ',
      comment: '  Smooth drive  ',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Alex');
      expect(result.data.comment).toBe('Smooth drive');
    }
  });
});
