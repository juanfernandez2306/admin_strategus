import { useState } from "react";
import dayjs from "dayjs";

export function useFiltroFechas() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Usamos Day.js para obtener la fecha local actual en formato YYYY-MM-DD
  const hoy = dayjs().format("YYYY-MM-DD");
  const limiteMinimoAbsoluto = "2026-01-01";

  // --- LÓGICA DE LÍMITES PARA FECHA INICIO ---
  let minFechaInicio = limiteMinimoAbsoluto;
  let maxFechaInicio = hoy;

  if (fechaFin) {
    // Si hay fecha fin, restamos 2 meses exactos localmente
    const haceDosMeses = dayjs(fechaFin).subtract(2, "month").format("YYYY-MM-DD");
    
    minFechaInicio = haceDosMeses > limiteMinimoAbsoluto ? haceDosMeses : limiteMinimoAbsoluto;
    maxFechaInicio = fechaFin;
  }

  // --- LÓGICA DE LÍMITES PARA FECHA FIN ---
  let minFechaFin = limiteMinimoAbsoluto;
  let maxFechaFin = hoy;

  if (fechaInicio) {
    // Si hay fecha inicio, sumamos 2 meses exactos localmente
    minFechaFin = fechaInicio;
    const enDosMeses = dayjs(fechaInicio).add(2, "month").format("YYYY-MM-DD");
    
    maxFechaFin = enDosMeses < hoy ? enDosMeses : hoy;
  }

  const reiniciarFechas = () => {
    setFechaInicio("");
    setFechaFin("");
  };

  return {
    fechaInicio,
    fechaFin,
    setFechaInicio,
    setFechaFin,
    reiniciarFechas,
    limites: {
      inicio: { min: minFechaInicio, max: maxFechaInicio },
      fin: { min: minFechaFin, max: maxFechaFin }
    }
  };
}