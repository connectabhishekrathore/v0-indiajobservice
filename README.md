# India Job Service - Complete Job Portal

A comprehensive job portal for India with admin vacancy management, PDF uploads with AI extraction, payment processing, and hybrid resource management.

## Features

### Admin Features
- ✅ Secure admin authentication (email + password)
- ✅ Create, edit, and manage job vacancies
- ✅ PDF upload and storage with Supabase
- ✅ Publish/unpublish vacancies
- ✅ Soft delete functionality
- ✅ Dashboard with vacancy management

### Public Features
- ✅ Browse published job listings
- ✅ Search by job title, company, location
- ✅ Filter by state, salary range, deadline
- ✅ View detailed job information
- ✅ State-wise job categorization
- ✅ Direct application links

### Payment Features
- 🚀 Razorpay integration (in progress)
- 🚀 Per-PDF purchase (₹20 per PDF)
- 🚀 Subscription model (monthly/annual for unlimited PDFs)
- 🚀 Secure payment verification

### Resources Management
- 🚀 Hybrid system: global resources + per-vacancy resources
- 🚀 Admit cards, results, answer keys, syllabi
- 🚀 Admin resource upload and management
- 🚀 Public resource browsing

### AI Features
- 🚀 PDF text extraction with pdfjs-dist
- 🚀 Structured data extraction via Claude/Grok API
- 🚀 Auto-fill form with extracted vacancy details
- 🚀 Comprehensive extraction: job title, salary, eligibility, selection process

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI**: Tailwind CSS
- **PDF Processing**: pdfjs-dist
- **Payments**: Razorpay
- **AI**: Claude API (via Vercel AI SDK)
- **Storage**: Supabase Storage

## Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   └── vacancies/
│   ├── api/
│   │   ├── pdf/download/
│   │   └── webhooks/razorpay/
│   ├── jobs/
│   │   ├── page.tsx (listings)
│   │   └── [id]/page.tsx (detail)
│   ├── layout.tsx
│   ├── page.tsx (home)
│   └── globals.css
├── lib/
│   ├── supabase.ts
│   ├── auth.ts
│   ├── vacancy.ts
│   ├── pdf.ts
│   ├── public.ts
│   └── payments.ts
├── types/
│   └── index.ts
├── database/
│   └── schema.sql
└── public/
```

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/connectabhishekrathore/v0-indiajobservice.git
cd v0-indiajobservice
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Supabase

1. Create a project at [Supabase](https://supabase.com)
2. Copy your Project URL and Anon Key
3. Go to SQL Editor and run the SQL migration:
   - Open `/database/schema.sql`
   - Copy and paste into Supabase SQL Editor
   - Execute to create all tables and indexes

### 4. Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Setup PDF Storage in Supabase

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `pdf_uploads`
3. Set it to private
4. Configure CORS if needed

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Admins

1. **Create Admin Account**
   - Go to `/admin/signup`
   - Enter email, password, and name
   - Supabase will send a confirmation email

2. **Login to Dashboard**
   - Go to `/admin/login`
   - Enter credentials
   - Access dashboard at `/admin/dashboard`

3. **Create Vacancy**
   - Click "New Vacancy"
   - Fill in job details
   - Optionally upload PDF (auto-extraction coming soon)
   - Click "Create Vacancy"
   - Publish from dashboard

4. **Manage Resources**
   - Access `/admin/resources` (to be built)
   - Upload admit cards, results, answer keys, syllabi
   - Set scope: global or per-vacancy

### For Job Seekers

1. **Browse Jobs**
   - Visit `/jobs`
   - Search by title, company, location
   - Filter by state, salary, deadline

2. **View Job Details**
   - Click on any job listing
   - See full job details
   - View related resources
   - Click "Apply Now" to apply

3. **Purchase PDFs** (coming soon)
   - Download vacancy PDFs for ₹20 per PDF
   - Or subscribe for unlimited access
   - Payment via Razorpay

## Database Schema

### Core Tables

- **admins**: Admin user profiles
- **vacancies**: Job vacancy listings
- **pdf_uploads**: Uploaded PDF files
- **resources**: Global and per-vacancy resources
- **pdf_purchases**: PDF purchase records
- **subscriptions**: User subscription plans
- **user_searches**: Analytics data

See `/database/schema.sql` for detailed schema.

## API Endpoints

### Public APIs
- `GET /api/vacancies` - List published vacancies
- `GET /api/vacancies/:id` - Get vacancy details
- `GET /api/resources` - List resources
- `GET /api/pdf/download?id=:pdfId&email=:email` - Download PDF (requires purchase)

### Webhook Endpoints
- `POST /api/webhooks/razorpay` - Razorpay payment webhook

## Future Enhancements

- [ ] AI-powered PDF extraction with Claude/Grok
- [ ] Complete Razorpay payment integration
- [ ] Subscription management
- [ ] User accounts and saved jobs
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Resource management interface
- [ ] Advanced search and recommendations
- [ ] Mobile app
- [ ] Multi-language support

## Security

- Admin routes protected with Supabase Auth
- Row Level Security (RLS) enabled on all tables
- PDF downloads require authentication
- Payment signatures verified with Razorpay
- Environment variables for all secrets
- CORS policies configured

## Performance

- Database indexes on frequently queried columns
- Lazy loading for PDFs and resources
- Client-side search debouncing
- Server-side filtering and pagination

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
vercel deploy
```

### Database Backups

Supabase automatically backs up your database. Configure backups in the Supabase dashboard.

## Troubleshooting

### Supabase Connection Issues
- Verify URL and key are correct
- Check that Supabase project is active
- Verify CORS settings if accessing from different domain

### Authentication Issues
- Clear browser cookies and try again
- Check that auth table exists in database
- Verify email confirmation is set up

### PDF Upload Errors
- Check that `pdf_uploads` storage bucket exists
- Verify bucket is private
- Check file size limits

### Payment Issues
- Verify Razorpay keys are correct
- Check webhook endpoint is accessible
- Review Razorpay logs for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed error messages and reproduction steps

## Contact

- Email: support@indiajobservice.com
- Website: https://indiajobservice.com
- GitHub: https://github.com/connectabhishekrathore/v0-indiajobservice

---

Built with ❤️ for India's job seekers
