'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RazorpayPaymentButton from '@/components/RazorpayPaymentButton'
import { supabase } from '@/lib/supabase'
import { Subscription } from '@/types'

export default function SubscriptionsPage() {
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    const checkSubscription = async () => {
      const email = localStorage.getItem('userEmail')
      if (email) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_email', email)
          .eq('status', 'active')
          .gte('expires_at', new Date().toISOString())
          .single()

        if (subscription) {
          setActiveSubscription(subscription)
        }
      }
    }

    checkSubscription()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-foreground/5 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/jobs" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to jobs
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Subscription Plans</h1>
          <p className="text-foreground/60 mt-2">Get unlimited access to all PDFs</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {activeSubscription ? (
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">You have an active subscription</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Plan Type</p>
                <p className="text-lg font-semibold text-foreground capitalize">
                  {activeSubscription.plan_type}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Expires on</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(activeSubscription.expires_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-foreground/70 mt-4">
              You can download unlimited PDFs until your subscription expires. No additional payment needed!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Monthly Plan */}
            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8 hover:border-primary/50 transition-colors">
              <h3 className="text-2xl font-bold text-foreground mb-2">Monthly</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">₹99</span>
                <span className="text-foreground/60">/month</span>
              </div>

              <ul className="space-y-3 mb-8 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Unlimited PDF downloads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Access to all resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Auto-renewal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Cancel anytime</span>
                </li>
              </ul>

              <RazorpayPaymentButton
                amount={99}
                description="Monthly Subscription - Unlimited PDFs"
                pdfId="subscription_monthly"
                onSuccess={() => {
                  alert('Subscription activated! You can now download unlimited PDFs.')
                  window.location.reload()
                }}
                onError={(error) => {
                  alert(`Subscription failed: ${error}`)
                }}
                className="w-full"
              />
            </div>

            {/* Annual Plan */}
            <div className="bg-foreground/5 rounded-lg border border-secondary p-8 relative">
              <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-semibold">
                Save 18%
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">Annual</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-secondary">₹999</span>
                <span className="text-foreground/60">/year</span>
              </div>

              <ul className="space-y-3 mb-8 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Unlimited PDF downloads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Access to all resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Auto-renewal annually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Cancel anytime</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Best value!</span>
                </li>
              </ul>

              <RazorpayPaymentButton
                amount={999}
                description="Annual Subscription - Unlimited PDFs"
                pdfId="subscription_annual"
                onSuccess={() => {
                  alert('Subscription activated! You can now download unlimited PDFs.')
                  window.location.reload()
                }}
                onError={(error) => {
                  alert(`Subscription failed: ${error}`)
                }}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h3 className="font-semibold text-foreground mb-2">Can I cancel my subscription?</h3>
              <p className="text-foreground/70">
                Yes! You can cancel your subscription anytime from your account settings. Your access will remain active until the end of your billing period.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h3 className="font-semibold text-foreground mb-2">Will I be charged when subscription renews?</h3>
              <p className="text-foreground/70">
                Yes, subscriptions auto-renew. We'll send you a reminder email 7 days before renewal. You can cancel anytime to avoid charges.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h3 className="font-semibold text-foreground mb-2">What's the difference between monthly and annual?</h3>
              <p className="text-foreground/70">
                Both give unlimited PDF access. Annual saves you about 18% compared to 12 months of monthly payments.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h3 className="font-semibold text-foreground mb-2">Can I buy individual PDFs instead?</h3>
              <p className="text-foreground/70">
                Yes! Individual PDFs cost ₹20 each. If you'll download more than 5 PDFs, subscription is more economical.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h3 className="font-semibold text-foreground mb-2">Is my payment secure?</h3>
              <p className="text-foreground/70">
                Absolutely! We use Razorpay, India's leading payment processor. Your payment information is encrypted and PCI compliant.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
