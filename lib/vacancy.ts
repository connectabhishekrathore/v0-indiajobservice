import { supabase } from '@/lib/supabase'
import { Vacancy, ExtractedPDFData } from '@/types'

export async function createVacancy(adminId: string, data: Partial<Vacancy>) {
  try {
    const { data: vacancy, error } = await supabase
      .from('vacancies')
      .insert([
        {
          admin_id: adminId,
          ...data
        }
      ])
      .select()

    if (error) throw error
    return { success: true, vacancy: vacancy?.[0] }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function updateVacancy(vacancyId: string, adminId: string, data: Partial<Vacancy>) {
  try {
    const { data: vacancy, error } = await supabase
      .from('vacancies')
      .update(data)
      .eq('id', vacancyId)
      .eq('admin_id', adminId)
      .select()

    if (error) throw error
    return { success: true, vacancy: vacancy?.[0] }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteVacancy(vacancyId: string, adminId: string, softDelete = true) {
  try {
    if (softDelete) {
      const { data: vacancy, error } = await supabase
        .from('vacancies')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', vacancyId)
        .eq('admin_id', adminId)
        .select()

      if (error) throw error
      return { success: true, vacancy: vacancy?.[0] }
    } else {
      const { error } = await supabase
        .from('vacancies')
        .delete()
        .eq('id', vacancyId)
        .eq('admin_id', adminId)

      if (error) throw error
      return { success: true }
    }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function getAdminVacancies(adminId: string) {
  try {
    const { data: vacancies, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('admin_id', adminId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, vacancies: vacancies || [] }
  } catch (error) {
    return { success: false, error: (error as Error).message, vacancies: [] }
  }
}

export async function getVacancyById(vacancyId: string) {
  try {
    const { data: vacancy, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('id', vacancyId)
      .single()

    if (error) throw error
    return { success: true, vacancy }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function publishVacancy(vacancyId: string, adminId: string) {
  return updateVacancy(vacancyId, adminId, { published: true })
}

export async function unpublishVacancy(vacancyId: string, adminId: string) {
  return updateVacancy(vacancyId, adminId, { published: false })
}
