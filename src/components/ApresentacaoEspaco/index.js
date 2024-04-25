import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SliderCarrossel from "../SliderCarrossel";
import colors from "../../styles/colors";

export default function ApresentacaoEspaco({
  fotos,
  nomeEspaco,
  bairroEspaco,
  cidadeEspaco,
  preco,
}) {
  const [curtido, setCurtido] = useState(false);

  const aoClicarEmCurtir = () => {
    if (curtido === true) {
      setCurtido(false);
    } else {
      setCurtido(true);
    }
  };

  const blocks = fotos.map((foto) => {
    return (
      typeof foto === "string" && { type: "image", content: { uri: foto } }
    );
  });

  return (
    <View>
      <View style={styles.containerCarrossel}>
        <SliderCarrossel
          blocks={blocks}
          curtido={curtido}
          setCurtido={setCurtido}
          aoClicarEmCurtir={aoClicarEmCurtir}
        />
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
