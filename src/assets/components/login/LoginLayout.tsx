// LoginLayout.tsx
import { useState } from "react";
import FormBaseLayout from "../FormBaseLayout";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./hooks/useAuthStore";

import { useAuthUiStore } from "./hooks/useAuthUiStore";

import imgLogo from '../../img/logo_gepal_centrado.png';

import style from "./LoginLayout.module.css";


const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { autenticar } = useLogin();
  const loginGlobal = useAuthStore((state) => state.login);

  const irARegistro = useAuthUiStore((state) => state.irARegistro);

  const handleExecuteLogin = async (): Promise<string> => {
    const mensajeExito = await autenticar(email, password);
    
    const token = localStorage.getItem("token") || "";
    const nombre = localStorage.getItem("nombre_usuario") || "";

    setTimeout(() => {
      loginGlobal(token, nombre);
    }, 1200); 

    return mensajeExito;
  };

  return (
    <div className={style.container}>

      <FormBaseLayout
          buttonText="Ingresar al Sistema"
          onExecute={handleExecuteLogin}
        >
          <img src={imgLogo} alt="" />
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
          <p className={style.pieEnlace}>
          ¿No tienes una cuenta? 
          <a href="#" onClick={(e) => { e.preventDefault(); irARegistro(); }} className={style.enlaceAccion}>
            Regístrate aquí
          </a>
        </p>
        </FormBaseLayout>

    </div>

  );
};

export default LoginLayout;