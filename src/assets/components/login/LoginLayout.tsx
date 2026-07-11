// LoginLayout.tsx
import FormBaseLayout from "../FormBaseLayout";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./hooks/useAuthStore";

import { useAuthUiStore } from "./hooks/useAuthUiStore";

import imgLogo from '../../img/logo_sigepad.png';

import style from "./LoginLayout.module.css";

import PasswordInput from "./PasswordInput";

import { useFormValidators } from "./hooks/useFormValidators";
import { validadoresLogin } from "./utils/validatorsForm";


const LoginLayout = () => {

  const { valores, errores, handleChange, validarFormulario } = useFormValidators(
    {
      email: "",
      password: ""
    }
    , validadoresLogin
  );

  const { autenticar } = useLogin();

  const loginGlobal = useAuthStore((state) => state.login);

  const irARegistro = useAuthUiStore((state) => state.irARegistro);

  const irAforgotPassword = useAuthUiStore((state) => state.irAForgotPassword);

  const handleExecuteLogin = async (): Promise<string> => {

    if (!validarFormulario()) {
      throw new Error("Por favor, corrige los errores en el formulario.");
    }

    const mensajeExito = await autenticar(valores.email, valores.password);
    
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
          <img 
            src={imgLogo} 
            alt="logo SIGEPAD"
            className={style.img}

          />
          <div className={style.groupInput}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={valores.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />

            {errores.email && <span className={style.notasError}>{errores.email}</span>}

          </div>

          
          <PasswordInput
            id="clave"
            label="Contraseña"
            value={valores.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="***********"
            error={errores.password}
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
              <a href="#" onClick={(e) => { e.preventDefault(); irAforgotPassword(); }} className={style.enlaceAccion}>
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
        </FormBaseLayout>
  );
};

export default LoginLayout;