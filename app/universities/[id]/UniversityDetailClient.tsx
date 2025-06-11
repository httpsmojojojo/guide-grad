"use client"

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
  Loader2,
  AlertCircle,
  BookmarkCheck,
  BookmarkPlus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { universitiesApi } from "@/lib/api"
import type { University } from "@/lib/api/universities"
import { toast } from "sonner"
import { Logo } from "@/components/Logo"

interface UniversityDetailClientProps {
  id: string
}

export default function UniversityDetailClient({ id }: UniversityDetailClientProps) {
  const [university, setUniversity] = useState<University | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    loadUniversity()
    checkIfSaved()
  }, [id])

  const loadUniversity = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await universitiesApi.getUniversityById(id)
      setUniversity(data)
    } catch (error: any) {
      setError(error.message)
      toast.error("Failed to load university details")
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    try {
      const saved = await universitiesApi.getSavedUniversities()
      setIsSaved(saved.some(uni => uni.id === id))
    } catch (error: any) {
      console.error("Failed to check saved status:", error)
    }
  }

  const handleSaveToggle = async () => {
    if (!university) return
    setIsSaving(true)
    try {
      if (isSaved) {
        await universitiesApi.unsaveUniversity(id)
        setIsSaved(false)
        toast.success("University removed from saved list")
      } else {
        await universitiesApi.saveUniversity(id)
        setIsSaved(true)
        toast.success("University saved successfully")
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading university details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
            <Button 
              onClick={loadUniversity} 
              className="w-full mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
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
        <div className="relative">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative h-64 md:h-80">
              <Image src={university.imageUrl || "/placeholder.svg"} alt={university.name} fill className="object-cover" />
              {/* Floating Save Button */}
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={handleSaveToggle}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : isSaved ? (
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                ) : (
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                )}
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-white text-gray-900">
                  {university.location}
                </Badge>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  {university.rating} Rating
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
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.tuitionFee}</div>
              <div className="text-sm text-gray-600">Annual Tuition</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.admissionDeadline}</div>
              <div className="text-sm text-gray-600">Admission Deadline</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.facilities.length}</div>
              <div className="text-sm text-gray-600">Facilities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.programs.length}</div>
              <div className="text-sm text-gray-600">Programs</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {university.name}</h2>
                    <p className="text-gray-600 mb-6">{university.description}</p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Globe className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Website</h3>
                          <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {university.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Contact</h3>
                          <p className="text-gray-600">{university.contact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="programs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Available Programs</h2>
                    <div className="space-y-4">
                      {university.programs.map((program, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">{program.name}</h3>
                          <p className="text-gray-600 mb-2">{program.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            Duration: {program.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="facilities" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Campus Facilities</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {university.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Contact University</CardTitle>
                <CardDescription>
                  Get in touch with the university for more information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Contact University</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {university.name}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to get in touch with the university
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 