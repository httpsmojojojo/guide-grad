"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  Globe,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { contactAction } from "@/lib/actions"

export default function ContactPage() {
  const [formData, setFormData] = useState({
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
  const [activeOffice, setActiveOffice] = useState(0)

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
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      await contactAction(formDataObj)
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
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
      contact: "info@guidegrad.pk",
      action: "Send Email",
      available: "24/7",
      responseTime: "Within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team during business hours",
      contact: "+92-300-1234567",
      action: "Call Now",
      available: "Mon-Fri: 9 AM - 6 PM",
      responseTime: "Immediate",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 9 AM - 6 PM",
      action: "Start Chat",
      available: "Mon-Fri: 9 AM - 6 PM",
      responseTime: "Within 5 minutes",
    },
  ]

  const officeLocations = [
    {
      city: "Lahore",
      address: "123 Main Street, Gulberg III, Lahore, Punjab",
      phone: "+92-42-1234567",
      email: "lahore@guidegrad.pk",
      hours: "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM",
      manager: "Ali Hassan",
      services: ["University Guidance", "Scholarship Counseling", "Career Planning"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      city: "Karachi",
      address: "456 Business Center, Clifton, Karachi, Sindh",
      phone: "+92-21-1234567",
      email: "karachi@guidegrad.pk",
      hours: "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM",
      manager: "Fatima Khan",
      services: ["International Admissions", "Test Preparation", "Visa Guidance"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      city: "Islamabad",
      address: "789 Corporate Plaza, Blue Area, Islamabad, ICT",
      phone: "+92-51-1234567",
      email: "islamabad@guidegrad.pk",
      hours: "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM",
      manager: "Dr. Sarah Ahmed",
      services: ["PhD Guidance", "Research Opportunities", "Academic Writing"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const faqCategories = [
    {
      icon: HelpCircle,
      title: "General Questions",
      description: "Common questions about our services",
      count: "25+ FAQs",
    },
    {
      icon: Users,
      title: "Student Support",
      description: "Help with applications and guidance",
      count: "30+ FAQs",
    },
    {
      icon: BookOpen,
      title: "University Information",
      description: "Questions about specific universities",
      count: "40+ FAQs",
    },
  ]

  const quickStats = [
    { label: "Response Time", value: "< 24 hrs", icon: Clock },
    { label: "Satisfaction Rate", value: "98%", icon: Star },
    { label: "Global Reach", value: "50+ Cities", icon: Globe },
    { label: "Expert Team", value: "25+ Experts", icon: Users },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffice((prev) => (prev + 1) % officeLocations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [officeLocations.length])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">Guide Grad</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about">
              <Button variant="outline">About Us</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Have questions? We're here to help you on your educational journey. Reach out to us anytime.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <p className="font-medium text-gray-900 mb-2">{method.contact}</p>
                <div className="space-y-1 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {method.available}
                  </Badge>
                  <p className="text-xs text-gray-500">{method.responseTime}</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">{method.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    There was an error sending your message. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92-300-1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Student Support</SelectItem>
                      <SelectItem value="university">University Information</SelectItem>
                      <SelectItem value="scholarship">Scholarship Guidance</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your inquiry"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className={errors.subject ? "border-red-500" : ""}
                    required
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className={errors.message ? "border-red-500" : ""}
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    <p className="text-gray-500 text-sm ml-auto">{formData.message.length}/500</p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
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

          {/* Office Locations & Additional Info */}
          <div className="space-y-6">
            {/* Featured Office */}
            <Card>
              <CardHeader>
                <CardTitle>Our Offices</CardTitle>
                <CardDescription>Visit us at any of our locations across Pakistan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 transition-all duration-300 ${
                        index === activeOffice ? "border-blue-300 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg text-blue-600">{office.city}</h3>
                        <Badge variant={index === activeOffice ? "default" : "outline"}>
                          {index === activeOffice ? "Featured" : "Available"}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{office.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{office.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{office.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{office.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">Manager: {office.manager}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Services Available:</h4>
                        <div className="flex flex-wrap gap-1">
                          {office.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Need Quick Help?</CardTitle>
                <CardDescription>Check our FAQ sections for immediate answers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faqCategories.map((category, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start h-auto p-4 hover:bg-blue-50">
                      <category.icon className="w-5 h-5 mr-3 text-blue-600" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{category.title}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200 mb-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-lg text-red-800 mb-2">Emergency Support</h3>
            <p className="text-red-700 mb-4">
              For urgent matters requiring immediate attention, please call our emergency hotline
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="destructive">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: +92-300-HELP-NOW
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">Book a free consultation with our education experts</p>
            <Link href="/book-call">
              <Button size="lg" variant="secondary">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
