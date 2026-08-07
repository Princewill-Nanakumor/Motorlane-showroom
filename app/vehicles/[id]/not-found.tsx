import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="page">
      <div className="not-found">
        <h1>Vehicle not found</h1>
        <p>This model is not available in the showroom.</p>
        <Link href="/" className="btn btn--primary">
          Back to showroom
        </Link>
      </div>
    </Container>
  );
}
