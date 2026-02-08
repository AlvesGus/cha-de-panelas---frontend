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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

  const name =
    user?.user_metadata?.name || user?.user_metadata?.full_name || 'Usuário'

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.user_metadata?.image

  return (
    <main className="w-full border-b border-zinc-400 p-4 bg-zinc-100 shadow-b shadow-md lg:px-20">
      <div className="flex items-center justify-between lg:max-w-[80%] lg:mx-auto">
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
                {user ? (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={avatarUrl} alt={name} />
                      <AvatarFallback>
                        {name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-xl font-medium">{name}</span>
                  </div>
                ) : (
                  ''
                )}

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
