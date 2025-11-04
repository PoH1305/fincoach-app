import { NextRequest, NextResponse } from 'next/server'
import { chatRequestSchema } from '@/lib/schemas'
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = chatRequestSchema.parse(body)
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Fetch user context from Firestore
    let contextHistory: any[] = []
    if (validated.userId) {
      const sessionsRef = collection(db, 'users', validated.userId, 'sessions')
      const q = query(sessionsRef, orderBy('timestamp', 'desc'), limit(5))
      const snapshot = await getDocs(q)
      contextHistory = snapshot.docs.map(doc => doc.data())
    }

    const systemPrompt = `You are FinCoach, a supportive AI financial advisor specializing in Indian personal finance. 
Context: ${validated.context || 'General financial advice'}
Previous interactions: ${contextHistory.length > 0 ? JSON.stringify(contextHistory.slice(0, 2)) : 'None'}`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser: ${validated.message}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'AI provider error' }, { status: 502 })
    }

    const data = await response.json()
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that.'

    // Save to Firestore
    if (validated.userId) {
      await addDoc(collection(db, 'users', validated.userId, 'sessions'), {
        message: validated.message,
        response: aiResponse,
        timestamp: new Date(),
      })
    }

    return NextResponse.json({ response: aiResponse })
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
