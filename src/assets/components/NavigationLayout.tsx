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

import imgLogo from '../img/logo_horizontal_sigepad_blanco.png';

import { useAuthStore } from './login/hooks/useAuthStore'; 

import { URL_BACKEND } from '../maps/config/info';

export default function NavigationLayout(){

  const [vistaActiva, setVistaActiva] = useState<Vista>('resumen');

  const cambiarVista = (e: React.MouseEvent, vista: Vista) => {
    e.preventDefault();
    setVistaActiva(vista);
  };

  const tokenStore = useAuthStore((state) => state.token);
  const logoutStore = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await fetch(`${URL_BACKEND}/usuarios/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tokenStore}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error al revocar sesión en servidor:", error);
    } finally {
      // Independientemente de si el servidor responde o no, limpiamos 
      // el Store localmente. Al hacerlo, la vista cambiará al Login de inmediato.
      logoutStore();
    }
  };
  
  return (
    
    <div className={style.container}>
      <header className={style.header}>
        <img src={imgLogo} width={200} alt="" />
        <button 
          onClick={handleLogout}
          className={style.btnCerrarSesion}
          >Cerrar sesion</button>
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