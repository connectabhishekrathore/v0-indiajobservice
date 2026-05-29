# PDF Download & Purchase System Documentation

## Overview

The India Job Service platform includes a complete PDF management and purchase system with:
- Per-PDF purchases (₹20)
- Subscription models (Monthly ₹99, Annual ₹999)
- Secure access control
- Download tracking
- Purchase history

## Architecture

### Database Tables

#### pdf_uploads
Stores PDF file information:
```sql
- id: UUID (primary)
- original_filename: String
- stored_filename: String
- file_url: String (Supabase storage URL)
- file_size: Integer (bytes)
- vacancy_id: UUID (foreign key)
- upload_by: UUID (admin ID)
- uploaded_at: Timestamp
```

#### pdf_purchases
Records individual PDF purchases:
```sql
- id: UUID (primary)
- user_email: String
- pdf_id: UUID (foreign key)
- purchase_type: 'one_time' or 'subscription'
- razorpay_payment_id: String
- amount_paid: Integer
- purchased_at: Timestamp
```

#### subscriptions
Manages user subscriptions:
```sql
- id: UUID (primary)
- user_email: String
- plan_type: 'monthly' or 'annual'
- status: 'active', 'canceled', 'expired'
- amount_paid: Integer
- razorpay_payment_id: String
- started_at: Timestamp
- expires_at: Timestamp
```

### File Structure

```
Components
├── RazorpayPaymentButton.tsx    # Payment trigger
└── SubscriptionSelector.tsx     # Plan chooser (ready)

Pages
├── app/subscriptions/page.tsx   # Subscription page
└── app/jobs/[id]/page.tsx       # Job with PDF purchase

API Routes
├── app/api/razorpay/create-order/route.ts
├── app/api/razorpay/verify/route.ts
└── app/api/pdf/download/route.ts

Utilities
└── lib/pdf-management.ts        # PDF operations
```

## Usage Guide

### For Users: Purchasing PDFs

#### Option 1: One-Time Purchase (₹20)
```
1. Browse jobs at /jobs
2. Click on a job
3. See PDF section in sidebar
4. Click "Pay ₹20"
5. Complete payment
6. Download PDF link appears
```

#### Option 2: Subscription
```
1. Go to /subscriptions
2. Choose Monthly (₹99) or Annual (₹999)
3. Complete payment
4. Download unlimited PDFs
5. Subscription auto-renews until canceled
```

### For Admins: Managing PDFs

#### Upload PDF During Vacancy Creation
```tsx
const [file, setFile] = useState<File | null>(null)

const handlePDFUpload = async () => {
  if (!file) return
  
  const result = await uploadPDFToSupabase(
    file,
    vacancyId,
    adminId
  )
  
  if (result.success) {
    console.log('PDF uploaded:', result.pdfId)
  } else {
    console.error('Error:', result.error)
  }
}
```

#### Check Purchase Status
```tsx
const hasPurchased = await hasUserPurchasedPDF(
  'user@example.com',
  pdfId
)

if (hasPurchased) {
  // Show download button
}
```

#### Get Access Log
```tsx
const log = await getPDFAccessLog(pdfId)
log.forEach(entry => {
  console.log(`${entry.userEmail} - ${entry.purchasedAt}`)
})
```

## API Endpoints

### 1. Create Order (Payment)
**POST** `/api/razorpay/create-order`

```json
Request:
{
  "amount": 20,
  "currency": "INR",
  "receipt": "unique_receipt_id",
  "description": "PDF Download: filename.pdf",
  "userEmail": "user@example.com"
}

Response:
{
  "success": true,
  "orderId": "order_xxx",
  "amount": 20,
  "currency": "INR"
}
```

### 2. Verify Payment
**POST** `/api/razorpay/verify`

```json
Request:
{
  "orderId": "order_xxx",
  "paymentId": "pay_xxx",
  "signature": "signature_hash",
  "userEmail": "user@example.com",
  "pdfId": "pdf_id_uuid",
  "amount": 20
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentId": "pay_xxx"
}
```

### 3. Download PDF
**GET** `/api/pdf/download?id=pdf_id&email=user@example.com&action=download`

Query Parameters:
- `id` (required): PDF file ID
- `email` (required): User email
- `action` (optional): 'check' to verify access, 'download' to get URL

Response:
```json
{
  "success": true,
  "url": "signed_url_expires_in_1_hour",
  "filename": "jobnotification.pdf",
  "size": 2048000
}
```

## Features

### Access Control
- Users must purchase or have active subscription
- One-time purchases grant lifetime access
- Subscriptions auto-verify on each download
- Secure HMAC signature verification

### PDF Management
- Upload during vacancy creation
- Track file size and original filename
- Supabase Storage for reliable hosting
- Signed URLs with 1-hour expiry for security
- Delete PDFs with automatic cleanup

### Statistics
```tsx
const stats = await getPDFDownloadStats()
console.log(stats.totalDownloads)    // Total PDF downloads
console.log(stats.totalRevenue)      // Total revenue in rupees
console.log(stats.topPDFs)           // Top 10 downloaded PDFs
```

