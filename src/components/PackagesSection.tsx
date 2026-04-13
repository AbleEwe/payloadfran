'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { PackageCard } from './PackagesCard';
import { PricingTable, type PricingTableData } from './PricingTable';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export type PackageItem = {
  title: string;
  price: string;
  subtitle?: string;
  features: { text: string }[];
  imageUrl: string | null;
  popular: boolean;
};

type PackagesSectionProps = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  backgroundImageUrl?: string | null;
  pricingHeading?: string;
  ctaText?: string;
  ctaLink?: string;
  packages?: PackageItem[];
  pricingTable?: PricingTableData | null;
};

const DEFAULT_PACKAGES: PackageItem[] = [
  {
    title: 'Edición Básica',
    price: '$95',
    features: [
      { text: 'Quitar objetos de la imagen' },
      { text: 'Corrección de luces y sombras' },
      { text: 'Corrección de color' },
    ],
    imageUrl: 'https://images.pexels.com/photos/3444345/pexels-photo-3444345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
  {
    title: 'Edición Media',
    price: '$150',
    features: [
      { text: 'Quitar objetos de la imagen' },
      { text: 'Corrección de luces y sombras' },
      { text: 'Corrección de color' },
      { text: 'Edición de objetos' },
      { text: 'Enfoque y/o desenfoque de objetos' },
      { text: 'Limpiar imagen' },
      { text: 'Dodge and burn' },
      { text: 'Otros detalles en photoshop' },
    ],
    imageUrl: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: true,
  },
  {
    title: 'Fine Art',
    price: '$250',
    features: [
      { text: 'Edición fine art cero' },
      { text: 'Photoshop avanzado' },
      { text: 'Hacer tu lista detallada de lo que buscas cambiar' },
      { text: 'Enviar foto en raw o en la mejor calidad posible' },
    ],
    imageUrl: 'https://images.pexels.com/photos/2403851/pexels-photo-2403851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
];

export function PackagesSection({
  sectionTitle = 'Paquetes Fotográficos',
  sectionSubtitle = 'Elige el paquete que mejor se adapte a tus necesidades y transforma tus momentos en recuerdos eternos',
  backgroundImageUrl = null,
  pricingHeading = 'Detalles de Precios',
  ctaText = '¿Tienes un proyecto específico en mente? Contáctanos para una cotización personalizada.',
  ctaLink = '/contact',
  packages = DEFAULT_PACKAGES,
  pricingTable = null,
}: PackagesSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const list = packages.length ? packages : DEFAULT_PACKAGES;

  return (
    <div className="relative overflow-hidden" ref={ref}>
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] -z-10"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          <motion.div variants={titleVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4 tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {sectionSubtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {list.map((pkg, index) => (
              <PackageCard
                key={pkg.title + index}
                title={pkg.title}
                price={pkg.price}
                subtitle={pkg.subtitle}
                features={pkg.features}
                popular={pkg.popular}
                imageSrc={pkg.imageUrl ?? undefined}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div variants={titleVariants} className="text-center mt-16 mb-8">
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-4 flex items-center justify-center gap-2">
              <span>{pricingHeading}</span>
              <MoveRight className="h-6 w-6 animate-pulse" />
            </h3>
          </motion.div>

          <PricingTable data={pricingTable} />

          <motion.div variants={titleVariants} className="text-center mt-12">
            <p className="text-muted-foreground mb-6">{ctaText}</p>
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Contactar Ahora
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
