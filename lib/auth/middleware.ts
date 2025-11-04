import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  
  try {
    // Verify Firebase token (client-side verification)
    // In production, use Firebase Admin SDK for server-side verification
    const user = auth.currentUser
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    return handler(request, user.uid)
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
