"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { adminApi } from '@/lib/api/auth'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ContactForm {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

interface BookCallForm {
  id: string
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contactForms, setContactForms] = useState<ContactForm[]>([])
  const [bookCallForms, setBookCallForms] = useState<BookCallForm[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!adminApi.isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }

    const fetchForms = async () => {
      try {
        // Fetch contact forms
        const contactQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))
        const contactSnapshot = await getDocs(contactQuery)
        console.log('Contact forms fetched:', contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        const contactData = contactSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactForm[]
        setContactForms(contactData)

        // Fetch book call forms
        const bookCallQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))
        const bookCallSnapshot = await getDocs(bookCallQuery)
        console.log('Book call forms fetched:', bookCallSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        const bookCallData = bookCallSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BookCallForm[]
        setBookCallForms(bookCallData)
      } catch (error) {
        console.error('Error fetching forms:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchForms()
  }, [router])

  const handleLogout = () => {
    adminApi.logout()
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="contact" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contact">Contact Forms ({contactForms.length})</TabsTrigger>
            <TabsTrigger value="bookCall">Book Call Forms ({bookCallForms.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {contactForms.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No contact form submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {contactForms.map((form) => (
                      <Card key={form.id}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold">Name</p>
                              <p>{form.name}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p>{form.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Phone</p>
                              <p>{form.phone}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Date</p>
                              <p>{new Date(form.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="font-semibold">Message</p>
                              <p>{form.message}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookCall">
            <Card>
              <CardHeader>
                <CardTitle>Book Call Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {bookCallForms.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No book call form submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {bookCallForms.map((form) => (
                      <Card key={form.id}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold">Name</p>
                              <p>{form.name}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p>{form.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Phone</p>
                              <p>{form.phone}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Preferred Date</p>
                              <p>{form.preferredDate}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Preferred Time</p>
                              <p>{form.preferredTime}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Date Submitted</p>
                              <p>{new Date(form.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="font-semibold">Message</p>
                              <p>{form.message}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 