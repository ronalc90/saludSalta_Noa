/**
 * Utilidades para WebAuthn/FIDO2
 * Maneja registro y autenticación biométrica
 */

import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from '@simplewebauthn/types';

/**
 * Verifica si WebAuthn está soportado en el navegador
 */
export const isWebAuthnSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.PublicKeyCredential !== undefined &&
    typeof window.PublicKeyCredential === 'function'
  );
};

/**
 * Verifica si la autenticación de plataforma (biométrica) está disponible
 */
export const isPlatformAuthenticatorAvailable = async (): Promise<boolean> => {
  if (!isWebAuthnSupported()) return false;

  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

/**
 * Registra una nueva credencial WebAuthn
 */
export const registerWebAuthn = async (
  options: PublicKeyCredentialCreationOptionsJSON
): Promise<RegistrationResponseJSON> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn no está soportado en este navegador');
  }

  try {
    const credential = await startRegistration(options);
    return credential;
  } catch (error: any) {
    console.error('Error en registro WebAuthn:', error);

    // Manejar errores comunes
    if (error.name === 'NotAllowedError') {
      throw new Error('El registro fue cancelado o no se pudo completar');
    } else if (error.name === 'InvalidStateError') {
      throw new Error('Esta credencial ya está registrada');
    } else {
      throw new Error('Error al registrar credencial biométrica: ' + error.message);
    }
  }
};

/**
 * Autentica usando una credencial WebAuthn existente
 */
export const authenticateWebAuthn = async (
  options: PublicKeyCredentialRequestOptionsJSON
): Promise<AuthenticationResponseJSON> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn no está soportado en este navegador');
  }

  try {
    const credential = await startAuthentication(options);
    return credential;
  } catch (error: any) {
    console.error('Error en autenticación WebAuthn:', error);

    // Manejar errores comunes
    if (error.name === 'NotAllowedError') {
      throw new Error('La autenticación fue cancelada');
    } else if (error.name === 'InvalidStateError') {
      throw new Error('No se encontraron credenciales registradas');
    } else {
      throw new Error('Error al autenticar: ' + error.message);
    }
  }
};

/**
 * Obtiene información sobre las capacidades del dispositivo
 */
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let deviceType = 'unknown';

  if (/mobile/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet/i.test(ua)) {
    deviceType = 'tablet';
  } else {
    deviceType = 'desktop';
  }

  return {
    deviceType,
    userAgent: ua,
    platform: navigator.platform,
  };
};
