import { useState } from "react";
import FormBaseLayout from "./FormBaseLayout";
import style from "./FiltroFechasForm.module.css";

export default function FiltroFechasForm() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Esta función envuelve la lógica para cumplir con el contrato de FormBaseLayout
  const handleExecute = async (): Promise<string> => {
    if (!fechaInicio || !fechaFin) {
      throw new Error("Ambas fechas son obligatorias.");
    }

    if (new Date(fechaFin) < new Date(fechaInicio)) {
      throw new Error("La fecha de fin no puede ser menor a la fecha de inicio.");
    }

    return "hola";

  };

  return (
    <FormBaseLayout
      titulo="Generar Archivo Excel"
      buttonText="Descargar Excel"
      onExecute={handleExecute}
    >
      {/* Contenedor interno para los campos de fecha */}
      <div className={style.camposContainer}>
        
        {/* Campo: Fecha de Inicio */}
        <div className={style.controlForm}>
          <label htmlFor="fechaInicio" className={style.label}>
            Fecha Desde
          </label>
          <input
            type="date"
            id="fechaInicio"
            className={style.inputDate}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        {/* Campo: Fecha Fin */}
        <div className={style.controlForm}>
          <label htmlFor="fechaFin" className={style.label}>
            Fecha Hasta
          </label>
          <input
            type="date"
            id="fechaFin"
            className={style.inputDate}
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

      </div>
    </FormBaseLayout>
  );
}