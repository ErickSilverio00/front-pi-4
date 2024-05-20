import { useState } from "react";
import termosOfensivos from "../../utils/termosOfensivos";

const useCamposCadastro = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeUsuarioErro, setNomeUsuarioErro] = useState("");
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [senhaConfirmadaErro, setSenhaConfirmadaErro] = useState("");
  const [erroCheckbox, setErroCheckbox] = useState("");

  const validarNomeDeUsuario = () => {
    if (!nomeUsuario) {
      setNomeUsuarioErro("Campo Obrigatório");
      return false;
    } else if (nomeUsuario.length < 3 || nomeUsuario.length > 15) {
      setNomeUsuarioErro("Nome de usuário deve ter entre 3 e 15 caracteres");
      return false;
    } else if (
      termosOfensivos.some((termo) => nomeUsuario.toLowerCase().includes(termo))
    ) {
      setNomeUsuarioErro("Nome de usuário não pode conter termo ofensivo");
      return false;
    } else if (!/^[a-z0-9_-]+$/.test(nomeUsuario)) {
      if (/[A-Z]/.test(nomeUsuario)) {
        setNomeUsuarioErro("Nome de usuário não pode conter letras maiúsculas");
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(nomeUsuario)) {
        setNomeUsuarioErro(
          "Nome de usuário não pode conter caracteres especiais"
        );
      } else {
        setNomeUsuarioErro(
          "Nome de usuário deve conter apenas letras minúsculas, números, underline (_) e hífen (-), além de não poder conter espaços"
        );
      }
      return false;
    }
    setNomeUsuarioErro("");
    return true;
  };

  const validarEmail = () => {
    if (!email) {
      setEmailErro("Campo Obrigatório");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErro("Email inválido");
      return false;
    }
    setEmailErro("");
    return true;
  };

  const validarTelefone = () => {
    if (!telefone) {
      setTelefoneErro("Campo Obrigatório");
      return false;
    } else if (!/^\d{10,11}$/.test(telefone)) {
      setTelefoneErro("Número de telefone inválido");
      return false;
    }
    setTelefoneErro("");
    return true;
  };

  const validarSenha = () => {
    if (!senha) {
      setSenhaErro("Campo Obrigatório");
      return false;
    } else if (senha.length < 8) {
      setSenhaErro("A senha deve ter pelo menos 8 caracteres");
      return false;
    } else if (!/[A-Z]/.test(senha)) {
      setSenhaErro("A senha deve conter pelo menos uma letra maiúscula");
      return false;
    } else if (!/[a-z]/.test(senha)) {
      setSenhaErro("A senha deve conter pelo menos uma letra minúscula");
      return false;
    } else if (!/[0-9]/.test(senha)) {
      setSenhaErro("A senha deve conter pelo menos um número");
      return false;
    } else if (!/[^a-zA-Z0-9]/.test(senha)) {
      setSenhaErro("A senha deve conter pelo menos um caractere especial");
      return false;
    }
    setSenhaErro("");
    return true;
  };

  const validarSenhaCofirmada = () => {
    if (!senhaConfirmada) {
      setSenhaConfirmadaErro("Campo Obrigatório");
      return false;
    } else if (senha !== senhaConfirmada) {
      setSenhaConfirmadaErro("As senhas devem ser iguais");
      return false;
    }
    setSenhaConfirmadaErro("");
    return true;
  };

  const validarCampos = () => {
    const isNomeUsuarioValido = validarNomeDeUsuario();
    const isEmailValido = validarEmail();
    const isTelefoneValido = validarTelefone();
    const isSenhaValida = validarSenha();
    const isSenhaConfirmadaValida = validarSenhaCofirmada();
    return (
      isNomeUsuarioValido &&
      isEmailValido &&
      isTelefoneValido &&
      isSenhaValida &&
      isSenhaConfirmadaValida
    );
  };

  return {
    nomeUsuario,
    setNomeUsuario,
    nomeUsuarioErro,
    setNomeUsuarioErro,
    email,
    setEmail,
    emailErro,
    setEmailErro,
    telefone,
    setTelefone,
    telefoneErro,
    setTelefoneErro,
    senha,
    setSenha,
    senhaErro,
    setSenhaErro,
    senhaConfirmada,
    setSenhaConfirmada,
    senhaConfirmadaErro,
    setSenhaConfirmadaErro,
    validarCampos,
    erroCheckbox,
    setErroCheckbox,
  };
};

export default useCamposCadastro;
