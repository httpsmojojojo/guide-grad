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
  Mail,
  Phone,
  ArrowLeft,
  Calendar,
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
      image: "/team/sahil-lohana.png",
      bio: "Sahil Lohana, the pioneering founder of GuideGrad, is committed to equipping students with personalized career guidance. His goal is to bridge the gap between aspirations and accomplishments, helping young people confidently determine their futures.",
      specialties: ["Student-Centric Innovation", "Vision-Driven Leadership", "Education Access Advocacy"],
    },
    {
      name: "Ahsan Aslam",
      role: "Co-Founder & Head of Design",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/ahsan-aslam.png",
      bio: "Ahsan Aslam, Co-founder of GuideGrad, plays a significant role in shaping our strategic path and community involvement. He is dedicated to creating a supportive environment where every student gets the personalized guidance required to achieve their professional aspirations.",
      specialties: ["Experience-Centered Design", "Strategic Visual Communication", "Inclusive Brand Identity"],
    },
    {
      name: "Muhammad Moiz",
      role: "Co-Founder & CTO",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/muhammad-moiz.png",
      bio: "Mohammad Moiz, Co-founder and CTO of GuideGrad, is the technological mastermind behind our mission to personalize career counseling. He guarantees the platform delivers innovative and smooth experiences, enabling students to explore their futures confidently.",
      specialties: ["Technological Innovation", "Platform Development", "User-Centric Solutions"],
    },
    {
      name: "Pireh Memon",
      role: "Content Writer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/pireh-memon.png",
      bio: "Pireh Memon, GuideGrad's Content Writer, simplifies career choices for better understanding. She writes straight-forward, informative articles and guides, providing students with the information required to pick the best path for their future.",
      specialties: ["Career Guidance Writing", "Educational Simplification", "Student-Focused Content"],
    },
    {
      name: "Ubaid Raza",
      role: "Student Guidance & Ambassador Support",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/ubaid-raza.png",
      bio: "Ubaid Raza, an essential part of our Student Guidance & Ambassador Support team, is determined to directly helping students with their career choices. He actively promotes our ambassador network, ensuring thorough outreach and support for every student looking for mentorship.",
      specialties: ["Direct Student Support", "Ambassador Mobilization", "Personalized Career Pathways"],
    },
    {
      name: "Salwa Qureshi",
      role: "Student Guidance & Ambassador Support",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/salwa-qureshi.png",
      bio: "Salwa Qureshi, our lead for Student Guidance & Ambassador Support, is leading the efforts to empower students through tailored guidance. She expertly nurtures our ambassador community, ensuring each student receives personalized assistance and support throughout their career patht.",
      specialties: ["Personalized Mentorship", "Student Empowerment", "Ambassador Engagement"],
    },
    {
      name: "Aqsa Anwar",
      role: "Graphic Designer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/aqsa-anwar.png",
      bio: "Aqsa brings creativity to life as a graphics designer, producing visually compelling designs for various platforms. Her artistic vision ensures that all visuals align with the organization's brand.",
      specialties: ["Educational Visuals", "Student-Focused Branding", "Creative Storytelling"],
    },
    {
      name: "Bhawesh Kumar",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/bhawesh-kumar.png",
      bio: "Bhavesh is a talented web developer known for creating efficient and dynamic websites. His expertise in coding and development ensures the creation of responsive and functional online platforms.",
      specialties: ["Career Platform Development", "Scalable Web Solutions", "Performance-Driven Coding"],
    },
    {
      name: "Aqsa Siddique",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/aqsa-siddique.png",
      bio: "Aqsa Siddique, GuideGrad's talented Web Developer, designs our user-friendly online platform. She creates and maintains the digital space where students access essential resources and engage with mentors, ensuring a smooth and efficient experience.",
      specialties: ["Student-Friendly Interfaces", "Platform Usability", "Web-Based Learning Tools"],
    },
    {
      name: "Ramsha Rameez",
      role: "Web Developer",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/ramsha-rameez.png",
      bio: "Ramsha is a skilled web developer, dedicated to crafting functional and visually engaging websites. Her technical expertise ensures smooth user experiences and well-executed digital solutions.",
      specialties: ["Career Resource Integration", "User-Centric Design", "Frontend Functionality"],
    },
    {
      name: "Sahil Hussain",
      role: "Social Media Manager",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/sahil-hussain.png",
      bio: "Sahil Hussain, our Social Media Management lead, makes sure GuideGrad's message is delivered to students everywhere. He utilizes social media to connect with young individuals and share valuable career advice in an appealing manner.",
      specialties: ["Digital Student Engagement", "Social Awareness Campaigns", "Educational Content Promotion"],
    },
    {
      name: "Sandia",
      role: "Content Creator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/sandia.png",
      bio: "Sandia is a talented content creator who crafts engaging digital content for diverse audiences. Her creative approach helps bring fresh perspectives to every project she works on.",
      specialties: ["Engaging Educational Media", "Creative Communication", "Student Interaction Design"],
    },
    {
      name: "Muhammad Hasnain",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/muhammad-hasnain.png",
      bio: "Muhammad Hasnain, an integral Operations & Team Co-ordinator at GuideGrad, plays a crucial role in our smooth internal workings and partnership mindset. He dedicates himself to guaranteeing our team operates smoothly, enabling us to consistently deliver exceptional career mentorship to students",
      specialties: ["Internal Process Structuring", "Strategic Collaboration", "Student-Focused Coordination"],
    },
    {
      name: "Samad Memon",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/samad-memon.png",
      bio: "Samad Memon, GuideGrad's Operations & Team Co-ordinator, is the organizational backbone that ensures uninterrupted execution of our mentorship initiatives. He skillfully manages our internal efforts, empowering our team to provide exceptional, personalized guidance to each student.",
      specialties: ["Workflow Optimization", "Team Enablement", "Program Efficiency"],
    },
    {
      name: "Muhammad Azeem",
      role: "Operations & Team Co-ordinator",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/muhammad-azeem.png",
      bio: "Muhammad Azeem, an Operations & Team Co-ordinator at GuideGrad, is crucial in improving our operational flow and nurturing teamwork. He guarantees that every aspect of our operations functions efficiently, allowing us to consistently fulfill our commitment to personlized student mentorship.",
      specialties: ["Team Alignment", "Program Execution", "Operational Scalability"],
    },
    {
      name: "Faraz Hussain",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/faraz-hussain.png",
      bio: "Faraz is dedicated to enhancing the organization's presence through powerful public relations campaigns. Her expertise in media and communications helps maintain a strong, consistent brand image.",
      specialties: ["Public Relations Strategy", "Media Relations Management", "Brand Awareness Enhancement"],
    },
    {
      name: "Muqaddas Riaz",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/muqaddas-riaz.png",
      bio: "Muqaddas is focused on promoting the organization through impactful public relations campaigns. Her skill in managing communicationq and media ensures a strong and consistent public image.",
      specialties: ["Public Messageing Strategy", "Media Engagement", "Communication Outreach"],
    },
    {
      name: "Anees Hussain",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/anees-hussain.png",
      bio: "Anees specializes in building strategic partnerships and maintaining positive media relations. His expertise helps the organization connect effectively with its audience and stakeholders.",
      specialties: ["Institutional Partnerships", "Educational Campaigns", "Relationship Management"],
    },
    {
      name: "Ghulam Fatima",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/ghulam-fatima.png",
      bio: "As a public relations expert, Ghulam Fatima manages the organization's reputation and builds strong relationships with the media. Her efforts help to maintain a positive public image and strategic communications.",
      specialties: ["Educational PR Strategy", "Institutional Communication", "Brand Credibility Building"],
    },
    {
      name: "Iqra Shoaib",
      role: "Public Relations",
      education: "BS Computer Science, MUET Jamshoro",
      image: "/team/iqra-shoaib.png",
      bio: "Iqra is a proactive public relations professional who manages media relationships and strengthens brand presence. Her communication skills play a crucial role in enhancing the organization's reputation.",
      specialties: ["Youth-Centric Messaging", "Media Coordination", "Advocacy Communication"],
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
      role: "Computer Science Student at IBA Karachi",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "From application strategy to interview preparation, Guide Grad was with me every step of the way. Highly recommended!",
      rating: 5,
      year: "Class of 2024",
    },
    {
      name: "Omar Sheikh",
      role: "Mechanical Engineering Student at MUET Jamshoro",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Guide Grad's guidance program helped me secure admission to MUET Jamshoro. Their expertise is unmatched.",
      rating: 4,
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
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">About Guide Grad</h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students to make informed decisions about their educational future
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-primary-light">
              <CardContent className="p-4 sm:p-6">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-primary-light">
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-primary-light w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 text-center">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">{value.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{value.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member, index) => (
              <Card key={index} className="border-primary-light">
                <CardContent className="p-4 sm:p-6">
                  <div className="aspect-square w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-1 text-center">{member.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2 text-center">{member.role}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">Our Journey</h2>
          <div className="space-y-4 sm:space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-primary-light">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-light rounded-full p-2 sm:p-3">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-1">{milestone.year}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2">{milestone.event}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{milestone.details}</p>
                      <p className="text-xs sm:text-sm text-primary mt-2">{milestone.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">What Our Students Say</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 text-center max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say about their experience with Guide Grad.
          </p>

          {/* Featured Testimonial */}
          <Card className="bg-primary-light border-primary-light mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-xl text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-primary text-sm sm:text-base">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-primary text-xs sm:text-sm">{testimonials[currentTestimonial].role}</p>
                    <p className="text-xs text-gray-500">{testimonials[currentTestimonial].year}</p>
                  </div>
                </div>
                <div className="flex justify-center mt-3 sm:mt-4">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-current" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`border-primary-light ${index === currentTestimonial ? "ring-2 ring-primary" : ""}`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-primary text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-primary text-xs sm:text-sm">{testimonial.role}</p>
                          <p className="text-xs text-gray-500">{testimonial.year}</p>
                        </div>
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-primary fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm italic">"{testimonial.content}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
