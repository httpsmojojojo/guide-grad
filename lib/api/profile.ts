import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { authApi } from './auth'

export interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  currentEducation: string
  interestedField: string
  extracurricularActivities: string
  personalStatement: string
}

export const profileApi = {
  async createProfile(data: ProfileData) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      await setDoc(doc(db, 'profiles', user.uid), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getProfile() {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      const docRef = doc(db, 'profiles', user.uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data() as ProfileData
      }
      return null
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async updateProfile(data: Partial<ProfileData>) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      const docRef = doc(db, 'profiles', user.uid)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 