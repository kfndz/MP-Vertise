export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  details?: string[];
};

export type ErrorResponse = {
  success: false;
  message: string;
  details: string[];
};
