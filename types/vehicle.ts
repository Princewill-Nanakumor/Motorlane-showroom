export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface VehicleDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Vehicle {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: VehicleDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  thumbnail: string;
  reviews: Review[];
  discountPercentage?: number;
}

export interface VehiclesResponse {
  products: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}

export interface VehicleFilters {
  search: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  brand: string;
  sortBy: SortOption;
}

export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'title-asc';
