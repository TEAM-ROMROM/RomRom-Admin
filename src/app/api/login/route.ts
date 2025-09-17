import { NextRequest, NextResponse } from "next/server";
import { LoginRequest, TokenPair } from "@/app/(without-layout)/login/_shared/services/login-api.type";
import { CustomError } from "@/lib/error/custom-error";
import { ErrorCode } from "@/lib/error/error-code";
import { isLocalhost } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api/types";

export async function POST(req: NextRequest): Promise<Response> {
  const ctx = req.headers.get('content-type') || '';
  if (!ctx.includes('application/json')) {
    throw new CustomError(ErrorCode.UNSUPPORTED_MEDIA_TYPE);
  }

  let request: LoginRequest;
  try {
    request = (await req.json()) as LoginRequest;
  } catch {
    throw new CustomError("INVALID_REQUEST");
  }
  const { username, password } = request ?? {};
  if (!username || !password) {
    throw new CustomError(ErrorCode.INVALID_REQUEST);
  }

  // multipart/form-data 변환
  const form = new FormData();
  form.append('username', username);
  form.append('password', password);

  // 백엔드 로그인 호출
  const upstream = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    body: form
  });
  if (!upstream.ok) {
    return upstream;
  }
  // 로컬 쿠키 설정 (배포환경에서는 삭제 필요)
  if (isLocalhost()) {
    const data = (await upstream.clone().json()) as TokenPair;
    const res = NextResponse.json({ ok: true, ...data }, { status: 200 });
    if (data.accessToken) {
      res.cookies.set('accessToken', data.accessToken);
    }
    return res;
  }
  return upstream;
}