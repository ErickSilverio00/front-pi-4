import { create } from "zustand";
import {
  adicionarEspacoCurtido,
  fetchEspacosCurtidos as fetchEspacosCurtidosAPI,
  removerEspacoCurtido,
} from "../services/Curtidos";

const useEspacosCurtidos = create((set, get) => ({
  espacosCurtidos: [],
  espacoEstaCurtido: (idEspaco) => {
    return !!get().espacosCurtidos.find((item) => item.id_espaco === idEspaco);
  },
  fetchEspacosCurtidos: async (idUsuario) => {
    try {
      const favoritosData = await fetchEspacosCurtidosAPI(idUsuario);
      set({ espacosCurtidos: favoritosData || [] });
    } catch (error) {
      console.error("Erro ao buscar espaços curtidos: ", error);
      set({ espacosCurtidos: [] });
    }
  },
  adicionarEspacoCurtido: async (favoritosData) => {
    try {
      const novoItemCurtido = await adicionarEspacoCurtido(favoritosData);
      set((state) => ({
        espacosCurtidos: [...state.espacosCurtidos, novoItemCurtido],
      }));
    } catch (error) {
      console.error("Erro ao adicionar curtido: ", error);
      throw error;
    }
  },
  removerEspacoCurtido: async (idItemCurtido) => {
    try {
      await removerEspacoCurtido(idItemCurtido);
      set((state) => ({
        espacosCurtidos: state.espacosCurtidos.filter(
          (item) => item.id_espaco_curtido !== idItemCurtido
        ),
      }));
    } catch (error) {
      console.error("Erro ao remover item curtido: ", error);
      throw error;
    }
  },
}));

export default useEspacosCurtidos;
