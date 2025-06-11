import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
}

export const contactApi = {
  async submitContactForm(formData: ContactFormData) {
    try {
      const contactsRef = collection(db, 'contacts')
      const docRef = await addDoc(contactsRef, {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 