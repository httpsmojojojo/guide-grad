"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { adminApi } from '@/lib/api/auth'
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { format } from 'date-fns'

interface ContactForm {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: Date | string
}

interface BookCallForm {
  id: string
  name: string
  email: string
  phone: string
  message: string
  date?: Date | string
  createdAt: Date | string
}

interface FeedbackForm {
  id: string
  name: string
  email: string
  type: string
  message: string
  createdAt: Date
  status: string
}

// Modal for delete confirmation
interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onApprove: () => void
  message: string
}
function ConfirmModal({ open, onClose, onApprove, message }: ConfirmModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-red-600">Warning</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-red-600 text-white" onClick={onApprove}>Approve</Button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contactForms, setContactForms] = useState<ContactForm[]>([])
  const [bookCallForms, setBookCallForms] = useState<BookCallForm[]>([])
  const [feedbackForms, setFeedbackForms] = useState<FeedbackForm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean
    onApprove: () => void
    message: string
  }>({ open: false, onApprove: () => {}, message: "" })

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
        const contactData = contactSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : ""
        })) as ContactForm[]
        setContactForms(contactData)

        // Fetch book call forms
        const bookCallQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))
        const bookCallSnapshot = await getDocs(bookCallQuery)
        const bookCallData = bookCallSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : "",
          date: doc.data().date?.toDate ? doc.data().date.toDate() : ""
        })) as BookCallForm[]
        setBookCallForms(bookCallData)

        // Fetch feedback forms
        const feedbackQuery = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'))
        const feedbackSnapshot = await getDocs(feedbackQuery)
        const feedbackData = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as FeedbackForm[]
        setFeedbackForms(feedbackData)
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

  // Delete handlers
  const handleDeleteContact = async (id: string) => {
    await deleteDoc(doc(db, 'contacts', id))
    setContactForms((prev) => prev.filter((f) => f.id !== id))
  }
  const handleDeleteBookCall = async (id: string) => {
    await deleteDoc(doc(db, 'bookings', id))
    setBookCallForms((prev) => prev.filter((f) => f.id !== id))
  }
  const handleDeleteFeedback = async (id: string) => {
    await deleteDoc(doc(db, 'feedback', id))
    setFeedbackForms((prev) => prev.filter((f) => f.id !== id))
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
      <ConfirmModal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ ...confirmModal, open: false })}
        onApprove={() => {
          confirmModal.onApprove()
          setConfirmModal({ ...confirmModal, open: false })
        }}
        message={confirmModal.message}
      />
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
            <TabsTrigger value="feedback">Feedback ({feedbackForms.length})</TabsTrigger>
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
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="destructive"
                              onClick={() => setConfirmModal({
                                open: true,
                                onApprove: () => handleDeleteContact(form.id),
                                message: 'Are you sure you want to delete this contact form? This action cannot be undone.'
                              })}
                            >
                              Delete
                            </Button>
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
                              <p className="font-semibold">Date</p>
                              <p>{form.date ? new Date(form.date).toLocaleDateString() : ''}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Time</p>
                              <p>{form.date ? new Date(form.date).toLocaleTimeString() : ''}</p>
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
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="destructive"
                              onClick={() => setConfirmModal({
                                open: true,
                                onApprove: () => handleDeleteBookCall(form.id),
                                message: 'Are you sure you want to delete this book call form? This action cannot be undone.'
                              })}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {feedbackForms.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No feedback submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {feedbackForms.map((form) => (
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
                              <p className="font-semibold">Type</p>
                              <p className="capitalize">{form.type}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Status</p>
                              <p className="capitalize">{form.status}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Date Submitted</p>
                              <p>{format(form.createdAt, "PPP p")}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="font-semibold">Message</p>
                              <p>{form.message}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="destructive"
                              onClick={() => setConfirmModal({
                                open: true,
                                onApprove: () => handleDeleteFeedback(form.id),
                                message: 'Are you sure you want to delete this feedback? This action cannot be undone.'
                              })}
                            >
                              Delete
                            </Button>
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