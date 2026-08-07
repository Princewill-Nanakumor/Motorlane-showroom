export interface LocalComment {
  id: string;
  vehicleId: number;
  name: string;
  comment: string;
  createdAt: string;
}

export interface StoredComments {
  vehicleId: number;
  comments: LocalComment[];
}

export type CommentsStorage = Record<string, StoredComments>;

export interface DisplayComment {
  id: string;
  name: string;
  comment: string;
  date: string;
  rating?: number;
  source: 'api' | 'local';
}
