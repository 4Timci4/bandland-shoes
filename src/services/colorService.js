import { supabase } from '../lib/supabase';

const from = 'colors';

const mapColorToFE = (color) => ({
  id: color.id,
  name: color.name,
  hexCode: color.hex_code,
});

export const colorService = {
  async getAll() {
    const { data, error } = await supabase.from(from).select('*').order('name', { ascending: true });
    if (error) throw error;
    return data.map(mapColorToFE);
  },
};