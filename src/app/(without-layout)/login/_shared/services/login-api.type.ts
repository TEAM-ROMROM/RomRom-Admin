interface LoginRequest {
  username: string;
  password: string;
}

interface TokenPair {
  accessToken?: string;
  refreshToken?: string;
}

export type { LoginRequest, TokenPair };