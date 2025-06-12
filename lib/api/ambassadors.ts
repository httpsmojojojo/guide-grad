import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { authApi } from './auth'

export interface Ambassador {
  id: string
  name: string
  university: string
  program: string
  bio: string
  image: string
  specialties: string[]
}

export interface AmbassadorApplication {
  name: string
  university: string
  program: string
  bio: string
  specialties: string[]
}

export const ambassadorsApi = {
  async getAmbassadors() {
    try {
      const q = query(
        collection(db, 'ambassadors')
      )
      
      const querySnapshot = await getDocs(q)
      const ambassadors: Ambassador[] = []
      
      querySnapshot.forEach((doc) => {
        ambassadors.push({ id: doc.id, ...doc.data() } as Ambassador)
      })

      return ambassadors
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getAmbassadorById(id: string) {
    try {
      const docRef = doc(db, 'ambassadors', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Ambassador
      }
      return null
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async submitApplication(application: AmbassadorApplication) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      await setDoc(doc(db, 'ambassadorApplications', user.uid), {
        ...application,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        userId: user.uid
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 