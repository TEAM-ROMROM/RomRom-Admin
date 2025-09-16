import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS: ReadonlyArray<string> = [
  '/login',            // 로그인 페이지
  '/api/login',        // 로그인 API
  '/_next',            // Next 정적 리소스
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/images',           // 정적 에셋 폴더들(있다면)
  '/icons',
  '/assets',
];

function isPublic(req: NextRequest): boolean {
  const { pathname } = req.nextUrl;
  // API 기본적으로 통과
  if (pathname.startsWith('/api')) {
    return true;
  }
  // 퍼블릭 경로 화이트리스트
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export function middleware(req: NextRequest): NextResponse {
  // 퍼블릭은 통과
  if (isPublic(req)) return NextResponse.next();

  // 인증 쿠키 검사 (HttpOnly 쿠키여도 미들웨어는 읽을 수 있음)
  const hasAccessToken = Boolean(req.cookies.get('accessToken')?.value);

  if (!hasAccessToken) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 인증됨 → 통과
  return NextResponse.next();
}


/**
 * 매칭 규칙:
 * - /api, /_next/static, /_next/image, favicon 등은 제외
 * - 나머지 모든 경로에 미들웨어 적용
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
