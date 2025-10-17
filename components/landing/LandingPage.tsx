'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface LandingPageProps {
  onEnter: () => void
  onLogin: () => void
}

export function LandingPage({ onEnter, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint/20 via-sky/10 to-lavender/20 p-4">
      <div className="text-center space-y-6 md:space-y-8 max-w-2xl px-4 md:px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="text-6xl md:text-9xl mb-6 md:mb-8"
        >
          💸
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-poppins font-bold bg-gradient-to-r from-mint via-sky to-lavender bg-clip-text text-transparent mb-4">
            FinCoach
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-lg md:text-2xl lg:text-3xl font-medium text-navy/80 mb-6 md:mb-8"
          >
            Your Money, Your Move
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-base md:text-lg text-navy/60 max-w-lg mx-auto leading-relaxed px-4"
        >
          AI-powered financial wellness that makes personal finance fun, interactive, and human
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            onClick={onEnter}
            size="lg"
            className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 shadow-2xl hover:shadow-3xl w-full sm:w-auto"
          >
            Get Started 🚀
          </Button>
          <Button 
            onClick={onLogin}
            variant="secondary"
            size="lg"
            className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 w-full sm:w-auto"
          >
            Login 🔐
          </Button>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              initial={{ 
                x: 0,
                y: 0,
                rotate: 0 
              }}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`
              }}
            >
              {['💰', '📊', '🎯', '🌱', '🏆', '✨'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}