'use client';

import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Container } from '@/components/layout/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="page">
      <ErrorMessage
        title="Showroom error"
        message={error.message || 'An unexpected error occurred.'}
        onRetry={reset}
      />
    </Container>
  );
}
