import { NextResponse } from 'next/server';

// NOTE: middleware runs on Vercel's Edge Runtime, which does not support
// Node's `crypto` module — so this file must NOT import from lib/auth.js
// (which uses crypto.createHmac). It only checks that a session cookie is
// present; the actual signed-session verification happens in lib/session.js,
// which runs inside Server Components/Actions (Node runtime), where crypto
// is fully supported.
const COOKIE_NAME = 'shabat_session';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/public|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)'],
};
