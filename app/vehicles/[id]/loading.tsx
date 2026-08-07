import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container className="page">
      <LoadingSpinner label="Loading vehicle…" />
    </Container>
  );
}
