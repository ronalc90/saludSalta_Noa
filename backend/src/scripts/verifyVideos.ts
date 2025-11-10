/**
 * Script para verificar los videos cargados
 * Ejecutar con: npx tsx src/scripts/verifyVideos.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Clase from '../models/Clase';

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function verifyVideos() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Conectado a MongoDB\n');

    // Obtener todas las clases
    const clases = await Clase.find({}).sort({ categoria: 1, titulo: 1 });

    console.log(`📊 Total de clases en la base de datos: ${clases.length}\n`);

    // Agrupar por categoría
    const categorias: Record<string, any[]> = {};
    clases.forEach(clase => {
      if (!categorias[clase.categoria]) {
        categorias[clase.categoria] = [];
      }
      categorias[clase.categoria].push(clase);
    });

    // Mostrar estadísticas por categoría
    console.log('📁 Clases por categoría:');
    Object.keys(categorias).sort().forEach(categoria => {
      console.log(`\n  📌 ${categoria}: ${categorias[categoria].length} videos`);
      categorias[categoria].forEach((clase, index) => {
        console.log(`     ${index + 1}. ${clase.titulo} (${clase.duracion || 0} min)`);
      });
    });

    console.log('\n📋 Resumen:');
    console.log(`  Total de categorías: ${Object.keys(categorias).length}`);
    console.log(`  Total de videos: ${clases.length}`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
verifyVideos();
