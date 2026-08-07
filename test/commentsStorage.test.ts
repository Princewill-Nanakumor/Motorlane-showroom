import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearComments,
  COMMENTS_STORAGE_KEY,
  deleteComment,
  getComments,
  saveComment,
} from '@/lib/storage/comments';

describe('comments storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no comments exist', () => {
    expect(getComments(167)).toEqual([]);
  });

  it('saves a comment for a vehicle', () => {
    const comment = saveComment(167, 'Alex', 'Love this sedan');

    expect(comment.vehicleId).toBe(167);
    expect(comment.name).toBe('Alex');
    expect(comment.comment).toBe('Love this sedan');
    expect(getComments(167)).toHaveLength(1);
  });

  it('keeps comments isolated by vehicle', () => {
    saveComment(167, 'Alex', 'First');
    saveComment(168, 'Sam', 'Second');

    expect(getComments(167)).toHaveLength(1);
    expect(getComments(168)).toHaveLength(1);
    expect(getComments(167)[0].comment).toBe('First');
  });

  it('prepends newest comments', () => {
    saveComment(167, 'Alex', 'Older');
    saveComment(167, 'Sam', 'Newer');

    const comments = getComments(167);
    expect(comments[0].comment).toBe('Newer');
    expect(comments[1].comment).toBe('Older');
  });

  it('deletes a specific comment', () => {
    const first = saveComment(167, 'Alex', 'Keep');
    const second = saveComment(167, 'Sam', 'Remove');

    expect(deleteComment(167, second.id)).toBe(true);
    expect(getComments(167).map((c) => c.id)).toEqual([first.id]);
  });

  it('returns false when deleting a missing comment', () => {
    expect(deleteComment(167, 'missing')).toBe(false);
  });

  it('clears comments for one vehicle', () => {
    saveComment(167, 'Alex', 'One');
    saveComment(168, 'Sam', 'Two');

    clearComments(167);

    expect(getComments(167)).toEqual([]);
    expect(getComments(168)).toHaveLength(1);
  });

  it('clears all comments from storage', () => {
    saveComment(167, 'Alex', 'One');
    clearComments();

    expect(localStorage.getItem(COMMENTS_STORAGE_KEY)).toBeNull();
  });
});
