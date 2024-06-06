import Axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const fetchUsuarios = async () => {
  try {
    const response = await Axios.get(`${baseURL}/usuarios`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar os usuarios: ", error);
    throw error;
  }
};

export const fetchUsuarioById = async (idUsuario) => {
  try {
    const response = await Axios.get(`${baseURL}/usuario/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o usuario: ", error);
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

export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await Axios.put(`${baseURL}/usuario/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário: ", error);
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

export const requestResetPassword = async (email) => {
  try {
    const response = await Axios.post(`${baseURL}/usuarios/redefinir-senha`, {
      email_usuario: email,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha: ", error);
    throw error;
  }
};

export const verifyResetCode = async (email, codigoVerificador) => {
  try {
    const response = await Axios.post(`${baseURL}/usuarios/verificar-codigo`, {
      email_usuario: email,
      codigo_verificador: codigoVerificador,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar código de redefinição de senha: ", error);
    throw error;
  }
};

export const confirmResetPassword = async (email, novaSenha) => {
  try {
    const response = await Axios.post(
      `${baseURL}/usuarios/redefinir-senha/confirmar`,
      {
        email_usuario: email,
        senha_usuario: novaSenha,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao confirmar redefinição de senha: ", error);
    throw error;
  }
};
