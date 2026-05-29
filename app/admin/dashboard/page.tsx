'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { signOutAdmin } from '@/lib/auth'
import { getAdminVacancies, deleteVacancy, togglePublishVacancy } from '@/lib/vacancy'
import { Vacancy } from '@/types'

export default function AdminDashboard() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [adminId, setAdminId] = useState<string | null>(null)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        router.push('/admin/login')
        return
      }

      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('id, email')
        .eq('id', session.user.id)
        .single()

      if (adminError || !adminData) {
        router.push('/admin/login')
        return
      }

      setAdminId(session.user.id)
      setAdminEmail(adminData.email)

      const result = await getAdminVacancies(session.user.id)
      if (result.success) {
        setVacancies(result.vacancies)
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleDelete = async (vacancyId: string) => {
    if (!confirm('Are you sure you want to delete this vacancy?')) return

    setDeleting(vacancyId)
    const result = await deleteVacancy(vacancyId)

    if (result.success) {
      setVacancies(vacancies.filter(v => v.id !== vacancyId))
    } else {
      alert('Error deleting vacancy: ' + result.error)
    }
    setDeleting(null)
  }

  const handleTogglePublish = async (vacancy: Vacancy) => {
    const result = await togglePublishVacancy(vacancy.id, !vacancy.published)

    if (result.success) {
      setVacancies(vacancies.map(v =>
        v.id === vacancy.id ? { ...v, published: !v.published } : v
      ))
    } else {
      alert('Error updating vacancy: ' + result.error)
    }
  }

  const handleLogout = async () => {
    await signOutAdmin()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-foreground/20 border-t-primary mx-auto mb-4 animate-spin" />
            <p className="text-foreground/60">Loading dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground/5 border-b border-foreground/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/60 text-sm">{adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 font-medium transition-opacity"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Vacancies</p>
            <p className="text-3xl font-bold text-foreground">{vacancies.length}</p>
          </div>
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <p className="text-foreground/60 text-sm mb-2">Published</p>
            <p className="text-3xl font-bold text-primary">{vacancies.filter(v => v.published).length}</p>
          </div>
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <p className="text-foreground/60 text-sm mb-2">Drafts</p>
            <p className="text-3xl font-bold text-foreground/60">{vacancies.filter(v => !v.published).length}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Vacancies</h2>
          <Link
            href="/admin/vacancies/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium transition-opacity"
          >
            + Add Vacancy
          </Link>
        </div>

        {/* Vacancies List */}
        {vacancies.length === 0 ? (
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-12 text-center">
            <p className="text-foreground/60 mb-4">No vacancies yet. Create one to get started!</p>
            <Link
              href="/admin/vacancies/new"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              Create First Vacancy
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-foreground/5 rounded-lg border border-foreground/10 p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{vacancy.job_title}</h3>
                    <p className="text-foreground/60 text-sm mb-2">{vacancy.company_name} • {vacancy.location}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-foreground/60">
                        State: <span className="font-medium text-foreground">{vacancy.state}</span>
                      </span>
                      {vacancy.salary_range_min && (
                        <span className="text-foreground/60">
                          Salary: <span className="font-medium text-foreground">
                            ₹{vacancy.salary_range_min.toLocaleString()} - ₹{vacancy.salary_range_max?.toLocaleString()}
                          </span>
                        </span>
                      )}
                      {vacancy.application_link && (
                        <span className="text-foreground/60">
                          <span className="font-medium text-primary">Apply Link: </span>
                          <a 
                            href={vacancy.application_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            External
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4 ${
                    vacancy.published
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-foreground/10 text-foreground/60'
                  }`}>
                    {vacancy.published ? '✓ Published' : 'Draft'}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/admin/vacancies/${vacancy.id}/edit`}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 font-medium transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(vacancy)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                      vacancy.published
                        ? 'bg-foreground/10 text-foreground/60 hover:bg-foreground/20'
                        : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                    }`}
                  >
                    {vacancy.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(vacancy.id)}
                    disabled={deleting === vacancy.id}
                    className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 font-medium transition-colors text-sm disabled:opacity-50"
                  >
                    {deleting === vacancy.id ? 'Deleting...' : 'Delete'}
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
