import { supabase } from '../lib/supabase';

export const analyticsService = {
  async trackEvent(
    eventType: string,
    eventData: Record<string, any> = {},
    userId?: string
  ): Promise<void> {
    const sessionId = sessionStorage.getItem('sessionId') || `session-${Date.now()}`;
    sessionStorage.setItem('sessionId', sessionId);

    await supabase.from('analytics_events').insert({
      event_type: eventType,
      event_data: eventData,
      user_id: userId,
      session_id: sessionId,
    });
  },

  async getEventsByType(eventType: string, limit = 100) {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('event_type', eventType)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching analytics:', error);
      return [];
    }

    return data;
  },

  async getEventsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching analytics:', error);
      return [];
    }

    return data;
  },

  async getDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [pageViews, productViews, addToCarts] = await Promise.all([
      this.getEventsByDateRange(weekAgo, today + 'T23:59:59'),
      this.getEventsByType('product_view', 1000),
      this.getEventsByType('add_to_cart', 1000),
    ]);

    return {
      totalPageViews: pageViews.length,
      totalProductViews: productViews.length,
      totalAddToCarts: addToCarts.length,
      conversionRate: productViews.length > 0
        ? ((addToCarts.length / productViews.length) * 100).toFixed(2)
        : '0',
    };
  },
};
