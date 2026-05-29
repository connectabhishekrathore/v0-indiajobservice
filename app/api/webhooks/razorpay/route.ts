import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Razorpay webhook received:', body)
    
    // Placeholder for Razorpay webhook handling
    // In production, verify signature and process payment
    
    return NextResponse.json({ status: 'received' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
