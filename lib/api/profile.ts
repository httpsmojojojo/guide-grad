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
  reference?: string
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
      console.error('Error creating profile:', error)
      throw new Error('Failed to create profile. Please try again.')
    }
  },

  async getProfile() {
    const user = authApi.getCurrentUser()
    if (!user) {
      console.log('No authenticated user found in getProfile')
      throw new Error('No authenticated user')
    }

    try {
      console.log('Fetching profile for user:', user.uid)
      const docRef = doc(db, 'profiles', user.uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('Profile data found:', data)
        return data as ProfileData
      }
      console.log('No profile document found for user:', user.uid)
      return null
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      throw new Error(error.message || 'Failed to fetch profile')
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