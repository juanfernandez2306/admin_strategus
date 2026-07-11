// useForm.ts
import { useState } from "react";
import { validadores, type ErroresFormulario } from "../validatorsLogin";


interface ValoresFormulario {
  email: string;
  password:  string;
}

export const useFormValidators = (valoresIniciales: ValoresFormulario) => {
  const [valores, setValores] = useState<ValoresFormulario>(valoresIniciales);
  const [errores, setErrores] = useState<ErroresFormulario>({});

  // Maneja el cambio de cualquier input y limpia su error en tiempo real
  const handleChange = (campo: keyof ValoresFormulario, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
    
    // Si existía un error para este campo, lo limpiamos al escribir
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: "" }));
    }
  };

  // Ejecuta las validaciones basándose en las estrategias de validators.ts
  const validarFormulario = (): boolean => {
    const nuevosErrores: ErroresFormulario = {};
    
    // Ejecutamos dinámicamente cada validador asignado
    nuevosErrores.email = validadores.email(valores.email);
    nuevosErrores.password = validadores.password(valores.password);

    // Filtramos los mensajes vacíos para saber si realmente hay errores
    const tieneErrores = Object.values(nuevosErrores).some((msg) => msg !== "");

    if (tieneErrores) {
      // Limpiamos las claves que no tengan errores reales
      const erroresFiltrados = Object.fromEntries(
        Object.entries(nuevosErrores).filter(([_, msg]) => msg !== "")
      );
      setErrores(erroresFiltrados);
      return false;
    }

    setErrores({});
    return true;
  };

  return {
    valores,
    errores,
    handleChange,
    validarFormulario,
  };
};