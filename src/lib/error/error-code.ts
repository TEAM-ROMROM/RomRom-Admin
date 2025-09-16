export interface ErrorResponse {
  readonly status: number;
  readonly message: string;
}

export const ERROR_CODES = {

  // GLOBAL
  UNSUPPORTED_MEDIA_TYPE: {status: 415, message: '지원하지 않는 미디어 형식입니다.'},
  INVALID_REQUEST: {status: 400, message: '유효하지 않은 요청입니다.'},

  // AUTH
  LOGIN_FAILED: {status: 400, message: '로그인에 실패했습니다'},
} as const;

export type ErrorCodeKey = keyof typeof ERROR_CODES;

function createErrorCode<T extends Record<string, { status: number; message: string }>>(obj: T) {
  type K = keyof T & string;
  const entries = Object.keys(obj).map((k) => [k, k] as const);
  return Object.freeze(Object.fromEntries(entries) as { [P in K]: P});
}

export const ErrorCode = createErrorCode(ERROR_CODES);

