import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../../../styles/colors";
import Botao from "../../../../components/Botao";
import TopoPersonalizado from "../../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";
import Toast from "react-native-toast-message";
import {
  confirmResetPassword,
  requestResetPassword,
  verifyResetCode,
} from "../../../../services/Usuarios";
import useCamposCadastro from "../../../../hooks/FluxoDeAutenticacao/useCamposCadastro";
import { useLoading } from "../../../../contexts/LoadingContext";

export default function EsqueciSenha() {
  const navigation = useNavigation();
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  const {
    senha,
    setSenha,
    senhaErro,
    setSenhaErro,
    senhaConfirmada,
    setSenhaConfirmada,
    senhaConfirmadaErro,
    setSenhaConfirmadaErro,
    validarRedefinicaoDeSenha,
  } = useCamposCadastro();
  const emailRef = useRef(null);
  const codigoRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarSenhaRef = useRef(null);
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoErro, setCodigoErro] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  const aoEnviarEmail = async () => {
    try {
      setIsLoading(true);
      if (email === "") {
        setEmailErro("Campo Obrigatório");
        return;
      }
      await requestResetPassword(email);
      Toast.show({
        type: "success",
        text1: "Envio feito com sucesso!",
        text2: "Veja a sua caixa de e-mails e copie o código!",
        visibilityTime: 3000,
        autoHide: true,
      });
      setEmailEnviado(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar e-mail!",
        text2: error.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aoEnviarCodigo = async () => {
    try {
      setIsLoading(true);
      if (email === "") {
        setCodigoErro("Campo Obrigatório");
        return;
      }
      await verifyResetCode(email, codigo);
      Toast.show({
        type: "success",
        text1: "Código correto!",
        text2: "Mude a sua senha agora mesmo!",
        visibilityTime: 3000,
        autoHide: true,
      });
      setEmailEnviado(false);
      setCodigoEnviado(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao confirmar código!",
        text2: error.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aoRedefinirSenha = async () => {
    try {
      setIsLoading(true);
      if (!validarRedefinicaoDeSenha()) {
        return;
      }
      await confirmResetPassword(email, senha);
      Toast.show({
        type: "success",
        text1: "Senha alterada com sucesso!",
        text2: "Faça o login agora mesmo!",
        visibilityTime: 3000,
        autoHide: true,
      });
      setCodigoEnviado(false);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao mudar sua senha!",
        text2: error.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.containerEsqueciSenha}>
      <TopoPersonalizado
        mostrarBotaoVoltar={true}
        aoPressionarBotaoVoltar={() => navigation.goBack()}
        mostrarTexto={true}
        texto="Esqueci minha senha"
        mostrarIcones={false}
      />
      <View style={styles.containerConteudo}>
        {!emailEnviado && !codigoEnviado && (
          <>
            <Text style={styles.textoConfirmacao}>
              Por favor, digite seu e-mail para que possamos enviar o código de
              redefinição de senha
            </Text>
            <CampoTexto
              ref={emailRef}
              label="E-mail"
              tipoInput="email-address"
              returnKeyType="done"
              erro={emailErro !== ""}
              mensagemErro={emailErro}
              onChangeText={(texto) => {
                setEmail(texto);
                setEmailErro("");
              }}
              onSubmitEditing={aoEnviarEmail}
            />
            <Botao
              aoPressionarBotao={aoEnviarEmail}
              texto="Enviar"
              style={styles.estiloBotao}
              isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </>
        )}
        {emailEnviado && !codigoEnviado && (
          <View style={styles.containerCamposForm}>
            <Text style={styles.textoLabelLegenda}>
              Digite o código recebido no seu e-mail
            </Text>
            <CampoTexto
              ref={codigoRef}
              label="Código"
              returnKeyType="done"
              erro={codigoErro !== ""}
              mensagemErro={codigoErro}
              onChangeText={(texto) => {
                setCodigo(texto);
                setCodigoErro("");
              }}
              onSubmitEditing={aoEnviarCodigo}
            />
            <Botao
              aoPressionarBotao={aoEnviarCodigo}
              texto="Confirmar"
              style={styles.estiloBotao}
              isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </View>
        )}
        {!emailEnviado && codigoEnviado && (
          <View style={styles.containerCamposForm}>
            <Text style={styles.textoLabelLegenda}>Redefina sua senha</Text>
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
              onSubmitEditing={aoRedefinirSenha}
            />
            <Botao
              aoPressionarBotao={aoRedefinirSenha}
              texto="Enviar"
              style={styles.estiloBotao}
              isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerEsqueciSenha: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerConteudo: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 16,
    marginTop: 10,
    gap: 20,
  },
  textoConfirmacao: {
    fontFamily: "Quicksand400",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
  estiloBotao: {
    backgroundColor: colors.primaria,
    paddingVertical: 5,
    borderRadius: 6,
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.branco,
  },
  containerCamposForm: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  textoLabelLegenda: {
    fontFamily: "Quicksand700",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
  estiloIcone: {
    position: "absolute",
    right: 5,
    bottom: 10,
    width: 24,
  },
  containerSenhaRedefinida: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});
