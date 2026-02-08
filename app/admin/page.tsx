'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useProducts } from '../context/products'
import { toast } from 'sonner'

export default function Admin() {
  const { products, fetchProducts } = useProducts()
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [suggestionPrice, setSuggestionPrice] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(false)

  const [linkShopee, setLinkShopee] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!image) return toast.error('Selecione uma imagem...')

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('suggestion_price', suggestionPrice.replace(',', '.'))
      formData.append('link_shopee', linkShopee)
      formData.append('category_product', category)
      formData.append('image', image)

      const response = await fetch(
        'https://casamento-backend-7zi4.vercel.app/api/products',
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) throw new Error()

      toast.success('Produto cadastrado com sucesso! 🎉')

      setName('')
      setSuggestionPrice('')
      setLinkShopee('')
      setImage(null)
      fetchProducts()
    } catch (error) {
      toast.error('Erro ao cadastrar produto')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser === 'true') {
      setUser(true)
    }
  }, [])

  const handlePassword = async () => {
    if (password === 'casa42') {
      setUser(true)
      localStorage.setItem('user', 'true')
    } else {
      return toast.error('Tente novamente...')
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Deseja realmente excluir este produto?')

    if (!confirmDelete) return

    try {
      await fetch(
        `https://casamento-backend-7zi4.vercel.app/api/products/${id}`,
        {
          method: 'DELETE'
        }
      )

      await fetchProducts() // 🔄 atualiza lista
    } catch (error) {
      toast.error('Erro ao deletar produto')
      console.error(error)
    }
  }

  return (
    <main>
      {!user ? (
        <div className="w-full h-[720] flex items-center justify-center px-6">
          <div className="w-[520] h-[360] rounded-md bg-zinc-50 border border-zinc-300 shadow flex items-center justify-center flex-col gap-5">
            <span>Entre e gerencie seus links</span>
            <input
              type="password"
              className="border border-zinc-500 rounded-md px-2 py-1 focus:visible-none"
              placeholder="Digite a palavra chave"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button variant="serenity" size="lg" onClick={handlePassword}>
              Entrar
            </Button>
          </div>
        </div>
      ) : (
        <main className="w-full px-6 lg:px-20">
          <div className="mt-5 flex items-center gap-2 ">
            <h1 className="text-3xl">Olá Gustavo e Grazielle</h1>
          </div>
          <div className="mt-5 w-full border-b border-zinc-300 pb-2">
            <h2 className="text-xl">Cadastrar novo produto</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-5 max-w-[720] mx-auto">
            <Input
              type="file"
              className="border border-zinc-500"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) setImage(file)
              }}
            />

            <Input
              className="border border-zinc-500"
              placeholder="Nome do produto"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              className="border border-zinc-500"
              placeholder="Sugestão de preço"
              value={suggestionPrice}
              onChange={e => setSuggestionPrice(e.target.value)}
            />
            <Input
              className="border border-zinc-500"
              placeholder="Link Shopee"
              value={linkShopee}
              onChange={e => setLinkShopee(e.target.value)}
            />

            <Select onValueChange={value => setCategory(value)}>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="Cozinha">Cozinha</SelectItem>
                  <SelectItem value="Sala">Sala</SelectItem>
                  <SelectItem value="Banheiro">Banheiro</SelectItem>
                  <SelectItem value="Ferramentas">Ferramentas</SelectItem>
                  <SelectItem value="Lavanderia">Lavanderia</SelectItem>
                  <SelectItem value="Quarto">Quarto</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-full">
              <Button
                disabled={loading}
                onClick={handleSubmit}
                variant="serenity"
                size="lg"
                className="w-full"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar produto'}
                <Plus />
              </Button>
            </div>
          </div>

          <div className="mt-2 max-w-[720] mx-auto">
            <div className="border-b border-zinc-300 pb-2">
              <h2 className="text-xl">Produtos já cadastrados</h2>
            </div>
            {products.map(item => (
              <div
                key={item.id}
                className="flex gap-2 mt-2  border border-zinc-400 rounded-md"
              >
                <Image
                  key={item.id}
                  src={item.image_url}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="rounded-l-md"
                />
                <div className="w-full p-1">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{item.name}</span>
                    <span className="text-serenity-dark ">
                      Status: {item.is_active ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      className="w-full cursor-pointer"
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </main>
  )
}
