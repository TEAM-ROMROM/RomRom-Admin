import { ERROR_CODES, ErrorCodeKey, ErrorResponse } from "@/lib/error/error-code";

export class CustomError extends Error {
  readonly status: number;
  readonly message: string;

  constructor(errorCode: ErrorCodeKey) {
    const errorResponse: ErrorResponse = ERROR_CODES[errorCode];
    super(errorResponse.message);
    this.status = errorResponse.status;
    this.message = errorResponse.message;
  }
}