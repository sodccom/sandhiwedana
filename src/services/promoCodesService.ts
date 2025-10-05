import { supabase } from '../lib/supabase';

export interface PromoCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_order_amount: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_to: string | null;
  active: boolean;
}

export const promoCodesService = {
  async validate(code: string, orderAmount: number): Promise<{ valid: boolean; discount: number; promoCode?: PromoCode; message?: string }> {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .maybeSingle();

    if (error || !data) {
      return { valid: false, discount: 0, message: 'Invalid promo code' };
    }

    const now = new Date();
    const validFrom = new Date(data.valid_from);
    const validTo = data.valid_to ? new Date(data.valid_to) : null;

    if (now < validFrom) {
      return { valid: false, discount: 0, message: 'Promo code not yet active' };
    }

    if (validTo && now > validTo) {
      return { valid: false, discount: 0, message: 'Promo code has expired' };
    }

    if (orderAmount < data.min_order_amount) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount is ${data.min_order_amount} LKR`,
      };
    }

    if (data.usage_limit && data.used_count >= data.usage_limit) {
      return { valid: false, discount: 0, message: 'Promo code usage limit reached' };
    }

    let discount = 0;
    if (data.type === 'percent') {
      discount = (orderAmount * data.value) / 100;
      if (data.max_discount) {
        discount = Math.min(discount, data.max_discount);
      }
    } else {
      discount = data.value;
    }

    return {
      valid: true,
      discount: Math.min(discount, orderAmount),
      promoCode: data as PromoCode,
    };
  },

  async incrementUsage(promoCodeId: string): Promise<void> {
    await supabase.rpc('increment_promo_code_usage', { promo_code_id: promoCodeId });
  },

  async getAll(): Promise<PromoCode[]> {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching promo codes:', error);
      return [];
    }

    return data as PromoCode[];
  },

  async create(promoCode: Omit<PromoCode, 'id' | 'used_count'>): Promise<PromoCode | null> {
    const { data, error } = await supabase
      .from('promo_codes')
      .insert({
        code: promoCode.code.toUpperCase(),
        type: promoCode.type,
        value: promoCode.value,
        min_order_amount: promoCode.min_order_amount,
        max_discount: promoCode.max_discount,
        usage_limit: promoCode.usage_limit,
        valid_from: promoCode.valid_from,
        valid_to: promoCode.valid_to,
        active: promoCode.active,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating promo code:', error);
      return null;
    }

    return data as PromoCode;
  },

  async update(id: string, updates: Partial<PromoCode>): Promise<boolean> {
    const { error } = await supabase
      .from('promo_codes')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating promo code:', error);
      return false;
    }

    return true;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting promo code:', error);
      return false;
    }

    return true;
  },
};
