import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import TopoPersonalizado from "../../../components/TopoPersonalizado";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/Feather";

export default function Suporte() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerGeral}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerConteudo}>
        <TopoPersonalizado
          mostrarBotaoVoltar={true}
          aoPressionarBotaoVoltar={() => navigation.goBack()}
          mostrarTexto={true}
          texto="Suporte"
          mostrarIcones={false}
        />
        <View style={styles.containerViews}>
          <TouchableOpacity onPress={() => {}} style={styles.containerView}>
            <Text style={styles.textoItem}>Contatos</Text>
            <Icon size={20} name="chevron-right" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.containerView}>
            <Text style={styles.textoItem}>Perguntas Frequentes</Text>
            <Icon size={20} name="chevron-right" />
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
