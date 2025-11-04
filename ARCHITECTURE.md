# 🏗️ FinCoach Architecture Guide

## 🎯 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FinCoach v2.0                            │
│              Production-Ready Architecture                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  Next.js 14  │────▶│   Firebase   │
│   Client     │◀────│  App Router  │◀────│  Firestore   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Zustand    │     │  Edge APIs   │     │  Gemini AI   │
│   Stores     │     │  (v2 Chat)   │     │  1.5 Flash   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 📊 Data Flow Architecture

### 1. User Interaction Flow

```
User Action
    │
    ▼
┌─────────────────┐
│  React Component│
│  (Dashboard)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Zustand Store  │
│  (budgetStore)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firebase API   │
│  (saveExpense)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Firestore     │
│   Database      │
└─────────────────┘
```

### 2. AI Chat Flow

```
User Message
    │
    ▼
┌─────────────────────┐
│  ChatBot Component  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  buildFinancialContext()  │
│  (Gather user data)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  /api/chat/v2       │
│  (Edge Runtime)     │
└──────────┬──────────┘
           │
           ├──▶ Fetch Firestore History
           │
           ├──▶ Build Context Prompt
           │
           └──▶ Call Gemini API
                    │
                    ▼
           ┌─────────────────┐
           │  AI Response    │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │  Save to        │
           │  Firestore      │
           └─────────────────┘
```

### 3. Budget Recommendation Flow

```
User Expenses
    │
    ▼
┌─────────────────────────┐
│  generateBudgetRecommendations()  │
│  (Rule-based engine)              │
└──────────┬──────────────┘
           │
           ├──▶ Calculate 50-30-20 split
           │
           ├──▶ Analyze spending patterns
           │
           └──▶ Generate recommendations
                    │
                    ▼
           ┌─────────────────┐
           │  Recommendations│
           │  Array          │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │  BudgetRecommendationCard  │
           │  (Display)                 │
           └─────────────────┘
```

---

## 🔐 Security Architecture

### Firestore Security Layers

```
┌─────────────────────────────────────────┐
│         Client Request                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Firebase Authentication               │
│    (Verify user token)                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Firestore Security Rules              │
│    (Check userId == request.auth.uid)    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Data Access Granted                   │
└─────────────────────────────────────────┘
```

### API Security Layers

```
┌─────────────────────────────────────────┐
│         API Request                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Rate Limiting                         │
│    (10 requests/minute)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Zod Validation                        │
│    (Validate request schema)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Auth Middleware                       │
│    (Verify Bearer token)                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Process Request                       │
└─────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Firestore Collections

```
firestore/
│
├── users/{userId}/
│   ├── profile: {
│   │     displayName: string
│   │     email: string
│   │     personalityType: string
│   │     theme: 'light' | 'dark'
│   │     createdAt: timestamp
│   │   }
│   │
│   └── sessions/{sessionId}/
│       └── {
│             message: string
│             response: string
│             timestamp: timestamp
│           }
│
├── expenses/{expenseId}/
│   └── {
│         userId: string
│         amount: number
│         category: string
│         description: string
│         date: timestamp
│         createdAt: timestamp
│       }
│
├── goals/{goalId}/
│   └── {
│         userId: string
│         title: string
│         targetAmount: number
│         currentAmount: number
│         deadline: timestamp
│         category: string
│         createdAt: timestamp
│       }
│
├── chatHistory/{chatId}/
│   └── {
│         userId: string
│         message: string
│         response: string
│         timestamp: timestamp
│       }
│
└── proactive_messages/{messageId}/
    └── {
          userId: string
          type: 'suggestion' | 'warning' | 'celebration'
          title: string
          message: string
          priority: 'low' | 'medium' | 'high'
          dismissed: boolean
          timestamp: timestamp
        }
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App
│
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── ThemeToggle
│   │   └── UserMenu
│   │
│   └── Navigation
│       ├── DesktopNav
│       └── MobileNav
│
├── Dashboard
│   ├── StatsCards
│   ├── SpendingChart (with AI)
│   ├── BudgetRecommendationCard
│   └── QuickActions
│
├── ChatBot
│   ├── MessageList
│   ├── MessageInput
│   └── VoiceInput
│
├── ExpenseTracker
│   ├── ExpenseForm
│   ├── ExpenseList
│   └── CategoryChart
│
└── ProactiveAssistant
    └── ProactiveCoachCard
```

### State Management

```
┌─────────────────────────────────────────┐
│         Zustand Stores                   │
└─────────────────────────────────────────┘
           │
           ├──▶ userStore
           │    ├── user
           │    ├── setUser()
           │    ├── updateTheme()
           │    └── updatePersonality()
           │
           └──▶ budgetStore
                ├── expenses
                ├── budgets
                ├── totalBalance
                ├── addExpense()
                ├── setBudget()
                └── updateBalance()
```

---

## 🚀 API Architecture

### API Routes Structure

```
app/api/
│
├── chat/
│   ├── route.ts (v1 - legacy)
│   └── v2/
│       └── route.ts (Edge runtime, context-aware)
│
├── expenses/
│   └── route.ts (CRUD operations)
│
├── insights/
│   └── route.ts (AI-powered insights)
│
└── gemini/
    └── route.ts (Direct Gemini integration)
```

### Edge Runtime Benefits

```
Traditional API Route:
Request → Cold Start (500ms) → Process (300ms) → Response
Total: ~800ms

