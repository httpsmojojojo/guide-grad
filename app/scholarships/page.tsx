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
  Heart,
  Share2,
  CheckCircle,
  Eye,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { getScholarships, applyForScholarship, saveScholarship, unsaveScholarship, type Scholarship } from "@/lib/data"
import { toast } from "sonner"

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [savedScholarships, setSavedScholarships] = useState<Set<string>>(new Set())
  const [appliedScholarships, setAppliedScholarships] = useState<Set<string>>(new Set())
  const [applicationDeadlineAlerts, setApplicationDeadlineAlerts] = useState<Set<string>>(new Set())

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    level: "all",
    field: "all",
    provider: "all",
    status: "all",
    amountRange: [0, 2000000], // PKR range
    deadlineFilter: "all",
    eligibility: "all",
  })

  const [sortBy, setSortBy] = useState("deadline")

  // Application form state
  const [applicationData, setApplicationData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      cnic: "",
      dateOfBirth: "",
      address: "",
    },
    academicInfo: {
      currentEducation: "",
      institution: "",
      gpa: "",
      graduationYear: "",
      fieldOfStudy: "",
    },
    financialInfo: {
      familyIncome: "",
      hasOtherScholarships: false,
      otherScholarshipsDetails: "",
    },
    documents: {
      transcripts: false,
      incomeProof: false,
      cnicCopy: false,
      recommendationLetters: false,
      personalStatement: false,
    },
    essay: {
      whyDeserving: "",
      careerGoals: "",
      contribution: "",
    },
    agreeToTerms: false,
  })

  // Load scholarships on component mount
  useEffect(() => {
    loadScholarships()
    loadSavedScholarships()
    loadApplicationStatus()
    loadDeadlineAlerts()
  }, [])

  // Apply filters whenever filters or scholarships change
  useEffect(() => {
    applyFilters()
  }, [filters, scholarships, sortBy])

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

  const loadSavedScholarships = () => {
    const saved = localStorage.getItem("savedScholarships")
    if (saved) {
      setSavedScholarships(new Set(JSON.parse(saved)))
    }
  }

  const loadApplicationStatus = () => {
    const applied = localStorage.getItem("appliedScholarships")
    if (applied) {
      setAppliedScholarships(new Set(JSON.parse(applied)))
    }
  }

  const loadDeadlineAlerts = () => {
    const alerts = localStorage.getItem("scholarshipDeadlineAlerts")
    if (alerts) {
      setApplicationDeadlineAlerts(new Set(JSON.parse(alerts)))
    }
  }

  const applyFilters = () => {
    let filtered = [...scholarships]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (sch) =>
          sch.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          sch.provider.toLowerCase().includes(filters.search.toLowerCase()) ||
          sch.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          sch.fields.some((field) => field.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((sch) => sch.type.toLowerCase().includes(filters.type.toLowerCase()))
    }

    // Level filter
    if (filters.level !== "all") {
      filtered = filtered.filter((sch) => sch.level.toLowerCase().includes(filters.level.toLowerCase()))
    }

    // Field filter
    if (filters.field !== "all") {
      filtered = filtered.filter((sch) =>
        sch.fields.some((field) => field.toLowerCase().includes(filters.field.toLowerCase())),
      )
    }

    // Provider filter
    if (filters.provider !== "all") {
      filtered = filtered.filter((sch) => sch.provider.toLowerCase().includes(filters.provider.toLowerCase()))
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((sch) => sch.status.toLowerCase() === filters.status.toLowerCase())
    }

    // Amount range filter
    filtered = filtered.filter((sch) => {
      const amount = parseScholarshipAmount(sch.amount)
      return amount >= filters.amountRange[0] && amount <= filters.amountRange[1]
    })

    // Deadline filter
    if (filters.deadlineFilter !== "all") {
      const now = new Date()
      filtered = filtered.filter((sch) => {
        const deadline = new Date(sch.deadline)
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        switch (filters.deadlineFilter) {
          case "week":
            return daysUntilDeadline <= 7 && daysUntilDeadline > 0
          case "month":
            return daysUntilDeadline <= 30 && daysUntilDeadline > 0
          case "quarter":
            return daysUntilDeadline <= 90 && daysUntilDeadline > 0
          default:
            return true
        }
      })
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "amount":
          return parseScholarshipAmount(b.amount) - parseScholarshipAmount(a.amount)
        case "provider":
          return a.provider.localeCompare(b.provider)
        case "popularity":
          return (
            Number.parseInt(b.applicants.replace(/[^\d]/g, "")) - Number.parseInt(a.applicants.replace(/[^\d]/g, ""))
          )
        case "deadline":
        default:
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      }
    })

    setFilteredScholarships(filtered)
  }

  const parseScholarshipAmount = (amount: string): number => {
    // Extract numeric value from amount string
    const numericValue = amount.match(/[\d,]+/)
    if (!numericValue) return 0
    return Number.parseInt(numericValue[0].replace(/,/g, ""))
  }

  const handleSaveScholarship = async (scholarshipId: string) => {
    try {
      const newSaved = new Set(savedScholarships)

      if (savedScholarships.has(scholarshipId)) {
        newSaved.delete(scholarshipId)
        await unsaveScholarship("current-user", scholarshipId)
        toast.success("Scholarship removed from saved list")
      } else {
        newSaved.add(scholarshipId)
        await saveScholarship("current-user", scholarshipId)
        toast.success("Scholarship saved to your list")
      }

      setSavedScholarships(newSaved)
      localStorage.setItem("savedScholarships", JSON.stringify([...newSaved]))
    } catch (error) {
      toast.error("Failed to update saved scholarships")
    }
  }

  const handleShare = async (scholarship: Scholarship) => {
    const shareData = {
      title: scholarship.title,
      text: `Check out this scholarship: ${scholarship.title} by ${scholarship.provider}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleSetDeadlineAlert = (scholarshipId: string) => {
    const newAlerts = new Set(applicationDeadlineAlerts)

    if (applicationDeadlineAlerts.has(scholarshipId)) {
      newAlerts.delete(scholarshipId)
      toast.success("Deadline alert removed")
    } else {
      newAlerts.add(scholarshipId)
      toast.success("Deadline alert set! You'll be notified 7 days before the deadline.")
    }

    setApplicationDeadlineAlerts(newAlerts)
    localStorage.setItem("scholarshipDeadlineAlerts", JSON.stringify([...newAlerts]))
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedScholarship) return

    try {
      // Validate required fields
      if (!applicationData.personalInfo.fullName || !applicationData.personalInfo.email) {
        toast.error("Please fill in all required personal information")
        return
      }

      if (!applicationData.agreeToTerms) {
        toast.error("Please agree to the terms and conditions")
        return
      }

      await applyForScholarship(selectedScholarship.id, applicationData)

      const newApplied = new Set(appliedScholarships)
      newApplied.add(selectedScholarship.id)
      setAppliedScholarships(newApplied)
      localStorage.setItem("appliedScholarships", JSON.stringify([...newApplied]))

      toast.success(`Application submitted for ${selectedScholarship.title}! You'll receive a confirmation email.`)
      setShowApplicationDialog(false)
      setSelectedScholarship(null)
      resetApplicationForm()
    } catch (error) {
      toast.error("Failed to submit application")
    }
  }

  const resetApplicationForm = () => {
    setApplicationData({
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        cnic: "",
        dateOfBirth: "",
        address: "",
      },
      academicInfo: {
        currentEducation: "",
        institution: "",
        gpa: "",
        graduationYear: "",
        fieldOfStudy: "",
      },
      financialInfo: {
        familyIncome: "",
        hasOtherScholarships: false,
        otherScholarshipsDetails: "",
      },
      documents: {
        transcripts: false,
        incomeProof: false,
        cnicCopy: false,
        recommendationLetters: false,
        personalStatement: false,
      },
      essay: {
        whyDeserving: "",
        careerGoals: "",
        contribution: "",
      },
      agreeToTerms: false,
    })
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      level: "all",
      field: "all",
      provider: "all",
      status: "all",
      amountRange: [0, 2000000],
      deadlineFilter: "all",
      eligibility: "all",
    })
    setSortBy("deadline")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.type !== "all") count++
    if (filters.level !== "all") count++
    if (filters.field !== "all") count++
    if (filters.provider !== "all") count++
    if (filters.status !== "all") count++
    if (filters.amountRange[0] > 0 || filters.amountRange[1] < 2000000) count++
    if (filters.deadlineFilter !== "all") count++
    if (filters.eligibility !== "all") count++
    return count
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

  const openApplicationDialog = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setShowApplicationDialog(true)
  }

  const openDetailsDialog = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setShowDetailsDialog(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scholarships...</p>
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
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">Guide Grad</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Scholarship Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover funding opportunities to make your education dreams affordable. Find scholarships that match your
            profile and goals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{scholarships.length}+</div>
              <div className="text-sm text-gray-600">Total Scholarships</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">PKR 2B+</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15,000+</div>
              <div className="text-sm text-gray-600">Students Awarded</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">78%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Application Status */}
        {appliedScholarships.size > 0 && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">
                    You have applied to {appliedScholarships.size} scholarship{appliedScholarships.size > 1 ? "s" : ""}
                  </span>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    View Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Quick Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search scholarships, providers, or fields..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="merit">Merit-Based</SelectItem>
                    <SelectItem value="need">Need-Based</SelectItem>
                    <SelectItem value="field">Field-Specific</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closing-soon">Closing Soon</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="relative">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  More Filters
                  {getActiveFiltersCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-blue-600">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Field Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Field of Study</label>
                    <Select value={filters.field} onValueChange={(value) => setFilters({ ...filters, field: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="social">Social Sciences</SelectItem>
                        <SelectItem value="arts">Arts & Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Provider Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Provider</label>
                    <Select
                      value={filters.provider}
                      onValueChange={(value) => setFilters({ ...filters, provider: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Providers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Providers</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="hec">HEC</SelectItem>
                        <SelectItem value="university">Universities</SelectItem>
                        <SelectItem value="private">Private Organizations</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Deadline Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <Select
                      value={filters.deadlineFilter}
                      onValueChange={(value) => setFilters({ ...filters, deadlineFilter: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Deadlines" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Deadlines</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">Next 3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Amount Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Scholarship Amount Range: PKR {filters.amountRange[0].toLocaleString()} - PKR{" "}
                    {filters.amountRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={filters.amountRange}
                    onValueChange={(value) => setFilters({ ...filters, amountRange: value })}
                    max={2000000}
                    min={0}
                    step={50000}
                    className="w-full"
                  />
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Scholarships ({filteredScholarships.length})</h2>
            <p className="text-gray-600">
              {getActiveFiltersCount() > 0
                ? `Filtered results (${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? "s" : ""} applied)`
                : "Find the perfect funding opportunity for your education"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="amount">Amount (High to Low)</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more opportunities.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Featured Scholarships */}
        {filteredScholarships.some((s) => s.featured) && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Featured Scholarships
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredScholarships
                .filter((s) => s.featured)
                .map((scholarship) => {
                  const deadlineStatus = getDeadlineStatus(scholarship.deadline)
                  const daysLeft = getDaysUntilDeadline(scholarship.deadline)
                  const isApplied = appliedScholarships.has(scholarship.id)
                  const isSaved = savedScholarships.has(scholarship.id)
                  const hasAlert = applicationDeadlineAlerts.has(scholarship.id)

                  return (
                    <Card
                      key={scholarship.id}
                      className="border-yellow-200 bg-yellow-50 hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-yellow-500 text-white">Featured</Badge>
                              <Badge variant="secondary" className={`${deadlineStatus.bg} ${deadlineStatus.color}`}>
                                {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                              </Badge>
                              {isApplied && <Badge className="bg-green-600">Applied</Badge>}
                            </div>
                            <CardTitle
                              className="text-lg hover:text-blue-600 cursor-pointer"
                              onClick={() => openDetailsDialog(scholarship)}
                            >
                              {scholarship.title}
                            </CardTitle>
                            <CardDescription className="text-blue-600 font-medium">
                              {scholarship.provider}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSaveScholarship(scholarship.id)}
                              className="h-8 w-8"
                            >
                              <Heart className={`w-4 h-4 ${isSaved ? "fill-current text-red-500" : "text-gray-400"}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleShare(scholarship)}
                              className="h-8 w-8"
                            >
                              <Share2 className="w-4 h-4 text-gray-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSetDeadlineAlert(scholarship.id)}
                              className="h-8 w-8"
                            >
                              <Bell className={`w-4 h-4 ${hasAlert ? "text-blue-600" : "text-gray-400"}`} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{scholarship.description}</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium ml-1 text-blue-600">{scholarship.amount}</span>
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
                              <Clock className="w-4 h-4 text-red-500 mr-1" />
                              <span className="text-red-600 font-medium">{scholarship.deadline}</span>
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
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={isApplied || daysLeft <= 0}
                                onClick={() => openApplicationDialog(scholarship)}
                              >
                                {isApplied ? "Applied" : daysLeft <= 0 ? "Expired" : "Apply Now"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        )}

        {/* All Scholarships */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">All Scholarships</h3>
          <div className="space-y-4">
            {filteredScholarships
              .filter((s) => !s.featured)
              .map((scholarship) => {
                const deadlineStatus = getDeadlineStatus(scholarship.deadline)
                const daysLeft = getDaysUntilDeadline(scholarship.deadline)
                const isApplied = appliedScholarships.has(scholarship.id)
                const isSaved = savedScholarships.has(scholarship.id)
                const hasAlert = applicationDeadlineAlerts.has(scholarship.id)

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
                                  className={scholarship.status === "Open" ? "bg-blue-600" : ""}
                                >
                                  {scholarship.status}
                                </Badge>
                                {isApplied && <Badge className="bg-green-600">Applied</Badge>}
                              </div>
                              <h3
                                className="font-semibold text-lg text-gray-900 hover:text-blue-600 cursor-pointer"
                                onClick={() => openDetailsDialog(scholarship)}
                              >
                                {scholarship.title}
                              </h3>
                              <p className="text-blue-600 font-medium">{scholarship.provider}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSaveScholarship(scholarship.id)}
                                className="h-8 w-8"
                              >
                                <Heart
                                  className={`w-4 h-4 ${isSaved ? "fill-current text-red-500" : "text-gray-400"}`}
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleShare(scholarship)}
                                className="h-8 w-8"
                              >
                                <Share2 className="w-4 h-4 text-gray-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSetDeadlineAlert(scholarship.id)}
                                className="h-8 w-8"
                              >
                                <Bell className={`w-4 h-4 ${hasAlert ? "text-blue-600" : "text-gray-400"}`} />
                              </Button>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>

                          <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <div className="font-medium text-blue-600">{scholarship.amount}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Type:</span>
                              <div className="font-medium">{scholarship.type}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Level:</span>
                              <div className="font-medium">{scholarship.level}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Deadline:</span>
                              <div className="font-medium text-red-600 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {scholarship.deadline}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{scholarship.applicants} applicants</span>
                              <span>{scholarship.awards} awards available</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openDetailsDialog(scholarship)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={isApplied || daysLeft <= 0}
                                onClick={() => openApplicationDialog(scholarship)}
                              >
                                {isApplied ? "Applied" : daysLeft <= 0 ? "Expired" : "Apply Now"}
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

        {/* Load More */}
        {filteredScholarships.length > 0 && filteredScholarships.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => toast.info("Loading more scholarships...")}>
              Load More Scholarships
            </Button>
          </div>
        )}

        {/* Application Tips */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Scholarship Application Tips</CardTitle>
            <CardDescription className="text-blue-700">
              Increase your chances of success with these expert tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Before You Apply</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Read all requirements carefully and ensure you meet the criteria
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Gather all required documents well before the deadline
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Research the scholarship provider and their values
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Application Best Practices</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Write compelling essays that showcase your unique story
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Get strong recommendation letters from relevant mentors
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Submit your application well before the deadline
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/book-call">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Get Scholarship Guidance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scholarship Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedScholarship?.title}</DialogTitle>
            <DialogDescription>Complete scholarship information and requirements</DialogDescription>
          </DialogHeader>
          {selectedScholarship && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Scholarship Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium">{selectedScholarship.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-blue-600">{selectedScholarship.amount}</span>
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
                      <span className="font-medium text-red-600">{selectedScholarship.deadline}</span>
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
                      <span className="font-medium text-green-600">
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
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
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
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSaveScholarship(selectedScholarship.id)}
                    className="flex items-center"
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        savedScholarships.has(selectedScholarship.id) ? "fill-current text-red-500" : ""
                      }`}
                    />
                    {savedScholarships.has(selectedScholarship.id) ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => handleShare(selectedScholarship)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={
                    appliedScholarships.has(selectedScholarship.id) ||
                    getDaysUntilDeadline(selectedScholarship.deadline) <= 0
                  }
                  onClick={() => {
                    setShowDetailsDialog(false)
                    openApplicationDialog(selectedScholarship)
                  }}
                >
                  {appliedScholarships.has(selectedScholarship.id)
                    ? "Applied"
                    : getDaysUntilDeadline(selectedScholarship.deadline) <= 0
                      ? "Expired"
                      : "Apply Now"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedScholarship?.title}</DialogTitle>
            <DialogDescription>
              Complete the application form below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplicationSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="font-semibold mb-4">Personal Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={applicationData.personalInfo.fullName}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        personalInfo: { ...applicationData.personalInfo, fullName: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.personalInfo.email}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        personalInfo: { ...applicationData.personalInfo, email: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={applicationData.personalInfo.phone}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        personalInfo: { ...applicationData.personalInfo, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cnic">CNIC</Label>
                  <Input
                    id="cnic"
                    value={applicationData.personalInfo.cnic}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        personalInfo: { ...applicationData.personalInfo, cnic: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h4 className="font-semibold mb-4">Academic Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentEducation">Current Education Level</Label>
                  <Select
                    value={applicationData.academicInfo.currentEducation}
                    onValueChange={(value) =>
                      setApplicationData({
                        ...applicationData,
                        academicInfo: { ...applicationData.academicInfo, currentEducation: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matric">Matric</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="bachelor">Bachelor's</SelectItem>
                      <SelectItem value="master">Master's</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="institution">Current Institution</Label>
                  <Input
                    id="institution"
                    value={applicationData.academicInfo.institution}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        academicInfo: { ...applicationData.academicInfo, institution: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="gpa">GPA/Percentage</Label>
                  <Input
                    id="gpa"
                    value={applicationData.academicInfo.gpa}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        academicInfo: { ...applicationData.academicInfo, gpa: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    value={applicationData.academicInfo.fieldOfStudy}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        academicInfo: { ...applicationData.academicInfo, fieldOfStudy: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h4 className="font-semibold mb-4">Financial Information</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="familyIncome">Monthly Family Income (PKR)</Label>
                  <Input
                    id="familyIncome"
                    value={applicationData.financialInfo.familyIncome}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        financialInfo: { ...applicationData.financialInfo, familyIncome: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasOtherScholarships"
                    checked={applicationData.financialInfo.hasOtherScholarships}
                    onCheckedChange={(checked) =>
                      setApplicationData({
                        ...applicationData,
                        financialInfo: { ...applicationData.financialInfo, hasOtherScholarships: checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="hasOtherScholarships">I have received other scholarships</Label>
                </div>
                {applicationData.financialInfo.hasOtherScholarships && (
                  <div>
                    <Label htmlFor="otherScholarshipsDetails">Other Scholarships Details</Label>
                    <Textarea
                      id="otherScholarshipsDetails"
                      value={applicationData.financialInfo.otherScholarshipsDetails}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          financialInfo: { ...applicationData.financialInfo, otherScholarshipsDetails: e.target.value },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h4 className="font-semibold mb-4">Required Documents</h4>
              <div className="space-y-3">
                {Object.entries(applicationData.documents).map(([key, checked]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={(isChecked) =>
                        setApplicationData({
                          ...applicationData,
                          documents: { ...applicationData.documents, [key]: isChecked as boolean },
                        })
                      }
                    />
                    <Label htmlFor={key} className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Essays */}
            <div>
              <h4 className="font-semibold mb-4">Essay Questions</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="whyDeserving">Why do you deserve this scholarship? (500 words max)</Label>
                  <Textarea
                    id="whyDeserving"
                    value={applicationData.essay.whyDeserving}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        essay: { ...applicationData.essay, whyDeserving: e.target.value },
                      })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="careerGoals">What are your career goals? (300 words max)</Label>
                  <Textarea
                    id="careerGoals"
                    value={applicationData.essay.careerGoals}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        essay: { ...applicationData.essay, careerGoals: e.target.value },
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="contribution">How will you contribute to society? (300 words max)</Label>
                  <Textarea
                    id="contribution"
                    value={applicationData.essay.contribution}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        essay: { ...applicationData.essay, contribution: e.target.value },
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={applicationData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setApplicationData({ ...applicationData, agreeToTerms: checked as boolean })
                }
              />
              <Label htmlFor="agreeToTerms">
                I agree to the terms and conditions and certify that all information provided is accurate
              </Label>
            </div>

            {/* Application Progress */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Application Completion</span>
                <span className="text-sm text-gray-600">
                  {Math.round(
                    ((applicationData.personalInfo.fullName ? 1 : 0) +
                      (applicationData.personalInfo.email ? 1 : 0) +
                      (applicationData.academicInfo.currentEducation ? 1 : 0) +
                      (applicationData.essay.whyDeserving ? 1 : 0) +
                      (applicationData.agreeToTerms ? 1 : 0)) *
                      20,
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  ((applicationData.personalInfo.fullName ? 1 : 0) +
                    (applicationData.personalInfo.email ? 1 : 0) +
                    (applicationData.academicInfo.currentEducation ? 1 : 0) +
                    (applicationData.essay.whyDeserving ? 1 : 0) +
                    (applicationData.agreeToTerms ? 1 : 0)) *
                  20
                }
                className="h-2"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowApplicationDialog(false)}>
                Save as Draft
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
