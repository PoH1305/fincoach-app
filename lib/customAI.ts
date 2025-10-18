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

const topicResponses = {
  budget: {
    supportive: [
      "Creating a budget is such a positive step! 💚 Start with the 50-30-20 rule: 50% for needs, 30% for wants, 20% for savings. What's your monthly income?",
      "I'm so proud you're thinking about budgeting! 🌟 Try tracking expenses for a week first - it's eye-opening. Which category do you spend most on?"
    ],
    analytical: [
      "Budget allocation should be: 50% needs (₹15,000), 30% wants (₹9,000), 20% savings (₹6,000) for ₹30,000 income. 📊 What's your current breakdown?",
      "Data shows people who budget save 15% more annually. 📈 Use zero-based budgeting: every rupee has a purpose. What's your priority expense?"
    ],
    motivational: [
      "BUDGETING = FREEDOM! 🚀 You're taking control of your financial destiny! Start TODAY with the envelope method. What's your biggest money goal?",
      "YES! Budgets aren't restrictions, they're PERMISSION to spend guilt-free! 💪 Track everything for 30 days and watch your wealth grow!"
    ],
    practical: [
      "Simple budget: List income, subtract fixed expenses, allocate rest to categories. ✅ Use apps like YNAB or even Excel. What's your monthly income?",
      "Practical tip: Pay yourself first - save ₹5,000 immediately when salary comes. 💡 Then budget the rest. When do you get paid?"
    ]
  },
  investment: {
    supportive: [
      "Investing is wonderful for your future! 🌱 Start small with SIP - even ₹1,000/month grows to ₹15L in 20 years at 12% returns. Ready to begin?",
      "You're thinking long-term - that's beautiful! 💖 Mutual funds are perfect for beginners. Equity funds for growth, debt for stability. What's your risk appetite?"
    ],
    analytical: [
      "Historical data: Equity mutual funds return 12-15% annually over 15+ years. 📊 ₹5,000 SIP = ₹50L in 20 years. Start with large-cap funds. Your investment horizon?",
      "Asset allocation by age: 100 - your age = equity percentage. 📈 At 30: 70% equity, 30% debt. Rebalance annually. What's your current age?"
    ],
    motivational: [
      "INVESTING IS YOUR WEALTH MACHINE! 🔥 Every ₹1,000 today becomes ₹16,000 in 20 years! Start your SIP NOW and become a CROREPATI! What's stopping you?",
      "TIME IS MONEY! ⏰ The earlier you start, the RICHER you become! Compound interest is the 8th wonder of the world! When will you start your SIP?"
    ],
    practical: [
      "Start simple: Open demat account, choose 2-3 diversified equity funds, set up ₹3,000 SIP. ✅ Increase by 10% yearly. Which broker do you prefer?",
      "Practical approach: 80C tax-saving ELSS funds first (₹1.5L limit), then regular equity funds. 💡 Direct plans save 1% fees annually. Ready to start?"
    ]
  },
  savings: {
    supportive: [
      "Saving is self-care for your future self! 💚 Start with ₹100/day - that's ₹36,500/year! Small steps, big dreams. What motivates you to save?",
      "Every rupee saved is a rupee earned! 🌟 Try the 52-week challenge: save ₹100 week 1, ₹200 week 2, and so on. You've got this!"
    ],
    analytical: [
      "Emergency fund = 6 months expenses. If you spend ₹25,000/month, save ₹1.5L in liquid funds. 📊 Then invest surplus. What's your monthly expense?",
      "Savings rate benchmark: 20% of income minimum. ₹50,000 income = ₹10,000 savings. 📈 Automate transfers on salary day. What's your current rate?"
    ],
    motivational: [
      "SAVINGS = FREEDOM FROM FINANCIAL STRESS! 💪 Pay yourself FIRST! ₹5,000/month = ₹6L in 10 years! You're building your EMPIRE! What's your target?",
      "EVERY RUPEE COUNTS! 🔥 Skip that ₹200 coffee = ₹73,000/year saved! Small sacrifices, MASSIVE results! What will you cut today?"
    ],
    practical: [
      "Automate savings: Set up standing instruction for ₹5,000 on salary day. ✅ Use high-yield savings accounts (6-7% interest). Which bank do you use?",
      "Practical rule: Save first, spend later. 💡 Direct ₹10,000 to savings account, then budget remaining income. What's your monthly income?"
    ]
  },
  debt: {
    supportive: [
      "Debt doesn't define you - you're taking steps to overcome it! 💚 List all debts, pay minimums, then attack highest interest first. You can do this!",
      "I believe in your ability to become debt-free! 🌟 Try the snowball method: pay smallest debt first for motivation. What's your total debt amount?"
    ],
    analytical: [
      "Debt avalanche method: Pay minimums on all, extra payment on highest interest rate debt. 📊 Credit cards (24-36%) before personal loans (12-18%). What's your highest rate?",
      "Calculate debt-to-income ratio: Total debt payments ÷ monthly income. 📈 Keep below 40%. Consolidate high-interest debts if possible. What's your ratio?"
    ],
    motivational: [
      "DEBT IS TEMPORARY, FREEDOM IS FOREVER! 🚀 Attack it with FURY! Every extra ₹1,000 payment saves thousands in interest! You're a DEBT-SLAYING WARRIOR!",
      "BREAK THOSE CHAINS! 💪 Debt is stealing your dreams! Pay ₹2,000 extra monthly and cut years off your loans! What debt will you CRUSH first?"
    ],
    practical: [
      "List debts: amount, interest rate, minimum payment. Pay minimums + extra on highest rate. ✅ Consider balance transfer for credit cards. What's your strategy?",
      "Practical tip: Use windfalls (bonus, tax refund) for debt payment. 💡 Avoid new debt while paying off existing. What's your next payment date?"
    ]
  },
  goals: {
    supportive: [
      "Having financial goals shows such wisdom! 💚 Break big goals into monthly targets. ₹10L house = ₹8,333/month for 10 years. What's your dream goal?",
      "Your goals are valid and achievable! 🌟 Write them down, make them specific, and celebrate small wins. What goal excites you most?"
    ],
    analytical: [
      "SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. 📊 ₹5L vacation in 2 years = ₹20,833/month savings needed. What's your timeline?",
      "Goal-based investing: Short-term (1-3 years) = debt funds, Long-term (5+ years) = equity funds. 📈 What's your investment horizon?"
    ],
    motivational: [
      "GOALS WITHOUT DEADLINES ARE JUST DREAMS! 🔥 Set that target date and CRUSH IT! Your future self will THANK you! What's your #1 financial goal?",
      "DREAM BIG, SAVE BIGGER! 🚀 That ₹50L house? START TODAY with ₹10,000/month! Every goal is achievable with ACTION! When do you want it?"
    ],
    practical: [
      "Break goals into monthly savings: ₹2L car in 3 years = ₹5,556/month. ✅ Open separate savings account for each goal. What's your priority goal?",
      "Practical approach: Automate goal-based SIPs. 💡 ₹3,000/month for 5 years = ₹2.5L+ for vacation. Which goal needs immediate action?"
    ]
  }
}

