'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb, Target, Trophy, Zap, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VoiceInput } from '@/components/ui/VoiceInput'
import { generateGeminiResponse, coachingPersonalities } from '../../lib/customAI'
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
  const [showProactiveDemo, setShowProactiveDemo] = useState(false)

  useEffect(() => {
    // Load proactive messages on component mount
    loadProactiveMessages()
    
    // Demo: Show proactive message after 5 seconds
    const timer = setTimeout(() => {
      if (!showProactiveDemo) {
        addProactiveMessage()
        setShowProactiveDemo(true)
      }
    }, 5000)
    
    return () => clearTimeout(timer)
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
      setMessages(prev => [...formattedMessages, ...prev])
    } catch (error) {
      console.error('Error loading proactive messages:', error)
    }
  }

  const addProactiveMessage = async () => {
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
      setMessages(prev => [newMessage, ...prev])
    } catch (error) {
      console.error('Error adding proactive message:', error)
    }
  }
  
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
      const response = await generateGeminiResponse(currentInput, selectedPersonality)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble right now. Please try again!',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
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
            <h3 className="font-poppins font-bold text-lg">{coachingPersonalities[selectedPersonality as keyof typeof coachingPersonalities]?.name || 'FinCoach'}</h3>
            <p className="text-sm text-navy/60">Your AI Financial Coach</p>
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
                  ? 'bg-mint/30 text-navy'
                  : 'bg-white/10 text-navy/70 hover:bg-white/20'
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'bot' 
                  ? message.isProactive
                    ? 'bg-gradient-to-r from-lavender to-mint animate-pulse'
                    : 'bg-gradient-to-r from-mint to-sky'
                  : 'bg-coral/20'
              }`}>
                {message.sender === 'bot' ? (
                  message.isProactive ? getProactiveIcon(message.type) : <Bot className="w-4 h-4 text-navy" />
                ) : (
                  <User className="w-4 h-4 text-coral" />
                )}
              </div>
              <div className={`max-w-[70%] ${
                message.isProactive
                  ? `p-4 rounded-2xl bg-gradient-to-r ${getProactiveColor(message.type)} border-l-4 backdrop-blur-md`
                  : message.sender === 'bot'
                    ? 'p-3 rounded-2xl bg-white/20 backdrop-blur-md'
                    : 'p-3 rounded-2xl bg-coral/20'
              }`}>
                {message.isProactive && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-navy/80">FinCoach Tip 💡</span>
                    <span className="text-xs px-2 py-1 bg-white/30 rounded-full capitalize">
                      {message.type}
                    </span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint to-sky flex items-center justify-center">
              <Bot className="w-4 h-4 text-navy" />
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-navy/40 rounded-full"
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything about your finances..."
          className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-mint/50 placeholder-navy/50"
        />
        <VoiceInput onTranscript={setInput} />
        <Button onClick={sendMessage} size="sm" className="px-4">
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-3">
        {['Show Budget', 'Add Expense', 'Savings Tips'].map((action) => (
          <button
            key={action}
            onClick={() => setInput(action)}
            className="px-3 py-1 text-xs bg-mint/20 text-navy rounded-full hover:bg-mint/30 transition-colors"
          >
            {action}
          </button>
        ))}
        <button
          onClick={addProactiveMessage}
          className="px-3 py-1 text-xs bg-lavender/20 text-navy rounded-full hover:bg-lavender/30 transition-colors"
        >
          💡 Get AI Tip
        </button>
      </div>
    </div>
  )
}