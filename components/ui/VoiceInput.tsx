'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
        onTranscript("Sorry, I couldn't hear you clearly. Please try again.")
      }

      recognition.start()
    } else {
      onTranscript("Voice input is not supported in your browser.")
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={startListening}
      disabled={isListening}
      className={`p-3 rounded-full transition-all duration-200 ${
        isListening 
          ? 'bg-coral/30 text-coral animate-pulse' 
          : 'bg-mint/20 text-mint hover:bg-mint/30'
      }`}
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </motion.button>
  )
}