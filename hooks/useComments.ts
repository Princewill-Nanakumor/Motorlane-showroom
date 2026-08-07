'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  clearComments,
  deleteComment,
  getComments,
  saveComment,
} from '@/lib/storage/comments';
import type { LocalComment } from '@/types/comment';

export function useComments(vehicleId: number) {
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setComments(getComments(vehicleId));
    setReady(true);
  }, [vehicleId]);

  useEffect(() => {
    load();
  }, [load]);

  function addComment(name: string, comment: string): LocalComment {
    const created = saveComment(vehicleId, name, comment);
    setComments(getComments(vehicleId));
    return created;
  }

  function removeComment(commentId: string): boolean {
    const removed = deleteComment(vehicleId, commentId);
    if (removed) {
      setComments(getComments(vehicleId));
    }
    return removed;
  }

  function clear() {
    clearComments(vehicleId);
    setComments([]);
  }

  return {
    comments,
    ready,
    addComment,
    removeComment,
    clear,
    reload: load,
  };
}
