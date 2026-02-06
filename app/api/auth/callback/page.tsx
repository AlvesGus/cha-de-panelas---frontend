'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }

      if (data.session) {
        router.replace('/list-present')
      }
    }

    handleAuth()
  }, [router])

  return <p>Finalizando login...</p>
}
