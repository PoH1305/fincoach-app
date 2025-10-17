import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const systemPrompt = `You are FinCoach, a supportive and playful AI financial wellness coach. 
    Your personality is friendly, empowering, and celebrates small wins. 
    Use emojis naturally and keep responses concise but helpful.
    Always end with an actionable suggestion or question to keep the conversation engaging.`

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `${systemPrompt}\n\nUser: ${message}`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ 
      response: "I'm having trouble connecting right now, but I'm still here to support your financial journey! 🌟" 
    })
  }
}