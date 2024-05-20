import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../../styles/colors";
import Botao from "../../../../components/Botao";
import TopoPersonalizado from "../../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import CampoTexto from "../../../../components/CampoTexto";
import useCampoTexto from "../../../../hooks/useCampoTexto";

export default function EsqueciSenha() {
  const navigation = useNavigation();
  const { mostrarSenha, mudarVisibilidade } = useCampoTexto();
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [senhaRedefinida, setSenhaRedefinida] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const aoEnviarEmail = () => {
    setEmailEnviado(true);
  };

  const aoEnviarCodigo = () => {
    setEmailEnviado(false);
    setCodigoEnviado(true);
  };

  const aoRedefinirSenha = () => {
    setCodigoEnviado(false);
    setSenhaRedefinida(true);
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
        {!emailEnviado && !codigoEnviado && !senhaRedefinida && (
          <>
            <Text style={styles.textoConfirmacao}>
              Por favor, digite seu e-mail para que possamos enviar o código de
              redefinição de senha
            </Text>
            <CampoTexto
              label="E-mail"
              // erro={emailErro !== ""}
              // mensagemErro={emailErro}
              // onChangeText={(texto) => {
              //   setEmail(texto);
              //   setEmailErro("");
              // }}
            />
            <Botao
              aoPressionarBotao={aoEnviarEmail}
              texto="Confirmar"
              style={styles.estiloBotao}
              isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </>
        )}
        {emailEnviado && !codigoEnviado && !senhaRedefinida && (
          <View style={styles.containerCamposForm}>
            <Text style={styles.textoLabelLegenda}>
              Digite o código recebido no seu e-mail
            </Text>
            <CampoTexto label="Código" />
            <Botao
              aoPressionarBotao={aoEnviarCodigo}
              texto="Enviar"
              style={styles.estiloBotao}
              isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </View>
        )}
        {!emailEnviado && codigoEnviado && !senhaRedefinida && (
          <View style={styles.containerCamposForm}>
            <Text style={styles.textoLabelLegenda}>Redefina sua senha</Text>
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
            <Botao
              aoPressionarBotao={aoRedefinirSenha}
              texto="Enviar"
              style={styles.estiloBotao}
              // isLoading={isLoading}
              tamanhoIconeCarregamento={36}
            />
          </View>
        )}
        {senhaRedefinida && (
          <View style={styles.containerSenhaRedefinida}>
            <Text>Senha redefinida com sucesso!</Text>
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
