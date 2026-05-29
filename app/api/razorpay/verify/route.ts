import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { supabase } from '@/lib/supabase'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, userEmail, pdfId, amount } = await request.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify signature
    const body = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 403 }
      )
    }

    // Payment verified successfully - record in database
    if (pdfId && userEmail && amount) {
      const { error: dbError } = await supabase.from('pdf_purchases').insert([
        {
          user_email: userEmail,
          pdf_id: pdfId,
          purchase_type: 'one_time',
          razorpay_payment_id: paymentId,
          amount_paid: Math.round(amount),
          purchased_at: new Date().toISOString()
        }
      ])

      if (dbError) {
        console.error('Database error:', dbError)
        // Don't fail the response even if DB fails - payment was verified
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
