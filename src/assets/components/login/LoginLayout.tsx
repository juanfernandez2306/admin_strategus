// LoginLayout.tsx
import { useState } from "react";
import FormBaseLayout from "../FormBaseLayout";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./hooks/useAuthStore";

import style from "./LoginLayout.module.css";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { autenticar } = useLogin();
  const loginGlobal = useAuthStore((state) => state.login);

  const handleExecuteLogin = async (): Promise<string> => {
    // 1. Esperamos la respuesta de la API Slim
    const mensajeExito = await autenticar(email, password);
    
    // 2. Extraemos los datos que guardó el hook en el localStorage
    const token = localStorage.getItem("token") || "";
    const nombre = localStorage.getItem("nombre_usuario") || "";

    // 3. Dejamos un retardo para que el modal de éxito de FormBaseLayout 
    // termine de dibujar el "Check" animado antes de cambiar de pantalla.
    setTimeout(() => {
      loginGlobal(token, nombre);
    }, 1200); 

    // Retornamos el mensaje para que el modal lo pinte en verde
    return mensajeExito;
  };

  return (
    <div className={style.contenedorCentrado}>
      <FormBaseLayout
        titulo="Iniciar Sesión"
        buttonText="Ingresar"
        onExecute={handleExecuteLogin}
        // 🌟 Eliminamos el onSuccess de aquí para evitar el desmontaje abrupto
      >
        <div className={style.groupInput}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className={style.groupInput}>
          <label htmlFor="clave">Contraseña</label>
          <input
            id="clave"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***********"
            required
          />
        </div>
      </FormBaseLayout>
    </div>
  );
};

export default LoginLayout;