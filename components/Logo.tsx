import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  showText?: boolean
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-16 h-16 rounded-lg flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Guide Grad Logo"
          width={64}
          height={64}
          className="w-14 h-14"
        />
      </div>
      {showText && <span className="text-xl font-bold text-primary">Guide Grad</span>}
    </Link>
  )
} 