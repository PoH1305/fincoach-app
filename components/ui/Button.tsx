'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-mint to-sky text-navy shadow-lg hover:shadow-xl',
    secondary: 'bg-white/20 backdrop-blur-md border border-white/30 text-navy hover:bg-white/30',
    ghost: 'text-navy hover:bg-mint/20'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const { onAnimationStart, onAnimationEnd, onDragStart, onDragEnd, onDrag, ...buttonProps } = props

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...buttonProps}
    >
      {children}
    </motion.button>
  )
}