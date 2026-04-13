'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type PricingTableData = {
  packageTabLabel: string;
  eventTabLabel: string;
  packageRows: { type: string; quantity: string; price: string; isPopular: boolean }[];
  eventRows: { service: string; details: string; price: string }[];
};

const DEFAULT_PACKAGE_ROWS: PricingTableData['packageRows'] = [
  { type: 'BÁSICO', quantity: '5-10 fotos', price: '$80/u', isPopular: true },
  { type: 'BÁSICO', quantity: '10-20 fotos', price: '$70/u', isPopular: false },
  { type: 'MEDIANO', quantity: '5-10 fotos', price: '$130/u', isPopular: false },
  { type: 'MEDIANO', quantity: '10-20 fotos', price: '$120/u', isPopular: false },
  { type: 'FINE ART', quantity: '7 fotos o más', price: '$230/u', isPopular: false },
];

const DEFAULT_EVENT_ROWS: PricingTableData['eventRows'] = [
  { service: 'Lightroom 150 fotos', details: 'Se entrega en una semana', price: '$800' },
  { service: 'Lightroom 300 fotos', details: 'Se entrega en una semana', price: '$1000' },
];

interface PricingTableProps {
  className?: string;
  data?: PricingTableData | null;
}

export function PricingTable({ className, data }: PricingTableProps) {
  const packageRows = data?.packageRows?.length ? data.packageRows : DEFAULT_PACKAGE_ROWS;
  const eventRows = data?.eventRows?.length ? data.eventRows : DEFAULT_EVENT_ROWS;
  const packageTabLabel = data?.packageTabLabel ?? 'Por Paquete';
  const eventTabLabel = data?.eventTabLabel ?? 'Por Evento';

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Tabs defaultValue="package" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-[400px] max-w-full grid-cols-2">
            <TabsTrigger value="package">{packageTabLabel}</TabsTrigger>
            <TabsTrigger value="event">{eventTabLabel}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="package" className="w-full">
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="w-full overflow-hidden rounded-lg border border-border bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 font-serif text-lg text-center">Tipo</TableHead>
                  <TableHead className="w-1/4 font-serif text-lg text-center">Cantidad de Fotos</TableHead>
                  <TableHead className="w-1/4 font-serif text-lg text-right">Precio por Unidad</TableHead>
                  <TableHead className="w-1/4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packageRows.map((row, i) => (
                  <motion.tr key={i} variants={rowVariants} className="group border-t first:border-t-0">
                    <TableCell className="font-serif text-lg align-middle">{row.type}</TableCell>
                    <TableCell className="text-muted-foreground">{row.quantity}</TableCell>
                    <TableCell className="text-center">{row.price}</TableCell>
                    <TableCell className="text-right">
                      {row.isPopular && (
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">Más Popular</span>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="event" className="w-full">
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="w-full overflow-hidden rounded-lg border border-border bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3 font-serif text-lg text-center">Servicio</TableHead>
                  <TableHead className="w-1/3 font-serif text-lg text-center">Detalles</TableHead>
                  <TableHead className="w-1/3 font-serif text-lg text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventRows.map((row, i) => (
                  <motion.tr key={i} variants={rowVariants} className="group">
                    <TableCell className="font-medium">{row.service}</TableCell>
                    <TableCell className="text-muted-foreground">{row.details}</TableCell>
                    <TableCell className="text-right">{row.price}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
