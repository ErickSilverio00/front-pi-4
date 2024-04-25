import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";
import Login from "./FluxoDeAutenticacao/Login";
import Cadastro from "./FluxoDeAutenticacao/Cadastro";

export default function Perfil() {
  const [loginAtivo, setLoginAtivo] = useState(true);
  const [cadastroAtivo, setCadastroAtivo] = useState(false);

  const navegarParaTelaDeCadastro = () => {
    setCadastroAtivo(true);
    setLoginAtivo(false);
  };

  const navegarParaTelaDeLogin = () => {
    setLoginAtivo(true);
    setCadastroAtivo(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loginAtivo && (
        <Login navegarParaTelaDeCadastro={navegarParaTelaDeCadastro} />
      )}

      {cadastroAtivo && (
        <Cadastro navegarParaTelaDeLogin={navegarParaTelaDeLogin} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.branco,
    flex: 1,
  },
});