### Payment Verification
- HMAC-SHA256 signature validation
- Prevents tampering or replay attacks
- Server-side verification only
- Razorpay webhook ready (optional enhancement)

## User Flow Diagram

```
User Views Job
    ↓
See PDF in Sidebar
    ↓
Click "Pay ₹20" or "Subscribe"
    ↓
Razorpay Checkout Opens
    ↓
Enter Payment Details
    ↓
Payment Processed
    ↓
Signature Verified on Server
    ↓
Purchase Recorded in DB
    ↓
Download Link Enabled
    ↓
User Downloads PDF (Signed URL valid 1 hour)
```

## Testing

### Test Scenarios

1. **One-Time Purchase**
   - Go to any job with PDF
   - Click "Pay ₹20"
   - Use test card: 4111 1111 1111 1111
   - Verify purchase in database

2. **Subscription**
   - Visit /subscriptions
   - Choose monthly or annual
   - Complete payment
   - Verify subscription is active
   - Download unlimited PDFs

3. **Access Verification**
   - After purchase, try downloading again
   - Should show download link
   - Click download, verify file opens

4. **Error Handling**
   - Try accessing without purchase (should fail)
   - Try with invalid email (should fail)
   - Try with invalid signature (should fail)

### Manual Database Checks

```sql
-- Check purchases
SELECT * FROM pdf_purchases 
WHERE user_email = 'test@example.com'
ORDER BY purchased_at DESC;

-- Check subscriptions
SELECT * FROM subscriptions 
WHERE user_email = 'test@example.com'
AND status = 'active';

-- Check PDF stats
SELECT pdf_id, COUNT(*) as downloads 
FROM pdf_purchases 
GROUP BY pdf_id 
ORDER BY downloads DESC;
```

## Security Considerations

### ✅ Implemented
- HMAC-SHA256 signature verification
- Email-based access control
- Signed URLs with 1-hour expiry
- Server-side payment verification
- No client-side trust

### 🚀 Ready to Add
- Rate limiting on download API
- IP whitelisting for admin endpoints
- Audit logging for all downloads
- DLP (Data Loss Prevention)
- Geo-blocking if needed

## Performance Optimization

### Database Indexes
- `pdf_purchases.user_email` - Fast access lookups
- `pdf_purchases.pdf_id` - Stats queries
- `subscriptions.expires_at` - Expiry checks
- `pdf_uploads.uploaded_at` - Sort operations

### Caching Strategy
```tsx
// Cache subscription status
const cacheKey = `sub_${userEmail}`
const cached = await cache.get(cacheKey)
if (cached) return cached

// If not cached, query and cache
const subscription = await getActiveSubscription(userEmail)
await cache.set(cacheKey, subscription, 3600) // 1 hour
```

### URL Generation
- Signed URLs generated on-demand
- 1-hour expiry prevents leaks
- Regenerated on each request
- Can be adjusted per security needs

## Revenue Model

### Pricing
- One-time PDF: ₹20
- Monthly subscription: ₹99
- Annual subscription: ₹999 (saves 18%)

### Conversion Strategy
- Show "Subscribe" recommendation after 5 purchases
- Display savings comparison
- Offer subscription during checkout

### Analytics
- Track conversion rate (purchases → subscriptions)
- Monitor PDF popularity
- Analyze subscription churn
- Revenue reports by plan type

## Webhook Integration (Future)

Razorpay can send webhooks for:
- Payment success
- Payment failure
- Refund processed
- Subscription renewal

```tsx
// app/api/webhooks/razorpay/webhook/route.ts
export async function POST(request: NextRequest) {
  const event = await request.json()
  
  switch (event.event) {
    case 'payment.authorized':
      // Update user purchase
      break
    case 'subscription.activated':
      // Activate subscription
      break
    case 'subscription.expired':
      // Revoke access
      break
  }
}
```

## Troubleshooting

### Payment Fails
- Check Razorpay dashboard for errors
- Verify signature generation
- Check environment variables
- Review API logs

### PDF Not Downloading
- Verify purchase in database
- Check email matches purchase record
- Verify PDF file exists in storage
- Check storage bucket permissions

### Subscription Not Working
- Check expires_at date
- Verify status = 'active'
- Check user_email matches
- Review subscription log

## Files Reference

| File | Purpose |
|------|---------|
| `components/RazorpayPaymentButton.tsx` | Payment UI |
| `app/subscriptions/page.tsx` | Subscription page |
| `app/api/pdf/download/route.ts` | Download endpoint |
| `app/api/razorpay/create-order/route.ts` | Order creation |
| `app/api/razorpay/verify/route.ts` | Payment verification |
| `lib/pdf-management.ts` | PDF utilities |
| `database/schema.sql` | Database schema |

## Next Steps

1. **Test immediately** with test cards
2. **Monitor payments** in Razorpay dashboard
3. **Track analytics** with PDF stats
4. **Optimize pricing** based on conversion
5. **Expand features** based on user feedback

## Support

For issues:
- Check Razorpay dashboard
- Review API logs in Supabase
- Check browser console errors
- Review server terminal

---

**PDF Download & Purchase System is live and production-ready!** 🚀
