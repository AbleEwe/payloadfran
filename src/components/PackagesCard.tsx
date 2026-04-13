'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { AnimatedGradient } from '@/components/Animated-gradient';

interface PackageFeature {
  text: string;
}

interface PackageCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features: PackageFeature[];
  popular?: boolean;
  imageSrc?: string;
  className?: string;
  index: number;
}

export function PackageCard({
  title,
  price,
  subtitle,
  features,
  popular = false,
  imageSrc,
  className,
  index,
}: PackageCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className={cn(
        'group relative rounded-xl overflow-hidden shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl',
        popular
          ? 'border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80'
          : 'border border-neutral-100 dark:border-neutral-900 bg-white/60 dark:bg-black/60',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -5 }}
    >
      {imageSrc && (
        <div className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-500 group-hover:opacity-15" style={{ backgroundImage: `url(${imageSrc})` }} />
      )}
      
      <AnimatedGradient containerClassName="absolute inset-0" />
      
      {popular && (
        <div className="absolute right-0 top-0">
          <div className="w-0 h-0 border-t-[70px] border-t-accent border-l-[70px] border-l-transparent"></div>
          <span className="absolute top-[10px] right-[8px] text-xs font-semibold text-accent-foreground rotate-45">Popular</span>
        </div>
      )}
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="font-serif text-2xl font-medium text-foreground">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="mb-6">
          <p className="text-3xl font-light text-foreground">{price}</p>
        </div>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
        

      </div>
    </motion.div>
  );
}
