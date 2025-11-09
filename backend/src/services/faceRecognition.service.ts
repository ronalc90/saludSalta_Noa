/**
 * Servicio de Reconocimiento Facial
 * Comparación de descriptores faciales sin dependencias nativas
 * Los descriptores son extraídos en el frontend con face-api.js
 */

/**
 * Calcular distancia euclidiana entre dos descriptores faciales
 * @returns Distancia (0 = idénticos, mayor = más diferentes)
 * Un valor < 0.6 generalmente indica la misma persona
 */
export const euclideanDistance = (descriptor1: number[], descriptor2: number[]): number => {
  if (descriptor1.length !== descriptor2.length) {
    throw new Error('Los descriptores deben tener la misma longitud');
  }

  let sum = 0;
  for (let i = 0; i < descriptor1.length; i++) {
    const diff = descriptor1[i] - descriptor2[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

/**
 * Verificar si un descriptor capturado coincide con alguno de los descriptores almacenados
 * @param capturedDescriptor Descriptor facial capturado en el frontend
 * @param storedDescriptors Array de descriptores almacenados en la BD
 * @param threshold Umbral de similitud (default 0.6, más bajo = más estricto)
 */
export const matchFaceWithStoredDescriptors = (
  capturedDescriptor: number[],
  storedDescriptors: number[][],
  threshold: number = 0.6
): { match: boolean; distance: number; confidence: number } => {
  if (!capturedDescriptor || capturedDescriptor.length === 0) {
    console.log('❌ No se proporcionó descriptor capturado');
    return { match: false, distance: 1.0, confidence: 0 };
  }

  if (!storedDescriptors || storedDescriptors.length === 0) {
    console.log('❌ No hay descriptores almacenados para comparar');
    return { match: false, distance: 1.0, confidence: 0 };
  }

  let minDistance = 1.0;
  let matchFound = false;

  console.log(`🔍 Comparando descriptor capturado con ${storedDescriptors.length} descriptores almacenados`);

  for (let i = 0; i < storedDescriptors.length; i++) {
    const storedDescriptor = storedDescriptors[i];

    try {
      const distance = euclideanDistance(capturedDescriptor, storedDescriptor);

      console.log(`  [${i + 1}/${storedDescriptors.length}] Distancia: ${distance.toFixed(4)} ${distance < threshold ? '✅ MATCH' : '❌'}`);

      if (distance < minDistance) {
        minDistance = distance;
      }

      if (distance < threshold) {
        matchFound = true;
        // No hacer break - seguir comparando para encontrar la mejor coincidencia
      }
    } catch (error) {
      console.error(`❌ Error comparando descriptor ${i + 1}:`, error);
    }
  }

  // Calcular confianza: 0% (distancia = 1.0) a 100% (distancia = 0)
  const confidence = Math.max(0, Math.min(100, (1 - minDistance) * 100));

  console.log(`\n${matchFound ? '✅ MATCH ENCONTRADO' : '❌ NO MATCH'}`);
  console.log(`📊 Distancia mínima: ${minDistance.toFixed(4)}`);
  console.log(`📊 Umbral: ${threshold}`);
  console.log(`📊 Confianza: ${confidence.toFixed(1)}%\n`);

  return {
    match: matchFound,
    distance: minDistance,
    confidence: Math.round(confidence)
  };
};
