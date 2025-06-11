import type React from "react"
import { use } from "react"
import UniversityDetailClient from "./UniversityDetailClient"

interface UniversityDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { id } = use(params)
  return <UniversityDetailClient id={id} />
}
