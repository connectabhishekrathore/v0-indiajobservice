'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPublishedVacancies } from '@/lib/public'
import { Vacancy } from '@/types'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

export default function JobListingsPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [state, setState] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')

  useEffect(() => {
    const loadVacancies = async () => {
      setLoading(true)
      const result = await getPublishedVacancies({
        search: search || undefined,
        state: state || undefined,
        salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax) : undefined
      })

      if (result.success) {
        setVacancies(result.vacancies)
      }
      setLoading(false)
    }

    const timer = setTimeout(loadVacancies, 300)
    return () => clearTimeout(timer)
  }, [search, state, salaryMin, salaryMax])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2">Find Your Next Job</h1>
          <p className="text-lg opacity-90">Explore opportunities across India</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                Search Jobs
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, company..."
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                State
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All States</option>
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="salaryMin" className="block text-sm font-medium text-foreground mb-2">
                Min Salary (₹)
              </label>
              <input
                id="salaryMin"
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="Minimum"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="salaryMax" className="block text-sm font-medium text-foreground mb-2">
                Max Salary (₹)
              </label>
              <input
                id="salaryMax"
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="Maximum"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">Loading vacancies...</p>
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-12 bg-foreground/5 rounded-lg border border-foreground/10">
            <p className="text-foreground/60">No vacancies found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {vacancies.map(vacancy => (
              <Link
                key={vacancy.id}
                href={`/jobs/${vacancy.id}`}
              >
                <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{vacancy.job_title}</h3>
                      <p className="text-foreground/60">{vacancy.company_name}</p>
                    </div>
                    {vacancy.salary_range_min && vacancy.salary_range_max && (
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">
                          ₹{(vacancy.salary_range_min / 100000).toFixed(1)}L - ₹{(vacancy.salary_range_max / 100000).toFixed(1)}L
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 text-sm text-foreground/60">
                    <span>{vacancy.location}</span>
                    <span>•</span>
                    <span>{vacancy.state}</span>
                    {vacancy.application_deadline && (
                      <>
                        <span>•</span>
                        <span>
                          Deadline: {new Date(vacancy.application_deadline).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>

                  {vacancy.description && (
                    <p className="text-foreground/70 line-clamp-2 mb-4">
                      {vacancy.description}
                    </p>
                  )}

                  <button className="text-primary hover:underline text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
