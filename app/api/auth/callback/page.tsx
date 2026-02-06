// app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getSession().then(() => {
      router.replace('/list-present')
    })
  }, [router])

  return <p>Autenticando...</p>
}
