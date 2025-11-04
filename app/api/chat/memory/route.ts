import { NextRequest, NextResponse } from 'next/server'
import { getAIMemory, addConversation, buildContextPrompt } from '@/lib/ai/aiMemory'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()
    
    if (!message || !userId) {
      return NextResponse.json({ error: 'Message and userId required' }, { status: 400 })
    }
    
    const memory = await getAIMemory(userId)
    const contextPrompt = buildContextPrompt(memory, message)
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are FinCoach, a supportive financial advisor. ${contextPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'AI error' }, { status: 502 })
    }
    
    const data = await response.json()
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that.'
    
    await addConversation(userId, message, aiResponse)
    
    return NextResponse.json({ response: aiResponse, hasMemory: !!memory })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
