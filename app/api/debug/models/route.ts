import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const key = process.env.GEMINI_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`)
    const json = await res.json()
    return NextResponse.json({ ok: true, models: json })
  } catch (error: any) {
    console.error('debug models error:', error)
    return NextResponse.json({ error: 'Failed to fetch models', details: String(error) }, { status: 500 })
  }
}
