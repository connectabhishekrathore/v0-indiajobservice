'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, DollarSign, Zap } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  type: 'pdf' | 'platform' | 'membership';
  discount?: number;
}

const plans: Plan[] = [
  {
    id: 'pdf-single',
    name: 'Single PDF',
    price: 20,
    description: 'One offline form PDF collection',
    features: ['High-quality PDF', 'Instant download', '30-day access', 'Email support'],
    type: 'pdf',
  },
  {
    id: 'pdf-bundle',
    name: 'PDF Bundle',
    price: 99,
    originalPrice: 120,
    description: 'Pack of 10 premium PDFs',
    features: ['10 premium PDFs', 'Instant download', '90-day access', 'Priority support', 'Latest updates'],
    type: 'pdf',
    discount: 18,
  },
  {
    id: 'premium-month',
    name: 'Premium - Monthly',
    price: 299,
    description: 'Full premium access for one month',
    features: ['Unlimited PDFs', 'Ad-free experience', 'Job alerts', 'Mock tests', 'Priority support'],
    type: 'membership',
  },
  {
    id: 'premium-year',
    name: 'Premium - Yearly',
    price: 999,
    originalPrice: 3588,
    description: 'Full premium access for one year (Save ₹2,589!)',
    features: ['Unlimited PDFs', 'Ad-free experience', 'Job alerts', 'Mock tests', 'Priority support', '12 months access'],
    type: 'membership',
    discount: 72,
  },
];

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'payment'>('select');

  const handleCheckout = (planId: string) => {
    setSelectedPlan(planId);
    setStep('payment');
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);

  if (step === 'payment' && currentPlan) {
    return (
      <PaymentPage plan={currentPlan} onBack={() => setStep('select')} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Unlock Premium Access</h1>
          <p className="text-muted-foreground text-lg">Choose the plan that fits your needs</p>
        </div>

        {/* Platform Fee Notice */}
        <Card className="mb-8 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-sm">
              <Zap className="inline h-4 w-4 mr-2 text-blue-600" />
              <strong>Platform Fee:</strong> A ₹3 transaction fee is applied to all purchases to maintain our service quality
            </p>
          </CardContent>
        </Card>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                plan.discount
                  ? 'ring-2 ring-primary md:col-span-2 md:w-1/2 mx-auto'
                  : ''
              }`}
            >
              {plan.discount && (
                <Badge className="absolute top-0 right-0 m-4 bg-red-500">
                  Save {plan.discount}%
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.type === 'pdf' ? 'One-time payment' : 'Per month/year'}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleCheckout(plan.id)}
                  className="w-full"
                  size="lg"
                  variant={plan.discount ? 'default' : 'outline'}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentPage({ plan, onBack }: { plan: Plan; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const platformFee = 3;
  const totalAmount = plan.price + platformFee;

  const handleRazorpayPayment = () => {
    setIsProcessing(true);
    
    // Simulate Razorpay integration
    const options = {
      key: 'rzp_test_placeholder', // Replace with actual Razorpay key
      amount: totalAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'India Job Service',
      description: plan.name,
      prefill: {
        email: email,
      },
      theme: {
        color: '#1e40af',
      },
      handler: function (response: any) {
        alert(`Payment successful! Order ID: ${response.razorpay_payment_id}`);
        setIsProcessing(false);
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    // In production, load Razorpay script and call:
    // const razorpay = new (window as any).Razorpay(options);
    // razorpay.open();
    
    alert('Razorpay payment gateway would be initiated here with amount: ₹' + totalAmount);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← Back to Plans
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>Review your order and proceed to payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4 pb-4 border-b">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{plan.name}</span>
                  <span className="font-medium">₹{plan.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-medium">₹{platformFee}</span>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-lg">₹{totalAmount}</span>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base mt-1 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input type="radio" name="payment" defaultChecked className="h-4 w-4" />
                  <span className="font-medium">Razorpay (Credit/Debit/UPI/Wallets)</span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" defaultChecked className="h-4 w-4 mt-1" />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <Button
                onClick={handleRazorpayPayment}
                disabled={!email || isProcessing}
                className="w-full h-12"
                size="lg"
              >
                {isProcessing ? 'Processing...' : 'Pay ₹' + totalAmount + ' with Razorpay'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment information is secure and encrypted
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
