// src/components/ResumenLotesList.tsx
import styleLocal from "./ResumenLotesList.module.css";

import IconFumigadora from "../svg/IconFumigadora";
import { useResumenLotes } from "../hooks/useResumenLotes";
import { CardSuccess } from "./usuarios/CardSuccess";
import { CardLoading } from "./usuarios/CardLoading";
import { CardError } from "./usuarios/CardError";
import { RegistroSemanalChart } from "./graficos/RegistroSemanalChart";

const ResumenLotesList = () => {
  const { lotesData, loading, error } = useResumenLotes();

  if (loading) return <CardLoading mensaje="Cargando resumen de lotes..." />;
  if (error) return <CardError mensaje={error} />;

  return (
    <div className={styleLocal.contenedorLotes}>
      
      <IconFumigadora width={200} height={100} className={styleLocal.svg} />

      <h3 className={styleLocal.tituloSeccion}>RESUMEN POR LOTES</h3>
      
      {/* 1. LISTADO DINÁMICO DE LOTES (Primero) */}
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

      {/* Espaciador decorativo entre la lista de lotes y el gráfico */}
      <div style={{ height: '0.5rem', width: '100%' }} />

      {/* 2. GRÁFICO DE REGISTRO SEMANAL (Al final) */}
      <RegistroSemanalChart />
    </div>
  );
};

export default ResumenLotesList;