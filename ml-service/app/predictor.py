"""
Predictor de enfermedades basado en síntomas
Versión simplificada con datos sintéticos para demostración

NOTA: En producción, reemplazar con modelo entrenado con datos clínicos reales
y validados de fuentes confiables (ej: datos abiertos de salud pública)
"""

from typing import List, Dict, Any


class PredictorEnfermedades:
    """
    Predictor orientativo de enfermedades basado en síntomas

    IMPORTANTE: Esta es una implementación de ejemplo con datos sintéticos.
    NO debe usarse para diagnóstico médico real.
    """

    def __init__(self):
        # Base de conocimiento simplificada (datos sintéticos de ejemplo)
        # En producción, reemplazar con modelo ML entrenado con datos reales
        self.base_conocimiento = {
            'Resfriado Común': {
                'sintomas': ['tos', 'dolor de garganta', 'congestion nasal', 'fatiga', 'estornudos'],
                'descripcion': 'Infección viral común del tracto respiratorio superior',
                'urgencia': 'baja',
            },
            'Gripe (Influenza)': {
                'sintomas': ['fiebre', 'tos', 'dolor muscular', 'fatiga', 'dolor de cabeza', 'escalofrios'],
                'descripcion': 'Infección viral que afecta el sistema respiratorio',
                'urgencia': 'media',
            },
            'Gastroenteritis': {
                'sintomas': ['nauseas', 'vomitos', 'diarrea', 'dolor abdominal', 'fiebre'],
                'descripcion': 'Inflamación del tracto gastrointestinal',
                'urgencia': 'media',
            },
            'Migraña': {
                'sintomas': ['dolor de cabeza', 'nauseas', 'sensibilidad a la luz', 'mareos'],
                'descripcion': 'Dolor de cabeza intenso, a menudo pulsátil',
                'urgencia': 'baja',
            },
            'Hipertensión': {
                'sintomas': ['dolor de cabeza', 'mareos', 'vision borrosa', 'fatiga'],
                'descripcion': 'Presión arterial elevada',
                'urgencia': 'media',
            },
            'Infección Respiratoria': {
                'sintomas': ['tos', 'fiebre', 'dificultad para respirar', 'dolor de pecho', 'fatiga'],
                'descripcion': 'Infección de las vías respiratorias',
                'urgencia': 'alta',
            },
        }

    def _normalizar_sintoma(self, sintoma: str) -> str:
        """Normaliza el texto del síntoma"""
        # Mapeo de variaciones comunes
        mapeo = {
            'tos': ['tos', 'toser'],
            'fiebre': ['fiebre', 'temperatura', 'calentura'],
            'dolor de cabeza': ['dolor de cabeza', 'cefalea', 'jaqueca'],
            'dolor de garganta': ['dolor de garganta', 'garganta irritada'],
            'nauseas': ['nauseas', 'náuseas', 'ganas de vomitar'],
            'vomitos': ['vomitos', 'vómitos', 'vomitar'],
            'diarrea': ['diarrea', 'deposiciones liquidas'],
            'fatiga': ['fatiga', 'cansancio', 'agotamiento'],
            'dolor muscular': ['dolor muscular', 'dolor de músculos', 'mialgia'],
            'dificultad para respirar': ['dificultad para respirar', 'falta de aire', 'disnea'],
        }

        sintoma_lower = sintoma.lower().strip()
        for key, variaciones in mapeo.items():
            if sintoma_lower in variaciones or any(v in sintoma_lower for v in variaciones):
                return key
        return sintoma_lower

    def _calcular_score(self, sintomas_usuario: List[str], sintomas_enfermedad: List[str]) -> float:
        """Calcula el score de coincidencia entre síntomas del usuario y la enfermedad"""
        sintomas_norm_usuario = [self._normalizar_sintoma(s) for s in sintomas_usuario]
        sintomas_norm_enfermedad = [self._normalizar_sintoma(s) for s in sintomas_enfermedad]

        coincidencias = sum(
            1 for s in sintomas_norm_usuario if s in sintomas_norm_enfermedad
        )

        if len(sintomas_norm_enfermedad) == 0:
            return 0.0

        return coincidencias / len(sintomas_norm_enfermedad)

    def predecir(self, sintomas: List[str], detalles: str = "") -> Dict[str, Any]:
        """
        Predice posibles enfermedades basado en síntomas

        Args:
            sintomas: Lista de síntomas del usuario
            detalles: Información adicional (opcional)

        Returns:
            Diccionario con predicciones, recomendaciones y nivel de urgencia
        """
        if not sintomas:
            return {
                'predicciones': [],
                'recomendaciones': ['Proporcione al menos un síntoma'],
                'urgencia': 'baja',
            }

        # Calcular scores para cada enfermedad
        resultados = []
        for enfermedad, info in self.base_conocimiento.items():
            score = self._calcular_score(sintomas, info['sintomas'])
            if score > 0:
                resultados.append({
                    'enfermedad': enfermedad,
                    'probabilidad': min(score, 1.0),
                    'descripcion': info['descripcion'],
                    'urgencia': info['urgencia'],
                })

        # Ordenar por probabilidad
        resultados.sort(key=lambda x: x['probabilidad'], reverse=True)

        # Tomar top 3
        top_resultados = resultados[:3]

        # Si no hay coincidencias, sugerir consulta médica
        if not top_resultados:
            top_resultados = [{
                'enfermedad': 'Consulta Médica Necesaria',
                'probabilidad': 1.0,
                'descripcion': 'Los síntomas no coinciden con condiciones comunes. Se recomienda evaluación médica.',
            }]

        # Determinar urgencia general
        urgencias = [r.get('urgencia', 'media') for r in top_resultados]
        urgencia_general = 'alta' if 'alta' in urgencias else 'media' if 'media' in urgencias else 'baja'

        # Generar recomendaciones
        recomendaciones = self._generar_recomendaciones(sintomas, urgencia_general)

        return {
            'predicciones': [{
                'enfermedad': r['enfermedad'],
                'probabilidad': round(r['probabilidad'], 2),
                'descripcion': r['descripcion'],
            } for r in top_resultados],
            'recomendaciones': recomendaciones,
            'urgencia': urgencia_general,
        }

    def _generar_recomendaciones(self, sintomas: List[str], urgencia: str) -> List[str]:
        """Genera recomendaciones basadas en síntomas y urgencia"""
        recomendaciones = []

        sintomas_norm = [self._normalizar_sintoma(s) for s in sintomas]

        if urgencia == 'alta' or 'dificultad para respirar' in sintomas_norm or 'dolor de pecho' in sintomas_norm:
            recomendaciones.append('🚨 URGENTE: Busque atención médica inmediata')
            recomendaciones.append('Considere llamar a emergencias si los síntomas son severos')
        else:
            recomendaciones.append('Consulte con su médico de cabecera en las próximas 24-48 horas')

        if 'fiebre' in sintomas_norm:
            recomendaciones.append('Manténgase hidratado y controle su temperatura')

        if 'tos' in sintomas_norm or 'dolor de garganta' in sintomas_norm:
            recomendaciones.append('Descanse la voz y mantenga la garganta húmeda')

        if 'diarrea' in sintomas_norm or 'vomitos' in sintomas_norm:
            recomendaciones.append('Mantenga hidratación adecuada para evitar deshidratación')

        recomendaciones.append('Mantenga un registro de sus síntomas y su evolución')
        recomendaciones.append('Evite automedicarse sin consultar a un profesional')

        return recomendaciones
