/**
 * Rutas de clases
 */

import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getClases,
  getClaseById,
  createClase,
  updateClase,
  deleteClase,
  getMisClases,
  getEstadisticas,
} from '../controllers/clase.controller';

const router = Router();

router.get('/', getClases);
router.get('/mis-clases', protect, authorize('docente', 'admin'), getMisClases);
router.get('/estadisticas', protect, authorize('docente', 'admin'), getEstadisticas);
router.get('/:id', getClaseById);

// Docente routes
router.post('/', protect, authorize('docente', 'admin'), createClase);
router.put('/:id', protect, authorize('docente', 'admin'), updateClase);
router.delete('/:id', protect, authorize('docente', 'admin'), deleteClase);

export default router;
