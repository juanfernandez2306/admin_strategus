

import styles from './CardLoading.module.css';

interface CardLoadingProps {
    mensaje?: string;
}

export const CardLoading = ({ mensaje = "Cargando datos..." }: CardLoadingProps) => {
    return (
        <div className={styles.tarjetaLoading} role="status" aria-live="polite">
            
            <svg 
                viewBox="0 0 120 30" 
                className={styles.svgLoader}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Esfera 1 */}
                <circle cx="15" cy="15" r="10" className={`${styles.esfera} ${styles.esfera1}`} />
                {/* Esfera 2 */}
                <circle cx="60" cy="15" r="10" className={`${styles.esfera} ${styles.esfera2}`} />
                {/* Esfera 3 */}
                <circle cx="105" cy="15" r="10" className={`${styles.esfera} ${styles.esfera3}`} />
            </svg>
            
            {/* Mensaje descriptivo */}
            <p className={styles.texto}>{mensaje}</p>
        </div>
    );
};