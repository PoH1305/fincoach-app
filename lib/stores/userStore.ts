import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  displayName: string
  personalityType?: string
  theme?: 'light' | 'dark'
}

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  updateTheme: (theme: 'light' | 'dark') => void
  updatePersonality: (type: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateTheme: (theme) => set((state) => ({ 
        user: state.user ? { ...state.user, theme } : null 
      })),
      updatePersonality: (type) => set((state) => ({ 
        user: state.user ? { ...state.user, personalityType: type } : null 
      })),
    }),
    { name: 'fincoach-user' }
  )
)
