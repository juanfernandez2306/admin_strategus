// src/components/ResumenLotesList.tsx
import styleLocal from "./ResumenLotesList.module.css";

import IconFumigadora from "../svg/IconFumigadora";

import { useResumenLotes } from "../hooks/useResumenLotes";


const ResumenLotesList = () => {

  const { lotesData, loading, error } = useResumenLotes();

  console.log(lotesData)

  if (loading) return <p className={styleLocal.sinDatos}>Cargando resumen de lotes...</p>;
  if (error) return <p className={styleLocal.errorText}>Error: {error}</p>;

  return (
    <div className={styleLocal.contenedorLotes}>
        <IconFumigadora width={200} height={100} className={styleLocal.svg} />

        <h3 className={styleLocal.tituloSeccion}>RESUMEN POR LOTES</h3>
      
      {lotesData.length === 0 ? (
        <p className={styleLocal.sinDatos}>No hay registros el día de hoy.</p>
      ) : (
        lotesData.map((item, index) => (
          <div key={index} className={styleLocal.tarjetaLote}>
            
            {/* Identificador del Lote */}
            <div className={styleLocal.encabezadoLote}>
              <span className={styleLocal.tagLote}>LOTE</span>
              <h4 className={styleLocal.nombreLote}>{item.lote}</h4>
            </div>

            {/* Grid de conteos */}
            <div className={styleLocal.filaConteos}>
              
              {/* Columna: Marcadas */}
              <div className={styleLocal.columnaConteo}>
                <p className={styleLocal.etiquetaCorta}>MARCADAS</p>
                <h3 className={styleLocal.numeroGrande}>
                  {item.palmas_marcadas}
                </h3>
              </div>

              {/* Columna: Revisadas */}
              <div className={styleLocal.columnaConteo}>
                <p className={styleLocal.etiquetaCorta}>REVISADAS</p>
                <h3 className={`${styleLocal.numeroGrande} ${styleLocal.numeroRevisados}`}>
                  {item.palmas_revisadas}
                </h3>
              </div>

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default ResumenLotesList;