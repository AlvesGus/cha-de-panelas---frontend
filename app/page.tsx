'use client'

import Image from 'next/image'
import Flowers from './assets/Flowers.png'
import Background from './assets/Grazi e Gustavo.png'
import { Gift, MapPin } from 'lucide-react'
import Monograma from './assets/Monograma.png'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const handlerLocation = () => {
    redirect(
      'google.com/maps/place/R.+Antônio+José+Carneiro+de+Souza,+20+-+Res.+Paraiso,+Taubaté+-+SP,+12090-803/@-23.0470959,-45.5535022,15z/data=!4m6!3m5!1s0x94ccf92727a99f45:0x7f2b59ab0a4614d2!8m2!3d-23.0456335!4d-45.560662!16s%2Fg%2F11c23sbmxl?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoASAFQAw%3D%3D'
    )
  }
  return (
    <main className="relative w-full min-h-screen px-6 lg:px-20 overflow-hidden font-playfair">
      {/* Flor esquerda */}
      <div className="absolute left-0 top-0 opacity-20 z-0 pointer-events-none">
        <Image
          src={Flowers}
          width={400}
          height={400}
          alt="Flowers left"
          className="rotate-180 -translate-x-1/3"
        />
      </div>

      {/* Flor direita */}
      <div className="absolute right-0 top-0 opacity-20 z-0 pointer-events-none">
        <Image
          src={Flowers}
          width={400}
          height={400}
          alt="Flowers right"
          className="translate-x-1/3"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6 pt-10 text-center">
        <div>
          <p className="font-parisienne text-3xl">
            “Consagre ao senhor tudo o que você faz, e os seus planos serão bem
            sucedidos”
          </p>
          <p className="font-parisienne text-lg">Provérbios 16:3</p>
        </div>

        <p>Convidamos você para celebrar conosco o nosso almoço de noivado</p>

        <div className="flex flex-col items-center">
          <Image
            src={Background}
            width={300}
            height={300}
            alt="background monograma"
          />
          <p className="font-semibold">Dia 14 de março</p>
          <p className="font-semibold">Às 12h00</p>
        </div>

        <div className="max-w-xl">
          <p className="text-lg">
            Para celebrar o amor que já mora aqui e os novos planos que virão.
          </p>
          <p className="text-lg pt-4">
            Neste dia especial, faremos nosso chá de cozinha.
          </p>
        </div>

        <div className="flex items-center justify-center gap-20 pt-4">
          <Button
            onClick={() => redirect('/list-present')}
            variant="ghost"
            className="flex flex-col items-center gap-2 p-0 hover:bg-transparent"
          >
            <div className="p-2 bg-serenity-dark rounded-full">
              <Gift className="w-10 h-10 text-white stroke-1" />
            </div>
            <p>Lista de Presentes</p>
          </Button>

          <Button
            onClick={() => handlerLocation()}
            variant="ghost"
            className="flex flex-col items-center gap-2 p-0 hover:bg-transparent"
          >
            <div className="p-2 bg-serenity-dark rounded-full">
              <MapPin className="w-10 h-10 text-white stroke-1" />
            </div>
            <p>Localização</p>
          </Button>
        </div>

        <Image
          src={Monograma}
          width={80}
          height={80}
          alt="monograma"
          className="rounded-full mt-10"
        />
      </div>
    </main>
  )
}
