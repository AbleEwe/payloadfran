'use client'

import { motion } from 'motion/react'
import SesionSlidesGrid from '@/components/SesionSlidesGrid'
import type { SesionSlideItem } from '@/lib/sesionSlides'

type SesionesClientProps = {
  slides: SesionSlideItem[]
}

export default function SesionesClient({ slides }: SesionesClientProps) {
  return (
    <section className="w-full">
      <div
        className="flex flex-col items-center justify-center relative w-screen h-[60vh] md:h-screen bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url('/Images/FotosEdiciones/pag.jpg')` }}
      />
      <motion.h1
        initial={{ y: '20%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-5xl mt-20 text-center mb-12"
      >
        Escoge tu sesión
      </motion.h1>
      <SesionSlidesGrid slides={slides} variant="sesiones" />
    </section>
  )
}
