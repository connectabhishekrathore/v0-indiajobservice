# India Job Service - Complete Setup Guide

## 🚀 DEPLOYMENT STATUS: ✅ LIVE

Your application is now live and ready to use!

### Production URLs
- **Primary**: https://v0-indiajobservice-5e29xk2ur-abhishekrathore275-4805s-projects.vercel.app
- **Aliased**: https://v0-indiajobservice-rust.vercel.app
- **Your Domain** (Once connected): https://indiajobservice.com

---

## 📋 STEP-BY-STEP SETUP

### STEP 1: Connect Your Custom Domain (indiajobservice.com)

#### Option A: Using Vercel Dashboard (Recommended - Takes 2-5 minutes)

1. **Visit Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Select your project "v0-indiajobservice"

2. **Add Custom Domain**
   - Click **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `indiajobservice.com`

3. **Choose DNS Provider**
   Vercel will show you options:
   
   **If using Vercel DNS:**
   - Vercel manages everything automatically
   - Fastest setup (5 minutes)
   
   **If keeping your current DNS provider:**
   - Add the CNAME record shown in Vercel

4. **Verify Domain**
   - Vercel automatically verifies once DNS is configured
   - Status will show "Valid Configuration" when complete

---

### STEP 2: Configure Razorpay Payment Gateway

#### Part A: Get Your Razorpay Credentials

1. **Log in to Razorpay Dashboard**
   - Visit: https://dashboard.razorpay.com
   - Sign in with your account

2. **Get API Keys**
   - Click **Settings** (⚙️ icon at bottom left)
   - Click **API Keys**
   - You'll see:
     - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
     - **Key Secret** (keep this SECRET!)

3. **Copy These Values**
   ```
   Key ID: rzp_live_XXXXXXXXXXXXXXXXXX
   Key Secret: rzp_live_XXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

#### Part B: Add Credentials to Vercel

1. **Go to Vercel Project Settings**
   - Visit: https://vercel.com/dashboard
   - Click your project
   - Click **Settings**
   - Click **Environment Variables**

2. **Add Razorpay Variables**
   
   Click **Add New** and create TWO variables:

   **Variable 1:**
   ```
   Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
   Value: rzp_live_XXXXXXXXXXXXXXXXXX
   (Your Key ID from step 3 above)
   ```

   **Variable 2:**
   ```
   Name: RAZORPAY_KEY_SECRET
   Value: rzp_live_XXXXXXXXXXXXXXXXXXXXXXXXXX
   (Your Key Secret from step 3 above)
   ```

3. **Save Variables**
   - Click **Save** for each variable
   - They should now show in your environment variables list

#### Part C: Configure Razorpay Webhook

1. **In Razorpay Dashboard**
   - Go to **Settings** → **Webhooks**
   - Click **Add New Webhook**

2. **Add Webhook URL**
   ```
   Webhook URL: https://indiajobservice.com/api/razorpay-webhook
   (Or use the aliased URL if domain isn't connected yet)
   ```

3. **Select Events**
   Check these events:
   - ✅ `payment.authorized`
   - ✅ `payment.failed`
   - ✅ `payment.captured`

4. **Save Webhook**
   - Click **Create Webhook**
   - You'll get a **Webhook Secret** (save this)

#### Part D: Redeploy After Adding Variables

1. **Trigger New Deployment**
   ```bash
   cd /vercel/share/v0-project
   git commit --allow-empty -m "Redeploy with Razorpay credentials"
   git push origin indiajobservice-website
   ```
   
   Or manually in Vercel:
   - Go to your project → **Deployments**
   - Click **Redeploy** on the latest deployment

2. **Wait for Deployment**
   - Takes ~2 minutes
   - Vercel will rebuild with new env variables

---

## 🧪 TEST YOUR SETUP

### Test Payment Processing

1. **Visit Your App**
   - Go to: https://indiajobservice.com/checkout
   (or use the Vercel URL if domain isn't ready)

2. **Select a Plan**
   - Click "Choose Plan" on any option
   - Select an email

3. **Process Test Payment**
   - Click "Pay with Razorpay"
   - Use Razorpay test credentials:
     ```
     Card Number: 4111 1111 1111 1111
     Expiry: 12/25
     CVV: 123
     OTP: 123456 (if prompted)
     ```

4. **Verify Payment**
   - Check Razorpay dashboard for the transaction
   - Check your email for confirmation

---

## 🔐 ADMIN PANEL

Access the hidden admin panel:
```
https://indiajobservice.com/admin-secure-panel-x7k9m
```

Features available:
- 📊 Dashboard with statistics
- ➕ Create/Edit/Delete jobs
- 📄 PDF upload and management
- 📈 Analytics and revenue tracking
- 👥 User management

---

## 📱 FEATURES CHECKLIST

Your complete application includes:

### Frontend Features
- ✅ Professional dark blue theme
- ✅ Job listing pages (Latest, Admit Cards, Results, etc.)
- ✅ Job detail view with full information
- ✅ User authentication (login/signup)
- ✅ User dashboard
- ✅ Responsive mobile design
- ✅ Trending jobs marquee
- ✅ State-wise job filtering

### Payment System
- ✅ Razorpay integration
- ✅ Multiple payment methods (Credit/Debit/UPI/Wallets)
- ✅ ₹3 platform fee per transaction
- ✅ ₹20 PDF purchase fee
- ✅ Order verification
- ✅ Webhook handling

### Admin Panel
- ✅ Job management
- ✅ PDF upload with extraction
- ✅ Analytics dashboard
- ✅ Revenue tracking

### Multilingual Support
- ✅ English (English)
- ✅ हिन्दी (Hindi)
- ✅ తెలుగు (Telugu)
- ✅ தமிழ் (Tamil)
- ✅ മലയാളം (Malayalam)
- ✅ ಕನ್ನಡ (Kannada)
- ✅ मराठी (Marathi)
- ✅ ગુજરાતી (Gujarati)
- ✅ বাংলা (Bengali)
- ✅ ଓଡିଆ (Oriya)
- ✅ ਪੰਜਾਬੀ (Punjabi)

---

## 🐛 TROUBLESHOOTING

### Domain Not Connecting?
- Wait 24-48 hours for DNS propagation
- Check DNS records in Vercel dashboard
- Ensure nameservers are updated at registrar

### Razorpay Not Working?
- Verify environment variables are set in Vercel
- Check that Key ID starts with `rzp_live_`
- Ensure Key Secret is correct (no spaces)
- Redeploy after adding variables
- Use test credentials to verify

### Payments Failing?
- Check Razorpay dashboard for error logs
- Verify webhook URL is accessible
- Ensure amounts are in correct format (rupees)

---

## 📞 SUPPORT

- **Vercel Support**: https://vercel.com/support
- **Razorpay Support**: https://razorpay.com/support
- **Documentation**: See DEPLOYMENT_GUIDE.md

---

## ✅ COMPLETION CHECKLIST

Track your setup progress:

- [ ] Domain connected to indiajobservice.com
- [ ] Razorpay Key ID added to Vercel env vars
- [ ] Razorpay Key Secret added to Vercel env vars
- [ ] Webhook URL configured in Razorpay
- [ ] App redeployed after env variables added
- [ ] Test payment successful
- [ ] Admin panel accessible
- [ ] Multiple languages tested
- [ ] Production ready!

