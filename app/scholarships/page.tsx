"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Search,
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Award,
  Clock,
  Star,
  TrendingUp,
  X,
  SlidersHorizontal,
  Send,
  Eye,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { getScholarships, applyForScholarship, type Scholarship } from "@/lib/data"
import { toast } from "sonner"
import { Logo } from "@/components/Logo"

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  // Load scholarships on component mount
  useEffect(() => {
    loadScholarships()
  }, [])

  const loadScholarships = async () => {
    try {
      setLoading(true)
      const data = await getScholarships()
      setScholarships(data)
    } catch (error) {
      toast.error("Failed to load scholarships")
    } finally {
      setLoading(false)
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineStatus = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline)
    if (days < 0) return { status: "expired", color: "text-red-600", bg: "bg-red-100" }
    if (days <= 7) return { status: "urgent", color: "text-red-600", bg: "bg-red-100" }
    if (days <= 30) return { status: "soon", color: "text-orange-600", bg: "bg-orange-100" }
    return { status: "open", color: "text-green-600", bg: "bg-green-100" }
  }

  const openDetailsDialog = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setShowDetailsDialog(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scholarships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarships</h1>
          <p className="text-gray-600">
            Find and apply for scholarships that match your academic goals and qualifications.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-semibold text-primary">$2.5M+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-semibold text-primary">150+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recipients</p>
                  <p className="text-2xl font-semibold text-primary">500+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-semibold text-primary">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Scholarships */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">All Scholarships</h3>
          <div className="space-y-4">
            {scholarships.map((scholarship) => {
              const deadlineStatus = getDeadlineStatus(scholarship.deadline)
              const daysLeft = getDaysUntilDeadline(scholarship.deadline)

              return (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className={`${deadlineStatus.bg} ${deadlineStatus.color}`}>
                                {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                              </Badge>
                              <Badge
                                variant={scholarship.status === "Open" ? "default" : "secondary"}
                                className={scholarship.status === "Open" ? "bg-primary" : ""}
                              >
                                {scholarship.status}
                              </Badge>
                            </div>
                            <h3
                              className="font-semibold text-lg text-gray-900 hover:text-primary cursor-pointer"
                              onClick={() => openDetailsDialog(scholarship)}
                            >
                              {scholarship.title}
                            </h3>
                            <p className="text-primary font-medium">{scholarship.provider}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium ml-1 text-primary">{scholarship.amount}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium ml-1">{scholarship.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Level:</span>
                            <span className="font-medium ml-1">{scholarship.level}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-primary mr-1" />
                            <span className="text-primary font-medium">{scholarship.deadline}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">Fields:</p>
                          <div className="flex flex-wrap gap-1">
                            {scholarship.fields.map((field, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xs text-gray-500">
                            {scholarship.applicants} applicants • {scholarship.awards} awards
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDetailsDialog(scholarship)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary-dark"
                              onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                            >
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedScholarship?.title}</DialogTitle>
            <DialogDescription>{selectedScholarship?.provider}</DialogDescription>
          </DialogHeader>
          {selectedScholarship && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Overview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-primary">{selectedScholarship.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedScholarship.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{selectedScholarship.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium text-primary">{selectedScholarship.deadline}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Application Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applicants:</span>
                      <span className="font-medium">{selectedScholarship.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Awards:</span>
                      <span className="font-medium">{selectedScholarship.awards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-primary">
                        {Math.round(
                          (Number.parseInt(selectedScholarship.awards) /
                            Number.parseInt(selectedScholarship.applicants.replace(/[^\d]/g, ""))) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-3">Description</h4>
                <p className="text-gray-600">{selectedScholarship.description}</p>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-semibold mb-3">Eligibility Criteria</h4>
                <p className="text-gray-600">{selectedScholarship.eligibility}</p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold mb-3">Required Documents</h4>
                <ul className="space-y-2">
                  {selectedScholarship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fields */}
              <div>
                <h4 className="font-semibold mb-3">Eligible Fields</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedScholarship.fields.map((field, index) => (
                    <Badge key={index} variant="outline">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  className="bg-primary hover:bg-primary-dark"
                  onClick={() => window.open(selectedScholarship.applicationUrl, '_blank')}
                >
                  Visit Website
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
