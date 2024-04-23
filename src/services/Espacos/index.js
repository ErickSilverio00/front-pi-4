import Axios from "axios";

const baseURL = "http://localhost:3001";

export const fetchEspacos = async () => {
  try {
    const response = await Axios.get(`${baseURL}/espacos`);
    return response.data.espacos || [];
  } catch (error) {
    console.error("Erro ao buscar os espaços: ", error);
    throw error;
  }
};

export const registerEspaco = async (espacoData) => {
  try {
    const response = await Axios.post(`${baseURL}/espacos`, espacoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar o espaço: ", error);
    throw error;
  }
};

export const editEspaco = async (id, espacoData) => {
  try {
    const response = await Axios.put(`${baseURL}/espacos/${id}`, espacoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o espaço: ", error);
    throw error;
  }
};

export const deleteEspaco = async (id) => {
  try {
    const response = await Axios.delete(`${baseURL}/espacos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir o espaco: ", error);
    throw error;
  }
};
