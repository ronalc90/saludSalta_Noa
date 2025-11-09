/**
 * Modelo de IMCRegistro
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IIMCRegistro extends Document {
  userId: mongoose.Types.ObjectId;
  pesoKg: number;
  alturaCm: number;
  imc: number;
  categoria: string;
  recomendaciones: string[];
  fecha: Date;
}

const IMCRegistroSchema = new Schema<IIMCRegistro>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  pesoKg: {
    type: Number,
    required: true,
  },
  alturaCm: {
    type: Number,
    required: true,
  },
  imc: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  recomendaciones: [String],
  fecha: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IIMCRegistro>('IMCRegistro', IMCRegistroSchema);
