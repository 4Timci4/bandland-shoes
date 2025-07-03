import { supabase } from '../lib/supabase';

const from = 'contact_submissions';

export const contactService = {
  // === VİTRİN İÇİN ===
  async submitMessage(formData) {
    const { data, error } = await supabase
      .from(from)
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      ]);
      
    if (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
    return data;
  },

  // === ADMİN PANELİ İÇİN ===
  async getAllSubmissions() {
    const { data, error } = await supabase
      .from(from)
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
    return data;
  },

  async markAsRead(id) {
    const { data, error } = await supabase
      .from(from)
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking as read:', error);
      throw error;
    }
    return data;
  },

  async deleteSubmission(id) {
    const { data, error } = await supabase
      .from(from)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
    return data;
  }
};