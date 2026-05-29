import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pdfId = searchParams.get('id')
    const userEmail = searchParams.get('email')

    if (!pdfId || !userEmail) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Check if user has purchased or has subscription
    const { data: purchase } = await supabase
      .from('pdf_purchases')
      .select('id')
      .eq('user_email', userEmail)
      .eq('pdf_id', pdfId)
      .eq('purchase_type', 'one_time')
      .single()

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_email', userEmail)
      .eq('status', 'active')
      .gt('expires_at', new Date().toISOString())
      .single()

    if (!purchase && !subscription) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get PDF URL
    const { data: pdf } = await supabase
      .from('pdf_uploads')
      .select('file_url')
      .eq('id', pdfId)
      .single()

    if (!pdf) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 })
    }

    // Redirect to signed URL or return download URL
    return NextResponse.json({ url: pdf.file_url })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
