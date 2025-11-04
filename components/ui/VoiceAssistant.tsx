'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { VoiceAssistant, parseVoiceCommand } from '@/lib/ai/voiceAssistant'
import { useBudgetStore } from '@/lib/stores/budgetStore'
import { useUserStore } from '@/lib/stores/userStore'
import { useAppStore } from '@/lib/store'

export function VoiceAssistantButton() {
  const [assistant] = useState(() => new VoiceAssistant())
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const { expenses, totalBalance, addExpense } = useBudgetStore()
  const { user } = useUserStore()

  const handleVoiceCommand = async (text: string) => {
    setTranscript(text)
    const command = parseVoiceCommand(text)

    let response = ''
    switch (command.action) {
      case 'add_expense':
        if (command.data.amount) {
          const appStore = useAppStore.getState()
          appStore.addExpense({
            id: Date.now().toString(),
            amount: parseInt(command.data.amount),
            category: command.data.category,
            description: 'Voice added',
            date: new Date().toISOString()
          })
          addExpense({
            id: Date.now().toString(),
            amount: parseInt(command.data.amount),
            category: command.data.category,
            description: 'Voice added',
            date: new Date().toISOString()
          })
          response = `Added ${command.data.amount} rupees to ${command.data.category}`
        }
        break
      
      case 'check_balance':
        response = `Your current balance is ${totalBalance} rupees`
        break
      
      case 'check_spending':
        const total = expenses.reduce((sum, e) => sum + e.amount, 0)
        response = `You've spent ${total} rupees this month`
        break
      
      case 'check_goals':
        response = 'You have 2 active goals. Emergency fund and vacation'
        break
      
      default:
        response = 'I can help you add expenses, check balance, or view goals'
    }

    setIsSpeaking(true)
    assistant.speak(response, () => setIsSpeaking(false))
  }

  const toggleListening = () => {
    if (isListening) {
      assistant.stopListening()
      setIsListening(false)
    } else {
      assistant.startListening(
        (text) => {
          setIsListening(false)
          handleVoiceCommand(text)
        },
        (error) => {
          setIsListening(false)
          console.error('Voice error:', error)
        }
      )
      setIsListening(true)
    }
  }

  const toggleSpeaking = () => {
    if (isSpeaking) {
      assistant.stopSpeaking()
      setIsSpeaking(false)
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={`fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-coral to-lavender'
        }`}
      >
        {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {(isListening || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-44 right-6 card max-w-xs z-40"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-sm font-medium">{isListening ? 'Listening...' : 'Processing...'}</span>
            </div>
            {transcript && <p className="text-sm text-navy/70">{transcript}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {isSpeaking && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={toggleSpeaking}
          className="fixed bottom-24 left-6 w-14 h-14 bg-mint rounded-full shadow-lg flex items-center justify-center z-40"
        >
          <Volume2 className="w-6 h-6 text-white animate-pulse" />
        </motion.button>
      )}
    </>
  )
}
