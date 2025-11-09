/**
 * Predictor de Enfermedades - Orientativo
 */

'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import axios from 'axios';
import type { PrediccionResult, Sintoma } from '@/types';
import { traducirSintoma, traducirEnfermedad } from '@/utils/translations';

// URL del servicio de ML - cambiar después de desplegar en Railway
const ML_SERVICE_URL = process.env.NEXT_PUBLIC_DISEASE_PREDICTOR_URL || 'http://localhost:8000';

export default function PredictorPage() {
  const [sintomasDisponibles, setSintomasDisponibles] = useState<Sintoma[]>([]);
  const [sintomasSeleccionados, setSintomasSeleccionados] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [resultado, setResultado] = useState<PrediccionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSintomas, setLoadingSintomas] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar síntomas disponibles del servicio de ML
    const fetchSintomas = async () => {
      try {
        const response = await axios.get(`${ML_SERVICE_URL}/api/sintomas`);
        // Traducir síntomas al español
        const sintomasTraducidos = response.data.map((sintoma: Sintoma) => {
          const traduccion = traducirSintoma(sintoma.id);
          return {
            ...sintoma,
            nombre: traduccion.nombre,
            descripcion: traduccion.descripcion
          };
        });
        setSintomasDisponibles(sintomasTraducidos);
      } catch (err) {
        console.error('Error cargando síntomas:', err);
        setError('No se pudieron cargar los síntomas. El servicio de predicción podría no estar disponible.');
      } finally {
        setLoadingSintomas(false);
      }
    };

    fetchSintomas();
  }, []);

  const toggleSintoma = (sintomaId: string) => {
    setSintomasSeleccionados(prev =>
      prev.includes(sintomaId) ? prev.filter(s => s !== sintomaId) : [...prev, sintomaId]
    );
  };

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/api/predict`, {
        sintomas: sintomasSeleccionados,
        consentimiento,
      });
      setResultado(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al procesar. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar síntomas por búsqueda
  const sintomasFiltrados = sintomasDisponibles.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="section-title text-center">Orientación en Salud</h1>

          <Alert variant="warning" className="mb-8">
            <strong>Importante:</strong> Esta herramienta proporciona orientación general y NO reemplaza el diagnóstico médico. Siempre consulte a un profesional de salud.
          </Alert>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          <Card className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Seleccione sus síntomas</h2>

            {loadingSintomas ? (
              <div className="text-center py-8">
                <p className="text-lg">Cargando síntomas disponibles...</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar síntoma..."
                    className="w-full p-3 border-2 rounded-lg text-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {sintomasSeleccionados.length} síntoma(s) seleccionado(s) de {sintomasDisponibles.length} disponibles
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-h-96 overflow-y-auto p-2">
                  {sintomasFiltrados.map(sintoma => (
                    <button
                      key={sintoma.id}
                      onClick={() => toggleSintoma(sintoma.id)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                        sintomasSeleccionados.includes(sintoma.id)
                          ? 'bg-primary-100 border-primary-600 text-primary-800'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-primary-400'
                      }`}
                      title={sintoma.descripcion}
                    >
                      {sintoma.nombre}
                    </button>
                  ))}
                </div>
              </>
            )}

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
                      <span className="text-lg font-semibold">{traducirEnfermedad(pred.enfermedad)}</span>
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
