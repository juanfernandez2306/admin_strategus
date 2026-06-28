// src/hooks/useResumenLotes.ts
import { useState, useEffect } from "react";
import { useAuthStore } from "../components/login/hooks/useAuthStore";

import { URL_BACKEND } from "../maps/config/info";

interface LoteResumen {
  lote: string;
  palmas_marcadas: number;
  palmas_revisadas: number;
}

export const useResumenLotes = () => {
  const [lotesData, setLotesData] = useState<LoteResumen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  const cargarResumen = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const respuesta = await fetch(`${URL_BACKEND}/strategus/resumen-lotes`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const datos = await respuesta.json();

        if (!respuesta.ok || datos.statusCode !== 200) {
            throw new Error(datos.message || "Error al obtener el resumen.");
        }
      setLotesData(datos.data);

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta estrictamente CADA VEZ que el componente se monta
  useEffect(() => {
    cargarResumen();
  }, []);

  return { lotesData, loading, error, recargar: cargarResumen };
};