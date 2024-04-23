import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../styles/colors";

export default function CarregamentoDeTela() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <LottieView
        source={carregamentoBola}
        autoPlay={true}
        loop={true}
        style={styles.carregamentoBolaEstilo}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.branco,
  },
  carregamentoBolaEstilo: {
    width: 400,
    height: 300,
  },
});
