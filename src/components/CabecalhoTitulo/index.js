import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";

export default function CabecalhoTitulo({ titulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.estiloTexto}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colors.cinzaMaisClaro,
  },
  estiloTexto: {
    fontFamily: "Quicksand600",
    fontSize: 24,
    color: colors.corTextoPreto,
    paddingVertical: 15,
    textAlign: "center",
  },
});
