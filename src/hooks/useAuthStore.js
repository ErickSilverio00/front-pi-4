import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: "",
  userEmail: "",
  idUsuario: "",

  login: (accessToken, userEmail, idUsuario) =>
    set({ isAuthenticated: true, accessToken, userEmail, idUsuario }),
  logout: () =>
    set({
      isAuthenticated: false,
      accessToken: "",
      userEmail: "",
      idUsuario: "",
    }),
}));

export default useAuthStore;
