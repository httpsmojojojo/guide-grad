import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  addDoc,
  Query,
  CollectionReference
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { authApi } from './auth'

export interface University {
  id?: string
  campus: string[]
  description: string
  email: string
  "faculty-student-ratio": string
  image: string
  imageCard: string
  imageDetail: string
  location: string
  name: string
  phone: string
  program_detail: Array<{
    degree: string
    duration: string
    name: string
  }>
  program_offered: string[]
  ranking: string
  scholarship: string[]
  type: string
  website: string
  eligibility?: string // eligibility PDF link
  fee_structure?: string // fee structure PDF link
}

export interface UniversityFilters {
  location?: string
  program?: string
  type?: string
}

export interface ContactData {
  name: string
  email: string
  phone: string
  message: string
}

export const universitiesApi = {
  async getUniversities(filters?: UniversityFilters, lastDoc?: any) {
    try {
      let q: Query | CollectionReference = collection(db, 'universities')
      
      // Apply filters if provided
      if (filters) {
        const constraints = []
        if (filters.location) {
          constraints.push(where('location', '==', filters.location))
        }
        if (filters.program) {
          constraints.push(where('program_offered', 'array-contains', filters.program))
        }
        
        q = query(q, ...constraints, orderBy('name', 'asc'), limit(10))
      } else {
        q = query(q, orderBy('name', 'asc'), limit(10))
      }

      // Apply pagination if lastDoc is provided
      if (lastDoc) {
        q = query(q, startAfter(lastDoc))
      }

      const querySnapshot = await getDocs(q)
      const universities: University[] = []
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Map the data to match the new University interface
        universities.push({ 
          id: doc.id,
          campus: data.campus || [],
          description: data.description || '',
          email: data.email || '',
          "faculty-student-ratio": data["faculty-student-ratio"] || '',
          image: data.image || '',
          imageCard: data.imageCard || data.image || '',
          imageDetail: data.imageDetail || data.image || '',
          location: data.location || '',
          name: data.name || '',
          phone: data.phone || '',
          program_detail: data.program_detail || [],
          program_offered: data.program_offered || [],
          ranking: data.ranking || '',
          scholarship: data.scholarship || [],
          type: data.type || '',
          website: data.website || '',
          eligibility: data.eligibility || '',
          fee_structure: data.fee_structure || ''
        } as University)
      })

      return {
        universities,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getUniversityById(id: string) {
    if (!id) return null;
    
    try {
      console.log('Getting university by ID:', id)
      const docRef = doc(db, 'universities', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (!data) {
          console.log('University document exists but has no data:', id)
          return null;
        }
        
        console.log('Found university:', { id: docSnap.id, name: data.name })
        return { 
          id: docSnap.id,
          campus: data.campus || [],
          description: data.description || '',
          email: data.email || '',
          "faculty-student-ratio": data["faculty-student-ratio"] || '',
          image: data.image || '',
          imageCard: data.imageCard || data.image || '',
          imageDetail: data.imageDetail || data.image || '',
          location: data.location || '',
          name: data.name || '',
          phone: data.phone || '',
          program_detail: data.program_detail || [],
          program_offered: data.program_offered || [],
          ranking: data.ranking || '',
          scholarship: data.scholarship || [],
          type: data.type || '',
          website: data.website || '',
          eligibility: data.eligibility || '',
          fee_structure: data.fee_structure || ''
        } as University
      }
      console.log('University not found with ID:', id)
      return null
    } catch (error: any) {
      console.error('Error getting university by ID:', error)
      return null
    }
  },

  async saveUniversity(universityId: string) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      console.log('Saving university with ID:', universityId)
      // First verify the university exists
      const university = await this.getUniversityById(universityId)
      if (!university) {
        console.error('University not found with ID:', universityId)
        throw new Error('University not found')
      }
      console.log('Found university to save:', university.name)

      // Save using the Firestore document ID
      await addDoc(collection(db, 'users', user.uid, 'savedUniversities'), {
        universityId: universityId,  // This is the Firestore document ID
        savedAt: new Date().toISOString()
      })
      console.log('Successfully saved university')
    } catch (error: any) {
      console.error('Error saving university:', error)
      throw new Error(error.message)
    }
  },

  async unsaveUniversity(universityId: string) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      // Use the Firestore document ID to find and remove the saved university
      const savedRef = collection(db, 'users', user.uid, 'savedUniversities')
      const q = query(savedRef, where('universityId', '==', universityId))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const docRef = doc(savedRef, querySnapshot.docs[0].id)
        await deleteDoc(docRef)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getSavedUniversities() {
    const user = authApi.getCurrentUser()
    if (!user) {
      console.log('No authenticated user found')
      return [] // Return empty array for unauthenticated users
    }

    try {
      console.log('Fetching saved universities for user:', user.uid)
      const savedRef = collection(db, 'users', user.uid, 'savedUniversities')
      const savedSnapshot = await getDocs(savedRef)
      
      console.log('Saved universities snapshot:', savedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      
      const savedIds = savedSnapshot.docs
        .map(doc => doc.data().universityId)
        .filter(id => id !== undefined && id !== null)
      
      console.log('Filtered saved university IDs:', savedIds)
      
      const universities: University[] = []

      for (const id of savedIds) {
        console.log('Fetching university details for ID:', id)
        const university = await this.getUniversityById(id)
        if (university) {
          console.log('Found university:', university.name)
          universities.push(university)
        } else {
          console.log('University not found for ID:', id)
          // Remove the saved university if it no longer exists
          try {
            const savedDoc = savedSnapshot.docs.find(doc => doc.data().universityId === id)
            if (savedDoc) {
              await deleteDoc(doc(savedRef, savedDoc.id))
              console.log('Removed non-existent saved university:', id)
            }
          } catch (error) {
            console.error('Error removing non-existent saved university:', error)
          }
        }
      }

      console.log('Final saved universities:', universities)
      return universities
    } catch (error: any) {
      console.error('Error fetching saved universities:', error)
      return [] // Return empty array on error
    }
  },

  async contactUniversity(universityId: string, contactData: ContactData) {
    const user = authApi.getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    try {
      await addDoc(collection(db, 'universities', universityId, 'contacts'), {
        ...contactData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 