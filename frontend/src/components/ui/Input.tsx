/**
 * Componente Input accesible
 * Campos de entrada grandes y claros
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && <span className="text-error-500 ml-1" aria-label="requerido">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'input-field',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-200',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          required={required}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-base text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-base text-gray-600"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
