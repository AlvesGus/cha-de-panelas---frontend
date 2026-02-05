import type { Metadata } from 'next'
import {
  Parisienne,
  Playfair_Display
} from 'next/font/google'
import './globals.css'
import Header from './_components/header'
import { AuthProvider } from './context/auth-context'
import { ProductsProvider } from './context/products'
import Texture from './assets/background-texture.jpeg'

const parisienne = Parisienne({
  weight: '400',
  variable: '--font-parisienne'
})

const playfair = Playfair_Display({
  weight: ['400', '500'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Almoço Noivado - Gu e Grazi',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(${Texture.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '280px'
        }}
        className={`${parisienne.variable} ${playfair.variable} antialiased select-none bg-zinc-200 `}
      >
        <AuthProvider>
          <ProductsProvider>
            <Header />
            {children}
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
