'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function PDFUploadPage() {
  const [vacancies, setVacancies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedVacancy, setSelectedVacancy] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
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
          .select('id, email')
          .eq('id', session.user.id)
          .single()

        if (adminError || !adminData) {
          await supabase.auth.signOut()
          router.push('/admin/login')
          return
        }

        // Fetch admin's vacancies
        const { data: vacanciesData, error: vacanciesError } = await supabase
          .from('vacancies')
          .select('id, job_title, company_name, state')
          .eq('admin_id', adminData.id)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })

        if (!vacanciesError && vacanciesData) {
          setVacancies(vacanciesData)
        }
      } catch (err) {
        setMessage({ type: 'error', text: (err as Error).message })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Please select a PDF file' })
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' })
        return
      }
      setFile(selectedFile)
      setMessage(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedVacancy) {
      setMessage({ type: 'error', text: 'Please select a vacancy' })
      return
    }

    if (!file) {
      setMessage({ type: 'error', text: 'Please select a PDF file' })
      return
    }

    setUploading(true)
    try {
      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('pdf-uploads')
        .upload(`vacancies/${selectedVacancy}/${fileName}`, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('pdf-uploads')
        .getPublicUrl(`vacancies/${selectedVacancy}/${fileName}`)

      // Save PDF record to database
      const { error: insertError } = await supabase
        .from('pdf_uploads')
        .insert([
          {
            vacancy_id: selectedVacancy,
            file_url: publicUrl,
            original_filename: file.name,
            file_size: file.size
          }
        ])

      if (insertError) throw insertError

      setMessage({ type: 'success', text: 'PDF uploaded successfully!' })
      setFile(null)
      setSelectedVacancy('')
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: (err as Error).message })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-foreground/20 border-t-primary mx-auto mb-4 animate-spin" />
            <p className="text-foreground/60">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground/5 border-b border-foreground/10 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Upload PDF</h1>
              <p className="text-foreground/60 text-sm">Upload vacancy documents</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 font-medium transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-secondary/10 text-secondary'
                : 'bg-destructive/10 text-destructive'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Select Vacancy */}
            <div>
              <label htmlFor="vacancy" className="block text-sm font-medium text-foreground mb-2">
                Select Vacancy <span className="text-destructive">*</span>
              </label>
              <select
                id="vacancy"
                value={selectedVacancy}
                onChange={(e) => setSelectedVacancy(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Choose a vacancy...</option>
                {vacancies.map((vacancy) => (
                  <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.job_title} - {vacancy.company_name}
                  </option>
                ))}
              </select>
              {vacancies.length === 0 && (
                <p className="text-sm text-foreground/60 mt-2">
                  No vacancies found.{' '}
                  <Link href="/admin/vacancies/new" className="text-primary hover:underline">
                    Create one first
                  </Link>
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="pdf" className="block text-sm font-medium text-foreground mb-2">
                PDF File <span className="text-destructive">*</span>
              </label>
              <div className="border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center hover:border-foreground/40 transition-colors cursor-pointer">
                <input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label htmlFor="pdf" className="cursor-pointer">
                  {file ? (
                    <>
                      <p className="text-foreground font-medium">{file.name}</p>
                      <p className="text-foreground/60 text-sm">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-primary text-sm mt-2">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-foreground/60">
                        <span className="text-primary font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-foreground/40 text-sm mt-1">PDF file, max 10MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={uploading || !selectedVacancy || !file}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>

            <Link
              href="/admin/dashboard"
              className="block text-center px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 font-medium transition-colors"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
