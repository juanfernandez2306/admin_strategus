// App.tsx
import LoginLayout from "./assets/components/login/LoginLayout";
import NavigationLayout from "./assets/components/NavigationLayout";
import { useAuthStore } from "./assets/components/login/hooks/useAuthStore";
import { useAuthUiStore } from "./assets/components/login/hooks/useAuthUiStore";
import RegisterLayout from "./assets/components/login/RegisterLayout";
import './App.css';

function App() {
  // Consumimos el estado reactivo global de Zustand
  const isLogged = useAuthStore((state) => state.isLogged);

  const vistaActual = useAuthUiStore((state) => state.vistaActual);

  if (isLogged) {
    return <NavigationLayout />;
  }

  return (
    <>
      {vistaActual === 'login' ? <LoginLayout /> : <RegisterLayout />}
    </>
  );
}

export default App;