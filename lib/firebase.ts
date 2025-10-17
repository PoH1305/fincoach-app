import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, updateDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)


// Database functions
export const saveExpense = async (userId: string, expense: any) => {
  return await addDoc(collection(db, 'expenses'), {
    ...expense,
    userId,
    createdAt: new Date()
  })
}

export const getUserExpenses = async (userId: string) => {
  const q = query(
    collection(db, 'expenses'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getExpenses = async (userId: string) => {
  return await getUserExpenses(userId)
}

export const saveChatMessage = async (userId: string, message: any) => {
  return await addDoc(collection(db, 'chatHistory'), {
    ...message,
    userId,
    timestamp: new Date()
  })
}

export const saveUserGoal = async (userId: string, goal: any) => {
  return await addDoc(collection(db, 'goals'), {
    ...goal,
    userId,
    createdAt: new Date()
  })
}

export const updateUserProfile = async (userId: string, profileData: any) => {
  const userRef = doc(db, 'users', userId)
  return await updateDoc(userRef, {
    ...profileData,
    updatedAt: new Date()
  })
}

export const saveProactiveMessage = async (userId: string, message: any) => {
  return await addDoc(collection(db, 'proactive_messages'), {
    ...message,
    userId,
    timestamp: new Date()
  })
}

export const getProactiveMessages = async (userId: string) => {
  const q = query(
    collection(db, 'proactive_messages'),
    where('userId', '==', userId),
    where('dismissed', '!=', true),
    orderBy('timestamp', 'desc'),
    limit(10)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const updateMessageFeedback = async (messageId: string, feedbackScore: number) => {
  const messageRef = doc(db, 'proactive_messages', messageId)
  return await updateDoc(messageRef, {
    feedbackScore,
    updatedAt: new Date()
  })
}