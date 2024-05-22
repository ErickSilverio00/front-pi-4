import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import TopoPersonalizado from "../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";

export default function TornarAnunciante() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerGeral}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerConteudo}>
        <TopoPersonalizado
          mostrarBotaoVoltar={true}
          aoPressionarBotaoVoltar={() => navigation.goBack()}
          mostrarTexto={true}
          texto="Quero Anunciar Meu Espaço"
          mostrarIcones={false}
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
});
