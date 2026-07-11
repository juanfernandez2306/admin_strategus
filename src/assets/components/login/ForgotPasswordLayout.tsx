// ForgotPasswordLayout.tsx
import FormBaseLayout from "../FormBaseLayout";
import style from "./LoginLayout.module.css";
import imgLogo from '../../img/logo_sigepad.png';

import { useAuthUiStore } from "./hooks/useAuthUiStore";
import { URL_BACKEND } from "../../maps/config/info";
import { useFormValidators } from "./hooks/useFormValidators";
import { validadoresLogin } from "./utils/validatorsForm";

const ForgotPasswordLayout = () => {
  // 1. Reutilizamos el hook de validación apuntando únicamente al email
  const { valores, errores, handleChange, validarFormulario } = useFormValidators(
    {
      email: ""
    },
    {
      email: validadoresLogin.email
    }
  );

  // Asumiendo que tienes una función para navegar de vuelta en tu zustand store
  const irALogin = useAuthUiStore((state) => state.irALogin);

  const handleExecuteRecovery = async (): Promise<string> => {
    
    if (!validarFormulario()) {
      throw new Error("Por favor, introduce un correo electrónico válido.");
    }

    // 3. Petición al backend
    const respuesta = await fetch(`${URL_BACKEND}/usuarios/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: valores.email })
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.mensaje || "No se pudo procesar la solicitud de recuperación.");
    }

    // El mensaje devuelto aquí será renderizado automáticamente por el modal de éxito de tu FormBaseLayout
    return "Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor, revisa tu bandeja de entrada.";
  };

  return (
    <FormBaseLayout
      buttonText="Enviar enlace"
      onExecute={handleExecuteRecovery}
    >
      {/* LOGO */}
      <img src={imgLogo} alt="logo SIGEPAD" className={style.img} />

      {/* MENSAJE DE TEXTO INFORMATIVO PARA EL USUARIO */}
      <div className={style.encabezadoSection} style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
        <h3 className={style.tituloForm} style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
          ¿Olvidaste tu contraseña?
        </h3>
        <p style={{ 
          fontSize: '0.95rem', 
          color: '#64748b', 
          textAlign: 'center', 
          lineHeight: '1.4',
          margin: 0 
        }}>
          Introduce tu correo electrónico y te enviaremos las instrucciones necesarias para restablecerla de forma segura.
        </p>
      </div>

      {/* INPUT: CORREO ELECTRÓNICO */}
      <div className={style.groupInput} style={{ width: '100%' }}>
        <label htmlFor="recovery-email">Correo Electrónico</label>
        <input
          id="recovery-email"
          type="email"
          value={valores.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="correo@ejemplo.com"
          className={errores.email ? style.inputError : ""}
          required
        />
        {errores.email && <span className={style.notasError}>{errores.email}</span>}
      </div>

      {/* ENLACE PARA VOLVER ATRÁS */}
      <p className={style.pieEnlace} style={{ marginTop: '0.5rem' }}>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); irALogin(); }} 
          className={style.enlaceAccion}
        >
          Volver al Inicio de Sesión
        </a>
      </p>
    </FormBaseLayout>
  );
};

export default ForgotPasswordLayout;