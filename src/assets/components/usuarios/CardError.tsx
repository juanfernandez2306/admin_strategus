
import styles from './CardError.module.css';

interface CardErrorProps {
    titulo?: string;
    mensaje: string;
}

export const CardError = ({ titulo = "Ha ocurrido un inconveniente", mensaje }: CardErrorProps) => {
    return (
        <div className={styles.tarjetaError} role="alert">
            {/* Ícono circular minimalista */}
            <div className={styles.contenedorIcono}>
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={2.5} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={styles.svgIcono}
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
            
            {/* Mensaje descriptivo */}
            <div className={styles.cuerpoTexto}>
                <h4 className={styles.titulo}>{titulo.toUpperCase()}</h4>
                <p className={styles.descripcion}>{mensaje}</p>
            </div>
        </div>
    );
};