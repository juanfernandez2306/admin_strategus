// useAuthUiStore.ts
import { create } from 'zustand';

type VistaAuth = 'login' | 'register';

interface AuthUiState {
  vistaActual: VistaAuth;
  irARegistro: () => void;
  irALogin: () => void;
  setVista: (vista: VistaAuth) => void;
}

export const useAuthUiStore = create<AuthUiState>((set) => ({
  vistaActual: 'login', // Estado inicial
  irARegistro: () => set({ vistaActual: 'register' }),
  irALogin: () => set({ vistaActual: 'login' }),
  setVista: (vista) => set({ vistaActual: vista }),
}));