'use client'

import dynamic from 'next/dynamic'
import { ArrowLeft, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Logo } from "./Logo"
import { useEffect, useState } from "react"
import { authApi } from "@/lib/api/auth"
import type { User } from "firebase/auth"

const Button = dynamic(() => import("@/components/ui/button").then(mod => mod.Button), {
  ssr: false,
  loading: () => <div className="h-10 w-20 bg-gray-100 rounded-md animate-pulse" />
})

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const isDashboard = pathname.startsWith("/dashboard")
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // Get initial auth state
    setCurrentUser(authApi.getCurrentUser())

    // Set up an interval to check auth state
    const interval = setInterval(() => {
      setCurrentUser(authApi.getCurrentUser())
    }, 1000)

    // Cleanup interval
    return () => clearInterval(interval)
  }, [])

  const handleSignOut = async () => {
    try {
      await authApi.signOut()
      // Clear any stored user data
      localStorage.removeItem("savedUniversities")
      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isHomePage && (
            <Button
              className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 transition-all duration-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          )}
          <Logo />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/universities" className="text-gray-600 hover:text-primary">
            Universities
          </Link>
          <Link href="/ambassadors" className="text-gray-600 hover:text-primary">
            Ambassadors
          </Link>
          <Link href="/scholarships" className="text-gray-600 hover:text-primary">
            Scholarships
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-primary hover:text-primary/90">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : pathname !== "/signup" && pathname !== "/login" && (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-primary hover:text-primary/90">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 