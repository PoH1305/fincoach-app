import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history = [], context } = body || {}

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid request: message required' }, { status: 400 })
    }

    const prompt = `You are FinCoach, a supportive AI financial advisor. ${context || 'General financial advice'}

User: ${message}`

    return NextResponse.json({ response: prompt })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}