/**
 * Página de Estadísticas para Docentes
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import type { EstadisticasDocente } from '@/types';

export default function EstadisticasPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [estadisticas, setEstadisticas] = useState<EstadisticasDocente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'docente' && user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchEstadisticas();
  }, [isAuthenticated, user, router]);

  const fetchEstadisticas = async () => {
    try {
      const { data } = await apiClient.get<EstadisticasDocente>('/clases/estadisticas');
      setEstadisticas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Estadísticas</h1>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Cargando estadísticas...</p>
            </div>
          ) : estadisticas ? (
            <>
              {/* Métricas principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center p-6">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {estadisticas.totalClases}
                  </div>
                  <p className="text-gray-700 text-lg">Clases Creadas</p>
                </Card>

                <Card className="text-center p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {estadisticas.totalVistas}
                  </div>
                  <p className="text-gray-700 text-lg">Visualizaciones Totales</p>
                </Card>

                <Card className="text-center p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {estadisticas.totalClases > 0
                      ? Math.round(estadisticas.totalVistas / estadisticas.totalClases)
                      : 0}
                  </div>
                  <p className="text-gray-700 text-lg">Promedio por Clase</p>
                </Card>
              </div>

              {/* Clases recientes */}
              <Card className="mb-8 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Clases Recientes</h2>

                {estadisticas.clasesRecientes.length === 0 ? (
                  <p className="text-gray-600">No tienes clases creadas aún</p>
                ) : (
                  <div className="space-y-4">
                    {estadisticas.clasesRecientes.map((clase) => (
                      <div
                        key={clase._id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{clase.titulo}</h3>
                          <p className="text-sm text-gray-600">{clase.categoria}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Visibilidad</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            clase.visibility === 'publica'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {clase.visibility === 'publica' ? 'Pública' : 'Privada'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Distribución por categorías */}
              {Object.keys(estadisticas.categorias).length > 0 && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Distribución por Categorías
                  </h2>

                  <div className="space-y-3">
                    {Object.entries(estadisticas.categorias).map(([categoria, count]) => (
                      <div key={categoria} className="flex items-center">
                        <div className="w-32 font-medium text-gray-700">{categoria}</div>
                        <div className="flex-1 ml-4">
                          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className="bg-primary-600 h-full flex items-center justify-end px-2 text-white text-sm font-medium"
                              style={{
                                width: `${(count / estadisticas.totalClases) * 100}%`,
                              }}
                            >
                              {count}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          ) : (
            <Card className="text-center py-12">
              <p className="text-xl text-gray-600">No hay estadísticas disponibles</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
