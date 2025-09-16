import { LoginRequest, TokenPair } from "@/app/(without-layout)/login/_shared/services/login-api.type";
import httpClient from "@/lib/http-client";
import { isLocalhost } from "@/lib/utils";

export async function login(data: LoginRequest): Promise<TokenPair> {
  const api = httpClient<Response>();
  const res = await api("/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  if (isLocalhost()) {
    const json = await res.json();
    return {accessToken: json?.accessToken, refreshToken: json?.refreshToken}
  }
  return {}
}
