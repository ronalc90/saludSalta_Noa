/**
 * Rutas de salud (IMC y Predictor)
 */

import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
  calcularIMC,
  getHistorialIMC,
  predecirEnfermedades,
} from '../controllers/health.controller';

const router = Router();

router.post('/imc/calcular', protect, calcularIMC);
router.get('/imc/historial', protect, getHistorialIMC);
router.post('/predictor', protect, predecirEnfermedades);

export default router;
