import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')

  if (cookie) return

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = { matcher: ['/board/:path*', '/analytics'] }
