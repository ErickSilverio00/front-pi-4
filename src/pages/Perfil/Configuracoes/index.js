import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import TopoPersonalizado from "../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import useAuthStore from "../../../hooks/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function Configuracoes() {
  const navigation = useNavigation();

  function logOut() {
    Alert.alert("Tem certeza que deseja sair da sua conta?", "", [
      {
        text: "Sim",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("idUsuario");
            await AsyncStorage.removeItem("nomeUsuario");
            useAuthStore.getState().logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Erro ao sair da sua conta!",
              text2: error.response.data.message,
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.containerGeral}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerConteudo}>
        <TopoPersonalizado
          mostrarBotaoVoltar={true}
          aoPressionarBotaoVoltar={() => navigation.goBack()}
          mostrarTexto={true}
          texto="Configurações"
          mostrarIcones={false}
        />
        <View style={styles.containerViews}>
          <TouchableOpacity onPress={logOut} style={styles.containerView}>
            <Text style={styles.textoItem}>Sair da minha conta</Text>
            <Icon size={20} name="log-out" />
          </TouchableOpacity>
        </View>
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
  containerViews: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 16,
  },
  containerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.cinzaMaisClaro,
  },
  textoItem: {
    fontFamily: "Quicksand700",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
});
