"""
Servicio ML para predicción de enfermedades
FastAPI + scikit-learn
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from .predictor import PredictorEnfermedades

app = FastAPI(
    title="Fabi ML Service",
    description="Servicio de predicción orientativa de enfermedades",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar predictor
predictor = PredictorEnfermedades()


class PrediccionRequest(BaseModel):
    sintomas: List[str]
    detalles: Optional[str] = ""


class Prediccion(BaseModel):
    enfermedad: str
    probabilidad: float
    descripcion: str


class PrediccionResponse(BaseModel):
    predicciones: List[Prediccion]
    recomendaciones: List[str]
    urgencia: str
    disclaimer: str


@app.get("/")
def root():
    return {
        "service": "Fabi ML Service",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/predict", response_model=PrediccionResponse)
def predict(request: PrediccionRequest):
    """
    Predice posibles enfermedades basado en síntomas

    IMPORTANTE: Esta es una herramienta orientativa y educativa.
    NO reemplaza el diagnóstico médico profesional.
    """
    try:
        if not request.sintomas:
            raise HTTPException(status_code=400, detail="Debe proporcionar al menos un síntoma")

        resultado = predictor.predecir(request.sintomas, request.detalles)

        return PrediccionResponse(
            predicciones=resultado['predicciones'],
            recomendaciones=resultado['recomendaciones'],
            urgencia=resultado['urgencia'],
            disclaimer=(
                "⚠️ IMPORTANTE: Esta es una herramienta orientativa basada en patrones comunes. "
                "NO sustituye la consulta con un médico profesional. "
                "Siempre consulte a su médico para diagnóstico y tratamiento adecuado."
            ),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("ML_PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
