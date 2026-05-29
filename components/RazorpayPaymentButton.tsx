'use client'

import { useState } from 'react'

interface RazorpayPaymentButtonProps {
  amount: number
  description: string
  pdfId: string
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
  className?: string
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export default function RazorpayPaymentButton({
  amount,
  description,
  pdfId,
  onSuccess,
  onError,
  className = ''
}: RazorpayPaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Get user email
      const email = localStorage.getItem('userEmail') || userEmail
      if (!email) {
        const inputEmail = prompt('Please enter your email to proceed with payment:')
        if (!inputEmail) {
          setLoading(false)
          return
        }
        setUserEmail(inputEmail)
        localStorage.setItem('userEmail', inputEmail)
      }

      // Create order on server
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          description,
          receipt: `pdf_${pdfId}_${Date.now()}`,
          userEmail: email || userEmail
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount * 100, // in paise
          currency: orderData.currency,
          name: 'India Job Service',
          description: description,
          order_id: orderData.orderId,
          handler: async (response: RazorpayResponse) => {
            try {
              // Verify payment on server
              const verifyResponse = await fetch('/api/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  userEmail: email || userEmail,
                  pdfId,
                  amount
                })
              })

              const verifyData = await verifyResponse.json()

              if (verifyData.success) {
                onSuccess(response.razorpay_payment_id)
              } else {
                onError('Payment verification failed: ' + verifyData.error)
              }
            } catch (error) {
              onError((error as Error).message)
            }
          },
          prefill: {
            email: email || userEmail,
            contact: '9999999999'
          },
          notes: {
            description: description,
            pdfId: pdfId
          },
          theme: {
            color: '#2563eb'
          }
        }

        const razorpayCheckout = new (window as any).Razorpay(options)

        razorpayCheckout.on('payment.failed', (response: any) => {
          onError(`Payment failed: ${response.error.description}`)
        })

        razorpayCheckout.open()
      }

      script.onerror = () => {
        onError('Failed to load Razorpay checkout')
      }

      document.body.appendChild(script)
    } catch (error) {
      onError((error as Error).message)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 font-medium transition-opacity ${className}`}
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  )
}
