import { db } from '@/lib/firebase'
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

interface AIMemory {
  userId: string
  context: {
    goals: string[]
    preferences: {
      riskTolerance: 'low' | 'medium' | 'high'
      savingsStyle: 'aggressive' | 'moderate' | 'conservative'
      topCategories: string[]
    }
    insights: Array<{ text: string; timestamp: Date }>
    conversations: Array<{ message: string; response: string; timestamp: Date }>
  }
  lastUpdated: Date
}

export async function getAIMemory(userId: string): Promise<AIMemory | null> {
  try {
    const memoryRef = doc(db, 'users', userId, 'aiMemory', 'context')
    const memorySnap = await getDoc(memoryRef)
    
    if (memorySnap.exists()) {
      return memorySnap.data() as AIMemory
    }
    return null
  } catch (error) {
    console.error('Error fetching AI memory:', error)
    return null
  }
}

export async function saveAIMemory(userId: string, memory: Partial<AIMemory>): Promise<void> {
  try {
    const memoryRef = doc(db, 'users', userId, 'aiMemory', 'context')
    await setDoc(memoryRef, {
      ...memory,
      userId,
      lastUpdated: serverTimestamp()
    }, { merge: true })
  } catch (error) {
    console.error('Error saving AI memory:', error)
  }
}

export async function addConversation(userId: string, message: string, response: string): Promise<void> {
  const memory = await getAIMemory(userId)
  const conversations = memory?.context.conversations || []
  
  conversations.push({
    message,
    response,
    timestamp: new Date()
  })
  
  await saveAIMemory(userId, {
    context: {
      ...memory?.context,
      conversations: conversations.slice(-10)
    }
  } as any)
}

export async function addInsight(userId: string, insight: string): Promise<void> {
  const memory = await getAIMemory(userId)
  const insights = memory?.context.insights || []
  
  insights.push({
    text: insight,
    timestamp: new Date()
  })
  
  await saveAIMemory(userId, {
    context: {
      ...memory?.context,
      insights: insights.slice(-5)
    }
  } as any)
}

export function buildContextPrompt(memory: AIMemory | null, currentMessage: string): string {
  if (!memory) return currentMessage
  
  const recentConversations = memory.context.conversations.slice(-3)
  const recentInsights = memory.context.insights.slice(-2)
  
  return `User Context:
Goals: ${memory.context.goals.join(', ') || 'None set'}
Preferences: ${memory.context.preferences.savingsStyle} saver, ${memory.context.preferences.riskTolerance} risk
Recent insights: ${recentInsights.map(i => i.text).join('; ')}
Recent chat: ${recentConversations.map(c => `User: ${c.message} | AI: ${c.response}`).join(' | ')}

Current message: ${currentMessage}`
}
