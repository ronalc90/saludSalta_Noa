/**
 * Página Calculadora IMC
 */

'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import apiClient from '@/lib/api';
import { calcularIMC, clasificarIMC } from '@/lib/utils';
import type { IMCResult } from '@/types';

export default function IMCPage() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState<IMCResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalcular = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum || pesoNum <= 0 || alturaNum <= 0) {
      setError('Por favor ingrese valores válidos');
      return;
    }

    if (alturaNum > 250) {
      setError('La altura debe estar en centímetros (ej: 170)');
      return;
    }

    setLoading(true);

    try {
      const { data } = await apiClient.post<IMCResult>('/health/imc/calcular', {
        pesoKg: pesoNum,
        alturaCm: alturaNum,
      });
      setResultado(data);
    } catch (err: any) {
      const imc = calcularIMC(pesoNum, alturaNum);
      const clasificacion = clasificarIMC(imc);
      setResultado({
        imc,
        categoria: clasificacion.categoria,
        recomendaciones: [
          'Consulte con su médico para una evaluación completa',
          'Mantenga una dieta balanceada',
          'Realice actividad física regular según su capacidad',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title text-center">Calculadora de IMC</h1>
          <p className="text-center text-lg text-gray-700 mb-8">
            El Índice de Masa Corporal es una medida orientativa de peso saludable
          </p>

          <Card className="mb-8">
            <form onSubmit={handleCalcular} className="space-y-6">
              {error && <Alert variant="error">{error}</Alert>}

              <Input
                label="Peso (kg)"
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ej: 70"
                required
                helperText="Ingrese su peso en kilogramos"
              />

              <Input
                label="Altura (cm)"
                type="number"
                step="1"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ej: 170"
                required
                helperText="Ingrese su altura en centímetros"
              />

              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Calcular IMC
              </Button>
            </form>
          </Card>

          {resultado && (
            <Card className="bg-primary-50">
              <h2 className="text-2xl font-bold text-center mb-4">Resultado</h2>
              <div className="text-center mb-6">
                <p className="text-6xl font-bold text-primary-600">{resultado.imc.toFixed(1)}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-2">{resultado.categoria}</p>
              </div>

              <h3 className="text-xl font-bold mb-3">Recomendaciones:</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                {resultado.recomendaciones.map((rec, i) => (
                  <li key={i} className="text-gray-700">{rec}</li>
                ))}
              </ul>

              <Alert variant="info" className="mt-6">
                <strong>Importante:</strong> Este cálculo es orientativo. Consulte con su médico para una evaluación completa de su salud.
              </Alert>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
