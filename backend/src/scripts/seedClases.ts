/**
 * Seed de Clases Educativas
 * 15 cursos de YouTube sobre salud, nutrición y bienestar
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Clase from '../models/Clase';
import User from '../models/User';

dotenv.config();

const YOUTUBE_COURSES = [
  {
    titulo: 'Alimentación Saludable para Adultos Mayores',
    descripcion: 'Guía completa sobre nutrición en la tercera edad, aprende qué alimentos incluir en tu dieta diaria para mantener una buena salud.',
    youtubeUrl: 'https://www.youtube.com/watch?v=X5zF0rqW4Vo',
    categoria: 'Nutrición',
    tags: ['nutrición', 'alimentación saludable', 'tercera edad'],
    duracion: 12,
  },
  {
    titulo: 'Ejercicios para Adultos Mayores en Casa',
    descripcion: 'Rutina de ejercicios suaves y efectivos que puedes hacer en casa para mantenerte activo, mejorar tu movilidad y fortalecer tu cuerpo.',
    youtubeUrl: 'https://www.youtube.com/watch?v=SfoVFnixxaQ',
    categoria: 'Ejercicio Físico',
    tags: ['ejercicio', 'tercera edad', 'actividad física', 'movilidad'],
    duracion: 25,
  },
  {
    titulo: 'Hipertensión: Cómo Controlarla Naturalmente',
    descripcion: 'Consejos prácticos para controlar la presión arterial de forma natural con alimentación, ejercicio y cambios en el estilo de vida.',
    youtubeUrl: 'https://www.youtube.com/watch?v=OBwbfSYKD7o',
    categoria: 'Salud Cardiovascular',
    tags: ['hipertensión', 'presión arterial', 'salud del corazón'],
    duracion: 15,
  },
  {
    titulo: 'Diabetes: Todo lo que Necesitas Saber',
    descripcion: 'Información completa sobre diabetes, cómo prevenirla, controlar los niveles de azúcar y mantener una vida saludable.',
    youtubeUrl: 'https://www.youtube.com/watch?v=8kDc4G-YoWE',
    categoria: 'Diabetes',
    tags: ['diabetes', 'glucosa', 'prevención', 'salud'],
    duracion: 20,
  },
  {
    titulo: 'Yoga para la Tercera Edad',
    descripcion: 'Clase de yoga adaptada para adultos mayores, mejora tu flexibilidad, equilibrio y encuentra paz mental con estos ejercicios suaves.',
    youtubeUrl: 'https://www.youtube.com/watch?v=VRc0hiLt_NE',
    categoria: 'Ejercicio Físico',
    tags: ['yoga', 'tercera edad', 'flexibilidad', 'equilibrio'],
    duracion: 18,
  },
  {
    titulo: 'Salud Mental y Bienestar Emocional',
    descripcion: 'Aprende a cuidar tu salud mental, manejar el estrés y mantener una actitud positiva en la vida diaria.',
    youtubeUrl: 'https://www.youtube.com/watch?v=IhqeKrALkok',
    categoria: 'Salud Mental',
    tags: ['salud mental', 'bienestar', 'estrés', 'emociones'],
    duracion: 14,
  },
  {
    titulo: 'Alimentos para Prevenir Enfermedades',
    descripcion: 'Descubre qué alimentos tienen propiedades curativas y cómo una buena alimentación puede prevenir enfermedades crónicas.',
    youtubeUrl: 'https://www.youtube.com/watch?v=lN-FrYKvPzg',
    categoria: 'Nutrición',
    tags: ['nutrición', 'prevención', 'alimentos saludables', 'salud'],
    duracion: 16,
  },
  {
    titulo: 'Caminar: El Mejor Ejercicio',
    descripcion: 'Beneficios de caminar diariamente, técnica correcta y consejos para aprovechar al máximo este simple pero poderoso ejercicio.',
    youtubeUrl: 'https://www.youtube.com/watch?v=aUaInS6HIGo',
    categoria: 'Ejercicio Físico',
    tags: ['caminar', 'ejercicio', 'salud cardiovascular', 'actividad física'],
    duracion: 10,
  },
  {
    titulo: 'Osteoporosis: Prevención y Tratamiento',
    descripcion: 'Cómo prevenir y tratar la osteoporosis con ejercicio, alimentación rica en calcio y vitamina D, y cuidados esenciales.',
    youtubeUrl: 'https://www.youtube.com/watch?v=MEqCZ8J7PqY',
    categoria: 'Salud Ósea',
    tags: ['osteoporosis', 'huesos', 'calcio', 'prevención'],
    duracion: 13,
  },
  {
    titulo: 'Técnicas de Relajación y Respiración',
    descripcion: 'Aprende técnicas de respiración y relajación para reducir el estrés, mejorar tu sueño y sentirte más tranquilo.',
    youtubeUrl: 'https://www.youtube.com/watch?v=w75lI3ktFyI',
    categoria: 'Salud Mental',
    tags: ['relajación', 'respiración', 'estrés', 'bienestar'],
    duracion: 12,
  },
  {
    titulo: 'Importancia de la Hidratación',
    descripcion: 'Por qué es vital tomar suficiente agua, cuánta cantidad necesitas según tu edad y cómo mantenerte bien hidratado.',
    youtubeUrl: 'https://www.youtube.com/watch?v=0GY-7Bupvyw',
    categoria: 'Nutrición',
    tags: ['hidratación', 'agua', 'salud', 'nutrición'],
    duracion: 8,
  },
  {
    titulo: 'Ejercicios de Equilibrio para Prevenir Caídas',
    descripcion: 'Rutina específica de ejercicios para mejorar tu equilibrio, coordinación y prevenir caídas en el hogar.',
    youtubeUrl: 'https://www.youtube.com/watch?v=2k93kVGJ8YA',
    categoria: 'Prevención',
    tags: ['equilibrio', 'prevención de caídas', 'ejercicio', 'seguridad'],
    duracion: 15,
  },
  {
    titulo: 'Dormir Bien: Consejos para un Sueño Reparador',
    descripcion: 'Estrategias probadas para mejorar la calidad de tu sueño, crear rutinas saludables y descansar profundamente.',
    youtubeUrl: 'https://www.youtube.com/watch?v=qwLOWPh0ej4',
    categoria: 'Salud Mental',
    tags: ['sueño', 'descanso', 'insomnio', 'salud'],
    duracion: 11,
  },
  {
    titulo: 'Vitaminas y Minerales Esenciales',
    descripcion: 'Guía completa sobre las vitaminas y minerales que necesitas, en qué alimentos encontrarlos y cuándo considerar suplementos.',
    youtubeUrl: 'https://www.youtube.com/watch?v=YQCXDwv9Ny4',
    categoria: 'Nutrición',
    tags: ['vitaminas', 'minerales', 'nutrición', 'suplementos'],
    duracion: 17,
  },
  {
    titulo: 'Gimnasia Cerebral para Adultos Mayores',
    descripcion: 'Ejercicios mentales y actividades para mantener tu mente activa, mejorar la memoria y prevenir el deterioro cognitivo.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KfZ86fcZ1Yg',
    categoria: 'Salud Mental',
    tags: ['memoria', 'ejercicio mental', 'cognición', 'tercera edad'],
    duracion: 14,
  },
];

// Función para extraer ID de video de YouTube
function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

// Función para generar URL de thumbnail de YouTube
function getYouTubeThumbnail(url: string): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) return '';
  // Usar hqdefault que es más confiable que maxresdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

async function seedClases() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Conectado a MongoDB');

    // Buscar o crear usuario Admin
    let admin = await User.findOne({ email: 'admin@saludfabi.com' });

    if (!admin) {
      console.log('👤 Creando usuario Admin...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);

      admin = await User.create({
        nombre: 'Admin',
        email: 'admin@saludfabi.com',
        cedula: '00000000',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Usuario Admin creado');
    } else {
      console.log('✅ Usuario Admin ya existe');
    }

    // Limpiar clases existentes para actualizar con videos en español
    const existingClases = await Clase.countDocuments();
    if (existingClases > 0) {
      console.log(`🗑️  Eliminando ${existingClases} clases antiguas...`);
      await Clase.deleteMany({});
      console.log('✅ Clases antiguas eliminadas');
    }

    // Crear clases
    console.log('📚 Creando 15 clases educativas...');

    for (const curso of YOUTUBE_COURSES) {
      await Clase.create({
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        autorId: admin._id,
        autorNombre: 'Admin',
        tipo: 'video',
        mediaUrl: curso.youtubeUrl,
        thumbnailUrl: getYouTubeThumbnail(curso.youtubeUrl),
        tags: curso.tags,
        categoria: curso.categoria,
        duracion: curso.duracion,
        visibility: 'publica',
      });

      console.log(`  ✓ ${curso.titulo}`);
    }

    console.log('\n✅ Seed completado exitosamente!');
    console.log(`📊 Total de clases creadas: ${YOUTUBE_COURSES.length}`);
    console.log('\n📋 Categorías:');
    const categorias = [...new Set(YOUTUBE_COURSES.map((c) => c.categoria))];
    categorias.forEach((cat) => {
      const count = YOUTUBE_COURSES.filter((c) => c.categoria === cat).length;
      console.log(`  • ${cat}: ${count} clases`);
    });

    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
}

// Ejecutar seed
seedClases();
