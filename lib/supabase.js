import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabase = createClient(supabaseUrl, supabaseKey)



export default supabase