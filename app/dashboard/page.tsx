"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Calendar,
  Award,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  BookOpen,
  Save,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { getUniversityById, type University } from "@/lib/data"
import { useRouter } from "next/navigation"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  currentEducation: string
  interestedField: string
  extracurricularActivities: string
  personalStatement: string
}

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [savedUniversities, setSavedUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Ahmed",
    lastName: "Khan",
    email: "ahmed@example.com",
    phone: "+92-333-7013724",
    city: "Karachi",
    currentEducation: "A-Levels",
    interestedField: "Computer Science",
    extracurricularActivities: "",
    personalStatement: "",
  })
  const [profileCompletion, setProfileCompletion] = useState(85)

  const handleSignOut = () => {
    // Clear any stored user data
    localStorage.removeItem("savedUniversities")
    // Add any other user data that needs to be cleared
    
    // Redirect to home page
    router.push("/")
  }

  useEffect(() => {
    loadSavedUniversities()
    loadProfileData()
  }, [])

  const loadProfileData = () => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }
  }

  const saveProfileData = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    setIsEditing(false)
    // Recalculate profile completion
    calculateProfileCompletion()
  }

  const calculateProfileCompletion = () => {
    let completed = 0
    let total = 0

    // Basic Information
    if (profileData.firstName) completed++
    if (profileData.lastName) completed++
    if (profileData.email) completed++
    if (profileData.phone) completed++
    if (profileData.city) completed++
    total += 5

    // Academic Information
    if (profileData.currentEducation) completed++
    if (profileData.interestedField) completed++
    total += 2

    // Additional Information
    if (profileData.extracurricularActivities) completed++
    if (profileData.personalStatement) completed++
    total += 2

    const completion = Math.round((completed / total) * 100)
    setProfileCompletion(completion)
  }

  const loadSavedUniversities = async () => {
    try {
      setLoading(true)
      const saved = localStorage.getItem("savedUniversities")
      if (saved) {
        const savedIds = JSON.parse(saved)
        const universities = await Promise.all(
          savedIds.map((id: string) => getUniversityById(id))
        )
        setSavedUniversities(universities.filter((uni): uni is University => uni !== null))
      }
    } catch (error) {
      console.error("Failed to load saved universities:", error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingDeadlines = [
    { university: "LUMS", program: "Computer Science", deadline: "March 15, 2024", status: "pending" },
    { university: "IBA Karachi", program: "Business Administration", deadline: "March 20, 2024", status: "pending" },
    { university: "NUST", program: "Engineering", deadline: "April 1, 2024", status: "completed" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "universities" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("universities")}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Universities
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <Award className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {profileData.firstName}!</h2>
                <p className="text-primary-light">You're on track to achieve your educational goals. Keep it up!</p>
              </div>

              {/* Stats Cards */}
              <div className="justify-center">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saved Universities</p>
                        <p className="text-2xl font-bold text-gray-900">{savedUniversities.length}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with these common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/universities" className="w-full">
                      <Button className="w-full h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-dark">
                        <BookOpen className="w-6 h-6 mb-2" />
                        Explore Universities
                      </Button>
                    </Link>
                    <Link href="/book-call" className="w-full">
                      <Button className="w-full h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-dark">
                        <BookOpen className="w-6 h-6 mb-2" />
                        Book a Call
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Universities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Saved Universities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : savedUniversities.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No saved universities yet. Start exploring universities to save them!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedUniversities.map((university) => (
                        <div key={university.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{university.name}</p>
                            <p className="text-sm text-gray-600">{university.programs[0]}</p>
                          </div>
                          <Link href={`/universities/${university.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "universities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Saved Universities</h2>
                <Link href="/universities">
                  <Button className="bg-primary hover:bg-primary-dark">Explore All Universities</Button>
                </Link>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : savedUniversities.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved universities yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring universities to save them to your dashboard.</p>
                    <Link href="/universities">
                      <Button className="bg-primary hover:bg-primary-dark">Explore Universities</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedUniversities.map((university) => (
                    <Card key={university.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{university.name}</CardTitle>
                        <CardDescription>{university.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Programs</span>
                            <Badge variant="secondary">{university.programs.length}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Rating</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{university.rating}</span>
                            </div>
                          </div>
                          <Link href={`/universities/${university.id}`}>
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile</h2>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? saveProfileData() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to get better university recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Profile Completion</span>
                      <span className="font-medium">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-3" />
                    
                    <div className="space-y-6 mt-8">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={profileData.city}
                              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Academic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Academic Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentEducation">Current Education Level</Label>
                            <Input
                              id="currentEducation"
                              value={profileData.currentEducation}
                              onChange={(e) => setProfileData({ ...profileData, currentEducation: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="interestedField">Field of Interest</Label>
                            <Input
                              id="interestedField"
                              value={profileData.interestedField}
                              onChange={(e) => setProfileData({ ...profileData, interestedField: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Additional Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
                            <Textarea
                              id="extracurricularActivities"
                              value={profileData.extracurricularActivities}
                              onChange={(e) => setProfileData({ ...profileData, extracurricularActivities: e.target.value })}
                              disabled={!isEditing}
                              placeholder="List your extracurricular activities, achievements, and leadership roles..."
                              className="h-32"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="personalStatement">Personal Statement</Label>
                            <Textarea
                              id="personalStatement"
                              value={profileData.personalStatement}
                              onChange={(e) => setProfileData({ ...profileData, personalStatement: e.target.value })}
                              disabled={!isEditing}
                              placeholder="Write about your goals, aspirations, and why you're interested in your chosen field..."
                              className="h-32"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
