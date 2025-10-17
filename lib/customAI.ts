const coachingPersonalities = {
  supportive: { name: "Maya - The Supportive Coach" },
  analytical: { name: "Arjun - The Analytical Coach" },
  motivational: { name: "Raj - The Motivational Coach" },
  practical: { name: "Priya - The Practical Coach" }
}

const fallbackResponses = {
  supportive: {
    greetings: [
      "Hello! 👋 I'm Maya, your supportive financial coach. I'm here to help you build healthy money habits with kindness and patience. What's on your mind today?",
      "Hi there! 😊 It's wonderful to see you taking charge of your finances. I'm here to support you every step of the way. How can I help?",
      "Welcome! 🌟 I'm so glad you're here. Building financial wellness is a journey, and I'm excited to be your companion. What would you like to explore?"
    ],
    general: [
      "That's a great question! 💚 Let's work through this together. Start by tracking your expenses for a week - it's amazing what patterns you'll discover. What's your biggest financial concern right now?",
      "I love your curiosity about finances! 🌱 Small steps lead to big changes. Have you considered setting up a simple budget? What's one financial goal you'd like to achieve?",
      "You're doing great by asking questions! 💪 Financial literacy is a superpower. Let's focus on building one habit at a time. What area would you like to improve first?"
    ]
  },
  analytical: {
    greetings: [
      "Hello! I'm Arjun, your analytical financial coach. 📊 I'll help you make data-driven decisions with clear numbers and facts. What financial data shall we analyze today?",
      "Greetings! 📈 I'm here to provide you with logical, evidence-based financial guidance. Let's dive into the numbers and optimize your financial strategy. What's your current situation?",
      "Welcome! 🔍 I specialize in breaking down complex financial concepts into clear, actionable insights. What financial metrics would you like to understand better?"
    ],
    general: [
      "Let's analyze this systematically. 📊 Based on the 50-30-20 rule, you should allocate 50% to needs, 30% to wants, and 20% to savings. What's your current allocation?",
      "Here's the data: 📈 SIP investments in equity mutual funds have historically returned 12-15% annually over 10+ years. How much can you invest monthly?",
      "The numbers show that emergency funds should cover 6 months of expenses. 💰 If your monthly expenses are ₹30,000, you need ₹1.8L in liquid funds. What's your current emergency fund status?"
    ]
  },
  motivational: {
    greetings: [
      "Hey champion! 🚀 I'm Raj, your motivational financial coach! Ready to crush your money goals and build wealth like a boss? Let's make it happen!",
      "What's up, future millionaire! 💪 I'm here to pump you up and get you fired up about your finances! Every rupee counts, every goal matters! What's your big dream?",
      "Hello superstar! ⭐ Your financial journey starts NOW! I'm Raj, and I'm here to keep you motivated and moving forward. What goal are we conquering today?"
    ],
    general: [
      "YES! That's the spirit! 🔥 You're already winning by asking the right questions! Start with ₹100/day savings - that's ₹36,500/year! What's stopping you from starting TODAY?",
      "BOOM! 💥 You've got this! Every financial expert started where you are now. Set that SIP, track those expenses, and watch your wealth GROW! What's your first move?",
      "Amazing energy! 🌟 You're not just managing money, you're building your FUTURE! Small actions, BIG results! What's one thing you'll do differently this week?"
    ]
  },
  practical: {
    greetings: [
      "Hi, I'm Priya, your practical financial coach. ✅ I'll give you straightforward, no-nonsense advice that actually works. What financial challenge can I help you solve?",
      "Hello! 👋 I'm here to cut through the complexity and give you simple, actionable financial advice. No fluff, just results. What do you need help with?",
      "Welcome! 💼 I focus on practical solutions that fit real life. Let's solve your money problems with simple, proven strategies. What's your main concern?"
    ],
    general: [
      "Here's what works: ✅ Use the envelope method - allocate cash for each category. Start with ₹5000 for groceries, ₹2000 for entertainment. Simple and effective. What categories do you need?",
      "Practical tip: 💡 Set up automatic transfers on salary day - ₹5000 to savings, ₹3000 to SIP. Remove the temptation to spend first. When do you get paid?",
      "Real talk: 📝 Track every expense for 30 days using any app. You'll find ₹3000-5000 in wasteful spending. Then redirect that to investments. Ready to start?"
    ]
  }
}

function getFallbackResponse(message: string, personality: string): string {
  const responses = fallbackResponses[personality as keyof typeof fallbackResponses] || fallbackResponses.supportive
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.length < 10) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)]
  }
  
  return responses.general[Math.floor(Math.random() * responses.general.length)]
}

export async function generateGeminiResponse(message: string, personality: string): Promise<string> {
  try {
    const personalityPrompts = {
      supportive: "You are Maya, a supportive financial coach. Be encouraging, warm, and patient. Use gentle guidance with positive reinforcement.",
      analytical: "You are Arjun, an analytical financial coach. Be logical, data-driven, and precise. Provide detailed explanations with numbers and facts.",
      motivational: "You are Raj, a motivational financial coach. Be energetic, inspiring, and action-oriented. Use high-energy motivation with actionable steps.",
      practical: "You are Priya, a practical financial coach. Be straightforward, no-nonsense, and realistic. Give simple, actionable advice with real examples."
    }
    
    const systemPrompt = `${personalityPrompts[personality as keyof typeof personalityPrompts] || personalityPrompts.supportive}

You are a financial coach helping with personal finance questions. Keep responses concise, helpful, and focused on Indian financial context (₹, SIP, mutual funds, etc.). Always end with a follow-up question to keep the conversation going.`
    
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
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message, personality)
  } catch (error) {
    console.error('Gemini API error:', error)
    return getFallbackResponse(message, personality)
  }
}

export { coachingPersonalities }