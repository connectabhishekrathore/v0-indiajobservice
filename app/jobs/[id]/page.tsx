'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getVacancyWithResources } from '@/lib/public'
import { hasUserPurchasedPDF } from '@/lib/payments'
import RazorpayPaymentButton from '@/components/RazorpayPaymentButton'
import { Vacancy, Resource, PDFUpload } from '@/types'

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const [paramId, setParamId] = useState<string>('')
  const [vacancy, setVacancy] = useState<Vacancy | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [pdfs, setPdfs] = useState<(PDFUpload & { purchased?: boolean })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(p => setParamId(p.id))
  }, [params])

  useEffect(() => {
    if (!paramId) return

    const loadData = async () => {
      setLoading(true)
      const result = await getVacancyWithResources(paramId)

      if (result.success) {
        setVacancy(result.vacancy)
        setResources(result.resources || [])

        // Check purchase status for each PDF
        const email = localStorage.getItem('userEmail') || ''

        if (result.pdfs) {
          const pdfWithStatus = await Promise.all(
            result.pdfs.map(async (pdf) => {
              const purchaseResult = await hasUserPurchasedPDF(email, pdf.id)
              return { ...pdf, purchased: purchaseResult.purchased }
            })
          )
          setPdfs(pdfWithStatus)
        }
      }

      setLoading(false)
    }

    loadData()
  }, [paramId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <p className="text-foreground/60">Loading job details...</p>
        </div>
      </main>
    )
  }

  if (!vacancy) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
          <Link href="/jobs" className="text-primary hover:underline">
            Back to listings
          </Link>
        </div>
      </main>
    )
  }

  const globalResources = resources.filter(r => r.scope === 'global')
  const vacancyResources = resources.filter(r => r.scope === 'vacancy-specific')

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground/5 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/jobs" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to listings
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{vacancy.job_title}</h1>
          <p className="text-lg text-foreground/60">{vacancy.company_name}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Details */}
            <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Job Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60">Location</p>
                  <p className="font-semibold text-foreground">{vacancy.location}, {vacancy.state}</p>
                </div>
                {vacancy.salary_range_min && vacancy.salary_range_max && (
                  <div>
                    <p className="text-sm text-foreground/60">Salary Range</p>
                    <p className="font-semibold text-foreground">
                      ₹{(vacancy.salary_range_min / 100000).toFixed(1)}L - ₹{(vacancy.salary_range_max / 100000).toFixed(1)}L
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-foreground/60">Application Deadline</p>
                  <p className="font-semibold text-foreground">
                    {new Date(vacancy.application_deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            {vacancy.description && (
              <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-foreground/80 whitespace-pre-wrap">{vacancy.description}</p>
              </section>
            )}

            {/* Eligibility */}
            {vacancy.eligibility && (
              <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                <div className="space-y-3">
                  {(vacancy.eligibility as any)?.age_limit && (
                    <div>
                      <p className="text-sm text-foreground/60">Age Limit</p>
                      <p className="text-foreground">{(vacancy.eligibility as any).age_limit}</p>
                    </div>
                  )}
                  {(vacancy.eligibility as any)?.experience_required && (
                    <div>
                      <p className="text-sm text-foreground/60">Experience Required</p>
                      <p className="text-foreground">{(vacancy.eligibility as any).experience_required}</p>
                    </div>
                  )}
                  {(vacancy.eligibility as any)?.qualifications?.length > 0 && (
                    <div>
                      <p className="text-sm text-foreground/60">Qualifications</p>
                      <ul className="list-disc list-inside text-foreground">
                        {(vacancy.eligibility as any).qualifications.map((q: string, i: number) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Resources */}
            {(vacancyResources.length > 0 || globalResources.length > 0) && (
              <section className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Resources</h2>

                {vacancyResources.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Job-Specific Resources</h3>
                    <div className="space-y-2">
                      {vacancyResources.map(resource => (
                        <div key={resource.id} className="p-3 bg-background rounded border border-foreground/10">
                          <p className="font-medium text-foreground capitalize">
                            {resource.resource_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-foreground/60">{resource.title}</p>
                          {resource.url && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                              Download →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {globalResources.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">General Resources</h3>
                    <div className="space-y-2">
                      {globalResources.map(resource => (
                        <div key={resource.id} className="p-3 bg-background rounded border border-foreground/10">
                          <p className="font-medium text-foreground capitalize">
                            {resource.resource_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-foreground/60">{resource.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar - Apply Section */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Apply Button */}
              <a
                href={vacancy.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 text-center"
              >
                Apply Now
              </a>

              {/* PDFs for Download */}
              {pdfs.length > 0 && (
                <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Download PDFs</h3>
                  <div className="space-y-2">
                    {pdfs.map(pdf => (
                      <div key={pdf.id} className="p-3 bg-background rounded border border-foreground/10">
                        <p className="text-foreground font-medium mb-3 truncate text-sm">{pdf.original_filename}</p>
                        {pdf.purchased ? (
                          <a
                            href={pdf.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 text-center bg-secondary text-secondary-foreground rounded text-sm hover:opacity-90 font-medium"
                          >
                            Download PDF
                          </a>
                        ) : (
                          <RazorpayPaymentButton
                            amount={20}
                            description={`PDF Download: ${pdf.original_filename}`}
                            pdfId={pdf.id}
                            onSuccess={() => {
                              alert('Payment successful! You can now download the PDF.')
                              window.location.reload()
                            }}
                            onError={(error) => {
                              alert(`Payment failed: ${error}`)
                            }}
                            className="w-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
