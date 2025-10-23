import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { message, context } = body || {}

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid request: message required' }, { status: 400 })
    }

    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are FinCoach, a supportive AI financial advisor. Context: ${context || 'General financial advice'}. User message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    })
    if (!response.ok) {
      const text = await response.text().catch(() => '')
      return NextResponse.json({ error: 'AI provider error', details: text }, { status: 502 })
    }

    const data = await response.json()
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that request.'

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('chat route error:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}