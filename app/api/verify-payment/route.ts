import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Verify signature
    const message = `${razorpayOrderId}|${razorpayPaymentId}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(message)
      .digest('hex');

    if (signature !== razorpaySignature) {
      console.error('[v0] Signature verification failed');
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Payment verified successfully
    console.log('[v0] Payment verified:', razorpayPaymentId);
    return NextResponse.json({
      verified: true,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
    });
  } catch (error) {
    console.error('[v0] Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
