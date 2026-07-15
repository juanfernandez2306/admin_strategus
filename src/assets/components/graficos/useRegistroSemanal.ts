
import { useState, useEffect } from 'react';
import { URL_BACKEND } from '../../maps/config/info';
import { useAuthStore } from '../login/hooks/useAuthStore';

export interface RegistroSemanalItem {
  fecha: string;            // Formato "YYYY-MM-DD"
  palmas_marcadas: number;  // Entero (int)
  palmas_revisadas: number; // Entero (int)
}

export interface APIResponseRegistroSemanal {
  statusCode: number;
  message: string;
  data: RegistroSemanalItem[];
}

export interface UseRegistroSemanalResult {
  data: RegistroSemanalItem[];
  loading: boolean;
  error: string | null;
}

export const useRegistroSemanal = (): UseRegistroSemanalResult => {
  const [data, setData] = useState<RegistroSemanalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `${URL_BACKEND}/strategus/resumen-semanal`;

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    let isMounted = true; // Evita fugas de memoria si el componente se desmonta rápido

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(apiUrl,
                {
                    method: "GET",
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            },
        );
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const result: APIResponseRegistroSemanal = await response.json();
        
        if (isMounted) {
          setData(result.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return { data, loading, error };
};