// src/components/ResumenLotesList.tsx
import styleLocal from "./ResumenLotesList.module.css";

import IconFumigadora from "../svg/IconFumigadora";

// Definimos la estructura exacta que arroja tu sentencia SQL
interface LoteResumen {
  lote: string;
  palmas_marcadas: number;
  palmas_revisadas: number;
}

interface ResumenLotesListProps {
  // Ponemos los datos semilla por defecto en caso de que no se envíen props
  lotesData?: LoteResumen[];
}

// Datos semilla (Mock Data) para pruebas visuales
const datosSemilla: LoteResumen[] = [
  { lote: "Lote A-1", palmas_marcadas: 15, palmas_revisadas: 12 },
  { lote: "Lote A-2", palmas_marcadas: 8, palmas_revisadas: 8 },
  
];

const ResumenLotesList = ({ lotesData = datosSemilla }: ResumenLotesListProps) => {
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