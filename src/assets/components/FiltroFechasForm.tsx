import FormBaseLayout from "./FormBaseLayout";
import style from "./FiltroFechasForm.module.css";

import { useDescargarExcel } from "../hooks/useDescargarExcel";
import { useFiltroFechas } from "../hooks/useFiltroFechas";

export default function FiltroFechasForm() {
  // Consumimos toda la lógica del nuevo custom hook
  const {
    fechaInicio,
    fechaFin,
    setFechaInicio,
    setFechaFin,
    reiniciarFechas,
    limites
  } = useFiltroFechas();

  const { descargarExcel } = useDescargarExcel();

  const handleExecute = async (): Promise<string> => {
    if (!fechaInicio || !fechaFin) {
      throw new Error("Ambas fechas son obligatorias.");
    }

    // Delegamos la descarga segura al servidor mediante el hook original
    return await descargarExcel(fechaInicio, fechaFin);
  };

  return (
    <FormBaseLayout
      titulo="Generar Archivo Excel"
      buttonText="Descargar Excel"
      onExecute={handleExecute}
      onSuccess={reiniciarFechas}
    >
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
            min={limites.inicio.min}
            max={limites.inicio.max}
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
            min={limites.fin.min}
            max={limites.fin.max}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className={style.btnResetear}
          onClick={reiniciarFechas}
          disabled={!fechaInicio && !fechaFin} // Se deshabilita si ambos inputs están vacíos
        >
          Limpiar Campos
        </button>

      </div>
    </FormBaseLayout>
  );
}