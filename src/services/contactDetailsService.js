import { supabase } from '../lib/supabase';

const TABLE_NAME = 'contact_details';
const SINGLE_ROW_ID = 1; // Bizim tek satırımızın ID'si her zaman 1 olacak

export const contactDetailsService = {
  async getContactDetails() {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', SINGLE_ROW_ID)
      .single();

    if (error) {
      console.error('Error fetching contact details:', error);
      throw error;
    }
    return data;
  },

  async updateContactDetails(details) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        address: details.address,
        phone: details.phone,
        email: details.email,
        map_embed_url: details.map_embed_url,
        updated_at: new Date(),
      })
      .eq('id', SINGLE_ROW_ID)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact details:', error);
      throw error;
    }
    return data;
  },
};
