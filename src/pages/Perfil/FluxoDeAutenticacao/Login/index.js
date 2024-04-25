import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../styles/colors";
import CabecalhoTitulo from "../../../../components/CabecalhoTitulo";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";
import Botao from "../../../../components/Botao";
import ImagemLogin from "../../../../../assets/imagemLogin1.png";

export default function Login({ navegarParaTelaDeCadastro }) {
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  return (
    <>
      <CabecalhoTitulo titulo="Entrar" />
      <View style={styles.containerLegenda}>
        <Text style={styles.textoLegenda}>Faça seu login agora mesmo</Text>
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
        </View>
        <TouchableOpacity>
          <Text style={styles.textoEsqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <View style={styles.containerBotao}>
          <Botao
            // aoPressionarBotao={esqueciSenha}
            texto="Entrar"
            style={styles.estiloBotao}
            // isLoading={isLoading}
            tamanhoIconeCarregamento={36}
          />
        </View>
        <View style={styles.containerIrParaCadastro}>
          <Text style={styles.textoIrParaCadastro}>
            Não tem uma conta? {"\n"}{" "}
            <TouchableOpacity onPress={navegarParaTelaDeCadastro}>
              <Text style={styles.estiloCadastro}>Cadastre-se</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <Image source={ImagemLogin} style={styles.imagemLogin} />
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
  },
  textoEsqueciSenha: {
    fontFamily: "Quicksand400",
    fontSize: 14,
    color: colors.primaria,
    textAlign: "right",
    marginVertical: 15,
    marginHorizontal: 20,
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
  containerIrParaCadastro: {
    display: "flex",
    marginTop: 30,
  },
  textoIrParaCadastro: {
    fontFamily: "Quicksand400",
    fontSize: 16,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  estiloCadastro: {
    fontFamily: "Quicksand400",
    fontSize: 16,
    textAlign: "center",
    color: colors.primaria,
    textDecorationLine: "underline",
  },
  imagemLogin: {
    width: "100%",
    height: "60%",
    objectFit: "contain",
    marginTop: 10,
  },
});
