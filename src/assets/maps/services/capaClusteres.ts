// capaClusteres.ts
import { type Map as MapLibreMap } from 'maplibre-gl';
import { type RespuestaGeoJsonSidebarData } from '../config/types';

export const configurarClusteresEnMapa = (
    map: MapLibreMap, 
    respuesta: RespuestaGeoJsonSidebarData,
    _onPointClick?: () => void // 💡 Lo dejamos opcional y sin uso para no romper firmas de métodos antiguos
) => {
    if (!respuesta.success || !respuesta.data) return;

    const SOURCE_ID = 'puntos-source';
    const LAYER_ID = 'unclustered-point';
    const CLUSTER_LAYER = 'clusters';
    const COUNT_LAYER = 'cluster-count';

    // 1. GESTIÓN DE LA FUENTE (Source)
    const sourceExistente = map.getSource(SOURCE_ID) as any;
    if (sourceExistente) {
        sourceExistente.setData(respuesta.data);
        return;
    }

    map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: respuesta.data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    // 2. CAPA DE CLÚSTERES (Círculos de agrupación)
    map.addLayer({
        id: CLUSTER_LAYER,
        type: 'circle',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
    });

    // 3. CAPA DE CONTEO (Texto sobre el clúster)
    map.addLayer({
        id: COUNT_LAYER,
        type: 'symbol',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    // 4. CAPA DE PUNTOS INDIVIDUALES (Simbología por defecto cuando no hay agrupación)
    map.addLayer({
        id: LAYER_ID,
        type: 'circle',
        source: SOURCE_ID,
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': ['case', ['get', 'revision_planta'], '#06D001', '#DD0303'],
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    });

    // 5. COMPORTAMIENTO PASIVO AL PASAR POR CLÚSTERES (Hacer zoom nativo al clickear un grupo)
    map.on('click', CLUSTER_LAYER, async (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: [CLUSTER_LAYER] });
        const clusterId = features[0].properties.cluster_id;
        
        const source = map.getSource(SOURCE_ID) as any;
        try {
            const zoom = await source.getClusterExpansionZoom(clusterId);
            const coordinates = (features[0].geometry as any).coordinates;
            map.easeTo({
                center: coordinates,
                zoom: zoom
            });
        } catch (err) {
            console.error("Error al expandir clúster:", err);
        }
    });

    // Gestión básica del cursor sobre los clústeres
    map.on('mouseenter', CLUSTER_LAYER, () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', CLUSTER_LAYER, () => {
        map.getCanvas().style.cursor = '';
    });
};