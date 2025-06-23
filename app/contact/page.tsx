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
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  Clock,
  Send,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { contactApi } from "@/lib/api/contact"
import type { ContactFormData } from "@/lib/api/contact"

const SuccessModal = dynamic(() => import("@/components/SuccessModal").then(m => ({ default: m.SuccessModal })), { loading: () => <div>Loading...</div> })
const ErrorModal = dynamic(() => import("@/components/ErrorModal").then(m => ({ default: m.ErrorModal })), { loading: () => <div>Loading...</div> })

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.category) newErrors.category = "Please select a category"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await contactApi.submitContactForm(formData)
      setSubmitStatus("success")
      setIsSuccessModalOpen(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch (error: any) {
      setSubmitStatus("error")
      setErrorMessage(error.message || "Failed to send message. Please try again.")
      setIsErrorModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "guidegrad1@gmail.com",
      action: "Send Email",
      available: "24/7",
      responseTime: "Within 24 hours",
    },
  ]

  const quickStats = [
    { label: "Response Time", value: "within 24 hrs", icon: Clock },
    { label: "Satisfaction Rate", value: "98%", icon: Star },
    { label: "Expert Team", value: "20+ Experts", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Message Sent!"
        message="Thank you for your message. We'll get back to you within 24 hours."
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
      <div className="container mx-auto px-4 py-4 sm:py-8">

        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 text-primary">Contact Us</h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for any questions or support you need
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center gap-6 sm:gap-12 flex-wrap mb-6 sm:mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center min-w-[100px] sm:min-w-[120px]">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1" />
              <div className="text-base sm:text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 justify-center gap-4 mb-8 sm:mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary-light max-w-lg w-full mx-auto">
              <CardContent className="p-4 sm:p-6">
                <div className="bg-primary-light w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <method.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary">{method.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{method.description}</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 mb-2">{method.contact}</p>
                <div className="space-y-1 mb-3 sm:mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {method.available}
                  </Badge>
                  <p className="text-xs text-gray-500">{method.responseTime}</p>
                </div>
                <a
                  href={`mailto:${method.contact}?subject=Contact%20from%20Guide%20Grad`}
                  className="inline-block w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="h-9 sm:h-10 text-white hover:text-white/90 w-full" asChild>
                    <span>{method.action}</span>
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="flex justify-center items-center mb-8 sm:mb-12">
          <Card className="border-primary-light max-w-lg w-full mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">Send us a Message</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your name"
                      className={`h-9 sm:h-10 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-xs sm:text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={`h-9 sm:h-10 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs sm:text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Your phone number"
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm sm:text-base">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className={`h-9 sm:h-10 ${errors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-xs sm:text-sm text-red-500">{errors.category}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm sm:text-base">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What is this regarding?"
                    className={`h-9 sm:h-10 ${errors.subject ? "border-red-500" : ""}`}
                  />
                  {errors.subject && <p className="text-xs sm:text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Your message"
                    className={`min-h-[100px] ${errors.message ? "border-red-500" : ""}`}
                  />
                  {errors.message && <p className="text-xs sm:text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-9 sm:h-10 text-white hover:text-white/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6 opacity-90">Book a free consultation with our team</p>
          <Link href="/book-call">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
