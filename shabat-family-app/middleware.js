import { NextResponse } from 'next/server';
import { readSessionValue, COOKIE_NAME } from './lib/auth';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const session = readSessionValue(cookie);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/public|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)'],
};
