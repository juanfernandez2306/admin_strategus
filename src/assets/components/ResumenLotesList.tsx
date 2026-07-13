// src/components/ResumenLotesList.tsx
import styleLocal from "./ResumenLotesList.module.css";

import IconFumigadora from "../svg/IconFumigadora";

import { useResumenLotes } from "../hooks/useResumenLotes";

import { CardSuccess } from "./usuarios/CardSuccess";

import { CardLoading } from "./usuarios/CardLoading";


const ResumenLotesList = () => {

  const { lotesData, loading, error } = useResumenLotes();

  if (loading) return <CardLoading mensaje="Cargando resumen de lotes..." />;
  if (error) return <p className={styleLocal.errorText}>Error: {error}</p>;

  return (
    <div className={styleLocal.contenedorLotes}>
        <IconFumigadora width={200} height={100} className={styleLocal.svg} />

        <h3 className={styleLocal.tituloSeccion}>RESUMEN POR LOTES</h3>
      
      {lotesData.length === 0 ? (
        <CardSuccess 
          mensaje="No hay registros el día de hoy."
        />
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