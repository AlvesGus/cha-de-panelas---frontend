'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ShoppingBag, Trash } from 'lucide-react'
import Image from 'next/image'
import Loader from '@/components/ui/loader'

import { useAuth } from '../context/auth-context'
import { api } from '../api/axios/api'
import { Product, useProducts } from '../context/products'

export default function MyPresent() {
  const router = useRouter()
  const { session } = useAuth()
  const { removePresent } = useProducts()

  const [presents, setPresents] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPresents() {
      try {
        const res = await api.get('/api/my-presents', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        })

        setPresents(res.data.data)
      } catch (error) {
        console.error('Erro ao buscar presentes', error)
      } finally {
        setLoading(false)
      }
    }

    loadPresents()
  }, [session?.access_token, router])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <Loader />
      </div>
    )
  }

  return (
    <main className="w-full mt-6 px-10 lg:px-20 mb-10">
      <div className="w-full border-b border-zinc-300 pb-2">
        <span className="uppercase text-2xl font-bold">Meus presentes</span>
        <p className="text-zinc-500 mt-2">
          Você poderá acessar o link de compra, visualizar seus presentes
          escolhidos e remover.
        </p>
      </div>

      {presents.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center gap-10 pt-5">
          <p className="text-zinc-500">Nenhum presente selecionado</p>
          <Button
            variant="serenity"
            onClick={() => router.push('/list-present')}
            className="w-full"
          >
            Veja os presentes
          </Button>
        </div>
      )}

      <div className="w-full mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {presents.map(product => (
          <Card key={product.id}>
            <Image
              src={product.image_url}
              width={1000}
              height={1000}
              alt={product.name}
              className="w-full rounded-t-xl"
            />

            <CardContent>
              <h3 className="font-bold text-xl">{product.name}</h3>
              <div className="font-medium flex gap-2 text-serenity-base">
                <span>Valor aprox.:</span>
                <span>R${product.suggestion_price}</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <a
                href={product.link_shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-serenity-dark text-white font-semibold">
                  <ShoppingBag className="size-5" />
                  Comprar
                </Button>
              </a>

              <Button
                variant="serenity"
                className="w-full text-white font-semibold"
                onClick={() => removePresent(product.id)}
              >
                <Trash className="size-5" />
                Remover presente
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
