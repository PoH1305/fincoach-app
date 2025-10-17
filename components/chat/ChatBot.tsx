'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VoiceInput } from '@/components/ui/VoiceInput'
import { generateGeminiResponse, coachingPersonalities } from '../../lib/customAI'


interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
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
                  ? 'bg-gradient-to-r from-mint to-sky' 
                  : 'bg-coral/20'
              }`}>
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4 text-navy" />
                ) : (
                  <User className="w-4 h-4 text-coral" />
                )}
              </div>
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                message.sender === 'bot'
                  ? 'bg-white/20 backdrop-blur-md'
                  : 'bg-coral/20'
              }`}>
                <p className="text-sm">{message.text}</p>
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
      </div>
    </div>
  )
}