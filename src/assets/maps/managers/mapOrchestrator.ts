// mapOrchestrator.ts
import { type Map as MapLibreMap } from 'maplibre-gl';
import type { FeatureCollection, Point, Feature } from 'geojson';

// Importamos los tipos necesarios de tu configuración
import { type SidebarData, type RespuestaGeoJsonSidebarData } from '../config/types';

import { inicializarMapa } from '../services/instanciarMapa';
import { configurarCapasBase as configurarInfraestructura } from '../services/capasVectorTilesMapa';
import { configurarClusteresEnMapa } from '../services/capaClusteres'; 

/**
 * 🌟 CONSULTA PURA A LA API REST:
 * Realiza el fetch de datos externos y construye la colección GeoJSON de manera NATIVA
 */
export const obtenerDatosApiGeoJson = async (): Promise<RespuestaGeoJsonSidebarData> => {
    try {
        const respuestaApi = await fetch('https://tu-api.com/api/puntos');
        
        if (!respuestaApi.ok) {
            throw new Error(`Error HTTP en el servidor: ${respuestaApi.status}`);
        }

        const datos: SidebarData[] = await respuestaApi.json();

        // Si no hay datos, creamos el FeatureCollection vacío de forma nativa
        if (!datos || datos.length === 0) {
            return { 
                data: {
                    type: "FeatureCollection",
                    features: []
                }, 
                message: "No hay datos disponibles en la API", 
                success: true 
            };
        }

        // Mapeo nativo a objetos Feature<Point> respetando la especificación GeoJSON
        const puntos: Feature<Point>[] = datos.map(punto => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [punto.lng, punto.lat] // GeoJSON siempre usa [Longitud, Latitud]
            },
            properties: {
                uuid: punto.uuid, 
                revision_planta: punto.revision_planta 
            }
        }));

        // Construimos el FeatureCollection final
        const geojsonFinal: FeatureCollection<Point> = {
            type: "FeatureCollection",
            features: puntos
        };

        return { data: geojsonFinal, message: "Datos de API cargados con éxito", success: true };
    } catch (error) {
        console.error("Error al consultar la API externa:", error);
        return { 
            data: {
                type: "FeatureCollection",
                features: []
            }, 
            message: error instanceof Error ? error.message : "Error de conexión de red", 
            success: false 
        };
    }
};

/**
 * Orquestador Secuencial Puro de Visualización Única
 */
export const iniciarServicioMapa = (contenedor: HTMLDivElement): Promise<MapLibreMap> => {
    return new Promise((resolve, reject) => {
        const map = inicializarMapa(contenedor);
        let mapaRemovido = false;

        map.on('load', async () => {
            console.log("Orquestador: Mapa cargado. Iniciando pipeline de visualización API...");
            if (mapaRemovido) return;
            
            try {
                const [respuestaApi] = await Promise.all([
                    obtenerDatosApiGeoJson(),
                    configurarInfraestructura(map)
                ]);

                if (mapaRemovido) return;

                configurarClusteresEnMapa(map, respuestaApi, () => {});

                console.log("Orquestador: ¡Pipeline completado con éxito! Mapa listo para visualización.");
                resolve(map);

            } catch (error) {
                console.error("Orquestador: Fallo crítico al inicializar el pipeline de datos:", error);
                reject(error);
            }
        });

        map.on('remove', () => {
            mapaRemovido = true;
            console.log("Orquestador: Instancia desmontada del DOM de manera segura.");
        });
    });
};