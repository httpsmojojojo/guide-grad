"use client"

import { useState, useEffect, useRef } from "react"
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
  const [page, setPage] = useState(5) // Show 20 universities initially (5 * 4)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const ITEMS_PER_PAGE = 4

  // Filter states
  const [filters, setFilters] = useState({ search: "" })

  // Load universities on component mount
  useEffect(() => {
    loadUniversities()
    loadSavedUniversities()
  }, [])

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

  const loadMoreUniversities = async () => {
    if (loadingMore || !hasMore) return

    try {
      setLoadingMore(true)
      // Simulate loading more data
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const nextPage = page + 1
      const totalItems = filteredUniversities.length
      const currentItems = page * ITEMS_PER_PAGE
      
      // Check if we have more items to load
      if (currentItems >= totalItems) {
        setHasMore(false)
        return
      }

      setPage(nextPage)
    } catch (error) {
      toast.error("Failed to load more universities")
    } finally {
      setLoadingMore(false)
    }
  }

  // Intersection Observer setup
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreUniversities()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, loadingMore, page, filteredUniversities.length])

  const loadSavedUniversities = () => {
    // Mock loading saved universities from localStorage
    const saved = localStorage.getItem("savedUniversities")
    if (saved) {
      setSavedUniversities(new Set(JSON.parse(saved)))
    }
  }

  const applyFilters = () => {
    let filtered = [...universities]

    // Search filter only
    if (filters.search) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          uni.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          uni.programs.some((program) => program.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

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

  useEffect(() => {
    applyFilters();
  }, [filters, universities]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading universities...</p>
        </div>
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
            Explore top universities in Pakistan and abroad. Find detailed information about programs,
            admission requirements, and campus life.
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
                  placeholder="Search universities......"
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Universities ({filteredUniversities.length})</h2>
            <p className="text-gray-600">Showing all universities</p>
          </div>
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms to find more results.</p>
            </CardContent>
          </Card>
        )}

        {/* University Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredUniversities.slice(0, page * ITEMS_PER_PAGE).map((university) => (
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
                        <Button size="sm" className="bg-primary hover:bg-primary-dark">
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

        {/* Loading indicator */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center">
          {loadingMore && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-gray-600">Loading more universities...</span>
            </div>
          )}
          {!hasMore && filteredUniversities.length > 0 && filteredUniversities.length > page * ITEMS_PER_PAGE && (
            <span className="text-gray-600">No more universities to load</span>
          )}
        </div>

        {/* Quick Stats */}
        <Card className="mt-12 bg-primary-light border-primary">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{universities.length}+</div>
                <div className="text-sm text-primary">Universities Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-primary">Cities Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-primary">Programs Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-primary">Student Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
