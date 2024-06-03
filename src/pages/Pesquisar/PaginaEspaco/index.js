import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native";

export default function PaginaEspaco() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View>
        <Text>Espaco</Text>
      </View>
    </SafeAreaView>
  );
}
