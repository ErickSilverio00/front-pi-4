import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import SliderCarrossel from "../SliderCarrossel";
import colors from "../../styles/colors";

export default function ApresentacaoEspaco({
  fotos,
  nomeEspaco,
  bairroEspaco,
  cidadeEspaco,
  preco,
}) {
  const blocks = fotos.map((foto) => ({
    type: "image",
    content: { uri: foto },
  }));

  return (
    <View>
      <View style={styles.containerCarrossel}>
        <Icon
          name="heart"
          size={22}
          color={colors.branco}
          style={styles.iconeCurtir}
        />
        <SliderCarrossel blocks={blocks} />
      </View>
      <View style={styles.containerTextos}>
        <Text style={styles.textoEspaco}>{nomeEspaco}</Text>
        <Text style={styles.textoLocalizacao}>
          {bairroEspaco}, {cidadeEspaco}
        </Text>
        <Text style={styles.textoPreco}>{preco}/noite</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconeCurtir: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  containerCarrossel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  containerTextos: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginHorizontal: 20,
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
