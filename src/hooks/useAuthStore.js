import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: "",
  userEmail: "",
  idUsuario: "",
  nomeUsuario: "",

  login: (accessToken, userEmail, idUsuario, nomeUsuario) =>
    set({
      isAuthenticated: true,
      accessToken,
      userEmail,
      idUsuario,
      nomeUsuario,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      accessToken: "",
      userEmail: "",
      idUsuario: "",
      nomeUsuario: "",
    }),
}));

export default useAuthStore;
