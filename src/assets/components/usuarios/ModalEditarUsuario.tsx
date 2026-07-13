// src/components/ModalEditarUsuario.tsx
import { useState, useEffect } from "react";
import FormBaseLayout from "../FormBaseLayout";
import style from "./ModalEditarUsuario.module.css";
import { useAuthStore } from "../login/hooks/useAuthStore"; 
import { URL_BACKEND } from "../../maps/config/info";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string | number;
  rol: string;
}

interface ModalEditarUsuarioProps {
  usuario: Usuario | null;
  isOpen: boolean;
  onClose: () => void;
  onUsuarioActualizado: () => void;
}

// Helper para convertir el string que viene del backend ("operador", "administrador") a su ID (role_id) numérico
const obtenerRoleIdPorNombre = (nombreRol: string): string => {
  const rolLimpio = nombreRol.trim().toLowerCase();
  switch (rolLimpio) {
    case "administrador": return "1";
    case "topografía": 
    case "topografia": return "2";
    case "operador": return "3";
    case "supervisor": return "4";
    default: return "3"; // Por defecto operador si no coincide
  }
};

// Helper para asegurar que el status que viene de la API ("activo" o 1) se asigne correctamente a "1" o "0"
const normalizarStatusAStringId = (status: string | number): string => {
  const val = String(status).trim().toLowerCase();
  return (val === "activo" || val === "1") ? "1" : "0";
};

export const ModalEditarUsuario = ({ usuario, isOpen, onClose, onUsuarioActualizado }: ModalEditarUsuarioProps) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [status, setStatus] = useState("1");
  const [roleId, setRoleId] = useState("3");
  const [fid, setFid] = useState<number | null>(null);

  const token = useAuthStore((state) => state.token); // 🌟 Extraemos tu token de sesión

  // Efecto para precargar los datos mapeados cuando se selecciona el usuario
  useEffect(() => {
    if (usuario) {
      setFid(usuario.id);
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setStatus(normalizarStatusAStringId(usuario.status));
      setRoleId(obtenerRoleIdPorNombre(usuario.rol)); // Transformamos "operador" -> "3"
    }
  }, [usuario, isOpen]);

  if (!isOpen || !usuario) return null;

  const handleUpdate = async (): Promise<string> => {
    if (!nombre.trim() || !apellido.trim()) {
      throw new Error("Todos los campos obligatorios deben estar completos.");
    }

    // Petición fetch a tu endpoint REST API en Slim
    const respuesta = await fetch(`${URL_BACKEND}/usuarios/${fid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        role_id: parseInt(roleId, 10),
        status: parseInt(status, 10)
      }),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json().catch(() => ({}));
      throw new Error(errorData.message || "No se pudo actualizar el usuario.");
    }

    // Refrescar la lista principal de usuarios en tiempo real
    
    
    return "El usuario ha sido actualizado correctamente.";
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.contenedorModal}>
        
        <button type="button" className={style.botonCerrarX} onClick={onClose}>
          &times;
        </button>

        <FormBaseLayout
          titulo="Actualizar Usuario"
          buttonText="Guardar Cambios"
          onExecute={handleUpdate}
          onSuccess={() => {
            onClose();
            onUsuarioActualizado();
          }}
          redirectOnSubmit={true}
        >
          <div className={style.camposContainer}>
            
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

            <div className={style.filaDual}>
              
              {/* Selector: Rol */}
              <div className={style.controlForm}>
                <label htmlFor="editRol" className={style.label}>Rol</label>
                <select
                  id="editRol"
                  className={style.selectForm}
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                >
                  <option value="1">Administrador</option>
                  <option value="2">Topografía</option>
                  <option value="3">Operador</option>
                  <option value="4">Supervisor</option>
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
                  <option value="1">ACTIVO</option>
                  <option value="0">INACTIVO</option>
                </select>
              </div>

            </div>

          </div>
        </FormBaseLayout>
      </div>
    </div>
  );
};