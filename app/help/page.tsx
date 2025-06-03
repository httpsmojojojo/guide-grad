"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  BookOpen,
  Users,
  Award,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  FileText,
  Video,
  Download,
  ExternalLink,
  Clock,
  AlertCircle,
  HelpCircle,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  User,
  Send,
  Loader2,
  Eye,
  Heart,
  TrendingUp,
  Target,
} from "lucide-react"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  notHelpful: number
  views: number
  lastUpdated: string
  tags: string[]
  relatedArticles: string[]
}

interface Guide {
  id: string
  title: string
  description: string
  duration: string
  category: string
  downloadUrl: string
  views: number
  rating: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  lastUpdated: string
  author: string
  fileSize: string
  format: string
}

interface VideoTutorial {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
  views: number
  likes: number
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  transcript: string
  chapters: { time: string; title: string }[]
}

interface SupportTicket {
  subject: string
  category: string
  priority: string
  description: string
  email: string
  name: string
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I apply to universities through Guide Grad?",
    answer:
      "You can browse universities on our platform, save your favorites, and use our application tracking system. We also provide personalized guidance through our ambassador program and consultation services. Start by creating an account, then explore universities using our advanced search filters. Save universities you're interested in, and use our application checklist to track your progress.",
    category: "applications",
    helpful: 45,
    notHelpful: 3,
    views: 1250,
    lastUpdated: "2024-01-15",
    tags: ["applications", "universities", "getting-started"],
    relatedArticles: ["2", "6"],
  },
  {
    id: "2",
    question: "What scholarships are available for Pakistani students?",
    answer:
      "We list over 100+ scholarships including HEC scholarships, university-specific awards, merit-based scholarships, and international opportunities. Use our scholarship finder tool to discover relevant options. Our database includes government scholarships, private foundation awards, and international exchange programs. Filter by field of study, education level, and deadline to find the best matches.",
    category: "scholarships",
    helpful: 38,
    notHelpful: 2,
    views: 980,
    lastUpdated: "2024-01-20",
    tags: ["scholarships", "funding", "HEC"],
    relatedArticles: ["7", "4"],
  },
  {
    id: "3",
    question: "How can I connect with student ambassadors?",
    answer:
      "Visit our Ambassadors page to browse profiles, filter by university or field, and book consultations. You can also message ambassadors directly through our platform. Our ambassadors are current students and recent graduates who can provide insider insights about university life, application processes, and academic programs.",
    category: "ambassadors",
    helpful: 42,
    notHelpful: 1,
    views: 756,
    lastUpdated: "2024-01-18",
    tags: ["ambassadors", "mentorship", "consultation"],
    relatedArticles: ["5"],
  },
  {
    id: "4",
    question: "Is Guide Grad free to use?",
    answer:
      "Yes! Creating an account, browsing universities, and accessing basic features is completely free. Premium consultation services are available for personalized guidance. Free features include university search, scholarship browsing, ambassador messaging, and application tracking. Premium services include one-on-one consultations, application review, and priority support.",
    category: "account",
    helpful: 52,
    notHelpful: 0,
    views: 1450,
    lastUpdated: "2024-01-10",
    tags: ["pricing", "free", "premium"],
    relatedArticles: ["1"],
  },
  {
    id: "5",
    question: "How do I book a consultation call?",
    answer:
      'Click on "Book Free Consultation" on our homepage or visit the Book Call page. Choose your preferred time slot and provide details about your educational goals. Our consultants will help you create a personalized education plan, review your applications, and provide guidance on university selection and scholarship opportunities.',
    category: "consultations",
    helpful: 35,
    notHelpful: 2,
    views: 623,
    lastUpdated: "2024-01-22",
    tags: ["consultation", "booking", "guidance"],
    relatedArticles: ["3"],
  },
  {
    id: "6",
    question: "What documents do I need for university applications?",
    answer:
      "Common requirements include academic transcripts, test scores (SAT, IELTS, etc.), personal statements, recommendation letters, and financial documents. Specific requirements vary by university. We provide detailed checklists for each university and can help you prepare all necessary documents through our consultation services.",
    category: "applications",
    helpful: 41,
    notHelpful: 4,
    views: 892,
    lastUpdated: "2024-01-16",
    tags: ["documents", "requirements", "applications"],
    relatedArticles: ["1"],
  },
  {
    id: "7",
    question: "How can I track my scholarship applications?",
    answer:
      "Use your dashboard to monitor all scholarship applications, deadlines, and status updates. You'll receive notifications for important updates and deadlines. Our tracking system shows application progress, required documents, submission deadlines, and decision timelines. Set up email and SMS notifications to never miss important dates.",
    category: "scholarships",
    helpful: 29,
    notHelpful: 1,
    views: 567,
    lastUpdated: "2024-01-19",
    tags: ["tracking", "dashboard", "notifications"],
    relatedArticles: ["2"],
  },
  {
    id: "8",
    question: "Can I get help with visa applications?",
    answer:
      "While we don't directly handle visa applications, our ambassadors and consultants can provide guidance on the visa process and connect you with relevant resources. We offer information about student visa requirements, documentation, and can recommend trusted visa consultants and immigration lawyers.",
    category: "visas",
    helpful: 33,
    notHelpful: 3,
    views: 445,
    lastUpdated: "2024-01-14",
    tags: ["visa", "immigration", "guidance"],
    relatedArticles: ["6"],
  },
]

