// RegistroSemanalChart.tsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import type { ChartOptions, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useRegistroSemanal } from './useRegistroSemanal';
import styleLocal from './RegistroSemanalChart.module.css';

// Registrar componentes de ChartJS necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const RegistroSemanalChart: React.FC = () => {
  const { data, loading, error } = useRegistroSemanal();

  if (loading) {
    return (
      <div className={styleLocal.loaderContainer}>
        <span className={`${styleLocal.mensajeLoader} animate-pulse`}>
          Cargando métricas de rendimiento...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styleLocal.loaderContainer} style={{ borderColor: '#f87171' }}>
        <span className={styleLocal.mensajeLoader} style={{ color: '#ef4444' }}>
          Error al cargar datos: {error}
        </span>
      </div>
    );
  }

  // Generamos etiquetas formateadas: de "2026-07-15" a "15 Jul"
  const labels: string[] = data.map(item => {
    const partes = item.fecha.split('-');
    if (partes.length !== 3) return item.fecha;
    const [, mes, dia] = partes;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${parseInt(dia, 10)} ${meses[parseInt(mes, 10) - 1]}`;
  });

  // Tipado estricto mixto para ChartData
  const chartData: ChartData<'bar' | 'line'> = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Revisadas',
        data: data.map(item => item.palmas_revisadas),
        borderColor: '#4ade80', // Verde claro brillante para que contraste limpio
        backgroundColor: '#4ade80',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Marcadas',
        data: data.map(item => item.palmas_marcadas),
        backgroundColor: '#f87171', // Rojo suave para no saturar visualmente
        borderColor: '#ef4444',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y'
      }
    ]
  };

  // Tipado estricto para las opciones de configuración del gráfico
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 11,
            family: 'var(--font-body)' // Mantenemos la tipografía unificada
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            family: 'var(--font-body)'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            family: 'var(--font-body)'
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className={styleLocal.contenedorGrafico}>
      <h3 className={styleLocal.tituloSeccion}>MONITOREO SEMANAL</h3>
      <div className={styleLocal.areaGrafico}>
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
};