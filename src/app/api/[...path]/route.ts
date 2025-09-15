import { NextRequest } from "next/server";
import { createProxy } from "@/lib/bff/proxy";
import { ProxyContext } from "@/lib/bff/types";

const API_PATH: string = process.env.API_BASE_URL ?? "";

const proxy = createProxy({
  backendBaseUrl: API_PATH,
  promoteCookieToAuth: { cookieName: 'accessToken', overwriteIfExists: false },
  stripRequestHeaders: ['content-length'],
});

export function GET(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}

export function POST(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}

export function PUT(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}

export function PATCH(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}

export function DELETE(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}

export function OPTIONS(req: NextRequest, ctx: ProxyContext): Promise<Response> {
  return proxy(req, ctx);
}