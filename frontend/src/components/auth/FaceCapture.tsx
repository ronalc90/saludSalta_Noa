/**
 * Componente de Captura Facial
 * Captura el rostro del usuario usando la cámara
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface FaceCaptureProps {
  onCapture: (faceData: string[]) => void;
  onCancel: () => void;
}

export function FaceCapture({ onCapture, onCancel }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [step, setStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);

  const steps = [
    { instruction: 'Mira directo a la cámara', emoji: '😊' },
    { instruction: 'Gira ligeramente a la izquierda', emoji: '↖️' },
    { instruction: 'Gira ligeramente a la derecha', emoji: '↗️' },
    { instruction: 'Sonríe', emoji: '😄' },
  ];

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

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
        setIsCameraReady(true);
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

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

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
    } else {
      // Completado - enviar imágenes
      stopCamera();
      onCapture(newImages);
    }
  };

  const retry = () => {
    setStep(0);
    setCapturedImages([]);
    setError('');
    startCamera();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Registro Facial
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
              <div>
                <div className="font-bold text-lg">
                  Paso {step + 1} de {steps.length}
                </div>
                <div className="text-gray-700">{steps[step].instruction}</div>
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

            {/* Guía visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-primary-500 rounded-full w-64 h-80 opacity-50"></div>
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
          <Button
            variant="primary"
            size="lg"
            onClick={capturePhoto}
            disabled={!isCameraReady}
            className="flex-1"
          >
            📸 Capturar
          </Button>
        </div>

        {capturedImages.length > 0 && (
          <button
            onClick={retry}
            className="text-sm text-primary-600 hover:text-primary-700 mt-3 w-full text-center"
          >
            Reintentar desde el inicio
          </button>
        )}
      </div>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
