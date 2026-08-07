export function VehicleDetailsSkeleton() {
  return (
    <div
      className="vehicle-details-skeleton"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="visually-hidden">Loading vehicle…</span>

      <div className="skeleton skeleton--back" />

      <div className="vehicle-details vehicle-details-skeleton__panel">
        <div className="vehicle-details-skeleton__header">
          <div className="skeleton skeleton--brand" />
          <div className="skeleton skeleton--page-title" />
          <div className="skeleton skeleton--summary" />
        </div>

        <div className="skeleton skeleton--gallery" />
        <div className="vehicle-details-skeleton__thumbs">
          <div className="skeleton skeleton--thumb" />
          <div className="skeleton skeleton--thumb" />
          <div className="skeleton skeleton--thumb" />
          <div className="skeleton skeleton--thumb" />
        </div>

        <div className="vehicle-details-skeleton__section">
          <div className="skeleton skeleton--section-title" />
          <div className="skeleton skeleton--paragraph" />
          <div className="skeleton skeleton--paragraph skeleton--paragraph-short" />
        </div>

        <div className="vehicle-details-skeleton__section">
          <div className="skeleton skeleton--section-title" />
          <div className="specs-list">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="skeleton skeleton--spec" />
            ))}
          </div>
        </div>

        <div className="vehicle-details-skeleton__section">
          <div className="skeleton skeleton--section-title" />
          <div className="skeleton skeleton--comment" />
          <div className="skeleton skeleton--comment" />
        </div>
      </div>
    </div>
  );
}
