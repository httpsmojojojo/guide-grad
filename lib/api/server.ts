import { adminAuth, adminDb } from '@/lib/firebase-admin'

export const serverApi = {
  async verifyToken(token: string) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(token)
      return decodedToken
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getUserData(uid: string) {
    try {
      const userRecord = await adminAuth.getUser(uid)
      return userRecord
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 