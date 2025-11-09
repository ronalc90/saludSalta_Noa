/**
 * Script de seed para datos iniciales
 * Crea usuarios de ejemplo y clases de demostración
 */

import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User';
import Clase from '../models/Clase';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fabi_bd';

const seedData = async () => {
  try {
    console.log('🌱 Iniciando seed de datos...');

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes (opcional - comentar en producción)
    await User.deleteMany({});
    await Clase.deleteMany({});
    console.log('🗑️  Base de datos limpiada');

    // Crear usuarios de ejemplo
    const passwordHash = await bcrypt.hash('password123', 10);

    const usuarios = await User.create([
      {
        nombre: 'Admin Fabi',
        email: 'admin@saludfabi.com',
        password: passwordHash,
        role: 'admin',
        profile: {
          ciudad: 'Salta',
          provincia: 'Salta',
        },
      },
      {
        nombre: 'Dr. Juan Pérez',
        email: 'docente@saludfabi.com',
        password: passwordHash,
        role: 'docente',
        profile: {
          ciudad: 'Salta',
          provincia: 'Salta',
        },
      },
      {
        nombre: 'María González',
        email: 'usuario@saludfabi.com',
        password: passwordHash,
        role: 'usuario',
        profile: {
          edad: 65,
          genero: 'femenino',
          ciudad: 'Salta',
          provincia: 'Salta',
        },
      },
    ]);

    console.log(`✅ ${usuarios.length} usuarios creados`);

    // Crear clases de ejemplo
    const docente = usuarios.find((u) => u.role === 'docente');

    const clases = await Clase.create([
      {
        titulo: 'Introducción a la Alimentación Saludable',
        descripcion:
          'Aprenda los fundamentos de una dieta balanceada adaptada para personas mayores. Incluye consejos prácticos y recetas fáciles.',
        autorId: docente?._id,
        autorNombre: docente?.nombre,
        tipo: 'video',
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/400x225?text=Alimentacion+Saludable',
        tags: ['nutrición', 'alimentación', 'salud'],
        categoria: 'Nutrición',
        duracion: 25,
        visibility: 'publica',
      },
      {
        titulo: 'Ejercicios de Bajo Impacto para Adultos Mayores',
        descripcion:
          'Rutina de ejercicios suaves diseñada especialmente para mantener la movilidad y fortalecer músculos sin riesgo de lesiones.',
        autorId: docente?._id,
        autorNombre: docente?.nombre,
        tipo: 'video',
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/400x225?text=Ejercicios',
        tags: ['ejercicio', 'movilidad', 'fitness'],
        categoria: 'Actividad Física',
        duracion: 30,
        visibility: 'publica',
      },
      {
        titulo: 'Manejo del Estrés y Bienestar Emocional',
        descripcion:
          'Técnicas de relajación y manejo del estrés adaptadas para personas mayores. Incluye ejercicios de respiración y meditación guiada.',
        autorId: docente?._id,
        autorNombre: docente?.nombre,
        tipo: 'video',
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/400x225?text=Bienestar+Emocional',
        tags: ['salud mental', 'estrés', 'relajación'],
        categoria: 'Bienestar Mental',
        duracion: 20,
        visibility: 'publica',
      },
      {
        titulo: 'Prevención de Enfermedades Cardiovasculares',
        descripcion:
          'Información esencial sobre cómo prevenir y manejar enfermedades del corazón. Incluye señales de alerta y hábitos saludables.',
        autorId: docente?._id,
        autorNombre: docente?.nombre,
        tipo: 'articulo',
        tags: ['cardiovascular', 'prevención', 'corazón'],
        categoria: 'Prevención',
        visibility: 'publica',
      },
      {
        titulo: 'Cuidado de la Diabetes en Adultos Mayores',
        descripcion:
          'Guía completa sobre el manejo de diabetes tipo 2, incluyendo alimentación, ejercicio y control de glucosa.',
        autorId: docente?._id,
        autorNombre: docente?.nombre,
        tipo: 'pdf',
        mediaUrl: 'https://example.com/diabetes-guide.pdf',
        thumbnailUrl: 'https://via.placeholder.com/400x225?text=Diabetes',
        tags: ['diabetes', 'glucosa', 'cuidado'],
        categoria: 'Enfermedades Crónicas',
        visibility: 'publica',
      },
    ]);

    console.log(`✅ ${clases.length} clases creadas`);

    console.log('\n📊 Datos de acceso:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 ADMIN:');
    console.log('   Email: admin@saludfabi.com');
    console.log('   Password: password123');
    console.log('\n👨‍🏫 DOCENTE:');
    console.log('   Email: docente@saludfabi.com');
    console.log('   Password: password123');
    console.log('\n👥 USUARIO:');
    console.log('   Email: usuario@saludfabi.com');
    console.log('   Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error en seed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
};

// Ejecutar seed
seedData()
  .then(() => {
    console.log('👋 Seed finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
