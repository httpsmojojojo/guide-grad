"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  MapPin,
  Star,
  DollarSign,
  GraduationCap,
  Building,
  Globe,
  Phone,
  CheckCircle,
  Loader2,
  AlertCircle,
  BookmarkCheck,
  BookmarkPlus,
  Calendar,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { universitiesApi } from "@/lib/api"
import type { University } from "@/lib/api/universities"
import { toast } from "sonner"

interface Program {
  name: string
  description: string
  duration: string
  degree: string
}

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
        {/* Hero Image Section */}
        <div className="relative w-full max-w-full h-[400px] mb-8 rounded-lg overflow-hidden mx-auto">
          <img
            src={university.imageDetail || university.image}
            alt={university.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.image-placeholder')) {
                const icon = document.createElement('div');
                icon.className = 'image-placeholder absolute inset-0 flex flex-col items-center justify-center text-gray-300 bg-gray-100';
                icon.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"mx-auto\" width=\"64\" height=\"64\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><rect width=\"18\" height=\"14\" x=\"3\" y=\"5\" rx=\"2\" stroke-width=\"1.5\"/><circle cx=\"8.5\" cy=\"10.5\" r=\"1.5\" stroke-width=\"1.5\"/><path stroke-width=\"1.5\" d=\"M21 19l-5.5-6.5-4.5 5.5-2-2.5L3 19\"/></svg>`;
                parent.appendChild(icon);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white flex items-center gap-4">
              <h1 className="text-4xl font-bold mb-2">{university.name}</h1>
              {/* Save/Unsave Button */}
              <button
                className="ml-2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow focus:outline-none"
                onClick={handleSaveToggle}
                disabled={isSaving}
                title={isSaved ? 'Unsave' : 'Save'}
                aria-label={isSaved ? 'Unsave university' : 'Save university'}
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                ) : isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <BookmarkPlus className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{university.location}</span>
                </div>
                {university.ranking && (
                  <div className="flex items-center">
                    <Badge variant="secondary" className="text-white bg-white/20">
                      Rank #{university.ranking}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university["faculty-student-ratio"]}</div>
              <div className="text-sm text-gray-600">Faculty-Student Ratio</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.campus.length}</div>
              <div className="text-sm text-gray-600">Campus Locations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.program_offered.length}</div>
              <div className="text-sm text-gray-600">Programs Offered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{university.program_detail.length}</div>
              <div className="text-sm text-gray-600">Detailed Programs</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="campus">Campus</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {university.name}</h2>
                    <p className="text-gray-600 mb-6">{university.description}</p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {university.eligibility ? (
                        <a
                          href={university.eligibility}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Eligibility Criteria
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <BookOpen className="w-4 h-4" /> Eligibility Criteria
                        </Button>
                      )}
                      {university.fee_structure ? (
                        <a
                          href={university.fee_structure}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Fee Structure
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <DollarSign className="w-4 h-4" /> Fee Structure
                        </Button>
                      )}
                    </div>
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
                          <p className="text-gray-600">{university.phone}</p>
                          <p className="text-gray-600">{university.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p className="text-gray-600">{university.location}</p>
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
                    <div className="flex flex-wrap gap-4 mb-6">
                      {university.eligibility ? (
                        <a
                          href={university.eligibility}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Eligibility Criteria
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <BookOpen className="w-4 h-4" /> Eligibility Criteria
                        </Button>
                      )}
                      {university.fee_structure ? (
                        <a
                          href={university.fee_structure}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Fee Structure
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <DollarSign className="w-4 h-4" /> Fee Structure
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {university.program_detail.map((program: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">{program.name}</h3>
                          <p className="text-gray-600 mb-2">{program.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            Duration: {program.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            Degree: {program.degree}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="campus" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Campus Locations</h2>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {university.eligibility ? (
                        <a
                          href={university.eligibility}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Eligibility Criteria
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <BookOpen className="w-4 h-4" /> Eligibility Criteria
                        </Button>
                      )}
                      {university.fee_structure ? (
                        <a
                          href={university.fee_structure}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Fee Structure
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="flex items-center gap-2" disabled>
                          <DollarSign className="w-4 h-4" /> Fee Structure
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {university.campus.map((campusLocation: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{campusLocation}</span>
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
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Type</h4>
                  <p className="text-gray-600">{university.type}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ranking</h4>
                  <p className="text-gray-600">{university.ranking}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Faculty-Student Ratio</h4>
                  <p className="text-gray-600">{university["faculty-student-ratio"]}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Campus Locations</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {university.campus.map((campusLocation: string, index: number) => (
                      <li key={index}>{campusLocation}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Scholarships</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {university.scholarship.map((scholarship: string, index: number) => (
                      <li key={index}>{scholarship}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 