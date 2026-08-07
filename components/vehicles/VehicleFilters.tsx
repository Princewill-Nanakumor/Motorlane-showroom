import type { SortOption, VehicleFilters as Filters } from '@/types/vehicle';

interface VehicleFiltersProps {
  filters: Filters;
  brands: string[];
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
}

export function VehicleFilters({
  filters,
  brands,
  onChange,
  onReset,
}: VehicleFiltersProps) {
  return (
    <form
      className="vehicle-filters"
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset className="vehicle-filters__fieldset">
        <legend className="vehicle-filters__legend">Filters</legend>

        <div className="vehicle-filters__grid">
          <div className="field">
            <label htmlFor="min-price">Minimum price</label>
            <input
              id="min-price"
              type="number"
              min={0}
              step={100}
              inputMode="numeric"
              value={filters.minPrice}
              onChange={(event) => onChange('minPrice', event.target.value)}
              placeholder="0"
            />
          </div>

          <div className="field">
            <label htmlFor="max-price">Maximum price</label>
            <input
              id="max-price"
              type="number"
              min={0}
              step={100}
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={(event) => onChange('maxPrice', event.target.value)}
              placeholder="50000"
            />
          </div>

          <div className="field">
            <label htmlFor="min-rating">Minimum rating</label>
            <select
              id="min-rating"
              value={filters.minRating}
              onChange={(event) => onChange('minRating', event.target.value)}
            >
              <option value="">Any</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              value={filters.brand}
              onChange={(event) => onChange('brand', event.target.value)}
            >
              <option value="">All brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="sort-by">Sort by</label>
            <select
              id="sort-by"
              value={filters.sortBy}
              onChange={(event) =>
                onChange('sortBy', event.target.value as SortOption)
              }
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating-desc">Rating: high to low</option>
              <option value="title-asc">Name: A–Z</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="btn btn--ghost"
          onClick={onReset}
        >
          Reset filters
        </button>
      </fieldset>
    </form>
  );
}
