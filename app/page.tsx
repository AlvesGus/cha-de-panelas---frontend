import background from '@/app/assets/background.webp'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="w-full mt-6 px-10 tracking-wide lg:flex lg:flex-col  lg:items-center lg:justify-center">
      <div className="flex flex-col items-center justify-center lg:w-[420]">
        <div className="shadow">
          <div className="border border-serenity-dark/30 p-2 rounded-md shadow">
            <div className="bg-zinc-50 rounded-lg p-1">
              <Image
                src={background}
                alt="photo"
                width={250}
                height={120}
                className="rounded-lg p-1"
              />
            </div>
          </div>
        </div>
        <div className="w-full pt-5 flex flex-col items-center justify-center">
          <span className="uppercase text-serenity-dark font-semibold text-sm">
            Convidamos para celebrar
          </span>
          <div>
            <h1 className="font-medium text-7xl text-serenity-dark font-great mt-2">
              Gu & Grazi
            </h1>
          </div>
          <span className="text-zinc-500 text-lg text-center pt-3">
            Com a bênção de nossos pais e a alegria de nossos corações,
            convidamos você para o nosso Almoço de Noivado e Chá de Panelas.
          </span>
        </div>

        <div className="w-full mt-4 bg-zinc-50 p-2 rounded-md shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-serenity-light p-2 rounded-full">
              <Calendar className="w-6 h-6 text-serenity-dark" />
            </div>
            <div>
              <p className="text-xl font-bold">14 de Março de 2026</p>
              <p className="text-serenity-light">Sábado às 12:00h</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 bg-zinc-50 p-2 rounded-md shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-serenity-light p-2 rounded-full">
              <MapPin className="w-6 h-6 text-serenity-dark" />
            </div>
            <div>
              <p className="text-lg font-bold">R: Antônio J. C. de Souza, 20</p>
              <a
                href="https://www.google.com/maps/place/R.+Ant%C3%B4nio+Jos%C3%A9+Carneiro+de+Souza,+20+-+Res.+Paraiso,+Taubat%C3%A9+-+SP,+12090-803/@-23.0456285,-45.5632369,17z/data=!3m1!4b1!4m6!3m5!1s0x94ccf92727a99f45:0x7f2b59ab0a4614d2!8m2!3d-23.0456335!4d-45.560662!16s%2Fg%2F11c23sbmxl?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="w-full lg:w-full text-serenity-base text-ellipsis line-clamp-1"
              >
                Ver no Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="w-full mb-10 lg:mb-0">
          <Button
            asChild
            variant="serenity"
            size="lg"
            className="w-full mt-5 h-14"
          >
            <Link href={'/list-present'}>Ver lista de presentes</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
