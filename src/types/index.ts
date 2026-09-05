export interface Speaker {
  id: string;
  name: string;
  profession: string;
  organization: string;
  talkTitle: string;
  shortDescription: string;
  fullAbstract: string;
  quote: string;
  topic: string;
  image: string;
  sessionTime?: string;
  keyTakeaways: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface EventEdition {
  year: string;
  theme: string;
  tagline: string;
  date: string;
  venue: string;
  speakersCount: number;
  attendeesCount: number;
  description: string;
  coverImage: string;
  secondaryImage: string;
  talksHighlight: string[];
}

export type TeamDepartment = 
  | 'Organizing Team'
  | 'Curators'
  | 'Creative Team'
  | 'Marketing & PR'
  | 'Operations'
  | 'Sponsorship'
  | 'Technical Team';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: TeamDepartment;
  image: string;
  linkedin: string;
  instagram: string;
  quote?: string;
}

export type GalleryCategory = 'all' | 'stage' | 'speakers' | 'audience' | 'team' | 'workshops' | 'behind the scenes';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  aspectRatio: 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/9]' | 'aspect-square';
  caption: string;
}

export interface TicketPass {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  badge: string;
  popular?: boolean;
  perks: string[];
}

export type PaymentMethod = 'upi_qr' | 'upi_vpa' | 'card' | 'netbanking';

export interface PaymentDetails {
  method: PaymentMethod;
  transactionId: string;
  orderId: string;
  invoiceNumber: string;
  bankRef: string;
  amount: number;
  subtotal: number;
  discount: number;
  tax: number;
  paidAt: string;
  vpaHandle?: string;
  cardLast4?: string;
  bankName?: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  description: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  department: string;
  areaOfInterest: string;
  whyJoin: string;
  portfolioOrLinkedIn: string;
}
