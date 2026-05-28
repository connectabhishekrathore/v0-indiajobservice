// Job categories and types
export type JobCategory = 
  | "latest-jobs"
  | "admit-card"
  | "result"
  | "answer-key"
  | "syllabus"
  | "admission";

export type JobType = 
  | "central-govt"
  | "state-govt"
  | "bank"
  | "railway"
  | "defence"
  | "police"
  | "ssc"
  | "upsc"
  | "teaching"
  | "medical"
  | "engineering"
  | "others";

export type Qualification = 
  | "10th"
  | "12th"
  | "graduate"
  | "post-graduate"
  | "diploma"
  | "iti"
  | "any";

export interface Job {
  id: string;
  title: string;
  titleHindi: string;
  organization: string;
  organizationHindi: string;
  category: JobCategory;
  type: JobType;
  state: string;
  qualification: Qualification;
  vacancies: number;
  salaryMin: number;
  salaryMax: number;
  ageMin: number;
  ageMax: number;
  applicationFee: {
    general: number;
    obc: number;
    sc_st: number;
    women: number;
  };
  importantDates: {
    notificationDate: string;
    startDate: string;
    lastDate: string;
    examDate?: string;
    admitCardDate?: string;
    resultDate?: string;
  };
  links: {
    official: string;
    applyOnline?: string;
    notification?: string;
    syllabus?: string;
    admitCard?: string;
    result?: string;
    answerKey?: string;
  };
  description: string;
  descriptionHindi: string;
  highlights: string[];
  highlightsHindi: string[];
  isHot: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isPremium: boolean;
  premiumExpiry?: string;
  savedJobs: string[];
  preferences: {
    states: string[];
    categories: JobCategory[];
    types: JobType[];
    qualifications: Qualification[];
  };
  createdAt: string;
}

export interface TrendingItem {
  id: string;
  text: string;
  textHindi: string;
  link: string;
  isNew: boolean;
}

// Indian states for filtering
export const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export const JOB_CATEGORIES: { value: JobCategory; label: string; labelHindi: string; icon: string }[] = [
  { value: "latest-jobs", label: "Latest Jobs", labelHindi: "नवीनतम नौकरियां", icon: "Briefcase" },
  { value: "admit-card", label: "Admit Card", labelHindi: "एडमिट कार्ड", icon: "CreditCard" },
  { value: "result", label: "Result", labelHindi: "परिणाम", icon: "Trophy" },
  { value: "answer-key", label: "Answer Key", labelHindi: "उत्तर कुंजी", icon: "Key" },
  { value: "syllabus", label: "Syllabus", labelHindi: "पाठ्यक्रम", icon: "BookOpen" },
  { value: "admission", label: "Admission", labelHindi: "प्रवेश", icon: "GraduationCap" },
];

export const JOB_TYPES: { value: JobType; label: string; labelHindi: string }[] = [
  { value: "central-govt", label: "Central Govt", labelHindi: "केंद्र सरकार" },
  { value: "state-govt", label: "State Govt", labelHindi: "राज्य सरकार" },
  { value: "bank", label: "Bank Jobs", labelHindi: "बैंक नौकरियां" },
  { value: "railway", label: "Railway", labelHindi: "रेलवे" },
  { value: "defence", label: "Defence", labelHindi: "रक्षा" },
  { value: "police", label: "Police", labelHindi: "पुलिस" },
  { value: "ssc", label: "SSC", labelHindi: "एसएससी" },
  { value: "upsc", label: "UPSC", labelHindi: "यूपीएससी" },
  { value: "teaching", label: "Teaching", labelHindi: "शिक्षण" },
  { value: "medical", label: "Medical", labelHindi: "चिकित्सा" },
  { value: "engineering", label: "Engineering", labelHindi: "इंजीनियरिंग" },
  { value: "others", label: "Others", labelHindi: "अन्य" },
];

export const QUALIFICATIONS: { value: Qualification; label: string; labelHindi: string }[] = [
  { value: "10th", label: "10th Pass", labelHindi: "10वीं पास" },
  { value: "12th", label: "12th Pass", labelHindi: "12वीं पास" },
  { value: "graduate", label: "Graduate", labelHindi: "स्नातक" },
  { value: "post-graduate", label: "Post Graduate", labelHindi: "स्नातकोत्तर" },
  { value: "diploma", label: "Diploma", labelHindi: "डिप्लोमा" },
  { value: "iti", label: "ITI", labelHindi: "आईटीआई" },
  { value: "any", label: "Any", labelHindi: "कोई भी" },
];
