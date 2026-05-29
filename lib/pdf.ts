import { supabase } from '@/lib/supabase'
import { PDFUpload, ExtractedPDFData } from '@/types'

export async function uploadPDF(file: File, vacancyId: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('pdf_uploads')
      .upload(`vacancies/${vacancyId}/${fileName}`, file)

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('pdf_uploads')
      .getPublicUrl(data.path)

    // Save to database
    await supabase.from('pdf_uploads').insert([
      {
        vacancy_id: vacancyId,
        file_url: urlData.publicUrl,
        original_filename: file.name,
        file_size: file.size
      }
    ])

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function extractPDFText(file: File): Promise<string> {
  try {
    // For now, return file name. In production, use pdfjs-dist or an OCR service
    return `Extracted from: ${file.name}`
  } catch (error) {
    throw error
  }
}

export async function extractVacancyDataFromPDF(pdfText: string): Promise<ExtractedPDFData> {
  try {
    // Call Claude or Grok API to extract structured data
    // This is a placeholder - implement with actual AI extraction
    return {
      job_title: 'Job Title from PDF',
      company_name: 'Company Name',
      location: 'Location',
      state: 'State',
      eligibility: {
        qualifications: [],
        age_limit: '',
        experience_required: ''
      },
      selection_process: {
        exam_details: '',
        interview_details: ''
      }
    }
  } catch (error) {
    throw error
  }
}
