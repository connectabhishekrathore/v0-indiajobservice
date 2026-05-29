import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// This is a placeholder for Razorpay webhook
// In production, verify the webhook signature with Razorpay

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract payment details from Razorpay webhook
    const {
      type,
      payload: {
        payment: { entity }
      }
    } = body

    if (type !== 'payment.authorized') {
      return NextResponse.json({ status: 'ok' })
    }

    const { id: paymentId, email, amount } = entity

    // Record the payment
    await supabase.from('pdf_purchases').insert([
      {
        user_email: email,
        razorpay_payment_id: paymentId,
        amount_paid: amount / 100, // Convert paise to rupees
        purchase_type: 'one_time'
      }
    ])

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
