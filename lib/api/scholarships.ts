import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Scholarship {
  id: string
  title: string
  description: string
  amount: string
  deadline: string
  requirements: string[]
  university: string
  program: string
  type: 'merit' | 'need' | 'sports' | 'research'
  applicationUrl: string
  imageUrl: string
}

export interface ScholarshipFilters {
  university?: string
  program?: string
  type?: string
  minAmount?: number
}

export const scholarshipsApi = {
  async getScholarships(filters?: ScholarshipFilters, lastDoc?: any) {
    try {
      let q = collection(db, 'scholarships')
      
      // Apply filters if provided
      if (filters) {
        const constraints = []
        if (filters.university) {
          constraints.push(where('university', '==', filters.university))
        }
        if (filters.program) {
          constraints.push(where('program', '==', filters.program))
        }
        if (filters.type) {
          constraints.push(where('type', '==', filters.type))
        }
        if (filters.minAmount) {
          constraints.push(where('amount', '>=', filters.minAmount))
        }
        
        q = query(q, ...constraints, orderBy('deadline', 'asc'), limit(10))
      } else {
        q = query(q, orderBy('deadline', 'asc'), limit(10))
      }

      // Apply pagination if lastDoc is provided
      if (lastDoc) {
        q = query(q, startAfter(lastDoc))
      }

      const querySnapshot = await getDocs(q)
      const scholarships: Scholarship[] = []
      
      querySnapshot.forEach((doc) => {
        scholarships.push({ id: doc.id, ...doc.data() } as Scholarship)
      })

      return {
        scholarships,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getScholarshipById(id: string) {
    try {
      const docRef = doc(db, 'scholarships', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Scholarship
      }
      return null
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 