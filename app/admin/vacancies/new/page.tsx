'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Vacancy } from '@/types'

export default function NewVacancyPage() {
  const [adminId, setAdminId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Vacancy>>({
    job_title: '',
    company_name: '',
    location: '',
    state: '',
    salary_range_min: undefined,
    salary_range_max: undefined,
    application_deadline: '',
    application_link: '',
    description: '',
    published: false,
    eligibility: {
      qualifications: [],
      age_limit: '',
      experience_required: ''
    },
    selection_process: {
      exam_details: '',
      interview_details: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user?.id) {
          router.push('/admin/login')
          return
        }

        // Verify admin status
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id')
          .eq('id', session.user.id)
          .single()

        if (adminError || !adminData) {
          await supabase.auth.signOut()
          router.push('/admin/login')
          return
        }

        setAdminId(adminData.id)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setPageLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || undefined : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!adminId) throw new Error('Admin not authenticated')

      const deadlineDate = new Date(formData.application_deadline!)
      if (isNaN(deadlineDate.getTime())) {
        throw new Error('Invalid deadline date')
      }

      const { error: insertError } = await supabase
        .from('vacancies')
        .insert([
          {
            admin_id: adminId,
            job_title: formData.job_title,
            company_name: formData.company_name,
            location: formData.location,
            state: formData.state,
            salary_range_min: formData.salary_range_min,
            salary_range_max: formData.salary_range_max,
            eligibility: formData.eligibility,
            selection_process: formData.selection_process,
            application_deadline: deadlineDate.toISOString(),
            application_link: formData.application_link,
            description: formData.description,
            published: false
          }
        ])

      if (insertError) throw insertError

      router.push('/admin/dashboard')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-foreground/20 border-t-primary mx-auto mb-4 animate-spin" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-foreground/5 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Create New Vacancy</h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 font-medium"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-foreground mb-2">
                  Job Title <span className="text-destructive">*</span>
                </label>
                <input
                  id="job_title"
                  name="job_title"
                  value={formData.job_title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-foreground mb-2">
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="company_name"
                    name="company_name"
                    value={formData.company_name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                    State <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                  Location/City <span className="text-destructive">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="salary_range_min" className="block text-sm font-medium text-foreground mb-2">
                    Min Salary (₹)
                  </label>
                  <input
                    id="salary_range_min"
                    name="salary_range_min"
                    type="number"
                    value={formData.salary_range_min || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="salary_range_max" className="block text-sm font-medium text-foreground mb-2">
                    Max Salary (₹)
                  </label>
                  <input
                    id="salary_range_max"
                    name="salary_range_max"
                    type="number"
                    value={formData.salary_range_max || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Application Details */}
          <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Application Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="application_deadline" className="block text-sm font-medium text-foreground mb-2">
                  Deadline <span className="text-destructive">*</span>
                </label>
                <input
                  id="application_deadline"
                  name="application_deadline"
                  type="datetime-local"
                  value={formData.application_deadline || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="application_link" className="block text-sm font-medium text-foreground mb-2">
                  Apply Link <span className="text-destructive">*</span>
                </label>
                <input
                  id="application_link"
                  name="application_link"
                  type="url"
                  value={formData.application_link || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/apply"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Full job description"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 font-medium transition-opacity"
            >
              {loading ? 'Creating...' : 'Create Vacancy'}
            </button>
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
