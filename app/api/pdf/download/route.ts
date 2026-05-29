import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pdfId = searchParams.get('id')
    const userEmail = searchParams.get('email')
    const action = searchParams.get('action') // 'check' or 'download'

    if (!pdfId || !userEmail) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Check if user has purchased or has active subscription
    const { data: purchase, error: purchaseError } = await supabase
      .from('pdf_purchases')
      .select('id, expired_at')
      .eq('user_email', userEmail)
      .eq('pdf_id', pdfId)
      .eq('purchase_type', 'one_time')
      .single()

    let hasAccess = false

    if (purchase && !purchaseError) {
      hasAccess = true
    } else {
      // Check subscription
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('id, expires_at, status')
        .eq('user_email', userEmail)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .single()

      if (subscription && !subscriptionError) {
        hasAccess = true
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized - PDF not purchased' }, { status: 403 })
    }

    // If just checking access
    if (action === 'check') {
      return NextResponse.json({ hasAccess: true })
    }

    // Get PDF URL and metadata
    const { data: pdf, error: pdfError } = await supabase
      .from('pdf_uploads')
      .select('file_url, original_filename, file_size')
      .eq('id', pdfId)
      .single()

    if (pdfError || !pdf) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 })
    }

    // Get signed URL that expires in 1 hour
    const { data: signedData, error: signError } = await supabase.storage
      .from('pdf_uploads')
      .createSignedUrl(pdf.file_url.split('/').slice(-2).join('/'), 3600) // 1 hour expiry

    if (signError || !signedData) {
      // Fallback to public URL
      return NextResponse.json({
        success: true,
        url: pdf.file_url,
        filename: pdf.original_filename,
        size: pdf.file_size
      })
    }

    // Log download for analytics
    try {
      await supabase.from('user_searches').insert({
        search_query: `pdf_download_${pdfId}`,
        results_count: 1
      })
    } catch {
      // Analytics failure shouldn't block download
    }

    return NextResponse.json({
      success: true,
      url: signedData.signedUrl,
      filename: pdf.original_filename,
      size: pdf.file_size
    })
  } catch (error) {
    console.error('PDF download error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

