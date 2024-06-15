import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../styles/colors";
import CabecalhoTitulo from "../../../../components/CabecalhoTitulo";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";
import Botao from "../../../../components/Botao";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import useCamposCadastro from "../../../../hooks/FluxoDeAutenticacao/useCamposCadastro";
import { registerUsuario } from "../../../../services/Usuarios";
import Toast from "react-native-toast-message";
import { useLoading } from "../../../../contexts/LoadingContext";
import { maskPhoneNumber } from "../../../../utils/masks";

export default function Cadastro() {
  const navigation = useNavigation();
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  const {
    nomeUsuarioRef,
    emailRef,
    numeroTelefoneRef,
    senhaRef,
    confirmarSenhaRef,
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
  } = useCamposCadastro();
  const { isLoading, setIsLoading } = useLoading();

  const confirmarCadastro = async () => {
    try {
      setIsLoading(true);
      if (!validarCampos()) {
        return;
      }

      const objetoDeEnvio = {
        nome_usuario: nomeUsuario,
        email_usuario: email,
        numero_telefone: telefone,
        senha_usuario: senha,
        tipo_usuario: "cliente",
      };

      const response = await registerUsuario(objetoDeEnvio);

      Toast.show({
        type: "success",
        text1: "Cadastro bem-sucedido!",
        text2: "Faça seu login!",
        visibilityTime: 4000,
        autoHide: true,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro no cadastro!",
        text2: error.response.errors[0].msg,
        visibilityTime: 4000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.containerCadastro}>
      <CabecalhoTitulo titulo="Cadastro" />
      <View style={styles.containerLegenda}>
        <Text style={styles.textoLegenda}>Faça seu cadastro agora mesmo</Text>
      </View>
      <View style={styles.containerConteudo}>
        <View style={styles.containerCamposForm}>
          <CampoTexto
            ref={nomeUsuarioRef}
            label="Nome de usuário"
            returnKeyType="next"
            erro={nomeUsuarioErro !== ""}
            mensagemErro={nomeUsuarioErro}
            onChangeText={(texto) => {
              setNomeUsuario(texto);
              setNomeUsuarioErro("");
            }}
            onSubmitEditing={() => {
              if (emailRef.current) {
                emailRef.current.focus();
              }
            }}
          />
          <CampoTexto
            ref={emailRef}
            label="E-mail"
            tipoInput="email-address"
            returnKeyType="next"
            erro={emailErro !== ""}
            mensagemErro={emailErro}
            onChangeText={(texto) => {
              setEmail(texto);
              setEmailErro("");
            }}
            onSubmitEditing={() => {
              if (numeroTelefoneRef.current) {
                numeroTelefoneRef.current.focus();
              }
            }}
          />
          <CampoTexto
            ref={numeroTelefoneRef}
            label="Número de telefone"
            tipoInput="number-pad"
            returnKeyType="next"
            tipo="telefone"
            mask={maskPhoneNumber}
            erro={telefoneErro !== ""}
            mensagemErro={telefoneErro}
            onChangeText={(texto) => {
              setTelefone(texto);
              setTelefoneErro("");
            }}
            onSubmitEditing={() => {
              if (senhaRef.current) {
                senhaRef.current.focus();
              }
            }}
          />
          <CampoTexto
            ref={senhaRef}
            label="Senha"
            tipo="senha"
            returnKeyType="next"
            erro={senhaErro !== ""}
            mensagemErro={senhaErro}
            onChangeText={(texto) => {
              setSenha(texto);
              setSenhaErro("");
            }}
            mostrarSenha={mostrarSenha}
            Icone={mostrarSenha ? "eye" : "eye-off"}
            styleIcone={styles.estiloIcone}
            aoMudarVisibilidade={mudarVisibilidade}
            onSubmitEditing={() => {
              if (confirmarSenhaRef.current) {
                confirmarSenhaRef.current.focus();
              }
            }}
          />
          <CampoTexto
            ref={confirmarSenhaRef}
            label="Confirmar senha"
            tipo="senha"
            returnKeyType="done"
            erro={senhaConfirmadaErro !== ""}
            mensagemErro={senhaConfirmadaErro}
            onChangeText={(texto) => {
              setSenhaConfirmada(texto);
              setSenhaConfirmadaErro("");
            }}
            mostrarSenha={mostrarSenha}
            Icone={mostrarSenha ? "eye" : "eye-off"}
            styleIcone={styles.estiloIcone}
            aoMudarVisibilidade={mudarVisibilidade}
            onSubmitEditing={confirmarCadastro}
          />
        </View>
        <View style={styles.containerBotao}>
          <Botao
            aoPressionarBotao={confirmarCadastro}
            texto="Cadastrar"
            style={styles.estiloBotao}
            isLoading={isLoading}
            tamanhoIconeCarregamento={36}
          />
        </View>
        <View style={styles.containerIrParaLogin}>
          <Text style={styles.textoIrParaLogin}>
            Já tem uma conta? {"\n"}{" "}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.estiloLogin}>Faça login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerCadastro: {
    flex: 1,
    backgroundColor: colors.branco,
  },
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
    marginHorizontal: 16,
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
    marginHorizontal: 16,
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
