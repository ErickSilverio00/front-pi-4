import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SliderCarrossel from "./SliderCarrossel";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import { formatarMoeda } from "../../utils/funcoes";

export default function ApresentacaoEspaco({ espaco }) {
  const navigation = useNavigation();

  const blocks =
    espaco && espaco.imagens_espaco
      ? espaco.imagens_espaco
          .filter((foto) => typeof foto === "string")
          .map((foto) => ({ type: "image", content: { uri: foto } }))
      : [];

  return (
    <View>
      <View style={styles.containerCarrossel}>
        <SliderCarrossel
          blocks={blocks}
          aoClicarNaImagem={() =>
            navigation.navigate("RotasEspaco", {
              screen: "PaginaEspaco",
              params: { espaco },
            })
          }
        />
      </View>
      <View style={styles.containerTextos}>
        <Text style={styles.textoEspaco}>{espaco?.nome_espaco}</Text>
        <Text style={styles.textoLocalizacao}>
          {espaco?.endereco?.bairro}, {espaco?.endereco?.cidade}
        </Text>
        <Text style={styles.textoPreco}>
          {espaco?.valor_diaria && formatarMoeda(espaco?.valor_diaria)}/noite
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCarrossel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  containerTextos: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginHorizontal: 16,
  },
  textoEspaco: {
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
  textoLocalizacao: {
    fontFamily: "Quicksand400",
    fontSize: 12,
    color: colors.corTextoPreto,
  },
  textoPreco: {
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
});
