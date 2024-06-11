import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { TouchableOpacity } from "react-native";

export default function CampoPesquisaFiltro({
  onPressSearchIcon,
  onPressFilterIcon,
  onSubmitEditing,
  textoPesquisa,
  setTextoPesquisa,
  pesquisaFeita,
  onPressCloseIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity activeOpacity={1} onPress={onPressSearchIcon}>
          <Feather name="search" size={20} color={colors.corTextoPreto} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Onde deseja festejar?"
          placeholderTextColor={colors.corTextoPreto}
          onChangeText={(texto) => setTextoPesquisa(texto)}
          value={textoPesquisa}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <View style={styles.coantainerRight}>
        <TouchableOpacity
          onPress={onPressFilterIcon}
          style={styles.containerIconFilter}
        >
          <Feather name="sliders" size={18} color={colors.corTextoPreto} />
        </TouchableOpacity>
        {pesquisaFeita && (
          <TouchableOpacity
            onPress={onPressCloseIcon}
            style={styles.containerIconFilter}
          >
            <Feather name="x" size={18} color={colors.corTextoPreto} />
          </TouchableOpacity>
        )}
      </View>
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
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
    width: "70%",
  },
  coantainerRight: {
    flexDirection: "row",
    gap: 10,
  },
  containerIconFilter: {
    display: "flex",
    borderWidth: 1,
    borderColor: colors.cinzaMaisClaro,
    borderRadius: 100,
    padding: 6,
  },
});
