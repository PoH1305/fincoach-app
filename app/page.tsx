'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home as HomeIcon, MessageCircle, PieChart, Target, BookOpen, Users, Bot, Trophy, Bell, TrendingUp, Brain, User } from 'lucide-react'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { ChatBot } from '@/components/chat/ChatBot'
import { PersonalityQuiz } from '@/components/quiz/PersonalityQuiz'
import { ExpenseTracker } from '@/components/tracker/ExpenseTracker'
import { ConsequenceEngine } from '@/components/goals/ConsequenceEngine'
import { AchievementSystem } from '@/components/achievements/AchievementSystem'
import { BillReminder } from '@/components/notifications/BillReminder'
import { InvestmentTracker } from '@/components/investments/InvestmentTracker'
import { SocialChallenge } from '@/components/social/SocialChallenge'
import { SmartInsights } from '@/components/insights/SmartInsights'
import { GamifiedLearning } from '@/components/learning/GamifiedLearning'
import { SavingsGames } from '@/components/games/SavingsGames'
import { Toast } from '@/components/ui/Toast'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LandingPage } from '@/components/landing/LandingPage'
import { AuthPage } from '@/components/auth/AuthPage'
import { ProfilePage } from '@/components/profile/ProfilePage'
import { ProactiveAssistant } from '@/components/ProactiveAssistant'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, emoji: '🏠' },
  { id: 'chat', label: 'FinCoach', icon: MessageCircle, emoji: '🤖' },
  { id: 'tracker', label: 'Expenses', icon: PieChart, emoji: '📊' },
  { id: 'goals', label: 'Consequence Engine', icon: Target, emoji: '🎯' },
  { id: 'learning', label: 'Learning', icon: BookOpen, emoji: '📚' },
  { id: 'quiz', label: 'Personality Quiz', icon: Bot, emoji: '🧠' },
]

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showQuiz, setShowQuiz] = useState(false)
  const [userCoachType, setUserCoachType] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastEmoji, setToastEmoji] = useState('🎉')

  const handleQuizComplete = (coachType: string) => {
    setUserCoachType(coachType)
    setShowQuiz(false)
    setActiveTab('dashboard')
  }

  const enterApp = () => {
    setShowLanding(false)
  }

  const showLogin = () => {
    setShowAuth(true)
  }

  const handleLogin = () => {
    setShowAuth(false)
    setShowLanding(false)
  }

  if (showAuth) {
    return <AuthPage onLogin={handleLogin} />
  }

  if (showLanding) {
    return <LandingPage onEnter={enterApp} onLogin={showLogin} />
  }

  const showNotification = (message: string, emoji: string = '🎉') => {
    setToastMessage(message)
    setToastEmoji(emoji)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const renderContent = () => {
    if (showQuiz) {
      return <PersonalityQuiz onComplete={handleQuizComplete} />
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} showNotification={showNotification} />
      case 'chat':
        return <ChatBot />
      case 'tracker':
        return <ExpenseTracker />
      case 'goals':
        return <ConsequenceEngine />
      case 'achievements':
        return <AchievementSystem />
      case 'bills':
        return <BillReminder />
      case 'investments':
        return <InvestmentTracker />
      case 'social':
        return <SocialChallenge />
      case 'insights':
        return <SmartInsights />
      case 'learning':
        return <GamifiedLearning />
      case 'games':
        return <SavingsGames />
      case 'profile':
        return <ProfilePage onClose={() => setActiveTab('dashboard')} />
      case 'quiz':
        return <PersonalityQuiz onComplete={handleQuizComplete} />
      default:
        return <Dashboard setActiveTab={setActiveTab} showNotification={showNotification} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-mint/10 to-sky/10">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border-b border-white/20 p-4 fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl"
            >
              💸
            </motion.div>
            <div>
              <h1 className="text-2xl font-poppins font-bold bg-gradient-to-r from-mint to-sky bg-clip-text text-transparent">
                FinCoach
              </h1>
              <p className="text-sm text-navy/60">Your Money, Your Move</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!userCoachType && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(true)}
                className="btn-primary text-sm"
              >
                Meet Your Coach 🎯
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => showNotification('You saved ₹500 today! Streak: 7 days', '🔥')}
              className="p-2 glass rounded-full hover:bg-mint/20"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('profile')}
              className="p-2 glass rounded-full hover:bg-sky/20"
            >
              <User className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-64 lg:fixed lg:left-0 lg:top-20 lg:h-screen p-4 lg:p-6 space-y-2 lg:overflow-y-auto bg-white/5 lg:backdrop-blur-md mt-20 lg:mt-0"
        >
          {/* Mobile Menu */}
          <div className="lg:hidden grid grid-cols-5 gap-2 mb-4">
            {navigation.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(item.id)
                  setShowQuiz(false)
                }}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-mint/30 to-sky/30 shadow-lg'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block space-y-2">
          {navigation.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.id)
                setShowQuiz(false)
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-mint/30 to-sky/30 shadow-lg'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}

          </div>

          {/* Coach Type Display */}
          {userCoachType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-4 bg-gradient-to-r from-mint/20 to-sky/20 rounded-2xl hidden lg:block"
            >
              <p className="text-sm text-navy/60 mb-1">Your Coach</p>
              <p className="font-semibold capitalize">{userCoachType} Type</p>
              <div className="text-2xl mt-2">
                {userCoachType === 'saver' && '🦉'}
                {userCoachType === 'spender' && '🌟'}
                {userCoachType === 'achiever' && '🚀'}
                {userCoachType === 'balanced' && '⚖️'}
              </div>
            </motion.div>
          )}
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (showQuiz ? '-quiz' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Toast Notifications */}
      <Toast 
        message={toastMessage}
        emoji={toastEmoji}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Proactive AI Assistant */}
      <ProactiveAssistant />

      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveTab('chat')}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-coral to-lavender rounded-full 
                 shadow-2xl flex items-center justify-center text-xl hover:shadow-3xl 
                 transition-all duration-300 z-40"
      >
        💬
      </motion.button>

      {/* Welcome Animation */}
      {!userCoachType && activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card max-w-md text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl"
            >
              💸
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-poppins font-bold mb-2">Welcome to FinCoach!</h2>
              <p className="text-navy/70">
                Ready to make personal finance fun and engaging? Let's start by finding your perfect financial coach!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowQuiz(true)}
                className="btn-primary flex-1"
              >
                Take Quiz 🎯
              </button>
              <button
                onClick={() => setUserCoachType('balanced')}
                className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/30 transition-all"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}