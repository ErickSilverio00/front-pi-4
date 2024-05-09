import Axios from "axios";

const baseURL = "https://back-pi-4-production.up.railway.app";

export const fetchUsuarios = async () => {
  try {
    const response = await Axios.get(`${baseURL}/usuarios`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar os usuarios: ", error);
    throw error;
  }
};

export const registerUsuario = async (usuarioData) => {
  try {
    const response = await Axios.post(`${baseURL}/signup`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar o usuário: ", error);
    throw error;
  }
};

export const registerLogin = async (loginData) => {
  try {
    const response = await Axios.post(`${baseURL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
    throw error;
  }
};
