// useMapa.ts
import { useRef, useCallback } from 'react';
import { type Map as MapLibreMap } from 'maplibre-gl';
import { iniciarServicioMapa } from '../managers/mapOrchestrator';

/**
 * Hook optimizado únicamente para inicializar la visualización base del mapa.
 */
export const useMapa = () => {
    const mapRef = useRef<MapLibreMap | null>(null);

    const inicializarMapa = useCallback(async (contenedor: HTMLDivElement) => {
        if (mapRef.current) return;

        try {
            // El orquestador se encargará de levantar la API y las capas vectoriales sin callbacks de click
            const mapa = await iniciarServicioMapa(contenedor);
            mapRef.current = mapa;
            return mapa;
        } catch (error) {
            console.error("Error al inicializar el servicio de mapas:", error);
        }
    }, []);

    return { 
        inicializarMapa,
        mapRef
    };
};