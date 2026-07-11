// RegisterLayout.tsx
import { useState } from "react";
import FormBaseLayout from "../FormBaseLayout";
import style from "./LoginLayout.module.css";

import imgLogo from '../../img/logo_gepal_centrado.png';

import { useAuthUiStore } from "./hooks/useAuthUiStore";

import { URL_BACKEND } from "../../maps/config/info";


const RegisterLayout = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const irALogin = useAuthUiStore((state) => state.irALogin);

  const handleExecuteRegister = async (): Promise<string> => {
    // Validación de seguridad previa del lado del cliente
    if (password !== confirmPassword) {
      throw new Error("Las contraseñas ingresadas no coinciden.");
    }

    // Aquí llamarías a tu servicio/hook de fetch hacia tu API Slim (ej. usuarios/register)
    const respuesta = await fetch(`${URL_BACKEND}/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nombre: nombre, 
        apellido: apellido, 
        email: email, 
        password: password,
        password_confirm: confirmPassword
     }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok || !datos.success) {
      throw new Error(datos.message || "Ocurrió un error al procesar el registro.");
    }

    // Redirección o acción automática tras éxito
    setTimeout(() => {
      irALogin();
    }, 1500);

    return datos.message || "Usuario registrado exitosamente.";
  };

  return (
    
    <FormBaseLayout
      buttonText="Confirmar Registro"
      onExecute={handleExecuteRegister}
    >
      <img src={imgLogo} alt="" />
      <div className={style.groupInput}>
        <label htmlFor="reg-nombre">Nombre</label>
        <input
          id="reg-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
          pattern="[a-zA-ZñÑ]{3,}"
          title="Solo se permiten letras"
        />
      </div>

      <div className={style.groupInput}>
        <label htmlFor="reg-apellido">Apellido</label>
        <input
          id="reg-apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingresa tu apellido"
          required
          pattern="[a-zA-ZñÑ]{3,}"
          title="Solo se permiten letras"
        />
      </div>

      <div className={style.groupInput}>
        <label htmlFor="reg-email">Correo Electrónico</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div className={style.groupInput}>
        <label htmlFor="reg-password">Contraseña</label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          pattern="[a-zA-Z0-9]{6,}" 
          title="Solo se permiten letras y números, y debe tener al menos 6 caracteres."
          required
        />
        <em className={style.notas}>
          Solo se permiten letras y números, y debe tener al menos 6 caracteres.
        </em>
      </div>

      <div className={style.groupInput}>
        <label htmlFor="reg-confirm-password">Confirmar Contraseña</label>
        <input
          id="reg-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repite tu contraseña"
          required
          pattern="[a-zA-Z0-9]{6,}" 
          title="Solo se permiten letras y números, y debe tener al menos 6 caracteres."
        />
      </div>

      <p className={style.pieEnlace}>
      ¿Ya tienes una cuenta? 
      <a href="#" onClick={(e) => { e.preventDefault(); irALogin(); }} className={style.enlaceAccion}>
        Inicia sesión aquí
      </a>
    </p>
    </FormBaseLayout>

  );
};

export default RegisterLayout;