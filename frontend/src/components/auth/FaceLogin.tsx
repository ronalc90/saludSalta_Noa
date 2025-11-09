/**
 * Componente de Login Facial
 * Captura el rostro del usuario para autenticación
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface FaceLoginProps {
  onCapture: (faceData: string) => void;
  onCancel: () => void;
}

export function FaceLogin({ onCapture, onCancel }: FaceLoginProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const timer = setTimeout(() => {
      if (countdown === 1) {
        capturePhoto();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

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

  const startCountdown = () => {
    setCountdown(3);
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

    // Detener cámara y enviar
    stopCamera();
    onCapture(imageData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Iniciar Sesión con Rostro
        </h2>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-6">
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">😊</div>
              <div>
                <div className="font-bold text-lg">
                  Coloca tu rostro en el centro
                </div>
                <div className="text-gray-700">
                  Asegúrate de tener buena iluminación
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

            {/* Guía visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-primary-500 rounded-full w-64 h-80 opacity-50"></div>
            </div>

            {/* Countdown */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-9xl font-bold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}

            {/* Canvas oculto para captura */}
            <canvas ref={canvasRef} className="hidden" />
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
            disabled={countdown !== null}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={startCountdown}
            disabled={!isCameraReady || countdown !== null}
            className="flex-1"
          >
            {countdown !== null ? '⏱️ Capturando...' : '📸 Capturar Rostro'}
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
