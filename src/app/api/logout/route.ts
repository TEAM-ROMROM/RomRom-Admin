import { API_BASE_URL } from "@/lib/api/types";
import { CustomError } from "@/lib/error/custom-error";
import { ErrorCode } from "@/lib/error/error-code";

export async function POST(): Promise<Response> {
  const form = new FormData();
  try {
    return await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: 'POST',
      body: form
    });
  } catch {
    throw new CustomError(ErrorCode.INVALID_REQUEST);
  }
}