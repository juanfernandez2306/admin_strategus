// src/components/ListaUsuarios.tsx

import styleLocal from "./ListaUsuarios.module.css";
import { CardError } from "./CardError";

// Interface basada exactamente en tu consulta SQL
interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: "activo" | "inactivo" | string;
  rol: string;
}

interface ListaUsuariosProps {
  usuariosData?: Usuario[];
  onEditarUsuario?: (usuario: Usuario) => void;
}

const ListaUsuarios = ({ usuariosData, onEditarUsuario }: ListaUsuariosProps) => {
  
  const handleEditarClick = (usuario: Usuario) => {
    if (onEditarUsuario) {
      onEditarUsuario(usuario);
    } else {
      console.log("Disparar modal para editar a:", usuario);
    }
  };

  return (
    <div className={styleLocal.contenedorUsuarios}>
      <h3 className={styleLocal.tituloSeccion}>ADMINISTRACIÓN DE USUARIOS</h3>
      
      {usuariosData?.length === 0 ? (
        <CardError 
          titulo="Notificación"
          mensaje="Acceso restringido."
        />
      ) : (
        usuariosData?.map((user) => (
          <div key={user.id} className={styleLocal.tarjetaUsuario}>
            
            {/* Encabezado de la Tarjeta (Nombre completo + Rol) */}
            <div className={styleLocal.encabezadoUsuario}>
              <div className={styleLocal.infoPrincipal}>
                <h4 className={styleLocal.nombreCompleto}>
                  {`${user.nombre} ${user.apellido}`}
                </h4>
                <span className={styleLocal.emailTexto}>{user.email}</span>
              </div>
              <span className={styleLocal.tagRol}>{user.rol.toUpperCase()}</span>
            </div>

            {/* Fila Inferior: Estatus y Botón de Acción */}
            <div className={styleLocal.filaAcciones}>
              
              {/* Badge Dinámico de Estatus */}
              <div className={styleLocal.contenedorEstatus}>
                <span className={`${styleLocal.badgeEstatus} ${user.status === 'activo' ? styleLocal.activo : styleLocal.inactivo}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>

              {/* Botón de edición que abrirá tu modal */}
              <button 
                type="button" 
                className={styleLocal.botonEditar}
                onClick={() => handleEditarClick(user)}
              >
                Editar Perfil
              </button>

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default ListaUsuarios;