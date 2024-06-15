import { useState, useRef } from "react";

const useCamposLogin = () => {
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

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

  const validarSenha = () => {
    if (!senha) {
      setSenhaErro("Campo Obrigatório");
      return false;
    } else if (senha.length < 8) {
      setSenhaErro("A senha deve ter pelo menos 8 caracteres");
      return false;
    }
    setSenhaErro("");
    return true;
  };

  const validarCampos = () => {
    const isEmailValido = validarEmail();
    const isSenhaValida = validarSenha();
    return isEmailValido && isSenhaValida;
  };

  return {
    emailRef,
    senhaRef,
    email,
    setEmail,
    emailErro,
    setEmailErro,
    senha,
    setSenha,
    senhaErro,
    setSenhaErro,
    validarCampos,
    validarEmail,
  };
};

export default useCamposLogin;
