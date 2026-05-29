# Supabase Setup & Admin Guide

## Production URL
**https://v0-indiajobservice-rust.vercel.app**

---

## Database Setup - COMPLETED ✅

The Supabase database schema has been migrated with the following tables:

### Tables Created:
- **admins** - Admin user profiles with email and name
- **vacancies** - Job postings with full details
- **pdf_uploads** - Vacancy PDF documents
- **resources** - Exam materials and resources
- **pdf_purchases** - One-time PDF purchases
- **subscriptions** - Subscription plans
- **user_searches** - Search analytics

### Row Level Security (RLS) - ENABLED ✅
- Public users can view published vacancies
- Only admins can manage their own vacancies
- Automatic enforcement based on user ID

---

## Admin Account Creation

### Method 1: Direct Database Insertion
Connect to your Supabase project and run:

```sql
INSERT INTO public.admins (id, email, name) VALUES
  (gen_random_uuid(), 'admin@example.com', 'Admin Name');
```

### Method 2: Through the App
1. Visit: https://v0-indiajobservice-rust.vercel.app/admin/signup
2. Enter your email, password, and name
3. Verify your email (check inbox)
4. Login with your credentials

---

## Admin Features

### Admin Login
**URL:** https://v0-indiajobservice-rust.vercel.app/admin/login

Admin-only authentication with email/password.

### Admin Dashboard
**URL:** https://v0-indiajobservice-rust.vercel.app/admin/dashboard

Features:
- View all vacancies (Published & Draft)
- Statistics: Total, Published, Draft counts
- Publish/Unpublish vacancies
- Edit vacancy details
- Delete vacancies

### Create Vacancy
**URL:** https://v0-indiajobservice-rust.vercel.app/admin/vacancies/new

Form includes:
- Job title, company name, location
- State dropdown (all 28 Indian states)
- Salary range (min/max)
- Application deadline
- Apply link (external URL)
- Full job description
- Eligibility & selection process

### Upload PDF
**URL:** https://v0-indiajobservice-rust.vercel.app/admin/pdf-upload

- Select a vacancy
- Upload PDF document
- Automatically stored in Supabase Storage
- Max file size: 10MB

---

## Security Features

### Admin Protection
✅ Only authenticated admins can access:
- `/admin/dashboard`
- `/admin/vacancies/*`
- `/admin/pdf-upload`

✅ Automatic redirect to login for non-authenticated users
✅ Session verification on every protected route
✅ Automatic logout on role verification failure

### Role-Based Access
✅ Admins can only see/manage their own vacancies
✅ Public users see only published vacancies
✅ No cross-admin data leakage

### Database Security
✅ Row Level Security (RLS) on all tables
✅ Parameterized queries (prevents SQL injection)
✅ Admin ID verification on all mutations

---

## Testing Checklist

- [ ] Create admin account via signup
- [ ] Login to admin dashboard
- [ ] View dashboard statistics
- [ ] Create new vacancy
- [ ] Publish vacancy
- [ ] View vacancy on public /jobs page
- [ ] Edit vacancy
- [ ] Upload PDF
- [ ] Unpublish vacancy
- [ ] Delete vacancy
- [ ] Logout
- [ ] Verify non-admin cannot access /admin pages

---

## Public Features

### Job Browse
**URL:** https://v0-indiajobservice-rust.vercel.app/jobs

- View all published vacancies
- Search by title/company/location
- Filter by state
- Pagination support

### Job Details
**URL:** https://v0-indiajobservice-rust.vercel.app/jobs/[id]

- Full vacancy details
- Salary range
- Eligibility criteria
- Apply link button
- Resources section

### Subscriptions
**URL:** https://v0-indiajobservice-rust.vercel.app/subscriptions

- Available subscription plans
- Pricing information
- Purchase options

---

## Environment Variables

All required environment variables are automatically set by Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are provided by Supabase integration in Vercel project settings.

---

## Troubleshooting

### Cannot login to admin panel
- Verify admin exists in `admins` table
- Check email/password combination
- Ensure email is confirmed

### Vacancies not appearing on public site
- Verify `published = true` in database
- Check `deleted_at` is NULL
- Wait for page cache to clear

### PDF upload fails
- Verify file is PDF format
- Check file size < 10MB
- Ensure Supabase Storage bucket exists

### 404 on admin pages
- You must be logged in as an admin
- Non-admin users are redirected to login
- Check browser developer console for auth errors

---

## Next Steps

1. Create your first admin account
2. Login to the admin dashboard
3. Create some job vacancies
4. Publish vacancies for public viewing
5. Test the complete flow
6. Upload PDFs for vacancies
7. Monitor user activity

---

## Support

For issues or questions:
- Check Supabase dashboard logs
- Verify all environment variables are set
- Test admin login credentials
- Check browser console for errors

---

**Status:** ✅ Production Ready
**Last Updated:** 2026-05-29
**Version:** 1.0.0
