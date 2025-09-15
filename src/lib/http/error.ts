export class ApiError extends Error {
  status: number;
  errorCode: string;
  errorMessage: string;

  constructor(message: string, params: {status: number, errorCode: string, errorMessage: string}) {
    super(message);
    this.name = 'ApiError';
    this.status = params.status;
    this.errorCode = params.errorCode;
    this.errorMessage = params.errorMessage;
  }
}
