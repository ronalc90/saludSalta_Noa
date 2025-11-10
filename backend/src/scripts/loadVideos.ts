/**
 * Script para cargar videos educativos como clases
 * Ejecutar con: npx tsx src/scripts/loadVideos.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Clase from '../models/Clase';
import User from '../models/User';

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Función para extraer el ID de video de YouTube
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]+)/,
    /youtube\.com\/playlist\?list=([^&\?]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Función para generar URL de thumbnail de YouTube
function getYouTubeThumbnail(url: string): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) return '';

  if (url.includes('playlist')) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

// Función para parsear duración (ej: "20 min" -> 20)
function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

const videosData = [
  {
    titulo: "Ejercicio para personas con diabetes",
    descripcion: "Rutina de ejercicios para diabéticos.",
    url: "https://www.youtube.com/watch?v=NtmwlCPDPuA",
    duracion: "apropiada min",
    categoria: "Diabetes",
    tags: ["Diabetes", "Ejercicio físico"]
  },
  {
    titulo: "DIABETES MELLITUS",
    descripcion: "Video informativo sobre la diabetes",
    url: "https://www.youtube.com/watch?v=wdQ_ObseLAU",
    duracion: "20 min",
    categoria: "Diabetes",
    tags: ["Diabetes"]
  },
  {
    titulo: "Diabetes en el Adulto Mayor",
    descripcion: "Adulto mayor (diabetes)",
    url: "https://www.youtube.com/watch?v=GlRz7Oz5jsc",
    duracion: "6 min",
    categoria: "Diabetes",
    tags: ["Diabetes", "Diabetes en adulto mayor"]
  },
  {
    titulo: "3 ejercicios de equilibrio para mayores de 80 años",
    descripcion: "Ejercicios adaptados para adultos mayores de 80 años.",
    url: "https://www.youtube.com/watch?v=3A-13HmFxOw",
    duracion: "17 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Equilibrio avanzado"]
  },
  {
    titulo: "5 ejercicios de equilibrio para prevenir caídas",
    descripcion: "Rutina para mejorar estabilidad.",
    url: "https://www.youtube.com/watch?v=mC_Wdu6d-rM",
    duracion: "9 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Equilibrio", "Prevención"]
  },
  {
    titulo: "60 minutos de Ejercicio Aeróbico para Adultos Mayores Activos (rutina completa)",
    descripcion: "Rutina de 60 minutos de aeróbico para mayores activos, con calentamiento y estiramientos.",
    url: "https://www.youtube.com/watch?v=-QYqhmQj_ZI",
    duracion: "60 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Aeróbico", "Actividad prolongada"]
  },
  {
    titulo: "Caminata en casa para adultos mayores",
    descripcion: "Caminata adaptada para mejorar la salud cardiovascular.",
    url: "https://www.youtube.com/watch?v=agdi2Kn1n3k",
    duracion: "38 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Caminar", "Cardio"]
  },
  {
    titulo: "Ejercicios Físicos de Equilibrio para Prevenir CAÍDAS en adultos mayores",
    descripcion: "En este video encontrarás 3 actividades físicas para realizar con adultos mayores y PREVENIR CAÍDAS",
    url: "https://www.youtube.com/watch?v=Id4XqUd8DfM",
    duracion: "4 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Equilibrio", "Prevención de caídas"]
  },
  {
    titulo: "Rutina de CARDIO en CASA para Adultos Mayores | 1 hora completa",
    descripcion: "Rutina completa de ejercicio de cardio en casa para adultos mayores.",
    url: "https://www.youtube.com/watch?v=yCXh2BLc-rE",
    duracion: "59 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Cardio", "Ejercicio en casa"]
  },
  {
    titulo: "Rutina de Gimnasia para Adultos Mayores Activos (30 minutos)",
    descripcion: "Rutina de gimnasia de 30 minutos para adultos mayores activos.",
    url: "https://www.youtube.com/watch?v=eR-Lhr61VH4",
    duracion: "33 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Gimnasia", "Actividad moderada"]
  },
  {
    titulo: "Yoga en silla para adultos mayores",
    descripcion: "Rutina de yoga adaptada para la tercera edad.",
    url: "https://www.youtube.com/watch?v=vBXWOUXb_5g",
    duracion: "20 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Yoga", "Tercera edad"]
  },
  {
    titulo: "Yoga para adultos mayores y principiantes",
    descripcion: "Clase suave para adultos mayores o con poca flexibilidad.",
    url: "https://www.youtube.com/watch?v=20Xwv2zSIhc",
    duracion: "24 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Yoga", "Principiantes"]
  },
  {
    titulo: "Yoga para adultos mayores",
    descripcion: "Serie de clases de yoga para adultos mayores.",
    url: "https://www.youtube.com/watch?v=lvRnaQGp07Y",
    duracion: "6 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Yoga", "Tercera edad"]
  },
  {
    titulo: "Estiramientos de Yoga de todo el cuerpo",
    descripcion: "Yoga de todo el cuerpo para Aliviar el Estrés y la Ansiedad para Adultos Mayores",
    url: "https://www.youtube.com/watch?v=M5Jcq-YaMv4",
    duracion: "26 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Yoga", "Tercera edad"]
  },
  {
    titulo: "Caminata en Casa para Adultos Mayores",
    descripcion: "(Bajo Impacto) Power Walking",
    url: "https://www.youtube.com/watch?v=XyGvG60TcL8",
    duracion: "39 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Cardio", "Ejercicio en casa"]
  },
  {
    titulo: "5 Ejercicios de EQUILIBRIO para Adultos Mayores",
    descripcion: "5 Ejercicios de EQUILIBRIO para Adultos Mayores",
    url: "https://www.youtube.com/watch?v=mC_Wdu6d-rM",
    duracion: "9 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Equilibrio", "Prevención de caídas"]
  },
  {
    titulo: "Rutina de ejercicios para mayores de 70 años en silla, HAZLOS CONMIGO",
    descripcion: "Ejercicios adaptados para mayores de 70 años utilizando silla, para movilidad y fuerza.",
    url: "https://www.youtube.com/watch?v=YDZ_RN0kH2Y",
    duracion: "32 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Prevención", "Movilidad", "Silla", "Mayores de 70"]
  },
  {
    titulo: "RUTINA de Estiramientos para Adultos Mayores",
    descripcion: "Estiramientos suaves dirigidos a la tercera edad, enfocados en movilidad y prevención de rigidez.",
    url: "https://www.youtube.com/watch?v=HNqOmJ7Q0s0",
    duracion: "14 min",
    categoria: "Ejercicio físico",
    tags: ["Ejercicio físico", "Salud mental", "Estiramientos", "Relajación"]
  },
  {
    titulo: "10 Essential Nutrients for Older Adults (How to Take Them …)",
    descripcion: "Aborda nutrientes esenciales para personas mayores.",
    url: "https://www.youtube.com/watch?v=TzIRk6fNBk8",
    duracion: "53 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Micronutrientes", "Suplementación"]
  },
  {
    titulo: "Alimentación saludable en las personas mayores",
    descripcion: "Video que informa sobre la importancia de una alimentación adecuada en la vejez.",
    url: "https://www.youtube.com/watch?v=pBVof_fgLV4",
    duracion: "4 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Alimentación saludable", "Tercera edad"]
  },
  {
    titulo: "Guía de alimentación para los adultos mayores",
    descripcion: "Enfoque educativo en nutrición, necesidad de cubrir requerimientos, evitar deficiencias.",
    url: "https://www.youtube.com/watch?v=rK0zdmS0mb8",
    duracion: "50 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Guía dietética", "Prevención"]
  },
  {
    titulo: "Micronutrientes para tus células",
    descripcion: "Importancia de los micronutrientes en la dieta.",
    url: "https://www.youtube.com/watch?v=mBW3gHiWCck",
    duracion: "13 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Micronutrientes", "Salud general"]
  },
  {
    titulo: "Dormir bien para vivir mejor",
    descripcion: "Cómo un buen descanso mejora calidad de vida.",
    url: "https://www.youtube.com/watch?v=rQOs4Ss63qg",
    duracion: "19 min",
    categoria: "Prevención",
    tags: ["Prevención", "Dormir bien"]
  },
  {
    titulo: "Vitaminas para el adulto mayor",
    descripcion: "Uso de vitaminas en personas mayores.",
    url: "https://www.youtube.com/watch?v=nTjCLVv9S7s",
    duracion: "36 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Vitaminas", "Minerales"]
  },
  {
    titulo: "Malnutrición: Una epidemia oculta entre los adultos mayores",
    descripcion: "Aclara que la malnutrición también afecta a adultos mayores incluso con acceso a alimentos.",
    url: "https://www.youtube.com/watch?v=ADfqv42L7KI",
    duracion: "7 min",
    categoria: "Nutrición",
    tags: ["Nutrición", "Prevención", "Malnutrición", "Riesgo en mayores"]
  },
  {
    titulo: "Consejos de hidratación para mayores",
    descripcion: "Recomendaciones prácticas de hidratación.",
    url: "https://www.youtube.com/watch?v=mZni409_RCs",
    duracion: "2 min",
    categoria: "Prevención",
    tags: ["Prevención", "Hidratación", "Salud general"]
  },
  {
    titulo: "Importancia de la hidratación",
    descripcion: "Por qué los mayores deben cuidar su consumo de agua.",
    url: "https://www.youtube.com/watch?v=-H9f-EuMFkM",
    duracion: "4 min",
    categoria: "Prevención",
    tags: ["Prevención", "Hidratación"]
  },
  {
    titulo: "La importancia del buen dormir",
    descripcion: "Cómo el sueño afecta al envejecimiento saludable.",
    url: "https://www.youtube.com/watch?v=t3z77qy6Iq0",
    duracion: "62 min",
    categoria: "Prevención",
    tags: ["Prevención", "Sueño", "Descanso"]
  },
  {
    titulo: "Manejo del insomnio en el adulto mayor",
    descripcion: "Orientaciones para tratar el insomnio en adultos mayores.",
    url: "https://www.youtube.com/watch?v=aMskqaiQLwg",
    duracion: "57 min",
    categoria: "Prevención",
    tags: ["Prevención", "Sueño", "Descanso"]
  },
  {
    titulo: "Hipertensión arterial en el adulto mayor",
    descripcion: "Factores de riesgo y control de la presión arterial.",
    url: "https://www.youtube.com/watch?v=EEX7YttOiHI",
    duracion: "14 min",
    categoria: "Salud cardiovascular",
    tags: ["Salud cardiovascular", "Hipertensión"]
  },
  {
    titulo: "Reducir la hipertensión naturalmente",
    descripcion: "Consejos para controlar la presión arterial sin fármacos.",
    url: "https://www.youtube.com/watch?v=WUpxGdjcAQ0",
    duracion: "29 min",
    categoria: "Salud cardiovascular",
    tags: ["Salud cardiovascular", "Presión arterial", "Estilo de vida"]
  },
  {
    titulo: "Gimnasia Cerebral para Adultos Mayores",
    descripcion: "Ejercicios para Mantener la Mente Ágil",
    url: "https://www.youtube.com/watch?v=kDxzl0OOPa8",
    duracion: "8 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Gimnasia cerebral", "Estimulación cognitiva"]
  },
  {
    titulo: "6 actividades para personas mayores",
    descripcion: "Ejercicios de gimnasia cerebral y equilibrio.",
    url: "https://www.youtube.com/watch?v=xljsZK58Sqc",
    duracion: "8 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Cognición", "Equilibrio"]
  },
  {
    titulo: "Bienestar emocional y mente activa",
    descripcion: "Cómo cuidar la salud emocional en adultos mayores.",
    url: "https://www.youtube.com/watch?v=H1nGPH1bRn8",
    duracion: "4 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Bienestar", "Envejecimiento activo"]
  },
  {
    titulo: "Cómo Dormir Mejor Después de los 60",
    descripcion: "Secreto de un sueño reparador después de los 60 años",
    url: "https://www.youtube.com/watch?v=tMhd7rT8_Wo",
    duracion: "16 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Higiene del sueño", "Descanso reparador"]
  },
  {
    titulo: "Estiramientos para aliviar el estrés",
    descripcion: "Yoga suave para aliviar tensión y ansiedad.",
    url: "https://www.youtube.com/watch?v=M5Jcq-YaMv4",
    duracion: "26 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Relajación", "Respiración"]
  },
  {
    titulo: "Gimnasia cerebral para adultos mayores",
    descripcion: "Estimulación cognitiva y ejercicios mentales.",
    url: "https://www.youtube.com/watch?v=OjWGvJzKQeA",
    duracion: "2 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Gimnasia cerebral"]
  },
  {
    titulo: "Salud mental en el adulto mayor",
    descripcion: "Importancia del bienestar emocional en la vejez.",
    url: "https://www.youtube.com/watch?v=xydQTCzniiQ",
    duracion: "65 min",
    categoria: "Salud mental",
    tags: ["Salud mental", "Bienestar emocional"]
  },
  {
    titulo: "10 consejos para el tratamiento y prevención de la osteoporosis",
    descripcion: "Consejos para el tratamiento y prevención",
    url: "https://www.youtube.com/watch?v=Nrue66sC0Ck",
    duracion: "9 min",
    categoria: "Salud ósea",
    tags: ["Salud ósea", "Osteoporosis", "Nutrición"]
  },
  {
    titulo: "Qué debo comer si tengo osteoporosis",
    descripcion: "Alimentos que fortalecen huesos y previenen osteoporosis.",
    url: "https://www.youtube.com/watch?v=Qy39it6uaik",
    duracion: "13 min",
    categoria: "Salud ósea",
    tags: ["Salud ósea", "Osteoporosis", "Nutrición"]
  },
  {
    titulo: "Un hábito diario para huesos fuertes",
    descripcion: "Consejo simple para fortalecer huesos y articulaciones.",
    url: "https://www.youtube.com/watch?v=xUyuHbc9NnU",
    duracion: "10 min",
    categoria: "Salud ósea",
    tags: ["Salud ósea", "Huesos", "Articulaciones"]
  }
];

async function loadVideos() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Conectado a MongoDB');

    // Buscar un usuario admin
    console.log('🔍 Buscando usuario admin...');
    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      console.error('❌ No se encontró ningún usuario admin. Por favor, crea un usuario admin primero.');
      process.exit(1);
    }

    console.log(`✅ Usuario admin encontrado: ${adminUser.email}`);

    // Eliminar todas las clases existentes
    console.log('🗑️  Eliminando clases existentes...');
    const deleteResult = await Clase.deleteMany({});
    console.log(`✅ ${deleteResult.deletedCount} clases eliminadas`);

    // Insertar nuevos videos
    console.log('📹 Insertando nuevos videos...');
    let successCount = 0;
    let errorCount = 0;

    for (const video of videosData) {
      try {
        const nuevaClase = new Clase({
          titulo: video.titulo,
          descripcion: video.descripcion,
          autorId: adminUser._id,
          autorNombre: adminUser.nombre || adminUser.email,
          tipo: 'video',
          mediaUrl: video.url,
          thumbnailUrl: getYouTubeThumbnail(video.url),
          tags: video.tags,
          categoria: video.categoria,
          duracion: parseDuration(video.duracion),
          visibility: 'publica'
        });

        await nuevaClase.save();
        successCount++;
        console.log(`  ✅ ${video.titulo}`);
      } catch (error: any) {
        errorCount++;
        console.error(`  ❌ Error en "${video.titulo}": ${error.message}`);
      }
    }

    console.log('\n📊 Resumen:');
    console.log(`  ✅ Videos cargados exitosamente: ${successCount}`);
    console.log(`  ❌ Errores: ${errorCount}`);
    console.log(`  📹 Total de videos procesados: ${videosData.length}`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
loadVideos();
