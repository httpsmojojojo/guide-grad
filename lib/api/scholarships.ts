import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  DocumentData
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Scholarship {
  id: string
  amount: string 
  applicants: string 
  applicationUrl: string 
  awards: string 
  contactEmail: string 
  deadline: string 
  description: string 
  disbursementSchedule: string 
  eligibility: string 
  fields: string[] 
  level: string
  provider: string
  renewalTerms: string 
  requirements: string[] 
  selectionCriteria: string[] 
  status: string 
  title: string 
  type: string 

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
      const scholarshipsRef = collection(db, 'scholarships')
      let q: Query<DocumentData>
      
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
        
        q = query(scholarshipsRef, ...constraints, orderBy('deadline', 'asc'), limit(10))
      } else {
        q = query(scholarshipsRef, orderBy('deadline', 'asc'), limit(10))
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