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
  CheckCircle,
  Globe,
  TrendingUp,
  Star,
  Quote,
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
      value: "100+",
      color: "text-primary",
      description: "Successful guidance provided",
    },
    {
      icon: BookOpen,
      label: "Universities",
      value: "20+",
      color: "text-primary",
      description: "Partner institutions worldwide",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "85%",
      color: "text-primary",
      description: "Student admission success",
    },
    {
      icon: Globe,
      label: "Cities Covered",
      value: "20+",
      color: "text-primary",
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
      name: "Sahil Lohana",
      role: "Founder & CEO",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sahil Lohana founded Guide Grad with a vision to democratize access to quality education guidance. Her extensive experience in international education has helped thousands of students achieve their dreams.",
      specialties: ["International Admissions", "PhD Guidance", "Research Opportunities"],
      contact: "sahil@guidegrad.pk",
    },
    {
      name: "Ahsan Aslam",
      role: "Co-Founder & Head of Design",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ahsan Aslam leads our student services team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Career Counseling", "University Selection", "Application Strategy"],
      contact: "ahsan@guidegrad.pk",
    },
    {
      name: "Muhammad Moiz",
      role: "Co-Founder & CTO",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Muhammad Moiz leads our student services team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["University Partnerships", "Admission Requirements", "Scholarship Opportunities"],
      contact: "moiz@guidegrad.pk",
    },
    {
      name: "Pireh Memon",
      role: "Content Writer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pireh Memon leads our content writing team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["EdTech Solutions", "Platform Development", "Data Analytics"],
      contact: "pireh@guidegrad.pk",
    },
    {
      name: "Ubaid Raza",
      role: "Student Guidance & Ambassador Support",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ubaid Raza leads our student guidance and ambassador support team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Student Guidance", "Ambassador Support"],
      contact: "ubaid@guidegrad.pk",
    },
    {
      name: "Salwa Qureshi",
      role: "Student Guidance & Ambassador Support",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Salwa Qureshi leads our student guidance and ambassador support team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Student Guidance", "Ambassador Support"],
      contact: "salwa@guidegrad.pk",
    },
    {
      name: "Aqsa Anwar",
      role: "Graphic Designer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Aqsa Anwar leads our graphic design team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Graphic Design"],
      contact: "aqsa@guidegrad.pk",
    },
    {
      name: "Bhawesh Kumar",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Bhawesh Kumar leads our web development team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Web Development"],
      contact: "bhawesh@guidegrad.pk",
    },
    {
      name: "Aqsa Siddique",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Aqsa Siddique leads our web development team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Web Development"],
      contact: "aqsa@guidegrad.pk",
    },
    {
      name: "Ramsha Rameez",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ramsha Rameez leads our web development team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Web Development"],
      contact: "ramsha@guidegrad.pk",
    },
    {
      name: "Sahil Hussain",
      role: "Social Media Manager",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sahil Hussain leads our social media team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Social Media Management"],
      contact: "sahil@guidegrad.pk",
    },
    {
      name: "Sandia",
      role: "Content Creator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sandia leads our content creation team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Content Creation"],
      contact: "sandia@guidegrad.pk",
    },
    {
      name: "Muhammad Hasnain",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Muhammad Hasnain leads our operations and team coordination team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Operations", "Team Coordination"],
      contact: "hasnain@guidegrad.pk",
    },
    {
      name: "Samad Memon",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Samad Memon leads our operations and team coordination team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Operations", "Team Coordination"],
      contact: "samad@guidegrad.pk",
    },
    {
      name: "Muhammad Azeem",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Muhammad Azeem leads our operations and team coordination team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Operations", "Team Coordination"],
      contact: "azeem@guidegrad.pk",
    },
    {
      name: "Faraz Hussain",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Faraz Hussain leads our public relations team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Public Relations"],
      contact: "faraz@guidegrad.pk",
    },
    {
      name: "Muqaddas Riaz",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Muqaddas Riaz leads our public relations team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Public Relations"],
      contact: "muqaddas@guidegrad.pk",
    },
    {
      name: "Anees Hussain",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Anees Hussain leads our public relations team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Public Relations"],
      contact: "anees@guidegrad.pk",
    },
    {
      name: "Ghulam Fatima",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ghulam Fatima leads our public relations team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Public Relations"],
      contact: "fatima@guidegrad.pk",
    },
    {
      name: "Iqra Shoaib",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Iqra Shoaib leads our public relations team with passion and dedication. His counseling expertise ensures every student receives personalized attention and support.",
      specialties: ["Public Relations"],
      contact: "iqra@guidegrad.pk",
    },
  ]

  const milestones = [
    {
      year: "2024",
      event: "Guide Grad founded with a vision to democratize education guidance",
      details: "Started with a small team of 3 students from MUET Jamshoro",
      impact: "Helped first 100 students",
    },
    {
      year: "2025",
      event: "Launched ambassador program with 20 student ambassadors",
      details: "Expanded reach through peer-to-peer guidance network",
      impact: "Reached 200+ students across Pakistan",
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
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">About Guide Grad</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students to make informed decisions about their education journey
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`mx-1 ${activeTab === tab.id ? "bg-primary text-white" : ""}`}
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
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary-light border-primary-light">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To democratize access to quality education by providing comprehensive, personalized guidance that
                    empowers every student to achieve their academic and career aspirations, regardless of their
                    background or circumstances.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary-light border-primary-light">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
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
              <h2 className="text-3xl font-bold text-center text-primary mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary-light p-3 rounded-lg">
                          <value.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                          <p className="text-gray-600 mb-3">{value.description}</p>
                          <p className="text-sm text-gray-500">{value.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Expert Team</h2>
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
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary-light"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                        <p className="text-primary font-semibold mb-2">{member.role}</p>
                        <p className="text-sm text-gray-600 mb-2">{member.education}</p>
                        <p className="text-sm text-gray-700 mb-4">{member.bio}</p>

                        <div className="mb-4">
                          <h4 className="font-semibold text-primary mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
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
              <h2 className="text-3xl font-bold text-primary mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From a small startup to Pakistan's leading education consultancy, here's how we've grown and evolved
                over the years.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>

                    <Card className="flex-1 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-primary">{milestone.year}</h3>
                          <Badge variant="outline">{milestone.impact}</Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-primary mb-2">{milestone.event}</h4>
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
              <h2 className="text-3xl font-bold text-primary mb-4">What Our Students Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our successful students have to say about their experience
                with Guide Grad.
              </p>
            </div>

            {/* Featured Testimonial */}
            <Card className="bg-primary-light border-primary-light">
              <CardContent className="p-8">
                <div className="text-center">
                  <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
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
                      <h4 className="font-bold text-primary">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-primary">{testimonials[currentTestimonial].role}</p>
                      <p className="text-sm text-gray-500">{testimonials[currentTestimonial].year}</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
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
                  className={`hover:shadow-lg transition-all duration-300 ${index === currentTestimonial ? "ring-2 ring-primary" : ""}`}
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
                            <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                            <p className="text-primary">{testimonial.role}</p>
                            <p className="text-xs text-gray-500">{testimonial.year}</p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-primary fill-current" />
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
                    index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-primary text-white mt-12">
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
              <Link href="/contact">
                <Button size="lg" variant="secondary">
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
