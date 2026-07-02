import type { ApiResponse, ErrorResponse } from "../types/api";

export function successResponse<T>(data: T, message = "Success") {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };

  return response;
}

export function errorResponse(message: string, details: string[] = []) {
  const response: ErrorResponse = {
    success: false,
    message,
    details,
  };

  return response;
}
