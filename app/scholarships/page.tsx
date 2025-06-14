"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DollarSign,
  Users,
  Award,
  Clock,
  TrendingUp,
  Eye,
  Building,
  GraduationCap,
} from "lucide-react"
import { scholarshipsApi, type Scholarship } from "@/lib/api"
import { toast } from "sonner"

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
      const { scholarships: data } = await scholarshipsApi.getScholarships()
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
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Scholarships</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Find and apply for scholarships that match your academic goals and qualifications.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-primary-light rounded-lg">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Value</p>
                  <p className="text-lg sm:text-2xl font-semibold text-primary">$2.5M+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-primary-light rounded-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Available</p>
                  <p className="text-lg sm:text-2xl font-semibold text-primary">150+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-primary-light rounded-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Recipients</p>
                  <p className="text-lg sm:text-2xl font-semibold text-primary">500+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-primary-light rounded-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
                  <p className="text-lg sm:text-2xl font-semibold text-primary">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Scholarships */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">All Scholarships</h3>
          <div className="space-y-3 sm:space-y-4">
            {scholarships.map((scholarship) => {
              const deadlineStatus = getDeadlineStatus(scholarship.deadline)
              const daysLeft = getDaysUntilDeadline(scholarship.deadline)

              return (
                <Card key={scholarship.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  {/* Info Section */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-center gap-2 mb-1 min-w-0">
                        <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight flex-1 break-words min-w-0">{scholarship.title}</h2>
                      </div>
                      <div className="flex items-center gap-2 mb-2 min-w-0">
                        <Building className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 truncate">{scholarship.provider}</span>
                        <Badge variant="secondary" className={`ml-2 px-2 py-0.5 text-xs whitespace-nowrap ${deadlineStatus.bg} ${deadlineStatus.color}`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-gray-700 mb-2 min-w-0">
                        <span className="truncate">Amount: <span className="font-medium text-primary">{scholarship.amount}</span></span>
                        <span className="truncate">Type: <span className="font-medium">{scholarship.type}</span></span>
                        <span className="truncate">Level: <span className="font-medium">{scholarship.level}</span></span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{scholarship.description}</p>
                      <div className="mt-2">
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Fields:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                          {scholarship.fields?.slice(0, 3).map((field, idx) => (
                            <Badge key={idx} variant="secondary" className="px-2 sm:px-3 py-0.5 text-xs font-semibold whitespace-nowrap">{field}</Badge>
                          ))}
                          {scholarship.fields && scholarship.fields.length > 3 && (
                            <Badge variant="secondary" className="px-2 sm:px-3 py-0.5 text-xs font-semibold whitespace-nowrap">+{scholarship.fields.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => openDetailsDialog(scholarship)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark"
                        onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                      >
                        Website
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">{selectedScholarship?.title}</DialogTitle>
            <DialogDescription className="text-base sm:text-lg">{selectedScholarship?.provider}</DialogDescription>
          </DialogHeader>
          {selectedScholarship && (
            <div className="space-y-4 sm:space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{selectedScholarship.amount}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Scholarship Amount</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{selectedScholarship.deadline}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Application Deadline</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{selectedScholarship.level}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Education Level</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{selectedScholarship.type}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Scholarship Type</div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">About this Scholarship</h3>
                      <p className="text-gray-600 mb-6">{selectedScholarship.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Eligibility</h4>
                          <p className="text-gray-600">{selectedScholarship.eligibility}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>
                          <ul className="list-disc list-inside text-gray-600">
                            {selectedScholarship.requirements?.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Selection Criteria</h4>
                          <ul className="list-disc list-inside text-gray-600">
                            {selectedScholarship.selectionCriteria?.map((criteria, index) => (
                              <li key={index}>{criteria}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Fields of Study</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedScholarship.fields?.map((field, index) => (
                              <Badge key={index} variant="secondary">{field}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Disbursement Schedule</h4>
                        <p className="text-gray-600">{selectedScholarship.disbursementSchedule}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Renewal Terms</h4>
                        <p className="text-gray-600">{selectedScholarship.renewalTerms}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <p className="text-gray-600">{selectedScholarship.contactEmail}</p>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => window.open(selectedScholarship.applicationUrl, '_blank')}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
