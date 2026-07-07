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

import type { FilterSpecification } from "maplibre-gl";

export interface OpcionesCapaLinea {
    id: string;
    nombreCapa: keyof ConfigVector['capas'];
    /** Soporta un color string plano (ej: '#1A312C') o una expresión dinámica de MapLibre (ej: ['step', ...]) */
    colorHex: any; 
    grosorMinimoDetalle: number;
    grosorMaximoDetalle?: number | null;
    configVector: ConfigVector;
    dashArray?: number[] | null;
    minzoom?: number | null;
    maxzoom?: number | null;
    filter?: FilterSpecification | null;
    zoomMinimoDetalle?: number;     
    zoomMaximoDetalle?: number;
}

export interface OpcionesCapaPunto {
    id: string;
    nombreCapa: keyof ConfigVector['capas'];
    colorHex: string;
    configVector: ConfigVector;
    filter?: FilterSpecification | null;
    minzoom: number;
    maxzoom?: number | null;
    /** Radio del punto en la vista lejana (Mínimo detalle del elemento, por defecto zoom 15) */
    radioMinimoDetalle?: number;
    /** Radio del punto en la vista a ras de suelo (Máximo detalle del elemento, por defecto zoom 19) */
    radioMaximoDetalle?: number;
    /** Nivel de zoom de inicio para calcular el tamaño (Por defecto 15) */
    zoomMinimoDetalle?: number;
    /** Nivel de zoom de fin para calcular el tamaño (Por defecto 19) */
    zoomMaximoDetalle?: number;
}

interface BaseOpcionesEtiqueta {
    id: string;
    nombreCapa: keyof ConfigVector['capas'];
    configVector: ConfigVector;
    filter?: FilterSpecification | null;
    minzoom?: number | null;
    maxzoom?: number | null;
    tamanoMinimoDetalle?: number;
    tamanoMaximoDetalle?: number;
    zoomMinimoDetalle?: number;
    zoomMaximoDetalle?: number;
    textoEstatico?: string | null;
    campoContenedorTexto?: string | null;
}

/** 1. Responsabilidad: Textos flotantes sobre geometrías puntuales */
export interface OpcionesEtiquetaPunto extends BaseOpcionesEtiqueta {
    desplazamientoTexto?: [number, number];
    anclajeTexto?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/** 2. Responsabilidad: Textos y simbologías continuas a lo largo de un eje */
export interface OpcionesEtiquetaLinea extends BaseOpcionesEtiqueta {
    espaciadoSimbologia?: number;
    textOffset?: [number, number];
}

/** 3. Responsabilidad: Textos contenidos dentro de áreas cerradas con wrap automático */
export interface OpcionesEtiquetaPoligono extends BaseOpcionesEtiqueta {
    caracteresWrap?: number;
}

export interface OpcionesCapaPoligono {
    id: string;
    nombreCapa: keyof ConfigVector['capas'];
    /** Soporta color estático plano (ej: '#E8F5E9') o expresiones dinámicas nativas de MapLibre */
    colorFill: any; 
    configVector: ConfigVector;
    filter?: FilterSpecification | null;
    minzoom?: number | null;
    maxzoom?: number | null;
    /** Opacidad del relleno entre 0.0 y 1.0 (Por defecto 0.5) */
    opacidadFill?: number;
}

export interface OpcionesEtiquetaPuntoPersonalizada {
    id: string;
    coordenadas: [number, number]; // [longitud, latitud]
    texto: string;
    minzoom: number;
    maxzoom?: number;
    rotacion: number; // El ángulo exacto en grados para orientar la 'V'
    desplazamiento?: [number, number];
}