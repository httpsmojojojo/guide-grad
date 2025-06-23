import type React from "react"
import { use } from "react"
import dynamic from "next/dynamic"

interface UniversityDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const UniversityDetailClient = dynamic(() => import("./UniversityDetailClient").then(m => ({ default: m.default })), { loading: () => <div>Loading university details...</div> })

export default function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { id } = use(params)
  return <UniversityDetailClient id={id} />
}
