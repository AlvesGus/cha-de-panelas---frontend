import { createSupabaseServerClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthCallback() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.getUser()
  redirect('/list-present')
}
