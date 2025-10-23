'use client'
import { db } from '../firebase'
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'

interface Transaction {
  id: string
  userId: string
  amount: number
  category: string
  description: string
  timestamp: Date
}

interface ProactiveMessage {
  id: string
  userId: string
  message: string
  type: 'insight' | 'goal' | 'celebration' | 'challenge'
  isProactive: true
  timestamp: Date
  feedbackScore?: number
  dismissed?: boolean
}

class ProactiveAssistant {
  private async getRecentTransactions(userId: string, days: number = 30): Promise<Transaction[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', userId),
      where('createdAt', '>=', cutoffDate),
      orderBy('createdAt', 'desc')
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction))
  }

  private async generateProactiveMessage(userId: string, transactions: Transaction[]): Promise<string> {
    const analysis = this.analyzeTransactions(transactions)
    
    const systemPrompt = `You are FinCoach, an empathetic financial assistant.
You analyze user transaction data, detect patterns, and generate short, actionable insights.
Respond conversationally, referencing recent behavior with positivity.
Offer 1-2 simple next steps the user can take.
Keep messages to 2-3 sentences max.
Use Indian context (₹, SIP, mutual funds).`

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Analyze these spending patterns and give one helpful proactive message: ${JSON.stringify(analysis)}`
        })
      })
      
      if (!response.ok) {
        console.error('Proactive message API error:', response.status)
        return this.getFallbackMessage(analysis)
      }
      
      const data = await response.json()
      return data.response || this.getFallbackMessage(analysis)
    } catch (error) {
      console.error('Error generating proactive message:', error)
      return this.getFallbackMessage(analysis)
    }
  }

  private analyzeTransactions(transactions: Transaction[]) {
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)
    const categories = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
    
    const topCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0]
    const avgDaily = totalSpent / 30
    
    return {
      totalSpent,
      categories,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      avgDaily,
      transactionCount: transactions.length
    }
  }

  private getFallbackMessage(analysis: any): string {
    const messages = [
      `Your ${analysis.topCategory?.name || 'spending'} is ₹${analysis.topCategory?.amount || 0} this month 💰 Want some quick saving tips?`,
      `You've spent ₹${analysis.totalSpent} in 30 days. Let's find ways to optimize your budget! 📊`,
      `Great job tracking ${analysis.transactionCount} expenses! 🎯 Ready for your next financial goal?`
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  async generateAndSaveProactiveMessage(userId: string): Promise<ProactiveMessage | null> {
    try {
      const transactions = await this.getRecentTransactions(userId)
      if (transactions.length < 3) return null
      
      const message = await this.generateProactiveMessage(userId, transactions)
      const messageType = this.determineMessageType(message)
      
      const proactiveMessage: Omit<ProactiveMessage, 'id'> = {
        userId,
        message,
        type: messageType,
        isProactive: true,
        timestamp: new Date()
      }
      
      const docRef = await addDoc(collection(db, 'proactive_messages'), proactiveMessage)
      return { id: docRef.id, ...proactiveMessage }
    } catch (error) {
      console.error('Error generating proactive message:', error)
      return null
    }
  }

  private determineMessageType(message: string): ProactiveMessage['type'] {
    if (message.includes('goal') || message.includes('target')) return 'goal'
    if (message.includes('great') || message.includes('awesome') || message.includes('congratulations')) return 'celebration'
    if (message.includes('challenge') || message.includes('try')) return 'challenge'
    return 'insight'
  }

  async getProactiveMessages(userId: string): Promise<ProactiveMessage[]> {
    const q = query(
      collection(db, 'proactive_messages'),
      where('userId', '==', userId),
      where('dismissed', '!=', true),
      orderBy('timestamp', 'desc'),
      limit(5)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProactiveMessage))
  }

  async generateDemoMessage(userId: string = 'demo'): Promise<ProactiveMessage> {
    const demoMessages = [
      {
        message: "Your food expenses are up 15% this month 🍔 Want a few quick saving ideas?",
        type: 'insight' as const
      },
      {
        message: "You're ₹2,000 away from hitting your Goa Trip goal 🌴 Should I help you save faster?",
        type: 'goal' as const
      },
      {
        message: "You've been consistent for 3 months straight 💪 Ready to increase your SIP by 10%?",
        type: 'celebration' as const
      },
      {
        message: "Try the 7-day coffee challenge ☕ Skip one coffee daily and save ₹800 this week!",
        type: 'challenge' as const
      }
    ]
    
    const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)]
    
    return {
      id: `demo-${Date.now()}`,
      userId,
      message: randomMessage.message,
      type: randomMessage.type,
      isProactive: true,
      timestamp: new Date()
    }
  }
}

export const proactiveAssistant = new ProactiveAssistant()
export type { ProactiveMessage, Transaction }