Edge Runtime:
Request → Process (200ms) → Response
Total: ~200ms

Improvement: 75% faster! ⚡
```

---

## 🤖 AI Architecture

### AI Utilities Organization

```
lib/ai/
│
├── contextAI.ts
│   ├── buildFinancialContext()
│   │   └── Aggregates user financial data
│   │
│   └── promptTemplates
│       ├── budgetAdvice()
│       ├── goalStrategy()
│       └── spendingInsight()
│
├── chartExplainer.ts
│   ├── generateChartSummary()
│   │   └── Rule-based chart analysis
│   │
│   └── explainChartWithAI()
│       └── AI-powered chart insights
│
└── budgetRecommendation.ts
    └── generateBudgetRecommendations()
        ├── Calculate 50-30-20 split
        ├── Analyze spending patterns
        └── Generate actionable tips
```

### AI Decision Flow

```
User Query
    │
    ▼
Is it a chart question?
    │
    ├─ Yes ──▶ chartExplainer.ts
    │
    └─ No
        │
        ▼
    Is it about budget?
        │
        ├─ Yes ──▶ budgetRecommendation.ts
        │
        └─ No ──▶ contextAI.ts + Gemini API
```

---

## 📦 Build & Deployment

### Build Process

```
Source Code
    │
    ▼
┌─────────────────┐
│  TypeScript     │
│  Compilation    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js Build  │
│  (SWC)          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Bundle         │
│  Optimization   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Static Export  │
│  + Edge Funcs   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Deploy  │
└─────────────────┘
```

### Deployment Architecture

```
┌─────────────────────────────────────────┐
│            Vercel Edge Network           │
└──────────────┬──────────────────────────┘
               │
               ├──▶ Static Assets (CDN)
               │
               ├──▶ Edge Functions (/api/chat/v2)
               │
               └──▶ Serverless Functions (other APIs)
                        │
                        ▼
               ┌─────────────────┐
               │    Firebase     │
               │    Firestore    │
               └─────────────────┘
```

---

## 🔄 Data Synchronization

### Real-time Updates

```
Firestore Change
    │
    ▼
┌─────────────────┐
│  onSnapshot()   │
│  Listener       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update Zustand │
│  Store          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Re-render      │
│  Components     │
└─────────────────┘
```

### Offline Support (Future)

```
User Action (Offline)
    │
    ▼
┌─────────────────┐
│  Local Storage  │
│  Queue          │
└────────┬────────┘
         │
         ▼
    Online?
         │
         ├─ No ──▶ Stay in queue
         │
         └─ Yes
             │
             ▼
    ┌─────────────────┐
    │  Sync to        │
    │  Firestore      │
    └─────────────────┘
```

---

## 📊 Performance Optimization

### Bundle Optimization

```
Before:
├── recharts: 150KB
├── framer-motion: 120KB
├── lucide-react: 80KB
└── Total: 420KB

After (with optimizations):
├── recharts: 100KB (lazy load)
├── framer-motion: 80KB (tree-shake)
├── lucide-react: 40KB (selective import)
└── Total: <300KB ✅
```

### Code Splitting

```
Route-based splitting:
├── /dashboard → dashboard.chunk.js
├── /chat → chat.chunk.js
├── /expenses → expenses.chunk.js
└── /goals → goals.chunk.js

Component-based splitting:
├── SpendingChart → lazy(() => import('./SpendingChart'))
├── PersonalityQuiz → lazy(() => import('./PersonalityQuiz'))
└── ConsequenceEngine → lazy(() => import('./ConsequenceEngine'))
```

---

## 🎯 Scalability Considerations

### Horizontal Scaling

```
Current: Single Firestore instance
    │
    ▼
Future: Multi-region deployment
    │
    ├──▶ US Region (Firestore)
    ├──▶ EU Region (Firestore)
    └──▶ Asia Region (Firestore)
```

### Caching Strategy

```
Level 1: Browser Cache (Service Worker)
    │
    ▼
Level 2: React Query Cache (5 min)
    │
    ▼
Level 3: Edge Cache (Vercel)
    │
    ▼
Level 4: Firestore (Source of truth)
```

---

## 🔍 Monitoring Architecture

### Error Tracking

```
Error Occurs
    │
    ▼
┌─────────────────┐
│  Error Boundary │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sentry SDK     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sentry         │
│  Dashboard      │
└─────────────────┘
```

### Performance Monitoring

```
Page Load
    │
    ▼
┌─────────────────┐
│  Web Vitals     │
│  (FCP, LCP, CLS)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Analytics      │
│  Dashboard      │
└─────────────────┘
```

---

## 🎓 Architecture Decisions

### Why Edge Runtime for Chat?
- ✅ 75% faster response times
- ✅ Lower latency globally
- ✅ Better scalability
- ✅ Cost-effective

### Why Zustand over Redux?
- ✅ Simpler API
- ✅ Less boilerplate
- ✅ Built-in persistence
- ✅ Better TypeScript support

### Why Zod for Validation?
- ✅ Type inference
- ✅ Runtime safety
- ✅ Great error messages
- ✅ Composable schemas

### Why Firestore over PostgreSQL?
- ✅ Real-time updates
- ✅ Offline support
- ✅ Scalable by default
- ✅ Integrated with Firebase Auth

---

**🏗️ Architecture designed for scale, security, and performance**

*Last updated: 2024*
