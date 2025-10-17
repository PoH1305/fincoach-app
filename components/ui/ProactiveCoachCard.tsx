'use client'
import { motion } from 'framer-motion'
import { Lightbulb, Target, Trophy, Zap, ThumbsUp, ThumbsDown, X } from 'lucide-react'
import { ProactiveMessage } from '@/lib/ai/proactiveAssistant'

interface ProactiveCoachCardProps {
  message: ProactiveMessage
  onFeedback: (messageId: string, isPositive: boolean) => void
  onDismiss: (messageId: string) => void
}

export function ProactiveCoachCard({ message, onFeedback, onDismiss }: ProactiveCoachCardProps) {
  const getIcon = () => {
    switch (message.type) {
      case 'goal': return <Target className="w-5 h-5 text-sky" />
      case 'celebration': return <Trophy className="w-5 h-5 text-mint" />
      case 'challenge': return <Zap className="w-5 h-5 text-coral" />
      default: return <Lightbulb className="w-5 h-5 text-lavender" />
    }
  }

  const getGradient = () => {
    switch (message.type) {
      case 'goal': return 'from-sky/20 to-mint/20 border-sky'
      case 'celebration': return 'from-mint/20 to-lavender/20 border-mint'
      case 'challenge': return 'from-coral/20 to-sky/20 border-coral'
      default: return 'from-lavender/20 to-mint/20 border-lavender'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className={`card bg-gradient-to-r ${getGradient()} border-l-4 relative overflow-hidden`}
    >
      {/* Animated background */}
      <motion.div
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getIcon()}
            </motion.div>
            <div>
              <span className="text-xs font-bold text-navy/80">FinCoach Tip 💡</span>
              <span className="ml-2 text-xs px-2 py-1 bg-white/30 rounded-full capitalize">
                {message.type}
              </span>
            </div>
          </div>
          <button
            onClick={() => onDismiss(message.id)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-navy/90 mb-4 leading-relaxed">
          {message.message}
        </p>

        {/* Feedback buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeedback(message.id, true)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              message.feedbackScore === 1
                ? 'bg-mint/40 text-mint border border-mint/30'
                : 'bg-white/20 hover:bg-mint/20 border border-white/30'
            }`}
          >
            <ThumbsUp className="w-3 h-3" />
            Helpful
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeedback(message.id, false)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              message.feedbackScore === -1
                ? 'bg-coral/40 text-coral border border-coral/30'
                : 'bg-white/20 hover:bg-coral/20 border border-white/30'
            }`}
          >
            <ThumbsDown className="w-3 h-3" />
            Not relevant
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}