'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb, Target, Trophy, Zap, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VoiceInput } from '@/components/ui/VoiceInput'
import { useAppStore } from '../../lib/store'
import { proactiveAssistant, ProactiveMessage } from '../../lib/ai/proactiveAssistant'


interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isProactive?: boolean
  type?: 'insight' | 'goal' | 'celebration' | 'challenge'
  feedbackScore?: number
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm your FinCoach. Ready to make some smart money moves today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState('supportive')
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [useLocal, setUseLocal] = useState(false)

  const addProactiveMessage = useCallback(async () => {
    try {
      const proactiveMsg = await proactiveAssistant.generateDemoMessage('demo')
      const newMessage: Message = {
        id: proactiveMsg.id,
        text: proactiveMsg.message,
        sender: 'bot',
        timestamp: proactiveMsg.timestamp,
        isProactive: true,
        type: proactiveMsg.type
      }
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error('Error adding proactive message:', error)
    }
  }, [])

  const loadProactiveMessages = async () => {
    try {
      const proactiveMessages = await proactiveAssistant.getProactiveMessages('demo')
      const formattedMessages = proactiveMessages.map(msg => ({
        id: msg.id,
        text: msg.message,
        sender: 'bot' as const,
        timestamp: msg.timestamp,
        isProactive: true,
        type: msg.type
      }))
      setMessages(prev => [...prev, ...formattedMessages])
    } catch (error) {
      console.error('Error loading proactive messages:', error)
    }
  }

  useEffect(() => {
    loadProactiveMessages()
  }, [])

  useEffect(() => {
    if (userMessageCount > 0 && userMessageCount % 3 === 0) {
      addProactiveMessage()
    }
  }, [userMessageCount, addProactiveMessage])
  
  const personalities = [
    { id: 'supportive', name: 'Maya - Supportive', icon: '🤗', description: 'Gentle guidance' },
    { id: 'analytical', name: 'Arjun - Analytical', icon: '📊', description: 'Data-driven insights' },
    { id: 'motivational', name: 'Raj - Motivational', icon: '🚀', description: 'High-energy motivation' },
    { id: 'practical', name: 'Priya - Practical', icon: '✅', description: 'Simple, actionable advice' }
  ]

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

  setMessages(prev => [...prev, userMessage])
  const currentInput = input
  setInput('')
  setIsTyping(true)

    try {
      // Send a trimmed/sanitized history to the server to avoid sending large objects
      const sanitizedHistory = messages
        .slice(-10) // only keep the last 10 messages
        .map(m => ({ sender: m.sender, text: m.text }))

      const endpoint = useLocal ? '/api/local' : '/api/gemini'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: sanitizedHistory,
          context: `Personality: ${selectedPersonality}. User has expenses and needs financial advice.`
        })
      })

      if (!response.ok) {
        const text = await response.text().catch(() => '')
        console.error('API Error:', response.status, text)
        throw new Error(text || `AI provider error: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process that request.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setUserMessageCount(prev => prev + 1)
    } catch (error) {
      console.error('Chat Error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${errorMsg}. Check console for details.`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedbackScore: isPositive ? 1 : -1 }
        : msg
    ))
  }

  const getProactiveIcon = (type?: string) => {
    switch (type) {
      case 'goal': return <Target className="w-4 h-4" />
      case 'celebration': return <Trophy className="w-4 h-4" />
      case 'challenge': return <Zap className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getProactiveColor = (type?: string) => {
    switch (type) {
      case 'goal': return 'from-sky/20 to-mint/20 border-sky'
      case 'celebration': return 'from-mint/20 to-lavender/20 border-mint'
      case 'challenge': return 'from-coral/20 to-sky/20 border-coral'
      default: return 'from-lavender/20 to-mint/20 border-lavender'
    }
  }

  return (
    <div className="flex flex-col h-[600px] card">
      {/* Header */}
      <div className="pb-4 border-b border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-gradient-to-r from-mint to-sky rounded-full flex items-center justify-center"
          >
            <Bot className="w-6 h-6 text-navy" />
          </motion.div>
          <div>
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-poppins font-bold text-lg text-navy">FinCoach AI</h3>
                <p className="text-sm text-navy/60">Your AI Financial Coach</p>
              </div>
              <div className="ml-2 flex items-center gap-2">
                <label className="text-xs text-navy/60">Local</label>
                <input type="checkbox" checked={useLocal} onChange={(e) => setUseLocal(e.target.checked)} />
                <label className="text-xs text-navy/60">Remote</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Personality Selector */}
        <div className="flex gap-2 overflow-x-auto">
          {personalities.map((personality) => (
            <button
              key={personality.id}
              onClick={() => setSelectedPersonality(personality.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedPersonality === personality.id
                  ? 'bg-mint text-navy font-bold'
                  : 'bg-navy/10 text-navy/70 hover:bg-navy/20'
              }`}
            >
              <span>{personality.icon}</span>
              <span>{personality.name.split(' - ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                message.sender === 'bot' 
                  ? message.isProactive
                    ? 'bg-gradient-to-r from-lavender to-mint animate-pulse'
                    : 'bg-gradient-to-r from-mint to-sky'
                  : 'bg-coral/80'
              }`}>
                {message.sender === 'bot' ? (
                  message.isProactive ? getProactiveIcon(message.type) : <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-[70%] ${
                message.isProactive
                  ? `p-4 rounded-2xl bg-gradient-to-r ${getProactiveColor(message.type)} border-l-4 backdrop-blur-md shadow-lg`
                  : message.sender === 'bot'
                    ? 'p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-md'
                    : 'p-3 rounded-2xl bg-coral/20 shadow-md'
              }`}>
                {message.isProactive && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-navy">FinCoach Tip 💡</span>
                    <span className="text-xs px-2 py-1 bg-white/30 rounded-full capitalize text-navy">
                      {message.type}
                    </span>
                  </div>
                )}
                <p className="text-sm text-navy">{message.text}</p>
                {message.isProactive && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleFeedback(message.id, true)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                        message.feedbackScore === 1
                          ? 'bg-mint/30 text-mint'
                          : 'bg-white/20 hover:bg-mint/20'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      Helpful
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, false)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                        message.feedbackScore === -1
                          ? 'bg-coral/30 text-coral'
                          : 'bg-white/20 hover:bg-coral/20'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                      Not relevant
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint to-sky flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-md">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-white/40 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-white/20">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
          disabled={isTyping}
          placeholder="Ask me anything about your finances..."
          className="flex-1 px-4 py-2 bg-white/80 backdrop-blur-md border border-navy/20 rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-mint/50 placeholder-navy/50 text-navy"
        />
        <VoiceInput onTranscript={setInput} />
        <Button onClick={sendMessage} size="sm" disabled={isTyping} className="px-4 bg-mint hover:bg-mint/80 text-navy rounded-xl shadow-lg">
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-3">
        {['Show Budget', 'Add Expense', 'Savings Tips'].map((action) => (
          <button
            key={action}
            onClick={() => setInput(action)}
            className="px-3 py-1 text-xs bg-navy/10 text-navy/70 rounded-full hover:bg-navy/20 transition-colors"
          >
            {action}
          </button>
        ))}
        <button
          onClick={() => setInput('Give me an AI tip')}
          className="px-3 py-1 text-xs bg-lavender/20 text-navy/80 rounded-full hover:bg-lavender/30 transition-colors"
        >
          💡 AI Tip
        </button>
      </div>
    </div>
  )
}