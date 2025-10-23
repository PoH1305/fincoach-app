import { NextRequest, NextResponse } from 'next/server'

// Simple deterministic local AI-like endpoint for development and free testing.
// Accepts POST { message, history, context } and returns a lightweight response.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history = [], context } = body || {}

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid request: message required' }, { status: 400 })
    }

    // Basic heuristics to return a helpful dev response
    const lower = message.toLowerCase()
    let reply = "I'm your local FinCoach (dev mode). Ask me about budgets, expenses, or savings."

    if (lower.includes('budget')) {
      reply = "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Want help allocating specific amounts?"
    } else if (lower.includes('save') || lower.includes('savings')) {
      reply = "Small changes add up. Try saving one small recurring expense each week — it could become a monthly habit."
    } else if (lower.includes('expense') || lower.includes('spent')) {
      reply = "Review last month's transactions and group recurring subscriptions — you might find easy savings."
    } else if (lower.includes('hi') || lower.includes('hello')) {
      reply = "Hey! I'm your FinCoach dev assistant. How can I help you with money today?"
    }

    // If context or history mentions a goal, be slightly more specific
    if ((context || '').toString().toLowerCase().includes('goal')) {
      reply += ' I see you have a goal — would you like a simple weekly savings plan?'
    }

    return NextResponse.json({ response: reply })
  } catch (error: any) {
    console.error('local AI error:', error)
    return NextResponse.json({ error: 'Local AI failed', details: String(error) }, { status: 500 })
  }
}
