# Setup Checklist - India Job Service

Follow these steps to get the project running:

## Step 1: Supabase Setup (5 minutes)

- [ ] Create a Supabase project at https://supabase.com
- [ ] Copy your Project URL and Anon Key
- [ ] Go to SQL Editor in Supabase dashboard
- [ ] Open `/database/schema.sql` from this project
- [ ] Copy and paste the entire SQL content into Supabase SQL Editor
- [ ] Click "Run" to execute the migration
- [ ] Verify all tables are created (vacancies, admins, pdf_uploads, etc.)

## Step 2: Storage Setup (2 minutes)

- [ ] In Supabase dashboard, go to Storage section
- [ ] Click "New bucket"
- [ ] Create bucket named: `pdf_uploads`
- [ ] Set bucket to private
- [ ] Optional: Configure CORS if needed

## Step 3: Environment Variables (2 minutes)

- [ ] Create `.env.local` file in project root
- [ ] Copy content from `.env.example`
- [ ] Fill in Supabase credentials:
  - [ ] NEXT_PUBLIC_SUPABASE_URL (from Supabase dashboard)
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase dashboard)
  - [ ] SUPABASE_SERVICE_ROLE_KEY (from Supabase dashboard Settings)

## Step 4: Start Development Server (1 minute)

```bash
cd /vercel/share/v0-project
pnpm dev
```

- [ ] Wait for build to complete
- [ ] Open http://localhost:3000 in browser
- [ ] Verify home page loads

## Step 5: Test Admin Features (10 minutes)

### Admin Signup
- [ ] Go to http://localhost:3000/admin/signup
- [ ] Create admin account with:
  - [ ] Name: Your Name
  - [ ] Email: your-email@example.com
  - [ ] Password: Strong password (min 6 chars)
- [ ] Verify account created in Supabase auth_users table

### Admin Login
- [ ] Go to http://localhost:3000/admin/login
- [ ] Login with created credentials
- [ ] Verify redirected to admin dashboard

### Create Test Vacancy
- [ ] Click "New Vacancy" button
- [ ] Fill in form:
  - [ ] Job Title: e.g., "Software Engineer"
  - [ ] Company: e.g., "Tech Corp"
  - [ ] State: Select any state
  - [ ] Location: e.g., "Mumbai"
  - [ ] Salary Range: Min ₹500000, Max ₹1000000
  - [ ] Age Limit: 18-35 years
  - [ ] Qualifications: B.Tech/B.E
  - [ ] Application Deadline: Pick future date
  - [ ] Application Link: https://example.com/apply
- [ ] Click "Create Vacancy"
- [ ] Verify vacancy appears in dashboard
- [ ] Click "Publish" to make it visible

## Step 6: Test Public Features (5 minutes)

### Browse Jobs
- [ ] Go to http://localhost:3000/jobs
- [ ] Verify your created vacancy appears in list
- [ ] Test search: Type job title to search
- [ ] Test filters:
  - [ ] Select state
  - [ ] Enter salary range
- [ ] Verify results update in real-time

### View Job Details
- [ ] Click on job listing card
- [ ] Verify all details display correctly:
  - [ ] Job title and company
  - [ ] Location and salary
  - [ ] Eligibility information
  - [ ] "Apply Now" button
- [ ] Click "Apply Now" - should open external link

## Step 7: Optional - Razorpay Setup (for payments)

- [ ] Create account at https://razorpay.com
- [ ] Go to Settings → API Keys
- [ ] Copy Key ID and Key Secret
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
  RAZORPAY_KEY_SECRET=your_key_secret
  ```

## Step 8: Deploy to Vercel (Optional)

- [ ] Push code to GitHub
- [ ] Connect to Vercel: https://vercel.com
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy
- [ ] Access live at your Vercel domain

## Troubleshooting

### Build Fails
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Clear node_modules: `rm -rf node_modules`
- [ ] Reinstall: `pnpm install`
- [ ] Restart dev server: `pnpm dev`

### Supabase Connection Error
- [ ] Verify URL format: `https://xxxxx.supabase.co`
- [ ] Verify key is copied correctly
- [ ] Check internet connection
- [ ] Verify Supabase project is active

### Database Errors
- [ ] Check schema.sql was fully executed
- [ ] Verify all tables exist in Supabase
- [ ] Check RLS policies are enabled
- [ ] Look at Supabase logs for errors

### Admin Signup Fails
- [ ] Check email format is valid
- [ ] Verify password is at least 6 characters
- [ ] Check Supabase auth is enabled
- [ ] Look at browser console for errors

### Jobs Not Showing
- [ ] Verify vacancy is published (not draft)
- [ ] Check vacancy creation date is recent
- [ ] Verify state filter matches vacancy state
- [ ] Check database has no soft-delete flag

## Next Steps After Setup

1. **PDF Upload & Extraction** (see PROJECT_STATUS.md)
   - Integrate Claude/Grok API for PDF extraction
   - Test PDF uploads and parsing

2. **Payment Integration**
   - Setup Razorpay webhook
   - Test payment flow
   - Implement subscription system

3. **Resource Management**
   - Build admin resource upload interface
   - Create global resource library
   - Link resources to vacancies

4. **Testing & Polish**
   - Test on different devices
   - Fix any UI/UX issues
   - Optimize performance

## Resources

- Project Status: `/PROJECT_STATUS.md`
- Database Schema: `/database/schema.sql`
- README: `/README.md`
- Environment Template: `/.env.example`

## Getting Help

If you encounter issues:
1. Check Supabase dashboard for errors
2. Look at browser console (F12)
3. Check server logs in terminal
4. Review PROJECT_STATUS.md for known issues
5. Check the README troubleshooting section

---

Great! You now have a fully functional job portal skeleton. Happy building! 🚀
