import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add your i18n middleware logic here
  return;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
