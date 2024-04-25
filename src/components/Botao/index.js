import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function Botao({
  aoPressionarBotao,
  texto,
  Icone,
  tamanhoIcone,
  corIcone,
  style,
  isLoading,
  tamanhoIconeCarregamento
}) {
  return (
    <TouchableOpacity onPress={aoPressionarBotao} disabled={isLoading}>
      <View style={[styles.containerBotao, style]}>
        {isLoading ? (
          <ActivityIndicator color="white" style={styles.loadingAnimation} size={tamanhoIconeCarregamento}/> 
        ) : (
          <>
            {Icone && <Icone name={Icone} size={tamanhoIcone} color={corIcone} />}
            {texto && <Text style={style}>{texto}</Text>}
          </>
        )}
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
