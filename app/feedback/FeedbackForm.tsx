"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"
import { Info, XCircle } from "lucide-react"

// Simple Modal component
interface ModalProps {
  open: boolean
  onClose: () => void
  icon: React.ReactNode
  title: string
  message: string
  buttonText: string
}
function Modal({ open, onClose, icon, title, message, buttonText }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-sm w-full text-center">
        <div className="flex flex-col items-center">
          {icon}
          <h2 className="text-lg sm:text-xl font-bold mt-3 sm:mt-4 mb-2">{title}</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{message}</p>
          <Button onClick={onClose} className="bg-primary text-white px-6 sm:px-8 rounded-full text-sm sm:text-base">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

type FormData = {
  name: string
  email: string
  type: string
  message: string
}

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    type: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowSuccess(false)
    setShowError(false)

    try {
      await addDoc(collection(db, "feedback"), {
        ...formData,
        createdAt: new Date(),
        status: "pending",
      })
      setShowSuccess(true)
      toast.success("Thank you for your feedback!")
      setFormData({
        name: "",
        email: "",
        type: "",
        message: "",
      })
    } catch (error) {
      setShowError(true)
      toast.error("Failed to submit feedback. Please try again.")
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  return (
    <div className="relative">
      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<Info className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />}
        title="Feedback Submitted!"
        message="Thank you for your feedback. We appreciate your input and will use it to improve Guide Grad."
        buttonText="Got it"
      />
      {/* Error Modal */}
      <Modal
        open={showError}
        onClose={() => setShowError(false)}
        icon={<XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />}
        title="Submission Failed"
        message="Something went wrong. Please try again later."
        buttonText="Got it"
      />
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your name"
            className="h-9 sm:h-10"
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your.email@example.com"
            className="h-9 sm:h-10"
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="type" className="text-sm sm:text-base">Feedback Type</Label>
          <Select
            value={formData.type}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger className="h-9 sm:h-10">
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="Share your thoughts..."
            className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-9 sm:h-10 text-sm sm:text-base" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </div>
  )
} 