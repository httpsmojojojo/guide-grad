"use client"

import type React from "react"
import { use } from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  MapPin,
  Star,
  ArrowLeft,
  Heart,
  Share2,
  Users,
  Calendar,
  DollarSign,
  GraduationCap,
  Building,
  Award,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getUniversityById, saveUniversity, unsaveUniversity, type University } from "@/lib/data"
import { toast } from "sonner"
import { Logo } from "@/components/Logo"

interface UniversityDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { id } = use(params)
  const [university, setUniversity] = useState<University | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    loadUniversity()
    checkIfSaved()
  }, [id])

  const loadUniversity = async () => {
    try {
      setLoading(true)
      const data = await getUniversityById(id)
      setUniversity(data)
    } catch (error) {
      toast.error("Failed to load university details")
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = () => {
    const saved = localStorage.getItem("savedUniversities")
    if (saved) {
      const savedList = JSON.parse(saved)
      setIsSaved(savedList.includes(id))
    }
  }

  const handleSaveToggle = async () => {
    try {
      const saved = localStorage.getItem("savedUniversities")
      const savedList = saved ? JSON.parse(saved) : []

      if (isSaved) {
        const newList = savedList.filter((savedId: string) => savedId !== id)
        localStorage.setItem("savedUniversities", JSON.stringify(newList))
        await unsaveUniversity("current-user", id)
        setIsSaved(false)
        toast.success("University removed from saved list")
      } else {
        const newList = [...savedList, id]
        localStorage.setItem("savedUniversities", JSON.stringify(newList))
        await saveUniversity("current-user", id)
        setIsSaved(true)
        toast.success("University saved to your list")
      }
    } catch (error) {
      toast.error("Failed to update saved universities")
    }
  }

  const handleShare = async () => {
    if (navigator.share && university) {
      try {
        await navigator.share({
          title: university.name,
          text: `Check out ${university.name} on Guide Grad`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Mock contact submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Message sent successfully! The university will contact you soon.")
      setShowContactDialog(false)
      setContactData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  const handleVirtualTour = () => {
    toast.info("Virtual tour feature coming soon!")
  }

  const handleScheduleVisit = () => {
    toast.info("Campus visit scheduling feature coming soon!")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading university details...</p>
        </div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">University Not Found</h1>
          <Link href="/universities">
            <Button>Back to Universities</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image src={university.image || "/placeholder.svg"} alt={university.name} fill className="object-cover" />
            {/* Floating Save Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveToggle}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
            >
              <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current text-red-500" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="bg-white text-gray-900">
                    {university.type}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    {university.ranking}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{university.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {university.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {university.rating} Rating
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {university.students} Students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.tuition}</div>
              <div className="text-sm text-gray-600">Annual Tuition</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.acceptance}</div>
              <div className="text-sm text-gray-600">Acceptance Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.campusSize}</div>
              <div className="text-sm text-gray-600">Campus Size</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.facultyStudentRatio}</div>
              <div className="text-sm text-gray-600">Faculty:Student Ratio</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 h-full flex flex-col">
            <Tabs defaultValue="overview" className="space-y-6 h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
                <TabsTrigger value="campus">Campus</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>About {university.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <p className="text-gray-600">{university.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Information</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>
                            <strong>Founded:</strong> {university.founded}
                          </li>
                          <li>
                            <strong>Type:</strong> {university.type}
                          </li>
                          <li>
                            <strong>Students:</strong> {university.students}
                          </li>
                          <li>
                            <strong>International Students:</strong> {university.internationalStudents}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Popular Programs</h4>
                        <div className="flex flex-wrap gap-1">
                          {university.programs.map((program, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Programs</CardTitle>
                    <CardDescription>Explore the various degree programs offered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {university.programs_detailed.map((program, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{program.name}</h4>
                            <Badge variant="secondary">{program.degree}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{program.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              Duration: {program.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admissions">
                <Card>
                  <CardHeader>
                    <CardTitle>Admission Requirements</CardTitle>
                    <CardDescription>What you need to apply</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {university.admissionRequirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Available Scholarships</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {university.scholarships.map((scholarship, index) => (
                          <div key={index} className="bg-blue-50 p-3 rounded-lg">
                            <span className="text-blue-800 font-medium">{scholarship}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Application Deadline</h4>
                      <p className="text-yellow-700">Applications for Fall 2024 are due by March 31, 2024</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="campus">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Life & Facilities</CardTitle>
                    <CardDescription>Discover what makes campus life special</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Campus Facilities</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {university.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center">
                              <Building className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-gray-600">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Campus Size</h4>
                        <p className="text-gray-600">
                          The university spans {university.campusSize} with modern facilities and green spaces.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 h-full flex flex-col">
            {/* Contact Information */}
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">{university.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">{university.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">{university.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Website</p>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
