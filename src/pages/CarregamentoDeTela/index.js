import React from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../styles/colors";

export default function CarregamentoDeTela() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={colors.primaria} />
      <StatusBar barStyle="light-content" />
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
});
