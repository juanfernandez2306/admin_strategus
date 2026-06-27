// src/components/ModalEditarUsuario.tsx
import { useState, useEffect } from "react";
import FormBaseLayout from "./FormBaseLayout";
import style from "./ModalEditarUsuario.module.css";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  rol: string;
}

interface ModalEditarUsuarioProps {
  usuario: Usuario | null;
  isOpen: boolean;
  onClose: () => void;
  onUsuarioActualizado: () => void; // Para refrescar la lista principal al terminar
}

export const ModalEditarUsuario = ({ usuario, isOpen, onClose, onUsuarioActualizado }: ModalEditarUsuarioProps) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("activo");
  const [rol, setRol] = useState("");

  // Efecto para precargar los datos del usuario seleccionado cuando se abre el modal
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setStatus(usuario.status);
      setRol(usuario.rol);
    }
  }, [usuario, isOpen]);

  if (!isOpen || !usuario) return null;

  const handleUpdate = async (): Promise<string> => {
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      throw new Error("Todos los campos obligatorios deben estar completos.");
    }

    // Petición fetch simulada a tu backend REST API en Slim
    const respuesta = await fetch(`http://localhost/api-gepad/usuarios/update/${usuario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}` <- Si manejas JWT
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        status,
        rol
      }),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json().catch(() => ({}));
      throw new Error(errorData.message || "No se pudo actualizar el usuario.");
    }

    // Notificar al componente padre para refrescar los datos
    onUsuarioActualizado();
    
    return "El usuario ha sido actualizado correctamente.";
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.contenedorModal}>
        
        {/* Botón X superior para cerrar de forma inmediata */}
        <button type="button" className={style.botonCerrarX} onClick={onClose}>
          &times;
        </button>

        <FormBaseLayout
          titulo="Actualizar Usuario"
          buttonText="Guardar Cambios"
          onExecute={handleUpdate}
          onSuccess={onClose} // Cierra el modal cuando el usuario presiona el botón "Cerrar" del feedback exitoso
        >
          <div className={style.camposContainer}>
            
            {/* Campo: Nombre */}
            <div className={style.controlForm}>
              <label htmlFor="editNombre" className={style.label}>Nombre</label>
              <input
                type="text"
                id="editNombre"
                className={style.inputForm}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Campo: Apellido */}
            <div className={style.controlForm}>
              <label htmlFor="editApellido" className={style.label}>Apellido</label>
              <input
                type="text"
                id="editApellido"
                className={style.inputForm}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            {/* Campo: Email */}
            <div className={style.controlForm}>
              <label htmlFor="editEmail" className={style.label}>Correo Electrónico</label>
              <input
                type="email"
                id="editEmail"
                className={style.inputForm}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Fila Dual: Rol y Estado */}
            <div className={style.filaDual}>
              
              {/* Selector: Rol */}
              <div className={style.controlForm}>
                <label htmlFor="editRol" className={style.label}>Rol</label>
                <select
                  id="editRol"
                  className={style.selectForm}
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Monitorista">Monitorista</option>
                </select>
              </div>

              {/* Selector: Estatus */}
              <div className={style.controlForm}>
                <label htmlFor="editStatus" className={style.label}>Estatus</label>
                <select
                  id="editStatus"
                  className={style.selectForm}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="activo">ACTIVO</option>
                  <option value="inactivo">INACTIVO</option>
                </select>
              </div>

            </div>

          </div>
        </FormBaseLayout>
      </div>
    </div>
  );
}