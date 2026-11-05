export interface Activity {
  id: number;
  title: string;
  description: string | null;
  category: ActivityCategory;
  address: string | null;
  phone: string | null;
  openingHours: string | null;
  website: string | null;
}

export interface ActivityRequest {
    title: string;
    description: string;
    category: ActivityCategory;
    address: string;
    phone: string;
    openingHours: string;
    website: string;
}

export type ActivityCategory = 'MUSEUM' | 'CASTLE' | 'ACTIVITY' | 'PARK' | 'CAVE';

