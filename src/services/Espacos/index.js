import Axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const fetchEspacos = async (idUsuario) => {
  try {
    const response = await Axios.get(`${baseURL}/espacos/${idUsuario}`);
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

export const fetchEspacoCampoPesquisa = async (idUsuario, campoPesquisa) => {
  try {
    const response = await Axios.get(
      `${baseURL}/buscar-espacos-input/${idUsuario}?campoPesquisa=${encodeURIComponent(
        campoPesquisa
      )}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar os espaços: ", error);
    throw error;
  }
};

export const fetchEspacosWithFilters = async (idUsuario, filtros) => {
  let url = `${baseURL}/buscar-espacos-filtros/${idUsuario}`;
  const queryParameters = Object.keys(filtros)
    .map((key) => {
      if (Array.isArray(filtros[key])) {
        return `${key}=${filtros[key].join(",")}`;
      } else {
        return `${key}=${filtros[key]}`;
      }
    })
    .filter((param) => param.split("=")[1] !== "undefined")
    .join("&");

  url = `${url}?${queryParameters}`;

  try {
    const response = await Axios.get(url);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar os espaços: ", error);
    throw error;
  }
};
