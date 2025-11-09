/**
 * Predictor de Enfermedades - Orientativo
 */

'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import apiClient from '@/lib/api';
import type { PrediccionResult } from '@/types';

const SINTOMAS_COMUNES = [
  'Fiebre', 'Tos', 'Dolor de cabeza', 'Dolor de garganta', 'Fatiga',
  'Dolor muscular', 'Náuseas', 'Vómitos', 'Diarrea', 'Dolor abdominal',
  'Dificultad para respirar', 'Mareos', 'Pérdida de apetito', 'Dolor de pecho',
];

export default function PredictorPage() {
  const [sintomasSeleccionados, setSintomasSeleccionados] = useState<string[]>([]);
  const [detalles, setDetalles] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [resultado, setResultado] = useState<PrediccionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSintoma = (sintoma: string) => {
    setSintomasSeleccionados(prev =>
      prev.includes(sintoma) ? prev.filter(s => s !== sintoma) : [...prev, sintoma]
    );
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.post<PrediccionResult>('/health/predictor', {
        sintomas: sintomasSeleccionados,
        detallesAdicionales: detalles,
        consentimiento,
      });
      setResultado(data);
    } catch (err) {
      alert('Error al procesar. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="section-title text-center">Orientación en Salud</h1>

          <Alert variant="warning" className="mb-8">
            <strong>Importante:</strong> Esta herramienta proporciona orientación general y NO reemplaza el diagnóstico médico. Siempre consulte a un profesional de salud.
          </Alert>

          <Card className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Seleccione sus síntomas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {SINTOMAS_COMUNES.map(sintoma => (
                <button
                  key={sintoma}
                  onClick={() => toggleSintoma(sintoma)}
                  className={`p-4 rounded-lg border-2 text-lg font-medium transition ${
                    sintomasSeleccionados.includes(sintoma)
                      ? 'bg-primary-100 border-primary-600 text-primary-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-primary-400'
                  }`}
                >
                  {sintoma}
                </button>
              ))}
            </div>

            <label className="block text-lg font-semibold mb-2">Detalles adicionales (opcional)</label>
            <textarea
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              className="w-full p-4 border-2 rounded-lg text-lg min-h-[100px]"
              placeholder="Describa otros síntomas o información relevante..."
            />

            <div className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consentimiento}
                onChange={(e) => setConsentimiento(e.target.checked)}
                className="w-6 h-6 mt-1"
              />
              <label htmlFor="consent" className="text-base">
                Entiendo que esta es una herramienta orientativa y me comprometo a consultar con un médico para diagnóstico y tratamiento.
              </label>
            </div>

            <Button
              onClick={handlePredict}
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={sintomasSeleccionados.length === 0 || !consentimiento}
              loading={loading}
            >
              Obtener Orientación
            </Button>
          </Card>

          {resultado && (
            <Card className="bg-blue-50">
              <h2 className="text-2xl font-bold mb-4">Resultado Orientativo</h2>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Posibles condiciones:</h3>
                {resultado.predicciones.map((pred, i) => (
                  <div key={i} className="mb-3 p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{pred.enfermedad}</span>
                      <span className="text-lg text-primary-600">{(pred.probabilidad * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-base text-gray-700 mt-2">{pred.descripcion}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-3">Recomendaciones:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {resultado.recomendaciones.map((rec, i) => (
                  <li key={i} className="text-lg text-gray-700">{rec}</li>
                ))}
              </ul>

              <Alert variant={resultado.urgencia === 'alta' ? 'error' : resultado.urgencia === 'media' ? 'warning' : 'info'}>
                <strong>Nivel de urgencia: {resultado.urgencia.toUpperCase()}</strong>
                <p className="mt-2">{resultado.disclaimer}</p>
              </Alert>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
