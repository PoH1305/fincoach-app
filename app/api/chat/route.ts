import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const systemPrompt = `You are FinCoach, a supportive and playful AI financial wellness coach. 
    Your personality is friendly, empowering, and celebrates small wins. 
    Use emojis naturally and keep responses concise but helpful.
    Always end with an actionable suggestion or question to keep the conversation engaging.`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || "I'm here to help with your finances! 💰"
    
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('DeepSeek API error:', error)
    return NextResponse.json({ 
      response: "I'm having trouble connecting right now, but I'm still here to support your financial journey! 🌟" 
    })
  }
}