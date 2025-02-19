export type MetricValue = {
  value: number | null
  change: number | null
  percent_change: number | null
}

export type HarmonicInvestor = {
  entity_urn: string
  is_lead: boolean
  investor_name: string
  association_urn: string
  investor_urn: string
  visibility_status: string | null
}

export type TractionMetric = {
  "14d_ago": MetricValue
  "30d_ago": MetricValue
  "90d_ago": MetricValue
  "180d_ago": MetricValue
  "365d_ago": MetricValue
  metrics: any[] // Replace `any[]` with a specific type if you know the structure of the metrics array
  latest_metric_value: number | null
}

export type TractionMetrics = {
  facebook_like_count: TractionMetric
  external_facebook_like_count: TractionMetric
  facebook_follower_count: TractionMetric
  external_facebook_follower_count: TractionMetric
  facebook_following_count: TractionMetric
  external_facebook_following_count: TractionMetric
  linkedin_follower_count: TractionMetric
  external_linkedin_follower_count: TractionMetric
  instagram_follower_count: TractionMetric
  external_instagram_follower_count: TractionMetric
  twitter_follower_count: TractionMetric
  external_twitter_follower_count: TractionMetric
  headcount: TractionMetric
  corrected_headcount: TractionMetric
  external_headcount: TractionMetric
  funding_total: TractionMetric
  web_traffic: TractionMetric
  headcount_advisor: TractionMetric
  headcount_customer_success: TractionMetric
  headcount_data: TractionMetric
  headcount_design: TractionMetric
  headcount_engineering: TractionMetric
  headcount_finance: TractionMetric
  headcount_legal: TractionMetric
  headcount_marketing: TractionMetric
  headcount_operations: TractionMetric
  headcount_other: TractionMetric
  headcount_people: TractionMetric
  headcount_product: TractionMetric
  headcount_sales: TractionMetric
  headcount_support: TractionMetric
}

export interface HarmonicCompanyResponse {
  website: {
    url: string
    domain: string
    is_broken: boolean
  }
  logo_url: string
  name: string
  legal_name: string | null
  description: string
  customer_type: string
  founding_date: {
    date: string
    granularity: string
  }
  headcount: number
  ownership_status: string
  company_type: string
  location: {
    address_formatted: string
    location: string
    street: string
    city: string
    state: string
    zip: number
    country: string
  }
  contact: {
    emails: string[]
    phone_numbers: string[]
    exec_emails: string[]
  }
  socials: {
    [key: string]: {
      url: string
      follower_count: number | null
      username: string | null
      status: string | null
    }
  }
  funding: {
    funding_total: number
    num_funding_rounds: number
    investors: {
      entity_urn: string
      name: string
    }[]
    last_funding_at: string
    last_funding_type: string
    last_funding_total: number
    funding_stage: string
  }
  name_aliases: string[]
  website_domain_aliases: string[]
  corrected_headcount: number
  external_headcount: number
  web_traffic: number
  stage: string
  requested_entity_urn: string
  entity_urn: string
  id: number
  funding_attribute_null_status: string
  headquarters: string
  tags: string[]
  tags_v2: {
    display_value: string
    type: string
    date_added: string
    entity_urn: string
    company_urn: string | null
  }[]
  snapshots: any[]
  initialized_date: string
  highlights: {
    category: string
    date_added: string | null
    text: string
    company_urn: string | null
  }[]
  traction_metrics: TractionMetrics
  updated_at: string
  people: {
    contact: string | null
    title: string
    department: string
    description: string | null
    start_date: string
    end_date: string | null
    is_current_position: boolean
    location: string | null
    role_type: string
    person: string
    person_company_urn: string
  }[]
  employee_highlights: {
    category: string
    date_added: string | null
    text: string
    company_urn: string | null
  }[]
  funding_rounds: {
    announcement_date: string
    funding_round_type: string
    funding_amount: number
    funding_currency: string
    investors: HarmonicInvestor[]
    post_money_valuation: string | null
    entity_urn: string
    company_urn: string
    source_url: string
  }[]
  funding_per_employee: number
  external_description: string
  investor_urn: string | null
  related_companies: {
    beta_notice: string
    acquisitions: any[]
    acquired_by: string | null
    subsidiaries: any[]
    subsidiary_of: string | null
  }
}


export interface HarmonicLocation {
  address_formatted: string | null;
  location: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
}

export interface HarmonicSocial {
  url: string;
  follower_count: number | null;
  username: string | null;
  status: string | null;
}

export interface HarmonicExperience {
  contact: string | null;
  title: string;
  department: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current_position: boolean;
  location: string | null;
  role_type: string;
  company: string; // e.g., urn:harmonic:company:18656035
  company_name?: string; // Optional since it's not in unstandardized experience
}

export interface HarmonicSchool {
    name: string;
    linkedin_url: string;
    logo_url: string | null;
    entity_urn: string; // e.g., "urn:harmonic:school:c5a11cc6-9285-44d3-99fb-ed2a661bab11"
  }
  
  export interface HarmonicEducation {
    school: HarmonicSchool;
    degree: string | null;
    field: string | null;
    grade: string | null;
    start_date: string | null; // ISO date string
    end_date: string | null;   // ISO date string
  }
  

export interface HarmonicPersonResponse {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string | null;
  contact: string | null;
  location: HarmonicLocation;
  education: HarmonicEducation[]; 
  socials: Partial<Record<string, HarmonicSocial>>;
  experience: HarmonicExperience[];
  unstandardized_experience__internal: HarmonicExperience[];
  websites: string[];
  linkedin_connections: number | null;
  usurping_person_id: number | null;
  linkedin_headline: string | null;
  linkedin_profile_visibility_type: string;
  last_checked_at: string;
  entity_urn: string;
  highlights: any[]; // Structure unknown, adjust if necessary
  updated_at: string;
  awards__beta: any[]; // Structure unknown
  recommendations__beta: any[]; // Structure unknown
  current_company_urns: string[]; // List of company URNs
  last_refreshed_at: string;
  investor_urn: string | null;
}
