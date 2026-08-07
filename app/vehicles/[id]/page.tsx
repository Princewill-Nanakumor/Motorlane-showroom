import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { VehicleDetails } from '@/components/vehicles/VehicleDetails';
import { getVehicle } from '@/lib/api/getVehicle';

interface VehiclePageProps {
  params: Promise<{ id: string }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <Container as="section" className="page">
      <div className="vehicle-page">
        <Link href="/" className="back-link">
          <span className="back-link__arrow" aria-hidden="true">
            ←
          </span>
          Back to showroom
        </Link>
        <VehicleDetails vehicle={vehicle} />
      </div>
    </Container>
  );
}
