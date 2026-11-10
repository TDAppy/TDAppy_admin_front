export type PageResponse<T> = {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  size: number;
};
