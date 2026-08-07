import { Container } from '@/components/layout/Container';
import { VehicleDetailsSkeleton } from '@/components/vehicles/VehicleDetailsSkeleton';

export default function Loading() {
  return (
    <Container className="page">
      <VehicleDetailsSkeleton />
    </Container>
  );
}
