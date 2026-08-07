interface VehicleGridSkeletonProps {
  count?: number;
}

export function VehicleGridSkeleton({ count = 6 }: VehicleGridSkeletonProps) {
  return (
    <div className="showroom-skeleton" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading vehicles…</span>

      <div className="showroom-skeleton__intro">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--subtitle" />
      </div>

      <div className="skeleton skeleton--search" />
      <div className="skeleton skeleton--filters" />
      <div className="skeleton skeleton--count" />

      <ul className="vehicle-grid">
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <div className="vehicle-card-skeleton">
              <div className="skeleton skeleton--media" />
              <div className="vehicle-card-skeleton__body">
                <div className="skeleton skeleton--brand" />
                <div className="skeleton skeleton--heading" />
                <div className="skeleton skeleton--meta" />
                <div className="skeleton skeleton--cta" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
