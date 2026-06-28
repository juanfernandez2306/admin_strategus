import { useState } from "react";
import ListaUsuarios from "./ListaUsuarios";
import { ModalEditarUsuario } from "./ModalEditarUsuario";

import { useUsuarios } from "../hooks/useUsuarios";

import style from './SeccionUsuarios.module.css';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  rol: string;
}

export const SeccionUsuarios = () => {
  const { usuariosData, loading, error } = useUsuarios();

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAbrirEdicion = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const handleRefrescarDatos = () => {
    console.log("Refrescar query SQL getAll para traer los datos nuevos...");
    // Aquí ejecutas la llamada a tu API / Hook para actualizar la lista de atrás
  };

  if (loading) {
    return <p className={style.sinDatos}>Cargando lista de usuarios...</p>;
  }

  if (error) {
    return <p className={style.sinDatos} style={{ color: "var(--error-color)" }}>Error: {error}</p>;
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
        onUsuarioActualizado={handleRefrescarDatos}
      />

    </section>
  );
}