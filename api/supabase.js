const { createClient } =require('@supabase/supabase-js');
const { url, anon } = require('./credentials');

const supabaseUrl = url
const supabaseAnonKey = anon

const supabase = createClient(supabaseUrl, supabaseAnonKey)

exports.supabase = supabase;