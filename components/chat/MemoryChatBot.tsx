'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Brain } from 'lucide-react'
import { useUserStore } from '@/lib/stores/userStore'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function MemoryChatBot() {
  const { user } = useUserStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasMemory, setHasMemory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !user) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: user.id
        })
      })

      const data = await response.json()
      setHasMemory(data.hasMemory)
      
      const aiMessage: Message = { role: 'assistant', content: data.response }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] card">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy/10">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-mint" />
          <h2 className="font-bold text-lg">FinCoach AI</h2>
        </div>
        {hasMemory && (
          <div className="flex items-center gap-1 text-xs text-mint">
            <Brain className="w-4 h-4" />
            <span>Memory Active</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-mint" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-mint text-white'
                    : 'bg-navy/5 text-navy'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-sky/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-sky" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-mint" />
            </div>
            <div className="bg-navy/5 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your finances..."
          className="flex-1 px-4 py-3 border border-navy/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint/50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-mint text-white rounded-xl hover:bg-mint/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
