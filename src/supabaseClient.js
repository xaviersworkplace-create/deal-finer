import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lscvmndpruhovdzkbbbn.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YkrGDwr7v_NIfT78KLwVZQ_tGh9hwhl';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);