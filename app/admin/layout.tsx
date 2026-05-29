'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { session, isAdmin } = await getAdminSession()

      if (!session || !isAdmin) {
        router.push('/admin/login')
        return
      }
    }

    checkAdminAuth()
  }, [router])

  return <>{children}</>
}
