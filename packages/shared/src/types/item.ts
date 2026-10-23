export interface Item {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
}

export interface CreateItemInput {
  title: string;
  description?: string;
}
