// Admin & Authentication
export interface Admin {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Vacancies
export interface Eligibility {
  qualifications: string[];
  age_limit?: string;
  experience_required?: string;
  [key: string]: any;
}

export interface SelectionProcess {
  exam_details?: string;
  interview_details?: string;
  [key: string]: any;
}

export interface Vacancy {
  id: string;
  admin_id: string;
  job_title: string;
  company_name: string;
  location: string;
  state: string;
  salary_range_min?: number;
  salary_range_max?: number;
  eligibility?: Eligibility;
  selection_process?: SelectionProcess;
  application_deadline: string;
  application_link: string;
  description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// PDF Uploads
export interface PDFUpload {
  id: string;
  vacancy_id: string;
  file_url: string;
  original_filename: string;
  file_size: number;
  created_at: string;
}

// Resources (Hybrid: Global + Per-Vacancy)
export type ResourceType = 'admit_card' | 'result' | 'answer_key' | 'syllabus';
export type ResourceScope = 'global' | 'vacancy-specific';

export interface Resource {
  id: string;
  resource_type: ResourceType;
  title: string;
  description?: string;
  url?: string;
  file_path?: string;
  scope: ResourceScope;
  vacancy_id?: string;
  exam_name?: string;
  exam_date?: string;
  created_at: string;
  updated_at: string;
}

// PDF Purchases
export type PurchaseType = 'one_time' | 'subscription';

export interface PDFPurchase {
  id: string;
  user_email: string;
  pdf_id: string;
  purchase_type: PurchaseType;
  razorpay_payment_id: string;
  amount_paid: number;
  purchased_at: string;
  expires_at?: string;
}

// Subscriptions
export type SubscriptionStatus = 'active' | 'canceled' | 'expired';
export type SubscriptionPlan = 'monthly' | 'annual';

export interface Subscription {
  id: string;
  user_email: string;
  plan_type: SubscriptionPlan;
  razorpay_subscription_id: string;
  status: SubscriptionStatus;
  started_at: string;
  expires_at: string;
  amount: number;
}

// User Searches (Analytics)
export interface UserSearch {
  id: string;
  search_query: string;
  filters_applied?: Record<string, any>;
  results_count: number;
  created_at: string;
}

// Extracted PDF Data
export interface ExtractedPDFData {
  job_title?: string;
  company_name?: string;
  location?: string;
  state?: string;
  salary_range_min?: number;
  salary_range_max?: number;
  eligibility?: Eligibility;
  selection_process?: SelectionProcess;
  application_deadline?: string;
  application_link?: string;
  description?: string;
}
