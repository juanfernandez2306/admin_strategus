// App.tsx
import LoginLayout from "./assets/components/login/LoginLayout";
import NavigationLayout from "./assets/components/NavigationLayout";
import { useAuthStore } from "./assets/components/login/hooks/useAuthStore";
import './App.css';

function App() {
  // Consumimos el estado reactivo global de Zustand
  const isLogged = useAuthStore((state) => state.isLogged);

  // Renderizado Condicional Limpio
  return (
    <>
      {isLogged ? (
        <NavigationLayout />
      ) : (
        <LoginLayout />
      )}
    </>
  );
}

export default App;