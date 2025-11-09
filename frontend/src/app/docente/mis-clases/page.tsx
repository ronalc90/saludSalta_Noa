/**
 * Página Mis Clases - Gestión de clases para docentes
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import type { Clase } from '@/types';

export default function MisClasesPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [clases, setClases] = useState<Clase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Formulario para nueva clase
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'video' as 'video' | 'pdf' | 'articulo',
    mediaUrl: '',
    categoria: '',
    tags: '',
    duracion: '',
    visibility: 'publica' as 'publica' | 'privada',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'docente' && user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchMisClases();
  }, [isAuthenticated, user, router]);

  const fetchMisClases = async () => {
    try {
      const { data } = await apiClient.get<Clase[]>('/clases/mis-clases');
      setClases(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las clases');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      await apiClient.post('/clases', {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        tipo: formData.tipo,
        mediaUrl: formData.mediaUrl || undefined,
        categoria: formData.categoria,
        tags: tagsArray,
        duracion: formData.duracion ? parseInt(formData.duracion) : undefined,
        visibility: formData.visibility,
      });

      setSuccess('Clase creada exitosamente');
      setShowForm(false);
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'video',
        mediaUrl: '',
        categoria: '',
        tags: '',
        duracion: '',
        visibility: 'publica',
      });
      fetchMisClases();
    } catch (err: any) {
      setError(err.message || 'Error al crear la clase');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta clase?')) return;

    try {
      await apiClient.delete(`/clases/${id}`);
      setSuccess('Clase eliminada exitosamente');
      fetchMisClases();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la clase');
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mis Clases</h1>
            <Button
              variant="primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Nueva Clase'}
            </Button>
          </div>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="mb-6">
              {success}
            </Alert>
          )}

          {/* Formulario para crear nueva clase */}
          {showForm && (
            <Card className="mb-8 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Clase</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Título"
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                  placeholder="Ej: Introducción a la Nutrición Saludable"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    required
                    placeholder="Describe el contenido de la clase..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="video">Video</option>
                      <option value="pdf">PDF</option>
                      <option value="articulo">Artículo</option>
                    </select>
                  </div>

                  <Input
                    label="Categoría"
                    type="text"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    required
                    placeholder="Ej: Nutrición, Ejercicio, Salud Mental"
                  />
                </div>

                <Input
                  label="URL del Medio (opcional)"
                  type="url"
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  helperText="URL de YouTube, Google Drive, etc."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Duración (minutos)"
                    type="number"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="30"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibilidad
                    </label>
                    <select
                      value={formData.visibility}
                      onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="publica">Pública</option>
                      <option value="privada">Privada</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Etiquetas (separadas por comas)"
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="nutrición, salud, bienestar"
                />

                <div className="flex gap-4">
                  <Button type="submit" variant="primary" loading={loading} className="flex-1">
                    Crear Clase
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Lista de clases */}
          {loading && !showForm ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Cargando clases...</p>
            </div>
          ) : clases.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No tienes clases creadas aún</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Crear Mi Primera Clase
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clases.map((clase) => (
                <Card key={clase._id} className="flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      clase.visibility === 'publica'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {clase.visibility === 'publica' ? 'Pública' : 'Privada'}
                    </span>
                    <span className="text-sm text-gray-500">{clase.tipo}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{clase.titulo}</h3>
                  <p className="text-gray-700 mb-4 flex-1">{clase.descripcion}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Categoría:</strong> {clase.categoria}
                    </p>
                    {clase.duracion && (
                      <p className="text-sm text-gray-600">
                        <strong>Duración:</strong> {clase.duracion} min
                      </p>
                    )}
                    {clase.tags && clase.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {clase.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(clase._id)}
                      className="flex-1"
                    >
                      Eliminar
                    </Button>
                    <Link href={`/clases/${clase._id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
