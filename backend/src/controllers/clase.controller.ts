/**
 * Controlador de clases
 */

import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Clase from '../models/Clase';

export const getClases = async (req: Request, res: Response) => {
  try {
    const clases = await Clase.find({ visibility: 'publica' }).sort({ createdAt: -1 });
    res.json(clases);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getClaseById = async (req: Request, res: Response) => {
  try {
    const clase = await Clase.findById(req.params.id);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    res.json(clase);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Función para extraer ID de video de YouTube
function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

// Función para generar URL de thumbnail de YouTube
function getYouTubeThumbnail(url: string): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) return '';
  // Usar hqdefault que es más confiable que maxresdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export const createClase = async (req: AuthRequest, res: Response) => {
  try {
    // Verificar que el usuario sea docente o admin
    if (req.user.role !== 'docente' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo docentes y administradores pueden crear clases' });
    }

    // Si es un video de YouTube, extraer thumbnail automáticamente
    let thumbnailUrl = req.body.thumbnailUrl;
    if (req.body.tipo === 'video' && req.body.mediaUrl && !thumbnailUrl) {
      thumbnailUrl = getYouTubeThumbnail(req.body.mediaUrl);
    }

    const clase = await Clase.create({
      ...req.body,
      thumbnailUrl,
      autorId: req.user._id,
      autorNombre: req.user.nombre,
    });
    res.status(201).json({ clase, message: 'Clase creada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClase = async (req: AuthRequest, res: Response) => {
  try {
    const clase = await Clase.findById(req.params.id);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    if (clase.autorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const updatedClase = await Clase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ clase: updatedClase, message: 'Clase actualizada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClase = async (req: AuthRequest, res: Response) => {
  try {
    const clase = await Clase.findById(req.params.id);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    if (clase.autorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await Clase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clase eliminada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMisClases = async (req: AuthRequest, res: Response) => {
  try {
    const clases = await Clase.find({ autorId: req.user._id }).sort({ createdAt: -1 });
    res.json(clases);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEstadisticas = async (req: AuthRequest, res: Response) => {
  try {
    // Obtener todas las clases del docente
    const clases = await Clase.find({ autorId: req.user._id });

    // Calcular estadísticas
    const totalClases = clases.length;
    const totalVistas = 0; // Por ahora 0, necesitarías un sistema de tracking de vistas

    // Clases recientes (últimas 5)
    const clasesRecientes = clases.slice(0, 5);

    // Distribución por categorías
    const categorias: Record<string, number> = {};
    clases.forEach(clase => {
      if (clase.categoria) {
        categorias[clase.categoria] = (categorias[clase.categoria] || 0) + 1;
      }
    });

    res.json({
      totalClases,
      totalVistas,
      clasesRecientes,
      categorias,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
