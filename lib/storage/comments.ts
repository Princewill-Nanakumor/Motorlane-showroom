import type { CommentsStorage, LocalComment, StoredComments } from '@/types/comment';

export const COMMENTS_STORAGE_KEY = 'car-showroom-comments';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getAllComments(): CommentsStorage {
  if (!isBrowser()) {
    return {};
  }

  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as CommentsStorage;
  } catch {
    return {};
  }
}

export function getComments(vehicleId: number): LocalComment[] {
  const storage = getAllComments();
  return storage[String(vehicleId)]?.comments ?? [];
}

export function saveComment(
  vehicleId: number,
  name: string,
  comment: string,
): LocalComment {
  const storage = getAllComments();
  const key = String(vehicleId);
  const existing: StoredComments = storage[key] ?? {
    vehicleId,
    comments: [],
  };

  const newComment: LocalComment = {
    id: crypto.randomUUID(),
    vehicleId,
    name: name.trim(),
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
  };

  existing.comments = [newComment, ...existing.comments];
  storage[key] = existing;
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(storage));

  return newComment;
}

export function deleteComment(vehicleId: number, commentId: string): boolean {
  const storage = getAllComments();
  const key = String(vehicleId);
  const entry = storage[key];

  if (!entry) {
    return false;
  }

  const next = entry.comments.filter((c) => c.id !== commentId);
  if (next.length === entry.comments.length) {
    return false;
  }

  if (next.length === 0) {
    delete storage[key];
  } else {
    storage[key] = { ...entry, comments: next };
  }

  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(storage));
  return true;
}

export function clearComments(vehicleId?: number): void {
  if (!isBrowser()) {
    return;
  }

  if (vehicleId === undefined) {
    localStorage.removeItem(COMMENTS_STORAGE_KEY);
    return;
  }

  const storage = getAllComments();
  delete storage[String(vehicleId)];
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(storage));
}
