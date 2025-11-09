/**
 * Controlador de usuarios
 */

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, profile } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nombre, profile },
      { new: true, runValidators: true }
    );

    res.json({ user, message: 'Perfil actualizado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
