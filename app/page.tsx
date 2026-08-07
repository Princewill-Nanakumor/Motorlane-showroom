import { Container } from '@/components/layout/Container';
import { VehicleShowroom } from '@/components/vehicles/VehicleShowroom';

export default function HomePage() {
  return (
    <Container as="section" className="page">
      <VehicleShowroom />
    </Container>
  );
}
