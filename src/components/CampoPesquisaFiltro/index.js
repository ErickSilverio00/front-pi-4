import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { TouchableOpacity } from "react-native";

export default function CampoPesquisaFiltro({
  onPressSearchIcon,
  onPressFilterIcon,
}) {
  const [textoPesquisa, setTextoPesquisa] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity activeOpacity={1} onPress={onPressSearchIcon}>
          <MaterialIcons name="search" size={24} color={colors.corTextoPreto} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Onde deseja festejar?"
          placeholderTextColor={colors.corTextoPreto}
          onChangeText={(texto) => setTextoPesquisa(texto)}
          value={textoPesquisa}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressFilterIcon}
        style={styles.containerIconFilter}
      >
        <FontAwesome5 name="sliders-h" size={18} color={colors.corTextoPreto} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    minHeight: 48,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: colors.branco,
    padding: 10,
    borderRadius: 50,
    //Android
    elevation: 4,
    //IOS
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
  containerIconFilter: {
    display: "flex",
    borderWidth: 1,
    borderColor: colors.cinzaMaisClaro,
    borderRadius: "100%",
    padding: 6,
  },
});
