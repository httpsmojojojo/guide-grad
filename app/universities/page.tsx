"use client"

import { useState, useEffect, MouseEventHandler } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Star,
  MapPin,
  BookOpen,
  Loader2,
  AlertCircle,
  BookmarkCheck,
  BookmarkPlus,
} from "lucide-react"
import Link from "next/link"
import { universitiesApi } from "@/lib/api"
import type { University } from "@/lib/api/universities"
import { authApi } from '@/lib/api/auth'

interface FilterState {
  location: string
  program: string
  rating: number | null
  type: string
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [savedUniversities, setSavedUniversities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    program: "",
    rating: null,
    type: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [programs, setPrograms] = useState<string[]>([])

  useEffect(() => {
    const initializeData = async () => {
      try {
        const user = authApi.getCurrentUser()
        setIsAuthenticated(!!user)
        await Promise.all([
          loadUniversities(),
          user ? loadSavedUniversities() : Promise.resolve()
        ])
      } catch (error: any) {
        console.error('Error initializing data:', error)
        setError(error.message || 'Failed to initialize data')
      }
    }

    initializeData()
  }, [])

  useEffect(() => {
    // Extract unique locations and programs from universities
    const uniqueLocations = Array.from(new Set(universities.map(uni => uni.location)))
    const uniquePrograms = Array.from(new Set(universities.flatMap(uni => uni.programs)))
    
    setLocations(uniqueLocations)
    setPrograms(uniquePrograms)
  }, [universities])

  const loadUniversities = async (loadMore = false) => {
    if (loadMore) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }
    setError("")

    try {
      const apiFilters = {
        location: filters.location || undefined,
        program: filters.program || undefined,
        minRating: filters.rating || undefined,
        type: filters.type || undefined,
      }

      const { universities: newUniversities, lastDoc: newLastDoc } = await universitiesApi.getUniversities(
        apiFilters,
        loadMore ? lastDoc : undefined
      )

      setUniversities(prev => loadMore ? [...prev, ...newUniversities] : newUniversities)
      setLastDoc(newLastDoc)
      setHasMore(newUniversities.length === 10) // Assuming page size is 10
    } catch (error: any) {
      console.error('Error loading universities:', error)
      setError(error.message || 'Failed to load universities')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const loadSavedUniversities = async () => {
    try {
      console.log('Loading saved universities...')
      const saved = await universitiesApi.getSavedUniversities()
      console.log('Loaded saved universities:', saved)
      setSavedUniversities(saved.map(uni => uni.id).filter(Boolean) as string[])
      console.log('Updated savedUniversities state:', saved.map(uni => uni.id))
    } catch (error: any) {
      console.error("Failed to load saved universities:", error)
      // Don't set error state here as it's not critical
    }
  }

  const handleSaveUniversity = async (universityId: string) => {
    if (!isAuthenticated) {
      setError('Please sign in to save universities')
      return
    }

    console.log('Attempting to save/unsave university with ID:', universityId)
    setIsSaving(universityId)
    try {
      if (savedUniversities.includes(universityId)) {
        console.log('Unsaving university:', universityId)
        await universitiesApi.unsaveUniversity(universityId)
        setSavedUniversities(prev => prev.filter(id => id !== universityId))
      } else {
        console.log('Saving university:', universityId)
        await universitiesApi.saveUniversity(universityId)
        setSavedUniversities(prev => [...prev, universityId])
      }
    } catch (error: any) {
      console.error('Error in handleSaveUniversity:', error)
      setError(error.message)
    } finally {
      setIsSaving(null)
    }
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setLastDoc(null)
    loadUniversities()
  }

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    loadUniversities(true)
  }

  const applyFilters = () => {
    return universities.filter(university => {
      const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLocation = !filters.location || university.location.toLowerCase() === filters.location.toLowerCase()
      const matchesProgram = !filters.program || university.programs.some(program => program.toLowerCase() === filters.program.toLowerCase())
      const matchesRating = !filters.rating || university.rating >= filters.rating
      const matchesType = !filters.type || university.type.toLowerCase() === filters.type.toLowerCase()

      return matchesSearch && matchesLocation && matchesProgram && matchesRating && matchesType
    })
  }

  const filteredUniversities = applyFilters()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading universities...</p>
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
              onClick={() => loadUniversities()} 
              className="w-full mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Universities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top universities in Pakistan and find the perfect fit for your academic journey
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search universities or programs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <select
                      className="w-full mt-1 rounded-md border border-gray-300 p-2"
                      value={filters.location}
                      onChange={(e) => handleFilterChange({ ...filters, location: e.target.value })}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Program</label>
                    <select
                      className="w-full mt-1 rounded-md border border-gray-300 p-2"
                      value={filters.program}
                      onChange={(e) => handleFilterChange({ ...filters, program: e.target.value })}
                    >
                      <option value="">All Programs</option>
                      {programs.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <select
                      className="w-full mt-1 rounded-md border border-gray-300 p-2"
                      value={filters.rating || ""}
                      onChange={(e) => handleFilterChange({ ...filters, rating: e.target.value ? Number(e.target.value) : null })}
                    >
                      <option value="">All Ratings</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <select
                      className="w-full mt-1 rounded-md border border-gray-300 p-2"
                      value={filters.type}
                      onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
                    >
                      <option value="">All Types</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {filteredUniversities.map((university) => {
            // Use fields directly from the University interface
            const name = university.name;
            const location = university.location;
            const type = university.type;
            const ranking = university.ranking;
            const students = university.students;
            const tuition = university.tuition;
            const acceptance = university.acceptance;
            const programs = university.programs;
            const rating = university.rating;
            const image = university.image;
            const website = university.website;
            
            return (
              <Card key={university.id} className="flex flex-col md:flex-row items-stretch min-h-[320px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Image Section */}
                <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 md:w-56 w-full h-48 md:h-auto relative">
                  <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full rounded-l-lg md:rounded-l-lg md:rounded-r-none rounded-t-lg md:rounded-t-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.image-placeholder')) {
                        const icon = document.createElement('div');
                        icon.className = 'image-placeholder absolute inset-0 flex flex-col items-center justify-center text-gray-300';
                        icon.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"mx-auto\" width=\"48\" height=\"48\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><rect width=\"18\" height=\"14\" x=\"3\" y=\"5\" rx=\"2\" stroke-width=\"1.5\"/><circle cx=\"8.5\" cy=\"10.5\" r=\"1.5\" stroke-width=\"1.5\"/><path stroke-width=\"1.5\" d=\"M21 19l-5.5-6.5-4.5 5.5-2-2.5L3 19\"/></svg>`;
                        parent.appendChild(icon);
                      }
                    }}
                  />
                  {/* Heart Button */}
                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white z-10"
                      onClick={() => handleSaveUniversity(university.id as string)}
                      disabled={isSaving === university.id}
                    >
                      {isSaving === university.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : savedUniversities.includes(university.id as string) ? (
                        <BookmarkCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <BookmarkPlus className="h-5 w-5" />
                      )}
                    </Button>
                  )}
                </div>
                {/* Info Section */}
                <div className="flex flex-col flex-1 p-6 gap-2 justify-between min-w-0">
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-2 mb-1 min-w-0">
                      <h2 className="text-lg md:text-xl font-bold leading-tight flex-1 break-words min-w-0">{name}</h2>
                    </div>
                    <div className="flex items-center gap-2 mb-2 min-w-0">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{location}</span>
                      <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs whitespace-nowrap">{type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700 mb-2 min-w-0">
                      <span className="truncate">Ranking: <span className="font-medium">{ranking}</span></span>
                      <span className="truncate">Students: <span className="font-medium">{students}</span></span>
                      <span className="truncate">Tuition: <span className="font-medium">{tuition}</span></span>
                      <span className="truncate">Acceptance: <span className="font-medium">{acceptance}</span></span>
                    </div>
                    <div className="mb-2 min-w-0">
                      <span className="text-sm text-gray-700 font-medium">Popular Programs:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {programs.slice(0, 3).map((program, idx) => (
                          <Badge key={program} variant="secondary" className="px-3 py-0.5 text-xs font-semibold whitespace-nowrap">{program}</Badge>
                        ))}
                        {programs.length > 3 && (
                          <Badge variant="secondary" className="px-3 py-0.5 text-xs font-semibold whitespace-nowrap">+{programs.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Rating and Buttons at the bottom */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-1 text-yellow-500 text-base font-semibold mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-lg font-bold text-gray-900">{rating}</span>
                    </div>
                    <div className="flex gap-2">
                      {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="px-4 py-2 text-sm">Visit</Button>
                        </a>
                      )}
                      <Link href={`/universities/${university.id}`}>
                        <Button className="px-4 py-2 text-sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilters({
                    location: "",
                    program: "",
                    rating: null,
                    type: "",
                  })
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
