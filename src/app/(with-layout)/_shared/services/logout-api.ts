import httpClient from "@/lib/http-client";
import { CustomError } from "@/lib/error/custom-error";
import { ErrorCode } from "@/lib/error/error-code";

export async function logout(): Promise<void> {
  const api = httpClient<Response>();
  const res = await api("/api/logout", {
    method: "POST"
  });
  if (!res.ok) {
    throw new CustomError(ErrorCode.INVALID_REQUEST);
  }
}