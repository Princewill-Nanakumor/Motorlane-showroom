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
        title="Vehicle error"
        message={error.message || 'Could not load this vehicle.'}
        onRetry={reset}
      />
    </Container>
  );
}
