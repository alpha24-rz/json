export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  content_markdown: string;
  category: string;
  tech_stack: string[];
  thumbnail_url: string;
  demo_url: string;
  github_url: string;
  download_url: string;
  donation_qr_url: string;
  donation_link: string;
  is_featured: boolean;
  is_published: boolean;
  views_count: number;
  downloads_count: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  author_name: string;
  author_bio: string;
  github_profile: string;
  global_donation_qr: string;
  global_donation_link: string;
  donation_note: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface CoffeeSupporter {
  id: string;
  name: string;
  coffee_count: number;
  message: string;
  created_at: string;
}


