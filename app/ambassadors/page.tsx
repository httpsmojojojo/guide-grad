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
import { Calendar } from "@/components/ui/calendar"
import {
  Users,
  Star,
  MapPin,
  BookOpen,
  MessageCircle,
  Search,
  ArrowLeft,
  CalendarIcon,
  Award,
  X,
  SlidersHorizontal,
  Send,
  Phone,
  Video,
  Clock,
  Heart,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAmbassadors, connectWithAmbassador, bookAmbassadorCall, type Ambassador } from "@/lib/data"
import { toast } from "sonner"

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [filteredAmbassadors, setFilteredAmbassadors] = useState<Ambassador[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [favoriteAmbassadors, setFavoriteAmbassadors] = useState<Set<string>>(new Set())

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    university: "all",
    program: "all",
    location: "all",
    availability: "all",
    ratingMin: 0,
    experienceMin: 0,
    specialties: "all",
  })

  const [sortBy, setSortBy] = useState("rating")

  // Message form state
  const [messageData, setMessageData] = useState({
    subject: "",
    message: "",
    contactMethod: "message",
  })

  // Booking form state
  const [bookingData, setBookingData] = useState({
    date: undefined as Date | undefined,
    time: "",
    duration: "30",
    topic: "",
    message: "",
    method: "video",
  })

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ]

  // Load ambassadors on component mount
  useEffect(() => {
    loadAmbassadors()
    loadFavoriteAmbassadors()
  }, [])

  // Apply filters whenever filters or ambassadors change
  useEffect(() => {
    applyFilters()
  }, [filters, ambassadors, sortBy])

  const loadAmbassadors = async () => {
    try {
      setLoading(true)
      const data = await getAmbassadors()
      setAmbassadors(data)
    } catch (error) {
      toast.error("Failed to load ambassadors")
    } finally {
      setLoading(false)
    }
  }

  const loadFavoriteAmbassadors = () => {
    const saved = localStorage.getItem("favoriteAmbassadors")
    if (saved) {
      setFavoriteAmbassadors(new Set(JSON.parse(saved)))
    }
  }

  const applyFilters = () => {
    let filtered = [...ambassadors]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (amb) =>
          amb.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          amb.university.toLowerCase().includes(filters.search.toLowerCase()) ||
          amb.program.toLowerCase().includes(filters.search.toLowerCase()) ||
          amb.specialties.some((specialty) => specialty.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    // University filter
    if (filters.university !== "all") {
      filtered = filtered.filter((amb) => amb.university.toLowerCase().includes(filters.university.toLowerCase()))
    }

    // Program filter
    if (filters.program !== "all") {
      filtered = filtered.filter((amb) => amb.program.toLowerCase().includes(filters.program.toLowerCase()))
    }

    // Location filter
    if (filters.location !== "all") {
      filtered = filtered.filter((amb) => amb.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Availability filter
    if (filters.availability !== "all") {
      const isAvailable = filters.availability === "available"
      filtered = filtered.filter((amb) => amb.available === isAvailable)
    }

    // Rating filter
    if (filters.ratingMin > 0) {
      filtered = filtered.filter((amb) => amb.rating >= filters.ratingMin)
    }

    // Experience filter (students helped)
    if (filters.experienceMin > 0) {
      filtered = filtered.filter((amb) => amb.studentsHelped >= filters.experienceMin)
    }

    // Specialties filter
    if (filters.specialties !== "all") {
      filtered = filtered.filter((amb) =>
        amb.specialties.some((specialty) => specialty.toLowerCase().includes(filters.specialties.toLowerCase())),
      )
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "university":
          return a.university.localeCompare(b.university)
        case "experience":
          return b.studentsHelped - a.studentsHelped
        case "reviews":
          return b.reviews - a.reviews
        case "rating":
        default:
          return b.rating - a.rating
      }
    })

    setFilteredAmbassadors(filtered)
  }

  const handleFavoriteToggle = (ambassadorId: string) => {
    const newFavorites = new Set(favoriteAmbassadors)

    if (favoriteAmbassadors.has(ambassadorId)) {
      newFavorites.delete(ambassadorId)
      toast.success("Ambassador removed from favorites")
    } else {
      newFavorites.add(ambassadorId)
      toast.success("Ambassador added to favorites")
    }

    setFavoriteAmbassadors(newFavorites)
    localStorage.setItem("favoriteAmbassadors", JSON.stringify([...newFavorites]))
  }

  const handleShare = async (ambassador: Ambassador) => {
    const shareData = {
      title: `Connect with ${ambassador.name}`,
      text: `${ambassador.name} - ${ambassador.program} student at ${ambassador.university}`,
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAmbassador) return

    try {
      await connectWithAmbassador(selectedAmbassador.id, {
        type: "message",
        subject: messageData.subject,
        message: messageData.message,
        contactMethod: messageData.contactMethod,
      })

      toast.success(`Message sent to ${selectedAmbassador.name}! They'll respond within 24 hours.`)
      setShowMessageDialog(false)
      setMessageData({ subject: "", message: "", contactMethod: "message" })
      setSelectedAmbassador(null)
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  const handleBookCall = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAmbassador || !bookingData.date || !bookingData.time) return

    try {
      await bookAmbassadorCall(selectedAmbassador.id, {
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        topic: bookingData.topic,
        message: bookingData.message,
        method: bookingData.method,
      })

      toast.success(`Call booked with ${selectedAmbassador.name}! You'll receive a confirmation email.`)
      setShowBookingDialog(false)
      setBookingData({
        date: undefined,
        time: "",
        duration: "30",
        topic: "",
        message: "",
        method: "video",
      })
      setSelectedAmbassador(null)
    } catch (error) {
      toast.error("Failed to book call")
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      university: "all",
      program: "all",
      location: "all",
      availability: "all",
      ratingMin: 0,
      experienceMin: 0,
      specialties: "all",
    })
    setSortBy("rating")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.university !== "all") count++
    if (filters.program !== "all") count++
    if (filters.location !== "all") count++
    if (filters.availability !== "all") count++
    if (filters.ratingMin > 0) count++
    if (filters.experienceMin > 0) count++
    if (filters.specialties !== "all") count++
    return count
  }

  const openMessageDialog = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador)
    setMessageData({
      subject: `Inquiry about ${ambassador.university} - ${ambassador.program}`,
      message: "",
      contactMethod: "message",
    })
    setShowMessageDialog(true)
  }

  const openBookingDialog = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador)
    setBookingData({
      date: undefined,
      time: "",
      duration: "30",
      topic: "",
      message: "",
      method: "video",
    })
    setShowBookingDialog(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ambassadors...</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Ambassadors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with current students and alumni who can guide you through your university journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{ambassadors.length}+</div>
              <div className="text-sm text-gray-600">Active Ambassadors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Universities Covered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5,000+</div>
              <div className="text-sm text-gray-600">Students Helped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Quick Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search ambassadors, universities, or programs..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Select
                  value={filters.university}
                  onValueChange={(value) => setFilters({ ...filters, university: value })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="University" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    <SelectItem value="lums">LUMS</SelectItem>
                    <SelectItem value="iba">IBA Karachi</SelectItem>
                    <SelectItem value="nust">NUST</SelectItem>
                    <SelectItem value="fast">FAST</SelectItem>
                    <SelectItem value="uet">UET</SelectItem>
                    <SelectItem value="aku">AKU</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.availability}
                  onValueChange={(value) => setFilters({ ...filters, availability: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
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
                  {/* Program Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Program</label>
                    <Select
                      value={filters.program}
                      onValueChange={(value) => setFilters({ ...filters, program: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Programs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Select
                      value={filters.location}
                      onValueChange={(value) => setFilters({ ...filters, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="lahore">Lahore</SelectItem>
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="islamabad">Islamabad</SelectItem>
                        <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Specialties Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialties</label>
                    <Select
                      value={filters.specialties}
                      onValueChange={(value) => setFilters({ ...filters, specialties: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="scholarships">Scholarships</SelectItem>
                        <SelectItem value="campus">Campus Life</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rating and Experience Sliders */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum Rating: {filters.ratingMin > 0 ? `${filters.ratingMin}+` : "Any"}
                    </label>
                    <Slider
                      value={[filters.ratingMin]}
                      onValueChange={(value) => setFilters({ ...filters, ratingMin: value[0] })}
                      max={5}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum Experience: {filters.experienceMin > 0 ? `${filters.experienceMin}+ students` : "Any"}
                    </label>
                    <Slider
                      value={[filters.experienceMin]}
                      onValueChange={(value) => setFilters({ ...filters, experienceMin: value[0] })}
                      max={200}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
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
            <h2 className="text-2xl font-bold text-gray-900">Ambassadors ({filteredAmbassadors.length})</h2>
            <p className="text-gray-600">
              {getActiveFiltersCount() > 0
                ? `Filtered results (${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? "s" : ""} applied)`
                : "Connect with experienced students"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="university">University</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* No Results */}
        {filteredAmbassadors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No ambassadors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more ambassadors.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Ambassador Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmbassadors.map((ambassador) => (
            <Card key={ambassador.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={ambassador.image || "/placeholder.svg"}
                        alt={ambassador.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          ambassador.available ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {ambassador.name}
                      </CardTitle>
                      <CardDescription>
                        {ambassador.university} • {ambassador.program}
                      </CardDescription>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{ambassador.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFavoriteToggle(ambassador.id)}
                      className="h-8 w-8"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favoriteAmbassadors.has(ambassador.id) ? "fill-current text-red-500" : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleShare(ambassador)} className="h-8 w-8">
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{ambassador.bio}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{ambassador.rating}</span>
                      <span className="text-gray-500 ml-1">({ambassador.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{ambassador.studentsHelped} helped</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {ambassador.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {ambassador.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{ambassador.specialties.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      disabled={!ambassador.available}
                      onClick={() => openMessageDialog(ambassador)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={!ambassador.available}
                      onClick={() => openBookingDialog(ambassador)}
                    >
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Book Call
                    </Button>
                  </div>

                  {!ambassador.available && (
                    <div className="text-center">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        Currently Unavailable
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredAmbassadors.length > 0 && filteredAmbassadors.length >= 9 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => toast.info("Loading more ambassadors...")}>
              Load More Ambassadors
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Become an Ambassador</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Are you a current student or recent graduate? Help other students by sharing your experience and earning
              rewards.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Apply to be an Ambassador</Button>
          </CardContent>
        </Card>
      </div>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message {selectedAmbassador?.name}</DialogTitle>
            <DialogDescription>
              Send a message to connect with this ambassador. They typically respond within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={messageData.subject}
                onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Hi! I'm interested in learning more about your experience at..."
                value={messageData.message}
                onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactMethod">Preferred Contact Method</Label>
              <Select
                value={messageData.contactMethod}
                onValueChange={(value) => setMessageData({ ...messageData, contactMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="message">Platform Message</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book a Call with {selectedAmbassador?.name}</DialogTitle>
            <DialogDescription>
              Schedule a one-on-one conversation to get personalized guidance about your university journey.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookCall} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div>
                <Label className="text-base font-medium">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={bookingData.date}
                  onSelect={(date) => setBookingData({ ...bookingData, date })}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border mt-2"
                />
              </div>

              {/* Time and Details */}
              <div className="space-y-4">
                {bookingData.date && (
                  <div>
                    <Label className="text-base font-medium">Available Time Slots</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={bookingData.time === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBookingData({ ...bookingData, time })}
                          className={bookingData.time === time ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="duration">Call Duration</Label>
                  <Select
                    value={bookingData.duration}
                    onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="method">Call Method</Label>
                  <Select
                    value={bookingData.method}
                    onValueChange={(value) => setBookingData({ ...bookingData, method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call (Zoom/Google Meet)
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Call
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="topic">Main Topic/Question</Label>
              <Input
                id="topic"
                placeholder="What would you like to discuss?"
                value={bookingData.topic}
                onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="bookingMessage">Additional Information</Label>
              <Textarea
                id="bookingMessage"
                placeholder="Any specific questions or topics you'd like to cover during the call..."
                value={bookingData.message}
                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                rows={3}
              />
            </div>

            {/* Booking Summary */}
            {bookingData.date && bookingData.time && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Call Summary</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {bookingData.date.toDateString()} at {bookingData.time}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {bookingData.duration} minutes
                  </div>
                  <div className="flex items-center">
                    {bookingData.method === "video" ? (
                      <Video className="w-4 h-4 mr-2" />
                    ) : (
                      <Phone className="w-4 h-4 mr-2" />
                    )}
                    {bookingData.method === "video" ? "Video Call" : "Phone Call"}
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!bookingData.date || !bookingData.time}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Book Call
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
