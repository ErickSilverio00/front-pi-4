import Axios from "axios";

const baseURL = "https://back-pi-4-production.up.railway.app";

export const fetchEspacosCurtidos = async (idUsuario) => {
  try {
    const response = await Axios.get(
      `${baseURL}/espacos-curtidos/${idUsuario}`
    );
    return response.data.espacosCurtidos || [];
  } catch (error) {
    console.error("Erro ao buscar os espaços curtidos: ", error);
    throw error;
  }
};

export const adicionarEspacoCurtido = async (espacoData) => {
  try {
    const response = await Axios.post(
      `${baseURL}/espacos-curtidos`,
      espacoData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar espaço aos curtidos: ", error);
    throw error;
  }
};

export const removerEspacoCurtido = async (idEspacoCurtido) => {
  try {
    const response = await Axios.delete(
      `${baseURL}/espacos-curtidos/${idEspacoCurtido}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao remover espaço dos curtidos: ", error);
    throw error;
  }
};
