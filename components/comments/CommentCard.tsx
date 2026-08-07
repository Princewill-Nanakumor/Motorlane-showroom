import { formatDate } from '@/lib/utils/format';
import type { DisplayComment } from '@/types/comment';

interface CommentCardProps {
  comment: DisplayComment;
  onDelete?: (id: string) => void;
}

export function CommentCard({ comment, onDelete }: CommentCardProps) {
  return (
    <article className="comment-card">
      <header className="comment-card__header">
        <h3 className="comment-card__name">{comment.name}</h3>
        <div className="comment-card__meta">
          <time dateTime={comment.date}>{formatDate(comment.date)}</time>
          {comment.rating !== undefined ? (
            <span>Rating {comment.rating}/5</span>
          ) : null}
          {comment.source === 'local' ? (
            <span className="comment-card__badge">Yours</span>
          ) : null}
        </div>
      </header>
      <p className="comment-card__body">{comment.comment}</p>
      {comment.source === 'local' && onDelete ? (
        <button
          type="button"
          className="btn btn--ghost btn--small"
          onClick={() => onDelete(comment.id)}
        >
          Delete
        </button>
      ) : null}
    </article>
  );
}
