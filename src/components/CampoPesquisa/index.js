import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { TouchableOpacity } from "react-native";

export default function CampoPesquisa({ onPressSearchIcon, onChange }) {
  const [textoPesquisa, setTextoPesquisa] = useState("");

  const handleTextChange = (texto) => {
    setTextoPesquisa(texto);
    onChange(texto);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity activeOpacity={1} onPress={onPressSearchIcon}>
          <Feather name="search" size={20} color={colors.corTextoPreto} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Pesquisar usuário"
          placeholderTextColor={colors.corTextoPreto}
          onChangeText={handleTextChange}
          value={textoPesquisa}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: 48,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: colors.branco,
    padding: 10,
    borderRadius: 50,
    // Android
    elevation: 4,
    // iOS
    shadowColor: colors.preto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
  },
  containerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    display: "flex",
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
    width: "80%",
  },
});
