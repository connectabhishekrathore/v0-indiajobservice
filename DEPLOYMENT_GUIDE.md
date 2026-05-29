
# India Job Service - Deployment & Configuration Guide

## ✅ DEPLOYMENT SUCCESSFUL

### Production URLs
- **Primary URL**: https://v0-indiajobservice-2y8m3lxum-abhishekrathore275-4805s-projects.vercel.app
- **Aliased URL**: https://v0-indiajobservice-rust.vercel.app

### Deployed Routes
- **Homepage**: `/`
- **Latest Jobs**: `/latest-jobs`
- **Admit Cards**: `/admit-card`
- **Results**: `/result`
- **Answer Keys**: `/answer-key`
- **Syllabus**: `/syllabus`
- **Job Details**: `/job/[id]`
- **Login**: `/login`
- **Signup**: `/signup`
- **User Dashboard**: `/dashboard`
- **Checkout**: `/checkout`
- **Admin Panel** (Hidden): `/admin-secure-panel-x7k9m`
  - Dashboard: `/admin-secure-panel-x7k9m/dashboard`
  - Job Management: `/admin-secure-panel-x7k9m/jobs`
  - PDF Upload: `/admin-secure-panel-x7k9m/pdf-upload`
  - Analytics: `/admin-secure-panel-x7k9m/analytics`

---

## 🌐 CONNECT YOUR CUSTOM DOMAIN (indiajobservice.com)

### Option 1: Using Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Click **Add** and enter: `indiajobservice.com`
4. Vercel will provide DNS records to add

### Option 2: Update Nameservers at Your Domain Registrar
If indiajobservice.com is currently registered elsewhere:
1. Log in to your domain registrar
2. Update nameservers to:
   - ns1.vercel.com
   - ns2.vercel.com
3. Wait 24-48 hours for DNS propagation
4. In Vercel, add the domain and Vercel will verify it automatically

### Option 3: Add CNAME Record (If Keeping Current Registrar)
1. In your domain registrar's DNS settings, add:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
2. For root domain (@):
   - **Type**: A
   - **Value**: 76.76.19.61

---

## 💳 RAZORPAY INTEGRATION

### Environment Variables to Add
Add these to your Vercel project environment variables:

1. **Go to Vercel Dashboard**
   - Click your project → **Settings** → **Environment Variables**

2. **Add these variables**:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=<your-key-id-from-razorpay>
   RAZORPAY_KEY_SECRET=<your-key-secret-from-razorpay>
   ```

### Get Your Razorpay Credentials
1. Log in to https://dashboard.razorpay.com
2. Go to **Settings** → **API Keys**
3. Copy:
   - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
   - **Key Secret**
4. Paste into Vercel environment variables above

### Test Mode vs Live Mode
- **Test Mode**: Use `rzp_test_*` keys for testing
- **Live Mode**: Use `rzp_live_*` keys for production payments

### Payment Flow Already Integrated
The checkout page at `/checkout` uses:
- **Platform Fee**: ₹3 (per transaction)
- **PDF Purchase Fee**: ₹20 (for offline form PDFs)
- **Razorpay Integration**: Server-side verification with webhooks

### Webhook Configuration
1. In Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL:
   ```
   https://indiajobservice.com/api/razorpay-webhook
   ```
3. Select events:
   - `payment.authorized`
   - `payment.failed`
   - `payment.captured`

---

## 📋 NEXT STEPS

### 1. Add Razorpay Credentials
```bash
# In your Vercel project settings, add:
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### 2. Connect Custom Domain
- Use Vercel dashboard to add indiajobservice.com
- Configure DNS based on your registrar

### 3. Test Payments
- Go to `/checkout`
- Use Razorpay test cards:
  - Card: 4111111111111111
  - Expiry: 12/25
  - CVV: 123

### 4. Deploy with New Variables
After adding environment variables, redeploy:
```bash
vercel deploy --prod
```

---

## 🔐 ADMIN PANEL ACCESS

The hidden admin panel is available at:
```
https://indiajobservice.com/admin-secure-panel-x7k9m
```

Features:
- ✅ Job management (create, edit, delete)
- ✅ PDF upload with auto-extraction
- ✅ Analytics dashboard
- ✅ Revenue tracking
- ✅ User management

---

## 📞 SUPPORT

If you need help with:
- Domain connection: Visit Vercel docs https://vercel.com/docs/concepts/projects/domains
- Razorpay setup: Visit Razorpay docs https://razorpay.com/docs
- App issues: Check deployment logs in Vercel dashboard

