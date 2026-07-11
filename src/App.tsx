// App.tsx
import LoginLayout from "./assets/components/login/LoginLayout";
import NavigationLayout from "./assets/components/NavigationLayout";
import { useAuthStore } from "./assets/components/login/hooks/useAuthStore";
import { useAuthUiStore } from "./assets/components/login/hooks/useAuthUiStore";
import RegisterLayout from "./assets/components/login/RegisterLayout";
import ForgotPasswordLayout from "./assets/components/login/ForgotPasswordLayout";
import './App.css';

import { motion, AnimatePresence } from "framer-motion";

function App() {
  // Consumimos el estado reactivo global de Zustand
  const isLogged = useAuthStore((state) => state.isLogged);

  const vistaActual = useAuthUiStore((state) => state.vistaActual);

  if (isLogged) {
    return <NavigationLayout />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={vistaActual}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="auth-animation-wrapper" 
      >
        {vistaActual === 'login' && <LoginLayout />}
        {vistaActual === 'register' && <RegisterLayout />}
        {vistaActual === 'ForgotPassword' && <ForgotPasswordLayout />}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;