import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Countries to block (ISO 3166-1 alpha-2 codes)
const BLOCKED_COUNTRIES = [
  'IN', // India
];

export function middleware(request: NextRequest) {
  // Get country from Vercel's geo headers (geo object removed in Next.js 16)
  const country = request.headers.get('x-vercel-ip-country') || '';

  if (BLOCKED_COUNTRIES.includes(country)) {
    // Return 403 Forbidden
    return new NextResponse('Access denied', { status: 403 });
  }

  return NextResponse.next();
}

// Apply to all routes except static files and API routes you want open
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
