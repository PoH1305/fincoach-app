const coachingPersonalities = {
  supportive: { name: "Maya - The Supportive Coach" },
  analytical: { name: "Arjun - The Analytical Coach" },
  motivational: { name: "Raj - The Motivational Coach" },
  practical: { name: "Priya - The Practical Coach" }
}

export async function generateGeminiResponse(message: string, personality: string): Promise<string> {
  if (!process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY) {
    console.error('NEXT_PUBLIC_DEEPSEEK_API_KEY not found in environment variables')
    return "API key not configured. Please check your environment setup."
  }

  try {
    const personalityPrompts = {
      supportive: "You are Maya, a supportive financial coach. Be encouraging, warm, and patient. Use gentle guidance with positive reinforcement.",
      analytical: "You are Arjun, an analytical financial coach. Be logical, data-driven, and precise. Provide detailed explanations with numbers and facts.",
      motivational: "You are Raj, a motivational financial coach. Be energetic, inspiring, and action-oriented. Use high-energy motivation with actionable steps.",
      practical: "You are Priya, a practical financial coach. Be straightforward, no-nonsense, and realistic. Give simple, actionable advice with real examples."
    }
    
    const systemPrompt = `${personalityPrompts[personality as keyof typeof personalityPrompts] || personalityPrompts.supportive}

You are a financial coach helping with personal finance questions. Keep responses concise, helpful, and focused on Indian financial context (₹, SIP, mutual funds, etc.). Always end with a follow-up question to keep the conversation going.`
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || "I'm having trouble responding right now."
  } catch (error) {
    console.error('DeepSeek API error:', error)
    return "I'm having trouble connecting right now. Please try again!"
  }
}

export { coachingPersonalities }