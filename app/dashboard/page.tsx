"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
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
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingDeadlines = [
    { university: "LUMS", program: "Computer Science", deadline: "March 15, 2024", status: "pending" },
    { university: "IBA Karachi", program: "Business Administration", deadline: "March 20, 2024", status: "pending" },
    { university: "NUST", program: "Engineering", deadline: "April 1, 2024", status: "completed" },
  ]

  const savedUniversities = [
    { name: "LUMS", program: "Computer Science", match: 95 },
    { name: "IBA Karachi", program: "Business Administration", match: 88 },
    { name: "NUST", program: "Engineering", match: 92 },
    { name: "FAST", program: "Computer Science", match: 85 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">Guide Grad</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

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
              variant={activeTab === "applications" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("applications")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Applications
            </Button>
            <Button
              variant={activeTab === "ambassadors" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("ambassadors")}
            >
              <Users className="w-4 h-4 mr-2" />
              Ambassadors
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
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Ahmed!</h2>
                <p className="text-blue-100">You're on track to achieve your educational goals. Keep it up!</p>
              </div>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saved Universities</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Applications</p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Profile Score</p>
                        <p className="text-2xl font-bold text-gray-900">85%</p>
                      </div>
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Consultations</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-600" />
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
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/universities">
                      <Button className="w-full h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
                        <BookOpen className="w-6 h-6 mb-2" />
                        Explore Universities
                      </Button>
                    </Link>
                    <Link href="/book-call">
                      <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                        <Calendar className="w-6 h-6 mb-2" />
                        Book Consultation
                      </Button>
                    </Link>
                    <Link href="/ambassadors">
                      <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                        <Users className="w-6 h-6 mb-2" />
                        Connect with Ambassadors
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{deadline.university}</p>
                            <p className="text-sm text-gray-600">{deadline.program}</p>
                            <p className="text-sm text-gray-500">{deadline.deadline}</p>
                          </div>
                          {deadline.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                      ))}
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
                    <div className="space-y-4">
                      {savedUniversities.map((university, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{university.name}</p>
                            <p className="text-sm text-gray-600">{university.program}</p>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {university.match}% match
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "universities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Universities</h2>
                <Link href="/universities">
                  <Button className="bg-blue-600 hover:bg-blue-700">Explore All Universities</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedUniversities.map((university, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{university.name}</CardTitle>
                      <CardDescription>{university.program}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Match Score</span>
                          <Badge className="bg-blue-100 text-blue-800">{university.match}%</Badge>
                        </div>
                        <Progress value={university.match} className="h-2" />
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <div className="space-y-4">
                {upcomingDeadlines.map((application, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{application.university}</h3>
                          <p className="text-gray-600">{application.program}</p>
                          <p className="text-sm text-gray-500">Deadline: {application.deadline}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={application.status === "completed" ? "default" : "secondary"}
                            className={
                              application.status === "completed" ? "bg-green-600" : "bg-orange-100 text-orange-800"
                            }
                          >
                            {application.status === "completed" ? "Submitted" : "In Progress"}
                          </Badge>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              {application.status === "completed" ? "View Application" : "Continue"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ambassadors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Student Ambassadors</h2>
                <Link href="/ambassadors">
                  <Button className="bg-blue-600 hover:bg-blue-700">View All Ambassadors</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Sarah Ahmed", university: "LUMS", program: "Computer Science", rating: 4.9 },
                  { name: "Ali Hassan", university: "IBA Karachi", program: "Business", rating: 4.8 },
                  { name: "Fatima Khan", university: "NUST", program: "Engineering", rating: 4.9 },
                ].map((ambassador, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{ambassador.name}</CardTitle>
                      <CardDescription>
                        {ambassador.university} - {ambassador.program}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{ambassador.rating}</span>
                        </div>
                        <Button variant="outline" className="w-full">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profile</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to get better university recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Profile Completion</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Basic Information
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Academic Records
                      </div>
                      <div className="flex items-center text-orange-600">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Extracurricular Activities
                      </div>
                      <div className="flex items-center text-gray-400">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Personal Statement
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Complete Profile</Button>
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
