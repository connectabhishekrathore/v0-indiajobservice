import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-razorpay-signature');
    const body = await request.text();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      console.error('[v0] Webhook signature verification failed');
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 400 }
      );
    }

    // Parse webhook event
    const event = JSON.parse(body);
    console.log('[v0] Webhook event received:', event.event);

    // Handle payment events
    switch (event.event) {
      case 'payment.authorized':
        console.log('[v0] Payment authorized:', event.payload.payment.entity.id);
        // Add your logic here (e.g., update database, send email)
        break;

      case 'payment.failed':
        console.error('[v0] Payment failed:', event.payload.payment.entity.id);
        // Add your logic here (e.g., log error, send notification)
        break;

      case 'payment.captured':
        console.log('[v0] Payment captured:', event.payload.payment.entity.id);
        // Add your logic here (e.g., activate premium, send receipt)
        break;

      default:
        console.log('[v0] Unhandled event:', event.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[v0] Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
