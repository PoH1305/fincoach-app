'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const questions = [
  {
    id: 1,
    question: "What motivates you most about money?",
    options: [
      { emoji: '🏆', text: 'Achieving big goals', type: 'achiever' },
      { emoji: '🛡️', text: 'Financial security', type: 'saver' },
      { emoji: '🎉', text: 'Enjoying life now', type: 'spender' },
      { emoji: '🧘', text: 'Peace of mind', type: 'balanced' }
    ]
  },
  {
    id: 2,
    question: "How do you handle unexpected expenses?",
    options: [
      { emoji: '📊', text: 'Check my budget first', type: 'saver' },
      { emoji: '💳', text: 'Use credit, figure it out later', type: 'spender' },
      { emoji: '🎯', text: 'Adjust my goals accordingly', type: 'achiever' },
      { emoji: '⚖️', text: 'Find a balanced solution', type: 'balanced' }
    ]
  },
  {
    id: 3,
    question: "Your ideal weekend spending is:",
    options: [
      { emoji: '🏠', text: 'Staying home, saving money', type: 'saver' },
      { emoji: '🍽️', text: 'Nice dinner with friends', type: 'spender' },
      { emoji: '📚', text: 'Investing in learning', type: 'achiever' },
      { emoji: '🌳', text: 'Mix of fun and saving', type: 'balanced' }
    ]
  }
]

const coachTypes = {
  saver: {
    name: 'The Wise Saver',
    emoji: '🦉',
    description: 'You value security and long-term planning. I\'ll help you optimize your savings!',
    color: 'mint'
  },
  spender: {
    name: 'The Life Enjoyer',
    emoji: '🌟',
    description: 'You believe in living life to the fullest. Let\'s find smart ways to enjoy AND save!',
    color: 'coral'
  },
  achiever: {
    name: 'The Goal Crusher',
    emoji: '🚀',
    description: 'You\'re driven by big dreams. I\'ll help you create actionable plans to reach them!',
    color: 'sky'
  },
  balanced: {
    name: 'The Balanced Guru',
    emoji: '⚖️',
    description: 'You seek harmony in all things. Perfect! Let\'s create a balanced financial life!',
    color: 'lavender'
  }
}

export function PersonalityQuiz({ onComplete }: { onComplete: (type: string) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const result = Object.entries(counts).reduce((a, b) => 
        counts[a[0]] > counts[b[0]] ? a : b
      )[0]
      
      setShowResult(true)
      setTimeout(() => onComplete(result), 3000)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  if (showResult) {
    const resultType = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const finalResult = Object.entries(resultType).reduce((a, b) => 
      resultType[a[0]] > resultType[b[0]] ? a : b
    )[0] as keyof typeof coachTypes

    const coach = coachTypes[finalResult]

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card text-center space-y-6 max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-8xl"
        >
          {coach.emoji}
        </motion.div>
        
        <div>
          <h2 className="text-3xl font-poppins font-bold mb-2">Meet Your Coach!</h2>
          <h3 className={`text-2xl font-bold text-${coach.color} mb-4`}>{coach.name}</h3>
          <p className="text-navy/70">{coach.description}</p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-4xl"
        >
          🎉
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-navy/60">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-mint to-sky h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="card space-y-6"
        >
          <h2 className="text-2xl font-poppins font-bold text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(option.type)}
                className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl 
                         hover:bg-white/20 transition-all duration-200 text-left space-y-2"
              >
                <div className="text-4xl">{option.emoji}</div>
                <p className="font-medium">{option.text}</p>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentQuestion === 0}
              className="opacity-50 disabled:opacity-20"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-sm text-navy/60">
              Swipe or click to answer
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}