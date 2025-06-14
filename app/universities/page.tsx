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

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [savedUniversities, setSavedUniversities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

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

  const loadUniversities = async (loadMore = false) => {
    if (loadMore) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }
    setError("")

    try {
      const { universities: newUniversities, lastDoc: newLastDoc } = await universitiesApi.getUniversities({}, loadMore ? lastDoc : undefined)
      setUniversities(prev => loadMore ? [...prev, ...newUniversities] : newUniversities)
      setLastDoc(newLastDoc)
      setHasMore(newUniversities.length === 10)
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
      // Filter out any universities that might have been deleted
      const validSavedIds = saved
        .filter(uni => uni && uni.id)
        .map(uni => uni.id as string)
      console.log('Valid saved university IDs:', validSavedIds)
      setSavedUniversities(validSavedIds)
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

  const filteredUniversities = universities.filter(university => {
    return (
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

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
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">Universities</h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top universities in Pakistan and find the perfect fit for your academic journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search universities or programs..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredUniversities.map((university) => {
            const name = university.name;
            const location = university.location;
            const type = university.type;
            const ranking = university.ranking;
            const students = university.students;
            const tuition = university.tuition;
            const acceptance = university.acceptance;
            const programs = university.programs;
            const rating = university.rating;
            const image = university.imageCard || university.image;
            const website = university.website;
            
            return (
              <Card key={university.id} className="flex flex-col md:flex-row items-stretch min-h-[280px] sm:min-h-[320px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Image Section */}
                <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 md:w-48 w-full h-40 sm:h-48 md:h-auto relative p-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-lg"
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
                <div className="flex flex-col flex-1 p-4 sm:p-6 gap-2 justify-between min-w-0">
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-2 mb-1 min-w-0">
                      <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight flex-1 break-words min-w-0">{name}</h2>
                    </div>
                    <div className="flex items-center gap-2 mb-2 min-w-0">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600 truncate">{location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs sm:text-sm">{type}</Badge>
                      {ranking && (
                        <Badge variant="secondary" className="text-xs sm:text-sm">
                          Rank #{ranking}
                        </Badge>
                      )}
                      {rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs sm:text-sm text-gray-600">{rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {students && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs">Students</span>
                          <span className="font-medium">{students.toLocaleString()}</span>
                        </div>
                      )}
                      {tuition && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs">Tuition</span>
                          <span className="font-medium">Rs. {tuition.toLocaleString()}</span>
                        </div>
                      )}
                      {acceptance && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs">Acceptance</span>
                          <span className="font-medium">{acceptance}%</span>
                        </div>
                      )}
                    </div>
                    {programs && programs.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {programs.slice(0, 3).map((program, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                          {programs.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{programs.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Link href={`/universities/${university.id}`} className="flex-1">
                      <Button className="w-full">View Details</Button>
                    </Link>
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full">Visit Website</Button>
                      </a>
                    )}
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
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => loadUniversities(true)}
              disabled={isLoadingMore}
              className="w-full sm:w-auto"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
