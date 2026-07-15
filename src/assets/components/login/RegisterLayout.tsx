// RegisterLayout.tsx
import FormBaseLayout from "../FormBaseLayout";
import style from "./LoginLayout.module.css";
import imgLogo from '../../img/logo_sigepad.png';

import { useAuthUiStore } from "./hooks/useAuthUiStore";
import { URL_BACKEND } from "../../maps/config/info";
import { useFormValidators } from "./hooks/useFormValidators";
import { validadoresRegister } from "./utils/validatorsForm";
import PasswordInput from "./PasswordInput";

const RegisterLayout = () => {
  
  // Hook genérico conectado a las estrategias de validación
  const { valores, errores, handleChange, validarFormulario } = useFormValidators(
    {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmPassword: ""
    }, 
    validadoresRegister
  );

  const irALogin = useAuthUiStore((state) => state.irALogin);

  const handleExecuteRegister = async (): Promise<string> => {
    
    if (!validarFormulario()) {
      throw new Error("Por favor, corrige los errores antes de continuar.");
    }

    
    const respuesta = await fetch(`${URL_BACKEND}/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nombre: valores.nombre, 
        apellido: valores.apellido, 
        email: valores.email, 
        password: valores.password,
        password_confirm: valores.confirmPassword
      })
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.mensaje || "Error al registrar el usuario.");
    }

    return "Usuario registrado con éxito.";
  };

  return (
    <FormBaseLayout
      buttonText="Registrarse"
      onExecute={handleExecuteRegister}
      redirectOnSubmit={true}
      onSuccess={() => irALogin()}
    >
      <img src={imgLogo} alt="logo SIGEPAD" className={style.img} />

      
      <div className={style.groupInput}>
        <label htmlFor="reg-nombre">Nombre</label>
        <input
          id="reg-nombre"
          type="text"
          value={valores.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
          placeholder="Ingresa tu nombre"
          className={errores.nombre ? style.inputError : ""}
          required
        />
        {errores.nombre && <span className={style.notasError}>{errores.nombre}</span>}
      </div>

      
      <div className={style.groupInput}>
        <label htmlFor="reg-apellido">Apellido</label>
        <input
          id="reg-apellido"
          type="text"
          value={valores.apellido}
          onChange={(e) => handleChange("apellido", e.target.value)}
          placeholder="Ingresa tu apellido"
          className={errores.apellido ? style.inputError : ""}
          required
        />
        {errores.apellido && <span className={style.notasError}>{errores.apellido}</span>}
      </div>

      
      <div className={style.groupInput}>
        <label htmlFor="reg-email">Correo Electrónico</label>
        <input
          id="reg-email"
          type="email"
          value={valores.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="correo@ejemplo.com"
          className={errores.email ? style.inputError : ""}
          required
        />
        {errores.email && <span className={style.notasError}>{errores.email}</span>}
      </div>

      
      <PasswordInput
        id="reg-password"
        label="Contraseña"
        value={valores.password}
        onChange={(e) => handleChange("password", e.target.value)}
        placeholder="Mínimo 6 caracteres"
        error={errores.password}
        required
      />
      

      
      <PasswordInput
        id="reg-confirm-password"
        label="Confirmar Contraseña"
        value={valores.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        placeholder="Repite tu contraseña"
        error={errores.confirmPassword}
        required
      />
      

      <p className={style.pieEnlace}>
        ¿Ya tienes una cuenta?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); irALogin(); }} className={style.enlaceAccion}>
          Inicia Sesión
        </a>
      </p>
    </FormBaseLayout>
  );
};

export default RegisterLayout;