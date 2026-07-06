export interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}

export interface ErrorResponse {
  error?: unknown;
  message: string;
  success: false;
}
