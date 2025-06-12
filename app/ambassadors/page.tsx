"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Users,
  MapPin,
  BookOpen,
  MessageCircle,
  CalendarIcon,
  Award,
  Send,
  Phone,
  Video,
  Heart,
  Share2,
  Mail,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ambassadorsApi, type Ambassador } from "@/lib/api"
import { toast } from "sonner"
import { SuccessModal } from "@/components/SuccessModal"
import { ErrorModal } from "@/components/ErrorModal"
import { InfoModal } from "@/components/InfoModal"
import { Modal, ModalContent } from "@/components/ui/modal"

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false)
  const [showApplicationsClosedDialog, setShowApplicationsClosedDialog] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isMessageInfoModalOpen, setIsMessageInfoModalOpen] = useState(false)
  const [isApplyInfoModalOpen, setIsApplyInfoModalOpen] = useState(false)

  useEffect(() => {
    loadAmbassadors()
  }, [])

  const loadAmbassadors = async () => {
    try {
      setIsLoading(true)
      const data = await ambassadorsApi.getAmbassadors()
      console.log('Fetched ambassadors:', data)
      setAmbassadors(data)
    } catch (error) {
      toast.error("Failed to load ambassadors")
      setAmbassadors([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const openMessageDialog = () => {
    setIsMessageInfoModalOpen(true)
  }

  const handleApplyClick = () => {
    setIsApplyInfoModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ambassadors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Message Sent!"
        message={`Your message has been sent to ${selectedAmbassador?.name}. They'll respond within 24 hours.`}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
      <InfoModal
        isOpen={isMessageInfoModalOpen}
        onClose={() => setIsMessageInfoModalOpen(false)}
        title="Coming Soon!"
        message="The messaging feature is currently under development. Stay tuned for updates!"
        buttonText="Got it"
      />
      <InfoModal
        isOpen={isApplyInfoModalOpen}
        onClose={() => setIsApplyInfoModalOpen(false)}
        title="Applications Coming Soon!"
        message="We're currently not accepting new applications in our ambassador program. Please check back later!"
        buttonText="Got it"
      />
      <Modal isOpen={showMessageDialog} onClose={() => setShowMessageDialog(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Message to {selectedAmbassador?.name}</h2>
          <p className="text-gray-600 mb-6">
            Send a message to connect with the ambassador. They typically respond within 24 hours.
          </p>
        </div>
      </Modal>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Student Ambassadors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with current students and alumni from your target universities. Get firsthand insights
            and guidance for your academic journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{ambassadors.length}+</div>
              <div className="text-sm text-gray-600">Active Ambassadors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">20+</div>
              <div className="text-sm text-gray-600">Universities Covered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-600">Students Helped</div>
            </CardContent>
          </Card>
        </div>

        {/* Ambassador Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {ambassadors.map((ambassador) => (
            <Card key={ambassador.id} className="hover:shadow-lg transition-all duration-200 group min-h-[390px] flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={ambassador.image || "/placeholder.svg"}
                        alt={ambassador.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {ambassador.name}
                      </CardTitle>
                      <CardDescription>
                        {ambassador.university} • {ambassador.program}
                      </CardDescription>
                      {(ambassador as any).location && (
                        <div className="flex items-center mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{(ambassador as any).location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 h-full">
                <div className="flex flex-col flex-1">
                  <div>
                    <p className="text-sm text-gray-600">{ambassador.bio}</p>
                    <div className="mt-4 min-h-[40px] flex flex-col justify-end">
                      <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {ambassador.specialties.length > 0 ? (
                          ambassador.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-primary-light text-primary">
                              {specialty}
                            </Badge>
                          ))
                        ) : (
                          <span className="invisible">No specialties</span>
                        )}
                        {ambassador.specialties.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-primary-light text-primary">
                            +{ambassador.specialties.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {(ambassador as any).languages && (ambassador as any).languages.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Languages:</p>
                        <div className="flex flex-wrap gap-1">
                          {(ambassador as any).languages.map((lang: string, idx: number) => (
                            <Badge key={lang + idx} variant="secondary" className="text-xs bg-primary-light text-primary whitespace-nowrap">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-auto">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary-dark"
                      onClick={openMessageDialog}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Become an Ambassador</h3>
            <p className="text-primary-light mb-6 max-w-2xl mx-auto">
              Are you a current student or recent graduate? Help other students by sharing your experience and earning
              rewards.
            </p>
            <Button
              onClick={handleApplyClick}
              className="bg-white text-primary hover:bg-primary-light"
            >
              Apply to be an Ambassador
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
