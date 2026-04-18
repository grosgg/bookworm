import { NextResponse, after } from 'next/server'
import type { NextRequest } from 'next/server'

const APP_ID = process.env.OPS_BLOC_APP_ID;
const APP_TOKEN = process.env.OPS_BLOC_APP_TOKEN;

export function proxy(request: NextRequest) {
  const startTime = Date.now();
  const response = NextResponse.next()

  after(async () => {
    const responseTime = (Date.now() - startTime) / 1000;
    try {
      fetch(`https://opsbloc.com/logs/${APP_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${APP_TOKEN}`
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          request_method: request.method,
          request_url: request.nextUrl.pathname.replace(/\/[a-z0-9]([a-z0-9-]*[0-9][a-z0-9-]*)/gi, '/[id]'),
          status: response.status,
          client_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          user_agent: request.headers.get('user-agent'),
          request_time: responseTime,
          referer: request.headers.get('referer'),
          request_id: crypto.randomUUID()

        }),
        signal: AbortSignal.timeout(5000)
      });
    } catch (error) {
      console.error('[OpsBloc Tracking] Error:', error)
    }
  });

  return response
}

export const config = {
  matcher: [
    // Match all page routes, skip static assets and API routes
    '/((?!_next/static|_next/image|favicon|well-known/).*)',
  ],
}
