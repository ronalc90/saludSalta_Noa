/**
 * Componente de Captura Facial Automática
 * Detecta rostro automáticamente y captura cuando está en buena posición
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import * as faceapi from '@vladmandic/face-api';

interface AutoFaceCaptureProps {
  onCapture: (faceData: string[]) => void;
  onCancel: () => void;
  captureCount?: number; // Número de fotos a capturar
}

export function AutoFaceCapture({ onCapture, onCancel, captureCount = 4 }: AutoFaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [step, setStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [qualityScore, setQualityScore] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    { instruction: 'Mira directo a la cámara', emoji: '😊', angle: 'frontal' },
    { instruction: 'Gira ligeramente a la izquierda', emoji: '↖️', angle: 'left' },
    { instruction: 'Gira ligeramente a la derecha', emoji: '↗️', angle: 'right' },
    { instruction: 'Sonríe naturalmente', emoji: '😄', angle: 'smile' },
  ];

  useEffect(() => {
    loadModels();
    return () => {
      stopCamera();
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (modelsLoaded && isCameraReady && !isDetecting) {
      startFaceDetection();
    }
  }, [modelsLoaded, isCameraReady, step]);

  const [useFaceAPI, setUseFaceAPI] = useState(false);

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';

      // Intentar cargar solo el detector básico primero
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

      // Si funcionó, cargar el resto
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

      console.log('✅ Modelos de face-api cargados exitosamente');
      setUseFaceAPI(true);
      setModelsLoaded(true);
      startCamera();
    } catch (err) {
      console.error('❌ Error cargando modelos face-api:', err);
      console.log('⚠️ Continuando con detección básica (sin face-api)');
      setUseFaceAPI(false);
      setModelsLoaded(true);
      startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);

        // Esperar a que el video cargue sus metadatos antes de marcar como listo
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded:', videoRef.current?.videoWidth, videoRef.current?.videoHeight);
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      setError('No se pudo acceder a la cámara. Verifique los permisos.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const startFaceDetection = () => {
    setIsDetecting(true);

    // Detección simple basada en brillo y posición
    detectionIntervalRef.current = setInterval(() => {
      detectFaceQuality();
    }, 500);
  };

  const detectFaceQuality = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) return;

    // Verificar que el video tenga dimensiones válidas
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log('Video dimensions not ready yet');
      return;
    }

    // Configurar canvas temporal para análisis
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let quality = 0;
    let faceDetectionScore = 0;

    // Intentar detectar rostro real con face-api.js SI está disponible
    if (useFaceAPI) {
      try {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 416 }))
          .withFaceLandmarks();

        if (detections) {
          // Rostro detectado con landmarks
          const detection = detections.detection;
          const landmarks = detections.landmarks;

          // Verificar que el rostro esté centrado y de tamaño adecuado
          const faceBox = detection.box;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Centro del rostro
          const faceCenterX = faceBox.x + faceBox.width / 2;
          const faceCenterY = faceBox.y + faceBox.height / 2;
          const videoCenterX = videoWidth / 2;
          const videoCenterY = videoHeight / 2;

          // Distancia del centro
          const distanceFromCenter = Math.sqrt(
            Math.pow(faceCenterX - videoCenterX, 2) +
            Math.pow(faceCenterY - videoCenterY, 2)
          );
          const maxDistance = Math.min(videoWidth, videoHeight) * 0.3;

          // Tamaño del rostro (debe ser al menos 15% del video)
          const faceSize = (faceBox.width * faceBox.height) / (videoWidth * videoHeight);

          // Puntos faciales detectados (landmarks)
          const landmarksCount = landmarks.positions.length;

          console.log('✅ Rostro detectado con face-api:', {
            size: (faceSize * 100).toFixed(2) + '%',
            centered: distanceFromCenter < maxDistance,
            landmarks: landmarksCount,
            confidence: detection.score.toFixed(2),
          });

          // Calcular score de detección facial
          if (landmarksCount >= 68) faceDetectionScore += 40; // Todos los landmarks
          if (faceSize >= 0.15 && faceSize <= 0.5) faceDetectionScore += 30; // Tamaño adecuado
          if (distanceFromCenter < maxDistance) faceDetectionScore += 20; // Centrado
          if (detection.score > 0.7) faceDetectionScore += 10; // Alta confianza

          setFaceDetected(true);
        } else {
          console.log('❌ No se detectó rostro válido con face-api');
          setFaceDetected(false);
          faceDetectionScore = 0;
        }
      } catch (err) {
        console.log('⚠️ Error en detección con face-api:', err);
        // Si face-api falla, deshabilitarlo y usar método simple
        setUseFaceAPI(false);
        faceDetectionScore = 50;
        setFaceDetected(true);
      }
    } else {
      // Método simple: análisis de brillo y contraste
      console.log('ℹ️ Usando detección básica (face-api no disponible)');
      faceDetectionScore = 60;
      setFaceDetected(true);
    }

    // Análisis de iluminación
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalBrightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      totalBrightness += (r + g + b) / 3;
    }
    const avgBrightness = totalBrightness / (data.length / 4);

    // Score de iluminación
    let lightingScore = 0;
    if (avgBrightness >= 80 && avgBrightness <= 180) {
      lightingScore = 20;
    } else if (avgBrightness >= 60 && avgBrightness <= 200) {
      lightingScore = 10;
    }

    // Calidad total = detección facial (70%) + iluminación (30%)
    quality = Math.min(100, faceDetectionScore + lightingScore);

    console.log('Quality check - Brightness:', avgBrightness.toFixed(2), 'FaceScore:', faceDetectionScore, 'Total:', quality);
    setQualityScore(quality);

    // Auto-captura cuando la calidad es buena (requiere rostro real detectado)
    if (quality >= 80 && faceDetectionScore >= 70) {
      setTimeout(() => {
        capturePhoto();
      }, 1000);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Configurar tamaño del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el frame actual del video
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir a base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);

    // Guardar imagen
    const newImages = [...capturedImages, imageData];
    setCapturedImages(newImages);

    // Siguiente paso
    if (step < steps.length - 1) {
      setStep(step + 1);
      setQualityScore(0);
      setFaceDetected(false);
      setIsDetecting(false);
    } else {
      // Completado - enviar imágenes
      stopCamera();
      onCapture(newImages);
    }
  };

  const getQualityColor = () => {
    if (qualityScore >= 80) return 'text-green-500';
    if (qualityScore >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityMessage = () => {
    if (qualityScore >= 80) return '✓ Perfecto! Capturando...';
    if (qualityScore >= 50) return 'Ajusta la iluminación...';
    if (faceDetected) return 'Rostro detectado, mejora la luz...';
    return 'Posiciona tu rostro en el óvalo...';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Registro Facial Automático
        </h2>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-6">
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{steps[step].emoji}</div>
              <div className="flex-1">
                <div className="font-bold text-lg">
                  Paso {step + 1} de {steps.length}
                </div>
                <div className="text-gray-700">{steps[step].instruction}</div>
                <div className={`font-bold mt-2 ${getQualityColor()}`}>
                  {getQualityMessage()}
                </div>
              </div>
            </div>
          </div>

          {/* Vista previa de la cámara */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />

            {/* Guía visual con indicador de calidad */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`border-4 rounded-full w-64 h-80 transition-all duration-300 ${
                  qualityScore >= 80
                    ? 'border-green-500'
                    : qualityScore >= 50
                    ? 'border-yellow-500'
                    : 'border-red-500'
                } ${qualityScore >= 80 ? 'opacity-100' : 'opacity-50'}`}
              >
              </div>
            </div>

            {/* Indicador de calidad */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black bg-opacity-60 rounded-lg p-3 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Calidad de Captura</span>
                  <span className={`text-sm font-bold ${getQualityColor()}`}>
                    {qualityScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      qualityScore >= 80
                        ? 'bg-green-500'
                        : qualityScore >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${qualityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Canvas oculto para captura */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Indicador de progreso */}
          <div className="flex gap-2 mt-4 justify-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 ${
                  index < step
                    ? 'bg-green-500'
                    : index === step
                    ? 'bg-primary-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={capturePhoto}
            className="flex-1"
          >
            📸 Capturar Ahora
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              stopCamera();
              onCancel();
            }}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </div>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
