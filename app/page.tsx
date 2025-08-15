'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to dashboard as the default application
    router.push('/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="text-2xl font-semibold">Loading Application...</div>
        <div className="text-muted-foreground">Redirecting to dashboard</div>
      </div>
    </div>
  )
}