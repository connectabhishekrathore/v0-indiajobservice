-- India Job Service Database Schema
-- Run this in Supabase SQL Editor

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create vacancies table
CREATE TABLE IF NOT EXISTS vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  eligibility JSONB,
  selection_process JSONB,
  application_deadline TIMESTAMP NOT NULL,
  application_link VARCHAR(500),
  description TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Create pdf_uploads table
CREATE TABLE IF NOT EXISTS pdf_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id UUID NOT NULL REFERENCES vacancies(id) ON DELETE CASCADE,
  file_url VARCHAR(500) NOT NULL,
  original_filename VARCHAR(255),
  file_size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create resources table (hybrid: global + per-vacancy)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('admit_card', 'result', 'answer_key', 'syllabus')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  file_path VARCHAR(500),
  scope VARCHAR(50) NOT NULL CHECK (scope IN ('global', 'vacancy-specific')),
  vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE,
  exam_name VARCHAR(255),
  exam_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create pdf_purchases table
CREATE TABLE IF NOT EXISTS pdf_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255) NOT NULL,
  pdf_id UUID NOT NULL REFERENCES pdf_uploads(id) ON DELETE CASCADE,
  purchase_type VARCHAR(50) NOT NULL CHECK (purchase_type IN ('one_time', 'subscription')),
  razorpay_payment_id VARCHAR(255),
  amount_paid INTEGER NOT NULL,
  purchased_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255) NOT NULL,
  plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
  razorpay_subscription_id VARCHAR(255),
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  amount INTEGER NOT NULL
);

-- Create user_searches table for analytics
CREATE TABLE IF NOT EXISTS user_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query VARCHAR(255),
  filters_applied JSONB,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vacancies_admin_id ON vacancies(admin_id);
CREATE INDEX IF NOT EXISTS idx_vacancies_state ON vacancies(state);
CREATE INDEX IF NOT EXISTS idx_vacancies_published ON vacancies(published);
CREATE INDEX IF NOT EXISTS idx_pdf_uploads_vacancy_id ON pdf_uploads(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_resources_vacancy_id ON resources(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_resources_scope ON resources(scope);
CREATE INDEX IF NOT EXISTS idx_pdf_purchases_user_email ON pdf_purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email ON subscriptions(user_email);

-- Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access to published vacancies
CREATE POLICY "Public can view published vacancies" ON vacancies
  FOR SELECT USING (published = TRUE AND deleted_at IS NULL);

CREATE POLICY "Admins can view their own vacancies" ON vacancies
  FOR SELECT USING (admin_id = auth.uid());

CREATE POLICY "Admins can insert vacancies" ON vacancies
  FOR INSERT WITH CHECK (admin_id = auth.uid());

CREATE POLICY "Admins can update their own vacancies" ON vacancies
  FOR UPDATE USING (admin_id = auth.uid());

CREATE POLICY "Admins can delete their own vacancies" ON vacancies
  FOR DELETE USING (admin_id = auth.uid());

-- Resources policies
CREATE POLICY "Public can view global resources" ON resources
  FOR SELECT USING (scope = 'global');

CREATE POLICY "Public can view per-vacancy resources for published vacancies" ON resources
  FOR SELECT USING (
    scope = 'vacancy-specific' AND 
    vacancy_id IN (SELECT id FROM vacancies WHERE published = TRUE AND deleted_at IS NULL)
  );

CREATE POLICY "Admins can manage resources" ON resources
  FOR ALL USING (
    vacancy_id IS NULL OR
    vacancy_id IN (SELECT id FROM vacancies WHERE admin_id = auth.uid())
  );
