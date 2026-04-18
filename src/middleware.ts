import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Lets the root layout know when to mount Payload’s document shell
 * (`<html data-theme>`, admin CSS) so marketing routes keep their own
 * light theme tokens (e.g. `--border` from `globals.css`).
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-payload-admin", "1");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
