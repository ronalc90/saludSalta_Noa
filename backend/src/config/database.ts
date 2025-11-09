/**
 * Configuración de conexión a MongoDB
 */

import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fabi_bd';

    await mongoose.connect(MONGODB_URI);

    console.log('✅ Conexión exitosa a MongoDB');
    console.log(`📦 Base de datos: ${mongoose.connection.name}`);

    mongoose.connection.on('error', (error) => {
      console.error('❌ Error de MongoDB:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB desconectado');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Conexión a MongoDB cerrada');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    throw error;
  }
};
