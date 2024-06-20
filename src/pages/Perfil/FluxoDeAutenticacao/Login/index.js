import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../styles/colors";
import CabecalhoTitulo from "../../../../components/CabecalhoTitulo";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";
import Botao from "../../../../components/Botao";
import ImagemLogin from "../../../../../assets/imagemLogin1.png";
import { useNavigation } from "@react-navigation/native";
import useCamposLogin from "../../../../hooks/FluxoDeAutenticacao/useCamposLogin";
import useAuthStore from "../../../../hooks/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { registerLogin } from "../../../../services/Usuarios";
import { useLoading } from "../../../../contexts/LoadingContext";

export default function Login() {
  const navigation = useNavigation();
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  const {
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
  } = useCamposLogin();
  const { isLoading, setIsLoading } = useLoading();

  const confirmarLogin = async () => {
    try {
      setIsLoading(true);

      const objetoDeEnvio = {
        email_usuario: email,
        senha_usuario: senha,
      };

      if (validarCampos()) {
        const response = await registerLogin(objetoDeEnvio);
        if (response.message === "Usuário logado com sucesso") {
          const {
            accessToken,
            usuario: userEmail,
            idUsuario,
            nomeUsuario,
          } = response;

          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("userEmail", userEmail);
          await AsyncStorage.setItem("idUsuario", idUsuario.toString());
          await AsyncStorage.setItem("nomeUsuario", nomeUsuario);

          useAuthStore
            .getState()
            .login(accessToken, userEmail, idUsuario, nomeUsuario);

          Toast.show({
            type: "success",
            text1: "Login bem-sucedido!",
            text2: "Você já está conectado na sua conta!",
            visibilityTime: 3000,
            autoHide: true,
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "Perfil" }],
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Erro ao fazer login",
            text2: response.mensagem,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error?.response?.data?.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.containerLogin}>
      <CabecalhoTitulo titulo="Login" />
      <View style={styles.containerLegenda}>
        <Text style={styles.textoLegenda}>Faça seu login agora mesmo</Text>
      </View>
      <View style={styles.containerConteudo}>
        <View style={styles.containerCamposForm}>
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
              if (senhaRef.current) {
                senhaRef.current.focus();
              }
            }}
          />
          <CampoTexto
            ref={senhaRef}
            label="Senha"
            tipo="senha"
            returnKeyType="done"
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
            onSubmitEditing={confirmarLogin}
          />
        </View>
        <TouchableOpacity
          style={styles.containerEsqueciSenha}
          onPress={() => navigation.navigate("EsqueciSenha")}
        >
          <Text style={styles.textoEsqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <View style={styles.containerBotao}>
          <Botao
            texto="Entrar"
            style={styles.estiloBotao}
            isLoading={isLoading}
            tamanhoIconeCarregamento={36}
            aoPressionarBotao={confirmarLogin}
          />
        </View>
        <View style={styles.containerIrParaCadastro}>
          <Text style={styles.textoIrParaCadastro}>
            Não tem uma conta? {"\n"}{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.estiloCadastro}>Cadastre-se</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <Image source={ImagemLogin} style={styles.imagemLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerLegenda: {
    paddingTop: 15,
  },
  textoLegenda: {
    fontFamily: "Quicksand400",
    fontSize: 18,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  containerConteudo: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  containerCamposForm: {
    flexDirection: "column",
    gap: 15,
    marginHorizontal: 16,
  },
  containerEsqueciSenha: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginVertical: 15,
  },
  textoEsqueciSenha: {
    fontFamily: "Quicksand400",
    fontSize: 14,
    color: colors.primaria,
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
  containerIrParaCadastro: {
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
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    marginTop: 10,
  },
});
