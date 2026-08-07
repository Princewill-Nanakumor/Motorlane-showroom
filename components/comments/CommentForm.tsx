'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  commentSchema,
  type CommentFormValues,
} from '@/lib/validation/commentSchema';

interface CommentFormProps {
  onSubmit: (values: CommentFormValues) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      comment: '',
    },
  });

  function submit(values: CommentFormValues) {
    onSubmit(values);
    reset();
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="field">
        <label htmlFor="comment-name">Name</label>
        <input
          id="comment-name"
          type="text"
          maxLength={40}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'comment-name-error' : undefined}
          {...register('name')}
        />
        {errors.name ? (
          <p id="comment-name-error" className="field__error" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="comment-body">Comment</label>
        <textarea
          id="comment-body"
          rows={4}
          maxLength={500}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? 'comment-body-error' : undefined}
          {...register('comment')}
        />
        {errors.comment ? (
          <p id="comment-body-error" className="field__error" role="alert">
            {errors.comment.message}
          </p>
        ) : null}
      </div>

      <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Add comment'}
      </button>
    </form>
  );
}
