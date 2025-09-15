export interface Product {
  id: string;
  name_si: string;
  name_en: string;
  slug: string;
  description_si: string;
  description_en: string;
  price_lkr: number;
  stock: number;
  images: string[];
  created_at: string;
  updated_at: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  items: CartItem[];
  total_lkr: number;
  payment_method: 'cod' | 'bank_transfer' | 'payhere';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  created_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  valid_from: string;
  valid_to: string;
  usage_limit: number;
  used_count: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  text: string;
  rating: number;
  approved: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  created_at: string;
}

export interface AppSettings {
  site_name: string;
  contact_whatsapp: string;
  free_delivery_flag: boolean;
  delivery_message: string;
  currency_format: string;
  languages_supported: string[];
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
}