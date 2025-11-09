# ML Service - Plataforma Salud Fabi

Servicio de Machine Learning para predicción orientativa de enfermedades.

⚠️ **IMPORTANTE**: Este es un servicio ORIENTATIVO con datos sintéticos de ejemplo. NO reemplaza el diagnóstico médico profesional.

## Características

- ✅ FastAPI para API REST
- ✅ Predictor basado en síntomas
- ✅ Datos sintéticos de demostración
- ✅ Documentación automática con Swagger
- ✅ Disclaimers éticos en respuestas
- ✅ Niveles de urgencia

## Estructura

```
app/
├── main.py         # FastAPI app
├── predictor.py    # Lógica de predicción
└── __init__.py
requirements.txt
Dockerfile
```

## Instalación

```bash
pip install -r requirements.txt
```

## Desarrollo

```bash
# Opción 1: uvicorn directo
uvicorn app.main:app --reload --port 8001

# Opción 2: Python module
python -m uvicorn app.main:app --reload --port 8001
```

Servicio en [http://localhost:8001](http://localhost:8001)

## Documentación API

Swagger UI: [http://localhost:8001/docs](http://localhost:8001/docs)

## Endpoints

### `GET /`
Health check básico

### `GET /health`
Status del servicio

### `POST /predict`
Predicción de enfermedades

**Request:**
```json
{
  "sintomas": ["fiebre", "tos", "dolor de cabeza"],
  "detalles": "Síntomas desde hace 3 días"
}
```

**Response:**
```json
{
  "predicciones": [
    {
      "enfermedad": "Gripe (Influenza)",
      "probabilidad": 0.85,
      "descripcion": "Infección viral del sistema respiratorio"
    }
  ],
  "recomendaciones": [
    "Consulte con su médico en las próximas 24-48 horas",
    "Manténgase hidratado"
  ],
  "urgencia": "media",
  "disclaimer": "⚠️ IMPORTANTE: Esta es una herramienta orientativa..."
}
```

## Algoritmo

### Base de Conocimiento

El predictor actual usa una base de conocimiento con condiciones comunes:
- Resfriado Común
- Gripe (Influenza)
- Gastroenteritis
- Migraña
- Hipertensión
- Infección Respiratoria

### Normalización de Síntomas

Mapea variaciones del mismo síntoma:
- "tos" → ["tos", "toser"]
- "fiebre" → ["fiebre", "temperatura", "calentura"]
- etc.

### Scoring

Calcula coincidencia entre síntomas del usuario y cada enfermedad:
```
score = síntomas_coincidentes / total_síntomas_enfermedad
```

### Niveles de Urgencia

- **Baja**: Condiciones leves, consulta programada
- **Media**: Consulta médica en 24-48h
- **Alta**: Atención inmediata requerida

Síntomas que activan urgencia alta:
- Dificultad para respirar
- Dolor de pecho

## Reemplazar con Modelo Real

Para usar en producción:

### 1. Obtener Dataset

Fuentes recomendadas:
- Datos abiertos de salud pública
- Datasets médicos validados
- Colaboración con instituciones médicas

### 2. Entrenar Modelo

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer

# Entrenar modelo
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(sintomas_texto)
y = enfermedades

model = RandomForestClassifier()
model.fit(X, y)

# Guardar modelo
import joblib
joblib.dump(model, 'models/predictor.pkl')
joblib.dump(vectorizer, 'models/vectorizer.pkl')
```

### 3. Actualizar Predictor

Reemplazar `app/predictor.py` con:

```python
import joblib

class PredictorEnfermedades:
    def __init__(self):
        self.model = joblib.load('models/predictor.pkl')
        self.vectorizer = joblib.load('models/vectorizer.pkl')

    def predecir(self, sintomas, detalles=""):
        # Vectorizar síntomas
        X = self.vectorizer.transform([' '.join(sintomas)])

        # Predecir
        probas = self.model.predict_proba(X)[0]
        clases = self.model.classes_

        # Top 3 predicciones
        top_indices = probas.argsort()[-3:][::-1]

        predicciones = [{
            'enfermedad': clases[i],
            'probabilidad': float(probas[i]),
            'descripcion': self._get_descripcion(clases[i])
        } for i in top_indices]

        return {
            'predicciones': predicciones,
            'recomendaciones': self._generar_recomendaciones(sintomas),
            'urgencia': self._calcular_urgencia(sintomas)
        }
```

## Ética y Responsabilidad

### Disclaimers Obligatorios

Todas las respuestas incluyen:
```
⚠️ IMPORTANTE: Esta es una herramienta orientativa basada en patrones comunes.
NO sustituye la consulta con un médico profesional.
Siempre consulte a su médico para diagnóstico y tratamiento adecuado.
```

### Principios

1. **Transparencia**: El usuario sabe que es orientativo
2. **No Diagnóstico**: Nunca afirmar diagnóstico definitivo
3. **Derivación Médica**: Siempre recomendar consulta profesional
4. **Urgencias**: Identificar síntomas graves
5. **Consentimiento**: Usuario acepta términos antes de usar

### Limitaciones

- Basado en patrones generales, no individualizados
- No considera historial médico completo
- No reemplaza examen físico
- No proporciona tratamiento

## Testing

```bash
# Instalar pytest
pip install pytest

# Ejecutar tests
pytest tests/
```

## Despliegue

Ver `/DEPLOYMENT_GUIDE.md` para Railway.

## Variables de Entorno

```env
ML_PORT=8001
ML_LOG_LEVEL=info
```

## Monitoreo

En producción, agregar:
- Logging de predicciones
- Métricas de uso
- Alertas de errores
- Auditoría de predicciones

## Ejemplo de Uso

```python
import requests

response = requests.post('http://localhost:8001/predict', json={
    'sintomas': ['fiebre', 'tos', 'fatiga'],
    'detalles': 'Síntomas por 3 días'
})

data = response.json()
print(data['predicciones'])
print(data['recomendaciones'])
print(data['urgencia'])
```

## Próximos Pasos

1. [ ] Obtener dataset médico validado
2. [ ] Entrenar modelo con datos reales
3. [ ] Validación con profesionales médicos
4. [ ] Auditoría ética del algoritmo
5. [ ] Testing con usuarios reales
6. [ ] Monitoreo y mejora continua

## Recursos

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [scikit-learn](https://scikit-learn.org/)
- [Datos Abiertos Salud Argentina](https://datos.gob.ar/dataset?theme=salud)

## Soporte

Ver README principal en la raíz del proyecto.
