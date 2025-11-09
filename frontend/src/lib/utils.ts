/**
 * Utilidades generales
 */

import { type ClassValue, clsx } from 'clsx';

/**
 * Combina clases de Tailwind CSS de manera condicional
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Calcula el IMC
 */
export function calcularIMC(pesoKg: number, alturaCm: number): number {
  const alturaM = alturaCm / 100;
  return pesoKg / (alturaM * alturaM);
}

/**
 * Clasifica el IMC según la OMS
 */
export function clasificarIMC(imc: number): {
  categoria: string;
  color: string;
  descripcion: string;
} {
  if (imc < 18.5) {
    return {
      categoria: 'Bajo peso',
      color: 'text-warning-600',
      descripcion: 'Por debajo del peso saludable',
    };
  } else if (imc >= 18.5 && imc < 25) {
    return {
      categoria: 'Peso normal',
      color: 'text-success-600',
      descripcion: 'Peso saludable',
    };
  } else if (imc >= 25 && imc < 30) {
    return {
      categoria: 'Sobrepeso',
      color: 'text-warning-600',
      descripcion: 'Por encima del peso saludable',
    };
  } else if (imc >= 30 && imc < 35) {
    return {
      categoria: 'Obesidad',
      color: 'text-error-600',
      descripcion: 'Obesidad grado I',
    };
  } else {
    return {
      categoria: 'Obesidad severa',
      color: 'text-error-600',
      descripcion: 'Obesidad grado II o mayor',
    };
  }
}

/**
 * Formatea fecha a formato local
 */
export function formatearFecha(fecha: string | Date): string {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formatea fecha con hora
 */
export function formatearFechaHora(fecha: string | Date): string {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Trunca texto con elipsis
 */
export function truncarTexto(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength) + '...';
}

/**
 * Valida email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Genera color de avatar basado en nombre
 */
export function generarColorAvatar(nombre: string): string {
  const colores = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];
  const index = nombre.charCodeAt(0) % colores.length;
  return colores[index];
}

/**
 * Obtiene iniciales de nombre
 */
export function obtenerIniciales(nombre: string): string {
  const palabras = nombre.trim().split(' ');
  if (palabras.length >= 2) {
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  }
  return nombre.substring(0, 2).toUpperCase();
}

/**
 * Formatea duración en minutos a texto legible
 */
export function formatearDuracion(minutos: number): string {
  if (minutos < 60) {
    return `${minutos} min`;
  }
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
}

/**
 * Debounce para búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
