import { FeedbackForm } from "./FeedbackForm"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
          <p className="text-gray-600 mb-8">
            Your feedback helps us improve Guide Grad and provide better services to Pakistani students.
          </p>
          <FeedbackForm />
        </div>
      </div>
    </div>
  )
} 