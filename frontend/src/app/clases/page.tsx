/**
 * Página de Clases Educativas
 */

'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import type { Clase } from '@/types';

export default function ClasesPage() {
  const { user } = useAuthStore();
  const [clases, setClases] = useState<Clase[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    mediaUrl: '',
    tags: '',
    duracion: '',
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const { data } = await apiClient.get<Clase[]>('/clases');
        setClases(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClases();
  }, []);

  const clasesFiltradas = clases.filter(clase => {
    const matchBusqueda = clase.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = !categoriaFiltro || clase.categoria === categoriaFiltro;
    return matchBusqueda && matchCategoria;
  });

  const categorias = Array.from(new Set(clases.map(c => c.categoria)));

  const handleCreateClase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreating(true);

    try {
      const { data } = await apiClient.post('/clases', {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        tipo: 'video',
        mediaUrl: formData.mediaUrl,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        duracion: formData.duracion ? parseInt(formData.duracion) : undefined,
        visibility: 'publica',
      });

      setSuccess('Clase creada exitosamente!');
      setClases([data.clase, ...clases]);
      setFormData({
        titulo: '',
        descripcion: '',
        categoria: '',
        mediaUrl: '',
        tags: '',
        duracion: '',
      });
      setTimeout(() => {
        setShowCreateForm(false);
        setSuccess('');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al crear la clase');
    } finally {
      setCreating(false);
    }
  };

  const isDocente = user?.role === 'docente' || user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="section-title">Clases Educativas</h1>
              <p className="text-lg text-gray-700">
                Videos y materiales sobre salud, nutrición y bienestar
              </p>
            </div>
            {isDocente && (
              <Button
                variant="primary"
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                {showCreateForm ? 'Cancelar' : '+ Subir Curso'}
              </Button>
            )}
          </div>

          {showCreateForm && (
            <Card className="mb-8 bg-primary-50">
              <h2 className="text-2xl font-bold mb-4">Subir Nuevo Curso</h2>

              {error && (
                <Alert variant="error" className="mb-4">{error}</Alert>
              )}
              {success && (
                <Alert variant="success" className="mb-4">{success}</Alert>
              )}

              <form onSubmit={handleCreateClase} className="space-y-4">
                <Input
                  label="Título del Curso"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                  placeholder="Ej: Ejercicios para la Espalda"
                />

                <div>
                  <label className="input-label">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                    className="input-field"
                    rows={3}
                    placeholder="Describe de qué trata el curso..."
                  />
                </div>

                <Input
                  label="URL del Video de YouTube"
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  helperText="La imagen se extraerá automáticamente del video"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Categoría</label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      required
                      className="input-field"
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Nutrición">Nutrición</option>
                      <option value="Ejercicio Físico">Ejercicio Físico</option>
                      <option value="Salud Mental">Salud Mental</option>
                      <option value="Salud Cardiovascular">Salud Cardiovascular</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Salud Ósea">Salud Ósea</option>
                      <option value="Prevención">Prevención</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <Input
                    label="Duración (minutos)"
                    type="number"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="15"
                  />
                </div>

                <Input
                  label="Etiquetas (separadas por comas)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="ejercicio, salud, bienestar"
                  helperText="Ayudan a que los usuarios encuentren tu curso"
                />

                <Button
                  type="submit"
                  variant="primary"
                  loading={creating}
                  className="w-full"
                >
                  Subir Curso
                </Button>
              </form>
            </Card>
          )}

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Buscar clases..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1"
            />
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="input-field"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <Loading text="Cargando clases..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clasesFiltradas.length === 0 ? (
                <p className="col-span-full text-center text-xl text-gray-600">
                  No se encontraron clases
                </p>
              ) : (
                clasesFiltradas.map(clase => (
                  <Card key={clase._id} hover>
                    {clase.thumbnailUrl && (
                      <img
                        src={clase.thumbnailUrl}
                        alt={clase.titulo}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          // Si falla maxresdefault, intentar con mqdefault
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('maxresdefault')) {
                            target.src = target.src.replace('maxresdefault', 'hqdefault');
                          }
                        }}
                      />
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{clase.titulo}</h3>
                    <p className="text-base text-gray-700 mb-3">{clase.descripcion}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {clase.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-600">
                        Categoría: <strong>{clase.categoria}</strong>
                      </p>
                      <p className="text-sm text-gray-500">
                        Por: <strong>{clase.autorNombre || 'Admin'}</strong>
                      </p>
                    </div>
                    {clase.duracion > 0 && (
                      <p className="text-sm text-gray-600 mb-4">
                        ⏱️ Duración: {clase.duracion} minutos
                      </p>
                    )}
                    {clase.mediaUrl && (
                      <a
                        href={clase.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 no-underline"
                      >
                        Ver Clase
                      </a>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
