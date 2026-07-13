
import styles from './CardSuccess.module.css';

interface CardSuccessProps {
    mensaje: string;
}

export const CardSuccess = ({ mensaje }: CardSuccessProps) => {
    return (
        <div className={styles.tarjetaSuccess} role="status">
            
            <div className={styles.contenedorIcono}>
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={3} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={styles.svgIcono}
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            
            {/* Mensaje descriptivo directo */}
            <div className={styles.cuerpoTexto}>
                <p className={styles.descripcion}>{mensaje}</p>
            </div>
        </div>
    );
};