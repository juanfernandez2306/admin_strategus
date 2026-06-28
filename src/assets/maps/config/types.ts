import type { FeatureCollection, Point } from 'geojson';

export type SidebarData = {
  uuid: string;
  lat: number;
  lng: number;
  revision_planta: boolean;
}


/**
 * Contrato de respuesta para operaciones que devuelven datos en formato GeoJSON.
 */
export type RespuestaGeoJsonSidebarData  = {
    data: FeatureCollection<Point>;
    message: string;
    success: boolean;
}

export interface ConfigVector {
    centroInicial: [number, number];
    zoomInicial: number;
    minZoom: number;
    maxZoom: number;
    maxZoomSource: number;
    tilesURL: string;
    capas: {
        relieve: string;
        lotes: string;
        palmas: string;
        postes: string;
        aspersores: string;
        cercas_divisorias: string;
        vialidad_principal: string;
        tendido_electrico: string;
    };
    limitesPantalla: [number, number, number, number];
}

export interface InfoFincaEstructura {
    nombre: string;
    razonSocial: string;
    rif: string;
    estado: string;
    municipio: string;
    parroquia: string;
    configVector: ConfigVector;
    configMap: {
        centroInicial: [number, number];
        zoomInicial: number;
        minZoom: number;
        maxZoom: number;
        maxBounds: [number, number, number, number];
    };
}