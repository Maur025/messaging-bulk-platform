export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  pagination?: Pagination;
}

export interface Pagination {
  pages: number;
  count: number;
}
