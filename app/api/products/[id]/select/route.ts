import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '../../../../lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Criando cliente SSR, forçando cookies como 'any' para TypeScript
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // @ts-expect-error: Next.js cookies type não bate com Supabase
      cookies: cookies
    }
  )

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401
    })
  }

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: { is_active: false, selected_by: user.id }
  })

  return new Response(JSON.stringify({ success: true, updated }))
}
