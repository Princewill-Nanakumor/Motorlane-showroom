import { z } from 'zod';

export const commentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(40, 'Name must be at most 40 characters'),
  comment: z
    .string()
    .trim()
    .min(1, 'Comment is required')
    .max(500, 'Comment must be at most 500 characters'),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
