// validators.ts

export interface ErroresFormulario {
  email?: string;
  password?: string;
}

// Estrategia de validación por campo
export const validadores = {
  email: (valor: string): string => {

    if (!valor.trim()) return "El correo electrónico es obligatorio.";

    if (/\s/.test(valor)) {
      return "El correo electrónico no puede contener espacios en blanco.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) return "Por favor, introduce un correo válido.";

    return "";
  },
  
  password: (valor: string): string => {
    if (!valor) return "La contraseña es obligatoria.";

    if (/\s/.test(valor)) {
      return "La contraseña no puede contener espacios en blanco.";
    }

    if (valor.length < 6) return "La contraseña debe tener al menos 6 caracteres.";

    const tieneEspecialRegex = /[^A-Za-z0-9]/;
    if (!tieneEspecialRegex.test(valor)) {
        return "La contraseña debe incluir al menos un carácter especial (ej. @, #, $, !, %).";
    }


    return "";
  }

};