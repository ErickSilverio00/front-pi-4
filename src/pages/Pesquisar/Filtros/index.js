import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

import {
  situacoes,
  jogos,
  periodoDia,
  clima,
  utilidades,
  servicos,
} from "../../../utils/opcoesFiltros";
import colors from "../../../styles/colors";

const iconSets = {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
};

const objectToArray = (obj) =>
  Object.keys(obj).map((key) => ({ ...obj[key], key }));

const CategoryButton = ({ name, icon, selected, onPress, iconType }) => {
  const IconComponent = iconSets[iconType];
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: selected ? colors.primaria : colors.branco },
      ]}
      onPress={onPress}
    >
      <IconComponent
        name={icon}
        size={20}
        color={selected ? colors.branco : colors.primaria}
      />
      <Text
        style={{
          color: selected ? colors.branco : colors.primaria,
          marginLeft: 5,
          fontFamily: "Quicksand600",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const Category = ({ name, buttons, selectedButtons, toggleSelected }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{name}</Text>
    <View style={styles.buttonsContainer}>
      {buttons.map((button) => (
        <CategoryButton
          key={button.key}
          name={button.nome}
          icon={button.icone}
          iconType={button.tipoIcone}
          selected={selectedButtons[button.key]}
          onPress={() => toggleSelected(name, button.key)}
        />
      ))}
    </View>
  </View>
);

export default function Filtros({ mostrarFiltros, setMostrarFiltros }) {
  const categories = {
    Situações: objectToArray(situacoes),
    Jogos: objectToArray(jogos),
    "Período do Dia": objectToArray(periodoDia),
    Clima: objectToArray(clima),
    Utilidades: objectToArray(utilidades),
    "Serviços Adicionais": objectToArray(servicos),
  };

  const initializeSelectedState = (categories) =>
    Object.keys(categories).reduce((acc, category) => {
      acc[category] = {};
      categories[category].forEach((button) => {
        acc[category][button.key] = false;
      });
      return acc;
    }, {});

  const [selected, setSelected] = useState(initializeSelectedState(categories));

  const toggleSelected = (category, key) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [category]: {
        ...prevSelected[category],
        [key]: !prevSelected[category][key],
      },
    }));
  };

  const limparFiltros = () => {
    setSelected(initializeSelectedState(categories));
  };

  const mostrarLugares = () => {
    // Implement logic to show more places
  };

  return (
    <Modal
      visible={mostrarFiltros}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setMostrarFiltros(false)}
      onPointerDown={() => setMostrarFiltros(false)}
    >
      <View style={styles.modalFundo}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setMostrarFiltros(false)}
        />
        <View style={styles.modalConteudo}>
          <View style={styles.containerCabecalhoFiltros}>
            <Text style={styles.tituloCabecalho}>Filtros</Text>
            <TouchableOpacity
              onPress={() => setMostrarFiltros(false)}
              activeOpacity={1}
            >
              <iconSets.Feather
                name="x"
                size={22}
                color={colors.corTextoPreto}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {Object.keys(categories).map((category) => (
                <Category
                  key={category}
                  name={category}
                  buttons={categories[category]}
                  selectedButtons={selected[category]}
                  toggleSelected={toggleSelected}
                />
              ))}
            </View>
          </ScrollView>
          <View style={styles.footerButtonsContainer}>
            <TouchableOpacity
              style={[styles.footerButton, { backgroundColor: colors.branco }]}
              onPress={limparFiltros}
            >
              <Text
                style={[styles.footerButtonText, { color: colors.primaria }]}
              >
                Limpar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={mostrarLugares}
            >
              <Text style={styles.footerButtonText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: colors.branco,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    height: "95%",
  },
  scrollViewContent: {},
  containerCabecalhoFiltros: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinzaMaisClaro,
  },
  tituloCabecalho: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
    marginHorizontal: 2,
  },
  content: {
    paddingVertical: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
    marginHorizontal: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexBasis: 140,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    gap: 4,
    justifyContent: "center",
    //Android
    elevation: 4,
    //IOS
    shadowColor: colors.corTextoPreto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
  },
  footerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.branco,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.primaria,
    //Android
    elevation: 4,
    //IOS
    shadowColor: colors.corTextoPreto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
  },
  footerButtonText: {
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.branco,
  },
});
