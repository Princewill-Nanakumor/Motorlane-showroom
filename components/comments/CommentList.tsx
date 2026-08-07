'use client';

import { CommentCard } from '@/components/comments/CommentCard';
import { EmptyComments } from '@/components/comments/EmptyComments';
import { mergeComments } from '@/lib/utils/mergeComments';
import type { LocalComment } from '@/types/comment';
import type { Review } from '@/types/vehicle';

interface CommentListProps {
  reviews: Review[];
  localComments: LocalComment[];
  onDelete?: (id: string) => void;
}

export function CommentList({
  reviews,
  localComments,
  onDelete,
}: CommentListProps) {
  const comments = mergeComments(reviews, localComments);

  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard comment={comment} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
