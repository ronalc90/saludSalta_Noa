/**
 * Modelo de Clase
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IClase extends Document {
  titulo: string;
  descripcion: string;
  autorId: mongoose.Types.ObjectId;
  autorNombre?: string;
  tipo: 'video' | 'pdf' | 'articulo';
  mediaUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  categoria: string;
  duracion?: number;
  visibility: 'publica' | 'privada';
  createdAt: Date;
  updatedAt: Date;
}

const ClaseSchema = new Schema<IClase>(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    autorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    autorNombre: String,
    tipo: {
      type: String,
      enum: ['video', 'pdf', 'articulo'],
      required: true,
    },
    mediaUrl: String,
    thumbnailUrl: String,
    tags: [String],
    categoria: {
      type: String,
      required: true,
    },
    duracion: Number,
    visibility: {
      type: String,
      enum: ['publica', 'privada'],
      default: 'publica',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IClase>('Clase', ClaseSchema);
