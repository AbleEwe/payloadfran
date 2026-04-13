'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function AnimatedGradient({
  children,
  className,
  containerClassName,
  ...props
}: AnimatedGradientProps) {
  return (
    <div className={cn('relative overflow-hidden', containerClassName)} {...props}>
      <div
        className={cn(
          'absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30',
          className
        )}
        style={{
          background:
            'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 10s ease infinite',
        }}
      />
      {children && <div className="relative z-10">{children}</div>}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}