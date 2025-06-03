"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  AlertTriangle,
} from "lucide-react"

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Universities", value: "156", change: "+3", icon: BookOpen, color: "text-blue-600" },
    { title: "Applications", value: "1,234", change: "+18%", icon: Calendar, color: "text-purple-600" },
    { title: "Ambassadors", value: "89", change: "+5", icon: UserCheck, color: "text-orange-600" },
  ]

  const recentUsers = [
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", status: "Pending", joinDate: "2024-01-14" },
    { id: 3, name: "Hassan Sheikh", email: "hassan@example.com", status: "Active", joinDate: "2024-01-13" },
    { id: 4, name: "Ayesha Malik", email: "ayesha@example.com", status: "Inactive", joinDate: "2024-01-12" },
  ]

  const universities = [
    { id: 1, name: "LUMS", location: "Lahore", programs: 25, students: 450, status: "Active" },
    { id: 2, name: "IBA Karachi", location: "Karachi", programs: 18, students: 320, status: "Active" },
    { id: 3, name: "NUST", location: "Islamabad", programs: 35, students: 680, status: "Active" },
    { id: 4, name: "FAST", location: "Multiple", programs: 22, students: 290, status: "Pending" },
  ]

  const ambassadors = [
    { id: 1, name: "Sarah Ahmed", university: "LUMS", program: "CS", rating: 4.9, students: 25, status: "Active" },
    { id: 2, name: "Ali Hassan", university: "IBA", program: "MBA", rating: 4.8, students: 18, status: "Active" },
    {
      id: 3,
      name: "Zara Khan",
      university: "NUST",
      program: "Engineering",
      rating: 4.7,
      students: 32,
      status: "Pending",
    },
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
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Admin Panel
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-blue-600">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="ambassadors">Ambassadors</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage registered users and their accounts</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "default"
                              : user.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            user.status === "Active"
                              ? "bg-blue-600"
                              : user.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {user.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Universities Tab */}
          <TabsContent value="universities">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>University Management</CardTitle>
                    <CardDescription>Manage university listings and information</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add University
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {universities.map((university) => (
                    <div key={university.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{university.name}</p>
                          <p className="text-sm text-gray-600">{university.location}</p>
                          <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                            <span>{university.programs} Programs</span>
                            <span>{university.students} Students</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={university.status === "Active" ? "default" : "secondary"}
                          className={university.status === "Active" ? "bg-blue-600" : "bg-yellow-100 text-yellow-800"}
                        >
                          {university.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ambassadors Tab */}
          <TabsContent value="ambassadors">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ambassador Management</CardTitle>
                    <CardDescription>Manage student ambassadors and their profiles</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ambassador
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ambassadors.map((ambassador) => (
                    <div key={ambassador.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{ambassador.name}</p>
                          <p className="text-sm text-gray-600">
                            {ambassador.university} - {ambassador.program}
                          </p>
                          <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                            <span>⭐ {ambassador.rating}</span>
                            <span>{ambassador.students} Students Helped</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={ambassador.status === "Active" ? "default" : "secondary"}
                          className={ambassador.status === "Active" ? "bg-blue-600" : "bg-yellow-100 text-yellow-800"}
                        >
                          {ambassador.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Monitor and manage student applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-600">Pending Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
                      <p className="text-sm text-gray-600">Awaiting review</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-600">Approved Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600 mb-2">892</div>
                      <p className="text-sm text-gray-600">Successfully processed</p>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-600">Rejected Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600 mb-2">95</div>
                      <p className="text-sm text-gray-600">Require attention</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold text-blue-600">+234 users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-semibold">+189 users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-semibold text-blue-600">+23.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm">5 pending ambassador applications</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm">2 universities need verification</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Database backup scheduled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
