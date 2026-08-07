import { Container } from '@/components/layout/Container';
import { VehicleGridSkeleton } from '@/components/vehicles/VehicleGridSkeleton';

export default function Loading() {
  return (
    <Container className="page">
      <VehicleGridSkeleton />
    </Container>
  );
}
