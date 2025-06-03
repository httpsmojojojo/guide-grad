"use client"

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

interface UniversityDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const resolvedParams = use(params)
  const [university, setUniversity] = useState<University | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [applicationData, setApplicationData] = useState({
    program: "",
    message: "",
    documents: "",
  })
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    loadUniversity()
    checkIfSaved()
  }, [resolvedParams.id])

  const loadUniversity = async () => {
    try {
      setLoading(true)
      const data = await getUniversityById(resolvedParams.id)
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
      setIsSaved(savedList.includes(resolvedParams.id))
    }
  }

  const handleSaveToggle = async () => {
    try {
      const saved = localStorage.getItem("savedUniversities")
      const savedList = saved ? JSON.parse(saved) : []

      if (isSaved) {
        const newList = savedList.filter((id: string) => id !== resolvedParams.id)
        localStorage.setItem("savedUniversities", JSON.stringify(newList))
        await unsaveUniversity("current-user", resolvedParams.id)
        setIsSaved(false)
        toast.success("University removed from saved list")
      } else {
        const newList = [...savedList, resolvedParams.id]
        localStorage.setItem("savedUniversities", JSON.stringify(newList))
        await saveUniversity("current-user", resolvedParams.id)
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

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Mock application submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Application submitted successfully! You'll receive a confirmation email.")
      setShowApplicationDialog(false)
      setApplicationData({ program: "", message: "", documents: "" })
    } catch (error) {
      toast.error("Failed to submit application")
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
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/universities" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universities
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">Guide Grad</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSaveToggle}>
              <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current text-red-500" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image src={university.image || "/placeholder.svg"} alt={university.name} fill className="object-cover" />
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
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
                <TabsTrigger value="campus">Campus</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>About {university.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                            <Button size="sm" variant="outline">
                              Learn More
                            </Button>
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
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply to {university.name}</DialogTitle>
                      <DialogDescription>
                        Start your application process. We'll guide you through the requirements.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleApplicationSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="program">Preferred Program</Label>
                        <Input
                          id="program"
                          placeholder="e.g., Computer Science"
                          value={applicationData.program}
                          onChange={(e) => setApplicationData({ ...applicationData, program: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Personal Statement</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us why you want to study at this university..."
                          value={applicationData.message}
                          onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="documents">Documents Ready</Label>
                        <Input
                          id="documents"
                          placeholder="List documents you have ready (transcripts, certificates, etc.)"
                          value={applicationData.documents}
                          onChange={(e) => setApplicationData({ ...applicationData, documents: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full" onClick={handleScheduleVisit}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Campus Visit
                </Button>

                <Link href="/ambassadors" className="block">
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Connect with Ambassador
                  </Button>
                </Link>

                <Button variant="outline" className="w-full" onClick={handleVirtualTour}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>

                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact University
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {university.name}</DialogTitle>
                      <DialogDescription>
                        Send a message directly to the university admissions office.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="What would you like to know about the university?"
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Similar Universities */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Universities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/universities/2" className="block">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-sm">IBA Karachi</p>
                        <p className="text-xs text-gray-600">Business • Karachi</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        92% match
                      </Badge>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">NUST</p>
                      <p className="text-xs text-gray-600">Engineering • Islamabad</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      88% match
                    </Badge>
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
