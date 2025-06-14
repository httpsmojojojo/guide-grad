'use client'

import dynamic from 'next/dynamic'
import { ArrowLeft, LogOut, LayoutDashboard, Menu, X } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const navLinks = [
    { href: "/universities", label: "Universities" },
    { href: "/ambassadors", label: "Ambassadors" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <Button
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 transition-all duration-200"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-primary hover:text-primary/90 px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-700 px-2 py-1 text-left"
                    onClick={() => {
                      handleSignOut()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : pathname !== "/signup" && pathname !== "/login" && (
                <>
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/90 px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 