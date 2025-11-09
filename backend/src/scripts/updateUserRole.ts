/**
 * Script para actualizar el rol de un usuario
 * Uso: npx tsx src/scripts/updateUserRole.ts <email> <rol>
 */

import mongoose from 'mongoose';
import User from '../models/User';

const updateUserRole = async () => {
  try {
    const email = process.argv[2];
    const newRole = process.argv[3];

    if (!email || !newRole) {
      console.log('Uso: npx tsx src/scripts/updateUserRole.ts <email> <rol>');
      console.log('Roles válidos: usuario, docente, admin');
      process.exit(1);
    }

    if (!['usuario', 'docente', 'admin'].includes(newRole)) {
      console.log('Rol inválido. Roles válidos: usuario, docente, admin');
      process.exit(1);
    }

    // Conectar a MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fabi_bd';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`❌ No se encontró usuario con email: ${email}`);
      process.exit(1);
    }

    console.log(`Usuario encontrado: ${user.nombre} (${user.email})`);
    console.log(`Rol actual: ${user.role}`);

    // Actualizar rol
    user.role = newRole as 'usuario' | 'docente' | 'admin';
    await user.save();

    console.log(`✅ Rol actualizado a: ${newRole}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateUserRole();
