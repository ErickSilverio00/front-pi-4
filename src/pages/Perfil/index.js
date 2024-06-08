import React, { useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../styles/colors";
import useAuthStore from "../../hooks/useAuthStore";
import Login from "./FluxoDeAutenticacao/Login";
import Icon from "react-native-vector-icons/Feather";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CabecalhoTitulo from "../../components/CabecalhoTitulo";
import imgAnunciante from "../../../assets/imgAnunciante.png";
import * as Sharing from "expo-sharing";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const navigation = useNavigation();
  const user = useAuthStore();
  const [nomeUsuario, setNomeUsuario] = useState("");

  const itensConfiguracoes = [
    {
      name: "user",
      texto: "Editar perfil",
      tela: "EditarPerfil",
    },
    {
      name: "settings",
      texto: "Configurações",
      tela: "Configuracoes",
    },
    {
      name: "headphones",
      texto: "Suporte",
      tela: "Suporte",
    },
    {
      name: "share-2",
      texto: "Compartilhe o aplicativo",
      tela: null,
    },
  ];

  const compartilharAplicativo = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("O compartilhamento não está disponível no seu dispositivo");
      return;
    }

    try {
      await Sharing.shareAsync("https://matheuscalcadosonline.vercel.app/", {
        dialogTitle: "Compartilhe este aplicativo",
        mimeType: "text/plain",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: `Erro ao tentar compartilhar o app: ${error}`,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const buscarNomeUsuario = async () => {
    try {
      const nome = await AsyncStorage.getItem("nomeUsuario");
      if (nome !== null) {
        setNomeUsuario(nome);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao recuperar o nome de usuário!",
        text2: error,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarNomeUsuario();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {!user.isAuthenticated && <Login />}
      {user.isAuthenticated && (
        <>
          <CabecalhoTitulo titulo="Meu Perfil" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.conteudoGeral}>
              <View style={styles.containerUsuario}>
                <View style={styles.containerFotoPerfil}>
                  <Text style={styles.textoFoto}>
                    {nomeUsuario?.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.containerInfosUsuario}>
                  <Text style={styles.textoNomeUsuario}>{nomeUsuario}</Text>
                  <Text style={styles.textoEmailUsuario}>
                    {user?.userEmail}
                  </Text>
                </View>
              </View>
              <View style={styles.conteudoBaixo}>
                <TouchableOpacity
                  style={styles.containerSerAnunciante}
                  onPress={() => navigation.navigate("TornarAnunciante")}
                >
                  <Text style={styles.textoSerAnunciante}>
                    Anuncie seu espaço conosco agora mesmo!
                  </Text>
                  <Image
                    style={styles.imagemSerAnunciante}
                    source={imgAnunciante}
                  />
                </TouchableOpacity>
                <View style={styles.containerListaItens}>
                  {itensConfiguracoes.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (item.tela) {
                          navigation.navigate(item.tela);
                        } else if (item.name === "share-2") {
                          compartilharAplicativo();
                        }
                      }}
                      style={styles.containerBotao}
                    >
                      <Icon
                        name={item.name}
                        color={colors.corTextoPreto}
                        size={22}
                      />
                      <Text style={styles.textoBotao}>{item.texto}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.branco,
    flex: 1,
  },
  containerUsuario: {
    display: "flex",
    flexDirection: "row",
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
    gap: 2,
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
  containerSerAnunciante: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.branco,
    //Android
    elevation: 4,
    //IOS
    shadowColor: colors.corTextoPreto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
  },
  textoSerAnunciante: {
    fontFamily: "Quicksand700",
    fontSize: 18,
    color: colors.corTextoPreto,
    flex: 1,
  },
  imagemSerAnunciante: {
    width: 90,
    height: 90,
  },
  containerListaItens: {
    marginTop: 10,
    marginHorizontal: 16,
    gap: 20,
  },
  containerBotao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinzaMaisClaro,
  },
  textoBotao: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
});
