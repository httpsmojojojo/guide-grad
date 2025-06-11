"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CalendarIcon, Clock, User, Phone, Video, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { SuccessModal } from "@/components/SuccessModal"
import { ErrorModal } from "@/components/ErrorModal"
import { bookingsApi } from "@/lib/api/bookings"
import type { BookingFormData } from "@/lib/api/bookings"

export default function BookCallPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredMethod: "",
    topic: "",
    message: "",
    date: new Date()
  })

  const consultationTypes = [
    { value: "university-selection", label: "University Selection", duration: "45 min" },
    { value: "application-review", label: "Application Review", duration: "60 min" },
    { value: "scholarship-guidance", label: "Scholarship Guidance", duration: "30 min" },
    { value: "career-counseling", label: "Career Counseling", duration: "45 min" },
    { value: "general-guidance", label: "General Guidance", duration: "30 min" },
  ]

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Invalid email format")
      return false
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Phone number is required")
      return false
    }
    if (!formData.consultationType) {
      setErrorMessage("Please select a consultation type")
      return false
    }
    if (!formData.preferredMethod) {
      setErrorMessage("Please select a preferred method")
      return false
    }
    if (!selectedDate) {
      setErrorMessage("Please select a date")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setIsErrorModalOpen(true)
      return
    }

    setIsSubmitting(true)
    try {
      if (!selectedDate) {
        throw new Error("Please select a date")
      }
      
      const bookingData: BookingFormData = {
        ...formData,
        date: selectedDate
      }
      await bookingsApi.submitBooking(bookingData)
      setIsSuccessModalOpen(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "",
        preferredMethod: "",
        topic: "",
        message: "",
        date: new Date()
      })
      setSelectedDate(undefined)
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to book consultation. Please try again.")
      setIsErrorModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Booking Successful!"
        message="Thank you for booking a consultation. We'll get back to you within 24 hours to confirm your appointment."
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Book a Free Consultation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from our education experts to help you make the right decisions for your future
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="text-center border-primary-light">
            <CardContent className="p-6">
              <User className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Get advice from experienced education counselors</p>
            </CardContent>
          </Card>
          <Card className="text-center border-primary-light">
            <CardContent className="p-6">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">Personalized Plan</h3>
              <p className="text-sm text-gray-600">Receive a customized roadmap for your education journey</p>
            </CardContent>
          </Card>
        </div>

        {/* Centered Booking Form */}
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="border-primary-light w-full max-w-xl">
            <CardHeader>
              <CardTitle className="text-primary">Schedule Your Consultation</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                noValidate
              >
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+92-300-1234567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Select Date</Label>
                    <DatePicker
                      id="date"
                      name="date"
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date ?? new Date())}
                      minDate={new Date()}
                      className="w-full border rounded px-3 py-2"
                      placeholderText="Choose a date"
                      required
                    />
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Consultation Details</h3>
                  <div>
                    <Label htmlFor="consultationType">Type of Consultation</Label>
                    <Select 
                      name="consultationType"
                      value={formData.consultationType}
                      onValueChange={(value) => handleInputChange("consultationType", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} ({type.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferredMethod">Preferred Method</Label>
                    <Select
                      name="preferredMethod"
                      value={formData.preferredMethod}
                      onValueChange={(value) => handleInputChange("preferredMethod", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </div>
                        </SelectItem>
                        <SelectItem value="phone">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Phone Call
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="topic">Topic (Optional)</Label>
                    <Input
                      id="topic"
                      name="topic"
                      placeholder="What would you like to discuss?"
                      value={formData.topic}
                      onChange={(e) => handleInputChange("topic", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Information (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Any specific questions or concerns you'd like to address?"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Book Consultation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