function getFallbackResponse(message: string, personality: string): string {
  const responses = fallbackResponses[personality as keyof typeof fallbackResponses] || fallbackResponses.supportive
  const lowerMessage = message.toLowerCase()
  
  // Check for greetings
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.length < 10) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)]
  }
  
  // Check for specific topics
  if (lowerMessage.includes('budget') || lowerMessage.includes('expense') || lowerMessage.includes('spend')) {
    const topicResponse = topicResponses.budget[personality as keyof typeof topicResponses.budget] || topicResponses.budget.supportive
    return topicResponse[Math.floor(Math.random() * topicResponse.length)]
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('sip') || lowerMessage.includes('mutual fund') || lowerMessage.includes('stock')) {
    const topicResponse = topicResponses.investment[personality as keyof typeof topicResponses.investment] || topicResponses.investment.supportive
    return topicResponse[Math.floor(Math.random() * topicResponse.length)]
  }
  
  if (lowerMessage.includes('save') || lowerMessage.includes('saving') || lowerMessage.includes('emergency fund')) {
    const topicResponse = topicResponses.savings[personality as keyof typeof topicResponses.savings] || topicResponses.savings.supportive
    return topicResponse[Math.floor(Math.random() * topicResponse.length)]
  }
  
  if (lowerMessage.includes('debt') || lowerMessage.includes('loan') || lowerMessage.includes('emi') || lowerMessage.includes('credit card')) {
    const topicResponse = topicResponses.debt[personality as keyof typeof topicResponses.debt] || topicResponses.debt.supportive
    return topicResponse[Math.floor(Math.random() * topicResponse.length)]
  }
  
  if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('target') || lowerMessage.includes('dream')) {
    const topicResponse = topicResponses.goals[personality as keyof typeof topicResponses.goals] || topicResponses.goals.supportive
    return topicResponse[Math.floor(Math.random() * topicResponse.length)]
  }
  
  // Default to general responses
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