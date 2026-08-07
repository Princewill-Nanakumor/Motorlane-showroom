import type { DisplayComment, LocalComment } from '@/types/comment';
import type { Review } from '@/types/vehicle';

export function mergeComments(
  reviews: Review[] = [],
  localComments: LocalComment[] = [],
): DisplayComment[] {
  const fromApi: DisplayComment[] = reviews.map((review, index) => ({
    id: `api-${index}-${review.date}`,
    name: review.reviewerName,
    comment: review.comment,
    date: review.date,
    rating: review.rating,
    source: 'api',
  }));

  const fromLocal: DisplayComment[] = localComments.map((item) => ({
    id: item.id,
    name: item.name,
    comment: item.comment,
    date: item.createdAt,
    source: 'local',
  }));

  return [...fromLocal, ...fromApi].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
