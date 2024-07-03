import { create } from "zustand";
import { LocationObject } from "expo-location";

const useLocationStore = create((set) => ({
  localizacaoUsuario: null,
  setLocalizacaoUsuario: (location) =>
    set((state) => ({ ...state, localizacaoUsuario: location })),
}));

export default useLocationStore;
