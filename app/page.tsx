import { Container } from '@/components/layout/Container';
import { VehicleShowroom } from '@/components/vehicles/VehicleShowroom';
import { getVehicles } from '@/lib/api/getVehicles';

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <Container as="section" className="page">
      <VehicleShowroom initialVehicles={vehicles} />
    </Container>
  );
}
