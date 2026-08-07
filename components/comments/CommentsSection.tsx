'use client';

import { CommentForm } from '@/components/comments/CommentForm';
import { CommentList } from '@/components/comments/CommentList';
import { useComments } from '@/hooks/useComments';
import type { CommentFormValues } from '@/lib/validation/commentSchema';
import type { Review } from '@/types/vehicle';

interface CommentsSectionProps {
  vehicleId: number;
  reviews: Review[];
}

export function CommentsSection({ vehicleId, reviews }: CommentsSectionProps) {
  const { comments, ready, addComment, removeComment } = useComments(vehicleId);

  function handleSubmit(values: CommentFormValues) {
    addComment(values.name, values.comment);
  }

  return (
    <>
      <section
        className="vehicle-details__section"
        aria-labelledby="reviews-heading"
      >
        <h2 id="reviews-heading">Reviews & comments</h2>
        {ready ? (
          <CommentList
            reviews={reviews}
            localComments={comments}
            onDelete={removeComment}
          />
        ) : (
          <p className="muted">Loading comments…</p>
        )}
      </section>

      <section
        className="vehicle-details__section"
        aria-labelledby="comment-form-heading"
      >
        <h2 id="comment-form-heading">Leave a comment</h2>
        <CommentForm onSubmit={handleSubmit} />
      </section>
    </>
  );
}
