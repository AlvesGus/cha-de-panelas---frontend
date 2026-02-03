import type { Metadata } from 'next'
import { Geist, Geist_Mono, Great_Vibes } from 'next/font/google'
import './globals.css'
import Header from './_components/header'
import { AuthProvider } from './context/auth-context'
import { ProductsProvider } from './context/products'
import Texture from './assets/background-texture.jpeg'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const greatVibes = Great_Vibes({
  weight: '400',
  variable: '--font-great'
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
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased select-none bg-zinc-200 `}
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
