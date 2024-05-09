import { create } from "zustand";
import {
  adicionarEspacoCurtido,
  fetchEspacosCurtidos,
  removerEspacoCurtido,
} from "../services/Curtidos";

const useEspacosCurtidos = create((set) => ({
  espacosCurtidos: [],
  fetchEspacosCurtidos: async (idUsuario) => {
    try {
      const favoritosData = await fetchEspacosCurtidos(idUsuario);
      set({ espacosCurtidos: favoritosData });
    } catch (error) {
      console.error("Erro ao buscar espaços curtidos: ", error);
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
    }
  },
}));

export default useEspacosCurtidos;
