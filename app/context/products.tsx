'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/app/api/axios/api'
import { supabase } from '../lib/supabase/client' // ✅ instância única
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export type Product = {
  id: string
  name: string
  suggestion_price: number
  image_url: string
  link_shopee: string
  category_product: string
  is_active: boolean
}

type ProductsContextData = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  loading: boolean
  fetchProducts: () => Promise<void>
  selectProduct: (productId: string) => Promise<void>
  removePresent: (productId: string) => Promise<void>
}

const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data } = await api.get('/api/list-products')
      setProducts(data.data ?? [])
    } catch (error) {
      console.error('Erro ao buscar produtos', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  async function selectProduct(productId: string) {
    try {
      setLoading(true)

      const {
        data: { user }
      } = await supabase.auth.getUser()
      const session = await supabase.auth.getSession()

      const accessToken = session.data?.session?.access_token

      if (!accessToken) {
        console.log('Token ainda não disponível')
        return
      }

      if (!user || !accessToken) throw new Error('Usuário não autenticado')

      const res = await api.patch(`/api/products/${productId}/select`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setProducts(res.data)
      await fetchProducts()
    } catch (error) {
      toast.error('Não foi possível selecionar o presente...')
      console.log(error)
    } finally {
      toast.success('Produto selecionado com sucesso...')
      setLoading(false)
    }
  }

  async function removePresent(productId: string) {
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      const accessToken = session?.access_token

      if (!accessToken) {
        throw new Error('Usuário não autenticado')
      }

      await api.patch(`/api/products/${productId}/unselect`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      await fetchProducts()
    } catch (error) {
      toast.error('Erro ao remover presente')
      console.error(error)
    } finally {
      redirect('/list-present')
      toast.success('Produto removido com sucesso')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        loading,
        fetchProducts,
        selectProduct,
        removePresent
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}