const categories = [
  { id: "all", name: "All Questions", icon: HelpCircle, count: faqData.length },
  {
    id: "applications",
    name: "Applications",
    icon: FileText,
    count: faqData.filter((f) => f.category === "applications").length,
  },
  {
    id: "scholarships",
    name: "Scholarships",
    icon: Award,
    count: faqData.filter((f) => f.category === "scholarships").length,
  },
  {
    id: "ambassadors",
    name: "Ambassadors",
    icon: Users,
    count: faqData.filter((f) => f.category === "ambassadors").length,
  },
  { id: "account", name: "Account", icon: User, count: faqData.filter((f) => f.category === "account").length },
  {
    id: "consultations",
    name: "Consultations",
    icon: Phone,
    count: faqData.filter((f) => f.category === "consultations").length,
  },
  { id: "visas", name: "Visas", icon: FileText, count: faqData.filter((f) => f.category === "visas").length },
]

const guides: Guide[] = [
  {
    id: "1",
    title: "Complete University Application Guide",
    description:
      "Step-by-step guide to applying to Pakistani and international universities with checklists and templates",
    duration: "15 min read",
    category: "Applications",
    downloadUrl: "#",
    views: 2340,
    rating: 4.8,
    difficulty: "Beginner",
    lastUpdated: "2024-01-20",
    author: "Dr. Sarah Ahmed",
    fileSize: "2.5 MB",
    format: "PDF",
  },
  {
    id: "2",
    title: "Scholarship Application Strategies",
    description: "Tips and tricks to maximize your scholarship success rate with winning essay examples",
    duration: "12 min read",
    category: "Scholarships",
    downloadUrl: "#",
    views: 1890,
    rating: 4.9,
    difficulty: "Intermediate",
    lastUpdated: "2024-01-18",
    author: "Ahmed Khan",
    fileSize: "1.8 MB",
    format: "PDF",
  },
  {
    id: "3",
    title: "Student Visa Process Guide",
    description: "Everything you need to know about student visa applications with country-specific requirements",
    duration: "20 min read",
    category: "Visas",
    downloadUrl: "#",
    views: 1567,
    rating: 4.7,
    difficulty: "Advanced",
    lastUpdated: "2024-01-15",
    author: "Maria Gonzalez",
    fileSize: "3.2 MB",
    format: "PDF",
  },
  {
    id: "4",
    title: "Financial Planning for Students",
    description: "Budget planning and financial aid options for higher education with calculation tools",
    duration: "10 min read",
    category: "Finance",
    downloadUrl: "#",
    views: 1234,
    rating: 4.6,
    difficulty: "Beginner",
    lastUpdated: "2024-01-12",
    author: "Ali Hassan",
    fileSize: "1.5 MB",
    format: "PDF",
  },
  {
    id: "5",
    title: "IELTS Preparation Roadmap",
    description: "Complete preparation guide for IELTS with practice tests and study schedule",
    duration: "25 min read",
    category: "Test Prep",
    downloadUrl: "#",
    views: 3456,
    rating: 4.9,
    difficulty: "Intermediate",
    lastUpdated: "2024-01-22",
    author: "Emma Thompson",
    fileSize: "4.1 MB",
    format: "PDF",
  },
  {
    id: "6",
    title: "Personal Statement Writing Guide",
    description: "Craft compelling personal statements with examples and templates",
    duration: "18 min read",
    category: "Applications",
    downloadUrl: "#",
    views: 2789,
    rating: 4.8,
    difficulty: "Intermediate",
    lastUpdated: "2024-01-19",
    author: "Dr. Michael Brown",
    fileSize: "2.1 MB",
    format: "PDF",
  },
]

const videoTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "How to Use Guide Grad Platform",
    description: "Complete walkthrough of all platform features including search, filtering, and application tracking",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=120&width=200",
    videoUrl: "#",
    views: 5670,
    likes: 234,
    category: "Platform",
    difficulty: "Beginner",
    transcript: "Welcome to Guide Grad! In this tutorial, we'll walk you through all the features...",
    chapters: [
      { time: "0:00", title: "Introduction" },
      { time: "1:30", title: "Creating an Account" },
      { time: "3:15", title: "University Search" },
      { time: "5:45", title: "Application Tracking" },
    ],
  },
  {
    id: "2",
    title: "University Search and Filtering",
    description: "Learn to find the perfect university for your goals using advanced search and filtering options",
    duration: "6:30",
    thumbnail: "/placeholder.svg?height=120&width=200",
    videoUrl: "#",
    views: 4320,
    likes: 189,
    category: "Universities",
    difficulty: "Beginner",
    transcript: "Finding the right university is crucial for your academic success...",
    chapters: [
      { time: "0:00", title: "Search Basics" },
      { time: "2:00", title: "Advanced Filters" },
      { time: "4:30", title: "Saving Favorites" },
    ],
  },
  {
    id: "3",
    title: "Connecting with Ambassadors",
    description: "How to find and connect with student ambassadors for personalized guidance",
    duration: "5:15",
    thumbnail: "/placeholder.svg?height=120&width=200",
    videoUrl: "#",
    views: 3890,
    likes: 156,
    category: "Ambassadors",
    difficulty: "Beginner",
    transcript: "Student ambassadors are your gateway to insider knowledge...",
    chapters: [
      { time: "0:00", title: "Finding Ambassadors" },
      { time: "2:30", title: "Messaging System" },
      { time: "4:00", title: "Booking Calls" },
    ],
  },
  {
    id: "4",
    title: "Scholarship Application Process",
    description: "Step-by-step scholarship application tutorial with tips for success",
    duration: "12:20",
    thumbnail: "/placeholder.svg?height=120&width=200",
    videoUrl: "#",
    views: 6780,
    likes: 298,
    category: "Scholarships",
    difficulty: "Intermediate",
    transcript: "Scholarships can significantly reduce your education costs...",
    chapters: [
      { time: "0:00", title: "Finding Scholarships" },
      { time: "3:00", title: "Application Requirements" },
      { time: "7:30", title: "Writing Essays" },
      { time: "10:15", title: "Submission Tips" },
    ],
  },
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, "helpful" | "not-helpful" | null>>({})
  const [savedGuides, setSavedGuides] = useState<Set<string>>(new Set())
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "helpful" | "views">("relevance")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})

  const { toast } = useToast()

  // Support ticket form state
  const [ticketForm, setTicketForm] = useState<SupportTicket>({
    subject: "",
    category: "",
    priority: "",
    description: "",
    email: "",
    name: "",
  })

  const filteredFAQs = faqData
    .filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return sortOrder === "desc"
            ? new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
            : new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        case "helpful":
          return sortOrder === "desc"
            ? b.helpful - b.notHelpful - (a.helpful - a.notHelpful)
            : a.helpful - a.notHelpful - (b.helpful - b.notHelpful)
        case "views":
          return sortOrder === "desc" ? b.views - a.views : a.views - b.views
        default:
          return 0
      }
    })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
    // Increment view count
    const faq = faqData.find((f) => f.id === id)
    if (faq) {
      faq.views += 1
    }
  }

  const markHelpful = (id: string, helpful: boolean) => {
    const currentVote = helpfulVotes[id]
    const newVote = currentVote === (helpful ? "helpful" : "not-helpful") ? null : helpful ? "helpful" : "not-helpful"

    setHelpfulVotes((prev) => ({ ...prev, [id]: newVote }))

    toast({
      title: newVote ? "Thank you for your feedback!" : "Feedback removed",
      description: newVote
        ? `You marked this as ${helpful ? "helpful" : "not helpful"}.`
        : "Your feedback has been removed.",
    })
  }

  const saveGuide = (id: string) => {
    const newSaved = new Set(savedGuides)
    if (newSaved.has(id)) {
      newSaved.delete(id)
      toast({ title: "Guide removed from saved items" })
    } else {
      newSaved.add(id)
      toast({ title: "Guide saved successfully!" })
    }
    setSavedGuides(newSaved)
  }

  const likeVideo = (id: string) => {
    const newLiked = new Set(likedVideos)
    if (newLiked.has(id)) {
      newLiked.delete(id)
      toast({ title: "Like removed" })
    } else {
      newLiked.add(id)
      toast({ title: "Video liked!" })
    }
    setLikedVideos(newLiked)
  }

  const downloadGuide = async (guide: Guide) => {
    setDownloadProgress((prev) => ({ ...prev, [guide.id]: 0 }))

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setDownloadProgress((prev) => ({ ...prev, [guide.id]: i }))
    }

    toast({
      title: "Download completed!",
      description: `${guide.title} has been downloaded successfully.`,
    })

    setDownloadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[guide.id]
      return newProgress
    })
  }

  const submitSupportTicket = async () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject || !ticketForm.description) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingTicket(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Support ticket submitted!",
      description: "We'll get back to you within 24 hours.",
    })

    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
      email: "",
      name: "",
    })

    setIsSubmittingTicket(false)
  }

  const playVideo = (video: VideoTutorial) => {
    setSelectedVideo(video)
    setIsVideoPlaying(true)
    // Increment view count
    video.views += 1
  }

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  const shareContent = async (title: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.origin + url,
        })
        toast({ title: "Shared successfully!" })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + url)
      toast({ title: "Link copied to clipboard!" })
    }
  }

  // Simulate video progress
  useEffect(() => {
    if (isVideoPlaying && selectedVideo) {
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            setIsVideoPlaying(false)
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isVideoPlaying, selectedVideo])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">Guide Grad</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/universities" className="text-gray-600 hover:text-blue-600">
              Universities
            </Link>
            <Link href="/ambassadors" className="text-gray-600 hover:text-blue-600">
              Ambassadors
            </Link>
            <Link href="/scholarships" className="text-gray-600 hover:text-blue-600">
              Scholarships
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-blue-600">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to common questions, browse our guides, or get in touch with our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600">Get instant help from our support team</p>
                  <Badge variant="secondary" className="mt-2">
                    Avg. 2 min response
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600">Send us a detailed message</p>
                  <Badge variant="secondary" className="mt-2">
                    Avg. 4 hour response
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            <Link href="/book-call">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Book a Call</h3>
                  <p className="text-sm text-gray-600">Schedule a consultation</p>
                  <Badge variant="secondary" className="mt-2">
                    Free 30 min session
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">We're here when you need us</p>
                <Badge variant="secondary" className="mt-2">
                  Always available
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Help Statistics */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2 min</div>
              <div className="text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                              selectedCategory === category.id
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {category.count}
                            </Badge>
                          </button>
                        )
                      })}
                    </CardContent>
                  </Card>

                  {/* Sort Options */}
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <SortAsc className="w-5 h-5" />
                        Sort By
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="date">Last Updated</SelectItem>
                          <SelectItem value="helpful">Most Helpful</SelectItem>
                          <SelectItem value="views">Most Viewed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="w-full"
                      >
                        {sortOrder === "desc" ? (
                          <SortDesc className="w-4 h-4 mr-2" />
                        ) : (
                          <SortAsc className="w-4 h-4 mr-2" />
                        )}
                        {sortOrder === "desc" ? "Descending" : "Ascending"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Content */}
                <div className="lg:col-span-3">
                  <div className="space-y-4">
                    {filteredFAQs.length === 0 ? (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                          <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
                        </CardContent>
                      </Card>
                    ) : (
                      filteredFAQs.map((faq) => (
                        <Card key={faq.id} className="border border-gray-200">
                          <CardContent className="p-0">
                            <button
                              onClick={() => toggleFAQ(faq.id)}
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-1 pr-4">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {faq.views} views
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    {faq.helpful} helpful
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Updated {new Date(faq.lastUpdated).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              {expandedFAQ === faq.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                            </button>

                            {expandedFAQ === faq.id && (
                              <div className="px-6 pb-6 border-t border-gray-100">
                                <p className="text-gray-600 mb-4 pt-4 leading-relaxed">{faq.answer}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {faq.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => markHelpful(faq.id, true)}
                                        className={`flex items-center gap-1 text-sm transition-colors ${
                                          helpfulVotes[faq.id] === "helpful"
                                            ? "text-green-600"
                                            : "text-gray-500 hover:text-green-600"
                                        }`}
                                      >
                                        <ThumbsUp className="w-4 h-4" />
                                        {helpfulVotes[faq.id] === "helpful" ? "Helpful" : "Helpful?"}
                                      </button>
                                      <button
                                        onClick={() => markHelpful(faq.id, false)}
                                        className={`flex items-center gap-1 text-sm transition-colors ${
                                          helpfulVotes[faq.id] === "not-helpful"
                                            ? "text-red-600"
                                            : "text-gray-500 hover:text-red-600"
                                        }`}
                                      >
                                        <ThumbsDown className="w-4 h-4" />
                                        {helpfulVotes[faq.id] === "not-helpful" ? "Not Helpful" : "Not Helpful?"}
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => shareContent(faq.question, `/help#faq-${faq.id}`)}
                                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                      <Share2 className="w-4 h-4" />
                                      Share
                                    </button>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {faq.category}
                                  </Badge>
                                </div>

                                {/* Related Articles */}
                                {faq.relatedArticles.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Articles:</h4>
                                    <div className="space-y-1">
                                      {faq.relatedArticles.map((relatedId) => {
                                        const related = faqData.find((f) => f.id === relatedId)
                                        return related ? (
                                          <button
                                            key={relatedId}
                                            onClick={() => toggleFAQ(relatedId)}
                                            className="text-sm text-blue-600 hover:text-blue-800 block"
                                          >
                                            • {related.question}
                                          </button>
                                        ) : null
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{guide.category}</Badge>
                            <Badge
                              variant={
                                guide.difficulty === "Beginner"
                                  ? "secondary"
                                  : guide.difficulty === "Intermediate"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {guide.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mb-2">{guide.title}</CardTitle>
                          <CardDescription className="text-sm">{guide.description}</CardDescription>
                        </div>
                        <button
                          onClick={() => saveGuide(guide.id)}
                          className={`p-2 rounded-full transition-colors ${
                            savedGuides.has(guide.id) ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${savedGuides.has(guide.id) ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Guide Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {guide.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {guide.views.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {guide.rating}
                          </div>
                        </div>

                        {/* Author and File Info */}
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-1 mb-1">
                            <User className="w-4 h-4" />
                            By {guide.author}
                          </div>
                          <div className="flex items-center gap-4">
                            <span>
                              {guide.format} • {guide.fileSize}
                            </span>
                            <span>Updated {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Download Progress */}
                        {downloadProgress[guide.id] !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Downloading...</span>
                              <span>{downloadProgress[guide.id]}%</span>
                            </div>
                            <Progress value={downloadProgress[guide.id]} className="h-2" />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => window.open(guide.downloadUrl, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Online
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => downloadGuide(guide)}
                            disabled={downloadProgress[guide.id] !== undefined}
                          >
                            {downloadProgress[guide.id] !== undefined ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4 mr-2" />
                            )}
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareContent(guide.title, `/help/guides/${guide.id}`)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTutorials.map((video) => (
                  <Card key={video.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                          <Button
                            size="lg"
                            className="bg-white/90 text-gray-900 hover:bg-white"
                            onClick={() => playVideo(video)}
                          >
                            <Play className="w-6 h-6 mr-2" />
                            Play
                          </Button>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant={
                              video.difficulty === "Beginner"
                                ? "secondary"
                                : video.difficulty === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                            className="bg-black/70"
                          >
                            {video.difficulty}
                          </Badge>
                        </div>
                        <button
                          onClick={() => likeVideo(video.id)}
                          className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                            likedVideos.has(video.id)
                              ? "text-red-500 bg-white/90"
                              : "text-white bg-black/50 hover:bg-black/70"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedVideos.has(video.id) ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{video.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{video.description}</p>

                        {/* Video Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {video.views.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {video.likes + (likedVideos.has(video.id) ? 1 : 0)}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => playVideo(video)}>
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareContent(video.title, `/help/videos/${video.id}`)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contact Support Tab */}
            <TabsContent value="contact">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Support Ticket Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Submit a Support Ticket</CardTitle>
                      <CardDescription>
                        Describe your issue in detail and we'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={ticketForm.name}
                            onChange={(e) => setTicketForm((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={ticketForm.category}
                            onValueChange={(value) => setTicketForm((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="account">Account Problem</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            value={ticketForm.priority}
                            onValueChange={(value) => setTicketForm((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                          placeholder="Brief description of your issue"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Please provide detailed information about your issue..."
                          rows={6}
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          {ticketForm.description.length}/1000 characters
                        </div>
                      </div>

                      <Button onClick={submitSupportTicket} disabled={isSubmittingTicket} className="w-full">
                        {isSubmittingTicket ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Ticket
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact Options */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Contact Options</CardTitle>
                        <CardDescription>Choose the best way to reach us based on your needs.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Link href="/contact">
                          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                  <MessageCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">Live Chat</h3>
                                  <p className="text-sm text-gray-600">Get instant help from our support team</p>
                                  <Badge variant="secondary" className="mt-1">
                                    Avg. 2 min response
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>

                        <Link href="/contact">
                          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                  <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">Email Support</h3>
                                  <p className="text-sm text-gray-600">Send detailed questions and attachments</p>
                                  <Badge variant="secondary" className="mt-1">
                                    Avg. 4 hour response
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>

                        <Link href="/book-call">
                          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                  <Phone className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">Schedule a Call</h3>
                                  <p className="text-sm text-gray-600">Book a consultation with our experts</p>
                                  <Badge variant="secondary" className="mt-1">
                                    Free 30 min session
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </CardContent>
                    </Card>

                    {/* Emergency Contact */}
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="text-red-800 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Emergency Support
                        </CardTitle>
                        <CardDescription className="text-red-700">
                          For urgent matters that require immediate attention.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-red-800">
                            <Phone className="w-5 h-5" />
                            <span className="font-semibold">+92-300-1234567</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-800">
                            <Mail className="w-5 h-5" />
                            <span className="font-semibold">emergency@guidegrad.pk</span>
                          </div>
                          <p className="text-sm text-red-700">
                            Available 24/7 for critical issues affecting your applications or deadlines.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Support Statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Support Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                            <div className="text-sm text-gray-600">Satisfaction Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">2 min</div>
                            <div className="text-sm text-gray-600">Avg Response</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                            <div className="text-sm text-gray-600">Availability</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">10k+</div>
                            <div className="text-sm text-gray-600">Issues Resolved</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>{selectedVideo?.description}</DialogDescription>
          </DialogHeader>

          {selectedVideo && (
            <div className="space-y-4">
              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedVideo.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" onClick={toggleVideoPlayback} className="bg-white/90 text-gray-900 hover:bg-white">
                    {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={toggleVideoPlayback}
                      className="text-white hover:bg-white/20"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <div className="flex-1">
                      <Progress value={videoProgress} className="h-2" />
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>

                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Video Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration: {selectedVideo.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Views: {selectedVideo.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Likes: {selectedVideo.likes + (likedVideos.has(selectedVideo.id) ? 1 : 0)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Difficulty: {selectedVideo.difficulty}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Video Chapters</h3>
                  <div className="space-y-2">
                    {selectedVideo.chapters.map((chapter, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-mono text-blue-600">{chapter.time}</span>
                        <span className="text-sm">{chapter.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transcript Toggle */}
              <div className="border-t pt-4">
                <Button variant="outline" onClick={() => setShowTranscript(!showTranscript)} className="mb-4">
                  <FileText className="w-4 h-4 mr-2" />
                  {showTranscript ? "Hide" : "Show"} Transcript
                </Button>

                {showTranscript && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Video Transcript</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedVideo.transcript}</p>
                  </div>
                )}
              </div>

              {/* Video Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => likeVideo(selectedVideo.id)}
                    className={likedVideos.has(selectedVideo.id) ? "text-red-500 border-red-200" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${likedVideos.has(selectedVideo.id) ? "fill-current" : ""}`} />
                    {likedVideos.has(selectedVideo.id) ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareContent(selectedVideo.title, `/help/videos/${selectedVideo.id}`)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Badge variant="outline">{selectedVideo.category}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Guide Grad</span>
              </div>
              <p className="text-gray-400">Empowering Pakistani students to achieve their higher education dreams.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/universities" className="hover:text-white">
                    Universities
                  </Link>
                </li>
                <li>
                  <Link href="/ambassadors" className="hover:text-white">
                    Ambassadors
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-white">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link href="/book-call" className="hover:text-white">
                    Book Call
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@guidegrad.pk</p>
                <p>📞 +92-300-1234567</p>
                <p>📍 Lahore, Pakistan</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Guide Grad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
