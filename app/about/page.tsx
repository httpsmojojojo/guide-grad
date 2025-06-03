"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Award,
  Target,
  Heart,
  ArrowLeft,
  CheckCircle,
  Globe,
  TrendingUp,
  Star,
  Quote,
  Play,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const stats = [
    {
      icon: Users,
      label: "Students Helped",
      value: "10,000+",
      color: "text-blue-600",
      description: "Successful guidance provided",
    },
    {
      icon: BookOpen,
      label: "Universities",
      value: "500+",
      color: "text-green-600",
      description: "Partner institutions worldwide",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "95%",
      color: "text-yellow-600",
      description: "Student admission success",
    },
    {
      icon: Globe,
      label: "Cities Covered",
      value: "50+",
      color: "text-purple-600",
      description: "Across Pakistan and abroad",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, ensuring the highest quality guidance for our students.",
      details:
        "Our commitment to excellence drives us to continuously improve our services and maintain the highest standards in educational consulting.",
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand the challenges students face and provide compassionate, personalized support.",
      details:
        "Every student's journey is unique, and we provide personalized attention to understand and address individual needs and concerns.",
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We maintain the highest ethical standards and provide honest, transparent guidance.",
      details:
        "Trust is the foundation of our relationships. We provide honest assessments and transparent guidance throughout the entire process.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously innovate our services to better serve the evolving needs of students.",
      details:
        "We leverage technology and innovative approaches to make educational guidance more accessible and effective for all students.",
    },
  ]

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Founder & CEO",
      education: "PhD Education, Harvard University",
      experience: "15+ years in education consulting",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Sarah founded Guide Grad with a vision to democratize access to quality education guidance. Her extensive experience in international education has helped thousands of students achieve their dreams.",
      specialties: ["International Admissions", "PhD Guidance", "Research Opportunities"],
      contact: "sarah@guidegrad.pk",
    },
    {
      name: "Ali Hassan",
      role: "Head of Student Services",
      education: "MBA, LUMS",
      experience: "10+ years in student counseling",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ali leads our student services team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Career Counseling", "University Selection", "Application Strategy"],
      contact: "ali@guidegrad.pk",
    },
    {
      name: "Fatima Khan",
      role: "University Relations Director",
      education: "MS Education Policy, Oxford",
      experience: "12+ years in higher education",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Fatima manages our relationships with universities worldwide, ensuring students have access to the latest opportunities and admission requirements.",
      specialties: ["University Partnerships", "Admission Requirements", "Scholarship Opportunities"],
      contact: "fatima@guidegrad.pk",
    },
    {
      name: "Ahmed Malik",
      role: "Technology Director",
      education: "MS Computer Science, MIT",
      experience: "8+ years in EdTech",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ahmed leads our technology initiatives, developing innovative solutions to make education guidance more accessible and efficient.",
      specialties: ["EdTech Solutions", "Platform Development", "Data Analytics"],
      contact: "ahmed@guidegrad.pk",
    },
  ]

  const milestones = [
    {
      year: "2020",
      event: "Guide Grad founded with a vision to democratize education guidance",
      details: "Started with a small team of 3 education consultants in Lahore",
      impact: "Helped first 100 students",
    },
    {
      year: "2021",
      event: "Launched ambassador program with 50 student ambassadors",
      details: "Expanded reach through peer-to-peer guidance network",
      impact: "Reached 1,000+ students across Pakistan",
    },
    {
      year: "2022",
      event: "Reached 5,000 students helped milestone",
      details: "Opened offices in Karachi and Islamabad",
      impact: "95% admission success rate achieved",
    },
    {
      year: "2023",
      event: "Expanded to cover 500+ universities across Pakistan and abroad",
      details: "Established partnerships with international universities",
      impact: "Launched scholarship program worth PKR 50M",
    },
    {
      year: "2024",
      event: "Achieved 95% success rate and 10,000+ students helped",
      details: "Launched AI-powered guidance platform",
      impact: "Became Pakistan's leading education consultancy",
    },
  ]

  const testimonials = [
    {
      name: "Ayesha Rahman",
      role: "Medical Student at Aga Khan University",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Guide Grad helped me navigate the complex medical school admission process. Their guidance was invaluable in securing my spot at AKU.",
      rating: 5,
      year: "Class of 2024",
    },
    {
      name: "Hassan Ali",
      role: "Engineering Student at LUMS",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The scholarship guidance I received helped me secure a full scholarship to LUMS. I couldn't have done it without their support.",
      rating: 5,
      year: "Class of 2023",
    },
    {
      name: "Zara Khan",
      role: "MBA Student at IBA Karachi",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "From application strategy to interview preparation, Guide Grad was with me every step of the way. Highly recommended!",
      rating: 5,
      year: "Class of 2024",
    },
    {
      name: "Omar Sheikh",
      role: "PhD Student at MIT",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Guide Grad's international guidance program helped me secure admission to MIT with full funding. Their expertise is unmatched.",
      rating: 5,
      year: "Class of 2023",
    },
  ]

  const achievements = [
    { title: "Best Education Consultancy", year: "2024", organization: "Pakistan Education Awards" },
    { title: "Innovation in EdTech", year: "2023", organization: "Tech Excellence Awards" },
    { title: "Student Choice Award", year: "2023", organization: "Higher Education Commission" },
    { title: "Excellence in Student Services", year: "2022", organization: "Education Leadership Forum" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "team", label: "Our Team" },
    { id: "history", label: "Our Journey" },
    { id: "testimonials", label: "Testimonials" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
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
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Guide Grad</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Empowering students to achieve their educational dreams through expert guidance, innovative technology, and
            personalized support. We're more than consultants – we're your partners in success.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Watch Our Story
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule a Meeting
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`mx-1 ${activeTab === tab.id ? "bg-blue-600 text-white" : ""}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To democratize access to quality education by providing comprehensive, personalized guidance that
                    empowers every student to achieve their academic and career aspirations, regardless of their
                    background or circumstances.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To become the leading education consultancy in South Asia, recognized for innovation, integrity, and
                    impact in transforming lives through education. We envision a world where every student has equal
                    access to quality guidance.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values Section */}
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <value.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                          <p className="text-gray-600 mb-3">{value.description}</p>
                          <p className="text-sm text-gray-500">{value.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Awards & Recognition</CardTitle>
                <CardDescription className="text-center">
                  Our commitment to excellence has been recognized by leading organizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.year}</p>
                      <p className="text-xs text-gray-500">{achievement.organization}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our diverse team of education experts brings together decades of experience in admissions, counseling,
                and student success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                        <p className="text-sm text-gray-600 mb-2">{member.education}</p>
                        <p className="text-sm text-gray-500 mb-3">{member.experience}</p>
                        <p className="text-sm text-gray-700 mb-4">{member.bio}</p>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Meeting
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From a small startup to Pakistan's leading education consultancy, here's how we've grown and evolved
                over the years.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>

                    <Card className="flex-1 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{milestone.year}</h3>
                          <Badge variant="outline">{milestone.impact}</Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-blue-600 mb-2">{milestone.event}</h4>
                        <p className="text-gray-600 mb-3">{milestone.details}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Impact: {milestone.impact}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our successful students have to say about their experience
                with Guide Grad.
              </p>
            </div>

            {/* Featured Testimonial */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-blue-600">{testimonials[currentTestimonial].role}</p>
                      <p className="text-sm text-gray-500">{testimonials[currentTestimonial].year}</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-all duration-300 ${index === currentTestimonial ? "ring-2 ring-blue-300" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-blue-600">{testimonial.role}</p>
                            <p className="text-xs text-gray-500">{testimonial.year}</p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of successful students who have achieved their dreams with Guide Grad
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/book-call">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
