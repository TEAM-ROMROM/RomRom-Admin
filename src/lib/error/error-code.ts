export interface ErrorResponse {
  readonly status: number;
  readonly message: string;
}

export const ERROR_CODES = {

  // GLOBAL
  UNSUPPORTED_MEDIA_TYPE: { status: 415, message: '지원하지 않는 미디어 형식입니다.' },
  INVALID_REQUEST: { status: 400, message: '유효하지 않은 요청입니다.' },

  // AUTH
  LOGIN_FAILED: { status: 401, message: '아이디 또는 비밀번호를 확인하세요.' },

  // 네트워크/업스트림
  UPSTREAM_UNREACHABLE: { status: 502, message: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.' },
  NETWORK_ERROR: { status: 503, message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
  TIMEOUT: { status: 504, message: '요청이 지연되고 있습니다. 잠시 후 다시 시도해주세요.' },

  // UNKNOWN
  UNKNOWN_ERROR: { status: 500, message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }

} as const;

export type ErrorCodeKey = keyof typeof ERROR_CODES;

function createErrorCode<T extends Record<string, { status: number; message: string }>>(obj: T) {
  type K = keyof T & string;
  const entries = Object.keys(obj).map((k) => [k, k] as const);
  return Object.freeze(Object.fromEntries(entries) as { [P in K]: P });
}

export const ErrorCode = createErrorCode(ERROR_CODES);

