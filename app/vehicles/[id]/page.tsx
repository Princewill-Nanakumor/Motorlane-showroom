import { Container } from '@/components/layout/Container';
import { VehicleDetailsView } from '@/components/vehicles/VehicleDetailsView';

interface VehiclePageProps {
  params: Promise<{ id: string }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params;

  return (
    <Container as="section" className="page">
      <VehicleDetailsView id={id} />
    </Container>
  );
}
