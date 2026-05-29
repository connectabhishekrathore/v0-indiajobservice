'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { createVacancy } from '@/lib/vacancy'
import { uploadPDF } from '@/lib/pdf'
import { Vacancy } from '@/types'

export default function NewVacancyPage() {
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

  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || undefined : value
    }))
  }

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [name]: value
      } as any
    }))
  }

  const handleSelectionProcessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      selection_process: {
        ...prev.selection_process,
        [name]: value
      } as any
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        router.push('/admin/login')
        return
      }

      // Create vacancy
      const result = await createVacancy(session.user.id, {
        ...formData,
        application_deadline: new Date(formData.application_deadline!).toISOString()
      })

      if (!result.success) throw new Error(result.error)

      const vacancyId = result.vacancy?.id

      // Upload PDF if provided
      if (pdfFile && vacancyId) {
        const pdfResult = await uploadPDF(pdfFile, vacancyId)
        if (!pdfResult.success) {
          console.warn('PDF upload failed:', pdfResult.error)
        }
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError((err as Error).message)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-foreground/5 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Create New Vacancy</h1>
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
                  Job Title *
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
                    Company Name *
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
                    State *
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
                  Location/City *
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
                    Salary Range Min (₹)
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
                    Salary Range Max (₹)
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

          {/* Eligibility */}
          <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Eligibility</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="age_limit" className="block text-sm font-medium text-foreground mb-2">
                  Age Limit
                </label>
                <input
                  id="age_limit"
                  name="age_limit"
                  value={(formData.eligibility as any)?.age_limit || ''}
                  onChange={handleEligibilityChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 18-35 years"
                />
              </div>

              <div>
                <label htmlFor="experience_required" className="block text-sm font-medium text-foreground mb-2">
                  Experience Required
                </label>
                <input
                  id="experience_required"
                  name="experience_required"
                  value={(formData.eligibility as any)?.experience_required || ''}
                  onChange={handleEligibilityChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 2 years"
                />
              </div>

              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-foreground mb-2">
                  Qualifications
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={(formData.eligibility as any)?.qualifications?.join(', ') || ''}
                  onChange={(e) => {
                    const quals = e.target.value.split(',').map(q => q.trim()).filter(q => q)
                    setFormData(prev => ({
                      ...prev,
                      eligibility: {
                        ...prev.eligibility,
                        qualifications: quals
                      } as any
                    }))
                  }}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter qualifications separated by comma"
                />
              </div>
            </div>
          </section>

          {/* Selection Process */}
          <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Selection Process</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="exam_details" className="block text-sm font-medium text-foreground mb-2">
                  Exam Details
                </label>
                <textarea
                  id="exam_details"
                  name="exam_details"
                  value={(formData.selection_process as any)?.exam_details || ''}
                  onChange={handleSelectionProcessChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="interview_details" className="block text-sm font-medium text-foreground mb-2">
                  Interview Details
                </label>
                <textarea
                  id="interview_details"
                  name="interview_details"
                  value={(formData.selection_process as any)?.interview_details || ''}
                  onChange={handleSelectionProcessChange}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* Application & PDF */}
          <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Application & Documents</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="application_deadline" className="block text-sm font-medium text-foreground mb-2">
                  Application Deadline *
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
                  Application Link *
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
                />
              </div>

              <div>
                <label htmlFor="pdf" className="block text-sm font-medium text-foreground mb-2">
                  Upload Vacancy PDF (optional)
                </label>
                <input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 font-medium"
            >
              {loading ? 'Creating...' : 'Create Vacancy'}
            </button>
            <a
              href="/admin/dashboard"
              className="px-6 py-2 bg-foreground/10 text-foreground rounded-lg hover:opacity-80"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}
