import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const getFinancialAdvice = async (message: string, userContext?: any) => {
  const systemPrompt = `You are FinCoach, a supportive and playful AI financial wellness coach. 
  Your personality is friendly, empowering, and celebrates small wins. 
  Use emojis naturally and keep responses concise but helpful.
  Always end with an actionable suggestion or question to keep the conversation engaging.`

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `${systemPrompt}\n\nUser: ${message}`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text || "I'm here to help! 💪"
  } catch (error) {
    console.error('Gemini API error:', error)
    return "I'm having trouble connecting right now, but I'm still here to support your financial journey! 🌟"
  }
}

export default genAI