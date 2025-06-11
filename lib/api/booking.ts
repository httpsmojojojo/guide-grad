import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { authApi } from './auth'

export interface BookingData {
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  purpose: string
  notes?: string
}

export interface TimeSlot {
  startTime: string
  endTime: string
  available: boolean
}

export const bookingApi = {
  async submitBooking(data: BookingData) {
    const user = authApi.getCurrentUser()
    
    try {
      await addDoc(collection(db, 'bookings'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: user?.uid || null
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async getAvailableTimeSlots(date: string) {
    try {
      // Get all bookings for the specified date
      const q = query(
        collection(db, 'bookings'),
        where('preferredDate', '==', date),
        where('status', '==', 'confirmed')
      )
      
      const querySnapshot = await getDocs(q)
      const bookedSlots = new Set<string>()
      
      querySnapshot.forEach((doc) => {
        const booking = doc.data()
        bookedSlots.add(booking.preferredTime)
      })

      // Generate all possible time slots
      const allSlots: TimeSlot[] = []
      const startHour = 9 // 9 AM
      const endHour = 17 // 5 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`
        allSlots.push({
          startTime: time,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
          available: !bookedSlots.has(time)
        })
      }

      return allSlots
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
} 