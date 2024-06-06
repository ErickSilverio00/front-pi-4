import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Botao({
  aoPressionarBotao,
  texto,
  Icone,
  tamanhoIcone,
  corIcone,
  style,
}) {
  return (
    <TouchableOpacity onPress={aoPressionarBotao} activeOpacity={0.6}>
      <View style={[styles.containerBotao, style]}>
        {Icone && <Icone name={Icone} size={tamanhoIcone} color={corIcone} />}
        {texto && <Text style={style}>{texto}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerBotao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
