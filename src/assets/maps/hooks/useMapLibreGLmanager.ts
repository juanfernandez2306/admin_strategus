// useMapLibreGLmanager.ts
import { useRef, useEffect } from 'react';
import { useMapa } from './useMapa';
import "maplibre-gl/dist/maplibre-gl.css";

export const useMapLibreGLmanager = () => {
    const mapDivRef = useRef<HTMLDivElement>(null);
    const instanciaMapaLocalRef = useRef<any>(null);

    // Mantenemos los estados globales de salud del sistema por si falla la API o los Tiles
    

    // useMapa ya no requiere pasarle un callback "onPointClick" de manera obligatoria
    const { inicializarMapa } = useMapa();

    useEffect(() => {
        let componenteMontado = true;

        const montarSistema = async () => {
            if (!mapDivRef.current) return;

            // Invoca al inicializador puro
            const mapa = await inicializarMapa(mapDivRef.current);

            if (!componenteMontado) {
                mapa?.remove();
                return;
            }

            if (mapa) {
                instanciaMapaLocalRef.current = mapa;
            }
        };

        montarSistema();

        return () => {
            componenteMontado = false;

            if (instanciaMapaLocalRef.current) {
                console.log("Desmontando mapa: Limpieza de memoria de visualización pura...");
                instanciaMapaLocalRef.current.remove();
                instanciaMapaLocalRef.current = null;
            }
        };
    }, [inicializarMapa]);

    return {
        mapDivRef
    };
};