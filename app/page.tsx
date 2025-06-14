import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Phone, ArrowRight, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { FooterLogo } from "@/components/FooterLogo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-primary-light text-primary border-primary/20">🇵🇰 For Pakistani Students</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your Gateway to
            <span className="text-primary block">Higher Education</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Navigate your path to top universities in Pakistan. Get personalized guidance, connect with
            ambassadors, and make informed decisions about your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-primary-dark text-lg px-8">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/book-call" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg px-8 border-primary text-primary hover:bg-primary-light"
              >
                <Phone className="mr-2 w-5 h-5" />
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Guide Grad?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive support for Pakistani students pursuing higher education
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-primary-light hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-primary">University Guidance</CardTitle>
                <CardDescription>
                  Comprehensive information about top universities in Pakistan and abroad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Admission requirements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Scholarship opportunities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Application deadlines
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary-light hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-primary">Student Ambassadors</CardTitle>
                <CardDescription>
                  Connect with current students and alumni from your target universities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Real experiences
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Immaculate information
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Career guidance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary-light hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-primary">Personalized Support</CardTitle>
                <CardDescription>One-on-one consultations and customized education plans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Free consultations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Custom roadmaps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    24/7 support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-light">Universities Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-primary-light">Students Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-light">Student Ambassadors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-primary-light">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 px-4 bg-primary-light">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Ayesha Khan",
                university: "LUMS",
                text: "Guide Grad helped me navigate the complex admission process. The ambassador program was invaluable!",
              },
              {
                name: "Ahmed Ali",
                university: "IBA Karachi",
                text: "The personalized guidance and scholarship information saved me thousands of rupees.",
              },
              {
                name: "Fatima Sheikh",
                university: "NUST",
                text: "Thanks to Guide Grad, I'm now studying my dream program at NUST. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-primary">{testimonial.university}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg sm:text-xl text-primary-light mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistani students who have successfully navigated their path to higher education with
            Guide Grad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100 text-lg px-8">
                Create Free Account
              </Button>
            </Link>
            <Link href="/book-call" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100 text-lg px-8">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Share Your Feedback</h2>
              <p className="text-gray-600 mb-6">
                Help us improve Guide Grad by sharing your suggestions and feedback about our platform.
              </p>
              <Link href="/feedback" className="block w-full">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Submit Feedback
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="mb-4">
              <FooterLogo />
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
                <li>
                  <Link href="/feedback" className="hover:text-white">
                    Feedback
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
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 guidegrad1@gmail.com</p>
                <p>📞 +92-333-7013724</p>
                <p>📍 Hyderabd, Pakistan</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Guide Grad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
