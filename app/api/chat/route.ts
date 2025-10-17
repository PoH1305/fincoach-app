import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const systemPrompt = `You are FinCoach, a supportive and playful AI financial wellness coach. 
    Your personality is friendly, empowering, and celebrates small wins. 
    Use emojis naturally and keep responses concise but helpful.
    Always end with an actionable suggestion or question to keep the conversation engaging.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBib6xYJwPPvVvnX-i8nOCKIlg1l3d24eY`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}

User: ${message}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help with your finances! 💰"
    
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ 
      response: "I'm having trouble connecting right now, but I'm still here to support your financial journey! 🌟" 
    })
  }
}