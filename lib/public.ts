import { supabase } from '@/lib/supabase'
import { Vacancy } from '@/types'

export async function getPublishedVacancies(filters?: {
  state?: string
  salaryMin?: number
  salaryMax?: number
  search?: string
}) {
  try {
    let query = supabase
      .from('vacancies')
      .select('*')
      .eq('published', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (filters?.state) {
      query = query.eq('state', filters.state)
    }

    if (filters?.salaryMin) {
      query = query.gte('salary_range_max', filters.salaryMin)
    }

    if (filters?.salaryMax) {
      query = query.lte('salary_range_min', filters.salaryMax)
    }

    if (filters?.search) {
      query = query.or(
        `job_title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
      )
    }

    const { data: vacancies, error } = await query

    if (error) throw error
    return { success: true, vacancies: vacancies || [] }
  } catch (error) {
    return { success: false, error: (error as Error).message, vacancies: [] }
  }
}

export async function getVacancyWithResources(vacancyId: string) {
  try {
    const { data: vacancy, error: vacancyError } = await supabase
      .from('vacancies')
      .select('*')
      .eq('id', vacancyId)
      .eq('published', true)
      .is('deleted_at', null)
      .single()

    if (vacancyError) throw vacancyError

    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .select('*')
      .or(`scope.eq.global,and(scope.eq.vacancy-specific,vacancy_id.eq.${vacancyId})`)

    if (resourcesError) throw resourcesError

    const { data: pdfs, error: pdfsError } = await supabase
      .from('pdf_uploads')
      .select('*')
      .eq('vacancy_id', vacancyId)

    if (pdfsError) throw pdfsError

    return {
      success: true,
      vacancy,
      resources: resources || [],
      pdfs: pdfs || []
    }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
