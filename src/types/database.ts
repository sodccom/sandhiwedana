export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name_en: string
          name_si: string
          slug: string
          description_en: string
          description_si: string
          price_lkr: number
          compare_at_price: number | null
          stock: number
          sku: string | null
          images: Json
          featured: boolean
          active: boolean
          category: string
          tags: string[]
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_si: string
          slug: string
          description_en?: string
          description_si?: string
          price_lkr: number
          compare_at_price?: number | null
          stock?: number
          sku?: string | null
          images?: Json
          featured?: boolean
          active?: boolean
          category?: string
          tags?: string[]
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_si?: string
          slug?: string
          description_en?: string
          description_si?: string
          price_lkr?: number
          compare_at_price?: number | null
          stock?: number
          sku?: string | null
          images?: Json
          featured?: boolean
          active?: boolean
          category?: string
          tags?: string[]
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_name: string
          customer_email: string | null
          customer_phone: string
          shipping_address: Json
          billing_address: Json | null
          items: Json
          subtotal: number
          delivery_fee: number
          discount_amount: number
          total_amount: number
          promo_code_id: string | null
          payment_method: string
          payment_status: string
          order_status: string
          notes: string | null
          tracking_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          customer_name: string
          customer_email?: string | null
          customer_phone: string
          shipping_address: Json
          billing_address?: Json | null
          items: Json
          subtotal: number
          delivery_fee?: number
          discount_amount?: number
          total_amount: number
          promo_code_id?: string | null
          payment_method: string
          payment_status?: string
          order_status?: string
          notes?: string | null
          tracking_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_name?: string
          customer_email?: string | null
          customer_phone?: string
          shipping_address?: Json
          billing_address?: Json | null
          items?: Json
          subtotal?: number
          delivery_fee?: number
          discount_amount?: number
          total_amount?: number
          promo_code_id?: string | null
          payment_method?: string
          payment_status?: string
          order_status?: string
          notes?: string | null
          tracking_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string | null
          phone: string
          addresses: Json
          total_orders: number
          total_spent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email?: string | null
          phone: string
          addresses?: Json
          total_orders?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string | null
          phone?: string
          addresses?: Json
          total_orders?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          type: string
          value: number
          min_order_amount: number
          max_discount: number | null
          usage_limit: number | null
          used_count: number
          valid_from: string
          valid_to: string | null
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          type: string
          value: number
          min_order_amount?: number
          max_discount?: number | null
          usage_limit?: number | null
          used_count?: number
          valid_from?: string
          valid_to?: string | null
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          type?: string
          value?: number
          min_order_amount?: number
          max_discount?: number | null
          usage_limit?: number | null
          used_count?: number
          valid_from?: string
          valid_to?: string | null
          active?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          customer_id: string | null
          customer_name: string
          text_en: string
          text_si: string
          rating: number
          order_id: string | null
          approved: boolean
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          customer_name: string
          text_en: string
          text_si?: string
          rating: number
          order_id?: string | null
          approved?: boolean
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          customer_name?: string
          text_en?: string
          text_si?: string
          rating?: number
          order_id?: string | null
          approved?: boolean
          featured?: boolean
          created_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string | null
          username: string
          role: string
          permissions: Json
          last_login: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          username: string
          role?: string
          permissions?: Json
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          username?: string
          role?: string
          permissions?: Json
          last_login?: string | null
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          event_type: string
          event_data: Json
          user_id: string | null
          session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          event_data?: Json
          user_id?: string | null
          session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          event_data?: Json
          user_id?: string | null
          session_id?: string | null
          created_at?: string
        }
      }
    }
  }
}
