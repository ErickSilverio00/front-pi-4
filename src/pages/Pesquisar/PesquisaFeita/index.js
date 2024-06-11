import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../styles/colors";
import ApresentacaoEspaco from "../../../components/ApresentacaoEspaco";

export default function PesquisaFeita({ espacosFiltrados }) {
  return (
    <>
      {espacosFiltrados?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerApresentacoes}>
            {espacosFiltrados?.map((espaco, index) => (
              <ApresentacaoEspaco key={index} espaco={espaco} />
            ))}
          </View>
        </ScrollView>
      )}
      {espacosFiltrados?.length === 0 && (
        <View style={styles.containerNenhumEspacoEncontrado}>
          <Text style={styles.textoNaoEncontrado}>
            Nenhum espaço encontrado!
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    display: "flex",
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.preto,
    backgroundColor: "#fdf3ff",
    padding: 8,
    borderRadius: 6,
    width: "80%",
  },
  containerIcones: {
    flexDirection: "row",
    gap: 10,
  },
  containerApresentacoes: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 20,
    gap: 20,
  },
  containerNenhumEspacoEncontrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  textoNaoEncontrado: {
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
});
