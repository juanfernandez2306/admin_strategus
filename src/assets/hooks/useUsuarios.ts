// src/hooks/useUsuarios.ts
import { useState, useEffect } from "react";
import { useAuthStore } from "../components/login/hooks/useAuthStore";
import { URL_BACKEND } from "../maps/config/info";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  rol: string;
}

export const useUsuarios = () => {
  const [usuariosData, setUsuariosData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BACKEND}/usuarios`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const datos = await respuesta.json();

      // Validamos con tu estándar de statusCode
      if (!datos.success) {
        throw new Error(datos.message || "Error al obtener la lista de usuarios.");
      }

      setUsuariosData(datos.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return { usuariosData, loading, error, recargar: cargarUsuarios };
};