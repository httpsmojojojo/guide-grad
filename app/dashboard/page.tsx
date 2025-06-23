"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { useRouter } from "next/navigation"
import { authApi, profileApi, universitiesApi } from "@/lib/api"
import type { ProfileData } from "@/lib/api/profile"
import type { University } from "@/lib/api/universities"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [savedUniversities, setSavedUniversities] = useState<University[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    currentEducation: "",
    interestedField: "",
    extracurricularActivities: "",
    personalStatement: "",
  })
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleSignOut = async () => {
    try {
      await authApi.signOut()
      router.push("/")
    } catch (error: any) {
      setError(error.message)
    }
  }

  useEffect(() => {
    console.log('Dashboard useEffect running');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user')
      setUser(user)
      setIsAuthReady(true)
      if (!user) {
        console.log('No user found, redirecting to login')
        router.push("/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (isAuthReady && user) {
      console.log('Auth ready and user exists, loading dashboard data...')
      loadDashboardData()
    }
  }, [isAuthReady, user])

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError("")
    try {
      // Load profile data
      console.log('Fetching profile data...')
      const profile = await profileApi.getProfile()
      console.log('Profile data result:', profile)
      // Load saved universities
      console.log('Fetching saved universities...')
      const universities = await universitiesApi.getSavedUniversities()
      console.log('Saved universities result:', universities)
      setProfileData(profile || {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        currentEducation: "",
        interestedField: "",
        extracurricularActivities: "",
        personalStatement: "",
      })
      calculateProfileCompletion(profile || {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        currentEducation: "",
        interestedField: "",
        extracurricularActivities: "",
        personalStatement: "",
      })
      const validUniversities = universities.filter(uni => uni && uni.id)
      console.log('Valid saved universities:', validUniversities)
      setSavedUniversities(validUniversities)
    } catch (error: any) {
      console.error('Error loading dashboard data:', error)
      setError(error.message || 'Failed to load dashboard data')
    } finally {
      setIsLoading(false)
      console.log('Dashboard loading finished')
    }
  }

  const saveProfileData = async () => {
    try {
      await profileApi.updateProfile(profileData)
      setIsEditing(false)
      calculateProfileCompletion(profileData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const calculateProfileCompletion = (data: ProfileData) => {
    let completed = 0
    let total = 0

    // Basic Information
    if (data.firstName) completed++
    if (data.lastName) completed++
    if (data.email) completed++
    if (data.phone) completed++
    if (data.city) completed++
    total += 5

    // Academic Information
    if (data.currentEducation) completed++
    if (data.interestedField) completed++
    total += 2

    // Additional Information
    if (data.extracurricularActivities) completed++
    if (data.personalStatement) completed++
    total += 2

    const completion = Math.round((completed / total) * 100)
    setProfileCompletion(completion)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
            <div className="mt-4 space-y-2">
              <Button 
                onClick={loadDashboardData} 
                className="w-full"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={handleSignOut}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "universities" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setActiveTab("universities")}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Universities
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setActiveTab("profile")}
            >
              <Award className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-screen p-6">
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
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-4 sm:p-6 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {profileData.firstName}!</h2>
                <p className="text-sm sm:text-base text-primary-light">You're on track to achieve your educational goals. Keep it up!</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Profile Completion</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{profileCompletion}%</p>
                      </div>
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <Progress value={profileCompletion} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saved Universities</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{savedUniversities.length}</p>
                      </div>
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                  <CardDescription className="text-sm">Get started with these common tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/universities" className="w-full">
                      <Button className="w-full h-16 sm:h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-dark">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                        <span className="text-sm sm:text-base">Explore Universities</span>
                      </Button>
                    </Link>
                    <Link href="/book-call" className="w-full">
                      <Button className="w-full h-16 sm:h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-dark">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                        <span className="text-sm sm:text-base">Book a Call</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Universities */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      <CardTitle className="text-lg sm:text-xl">Saved Universities</CardTitle>
                    </div>
                    <Link href="/universities">
                      <Button variant="ghost" size="sm" className="text-primary">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {savedUniversities.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No saved universities yet</p>
                      <Link href="/universities">
                        <Button className="mt-4">Explore Universities</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedUniversities.slice(0, 3).map((university) => (
                        <div
                          key={university.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">{university.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">{university.location}</p>
                            </div>
                          </div>
                          <Link href={`/universities/${university.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        type="tel"
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
                    <div className="space-y-2">
                      <Label htmlFor="currentEducation">Current Education</Label>
                      <Input
                        id="currentEducation"
                        value={profileData.currentEducation}
                        onChange={(e) => setProfileData({ ...profileData, currentEducation: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="interestedField">Interested Field</Label>
                      <Input
                        id="interestedField"
                        value={profileData.interestedField}
                        onChange={(e) => setProfileData({ ...profileData, interestedField: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
                      <Textarea
                        id="extracurricularActivities"
                        value={profileData.extracurricularActivities}
                        onChange={(e) => setProfileData({ ...profileData, extracurricularActivities: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="personalStatement">Personal Statement</Label>
                      <Textarea
                        id="personalStatement"
                        value={profileData.personalStatement}
                        onChange={(e) => setProfileData({ ...profileData, personalStatement: e.target.value })}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={saveProfileData}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "universities" && (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <CardTitle className="text-lg sm:text-xl">Saved Universities</CardTitle>
                    </div>
                    <Link href="/universities">
                      <Button variant="ghost" size="sm" className="text-primary">
                        Explore More
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {savedUniversities.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No saved universities yet</p>
                      <Link href="/universities">
                        <Button className="mt-4">Explore Universities</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedUniversities.map((university) => (
                        <Card key={university.id} className="border-primary-light">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium text-sm sm:text-base">{university.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-500">{university.location}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Ranking</span>
                                <span className="font-medium">{university.ranking}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Link href={`/universities/${university.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
