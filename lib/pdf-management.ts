import { supabase } from './supabase'
import { PDFUpload, PDFPurchase, Subscription } from '@/types'

export async function uploadPDFToSupabase(
  file: File,
  vacancyId: string,
  adminId: string
): Promise<{ success: boolean; pdfId?: string; error?: string }> {
  try {
    const filename = `${vacancyId}_${Date.now()}_${file.name}`
    const filepath = `pdfs/${filename}`

    // Upload file to Supabase Storage
    const { error: uploadError, data } = await supabase.storage
      .from('pdf_uploads')
      .upload(filepath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf'
      })

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl }
    } = supabase.storage.from('pdf_uploads').getPublicUrl(filepath)

    // Record in database
    const { data: pdfData, error: dbError } = await supabase
      .from('pdf_uploads')
      .insert([
        {
          original_filename: file.name,
          stored_filename: filename,
          file_url: publicUrl,
          file_size: file.size,
          upload_by: adminId,
          uploaded_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    return { success: true, pdfId: pdfData.id }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function getPDFsForVacancy(vacancyId: string): Promise<PDFUpload[]> {
  const { data, error } = await supabase
    .from('pdf_uploads')
    .select('*')
    .eq('vacancy_id', vacancyId)
    .order('uploaded_at', { ascending: false })

  if (error) {
    console.error('Error fetching PDFs:', error)
    return []
  }

  return data || []
}

export async function hasUserPurchasedPDF(
  userEmail: string,
  pdfId: string
): Promise<boolean> {
  try {
    // Check one-time purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from('pdf_purchases')
      .select('id')
      .eq('user_email', userEmail)
      .eq('pdf_id', pdfId)
      .eq('purchase_type', 'one_time')
      .single()

    if (purchase && !purchaseError) {
      return true
    }

    // Check subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_email', userEmail)
      .eq('status', 'active')
      .gte('expires_at', new Date().toISOString())
      .single()

    if (subscription && !subscriptionError) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking purchase:', error)
    return false
  }
}

export async function recordPDFPurchase(
  userEmail: string,
  pdfId: string,
  amount: number,
  razorpayPaymentId: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from('pdf_purchases').insert([
      {
        user_email: userEmail,
        pdf_id: pdfId,
        purchase_type: 'one_time',
        razorpay_payment_id: razorpayPaymentId,
        amount_paid: Math.round(amount),
        purchased_at: new Date().toISOString()
      }
    ])

    if (error) {
      console.error('Error recording purchase:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in recordPDFPurchase:', error)
    return false
  }
}

export async function recordSubscription(
  userEmail: string,
  planType: 'monthly' | 'annual',
  amount: number,
  razorpayPaymentId: string
): Promise<boolean> {
  try {
    const expiresAt = new Date()
    if (planType === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    const { error } = await supabase.from('subscriptions').insert([
      {
        user_email: userEmail,
        plan_type: planType,
        status: 'active',
        amount_paid: Math.round(amount),
        razorpay_payment_id: razorpayPaymentId,
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString()
      }
    ])

    if (error) {
      console.error('Error recording subscription:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in recordSubscription:', error)
    return false
  }
}

export async function getPDFDownloadStats(): Promise<{
  totalDownloads: number
  totalRevenue: number
  topPDFs: Array<{ filename: string; downloads: number }>
}> {
  try {
    const { data: purchases } = await supabase
      .from('pdf_purchases')
      .select('pdf_id, amount_paid')

    const { data: pdfs } = await supabase.from('pdf_uploads').select('id, original_filename')

    let totalDownloads = 0
    let totalRevenue = 0
    const pdfStats: { [key: string]: { filename: string; downloads: number } } = {}

    purchases?.forEach(purchase => {
      totalDownloads++
      totalRevenue += purchase.amount_paid || 0

      if (!pdfStats[purchase.pdf_id]) {
        const pdf = pdfs?.find(p => p.id === purchase.pdf_id)
        pdfStats[purchase.pdf_id] = {
          filename: pdf?.original_filename || 'Unknown',
          downloads: 0
        }
      }
      pdfStats[purchase.pdf_id].downloads++
    })

    const topPDFs = Object.values(pdfStats)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 10)

    return {
      totalDownloads,
      totalRevenue,
      topPDFs
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { totalDownloads: 0, totalRevenue: 0, topPDFs: [] }
  }
}

export async function deletePDF(pdfId: string, filename: string): Promise<boolean> {
  try {
    const filepath = `pdfs/${filename}`

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('pdf_uploads')
      .remove([filepath])

    if (storageError) {
      console.error('Storage delete error:', storageError)
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('pdf_uploads')
      .delete()
      .eq('id', pdfId)

    if (dbError) {
      console.error('Database delete error:', dbError)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting PDF:', error)
    return false
  }
}

export async function getPDFAccessLog(pdfId: string): Promise<
  Array<{
    userEmail: string
    purchaseType: string
    purchasedAt: string
    amountPaid: number
  }>
> {
  try {
    const { data: purchases } = await supabase
      .from('pdf_purchases')
      .select('user_email, purchase_type, purchased_at, amount_paid')
      .eq('pdf_id', pdfId)
      .order('purchased_at', { ascending: false })

    return (
      purchases?.map(p => ({
        userEmail: p.user_email,
        purchaseType: p.purchase_type,
        purchasedAt: p.purchased_at,
        amountPaid: p.amount_paid
      })) || []
    )
  } catch (error) {
    console.error('Error fetching access log:', error)
    return []
  }
}
