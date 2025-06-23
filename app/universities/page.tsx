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
  Users,
  DollarSign,
  CheckCircle,
  Building,
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
      university.program_offered.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))
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
            const campus = university.campus;
            const facultyStudentRatio = university["faculty-student-ratio"];
            const programOffered = university.program_offered;
            const image = university.imageCard || university.image;
            const website = university.website;
            const isSaved = savedUniversities.includes(university.id ?? '');
            const saving = isSaving === (university.id ?? '');
            
            return (
              <Card key={university.id ?? ''} className="flex flex-col items-stretch border border-gray-200 shadow-md rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 relative">
                {/* Save/Unsave Button */}
                <button
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 focus:outline-none"
                  onClick={() => handleSaveUniversity(university.id ?? '')}
                  disabled={saving}
                  title={isSaved ? 'Unsave' : 'Save'}
                  aria-label={isSaved ? 'Unsave university' : 'Save university'}
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  ) : isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <BookmarkPlus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {/* Image on top */}
                <div className="w-full h-[200px] bg-gray-50 relative">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-t-xl shadow-sm"
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
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Name, location, badges */}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-gray-900 truncate">{name}</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{type}</Badge>
                      {ranking && (
                        <Badge variant="secondary" className="text-xs">Rank #{ranking}</Badge>
                      )}
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="flex justify-between text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-2">
                    {campus && campus.length > 0 && (
                      <div className="flex flex-col items-center">
                        <Building className="w-4 h-4 mb-1" />
                        <span className="font-medium">{campus.length}</span>
                        <span>Campus</span>
                      </div>
                    )}
                    {facultyStudentRatio && (
                      <div className="flex flex-col items-center">
                        <Users className="w-4 h-4 mb-1" />
                        <span className="font-medium">{facultyStudentRatio}</span>
                        <span>Faculty-Student</span>
                      </div>
                    )}
                    {programOffered && programOffered.length > 0 && (
                      <div className="flex flex-col items-center">
                        <BookOpen className="w-4 h-4 mb-1" />
                        <span className="font-medium">{programOffered.length}</span>
                        <span>Programs</span>
                      </div>
                    )}
                  </div>
                  {/* Programs */}
                  {programOffered && programOffered.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programOffered.slice(0, 3).map((program: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {programOffered.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{programOffered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4">
                    <Link href={`/universities/${university.id ?? ''}`} className="flex-1">
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
