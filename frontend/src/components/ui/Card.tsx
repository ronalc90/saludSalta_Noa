/**
 * Componente Card
 * Tarjetas para organizar contenido
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  hover?: boolean;
}

export function Card({ className, title, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card',
        hover && 'hover:shadow-lg transition-shadow duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {title && <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
}
