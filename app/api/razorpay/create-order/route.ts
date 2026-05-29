import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt, description, userEmail } = await request.json()

    if (!amount || !receipt) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, receipt' },
        { status: 400 }
      )
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      description,
      notes: {
        userEmail,
        createdAt: new Date().toISOString()
      }
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: (order.amount as number) / 100,
      currency: order.currency,
      receiptId: order.receipt
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
