/**
 * Componente de Login Facial Automático
 * Captura automática cuando detecta rostro en buena posición
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import * as faceapi from '@vladmandic/face-api';

interface AutoFaceLoginProps {
  onCapture: (faceData: string) => void;
  onCancel: () => void;
}

export function AutoFaceLogin({ onCapture, onCancel }: AutoFaceLoginProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [qualityScore, setQualityScore] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [useFaceAPI, setUseFaceAPI] = useState(false);

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
    if (modelsLoaded && isCameraReady && !capturing) {
      startFaceDetection();
    }
  }, [modelsLoaded, isCameraReady]);

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
    detectionIntervalRef.current = setInterval(() => {
      detectFaceQuality();
    }, 500);
  };

  const detectFaceQuality = async () => {
    if (!videoRef.current || !canvasRef.current || capturing) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) return;

    // Verificar que el video tenga dimensiones válidas
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log('Video dimensions not ready yet');
      return;
    }

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
          const detection = detections.detection;
          const landmarks = detections.landmarks;

          const faceBox = detection.box;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          const faceCenterX = faceBox.x + faceBox.width / 2;
          const faceCenterY = faceBox.y + faceBox.height / 2;
          const videoCenterX = videoWidth / 2;
          const videoCenterY = videoHeight / 2;

          const distanceFromCenter = Math.sqrt(
            Math.pow(faceCenterX - videoCenterX, 2) +
            Math.pow(faceCenterY - videoCenterY, 2)
          );
          const maxDistance = Math.min(videoWidth, videoHeight) * 0.3;

          const faceSize = (faceBox.width * faceBox.height) / (videoWidth * videoHeight);
          const landmarksCount = landmarks.positions.length;

          console.log('✅ Rostro detectado con face-api:', {
            size: (faceSize * 100).toFixed(2) + '%',
            centered: distanceFromCenter < maxDistance,
            landmarks: landmarksCount,
            confidence: detection.score.toFixed(2),
          });

          if (landmarksCount >= 68) faceDetectionScore += 40;
          if (faceSize >= 0.15 && faceSize <= 0.5) faceDetectionScore += 30;
          if (distanceFromCenter < maxDistance) faceDetectionScore += 20;
          if (detection.score > 0.7) faceDetectionScore += 10;

          setFaceDetected(true);
        } else {
          console.log('❌ No se detectó rostro válido con face-api');
          setFaceDetected(false);
          faceDetectionScore = 0;
        }
      } catch (err) {
        console.log('⚠️ Error en detección con face-api:', err);
        setUseFaceAPI(false);
        faceDetectionScore = 60;
        setFaceDetected(true);
      }
    } else {
      // Método simple: análisis básico
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

    let lightingScore = 0;
    if (avgBrightness >= 80 && avgBrightness <= 180) {
      lightingScore = 20;
    } else if (avgBrightness >= 60 && avgBrightness <= 200) {
      lightingScore = 10;
    }

    quality = Math.min(100, faceDetectionScore + lightingScore);

    console.log('Quality check - Brightness:', avgBrightness.toFixed(2), 'FaceScore:', faceDetectionScore, 'Total:', quality);
    setQualityScore(quality);

    // Auto-captura cuando la calidad es buena (requiere rostro real)
    if (quality >= 90 && faceDetectionScore >= 70 && !capturing) {
      setTimeout(() => {
        capturePhoto();
      }, 1000);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || capturing) return;

    setCapturing(true);

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);

    stopCamera();
    onCapture(imageData);
  };

  const getQualityColor = () => {
    if (qualityScore >= 90) return 'text-green-500';
    if (qualityScore >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityMessage = () => {
    if (qualityScore >= 90) return '✓ Perfecto! Capturando...';
    if (qualityScore >= 50) return 'Ajusta la iluminación...';
    if (faceDetected) return 'Rostro detectado, mejora la luz...';
    return 'Posiciona tu rostro en el centro...';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Verificación Facial
        </h2>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-6">
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 mb-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-5xl">😊</div>
              <div className="font-bold text-lg">Mira directamente a la cámara</div>
              <div className={`font-bold ${getQualityColor()}`}>
                {getQualityMessage()}
              </div>
            </div>
          </div>

          <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`border-4 rounded-full w-64 h-80 transition-all duration-300 ${
                  qualityScore >= 90
                    ? 'border-green-500 animate-pulse'
                    : qualityScore >= 50
                    ? 'border-yellow-500'
                    : 'border-red-500'
                } ${qualityScore >= 90 ? 'opacity-100' : 'opacity-50'}`}
              ></div>
            </div>

            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black bg-opacity-60 rounded-lg p-3 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Calidad de Verificación</span>
                  <span className={`text-sm font-bold ${getQualityColor()}`}>
                    {qualityScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      qualityScore >= 90
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

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={capturePhoto}
            className="flex-1"
            disabled={capturing}
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
            disabled={capturing}
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
