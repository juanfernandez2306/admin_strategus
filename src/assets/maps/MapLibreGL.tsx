// MapLibreGL.tsx
import { useMapLibreGLmanager } from './hooks/useMapLibreGLmanager';
import styles from './MapLibreGL.module.css';

export const MapLibreGL = () => {
    // Extraemos únicamente lo necesario para renderizar la pantalla estática de visualización
    const { 
        mapDivRef
    } = useMapLibreGLmanager();

    return (
        <main className={styles.screenContainer}>
            {/* Contenedor del Canvas donde MapLibre montará el mapa de forma nativa */}
            <div 
                ref={mapDivRef} 
                className={styles.mapCanvas} 
            />
        </main>
    );
};