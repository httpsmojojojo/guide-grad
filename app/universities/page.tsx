"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BookOpen, MapPin, Star, Search, Heart, ExternalLink, ArrowLeft, X, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getUniversities, saveUniversity, unsaveUniversity, type University } from "@/lib/data"
import { toast } from "sonner"

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [savedUniversities, setSavedUniversities] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    type: "all",
    program: "all",
    tuitionRange: [0, 1500000], // PKR range
    ratingMin: 0,
    acceptanceRate: "all",
  })

  const [sortBy, setSortBy] = useState("ranking")

  // Load universities on component mount
  useEffect(() => {
    loadUniversities()
    loadSavedUniversities()
  }, [])

  // Apply filters whenever filters or universities change
  useEffect(() => {
    applyFilters()
  }, [filters, universities, sortBy])

  const loadUniversities = async () => {
    try {
      setLoading(true)
      const data = await getUniversities()
      setUniversities(data)
    } catch (error) {
      toast.error("Failed to load universities")
    } finally {
      setLoading(false)
    }
  }

  const loadSavedUniversities = () => {
    // Mock loading saved universities from localStorage
    const saved = localStorage.getItem("savedUniversities")
    if (saved) {
      setSavedUniversities(new Set(JSON.parse(saved)))
    }
  }

  const applyFilters = () => {
    let filtered = [...universities]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          uni.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          uni.programs.some((program) => program.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    // Location filter
    if (filters.location !== "all") {
      filtered = filtered.filter((uni) => uni.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((uni) => uni.type.toLowerCase() === filters.type.toLowerCase())
    }

    // Program filter
    if (filters.program !== "all") {
      filtered = filtered.filter((uni) =>
        uni.programs.some((program) => program.toLowerCase().includes(filters.program.toLowerCase())),
      )
    }

    // Tuition range filter
    filtered = filtered.filter((uni) => {
      const tuition = Number.parseInt(uni.tuition.replace(/[^\d]/g, ""))
      return tuition >= filters.tuitionRange[0] && tuition <= filters.tuitionRange[1]
    })

    // Rating filter
    if (filters.ratingMin > 0) {
      filtered = filtered.filter((uni) => uni.rating >= filters.ratingMin)
    }

    // Acceptance rate filter
    if (filters.acceptanceRate !== "all") {
      filtered = filtered.filter((uni) => {
        const rate = Number.parseInt(uni.acceptance.replace("%", ""))
        switch (filters.acceptanceRate) {
          case "low":
            return rate <= 20
          case "medium":
            return rate > 20 && rate <= 50
          case "high":
            return rate > 50
          default:
            return true
        }
      })
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "tuition":
          const tuitionA = Number.parseInt(a.tuition.replace(/[^\d]/g, ""))
          const tuitionB = Number.parseInt(b.tuition.replace(/[^\d]/g, ""))
          return tuitionA - tuitionB
        case "rating":
          return b.rating - a.rating
        case "acceptance":
          const acceptanceA = Number.parseInt(a.acceptance.replace("%", ""))
          const acceptanceB = Number.parseInt(b.acceptance.replace("%", ""))
          return acceptanceA - acceptanceB
        case "ranking":
        default:
          return a.ranking.localeCompare(b.ranking)
      }
    })

    setFilteredUniversities(filtered)
  }

  const handleSaveUniversity = async (universityId: string) => {
    try {
      const newSaved = new Set(savedUniversities)

      if (savedUniversities.has(universityId)) {
        newSaved.delete(universityId)
        await unsaveUniversity("current-user", universityId)
        toast.success("University removed from saved list")
      } else {
        newSaved.add(universityId)
        await saveUniversity("current-user", universityId)
        toast.success("University saved to your list")
      }

      setSavedUniversities(newSaved)
      localStorage.setItem("savedUniversities", JSON.stringify([...newSaved]))
    } catch (error) {
      toast.error("Failed to update saved universities")
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "all",
      type: "all",
      program: "all",
      tuitionRange: [0, 1500000],
      ratingMin: 0,
      acceptanceRate: "all",
    })
    setSortBy("ranking")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.location !== "all") count++
    if (filters.type !== "all") count++
    if (filters.program !== "all") count++
    if (filters.tuitionRange[0] > 0 || filters.tuitionRange[1] < 1500000) count++
    if (filters.ratingMin > 0) count++
    if (filters.acceptanceRate !== "all") count++
    return count
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading universities...</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Universities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top universities in Pakistan and find the perfect match for your academic goals
          </p>
        </div>

        {/* Search and Quick Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search universities, locations, or programs..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lahore">Lahore</SelectItem>
                    <SelectItem value="karachi">Karachi</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                    <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
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
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="social">Social Sciences</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Acceptance Rate Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Acceptance Rate</label>
                    <Select
                      value={filters.acceptanceRate}
                      onValueChange={(value) => setFilters({ ...filters, acceptanceRate: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Rates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Rates</SelectItem>
                        <SelectItem value="low">Highly Selective (&lt;=20%)</SelectItem>
                        <SelectItem value="medium">Moderately Selective (21-50%)</SelectItem>
                        <SelectItem value="high">Less Selective (&gt;50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <Select
                      value={filters.ratingMin.toString()}
                      onValueChange={(value) => setFilters({ ...filters, ratingMin: Number.parseFloat(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.8">4.8+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tuition Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Annual Tuition Range: PKR {filters.tuitionRange[0].toLocaleString()} - PKR{" "}
                    {filters.tuitionRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={filters.tuitionRange}
                    onValueChange={(value) => setFilters({ ...filters, tuitionRange: value })}
                    max={1500000}
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
            <h2 className="text-2xl font-bold text-gray-900">Universities ({filteredUniversities.length})</h2>
            <p className="text-gray-600">
              {getActiveFiltersCount() > 0
                ? `Filtered results (${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? "s" : ""} applied)`
                : "Showing all universities"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="tuition">Tuition (Low to High)</SelectItem>
                <SelectItem value="rating">Rating (High to Low)</SelectItem>
                <SelectItem value="acceptance">Acceptance Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms to find more results.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* University Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredUniversities.map((university) => (
            <Card key={university.id} className="hover:shadow-lg transition-all duration-200 group">
              <div className="flex">
                <div className="w-1/3 relative">
                  <Image
                    src={university.image || "/placeholder.svg"}
                    alt={university.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                      savedUniversities.has(university.id) ? "text-red-500" : "text-gray-600"
                    }`}
                    onClick={() => handleSaveUniversity(university.id)}
                  >
                    <Heart className={`w-4 h-4 ${savedUniversities.has(university.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{university.location}</span>
                        <Badge variant="secondary" className="ml-2">
                          {university.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Ranking:</span>
                      <span className="font-medium ml-1 text-blue-600">{university.ranking}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium ml-1">{university.students}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tuition:</span>
                      <span className="font-medium ml-1">{university.tuition}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Acceptance:</span>
                      <span className="font-medium ml-1">{university.acceptance}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Popular Programs:</p>
                    <div className="flex flex-wrap gap-1">
                      {university.programs.slice(0, 3).map((program, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {university.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{university.programs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{university.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">(245 reviews)</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(university.website, "_blank")}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Visit
                      </Button>
                      <Link href={`/universities/${university.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredUniversities.length > 0 && filteredUniversities.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => toast.info("Loading more universities...")}>
              Load More Universities
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{universities.length}+</div>
                <div className="text-sm text-blue-700">Universities Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-blue-700">Cities Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-blue-700">Programs Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-blue-700">Student Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
