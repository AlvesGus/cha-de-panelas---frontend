'use client'

import Capa from '@/app/assets/Capa-Lista-Presente2.jpeg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Product } from '../context/products'
import { useProducts } from '../context/products'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '../api/axios/api'
import Background from '../assets/Grazi e Gustavo.png'
import Pix from '../assets/pix.jpeg'
import Loader from '@/components/ui/loader'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { useAuth } from '../context/auth-context'

export default function ListPresent() {
  const { products, selectProduct, setProducts } = useProducts()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const maxPrice = searchParams.get('max_price')
  const category = searchParams.get('category')
  const { user, signInWithGoogle } = useAuth()

  const PIX_KEY = '(12)991339320'

  const categories = [
    'Cozinha',
    'Sala',
    'Banheiro',
    'Ferramentas',
    'Lavanderia',
    'Quarto',
    'Outros'
  ]

  useEffect(() => {
    if (!user) {
      signInWithGoogle()
    }
    async function fetchProducts() {
      try {
        setLoading(true)

        const res = await api.get('/api/list-products', {
          params: {
            category: category || undefined,
            max_price: maxPrice || undefined
          }
        })

        setProducts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, maxPrice, setProducts, user, signInWithGoogle])

  async function handleSelect(productId: string) {
    setLoading(true)

    try {
      await selectProduct(productId)

      router.push('/presents')
    } finally {
      setLoading(false)
    }
  }

  function updateQuery(params: Record<string, string | null>) {
    const query = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        query.delete(key)
      } else {
        query.set(key, value)
      }
    })

    router.push(`/list-present?${query.toString()}`)
  }

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      toast.success('Chave Pix copiada 💙')
    } catch {
      toast.error('Não foi possível copiar a chave')
    }
  }

  return (
    <main className="w-full mt-6 px-10 lg:px-20 mb-10">
      <div className="w-full flex flex-col items-center justify-center">
        {/* Capa */}
        <div className="p-1 bg-white rounded-full shadow-serenity-base shadow-2xl">
          <Image
            src={Capa}
            width={250}
            height={250}
            alt="capa Gustavo e Grazielle"
            className="rounded-full"
          />
        </div>

        {/* Introdução */}
        <div className="flex flex-col items-center justify-center w-full text-center mt-5">
          <span className="font-bold font-lg ">Bem vindos ao nosso sonho!</span>
          <Image
            src={Background}
            width={300}
            height={300}
            alt="background monograma"
          />
          <span className="text-md lg:text-xl tracking-wide text-zinc-500">
            Sua presença é o nosso maior presente, mas se desejar nos presentar,
            aqui estão algumas sugestões
          </span>
        </div>

        {/* Filtros por categoria */}
        <div className="w-full overflow-y-hidden my-5 flex items-center lg:justify-center gap-2 py-3">
          <Button
            variant={!category ? 'serenity' : 'outline'}
            onClick={() => updateQuery({ category: null })}
          >
            Todos
          </Button>

          <Button
            variant={maxPrice === '50' ? 'serenity' : 'outline'}
            onClick={() =>
              updateQuery({
                max_price: maxPrice === '50' ? null : '50'
              })
            }
          >
            Até R$50
          </Button>

          <Button
            variant={maxPrice === '100' ? 'serenity' : 'outline'}
            onClick={() =>
              updateQuery({
                max_price: maxPrice === '100' ? null : '100'
              })
            }
          >
            Até R$100
          </Button>

          {categories.map(cat => (
            <Button
              key={cat}
              variant={category === cat ? 'serenity' : 'outline'}
              onClick={() =>
                updateQuery({
                  category: category === cat ? null : cat
                })
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between pt-3">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">
                Escolha seu presente
              </span>
            </div>
          </div>
          <div className="w-full border-b border-zinc-300">
            <p className="text-zinc-500 mt-2 pb-2">
              Para sua comodidade, disponibilizamos um link exclusivo para a
              compra do presente, evitando duplicidades e mantendo o padrão
              escolhido.
            </p>
          </div>
        </div>

        {!loading ? (
          <div className="w-full mb-10 flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-5 pt-4">
            <Card className="shadow-md flex flex-col items-center justify-between">
              <div className="h-72 w-full flex items-center justify-center overflow-hidden pt-4">
                <Image src={Pix} width={300} height={300} alt="pix qr" />
              </div>
              <CardContent>
                <div className="flex gap-2 text-serenity-base">
                  <span>Caso prefira nos presentar com pix</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center w-full gap-4 ">
                <Button
                  variant="serenity"
                  onClick={() => handleCopyPix()}
                  className="w-full"
                >
                  Copiar pix
                  <Copy />
                </Button>
              </CardFooter>
            </Card>
            {products.map((item: Product) => (
              <Card key={item.id} className="shadow-md">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={item.image_url}
                    width={1000}
                    height={1000}
                    alt={item.name}
                    className="w-full h-full rounded-t-xl bg-contain"
                  />
                  <div className="absolute bg-zinc-100 shadow py-1 px-4 rounded-full top-4 right-4">
                    <span
                      className={`${
                        item.is_active ? 'text-green-500' : 'text-red-500'
                      } font-bold`}
                    >
                      {item.is_active ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                </div>
                <CardContent>
                  <h3 className="font-medium text-xl h-16">{item.name}</h3>
                  <div className="flex gap-2 text-serenity-base">
                    <span>Valor aprox.:</span>
                    <span>R$ {item.suggestion_price},00</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center w-full gap-4 ">
                  <Button
                    disabled={!item.is_active}
                    variant="serenity"
                    onClick={() => handleSelect(item.id.toString())}
                    className="w-full"
                  >
                    {item.is_active
                      ? 'Selecionar Presente'
                      : 'Presente já escolhido'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <Loader />
          </div>
        )}
      </div>
    </main>
  )
}
