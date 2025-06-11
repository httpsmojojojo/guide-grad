import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export interface BookingFormData {
  name: string
  email: string
  phone: string
  consultationType: string
  preferredMethod: string
  topic: string
  message: string
  date: Date
}

export const bookingsApi = {
  async submitBooking(formData: BookingFormData) {
    try {
      const bookingsRef = collection(db, 'bookings')
      const docRef = await addDoc(bookingsRef, {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 