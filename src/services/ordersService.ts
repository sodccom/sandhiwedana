import { supabase } from '../lib/supabase';
import { Order } from '../types';

interface CreateOrderData {
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    province: string;
    postal_code?: string;
  };
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  notes?: string;
  promo_code_id?: string;
}

export const ordersService = {
  async create(orderData: CreateOrderData): Promise<Order | null> {
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        shipping_address: orderData.shipping_address,
        items: orderData.items,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.delivery_fee,
        discount_amount: orderData.discount_amount,
        total_amount: orderData.total_amount,
        payment_method: orderData.payment_method,
        payment_status: 'pending',
        order_status: 'pending',
        notes: orderData.notes,
        promo_code_id: orderData.promo_code_id,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating order:', error);
      return null;
    }

    return {
      id: data.id,
      order_number: data.order_number,
      customer_name: data.customer_name,
      phone: data.customer_phone,
      address: `${(data.shipping_address as any).street}, ${(data.shipping_address as any).city}`,
      city: (data.shipping_address as any).city,
      province: (data.shipping_address as any).province,
      items: data.items as any,
      total_lkr: Number(data.total_amount),
      payment_method: data.payment_method as any,
      status: data.order_status as any,
      created_at: data.created_at,
    };
  },

  async getById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      order_number: data.order_number,
      customer_name: data.customer_name,
      phone: data.customer_phone,
      address: `${(data.shipping_address as any).street}, ${(data.shipping_address as any).city}`,
      city: (data.shipping_address as any).city,
      province: (data.shipping_address as any).province,
      items: data.items as any,
      total_lkr: Number(data.total_amount),
      payment_method: data.payment_method as any,
      status: data.order_status as any,
      created_at: data.created_at,
    };
  },

  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data.map(order => ({
      id: order.id,
      order_number: order.order_number,
      customer_name: order.customer_name,
      phone: order.customer_phone,
      address: `${(order.shipping_address as any).street}, ${(order.shipping_address as any).city}`,
      city: (order.shipping_address as any).city,
      province: (order.shipping_address as any).province,
      items: order.items as any,
      total_lkr: Number(order.total_amount),
      payment_method: order.payment_method as any,
      status: order.order_status as any,
      created_at: order.created_at,
    }));
  },

  async updateStatus(id: string, status: string): Promise<boolean> {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: status })
      .eq('id', id);

    if (error) {
      console.error('Error updating order status:', error);
      return false;
    }

    return true;
  },

  async updatePaymentStatus(id: string, paymentStatus: string): Promise<boolean> {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }

    return true;
  },
};
