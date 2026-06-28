import { useState } from 'react';
import type { Vista } from '../types';
import style from './NavigationLayout.module.css';

import { IconUsers } from '../svg/IconUsers';
import { IconExcel } from '../svg/IconExcel';
import { IconMap } from '../svg/IconMap';
import { IconClipBoard } from '../svg/IconClipBoard';


import FiltroFechasForm from './FiltroFechasForm';
import ResumenLotesList from './ResumenLotesList';
import { SeccionUsuarios } from './SeccionUsuarios';
import { MapLibreGL } from '../maps/MapLibreGL';

import imgLogo from '../img/icono_blanco_sigal.png';

export default function NavigationLayout(){

  const [vistaActiva, setVistaActiva] = useState<Vista>('resumen');

  const cambiarVista = (e: React.MouseEvent, vista: Vista) => {
    e.preventDefault();
    setVistaActiva(vista);
  };
  
  return (
    
    <div className={style.container}>
      <header className={style.header}>
        <img src={imgLogo} width={200} alt="" />
        <button className={style.btnCerrarSesion}>Cerrar sesion</button>
      </header>
      <main className={style.main}>
        {vistaActiva === 'resumen' && <ResumenLotesList />}
        {vistaActiva === 'excel' && <FiltroFechasForm />}
        {vistaActiva === 'usuarios' && <SeccionUsuarios />}
        {vistaActiva === 'mapa' && <MapLibreGL />}
      </main>
      <footer className={style.footer}>
        <ul className={style.lista}>
          <li className={`${style.itemsLista} ${vistaActiva === 'resumen' ? style.itemActivo : ''}`}>
            <a className={`${style.enlace} ${vistaActiva === 'resumen' ? style.enlaceActivo : ''}`} 
               href="#" 
               onClick={(e) => cambiarVista(e, 'resumen')}>
              <IconClipBoard width={30} height={30} className={style.svg} />
            </a>
          </li>

          {/* Item: Excel */}
          <li className={`${style.itemsLista} ${vistaActiva === 'excel' ? style.itemActivo : ''}`}>
            <a className={`${style.enlace} ${vistaActiva === 'excel' ? style.enlaceActivo : ''}`} 
               href="#" 
               onClick={(e) => cambiarVista(e, 'excel')}>
              <IconExcel width={30} height={30} className={style.svg} />
            </a>
          </li>

          {/* Item: Usuarios */}
          <li className={`${style.itemsLista} ${vistaActiva === 'usuarios' ? style.itemActivo : ''}`}>
            <a className={`${style.enlace} ${vistaActiva === 'usuarios' ? style.enlaceActivo : ''}`} 
               href="#" 
               onClick={(e) => cambiarVista(e, 'usuarios')}>
              <IconUsers width={30} height={30} className={style.svg} />
            </a>
          </li>

          {/* Item: Mapa */}
          <li className={`${style.itemsLista} ${vistaActiva === 'mapa' ? style.itemActivo : ''}`}>
            <a className={`${style.enlace} ${vistaActiva === 'mapa' ? style.enlaceActivo : ''}`} 
               href="#" 
               onClick={(e) => cambiarVista(e, 'mapa')}>
              <IconMap width={30} height={30} className={style.svg} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}