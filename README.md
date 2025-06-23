**Note: This project is not for use.**

# Guide Grad

Guide Grad is a comprehensive platform designed to support Pakistani students in navigating their higher education journey. It provides university information, scholarship opportunities, ambassador connections, personalized consultations, and more—all in one place.

---

## Features

- **Landing Page:**
  - Hero section for Pakistani students
  - Quick access to sign up and book free consultations
  - Highlights: university guidance, student ambassadors, personalized support, testimonials, and stats

- **Universities:**
  - Explore 20+ top universities in Pakistan
  - Search and filter by name or program
  - Save favorite universities (for authenticated users)
  - View details, eligibility, and fee structure (PDFs/images)

- **Ambassadors:**
  - Connect with 20+ student ambassadors from various universities
  - View ambassador profiles, specialties, and bios
  - Message ambassadors (feature in development)

- **Scholarships:**
  - Browse 150+ scholarships with deadlines, amounts, and eligibility
  - Filter by field, level, and type
  - View details and apply via external links

- **Book a Consultation:**
  - Schedule a free session with education experts
  - Choose consultation type, method, and preferred date
  - Receive personalized guidance and a custom roadmap

- **Feedback & Contact:**
  - Share feedback to help improve the platform
  - Contact the team via form or email (24/7 response)

- **Admin Dashboard:**
  - Manage contact, booking, and feedback submissions
  - Secure admin authentication

- **Other Pages:**
  - About (mission, values, team)
  - Privacy Policy, Terms of Service, Forget Password, etc.

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components:** Custom + Radix UI primitives
- **Backend:** Firebase (Firestore, Auth, Admin SDK), Node.js
- **APIs:** RESTful endpoints for universities, scholarships, ambassadors, bookings, contact, and auth
- **State Management:** React hooks
- **Other:**
  - Dynamic imports for modals and forms
  - Form validation with React Hook Form and Zod
  - Date handling with date-fns
  - Charts with Recharts
  - Email and booking integrations

---

## Assets

- University logos, eligibility PDFs, and fee structures
- Ambassador and team member images
- Brand assets (logos, icons)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Configure Firebase:**
   - Add your Firebase credentials in `lib/firebase.ts` and `lib/firebase-admin.ts`.

---

## Author

Made by **Muhammad Moiz** aka [httpsmojojojo](https://github.com/httpsmojojojo)

---

## License

This project is for educational and non-commercial use only.
