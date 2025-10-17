'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'

const lessons = [
  { id: 1, title: 'Budgeting 101', xp: 50, completed: true, locked: false, icon: '💰', difficulty: 'Beginner', studied: true },
  { id: 2, title: 'Emergency Fund', xp: 75, completed: true, locked: false, icon: '🛡️', difficulty: 'Beginner', studied: true },
  { id: 3, title: 'Smart Investing', xp: 200, completed: false, locked: false, icon: '🚀', difficulty: 'Intermediate', studied: false },
  { id: 4, title: 'Tax Planning', xp: 125, completed: false, locked: true, icon: '📋', difficulty: 'Advanced', story: 'Smart tax planning helped Amit save ₹25000 in taxes while building wealth through ELSS funds and PPF investments.', studied: false },
  { id: 5, title: 'Retirement Planning', xp: 150, completed: false, locked: true, icon: '🏖️', difficulty: 'Advanced', story: 'Starting at 25, Maya invested ₹5000/month. By 60, she had ₹2.5 crores for a comfortable retirement. Time is your best friend!', studied: false }
]

const moduleContent = {
  1: {
    title: 'Budgeting 101: Mastering Your Money Map',
    overview: 'To help learners take control of their income, track expenses, and plan spending with purpose.',
    content: {
      'Key Concepts': [
        'Income vs. Expenses: Understanding fixed, variable, and discretionary costs',
        'The 50/30/20 Rule: 50% Needs (rent, groceries), 30% Wants (entertainment, dining), 20% Savings & Debt Repayment',
        'Tracking Tools: Apps (e.g., Walnut, Money Manager), Spreadsheets or manual logs',
        'Budgeting Methods: Zero-Based Budgeting, Envelope System, Pay Yourself First'
      ],
      'Practical Skills': [
        'Create a monthly budget',
        'Identify spending leaks',
        'Set realistic financial goals'
      ]
    },
    topics: [
      'Income vs. Expenses: Understanding cost types',
      'The 50/30/20 Rule: Needs, wants, savings allocation',
      'Tracking Tools: Apps and manual methods',
      'Budgeting Methods: Zero-based, envelope, pay yourself first',
      'Practical Skills: Budget creation and goal setting'
    ],
    questions: [
      {
        question: 'What does the 50/30/20 rule represent?',
        options: ['50% wants, 30% needs, 20% savings', '50% needs, 30% wants, 20% savings', '50% savings, 30% needs, 20% wants', '50% expenses, 30% income, 20% debt'],
        correct: 1
      },
      {
        question: 'Which is a fixed expense?',
        options: ['Groceries', 'Entertainment', 'Rent', 'Dining out'],
        correct: 2
      },
      {
        question: 'How often should you review your budget?',
        options: ['Once a year', 'Monthly', 'Never', 'Only when broke'],
        correct: 1
      },
      {
        question: 'What should you do if expenses exceed income?',
        options: ['Ignore it', 'Cut unnecessary expenses', 'Take more loans', 'Stop budgeting'],
        correct: 1
      },
      {
        question: 'Best first step in budgeting?',
        options: ['Buy expensive software', 'Track current spending', 'Cut all expenses', 'Increase income only'],
        correct: 1
      }
    ]
  },
  2: {
    title: 'Emergency Fund: Your Financial Safety Net',
    overview: 'To prepare learners for unexpected expenses without derailing long-term goals.',
    content: {
      'Key Concepts': [
        'What It Is: A stash of money set aside for emergencies like job loss, medical bills, or urgent repairs',
        'How Much to Save: Minimum 3 months of essential expenses, Ideal 6–12 months for added security',
        'Where to Keep It: High-interest savings account, Liquid and easily accessible, not invested in volatile assets',
        'When to Use It: Only for true emergencies—not vacations or impulse buys'
      ],
      'Practical Skills': [
        'Calculate your monthly survival budget',
        'Set up automatic transfers to build the fund',
        'Differentiate between emergency and non-emergency spending'
      ]
    },
    topics: [
      'What constitutes a true financial emergency',
      'How much to save: 3-12 months of expenses',
      'Where to keep emergency funds safely',
      'Building the fund with automatic transfers',
      'When and how to use emergency funds'
    ],
    questions: [
      {
        question: 'How much should your emergency fund be?',
        options: ['1 month expenses', '3-6 months expenses', '1 year expenses', '₹10,000 fixed amount'],
        correct: 1
      },
      {
        question: 'Where should you keep emergency funds?',
        options: ['Stock market', 'Savings account', 'Fixed deposit', 'Real estate'],
        correct: 1
      },
      {
        question: 'Which is NOT a financial emergency?',
        options: ['Job loss', 'Medical emergency', 'Car repair', 'Vacation'],
        correct: 3
      },
      {
        question: 'When should you start building emergency fund?',
        options: ['After retirement', 'When you get rich', 'Right now', 'After buying a house'],
        correct: 2
      },
      {
        question: 'What to do after using emergency fund?',
        options: ['Forget about it', 'Replenish immediately', 'Wait for next emergency', 'Invest the remaining'],
        correct: 1
      }
    ]
  },
  3: {
    title: 'Smart Investing: From First Rupee to Financial Freedom',
    overview: 'Money that sleeps loses value. Inflation quietly erodes purchasing power each year — meaning ₹100 today might buy less next year. Investing ensures your money works as hard as you do.',
    content: {
      '🧩 1. Why Invest?': [
        'Money that sleeps loses value. Inflation quietly erodes purchasing power each year — meaning ₹100 today might buy less next year. Investing ensures your money works as hard as you do.',
        '• Wealth Creation: Investing channels your savings into assets that appreciate over time — such as stocks, bonds, or property. This process multiplies your wealth faster than inflation, allowing you to achieve financial independence.',
        '• Achieving Financial Goals: Whether it\'s buying a home, funding higher education, retiring early, or achieving lifestyle freedom, investments act as your bridge from today\'s income to tomorrow\'s dreams.',
        '• The Power of Compounding: Compounding is often called the eighth wonder of the world. It\'s when your returns start generating their own returns — like a snowball rolling downhill.',
        'Example: ₹10,000 invested at a 10% annual return becomes ₹25,937 in 10 years — not just from earning interest, but from interest on interest. Extend this to 20 years, and it grows to ₹67,275.',
        '• Time Is Your Best Friend: The earlier you start, the greater the impact of compounding. A 25-year-old investing ₹5,000/month at 12% can accumulate over ₹1 crore by 45.'
      ],
      '💼 2. Types of Investments': [
        'A smart portfolio blends different asset classes — each with unique roles, risks, and rewards.',
        '• Equity (Stocks): Ownership in companies. Return: 12–15% annually. Risk: High. Best For: Long-term wealth creation.',
        '• Debt (Bonds, FDs): You lend money for fixed interest. Return: 6–8% annually. Risk: Low to moderate. Best For: Stability.',
        '• Mutual Funds: Professionally managed baskets of securities. Return: 8–12% annually. Risk: Moderate. Best For: Passive investing.',
        '• ETFs: Mutual funds that trade on exchanges. Return: Market-linked. Risk: Moderate. Best For: Cost-conscious investors.',
        '• Real Estate: Tangible asset with rental income. Return: 8–10% annually. Risk: Moderate. Best For: Diversification.',
        '• Gold: Traditional store of value. Return: 6–8% long-term. Risk: Low to moderate. Best For: Wealth preservation.',
        '• Emerging Alternatives: REITs, SGBs, Index Funds, Crypto (cautious exposure only).'
      ],
      '🧠 3. Risk vs. Return': [
        'Every investment carries a trade-off between risk (chance of loss) and reward (expected return).',
        '• Higher Risk, Higher Return: Equities can outperform over long horizons but may fluctuate heavily in the short term.',
        '• Diversification: The Safety Net: Mixing assets smoothens returns. When one performs poorly, others often compensate.',
        '• Personal Risk Tolerance: Depends on age, income stability, financial goals & timeline.',
        'Rule of Thumb: 20s–30s → 70–80% equity, 40s–50s → 50–60% equity, 60+ → 30–40% equity.',
        '• Volatility ≠ Risk: Temporary market swings are not permanent losses — unless you panic.'
      ],
      '📊 4. Portfolio Construction': [
        'A disciplined portfolio design protects you from emotional decisions.',
        '• Asset Allocation: Decide what percentage goes into equity, debt, gold. This drives over 80% of long-term returns.',
        '• Diversification: Spread across sectors (tech, banking, FMCG) and geographies (India, US, emerging markets).',
        '• Rebalancing: Review once or twice yearly and restore your original allocation.',
        'Example: A 25-year-old might start with 70% equity, 20% debt, 10% gold.',
        '• Emergency Fund: Always keep 6–12 months of expenses in liquid funds. Prevents forced selling during downturns.'
      ],
      '🧭 5. Behavioral Finance': [
        'Investing success isn\'t just logic — it\'s psychology.',
        '• Loss Aversion: People hate losing ₹1 more than they enjoy gaining ₹1. This causes premature selling during dips.',
        '• Herd Mentality: When everyone rushes into or out of markets, most lose. Be contrarian.',
        '• Overconfidence: Believing you can time or beat the market often leads to speculation.',
        '• Anchoring Bias: Holding on to old prices can cloud judgment. Let data, not emotions, guide choices.',
        '• Patience & Discipline: Smart investors win by staying consistent. Time in the market beats timing the market.',
        '"The stock market transfers money from the impatient to the patient." — Warren Buffett'
      ],
      '🛠️ 6. Practical Tools': [
        '• SIP (Systematic Investment Plan): Automated, periodic investments smooth out volatility and build discipline.',
        '• STP (Systematic Transfer Plan): Gradually move funds from debt to equity for safer market entry.',
        '• SWP (Systematic Withdrawal Plan): Ideal for retirees — withdraw fixed amounts while rest stays invested.',
        '• Fund Fact Sheets: Learn expense ratio, AUM, fund manager track record, benchmark comparisons.',
        '• Tools & Platforms: Use SEBI-registered apps like Groww, Zerodha Coin, ET Money, Paytm Money.',
        '• Robo-Advisors: AI-driven platforms auto-allocate and rebalance based on your goals.',
        '• Continuous Learning: Markets evolve — follow reliable sources, attend webinars, read credible publications.'
      ],
      '💬 7. Golden Principles': [
        'Start early, stay invested. The best time to invest was yesterday; the next best is today.',
        'Never invest in what you don\'t understand. Knowledge > hype.',
        'Focus on goals, not noise. Markets fluctuate, but disciplined strategy wins.',
        'Control what you can — costs, emotions, and time horizon.',
        'Review, don\'t react. Annual reviews > impulsive decisions.'
      ],
      '🏁 8. Summary': [
        'Smart investing isn\'t about predicting markets — it\'s about building systems that let your money grow quietly.',
        'It\'s about consistency, patience, and belief in the power of time.',
        '"Don\'t work for money. Let money work for you." – FinCoach Principle'
      ]
    },
    topics: [
      'Core Concepts: What investing is and why it matters',
      'Asset Classes: Equities, bonds, mutual funds, ETFs',
      'Portfolio Building: Diversification and asset allocation',
      'Behavioral Finance: Avoiding common investor mistakes',
      'Practical Tools: Fact sheets, platforms, tracking'
    ],
    questions: [
      {
        question: 'What is the main difference between saving and investing?',
        options: ['Saving is for short-term, investing for long-term', 'Saving has higher returns', 'Investing is risk-free', 'No difference'],
        correct: 0
      },
      {
        question: 'What does SIP stand for?',
        options: ['Simple Investment Plan', 'Systematic Investment Plan', 'Safe Investment Policy', 'Strategic Investment Portfolio'],
        correct: 1
      },
      {
        question: 'Which helps reduce investment risk?',
        options: ['Investing all in one stock', 'Diversification', 'Timing the market', 'Avoiding mutual funds'],
        correct: 1
      },
      {
        question: 'What is compounding?',
        options: ['Adding more money', 'Earning returns on returns', 'Reducing risk', 'Market timing'],
        correct: 1
      },
      {
        question: 'Best strategy for beginners?',
        options: ['Day trading', 'SIP in diversified funds', 'Single stock picking', 'Crypto only'],
        correct: 1
      }
    ]
  }
}

