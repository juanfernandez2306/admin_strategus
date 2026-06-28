// src/hooks/useDescargarExcel.ts
import { useState } from "react";
import { useAuthStore } from "../components/login/hooks/useAuthStore"; // Ajusta la ruta según tu estructura
import { URL_BACKEND } from "../maps/config/info";

export const useDescargarExcel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  const descargarExcel = async (fechaInicio: string, fechaFin: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      // 1. Petición POST enviando los parámetros en el Body (JSON)
      const respuesta = await fetch(`${URL_BACKEND}/strategus/exportar/excel`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        }),
      });

      if (!respuesta.ok) {
        // Si el backend falla pero envía un JSON descriptivo, lo atrapamos
        try {
          const errorDatos = await respuesta.json();
          throw new Error(errorDatos.message || "Error al generar el reporte Excel.");
        } catch {
          throw new Error("Error en el servidor al procesar el archivo binario.");
        }
      }

      // 2. Convertimos el flujo de datos médicos del servidor a un Blob binario (.xlsx)
      const blob = await respuesta.blob();

      // 3. Crear el enlace temporal invisible para forzar la descarga en el navegador
      const urlDescarga = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlDescarga;
      
      // Nombre personalizado del archivo descargado
      link.setAttribute("download", `Reporte_Strategus_${fechaInicio}_al_${fechaFin}.xlsx`);
      
      document.body.appendChild(link);
      link.click(); // Forzamos el click de descarga

      // 4. Limpieza del DOM y liberación de memoria
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(urlDescarga);

      return "El archivo Excel se ha generado y descargado con éxito.";

    } catch (err) {
      const mensajeError = err instanceof Error ? err.message : String(err);
      setError(mensajeError);
      throw new Error(mensajeError); // Re-lanzamos para que FormBaseLayout pinte la alerta roja
    } finally {
      setLoading(false);
    }
  };

  return { descargarExcel, loading, error };
};