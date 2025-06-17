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
          width={128}
          height={128}
          className="w-128 h-128"
        />
      </div>
      {showText && (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">Guide Grad</span>
          <span className="text-sm font-bold text-black">Access | Learn | Excel</span>
        </div>
      )}
    </Link>
  )
} 