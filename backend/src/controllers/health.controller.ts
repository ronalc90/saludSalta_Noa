/**
 * Controlador de salud (IMC y Predictor)
 */

import { Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';
import IMCRegistro from '../models/IMCRegistro';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8001';

const calcularIMCValor = (peso: number, altura: number): number => {
  const alturaM = altura / 100;
  return peso / (alturaM * alturaM);
};

const clasificarIMC = (imc: number): { categoria: string; recomendaciones: string[] } => {
  if (imc < 18.5) {
    return {
      categoria: 'Bajo peso',
      recomendaciones: [
        'Consulte con un nutricionista para un plan alimenticio',
        'Considere aumentar la ingesta calórica saludable',
        'Realice chequeo médico para descartar problemas de salud',
      ],
    };
  } else if (imc >= 18.5 && imc < 25) {
    return {
      categoria: 'Peso normal',
      recomendaciones: [
        'Mantenga una dieta balanceada',
        'Continúe con actividad física regular',
        'Realice chequeos médicos anuales',
      ],
    };
  } else if (imc >= 25 && imc < 30) {
    return {
      categoria: 'Sobrepeso',
      recomendaciones: [
        'Consulte con un nutricionista',
        'Incremente la actividad física gradualmente',
        'Reduzca el consumo de alimentos procesados',
        'Considere apoyo médico para pérdida de peso',
      ],
    };
  } else {
    return {
      categoria: 'Obesidad',
      recomendaciones: [
        'Consulte con un médico lo antes posible',
        'Busque apoyo de nutricionista especializado',
        'Considere programa de pérdida de peso supervisado',
        'Realice evaluación de riesgos cardiovasculares',
      ],
    };
  }
};

export const calcularIMC = async (req: AuthRequest, res: Response) => {
  try {
    const { pesoKg, alturaCm } = req.body;

    if (!pesoKg || !alturaCm || pesoKg <= 0 || alturaCm <= 0) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    const imc = calcularIMCValor(pesoKg, alturaCm);
    const clasificacion = clasificarIMC(imc);

    const registro = await IMCRegistro.create({
      userId: req.user._id,
      pesoKg,
      alturaCm,
      imc,
      categoria: clasificacion.categoria,
      recomendaciones: clasificacion.recomendaciones,
    });

    res.json({
      imc: parseFloat(imc.toFixed(2)),
      categoria: clasificacion.categoria,
      recomendaciones: clasificacion.recomendaciones,
      registroId: registro._id,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistorialIMC = async (req: AuthRequest, res: Response) => {
  try {
    const historial = await IMCRegistro.find({ userId: req.user._id })
      .sort({ fecha: -1 })
      .limit(10);
    res.json(historial);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const predecirEnfermedades = async (req: AuthRequest, res: Response) => {
  try {
    const { sintomas, detallesAdicionales, consentimiento } = req.body;

    if (!consentimiento) {
      return res.status(400).json({ message: 'Debe aceptar el consentimiento informado' });
    }

    if (!sintomas || sintomas.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un síntoma' });
    }

    try {
      const { data } = await axios.post(`${ML_SERVICE_URL}/predict`, {
        sintomas,
        detalles: detallesAdicionales || '',
      });

      res.json(data);
    } catch (mlError: any) {
      // Fallback si el servicio ML no está disponible
      res.json({
        predicciones: [
          {
            enfermedad: 'Consulta Médica Recomendada',
            probabilidad: 1.0,
            descripcion: 'No pudimos procesar sus síntomas. Por favor consulte con un médico.',
          },
        ],
        recomendaciones: [
          'Consulte con su médico de cabecera',
          'Mantenga un registro de sus síntomas',
          'Si los síntomas empeoran, busque atención médica inmediata',
        ],
        urgencia: 'media',
        disclaimer:
          'Esta es una herramienta orientativa. NO reemplaza la consulta médica profesional.',
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
