import { z } from 'zod'

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  context: z.string().optional(),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
})

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  description: z.string().min(1).max(500),
  date: z.string().datetime().or(z.date()),
})

export const goalSchema = z.object({
  title: z.string().min(1).max(100),
  targetAmount: z.number().positive(),
  currentAmount: z.number().nonnegative().default(0),
  deadline: z.string().datetime().or(z.date()),
  category: z.enum(['savings', 'investment', 'debt', 'purchase']),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
export type Expense = z.infer<typeof expenseSchema>
export type Goal = z.infer<typeof goalSchema>
