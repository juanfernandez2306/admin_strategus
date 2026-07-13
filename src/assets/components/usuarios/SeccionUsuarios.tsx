import { useState } from "react";
import ListaUsuarios from "./ListaUsuarios";
import { ModalEditarUsuario } from "./ModalEditarUsuario";

import { useUsuarios } from "../../hooks/useUsuarios";

import style from './SeccionUsuarios.module.css';

import { CardError } from "./CardError";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  rol: string;
}

export const SeccionUsuarios = () => {
  const { usuariosData, loading, error, recargar } = useUsuarios();

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAbrirEdicion = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  if (loading) {
    return <p className={style.sinDatos}>Cargando lista de usuarios...</p>;
  }

  if (error) {
    <CardError 
      titulo="Error de sincronización"
      mensaje={error} 
    />
  }

  return (
    <section className={style.container}>
      
      {/* Listado Principal de Usuarios */}
      <ListaUsuarios 
      usuariosData={usuariosData}
      onEditarUsuario={handleAbrirEdicion} />

      {/* Modal Reutilizable Acoplado */}
      <ModalEditarUsuario
        isOpen={modalAbierto}
        usuario={usuarioSeleccionado}
        onClose={() => setModalAbierto(false)}
        onUsuarioActualizado={recargar}
      />

    </section>
  );
}