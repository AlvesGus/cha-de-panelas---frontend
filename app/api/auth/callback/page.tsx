'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const finalize = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.replace('/list-present')
      }
    }

    finalize()
  }, [router])

  return <p>Finalizando login...</p>
}
