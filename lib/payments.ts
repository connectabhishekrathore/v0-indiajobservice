import { supabase } from '@/lib/supabase'
import { PDFPurchase, Subscription } from '@/types'

export async function createPaymentOrder(
  amount: number,
  orderId: string,
  userEmail: string
) {
  // This will be called from an API route that connects to Razorpay
  return {
    orderId,
    amount,
    currency: 'INR',
    userEmail
  }
}

export async function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  secret: string
) {
  // Verify signature with Razorpay in production
  // For now, return success if fields exist
  return {
    verified: !!(razorpayOrderId && razorpayPaymentId && razorpaySignature)
  }
}

export async function recordPDFPurchase(
  userEmail: string,
  pdfId: string,
  razorpayPaymentId: string,
  amount: number,
  purchaseType: 'one_time' | 'subscription'
) {
  try {
    const { data, error } = await supabase
      .from('pdf_purchases')
      .insert([
        {
          user_email: userEmail,
          pdf_id: pdfId,
          razorpay_payment_id: razorpayPaymentId,
          amount_paid: amount,
          purchase_type: purchaseType,
          purchased_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error
    return { success: true, purchase: data?.[0] }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function hasUserPurchasedPDF(userEmail: string, pdfId: string) {
  try {
    // Check one-time purchases
    const { data: purchase, error: purchaseError } = await supabase
      .from('pdf_purchases')
      .select('id')
      .eq('user_email', userEmail)
      .eq('pdf_id', pdfId)
      .eq('purchase_type', 'one_time')
      .single()

    if (!purchaseError && purchase) return { purchased: true }

    // Check active subscriptions
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_email', userEmail)
      .eq('status', 'active')
      .gt('expires_at', new Date().toISOString())
      .single()

    if (!subscriptionError && subscription) return { purchased: true }

    return { purchased: false }
  } catch (error) {
    return { purchased: false, error: (error as Error).message }
  }
}

export async function getOrCreateUserSubscription(userEmail: string, planType: 'monthly' | 'annual') {
  try {
    // Check if user already has an active subscription
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_email', userEmail)
      .eq('status', 'active')
      .single()

    if (existing) return { success: true, subscription: existing, isNew: false }

    // Calculate expiry date
    const expiresAt = new Date()
    if (planType === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_email: userEmail,
          plan_type: planType,
          status: 'active',
          expires_at: expiresAt.toISOString(),
          amount: planType === 'monthly' ? 99 : 999
        }
      ])
      .select()

    if (error) throw error
    return { success: true, subscription: subscription?.[0], isNew: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
