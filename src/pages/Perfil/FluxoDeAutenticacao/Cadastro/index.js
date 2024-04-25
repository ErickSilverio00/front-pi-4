import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../styles/colors";
import CabecalhoTitulo from "../../../../components/CabecalhoTitulo";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";
import Botao from "../../../../components/Botao";

export default function Cadastro({ navegarParaTelaDeLogin }) {
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  return (
    <>
      <CabecalhoTitulo titulo="Cadastrar" />
      <View style={styles.containerLegenda}>
        <Text style={styles.textoLegenda}>Faça seu cadastro agora mesmo</Text>
      </View>
      <View style={styles.containerConteudo}>
        <View style={styles.containerCamposForm}>
          <CampoTexto
            label="E-mail"
            // erro={nomeUsuarioErro !== ""}
            // mensagemErro={nomeUsuarioErro}
            // onChangeText={(texto) => {
            //   setNomeUsuario(texto);
            //   setNomeUsuarioErro("");
            // }}
          />
          <CampoTexto
            label="CPF"
            // erro={nomeUsuarioErro !== ""}
            // mensagemErro={nomeUsuarioErro}
            // onChangeText={(texto) => {
            //   setNomeUsuario(texto);
            //   setNomeUsuarioErro("");
            // }}
          />
          <CampoTexto
            label="Número de telefone"
            // erro={nomeUsuarioErro !== ""}
            // mensagemErro={nomeUsuarioErro}
            // onChangeText={(texto) => {
            //   setNomeUsuario(texto);
            //   setNomeUsuarioErro("");
            // }}
          />
          <CampoTexto
            label="Senha"
            // erro={senhaErro !== ""}
            // mensagemErro={senhaErro}
            // onChangeText={(texto) => {
            //   setSenha(texto);
            //   setSenhaErro("");
            // }}
            tipo="senha"
            mostrarSenha={mostrarSenha}
            Icone={mostrarSenha ? "eye" : "eye-off"}
            styleIcone={styles.estiloIcone}
            aoMudarVisibilidade={mudarVisibilidade}
          />
          <CampoTexto
            label="Confirmar senha"
            // erro={senhaErro !== ""}
            // mensagemErro={senhaErro}
            // onChangeText={(texto) => {
            //   setSenha(texto);
            //   setSenhaErro("");
            // }}
            tipo="senha"
            mostrarSenha={mostrarSenha}
            Icone={mostrarSenha ? "eye" : "eye-off"}
            styleIcone={styles.estiloIcone}
            aoMudarVisibilidade={mudarVisibilidade}
          />
        </View>
        <View style={styles.containerBotao}>
          <Botao
            // aoPressionarBotao={esqueciSenha}
            texto="Cadastrar"
            style={styles.estiloBotao}
            // isLoading={isLoading}
            tamanhoIconeCarregamento={36}
          />
        </View>
        <View style={styles.containerIrParaLogin}>
          <Text style={styles.textoIrParaLogin}>
            Já tem uma conta? {"\n"}{" "}
            <TouchableOpacity onPress={navegarParaTelaDeLogin}>
              <Text style={styles.estiloLogin}>Faça login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerLegenda: {
    display: "flex",
    paddingTop: 15,
  },
  textoLegenda: {
    fontFamily: "Quicksand400",
    fontSize: 18,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  containerConteudo: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  containerCamposForm: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  estiloIcone: {
    position: "absolute",
    right: 5,
    bottom: 10,
    width: 24,
  },
  estiloBotao: {
    backgroundColor: colors.primaria,
    paddingVertical: 5,
    borderRadius: 6,
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.branco,
    marginHorizontal: 20,
  },
  containerIrParaLogin: {
    display: "flex",
    marginTop: 30,
  },
  textoIrParaLogin: {
    fontFamily: "Quicksand400",
    fontSize: 16,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  estiloLogin: {
    fontFamily: "Quicksand400",
    fontSize: 16,
    textAlign: "center",
    color: colors.primaria,
    textDecorationLine: "underline",
  },
});
