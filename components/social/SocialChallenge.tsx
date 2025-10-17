'use client'
import { motion } from 'framer-motion'
import { Users, Trophy, Target, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const challenges = [
  {
    id: 1,
    title: '30-Day Savings Challenge',
    description: 'Save ₹100 every day for 30 days',
    participants: 1247,
    progress: 67,
    daysLeft: 12,
    reward: '🏆 Champion Badge + ₹500 bonus',
    joined: true
  },
  {
    id: 2,
    title: 'No Dining Out Week',
    description: 'Cook at home for 7 consecutive days',
    participants: 892,
    progress: 0,
    daysLeft: 7,
    reward: '🍳 Master Chef Badge',
    joined: false
  },
  {
    id: 3,
    title: 'Investment Starter',
    description: 'Make your first investment of ₹1000',
    participants: 456,
    progress: 0,
    daysLeft: 14,
    reward: '📈 Investor Badge + Free consultation',
    joined: false
  }
]

const friends = [
  { name: 'Priya', avatar: '👩', progress: 85, rank: 2 },
  { name: 'Rahul', avatar: '👨', progress: 92, rank: 1 },
  { name: 'Anita', avatar: '👩‍💼', progress: 78, rank: 3 },
  { name: 'Vikram', avatar: '👨‍💻', progress: 67, rank: 4 }
]

export function SocialChallenge() {
  return (
    <div className="space-y-6">
      {/* Active Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-coral/20 to-mint/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-coral/20 rounded-2xl">
              <Target className="w-6 h-6 text-coral" />
            </div>
            <div>
              <h3 className="text-xl font-bold">30-Day Savings Challenge</h3>
              <p className="text-sm text-navy/60">You're doing great! Keep it up 🔥</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-coral">67%</p>
            <p className="text-sm text-navy/60">Complete</p>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-coral to-mint h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '67%' }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-navy/60" />
            <span>12 days left</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-navy/60" />
            <span>1,247 participants</span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-lavender" />
          <h3 className="text-xl font-poppins font-bold">Friends Leaderboard</h3>
        </div>

        <div className="space-y-3">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-2xl ${
                friend.rank === 1 ? 'bg-gradient-to-r from-mint/20 to-sky/20' : 'bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  friend.rank === 1 ? 'bg-mint/30' : 'bg-white/20'
                }`}>
                  {friend.rank === 1 ? '👑' : friend.avatar}
                </div>
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-sm text-navy/60">Rank #{friend.rank}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{friend.progress}%</p>
                <div className="w-16 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-mint to-sky h-2 rounded-full"
                    style={{ width: `${friend.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Challenges */}
      <div className="space-y-4">
        <h3 className="text-xl font-poppins font-bold">Join New Challenges</h3>
        
        {challenges.filter(c => !c.joined).map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-lg">{challenge.title}</h4>
                <p className="text-sm text-navy/60">{challenge.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-navy/60">{challenge.participants} joined</p>
                <p className="text-sm font-medium">{challenge.daysLeft} days left</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky/20 to-lavender/20 p-3 rounded-2xl mb-4">
              <p className="text-sm font-medium">🎁 Reward: {challenge.reward}</p>
            </div>

            <Button className="w-full">Join Challenge</Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}