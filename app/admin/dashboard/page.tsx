'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { signOutAdmin } from '@/lib/auth'
import { getAdminVacancies } from '@/lib/vacancy'
import { Vacancy } from '@/types'

export default function AdminDashboard() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [adminId, setAdminId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        router.push('/admin/login')
        return
      }

      setAdminId(session.user.id)

      const result = await getAdminVacancies(session.user.id)
      if (result.success) {
        setVacancies(result.vacancies)
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await signOutAdmin()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <p className="text-foreground/60">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground/5 border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/60">Manage your job vacancies</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Vacancies</h2>
          <a
            href="/admin/vacancies/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            + New Vacancy
          </a>
        </div>

        {vacancies.length === 0 ? (
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-12 text-center">
            <p className="text-foreground/60">No vacancies yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-foreground/5 rounded-lg border border-foreground/10 p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{vacancy.job_title}</h3>
                    <p className="text-foreground/60">{vacancy.company_name} • {vacancy.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vacancy.published
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-foreground/10 text-foreground/60'
                  }`}>
                    {vacancy.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/admin/vacancies/${vacancy.id}`}
                    className="px-3 py-1 bg-primary/20 text-primary rounded hover:opacity-80 text-sm"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => {/* Handle delete */}}
                    className="px-3 py-1 bg-destructive/20 text-destructive rounded hover:opacity-80 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
