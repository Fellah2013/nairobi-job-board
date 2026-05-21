export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  payRate: 'daily' | 'weekly' | 'monthly' | 'once';
  payAmount: number;
  duration: string;
  postedAt: string;
  description: string;
  requirements: string[];
  contactNumber: string;
  isFeatured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  company?: string;
}

export type Category = 
  | 'Casual Jobs'
  | 'Cleaning & House Help'
  | 'Construction & Fundis'
  | 'Security Jobs'
  | 'Events & Hospitality'
  | 'Driving & Delivery'
  | 'Retail & Sales'
  | 'Online Work';

export const CATEGORIES: Category[] = [
  'Casual Jobs',
  'Cleaning & House Help',
  'Construction & Fundis',
  'Security Jobs',
  'Events & Hospitality',
  'Driving & Delivery',
  'Retail & Sales',
  'Online Work'
];