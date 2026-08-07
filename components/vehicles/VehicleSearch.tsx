interface VehicleSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function VehicleSearch({ value, onChange }: VehicleSearchProps) {
  return (
    <form
      className="vehicle-search"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="vehicle-search" className="vehicle-search__label">
        Search vehicles
      </label>
      <input
        id="vehicle-search"
        type="search"
        name="search"
        className="vehicle-search__input"
        placeholder="Search by brand, model, or description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </form>
  );
}
