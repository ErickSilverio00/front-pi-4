import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import colors from "../../styles/colors";

export default function Curtidos() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.estiloTexto}>Conteúdo dos Curtidos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
    justifyContent: "center",
    alignItems: "center",
  },
  estiloTexto: {
    fontFamily: "Quicksand600",
    fontSize: 18,
    color: colors.corTextoPreto,
  },
});
