import { useCallback, useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import TopoPersonalizado from "../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";
import CampoTexto from "../../../components/CampoTexto";
import Botao from "../../../components/Botao";
import useAuthStore from "../../../hooks/useAuthStore";
import { fetchUsuarioById, updateUsuario } from "../../../services/Usuarios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoading } from "../../../contexts/LoadingContext";
import { maskPhoneNumber } from "../../../utils/masks";

export default function EditarPerfil() {
  const navigation = useNavigation();
  const user = useAuthStore();
  const { setIsLoading } = useLoading();
  const nomeUsuarioRef = useRef(null);
  const numeroTelefoneRef = useRef(null);
  const [usuarioBuscado, setUsuarioBuscado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [numeroTelefone, setNumeroTelefone] = useState("");

  const buscarUsuario = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchUsuarioById(user?.idUsuario);

      if (response && response.usuario) {
        setNomeUsuario(response.usuario.nome_usuario);
        setNumeroTelefone(response.usuario.numero_telefone);
        setUsuarioBuscado(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar informações do usuário!",
        text2: error,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.idUsuario]);

  const atualizarUsuario = useCallback(async () => {
    try {
      setIsLoading(true);
      const camposParaAtualizar = {
        nome_usuario: nomeUsuario,
        numero_telefone: numeroTelefone,
      };
      const response = await updateUsuario(
        user?.idUsuario,
        camposParaAtualizar
      );

      await AsyncStorage.setItem("nomeUsuario", nomeUsuario);
      setNomeUsuario(nomeUsuario);
      setNumeroTelefone(numeroTelefone);

      Toast.show({
        type: "success",
        text1: "Dados salvos!",
        text2: "Seus novos dados foram salvos com sucesso!",
        visibilityTime: 2000,
        autoHide: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar seus dados, tente novamente!",
        text2: error,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [nomeUsuario, numeroTelefone, user?.idUsuario]);

  useEffect(() => {
    buscarUsuario();
  }, [buscarUsuario]);

  return (
    <SafeAreaView style={styles.containerGeral}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerConteudo}>
        <TopoPersonalizado
          mostrarBotaoVoltar={true}
          aoPressionarBotaoVoltar={() => navigation.goBack()}
          mostrarTexto={true}
          texto="Editar Perfil"
          mostrarIcones={false}
        />
        <View style={styles.containerUsuario}>
          <View style={styles.containerFotoPerfil}>
            <Text style={styles.textoFoto}>
              {user?.userEmail?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.containerInfosUsuario}>
            <Text style={styles.textoNomeUsuario}>{nomeUsuario}</Text>
            <Text style={styles.textoEmailUsuario}>{user?.userEmail}</Text>
          </View>
        </View>
        <View style={styles.containerCamposForm}>
          <CampoTexto
            label="E-mail"
            valorInicial={user?.userEmail}
            editable={false}
          />
          {usuarioBuscado && (
            <>
              <CampoTexto
                ref={nomeUsuarioRef}
                label="Nome de usuário"
                returnKeyType="next"
                valorInicial={nomeUsuario}
                onChangeText={(texto) => setNomeUsuario(texto)}
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
                tipo="telefone"
                valorInicial={numeroTelefone}
                mask={maskPhoneNumber}
                onChangeText={(texto) => setNumeroTelefone(texto)}
              />
            </>
          )}
        </View>
        <Botao
          aoPressionarBotao={atualizarUsuario}
          texto="Atualizar dados"
          style={styles.estiloBotao}
          tamanhoIconeCarregamento={36}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerConteudo: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerUsuario: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  containerFotoPerfil: {
    width: 84,
    height: 84,
    borderRadius: 1000,
    backgroundColor: colors.primaria,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textoFoto: {
    fontFamily: "Quicksand700",
    fontSize: 24,
    color: colors.branco,
  },
  containerInfosUsuario: {
    gap: 5,
    alignItems: "center",
  },
  textoNomeUsuario: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
  textoEmailUsuario: {
    fontFamily: "Quicksand400",
    fontSize: 12,
    color: colors.corTextoPreto,
  },
  containerCamposForm: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  estiloBotao: {
    backgroundColor: colors.primaria,
    paddingVertical: 5,
    marginHorizontal: 16,
    borderRadius: 6,
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.branco,
  },
});
