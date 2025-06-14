'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function TermsOfServicePage() {
  const router = useRouter()

  // Format date in a consistent way for both server and client
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">Terms of Service</h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using Guide Grad
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl text-primary">Terms of Service</CardTitle>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last updated: {lastUpdated}
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                By accessing and using Guide Grad, you agree to be bound by these Terms of Service.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl text-primary">Use License</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Permission is granted to temporarily access our services for personal, non-commercial use. This license does not include:
                </p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                  <li>Modifying or copying our materials</li>
                  <li>Using our materials for commercial purposes</li>
                  <li>Attempting to reverse engineer our software</li>
                  <li>Removing any copyright or proprietary notations</li>
                  <li>Transferring materials to another person</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  As a user of Guide Grad, you agree to:
                </p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Use our services in compliance with all applicable laws</li>
                  <li>Not engage in any unauthorized access or use</li>
                  <li>Not interfere with the proper functioning of our services</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The materials on Guide Grad's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">Limitations</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                In no event shall Guide Grad or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if we have been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">Revisions and Errata</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The materials appearing on Guide Grad's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-primary">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                Email: guidegrad1@gmail.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
