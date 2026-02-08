'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/auth-context' // ✅ seu contexto de Supabase

interface DataProps {
  id: number
  title: string
  href: string
  header: string
}

const data: DataProps[] = [
  { id: 1, title: 'Convite', href: '/', header: 'Nosso Convite' },
  {
    id: 2,
    title: 'Lista de Presentes',
    href: '/list-present',
    header: 'Lista de Presentes'
  },
  {
    id: 3,
    title: 'Meus Presentes',
    href: '/presents',
    header: 'Meus Presentes'
  }
]

export default function Header() {
  const path = usePathname()
  const { user, signOut, signInWithGoogle } = useAuth()

  return (
    <main className="w-full border-b border-zinc-400 p-4 bg-zinc-100 shadow-b shadow-md lg:px-20">
      <div className="flex items-center justify-between md:justify-center md:gap-2">
        <div>
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <span className="font-bold  text-4xl text-serenity-dark font-parisienne mt-2 mb-5">
                    Gu & Grazi
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col px-4 text-l gap-2">
                {data.map(item => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`${path === item.href ? 'text-blue-700' : 'text-zinc-400'} text-xl`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <SheetFooter>
                <div className="text-sm">
                  <span>
                    {user?.user_metadata?.name ||
                      user?.user_metadata?.full_name}
                  </span>
                </div>
                <Button
                  variant="serenity"
                  onClick={() => {
                    if (user) {
                      signOut()
                    } else {
                      signInWithGoogle()
                    }
                  }}
                >
                  {user ? 'Sair' : 'Entrar'}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          {data.map(item => (
            <h1 key={item.id} className="text-xl">
              {item.href === path ? item.header : null}
            </h1>
          ))}
        </div>
      </div>
    </main>
  )
}
