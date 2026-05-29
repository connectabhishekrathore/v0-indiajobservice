# Razorpay Payment Integration Guide

## Overview

The India Job Service platform now includes complete Razorpay payment integration for:
- Per-PDF purchases (₹20 per PDF)
- Subscription plans (monthly/annual for unlimited access)
- Secure payment verification

## Setup Instructions

### Step 1: Create Razorpay Account

1. Go to [Razorpay](https://razorpay.com)
2. Sign up for a business account
3. Complete KYC verification
4. Go to Settings → API Keys
5. Copy your:
   - Key ID (public key)
   - Key Secret (keep this secret!)

### Step 2: Add Environment Variables

In your `.env.local`:
```env
# Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

Replace with your actual Razorpay keys from the dashboard.

### Step 3: Test Payment Flow

1. Start dev server: `pnpm dev`
2. Go to any job listing: `http://localhost:3000/jobs`
3. Click a job to view details
4. If there are PDFs, click "Pay ₹20"
5. Use Razorpay test card: 4111 1111 1111 1111 (Visa)
6. Any future date for expiry, any CVV
7. OTP: 123456

## Implementation Details

### API Endpoints

#### 1. Create Order
**POST** `/api/razorpay/create-order`

Request:
```json
{
  "amount": 20,
  "currency": "INR",
  "receipt": "pdf_abc123_timestamp",
  "description": "PDF Download: jobnotification.pdf",
  "userEmail": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "orderId": "order_xxx",
  "amount": 20,
  "currency": "INR",
  "receiptId": "pdf_abc123_timestamp"
}
```

#### 2. Verify Payment
**POST** `/api/razorpay/verify`

Request:
```json
{
  "orderId": "order_xxx",
  "paymentId": "pay_xxx",
  "signature": "signature_hash",
  "userEmail": "user@example.com",
  "pdfId": "pdf_id_uuid",
  "amount": 20
}
```

Response:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentId": "pay_xxx"
}
```

### Frontend Component

**Location**: `components/RazorpayPaymentButton.tsx`

Usage:
```tsx
<RazorpayPaymentButton
  amount={20}
  description="PDF Download: filename.pdf"
  pdfId={pdfId}
  onSuccess={(paymentId) => {
    // Handle successful payment
    alert('Payment successful!')
  }}
  onError={(error) => {
    // Handle payment error
    alert(`Error: ${error}`)
  }}
/>
```

### Database Changes

Payments are automatically recorded in `pdf_purchases` table:
- `user_email`: Customer email
- `pdf_id`: Downloaded PDF ID
- `purchase_type`: "one_time" or "subscription"
- `razorpay_payment_id`: Payment verification
- `amount_paid`: Amount in rupees
- `purchased_at`: Timestamp

## How It Works

### Payment Flow

1. **User clicks "Pay ₹20"**
   - RazorpayPaymentButton component loads

2. **Order Created**
   - Frontend calls `/api/razorpay/create-order`
   - Server creates order on Razorpay
   - Returns order ID

3. **Razorpay Checkout Opens**
   - Loads Razorpay checkout modal
   - User enters payment details
   - Razorpay handles payment processing

4. **Payment Verification**
   - Razorpay returns payment ID + signature
   - Frontend calls `/api/razorpay/verify`
   - Server verifies signature cryptographically
   - Records purchase in database

5. **Access Granted**
   - User can now download PDF
   - `hasUserPurchasedPDF()` checks database
   - Direct download link becomes available

## Security Features

### Signature Verification
- Every payment is verified using HMAC-SHA256
- Signature created with secret key on server
- Prevents tampering and unauthorized payments

### Environment Variables
- API keys stored safely in `.env.local`
- Never exposed to frontend (except public key)
- Service role key kept on server only

### Database Security
- Row Level Security (RLS) on pdf_purchases table
- Email-based access control
- Audit trail of all purchases

## Testing

### Test Cards

| Card Type | Number | Status |
|-----------|--------|--------|
| Visa | 4111 1111 1111 1111 | Success |
| Visa | 4222 2222 2222 2200 | Failed |
| Mastercard | 5555 5555 5555 4444 | Success |

### Test Expiry & CVV
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- OTP: 123456

### Test Amount
- Use actual amount (e.g., ₹20)
- Works in test mode
- No actual charges

## Subscription Model (Future)

Framework ready for:
```tsx
<RazorpaySubscriptionButton
  planType="monthly" // or "annual"
  amount={99} // ₹99/month
  onSuccess={handleSubscription}
/>
```

Database table `subscriptions` ready with:
- `plan_type`: monthly/annual
- `status`: active/canceled/expired
- `expires_at`: Auto-calculated
- `amount`: Plan price

## Troubleshooting

### "Invalid payment signature"
- Verify RAZORPAY_KEY_SECRET is correct
- Check environment variables loaded
- Ensure key format is correct

### "Razorpay script not loading"
- Check CDN access (firewall/proxy)
- Clear browser cache
- Try different browser

### "Payment shows in Razorpay but not in DB"
- Check Supabase pdf_purchases table
- Verify API route executed successfully
- Check server logs for errors

### "User email not captured"
- Component prompts for email if needed
- Stores in localStorage for future
- Can be pre-filled if user logged in

## Future Enhancements

1. **Email Confirmations**
   - Send receipt after purchase
   - Provide download link via email

2. **Subscription Management**
   - Cancel subscription
   - Change plans
   - View billing history

3. **Analytics**
   - Track payment success rate
   - Popular PDFs by downloads
   - Revenue tracking

4. **Automated Refunds**
   - Handle failed order completion
   - Auto-refund logic

5. **Multiple Payment Methods**
   - Net banking
   - UPI
   - Wallet integration

## Production Checklist

- [ ] Switch Razorpay to Live mode
- [ ] Update keys to production keys
- [ ] Test with real payment method
- [ ] Setup email notifications
- [ ] Monitor payment failures
- [ ] Setup billing alerts
- [ ] Test on staging environment
- [ ] Document refund policy
- [ ] Train support team

## Support

For Razorpay issues:
- [Razorpay Docs](https://razorpay.com/docs)
- [API Reference](https://razorpay.com/docs/api)
- Razorpay Dashboard → Support

For India Job Service integration issues:
- Check this guide
- Review IMPLEMENTATION_EXAMPLES.ts
- Check browser console for errors
- Review server logs

## Code Files

- **Payment Component**: `components/RazorpayPaymentButton.tsx`
- **Create Order**: `app/api/razorpay/create-order/route.ts`
- **Verify Payment**: `app/api/razorpay/verify/route.ts`
- **Payment Logic**: `lib/payments.ts`
- **Job Detail Page**: `app/jobs/[id]/page.tsx` (integrated)

## Key Variables

- Order Amount: ₹20 (configurable)
- Currency: INR
- Timeout: 5 minutes (Razorpay default)
- Max retries: 3 (frontend can customize)

## Notes

- Payments in test mode don't charge real cards
- Test and live modes use different key pairs
- RZP_ prefix indicates test keys
- Live keys work on production only
- Always verify signatures on server side

---

**Payment integration is now live! Test it immediately with test cards.** 🚀
