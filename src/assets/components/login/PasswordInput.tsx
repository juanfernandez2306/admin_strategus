// PasswordInput.tsx
import { useState } from "react";
import style from "./LoginLayout.module.css";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "***********",
  required = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={style.groupInput}>
      <label htmlFor={id}>{label}</label>
      <div className={style.passwordWrapper}>
        <input
          id={id}
          type={passwordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={style.inputWithIcon}
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className={style.iconButton}
          aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {passwordVisible ? (
            /* Icono: Ojo Tachado (IoEyeOffOutline) */
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={style.icon} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="m432 448-352-352M256 128a127.34 127.34 0 0 1 101.4 50.14M402.13 218a241.67 241.67 0 0 1 45.15 62c-35.8 62.4-111 104-191.28 104a236.43 236.43 0 0 1-131-41M109.87 294C74.07 231.6 149.27 190 229.55 190a233.17 233.17 0 0 1 54.54 6.47M256 384A128 128 0 0 1 128 256a127.17 127.17 0 0 1 12.35-54"></path>
            </svg>
          ) : (
            /* Icono: Ojo Abierto (IoEyeOutline) */
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={style.icon} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 96c134.31 0 233.81 124.8 245.85 140.8a16 16 0 0 1 0 19.3c-12 16-111.54 140.8-245.85 140.8S10.15 272.1 1.85 256.1a16 16 0 0 1 0-19.3C13.85 120.8 113.39 96 256 96z"></path>
              <circle cx="256" cy="256" r="80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;