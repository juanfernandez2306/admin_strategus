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

            <article className={styles.legendContainer}>
                <h3 className={styles.legendTitle}>Palmas</h3>
                
                <section className={styles.legendRow}>
                    <span className={`${styles.indicator} ${styles.palmaRevisada}`} />
                    <span className={styles.legendText}>Revisadas</span>
                </section>

                <section className={styles.legendRow}>
                    <span className={`${styles.indicator} ${styles.palmaMarcada}`} />
                    <span className={styles.legendText}>Marcadas</span>
                </section>
            </article>

        </main>
    );
};