export function GamifiedLearning() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [showTest, setShowTest] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [studiedLessons, setStudiedLessons] = useState<number[]>([1, 2])
  const [showLearning, setShowLearning] = useState(false)
  const [hasReadContent, setHasReadContent] = useState(false)
  const [currentPage, setCurrentPage] = useState<'list' | 'learning' | 'flashcards'>('list')
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const totalXP = lessons.filter(l => l.completed).reduce((sum, l) => sum + l.xp, 0)
  const completedCount = lessons.filter(l => l.completed).length

  const flashcards = [
    {
      front: "Why Should You Invest?",
      back: "• Beat inflation and grow wealth\n• Achieve long-term financial goals\n• Harness the power of compounding\n• Example: ₹10K → ₹25K in 10 years at 10%"
    },
    {
      front: "What Are the Main Investment Types?",
      back: "• Equity: High risk, 12-15% returns\n• Debt: Low risk, 6-8% returns\n• Mutual Funds: Diversified, 8-12% returns\n• ETFs: Low cost, market returns\n• Real Estate: Moderate risk, 8-10% returns"
    },
    {
      front: "How Does Risk vs Return Work?",
      back: "• Higher returns = Higher risk\n• Diversification reduces risk\n• Age matters: Young = more equity\n• Rule: (100 - age)% in equity\n• Volatility ≠ permanent loss"
    },
    {
      front: "How to Build a Portfolio?",
      back: "• Asset Allocation: Decide percentages\n• Diversification: Spread across sectors\n• Rebalancing: Adjust periodically\n• Example: 70% equity, 20% debt, 10% gold\n• Emergency fund: 6-12 months expenses"
    },
    {
      front: "What Are Common Investor Mistakes?",
      back: "• Loss Aversion: Fear losses > love gains\n• Herd Mentality: Following the crowd\n• Overconfidence: Trying to beat market\n• Anchoring: Stuck on old prices\n• Solution: Stay disciplined, think long-term"
    },
    {
      front: "What Tools Help with Investing?",
      back: "• SIP: Regular investments, rupee-cost averaging\n• Fact Sheets: Check performance, expense ratio\n• Platforms: Groww, Zerodha, ET Money\n• Robo-advisors: AI-driven allocation\n• Start small: ₹500-1000/month SIP"
    }
  ]

  if (currentPage === 'flashcards' && selectedLesson === 3) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentPage('learning')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
          >
            ← Back to Learning
          </button>
          <h1 className="text-3xl font-poppins font-bold">
            Smart Investing Flash Cards
          </h1>
        </div>
        
        <div className="flex justify-center">
          <div className="card max-w-2xl w-full min-h-[400px] relative">
            <div className="absolute top-4 right-4 text-sm text-navy/60">
              {currentFlashcard + 1} / {flashcards.length}
            </div>
            
            <div className="text-center p-8">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-2xl font-bold mb-8 text-mint">
                {flashcards[currentFlashcard].front}
              </h2>
              
              <div className="bg-white/10 p-6 rounded-xl text-left">
                <div className="whitespace-pre-line text-navy/80 leading-relaxed">
                  {flashcards[currentFlashcard].back}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentFlashcard(Math.max(0, currentFlashcard - 1))}
                disabled={currentFlashcard === 0}
                className="px-6 py-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                ← Previous
              </button>
              
              <div className="flex gap-2">
                {flashcards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentFlashcard ? 'bg-mint' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentFlashcard(Math.min(flashcards.length - 1, currentFlashcard + 1))}
                disabled={currentFlashcard === flashcards.length - 1}
                className="px-6 py-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setCurrentPage('list')
              setShowTest(true)
              setCurrentQuestion(0)
              setSelectedAnswer(null)
              setScore(0)
              setShowResult(false)
            }}
            className="btn-primary px-8 py-3"
          >
            Ready for Test! 🎯
          </button>
        </div>
      </div>
    )
  }

  if (currentPage === 'learning' && selectedLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          {selectedLesson === 3 ? (
            <button
              onClick={() => setCurrentPage('flashcards')}
              className="flex items-center gap-2 px-4 py-2 bg-coral/20 rounded-2xl hover:bg-coral/30 transition-colors"
            >
              🃏 Flash Cards
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('list')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
            >
              ← Back to Lessons
            </button>
          )}
          <h1 className="text-3xl font-poppins font-bold">
            {moduleContent[selectedLesson as keyof typeof moduleContent]?.title}
          </h1>
        </div>
        
        <div className="card">
          <p className="text-lg text-navy/70 mb-8">
            {moduleContent[selectedLesson as keyof typeof moduleContent]?.overview}
          </p>
          
          {moduleContent[selectedLesson as keyof typeof moduleContent]?.content && (
            <div className="space-y-8 mb-8">
              {Object.entries(moduleContent[selectedLesson as keyof typeof moduleContent].content).map(([section, points], sectionIndex) => {
                const getImageCard = (index: number) => {
                  const cards = [
                    { icon: '💰', title: 'Wealth Growth', desc: 'Money working harder than inflation', gradient: 'from-mint/20 to-sky/20' },
                    { icon: '📊', title: 'Asset Classes', desc: 'Different investments for different goals', gradient: 'from-coral/20 to-lavender/20' },
                    { icon: '⚖️', title: 'Risk Balance', desc: 'Higher risk, higher potential returns', gradient: 'from-sky/20 to-mint/20' },
                    { icon: '🎯', title: 'Portfolio Design', desc: 'Strategic allocation and rebalancing', gradient: 'from-lavender/20 to-coral/20' },
                    { icon: '🧠', title: 'Smart Psychology', desc: 'Emotions can make or break investments', gradient: 'from-mint/20 to-lavender/20' },
                    { icon: '🛠️', title: 'Investment Tools', desc: 'SIPs and platforms simplify investing', gradient: 'from-sky/20 to-coral/20' },
                    { icon: '✨', title: 'Golden Rules', desc: 'Time-tested principles for success', gradient: 'from-coral/20 to-mint/20' },
                    { icon: '🏆', title: 'Success Mindset', desc: 'Consistency beats market timing', gradient: 'from-lavender/20 to-sky/20' }
                  ]
                  return cards[index] || cards[0]
                }
                
                const imageCard = getImageCard(sectionIndex)
                
                return (
                  <div key={sectionIndex} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <div className="bg-white/10 p-6 rounded-xl">
                        <h3 className="font-semibold text-mint mb-4 text-xl">{section}</h3>
                        <div className="space-y-3">
                          {points.map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start gap-3">
                              <span className="text-mint mt-1 text-lg">•</span>
                              <span className="text-navy/80 leading-relaxed">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <div className="p-6 rounded-xl text-center h-full flex flex-col justify-center">
                        <div className="text-5xl mb-3">{imageCard.icon}</div>
                        <h4 className="font-bold text-lg mb-2">{imageCard.title}</h4>
                        <p className="text-sm text-navy/70">{imageCard.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          
          <div className="bg-gradient-to-r from-mint/20 to-sky/20 p-6 rounded-xl mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="font-bold text-xl mb-1">Ready to Test Your Knowledge?</h3>
                <p className="text-navy/70">You've learned the fundamentals of smart investing. Time to see how much you've absorbed!</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            {selectedLesson === 3 ? (
              <button
                onClick={() => setCurrentPage('flashcards')}
                className="flex-1 px-6 py-3 bg-coral/20 rounded-2xl hover:bg-coral/30 transition-colors"
              >
                Flash Cards 🃏
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('list')}
                className="flex-1 px-6 py-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
              >
                Back to Lessons
              </button>
            )}
            <button
              onClick={() => {
                setHasReadContent(true)
                setCurrentPage('list')
                setShowTest(true)
                setCurrentQuestion(0)
                setSelectedAnswer(null)
                setScore(0)
                setShowResult(false)
              }}
              className="flex-1 btn-primary text-lg py-3"
            >
              Start Test 🎯
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-poppins font-bold">Learning Progress</h2>
            <p className="text-navy/60">{completedCount}/{lessons.length} lessons completed</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-mint">
              <Star className="w-6 h-6" />
              <span className="text-2xl font-bold">{totalXP} XP</span>
            </div>
            <p className="text-sm text-navy/60">Total Earned</p>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-mint to-sky h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / lessons.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`card cursor-pointer hover:scale-105 ${
              lesson.locked ? 'opacity-60' : ''
            } ${lesson.completed ? 'border-mint/30 bg-mint/10' : ''}`}
            onClick={() => !lesson.locked && setSelectedLesson(lesson.id)}
          >
            <div className="text-center space-y-3">
              <div className="relative">
                <div className="text-4xl">{lesson.locked ? '🔒' : lesson.icon}</div>
                {lesson.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <CheckCircle className="w-6 h-6 text-mint" />
                  </motion.div>
                )}
              </div>
              
              <div>
                <h3 className="font-bold">{lesson.title}</h3>
                <p className="text-sm text-navy/60">{lesson.difficulty}</p>
              </div>
              
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-lavender" />
                <span className="text-sm font-medium">{lesson.xp} XP</span>
              </div>
              
              {lesson.completed && (
                <div className="text-xs text-mint font-medium">✓ Completed</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">Learning Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-mint/20 rounded-2xl">
            <div className="text-2xl">🎓</div>
            <div>
              <p className="font-semibold">First Lesson</p>
              <p className="text-sm text-navy/60">Complete your first lesson</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl opacity-60">
            <div className="text-2xl">🔥</div>
            <div>
              <p className="font-semibold">Learning Streak</p>
              <p className="text-sm text-navy/60">Learn for 7 days straight</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl opacity-60">
            <div className="text-2xl">🏆</div>
            <div>
              <p className="font-semibold">Master Student</p>
              <p className="text-sm text-navy/60">Complete all lessons</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lesson Story Modal */}
      {selectedLesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLesson(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const lesson = lessons.find(l => l.id === selectedLesson)
              if (!lesson) return null
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{lesson.icon}</div>
                    <h3 className="text-2xl font-poppins font-bold mb-2">{lesson.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lesson.difficulty === 'Beginner' ? 'bg-mint/20 text-mint' :
                      lesson.difficulty === 'Intermediate' ? 'bg-sky/20 text-sky' :
                      'bg-coral/20 text-coral'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  

                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-lavender" />
                      <span className="font-medium">{lesson.xp} XP Reward</span>
                    </div>
                    {lesson.completed && (
                      <div className="text-mint font-medium">✓ Completed</div>
                    )}
                  </div>
                  
                  {moduleContent[selectedLesson as keyof typeof moduleContent] && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-3">📚 Module Content:</h4>
                      
                      {moduleContent[selectedLesson as keyof typeof moduleContent].content ? (
                        <div className="space-y-4 text-sm max-h-60 overflow-y-auto">
                          {Object.entries(moduleContent[selectedLesson as keyof typeof moduleContent].content).map(([section, points], sectionIndex) => (
                            <div key={sectionIndex} className="bg-white/10 p-3 rounded-xl">
                              <h5 className="font-semibold text-mint mb-2">{section}</h5>
                              <div className="space-y-1">
                                {points.map((point, pointIndex) => (
                                  <div key={pointIndex} className="flex items-start gap-2">
                                    <span className="text-mint mt-1">•</span>
                                    <span className="text-navy/80">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          {moduleContent[selectedLesson as keyof typeof moduleContent].topics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-mint">•</span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedLesson(null)}
                      className="flex-1 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
                    >
                      Close
                    </button>
                    {!lesson.completed && !lesson.locked && (
                      <button 
                        onClick={() => {
                          setCurrentPage('learning')
                          setSelectedLesson(null)
                          setHasReadContent(false)
                        }}
                        className="flex-1 btn-primary"
                      >
                        Learn 📚
                      </button>
                    )}
                  </div>
                </>
              )
            })()
            }
          </motion.div>
        </motion.div>
      )}



      {/* Test Modal */}
      {showTest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card max-w-lg w-full"
          >
            {!showResult ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {selectedLesson === 1 ? 'Budgeting 101 Test' :
                       selectedLesson === 2 ? 'Emergency Fund Test' :
                       'Smart Investing Test'}
                    </h3>
                    <span className="text-sm text-navy/60">{currentQuestion + 1}/5</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-mint to-sky h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">
                    {moduleContent[selectedLesson as keyof typeof moduleContent]?.questions[currentQuestion].question}
                  </h4>
                  <div className="space-y-2">
                    {moduleContent[selectedLesson as keyof typeof moduleContent]?.questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-3 text-left rounded-xl transition-colors ${
                          selectedAnswer === index 
                            ? 'bg-mint/30 border-mint border-2' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowTest(false)
                      setCurrentQuestion(0)
                      setSelectedAnswer(null)
                      setScore(0)
                    }}
                    className="flex-1 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedAnswer === moduleContent[selectedLesson as keyof typeof moduleContent]?.questions[currentQuestion].correct) {
                        setScore(score + 1)
                      }
                      if (currentQuestion < 4) {
                        setCurrentQuestion(currentQuestion + 1)
                        setSelectedAnswer(null)
                      } else {
                        setShowResult(true)
                      }
                    }}
                    disabled={selectedAnswer === null}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {currentQuestion < 4 ? 'Next' : 'Finish'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{score >= 4 ? '🏆' : '📚'}</div>
                <h3 className="text-2xl font-bold mb-2">
                  {score >= 4 ? 'Congratulations!' : 'Keep Learning!'}
                </h3>
                <p className="text-navy/70 mb-4">
                  You scored {score}/5 {score >= 4 ? '- You passed!' : '- You need 4/5 to pass'}
                </p>
                
                {score >= 4 ? (
                  <div className="bg-gradient-to-r from-mint/20 to-sky/20 p-4 rounded-2xl mb-6">
                    <h4 className="font-bold mb-2">🎖️ Badge Earned!</h4>
                    <p className="text-sm">
                      {selectedLesson === 1 ? 'Budget Master - You know how to manage money!' :
                       selectedLesson === 2 ? 'Safety Net Pro - You understand emergency planning!' :
                       'Smart Investing Pro - You\'ve mastered the fundamentals!'}
                    </p>
                  </div>
                ) : (
                  <div className="bg-coral/20 p-4 rounded-2xl mb-6">
                    <p className="text-sm">Review the module and try again. You're almost there! 💪</p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowTest(false)
                      setShowResult(false)
                      setCurrentQuestion(0)
                      setSelectedAnswer(null)
                      setScore(0)
                      setSelectedLesson(null)
                      setHasReadContent(false)
                    }}
                    className="flex-1 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
                  >
                    Close
                  </button>
                  {score < 4 ? (
                    <button
                      onClick={() => {
                        setShowResult(false)
                        setCurrentQuestion(0)
                        setSelectedAnswer(null)
                        setScore(0)
                      }}
                      className="flex-1 btn-primary"
                    >
                      Try Again 🔄
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        // Mark lesson as completed
                        const updatedLessons = lessons.map(l => 
                          l.id === selectedLesson ? { ...l, completed: true } : l
                        )
                        setShowTest(false)
                        setShowResult(false)
                        setCurrentQuestion(0)
                        setSelectedAnswer(null)
                        setScore(0)
                        setSelectedLesson(null)
                        setHasReadContent(false)
                      }}
                      className="flex-1 btn-primary"
                    >
                      Continue ✨
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}