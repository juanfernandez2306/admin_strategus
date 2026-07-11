// useAuthUiStore.ts
import { create } from 'zustand';

type VistaAuth = 'login' | 'register' | 'ForgotPassword';

interface AuthUiState {
  vistaActual: VistaAuth;
  irARegistro: () => void;
  irAForgotPassword: () => void;
  irALogin: () => void;
  setVista: (vista: VistaAuth) => void;
}

export const useAuthUiStore = create<AuthUiState>((set) => ({
  vistaActual: 'login', // Estado inicial
  irARegistro: () => set({ vistaActual: 'register' }),
  irAForgotPassword : () => set({vistaActual: 'ForgotPassword'}),
  irALogin: () => set({ vistaActual: 'login' }),
  setVista: (vista) => set({ vistaActual: vista }),
}));