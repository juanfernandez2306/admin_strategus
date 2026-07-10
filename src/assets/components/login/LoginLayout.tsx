// LoginLayout.tsx
import { useState } from "react";
import FormBaseLayout from "../FormBaseLayout";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./hooks/useAuthStore";

import { useAuthUiStore } from "./hooks/useAuthUiStore";

import imgLogo from '../../img/logo_gepal_centrado.png';

import style from "./LoginLayout.module.css";

import PasswordInput from "./PasswordInput";


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

          
          <PasswordInput
            id="clave"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***********"
            required
          />
          
          <div className={style.contenedorEnlacesPie}>
            <p className={style.pieEnlace}>
              ¿No tienes cuenta? 
              <a href="#" onClick={(e) => { e.preventDefault(); irARegistro(); }} className={style.enlaceAccion}>
                Regístrate
              </a>
            </p>

            <p className={style.pieEnlace}>
              <a href="#" onClick={(e) => { e.preventDefault(); irARegistro(); }} className={style.enlaceAccion}>
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
        </FormBaseLayout>
  );
};

export default LoginLayout;